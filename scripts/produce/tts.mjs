// Sinh audio liền cho một chương bằng Google Cloud TTS (chuẩn v2 mục 6 và 6b).
//   GOOGLE_TTS_API_KEY=… node scripts/produce/tts.mjs <đường-dẫn/chương.ja.txt>
// Mỗi đoạn {vai} đọc bằng giọng của vai đó trong voices.json (dùng chung cả bộ truyện). Các đoạn của một câu
// nối lại và chuẩn hoá âm lượng (file tạm, không vào repo), rồi cả chương ghép thành public/audio/<id>/chapter.mp3
// (mono 64 kbps): nghỉ 0,6 giây giữa hai câu, 0,9 giây khi đổi người nói. Mốc [start, end] của từng câu và giọng
// đọc ghi ra <chương>.timing.json cạnh file nguồn, để build-story.mjs điền t / audio / voice / audioTrack.
// Khoá API chỉ đọc từ biến môi trường, không ghi ra đâu cả.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { parseSource } from "./build-story.mjs";

const root = new URL("../..", import.meta.url).pathname;
const KEY = process.env.GOOGLE_TTS_API_KEY;
if (!KEY) { console.error("thiếu GOOGLE_TTS_API_KEY"); process.exit(1); }
const file = process.argv[2];
const { meta, sentences } = parseSource(file);
const voices = JSON.parse(readFileSync(join(dirname(file), "voices.json"), "utf8"));
const cache = join(tmpdir(), "miraigo-tts-cache");
// tts_say: 灯台=灯台, 灯=あかり — chỉ đổi chữ gửi cho TTS (tên riêng TTS đọc sai), không đổi chữ hiển thị.
// Khoá dài khớp trước, nên ghi "灯台=灯台" để giữ nguyên từ ghép.
const say = (meta.tts_say ?? "").split(/[,、]/).map((x) => x.trim()).filter(Boolean).map((x) => x.split("="));
const sayRe = say.length ? new RegExp(say.map(([k]) => k).sort((a, b) => b.length - a.length).join("|"), "g") : null;
const sayMap = Object.fromEntries(say);
const forTts = (t) => (sayRe ? t.replace(sayRe, (m) => sayMap[m]) : t);
mkdirSync(cache, { recursive: true });
async function synth(text, v) {
  const audioConfig = { audioEncoding: "LINEAR16", sampleRateHertz: 24000, speakingRate: v.rate ?? 1 };
  if (v.pitch !== undefined && !v.name.includes("Chirp")) audioConfig.pitch = v.pitch;
  const body = { input: { text }, voice: { languageCode: "ja-JP", name: v.name }, audioConfig };
  const h = createHash("sha1").update(JSON.stringify(body)).digest("hex");
  const p = join(cache, h + ".wav");
  if (existsSync(p)) return p;
  for (let attempt = 1; ; attempt++) {
    const r = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": KEY },
      body: JSON.stringify(body),
    });
    if (r.ok) {
      writeFileSync(p, Buffer.from((await r.json()).audioContent, "base64"));
      return p;
    }
    const msg = (await r.text()).slice(0, 200);
    if (attempt >= 4 || r.status < 500 && r.status !== 429) throw new Error(`TTS ${r.status}: ${msg}`);
    await new Promise((res) => setTimeout(res, 1500 * attempt));
  }
}

const GAP = 0.6, GAP_SPEAKER = 0.9, RATE = 24000;
const tmp = join(cache, "sent-" + meta.id);
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
const wavSec = (p) => (readFileSync(p).length - 44) / 2 / RATE; // PCM s16le mono, header 44 byte
const silence = (sec) => {
  const p = join(tmp, `sil-${sec}.wav`);
  if (!existsSync(p)) execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "lavfi", "-i", `anullsrc=r=${RATE}:cl=mono`, "-t", String(sec), "-c:a", "pcm_s16le", "-bitexact", p]);
  return p;
};

// 1. từng câu: nối đoạn (0,15 giây giữa hai giọng), chuẩn hoá âm lượng, ra WAV tạm
const sentWav = [];
for (let i = 0; i < sentences.length; i++) {
  const parts = [];
  for (const seg of sentences[i].segs) {
    const v = voices[seg.role];
    if (!v) throw new Error(`câu ${i + 1}: vai "${seg.role}" chưa có trong voices.json`);
    const text = forTts(seg.text.replace(/[「」『』]/g, "").trim());
    if (text) parts.push(await synth(text, v));
  }
  const out = join(tmp, `${String(i + 1).padStart(3, "0")}.wav`);
  const args = ["-y", "-loglevel", "error"];
  parts.forEach((p) => args.push("-i", p));
  const n = parts.length;
  const filter = n === 1
    ? "[0:a]loudnorm=I=-18:TP=-2:LRA=11[o]"
    : parts.map((_, k) => `[${k}:a]${k < n - 1 ? "apad=pad_dur=0.15" : "anull"}[a${k}]`).join(";") +
      ";" + parts.map((_, k) => `[a${k}]`).join("") + `concat=n=${n}:v=0:a=1,loudnorm=I=-18:TP=-2:LRA=11[o]`;
  args.push("-filter_complex", filter, "-map", "[o]", "-ar", String(RATE), "-ac", "1", "-c:a", "pcm_s16le", "-bitexact", out);
  execFileSync("ffmpeg", args);
  sentWav.push(out);
}

// 2. ghép cả chương; mốc tính theo số mẫu nên khớp tuyệt đối với file ghép
const list = [];
const t = [];
const voice = [];
let pos = 0.3; // 0,3 giây lặng đầu chương
list.push(silence(0.3));
for (let i = 0; i < sentences.length; i++) {
  if (i) {
    const prev = sentences[i - 1].segs.at(-1).role, cur = sentences[i].segs[0].role;
    const g = prev === cur ? GAP : GAP_SPEAKER;
    list.push(silence(g));
    pos += g;
  }
  const d = wavSec(sentWav[i]);
  t.push([Math.round(pos * 100) / 100, Math.round((pos + d) * 100) / 100]);
  pos += d;
  list.push(sentWav[i]);
  // giọng của câu = giọng của đoạn dài nhất
  const main = [...sentences[i].segs].sort((a, b) => b.text.length - a.text.length)[0];
  voice.push(voices[main.role].name);
}
list.push(silence(0.6));
const listFile = join(tmp, "list.txt");
writeFileSync(listFile, list.map((p) => `file '${p}'`).join("\n"));
const outDir = join(root, "public/audio", meta.id);
mkdirSync(outDir, { recursive: true });
for (const f of readdirSync(outDir)) if (/^\d{3}\.mp3$/.test(f)) rmSync(join(outDir, f)); // file từng câu kiểu cũ
const mp3 = join(outDir, "chapter.mp3");
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-ac", "1", "-ar", String(RATE), "-c:a", "libmp3lame", "-b:a", "64k", mp3]);
const durationSec = Math.round(Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", mp3]).toString()) * 100) / 100;
const chap = file.replace(/\.ja\.txt$/, "");
writeFileSync(`${chap}.timing.json`, JSON.stringify({ src: `/audio/${meta.id}/chapter.mp3`, durationSec, t, voice }) + "\n");
rmSync(tmp, { recursive: true, force: true });
console.log(`✓ ${meta.id}: chapter.mp3 ${Math.floor(durationSec / 60)} phút ${Math.round(durationSec % 60)} giây, ${sentences.length} câu`);

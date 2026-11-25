// Sinh audio liền cho chương bằng Google Cloud TTS (chuẩn v2 mục 6 và 6b).
// - Từng câu được đọc theo giọng của người nói (cast trong <id>.voices.json, do build.mjs sinh).
// - Ghép thành public/audio/<id>/chapter.mp3 (mono 64 kbps): nghỉ 0,6 giây giữa hai câu,
//   0,9 giây khi đổi người nói. Đo mốc từng câu theo số mẫu PCM, ghi t / voice / audio / audioTrack vào gói.
// - Audio từng câu chỉ lưu ở bộ nhớ đệm ngoài repo (TTS_CACHE, mặc định /tmp/miraigo-tts) để khỏi gọi lại API.
// Khoá API đọc từ biến môi trường GOOGLE_TTS_API_KEY (không bao giờ in ra hay ghi file).
// Chạy: node scripts/story-src/tts.mjs content/sources/<kệ>/<id>.voices.json [...]
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

const root = new URL("../..", import.meta.url).pathname;
const KEY = process.env.GOOGLE_TTS_API_KEY;
if (!KEY) { console.error("Thiếu GOOGLE_TTS_API_KEY"); process.exit(1); }
const CACHE = process.env.TTS_CACHE ?? "/tmp/miraigo-tts";
const RATE = 24000;
const GAP_SAME = 0.6, GAP_CHANGE = 0.9, LEAD = 0.3;
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
mkdirSync(CACHE, { recursive: true });

async function synth(text, voice, rate, pitch) {
  const audioConfig = { audioEncoding: "LINEAR16", speakingRate: rate, sampleRateHertz: RATE };
  if (pitch) audioConfig.pitch = pitch;
  for (let attempt = 1; attempt <= 4; attempt++) {
    const r = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
      body: JSON.stringify({ input: { text }, voice: { languageCode: "ja-JP", name: voice }, audioConfig }),
    });
    if (r.ok) return Buffer.from((await r.json()).audioContent, "base64");
    const msg = (await r.text()).slice(0, 200);
    if (r.status < 500 && r.status !== 429) throw new Error(`TTS ${r.status}: ${msg}`);
    await new Promise((res) => setTimeout(res, 2000 * attempt));
  }
  throw new Error("TTS thất bại sau 4 lần");
}

// LINEAR16 trả về WAV có header; lấy phần PCM của chunk "data".
function pcmOf(wav) {
  let i = 12;
  while (i < wav.length - 8) {
    const id = wav.toString("ascii", i, i + 4), size = wav.readUInt32LE(i + 4);
    if (id === "data") return wav.subarray(i + 8, i + 8 + size);
    i += 8 + size;
  }
  throw new Error("WAV không có chunk data");
}
// Cắt lặng đầu/cuối (biên độ < 1%) để khoảng nghỉ giữa câu đúng như chuẩn.
function trim(pcm) {
  const n = pcm.length / 2, thr = 330;
  let a = 0, b = n - 1;
  while (a < n && Math.abs(pcm.readInt16LE(a * 2)) < thr) a++;
  while (b > a && Math.abs(pcm.readInt16LE(b * 2)) < thr) b--;
  a = Math.max(0, a - Math.round(RATE * 0.03)); b = Math.min(n - 1, b + Math.round(RATE * 0.08));
  return pcm.subarray(a * 2, (b + 1) * 2);
}
const silence = (sec) => Buffer.alloc(Math.round(sec * RATE) * 2);
const r3 = (x) => Math.round(x * 1000) / 1000;

for (const vf of files) {
  const id = basename(vf).replace(/\.voices\.json$/, "");
  const { cast, voices, say = {} } = JSON.parse(readFileSync(vf, "utf8"));
  const pkPath = join(root, "content/stories", `${id}.json`);
  const story = JSON.parse(readFileSync(pkPath, "utf8"));
  const jobs = story.sentences.map((s, i) => {
    const c = cast[voices[i]];
    if (!c) throw new Error(`${id} câu ${i + 1}: người nói "${voices[i]}" không có trong cast`);
    const text = (say[i + 1] ?? s.ja).replace(/^「(.*)」$/, "$1");
    const key = createHash("sha1").update(JSON.stringify([text, c.voice, c.rate ?? 0.9, c.pitch ?? 0])).digest("hex");
    return { i, text, c, cacheFile: join(CACHE, key + ".pcm") };
  });
  let made = 0;
  const queue = jobs.filter((j) => !existsSync(j.cacheFile));
  const worker = async () => {
    while (queue.length) {
      const j = queue.shift();
      const wav = await synth(j.text, j.c.voice, j.c.rate ?? 0.9, j.c.pitch);
      writeFileSync(j.cacheFile, trim(pcmOf(wav)));
      made++;
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);

  const parts = [silence(LEAD)];
  let pos = LEAD;
  jobs.forEach((j, k) => {
    if (k) {
      const g = voices[k] === voices[k - 1] ? GAP_SAME : GAP_CHANGE;
      parts.push(silence(g)); pos += g;
    }
    const pcm = readFileSync(j.cacheFile);
    const d = pcm.length / 2 / RATE;
    const s = story.sentences[j.i];
    s.t = [r3(pos), r3(pos + d)];
    s.voice = j.c.voice;
    parts.push(pcm); pos += d;
  });
  parts.push(silence(1.0)); pos += 1.0;

  const dir = join(root, "public/audio", id);
  if (existsSync(dir)) for (const f of readdirSync(dir)) rmSync(join(dir, f));
  mkdirSync(dir, { recursive: true });
  const raw = join(CACHE, id + ".chapter.pcm");
  writeFileSync(raw, Buffer.concat(parts));
  const out = join(dir, "chapter.mp3");
  execFileSync("ffmpeg", ["-y", "-v", "error", "-f", "s16le", "-ar", String(RATE), "-ac", "1", "-i", raw, "-c:a", "libmp3lame", "-b:a", "64k", "-ac", "1", out]);
  rmSync(raw);
  const durationSec = r3(parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]).toString()));
  const src = `/audio/${id}/chapter.mp3`;
  story.audioTrack = { src, durationSec };
  for (const s of story.sentences) s.audio = `${src}#t=${s.t[0]},${s.t[1]}`;
  writeFileSync(pkPath, JSON.stringify(story, null, 2) + "\n");
  console.log(`${id}: ${story.sentences.length} câu (gọi API mới ${made}), chapter.mp3 ${(durationSec / 60).toFixed(1)} phút`);
}

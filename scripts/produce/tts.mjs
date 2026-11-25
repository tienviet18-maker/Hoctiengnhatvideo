// Sinh audio từng câu bằng Google Cloud TTS (chuẩn v2 mục 6).
//   GOOGLE_TTS_API_KEY=… node scripts/produce/tts.mjs <đường-dẫn/chương.ja.txt> [--force]
// Mỗi đoạn {vai} đọc bằng giọng của vai đó trong voices.json (dùng chung cả bộ truyện),
// các đoạn của một câu được nối lại thành public/audio/<id>/NNN.mp3 (24 kHz mono, chuẩn hoá âm lượng).
// Khoá API chỉ đọc từ biến môi trường, không ghi ra đâu cả.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { parseSource } from "./build-story.mjs";

const root = new URL("../..", import.meta.url).pathname;
const KEY = process.env.GOOGLE_TTS_API_KEY;
if (!KEY) { console.error("thiếu GOOGLE_TTS_API_KEY"); process.exit(1); }
const file = process.argv[2];
const force = process.argv.includes("--force");
const { meta, sentences } = parseSource(file);
const voices = JSON.parse(readFileSync(join(dirname(file), "voices.json"), "utf8"));
const cache = join(tmpdir(), "miraigo-tts-cache");
mkdirSync(cache, { recursive: true });
const outDir = join(root, "public/audio", meta.id);
mkdirSync(outDir, { recursive: true });

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

let made = 0;
for (let i = 0; i < sentences.length; i++) {
  const out = join(outDir, `${String(i + 1).padStart(3, "0")}.mp3`);
  if (existsSync(out) && !force) continue;
  const parts = [];
  for (const seg of sentences[i].segs) {
    const v = voices[seg.role];
    if (!v) throw new Error(`câu ${i + 1}: vai "${seg.role}" chưa có trong voices.json`);
    const text = seg.text.replace(/[「」『』]/g, "").trim();
    if (text) parts.push(await synth(text, v));
  }
  // nối các đoạn, chèn 0,15 giây lặng giữa hai giọng, chuẩn hoá âm lượng
  const args = ["-y", "-loglevel", "error"];
  parts.forEach((p) => args.push("-i", p));
  const n = parts.length;
  const filter = n === 1
    ? "[0:a]loudnorm=I=-18:TP=-2:LRA=11,apad=pad_dur=0.25[o]"
    : parts.map((_, k) => `[${k}:a]${k < n - 1 ? "apad=pad_dur=0.15" : "anull"}[a${k}]`).join(";") +
      ";" + parts.map((_, k) => `[a${k}]`).join("") + `concat=n=${n}:v=0:a=1,loudnorm=I=-18:TP=-2:LRA=11,apad=pad_dur=0.25[o]`;
  args.push("-filter_complex", filter, "-map", "[o]", "-ar", "24000", "-ac", "1", "-b:a", "64k", out);
  execFileSync("ffmpeg", args);
  made++;
}
console.log(`✓ ${meta.id}: ${made} file audio mới, ${sentences.length} câu`);

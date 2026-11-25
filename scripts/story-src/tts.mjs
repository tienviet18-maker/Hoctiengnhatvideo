// Sinh audio từng câu bằng Google Cloud TTS (chuẩn v2 mục 6).
// Giọng theo người nói ghi trong <id>.voices.json (do build.mjs sinh từ file nguồn).
// Khoá API đọc từ biến môi trường GOOGLE_TTS_API_KEY (không bao giờ in ra hay ghi file).
// Mỗi file được nối thêm 0,4 giây lặng ở cuối để nghe liền mạch khi lái xe.
// Chạy: node scripts/story-src/tts.mjs content/sources/<kệ>/<id>.voices.json [--force]
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from "node:fs";
import { join, basename } from "node:path";
import { execFileSync } from "node:child_process";

const root = new URL("../..", import.meta.url).pathname;
const KEY = process.env.GOOGLE_TTS_API_KEY;
if (!KEY) { console.error("Thiếu GOOGLE_TTS_API_KEY"); process.exit(1); }
const FORCE = process.argv.includes("--force");
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));

async function synth(text, voice, rate, pitch) {
  const audioConfig = { audioEncoding: "MP3", speakingRate: rate, sampleRateHertz: 24000 };
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
const dur = (f) => parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());

for (const vf of files) {
  const id = basename(vf).replace(/\.voices\.json$/, "");
  const { cast, voices, say = {} } = JSON.parse(readFileSync(vf, "utf8"));
  const story = JSON.parse(readFileSync(join(root, "content/stories", `${id}.json`), "utf8"));
  const dir = join(root, "public/audio", id);
  mkdirSync(dir, { recursive: true });
  let total = 0, made = 0;
  const queue = story.sentences.map((s, i) => ({ s, i }));
  const worker = async () => {
    while (queue.length) {
      const { s, i } = queue.shift();
      const out = join(root, "public", s.audio);
      if (existsSync(out) && !FORCE) { total += dur(out); continue; }
      const c = cast[voices[i]];
      if (!c) throw new Error(`${id} câu ${i + 1}: người nói "${voices[i]}" không có trong cast`);
      const text = (say[i + 1] ?? s.ja).replace(/^「(.*)」$/, "$1");
      const raw = await synth(text, c.voice, c.rate ?? 0.9, c.pitch);
      const tmp = out + ".raw.mp3";
      writeFileSync(tmp, raw);
      execFileSync("ffmpeg", ["-y", "-v", "error", "-i", tmp, "-af", "apad=pad_dur=0.4", "-ar", "24000", "-ac", "1", "-b:a", "48k", out]);
      unlinkSync(tmp);
      total += dur(out);
      made++;
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  console.log(`${id}: ${story.sentences.length} câu, sinh mới ${made}, tổng ${(total / 60).toFixed(1)} phút`);
}

// Dựng gói truyện nghe (chuẩn nội dung v2) từ bản thảo trong content/sources/<kệ>/<id>/.
//
// Bản thảo của một gói (một tập):
//   meta.json      id, level, topic, source, free, series?, titles{11 ngôn ngữ}, voices{mã: giọng}
//   ja.txt         mỗi dòng một câu: "<mã giọng>> câu". Cách đọc ép: {漢字|よみ}. Dòng "#" là ghi chú.
//   <lang>.txt     11 file, mỗi dòng khớp một câu của ja.txt: "bản dịch ‖ giải thích (grammarNote)"
//   content/sources/glossary-*.tsv  nghĩa 11 ngôn ngữ của từ vựng, dùng chung
//
// Máy làm: furigana + romaji (kuromoji, có cách đọc ép), chọn từ vựng đúng cấp theo danh sách
// JLPT (data/jlpt), audio từng câu bằng Google Cloud TTS (env GOOGLE_TTS_API_KEY, không bao giờ in ra),
// đo thời lượng tập, kiểm câu trùng với kho.
//
// Chạy: node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-toki-soba [--no-audio]
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { join, basename, dirname } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { loadTokenizer, measure, wordLevel, LEVEL_NUM } from "./lib/level.mjs";

const root = new URL("..", import.meta.url).pathname;
const LANGS = ["vi", "en", "zh-Hans", "zh-Hant", "ko", "tl", "ne", "id", "pt", "my", "th"];
const dir = process.argv[2];
const JA_ONLY = process.argv.includes("--ja-only");
const NO_AUDIO = JA_ONLY || process.argv.includes("--no-audio");
if (!dir) throw new Error("thiếu thư mục bản thảo");

const meta = JSON.parse(readFileSync(join(dir, "meta.json"), "utf8"));
// Nghĩa từ vựng dùng chung: content/sources/glossary-*.tsv, mỗi dòng "từ|vi|en|zh-Hans|zh-Hant|ko|tl|ne|id|pt|my|th".
const glossary = {};
for (const f of readdirSync(join(root, "content/sources")).filter((x) => /^glossary-.*\.tsv$/.test(x))) {
  for (const row of readFileSync(join(root, "content/sources", f), "utf8").split("\n")) {
    if (!row.trim() || row.startsWith("#")) continue;
    const [w, ...ms] = row.split("|").map((x) => x.trim());
    glossary[w] = Object.fromEntries(LANGS.map((l, i) => [l, ms[i] ?? ""]));
  }
}
const tokenizer = await loadTokenizer();
const errors = [];

const kata2hira = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
const KANJI = /[一-鿿㐀-䶿々]/;

// ---------- romaji (Hepburn, không dấu trường âm, giống kho hiện có) ----------
const BASE = {
  あ:"a",い:"i",う:"u",え:"e",お:"o",か:"ka",き:"ki",く:"ku",け:"ke",こ:"ko",さ:"sa",し:"shi",す:"su",せ:"se",そ:"so",
  た:"ta",ち:"chi",つ:"tsu",て:"te",と:"to",な:"na",に:"ni",ぬ:"nu",ね:"ne",の:"no",は:"ha",ひ:"hi",ふ:"fu",へ:"he",ほ:"ho",
  ま:"ma",み:"mi",む:"mu",め:"me",も:"mo",や:"ya",ゆ:"yu",よ:"yo",ら:"ra",り:"ri",る:"ru",れ:"re",ろ:"ro",わ:"wa",ゐ:"i",ゑ:"e",を:"o",ん:"n",
  が:"ga",ぎ:"gi",ぐ:"gu",げ:"ge",ご:"go",ざ:"za",じ:"ji",ず:"zu",ぜ:"ze",ぞ:"zo",だ:"da",ぢ:"ji",づ:"zu",で:"de",ど:"do",
  ば:"ba",び:"bi",ぶ:"bu",べ:"be",ぼ:"bo",ぱ:"pa",ぴ:"pi",ぷ:"pu",ぺ:"pe",ぽ:"po",ゔ:"vu",
  ぁ:"a",ぃ:"i",ぅ:"u",ぇ:"e",ぉ:"o",ゎ:"wa",
};
const YO = { ゃ: "a", ゅ: "u", ょ: "o" };
function kanaToRomaji(kana) {
  const s = kata2hira(kana);
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const c = s[i], n = s[i + 1];
    if (c === "っ") { const nx = kanaToRomaji(s.slice(i + 1, i + 3))[0] ?? ""; out += nx === "c" ? "t" : /[a-z]/.test(nx) ? nx : ""; continue; }
    if (c === "ー") { out += out.slice(-1); continue; }
    if (n && YO[n] && BASE[c]) {
      const b = BASE[c];
      out += (b === "shi" ? "sh" : b === "chi" ? "ch" : b === "ji" ? "j" : b.slice(0, -1) + "y") + YO[n];
      i++; continue;
    }
    if (n && "ぁぃぅぇぉ".includes(n) && BASE[c]) { out += BASE[c].replace(/[aiueo]$/, "") + BASE[n]; i++; continue; }
    if (c === "ん" && n && /^[aiueoy]/.test(BASE[n] ?? "")) { out += "n'"; continue; }
    out += BASE[c] ?? c;
  }
  return out;
}
const PUNCT = { "、": ",", "。": ".", "？": "?", "！": "!", "「": "\"", "」": "\"", "『": "\"", "』": "\"", "…": "...", "・": " ", "～": "~", "（": "(", "）": ")" };

// ---------- furigana ----------
function alignToken(surface, reading) {
  if (!KANJI.test(surface)) return [{ surface, reading: "" }];
  const r = kata2hira(reading);
  const parts = surface.match(/[一-鿿㐀-䶿々]+|[^一-鿿㐀-䶿々]+/g);
  const re = new RegExp("^" + parts.map((p) => (KANJI.test(p) ? "(.+?)" : "(" + kata2hira(p).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")")).join("") + "$");
  const m = r.match(re);
  if (!m) return [{ surface, reading: r }];
  return parts.map((p, i) => ({ surface: p, reading: KANJI.test(p) ? m[i + 1] : "" }));
}
function mergeKana(segs) {
  const out = [];
  for (const g of segs) {
    const last = out[out.length - 1];
    if (last && !last.reading && !g.reading) last.surface += g.surface;
    else out.push({ ...g });
  }
  return out;
}

// Một câu: "{漢字|よみ}" là cách đọc ép (tên riêng, chữ kuromoji đọc sai).
function analyse(raw) {
  const chunks = [];
  const re = /\{([^|}]+)\|([^}]+)\}/g;
  let last = 0, m, text = "";
  while ((m = re.exec(raw))) {
    if (m.index > last) chunks.push({ text: raw.slice(last, m.index) });
    chunks.push({ text: m[1], reading: m[2] });
    last = re.lastIndex;
  }
  if (last < raw.length) chunks.push({ text: raw.slice(last) });
  const furigana = [], tokens = [];
  for (const c of chunks) {
    text += c.text;
    if (c.reading) {
      furigana.push({ surface: c.text, reading: c.reading });
      tokens.push({ surface: c.text, reading: c.reading, pos: "名詞", pos_detail_1: "固有名詞", basic: c.text, forced: true });
      continue;
    }
    for (const t of tokenizer.tokenize(c.text)) {
      const reading = t.reading && t.reading !== "*" ? t.reading : KANJI.test(t.surface_form) ? "" : t.surface_form;
      if (KANJI.test(t.surface_form) && !reading) errors.push(`không có cách đọc cho "${t.surface_form}" trong: ${raw} → thêm {よみ}`);
      furigana.push(...alignToken(t.surface_form, reading));
      tokens.push({ surface: t.surface_form, reading, pos: t.pos, pos_detail_1: t.pos_detail_1, basic: t.basic_form !== "*" ? t.basic_form : t.surface_form, conj: t.conjugated_type });
    }
  }
  return { ja: text, furigana: mergeKana(furigana), tokens };
}

function romajiOf(tokens) {
  // Gom token thành "từ" (động từ + trợ động từ + て… dính liền), rồi mới chuyển kana → romaji,
  // để っ ở cuối token (かかっ|た) vẫn nhân đôi phụ âm đúng.
  const words = []; // { kana, punct? }
  let prev = null;
  for (const t of tokens) {
    const runs = t.surface.match(/[、。？！「」『』…・（）～]+|[^、。？！「」『』…・（）～]+/g) ?? [];
    for (const run of runs) {
      if (/^[、。？！「」『』…・（）～]+$/.test(run)) { words.push({ punct: run }); prev = null; continue; }
      let kana = KANJI.test(run) || runs.length === 1 ? t.reading : run;
      if (t.pos === "助詞" && run === "は") kana = "わ";
      if (t.pos === "助詞" && run === "へ") kana = "え";
      if (t.pos === "助詞" && run === "を") kana = "お";
      const glue = prev && (
        (t.pos === "助動詞" && ["動詞", "形容詞", "助動詞"].includes(prev.pos)) ||
        (t.pos === "助詞" && t.pos_detail_1 === "接続助詞" && /^(て|で|ば)$/.test(run)) ||
        (t.pos === "動詞" && (t.pos_detail_1 === "非自立" || t.pos_detail_1 === "接尾") && prev.pos === "動詞" && false) ||
        t.pos_detail_1 === "接尾" ||
        (prev.pos === "動詞" && t.pos === "動詞" && prev.surface.endsWith("っ"))
      );
      const orphan = /^[ゃゅょャュョぁぃぅぇぉ]/.test(kana ?? "");
      if ((glue || orphan) && words.length && !words[words.length - 1].punct) words[words.length - 1].kana += kana;
      else words.push({ kana });
      prev = t;
    }
  }
  let out = "";
  for (const w of words) {
    if (w.punct) {
      for (const c of w.punct) {
        if ("「『（".includes(c)) out += (out && !out.endsWith(" ") ? " " : "") + (PUNCT[c] ?? c);
        else out = out.replace(/\s+$/, "") + (PUNCT[c] ?? c) + " ";
      }
      continue;
    }
    const r = kanaToRomaji(w.kana);
    if (out && !/[\s"(]$/.test(out)) out += " ";
    out += r;
  }
  out = out.replace(/\.{4,}/g, "...").replace(/\s+/g, " ").replace(/\s+([,.?!)])/g, "$1").trim();
  out = out.replace(/([.?!]"?\s+"?)([a-z])/g, (_, a, c) => a + c.toUpperCase());
  return out.charAt(0).toUpperCase() + out.slice(1);
}

// ---------- đọc bản thảo ----------
const lines = readFileSync(join(dir, "ja.txt"), "utf8").split("\n").filter((l) => l.trim() && !l.startsWith("#"));
const sents = lines.map((l, i) => {
  const m = l.match(/^([A-Za-z0-9]+)>\s*(.+)$/);
  if (!m) { errors.push(`dòng ${i + 1} thiếu mã giọng: ${l}`); return null; }
  if (!meta.voices[m[1]]) errors.push(`dòng ${i + 1}: mã giọng ${m[1]} chưa khai báo`);
  return { speaker: m[1], ...analyse(m[2].trim()) };
}).filter(Boolean);

const tr = {};
for (const l of JA_ONLY ? [] : LANGS) {
  const p = join(dir, `${l}.txt`);
  if (!existsSync(p)) { errors.push(`thiếu ${l}.txt`); continue; }
  const rows = readFileSync(p, "utf8").split("\n").filter((x) => x.trim() && !x.startsWith("#"));
  if (rows.length !== sents.length) errors.push(`${l}.txt có ${rows.length} dòng, ja.txt có ${sents.length} câu`);
  tr[l] = rows.map((r) => { const [a, b] = r.split("‖").map((x) => (x ?? "").trim()); return { t: a, n: b }; });
}
if (!JA_ONLY) for (const l of LANGS) if (!meta.titles?.[l]) errors.push(`tiêu đề thiếu ${l}`);

// ---------- kho hiện có: chống câu trùng ----------
const existing = new Map();
for (const kind of ["stories", "videos"]) {
  for (const f of readdirSync(join(root, "content", kind)).filter((x) => x.endsWith(".json"))) {
    const d = JSON.parse(readFileSync(join(root, "content", kind, f), "utf8"));
    if (d.id === meta.id) continue;
    for (const s of d.sentences ?? d.lines) if (s.ja.length > 6) existing.set(s.ja, d.id);
  }
}
const inPack = new Set();
sents.forEach((s, i) => {
  if (s.ja.length > 6 && existing.has(s.ja)) errors.push(`câu ${i + 1} trùng với ${existing.get(s.ja)}: ${s.ja}`);
  if (s.ja.length > 6 && inPack.has(s.ja)) errors.push(`câu ${i + 1} lặp trong chính gói: ${s.ja}`);
  inPack.add(s.ja);
});

// ---------- từ vựng: từ đúng cấp hoặc khó hơn, lần xuất hiện đầu trong tập ----------
const target = LEVEL_NUM[meta.level];
const used = new Set(meta.skipVocab ?? []);
const CONTENT = new Set(["名詞", "動詞", "形容詞", "副詞"]);
const SKIP = new Set(["固有名詞", "数", "代名詞", "非自立", "接尾"]);
const missingGloss = new Set();
const vocabOf = sents.map((s) => {
  const out = [];
  for (const t of s.tokens) {
    if (t.forced || !CONTENT.has(t.pos) || SKIP.has(t.pos_detail_1)) continue;
    const word = t.basic;
    const reading = kata2hira(t.pos === "動詞" || t.pos === "形容詞" ? (tokenizer.tokenize(word)[0]?.reading ?? t.reading) : t.reading);
    const lvl = wordLevel(word, reading);
    if (!lvl || lvl > target || used.has(word)) continue;
    const stems = [word, word.slice(0, -1)];
    if (!stems.some((x) => x && (KANJI.test(x) || x.length >= 2) && s.ja.includes(x))) continue;
    if (!KANJI.test(word) && word.length <= 2) continue;
    if (out.length >= 3) break;
    used.add(word);
    if (!glossary[word] || !LANGS.every((l) => glossary[word][l])) { missingGloss.add(`${word}\t${reading}\tN${lvl}`); }
    out.push({ word, reading, level: `N${lvl}`, meanings: glossary[word] ?? {} });
  }
  return out;
});
if (missingGloss.size) {
  writeFileSync(join(dir, "missing-glossary.tsv"), [...missingGloss].join("\n") + "\n");
  errors.push(`${missingGloss.size} từ chưa có nghĩa trong content/sources/glossary-*.tsv (xem ${dir}/missing-glossary.tsv)`);
}

// ---------- số đo cấp độ ----------
const m = measure(tokenizer, sents.map((s) => s.ja), meta.level);
console.log(`${meta.id}: ${m.chars} ký tự, ${m.sentences} câu, TB ${m.avgSentence.toFixed(1)}, harder ${(m.harder * 100).toFixed(1)}%, atLevel ${(m.atLevel * 100).toFixed(1)}%, unlisted ${(m.unlisted * 100).toFixed(1)}%`);

if (JA_ONLY) {
  // Bản kiểm cho người soạn: mọi cách đọc kanji (để soát lỗi đọc), từ vựng sẽ chọn, lỗi.
  const seenR = new Map();
  for (const s of sents) for (const g of s.furigana) if (g.reading) seenR.set(g.surface + "=" + g.reading, (seenR.get(g.surface + "=" + g.reading) ?? 0) + 1);
  console.log("  đọc: " + [...seenR.keys()].join(" "));
  console.log("  từ vựng: " + vocabOf.flat().map((v) => `${v.word}(${v.level})`).join(" "));
  const real = errors.filter((e) => !e.includes("glossary"));
  for (const e of real) console.log("  ✗ " + e);
  process.exit(real.length ? 1 : 0);
}

// ---------- audio ----------
const audioDir = join(root, "public/audio", meta.id);
const lockPath = join(dir, "audio.lock.json");
const lock = existsSync(lockPath) ? JSON.parse(readFileSync(lockPath, "utf8")) : {};
async function tts(text, v) {
  const [name, ...opts] = v.split(" ");
  const cfg = Object.fromEntries(opts.map((o) => o.split("=")).map(([k, x]) => [k, Number(x)]));
  const body = {
    input: { text },
    voice: { languageCode: "ja-JP", name: `ja-JP-${name}` },
    audioConfig: { audioEncoding: "LINEAR16", sampleRateHertz: 24000, speakingRate: cfg.rate ?? 0.9, ...(cfg.pitch !== undefined && !name.startsWith("Chirp") ? { pitch: cfg.pitch } : {}) },
  };
  for (let a = 0; a < 4; a++) {
    const r = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
      method: "POST",
      headers: { "x-goog-api-key": process.env.GOOGLE_TTS_API_KEY, "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (r.ok) return Buffer.from((await r.json()).audioContent, "base64");
    if (r.status < 500 && r.status !== 429) throw new Error(`TTS ${r.status}`);
    await new Promise((res) => setTimeout(res, 2000 * (a + 1)));
  }
  throw new Error("TTS lỗi sau 4 lần thử");
}
// Đọc cho tai: bỏ ngoặc kép (TTS đôi khi ngắt lạ), giữ nguyên chữ.
const spoken = (ja) => ja.replace(/[「」『』]/g, "");

let totalSec = 0;
if (!NO_AUDIO && !errors.length) {
  mkdirSync(audioDir, { recursive: true });
  const queue = sents.map((s, i) => ({ s, i }));
  const work = async () => {
    for (let job = queue.shift(); job; job = queue.shift()) {
      const { s, i } = job;
      const file = join(audioDir, String(i + 1).padStart(3, "0") + ".mp3");
      const v = meta.voices[s.speaker].voice;
      const h = createHash("sha1").update("v2|" + v + "|" + spoken(s.ja)).digest("hex").slice(0, 12);
      if (lock[i + 1] !== h || !existsSync(file)) {
        // WAV → chuẩn hoá âm lượng (giọng Chirp và Neural2 to nhỏ khác nhau) → mp3 mono 64 kbps, đệm 0,25 giây cuối câu.
        const wav = file.replace(/\.mp3$/, ".wav");
        writeFileSync(wav, await tts(spoken(s.ja), v));
        execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", wav, "-af", "loudnorm=I=-18:TP=-2:LRA=11,apad=pad_dur=0.25", "-ar", "24000", "-ac", "1", "-b:a", "64k", file]);
        execFileSync("rm", [wav]);
        lock[i + 1] = h;
      }
    }
  };
  await Promise.all([work(), work(), work(), work()]);
  for (const k of Object.keys(lock)) if (Number(k) > sents.length) delete lock[k];
  writeFileSync(lockPath, JSON.stringify(lock, null, 1) + "\n");
  for (let i = 0; i < sents.length; i++) {
    const file = join(audioDir, String(i + 1).padStart(3, "0") + ".mp3");
    totalSec += Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString());
  }
  // Mỗi file đã có 0,25 giây lặng cuối câu; trình đọc nghỉ thêm ~0,4 giây giữa các câu.
  const est = totalSec + sents.length * 0.4;
  console.log(`  audio: ${(totalSec / 60).toFixed(1)} phút tiếng nói, ước ${(est / 60).toFixed(1)} phút khi nghe liền`);
  if (est < 300 || est > 720) errors.push(`tập dài ${(est / 60).toFixed(1)} phút, chuẩn kệ nghe là 5–12 phút`);
}

if (errors.length) {
  for (const e of errors) console.log("  ✗ " + e);
  process.exit(1);
}

// ---------- ghi gói ----------
const pack = {
  kind: "story",
  id: meta.id,
  titles: meta.titles,
  level: meta.level,
  topic: meta.topic,
  source: meta.source,
  cover: `/covers/${meta.coverId ?? meta.id}.webp`,
  free: meta.free,
  standard: 2,
  ...(meta.series ? { series: meta.series } : {}),
  sentences: sents.map((s, i) => ({
    ja: s.ja,
    furigana: s.furigana,
    romaji: romajiOf(s.tokens),
    translations: Object.fromEntries(LANGS.map((l) => [l, tr[l][i].t])),
    grammarNote: Object.fromEntries(LANGS.map((l) => [l, tr[l][i].n])),
    vocab: vocabOf[i],
    audio: `/audio/${meta.id}/${String(i + 1).padStart(3, "0")}.mp3`,
  })),
};
for (const [i, s] of pack.sentences.entries()) for (const l of LANGS) {
  if (!s.translations[l]) errors.push(`câu ${i + 1} thiếu bản dịch ${l}`);
  if (!s.grammarNote[l]) errors.push(`câu ${i + 1} thiếu giải thích ${l}`);
}
if (errors.length) { for (const e of errors) console.log("  ✗ " + e); process.exit(1); }
writeFileSync(join(root, "content/stories", `${meta.id}.json`), JSON.stringify(pack, null, 1) + "\n");
writeFileSync(join(dir, "stats.json"), JSON.stringify({ ...m, audioSec: Math.round(totalSec), speakers: Object.fromEntries(Object.entries(meta.voices).map(([k, v]) => [k, v])) }, null, 1) + "\n");
const voiceRows = Object.entries(meta.voices).map(([k, v]) => {
  const n = sents.filter((s) => s.speaker === k).length;
  return `| ${k} | ${v.role} | \`ja-JP-${v.voice.split(" ")[0]}\` ${v.voice.split(" ").slice(1).join(" ")} | ${n} |`;
}).join("\n");
writeFileSync(join(root, "content/stories", `${meta.id}.qc.md`), `# QC — ${meta.id} (${meta.level}, chuẩn v2)

- **Nguồn và pháp lý**: ${meta.legal}
- **Bản thảo**: \`${dir}/\` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng \`node scripts/build-audio-pack.mjs ${dir}\`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): ${m.chars} ký tự, ${m.sentences} câu, câu TB ${m.avgSentence.toFixed(1)} ký tự,
  từ vượt cấp ${(m.harder * 100).toFixed(1)}%, từ đạt cấp ${(m.atLevel * 100).toFixed(1)}%.
- **Từ vựng**: ${vocabOf.flat().length} từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: ${sents.length} file, ${(totalSec / 60).toFixed(1)} phút tiếng nói (khoảng ${((totalSec + sents.length * 0.4) / 60).toFixed(1)} phút nghe liền).
  Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
${voiceRows}

- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
`);
console.log(`  ✓ đã ghi content/stories/${meta.id}.json`);

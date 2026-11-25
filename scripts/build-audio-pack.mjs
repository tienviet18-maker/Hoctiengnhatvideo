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
import { tmpdir } from "node:os";
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
      // {かな|かな}: chỉ để ép tách từ đúng (kuromoji đọc sai へい, しっぽく) — không gắn furigana.
      furigana.push({ surface: c.text, reading: KANJI.test(c.text) ? c.reading : "" });
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
      // は cuối phó từ/liên từ/cảm thán (では, 本当は, こんにちは) đọc là wa.
      if (["接続詞", "副詞", "感動詞"].includes(t.pos) && run.length > 1 && run.endsWith("は") && /[はハ]$/.test(kana ?? "")) kana = kana.slice(0, -1) + "わ";
      const glue = prev && (
        (t.pos === "助動詞" && ["動詞", "形容詞", "助動詞"].includes(prev.pos) && !(prev.surface === "で" && t.basic === "ござる")) ||
        (t.pos === "助詞" && t.pos_detail_1 === "接続助詞" && /^(て|で|ば)$/.test(run)) ||
        (t.pos === "動詞" && (t.pos_detail_1 === "非自立" || t.pos_detail_1 === "接尾") && prev.pos === "動詞" && false) ||
        t.pos_detail_1 === "接尾" ||
        prev.pos === "接頭詞" ||
        (prev.pos === "動詞" && t.pos === "動詞" && prev.surface.endsWith("っ"))
      );
      const orphan = /^[ゃゅょャュョぁぃぅぇぉ]/.test(kana ?? "");
      if ((glue || orphan) && words.length && !words[words.length - 1].punct) words[words.length - 1].kana += kana;
      else words.push({ kana, proper: !t.forced && t.pos_detail_1 === "固有名詞" && KANJI.test(run) });
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
    let r = kanaToRomaji(w.kana);
    if (w.proper) r = r.charAt(0).toUpperCase() + r.slice(1); // tên riêng: Meguro, Edo
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
    let reading = kata2hira(t.pos === "動詞" || t.pos === "形容詞" ? (tokenizer.tokenize(word)[0]?.reading ?? t.reading) : t.reading);
    const lvl = wordLevel(word, reading);
    if (/^[ァ-ヶー]+$/.test(word)) reading = word;
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
if (!missingGloss.size && existsSync(join(dir, "missing-glossary.tsv"))) execFileSync("rm", [join(dir, "missing-glossary.tsv")]);
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

// ---------- audio: một file liền cho cả chương (chuẩn v2 mục 6b) ----------
// Từng câu: Google TTS (WAV) → chuẩn hoá âm lượng -18 LUFS, lưu cache ngoài repo. Ghép: nghỉ 0,6 giây giữa hai câu,
// 0,9 giây khi đổi người nói, 0,3 giây đầu file. Mốc t của từng câu đo bằng ffprobe trên từng đoạn khi ghép.
const audioDir = join(root, "public/audio", meta.id);
const CACHE = process.env.MIRAIGO_TTS_CACHE ?? join(tmpdir(), "miraigo-tts-cache-bc");
mkdirSync(CACHE, { recursive: true });
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
const probe = (f) => Number(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString());
const voiceName = (code) => "ja-JP-" + meta.voices[code].voice.split(" ")[0];

let totalSec = 0;
const times = [];
if (!NO_AUDIO && !errors.length) {
  mkdirSync(audioDir, { recursive: true });
  const parts = new Array(sents.length);
  const queue = sents.map((s, i) => ({ s, i }));
  const work = async () => {
    for (let job = queue.shift(); job; job = queue.shift()) {
      const { s, i } = job;
      const v = meta.voices[s.speaker].voice;
      const h = createHash("sha1").update("v3|" + v + "|" + spoken(s.ja)).digest("hex").slice(0, 16);
      const norm = join(CACHE, h + ".wav");
      if (!existsSync(norm)) {
        const raw = join(CACHE, h + ".raw.wav");
        writeFileSync(raw, await tts(spoken(s.ja), v));
        execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", raw, "-af", "loudnorm=I=-18:TP=-2:LRA=11", "-ar", "24000", "-ac", "1", "-c:a", "pcm_s16le", norm]);
        execFileSync("rm", [raw]);
      }
      parts[i] = norm;
    }
  };
  await Promise.all([work(), work(), work(), work()]);
  const sil = (sec) => {
    const f = join(CACHE, `silence-${sec}.wav`);
    if (!existsSync(f)) execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", String(sec), "-c:a", "pcm_s16le", f]);
    return f;
  };
  const list = [`file '${sil(0.3)}'`];
  let cur = 0.3;
  sents.forEach((s, i) => {
    if (i) { const g = s.speaker === sents[i - 1].speaker ? 0.6 : 0.9; list.push(`file '${sil(g)}'`); cur += g; }
    const d = probe(parts[i]);
    times.push([Math.round(cur * 100) / 100, Math.round((cur + d) * 100) / 100]);
    list.push(`file '${parts[i]}'`);
    cur += d;
  });
  list.push(`file '${sil(1.0)}'`);
  const listFile = join(CACHE, `${meta.id}.concat.txt`);
  writeFileSync(listFile, list.join("\n") + "\n");
  // Bỏ file audio từng câu của bản dựng cũ (chuẩn v2 mục 6b: không lưu file từng câu).
  for (const f of readdirSync(audioDir)) if (f !== "chapter.mp3") execFileSync("rm", [join(audioDir, f)]);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-ar", "24000", "-ac", "1", "-b:a", "64k", join(audioDir, "chapter.mp3")]);
  totalSec = probe(join(audioDir, "chapter.mp3"));
  console.log(`  audio: chapter.mp3 dài ${(totalSec / 60).toFixed(1)} phút`);
  if (totalSec < 300 || totalSec > 720) errors.push(`tập dài ${(totalSec / 60).toFixed(1)} phút, chuẩn kệ nghe là 5–12 phút`);
}

// ---------- bài học (chuẩn v2 mục 6c): lesson.txt ----------
// "G <mẫu> | <số câu ví dụ, từ 1>" rồi 11 dòng "lang: nghĩa".
// "Q <câu hỏi> | <lựa chọn 1> / <lựa chọn 2> / … | <số đáp án đúng, từ 1>" rồi 11 dòng "lang: giải thích".
const lesson = { grammarPoints: [], quiz: [] };
if (!JA_ONLY) {
  const lp = join(dir, "lesson.txt");
  if (!existsSync(lp)) errors.push("thiếu lesson.txt");
  else {
    let curItem = null;
    for (const row of readFileSync(lp, "utf8").split("\n")) {
      if (!row.trim() || row.startsWith("#")) continue;
      if (row.startsWith("G ")) {
        const [pat, ex] = row.slice(2).split("|").map((x) => x.trim());
        curItem = { pattern: pat, meaning: {}, example: Number(ex) - 1 };
        lesson.grammarPoints.push(curItem);
      } else if (row.startsWith("Q ")) {
        const [q, ch, ans] = row.slice(2).split("|").map((x) => x.trim());
        curItem = { ja: q, choices: ch.split(" / ").map((x) => x.trim()), answer: Number(ans) - 1, explain: {} };
        lesson.quiz.push(curItem);
      } else {
        const m2 = row.match(/^([a-zA-Z-]+):\s*(.+)$/);
        if (!m2 || !curItem) { errors.push(`lesson.txt: dòng lạ: ${row}`); continue; }
        (curItem.meaning ?? curItem.explain)[m2[1]] = m2[2].trim();
      }
    }
    for (const g of lesson.grammarPoints) {
      if (!LANGS.every((l) => g.meaning[l])) errors.push(`bài học: ${g.pattern} thiếu nghĩa 11 ngôn ngữ`);
      if (!(g.example >= 0 && g.example < sents.length) || !sents[g.example].ja.includes(g.pattern.replace(/^〜/, "").split(/[〜・／/（(]/)[0].slice(0, 2))) errors.push(`bài học: câu ví dụ ${g.example + 1} không chứa mẫu ${g.pattern}`);
    }
    for (const q of lesson.quiz) {
      if (!LANGS.every((l) => q.explain[l])) errors.push(`bài học: câu hỏi "${q.ja}" thiếu giải thích 11 ngôn ngữ`);
      if (q.choices.length < 3 || !(q.answer >= 0 && q.answer < q.choices.length)) errors.push(`bài học: câu hỏi "${q.ja}" sai lựa chọn/đáp án`);
    }
    if (lesson.grammarPoints.length < 2 || lesson.grammarPoints.length > 4) errors.push("bài học cần 2–4 điểm ngữ pháp");
    if (lesson.quiz.length < 3 || lesson.quiz.length > 5) errors.push("bài học cần 3–5 câu hỏi");
  }
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
  shelf: meta.shelf,
  ...(meta.series ? { series: meta.series } : {}),
  audioTrack: { src: `/audio/${meta.id}/chapter.mp3`, durationSec: Math.round(totalSec * 100) / 100 },
  lesson,
  sentences: sents.map((s, i) => ({
    ja: s.ja,
    furigana: s.furigana,
    romaji: romajiOf(s.tokens),
    translations: Object.fromEntries(LANGS.map((l) => [l, tr[l][i].t])),
    grammarNote: Object.fromEntries(LANGS.map((l) => [l, tr[l][i].n])),
    vocab: vocabOf[i],
    t: times[i],
    voice: voiceName(s.speaker),
    audio: `/audio/${meta.id}/chapter.mp3#t=${times[i]?.[0]},${times[i]?.[1]}`,
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
- **Audio**: một file liền \`public/audio/${meta.id}/chapter.mp3\`, ${(totalSec / 60).toFixed(1)} phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
${voiceRows}

- **Bài học**: ${lesson.grammarPoints.length} điểm ngữ pháp (${lesson.grammarPoints.map((g) => g.pattern).join(", ")}), ${lesson.quiz.length} câu hỏi hiểu bài. Kệ: \`${meta.shelf}\`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
`);
console.log(`  ✓ đã ghi content/stories/${meta.id}.json`);

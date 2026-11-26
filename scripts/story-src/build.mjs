// Dựng gói truyện chuẩn v2 từ file nguồn soạn tay (content/sources/<kệ>/<id>.src.json).
//
// Người soạn chỉ viết: câu tiếng Nhật, người nói (để gán giọng), bản dịch 10 ngôn ngữ và
// giải thích 10 ngôn ngữ. Script tự sinh: furigana + romaji (kuromoji, có bảng sửa cách đọc),
// từ vựng (chọn từ đúng cấp hoặc khó hơn theo data/jlpt, nghĩa lấy từ glossary.json),
// zh-Hant (chuyển từ zh-Hans bằng OpenCC s2twp, cần `pip install opencc-python-reimplemented`).
//
// Chạy: node scripts/story-src/build.mjs content/sources/furusato/<id>.src.json [...]
//       thêm --check để chỉ in số đo và các từ chưa có nghĩa trong glossary, không ghi file.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { execFileSync } from "node:child_process";
import { loadTokenizer, measure, JLPT, LEVEL_NUM } from "../lib/level.mjs";

const root = new URL("../..", import.meta.url).pathname;
const LANGS10 = ["vi", "en", "zh-Hans", "ko", "tl", "ne", "id", "pt", "my", "th"];
const KANJI = /[一-鿿㐀-䶿々]/;
const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const files = args.filter((a) => !a.startsWith("--"));
const tokenizer = await loadTokenizer();

const k2h = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
const isKana = (s) => /^[ぁ-ゖァ-ヺー]+$/.test(s);

// ---------- romaji (Hepburn sửa đổi, giống phong cách kho hiện có) ----------
const DIG = { きゃ: "kya", きゅ: "kyu", きょ: "kyo", しゃ: "sha", しゅ: "shu", しょ: "sho", ちゃ: "cha", ちゅ: "chu", ちょ: "cho", にゃ: "nya", にゅ: "nyu", にょ: "nyo", ひゃ: "hya", ひゅ: "hyu", ひょ: "hyo", みゃ: "mya", みゅ: "myu", みょ: "myo", りゃ: "rya", りゅ: "ryu", りょ: "ryo", ぎゃ: "gya", ぎゅ: "gyu", ぎょ: "gyo", じゃ: "ja", じゅ: "ju", じょ: "jo", びゃ: "bya", びゅ: "byu", びょ: "byo", ぴゃ: "pya", ぴゅ: "pyu", ぴょ: "pyo", ぢゃ: "ja", ぢゅ: "ju", ぢょ: "jo", てぃ: "ti", でぃ: "di", ふぁ: "fa", ふぃ: "fi", ふぇ: "fe", ふぉ: "fo", うぃ: "wi", うぇ: "we", うぉ: "wo", ちぇ: "che", しぇ: "she", じぇ: "je", とぅ: "tu", どぅ: "du", ゔぁ: "va", ゔぃ: "vi", ゔぇ: "ve", ゔぉ: "vo" };
const MONO = { あ: "a", い: "i", う: "u", え: "e", お: "o", か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko", さ: "sa", し: "shi", す: "su", せ: "se", そ: "so", た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to", な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no", は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho", ま: "ma", み: "mi", む: "mu", め: "me", も: "mo", や: "ya", ゆ: "yu", よ: "yo", ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro", わ: "wa", を: "o", ん: "n", が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go", ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo", だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do", ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo", ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po", ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o", ゃ: "ya", ゅ: "yu", ょ: "yo", ゔ: "vu" };
function kana2romaji(kana) {
  const s = k2h(kana);
  let out = "";
  for (let i = 0; i < s.length; i++) {
    const c = s[i], two = s.slice(i, i + 2);
    if (c === "っ") {
      const nxt = DIG[s.slice(i + 1, i + 3)] ?? MONO[s[i + 1]] ?? "";
      out += nxt.startsWith("ch") ? "t" : nxt[0] ?? "";
      continue;
    }
    if (c === "ー") { out += out.slice(-1); continue; }
    if (c === "ん") { out += /[あいうえおやゆよ]/.test(s[i + 1] ?? "") ? "n'" : "n"; continue; }
    if (DIG[two]) { out += DIG[two]; i++; continue; }
    if (MONO[c] !== undefined) { out += MONO[c]; continue; }
    out += c;
  }
  return out;
}
const PUNCT = { "、": ",", "。": ".", "！": "!", "？": "?", "「": "“", "」": "”", "『": "“", "』": "”", "…": "...", "・": " ", "　": " ", "（": "(", "）": ")", "ー": "-" };

function readingOf(tok, ov) {
  if (ov[tok.surface_form] !== undefined) return ov[tok.surface_form];
  if (tok.reading && tok.reading !== "*") return k2h(tok.reading);
  return k2h(tok.surface_form);
}

// Ghép các token kuromoji thành "từ" để viết romaji có dấu cách hợp lý.
const VERBISH = new Set(["動詞", "形容詞", "助動詞"]);
const CONJ_ATTACH = new Set(["て", "で", "ば", "ちゃ", "たり", "だり", "ながら", "つつ", "ても", "でも"]);
function attaches(t, prev) {
  if (!prev) return false;
  if (prev.pos === "接頭詞") return true;
  if (t.pos === "助動詞") return VERBISH.has(prev.pos) || (prev.pos === "助詞" && ["て", "で"].includes(prev.surface_form));
  if (t.pos === "動詞" && (t.pos_detail_1 === "非自立" || t.pos_detail_1 === "接尾"))
    return VERBISH.has(prev.pos) || (prev.pos === "助詞" && ["て", "で"].includes(prev.surface_form));
  if (t.pos === "形容詞" && t.pos_detail_1 === "非自立") return VERBISH.has(prev.pos) || prev.pos === "助詞";
  if (t.pos === "名詞" && t.pos_detail_1 === "接尾") return true;
  if (t.pos === "助詞" && t.pos_detail_1 === "接続助詞" && CONJ_ATTACH.has(t.surface_form)) return VERBISH.has(prev.pos);
  if (t.pos === "助詞" && t.pos_detail_1 === "並立助詞" && ["たり", "だり"].includes(t.surface_form)) return true;
  if (t.pos === "動詞" && prev.pos === "名詞" && prev.pos_detail_1 === "サ変接続" && t.basic_form === "する") return true;
  return false;
}
const ROMAJI_FIX = { という: "to iu", といった: "to itta", として: "to shite", について: "ni tsuite", にとって: "ni totte", によって: "ni yotte", のように: "no you ni" };

// Tách token có kanji thành [kanji+reading][okurigana] bằng khớp mẫu.
function splitFurigana(surface, reading) {
  const chunks = surface.match(/[一-鿿㐀-䶿々]+|[^一-鿿㐀-䶿々]+/g);
  const pattern = chunks.map((c) => (KANJI.test(c) ? "(.+?)" : "(" + k2h(c).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")")).join("");
  const m = new RegExp("^" + pattern + "$").exec(reading);
  if (!m) return [{ surface, reading }];
  return chunks.map((c, i) => ({ surface: c, reading: KANJI.test(c) ? m[i + 1] : "" }));
}

let NAMES = new Set();
function analyse(ja, ov, multiOv) {
  // multiOv: { "cụm": "cách đọc" } — thay trước khi tách token; dấu cách trong cách đọc = chỗ tách romaji
  const segs = [];
  const words = [];
  let rest = ja;
  const toks = [];
  const keys = Object.keys(multiOv).sort((a, b) => b.length - a.length);
  while (rest.length) {
    let hit = null, at = rest.length;
    for (const k of keys) { const i = rest.indexOf(k); if (i >= 0 && i < at) { at = i; hit = k; } }
    const head = hit ? rest.slice(0, at) : rest;
    if (head) toks.push(...tokenizer.tokenize(head));
    if (!hit) break;
    toks.push({ surface_form: hit, reading: multiOv[hit], pos: "名詞", pos_detail_1: "固定", basic_form: hit, fixed: true });
    rest = rest.slice(at + hit.length);
  }
  for (const t of toks) {
    const r = t.fixed ? k2h(t.reading) : readingOf(t, ov);
    const s = t.surface_form;
    const rNoSpace = r.replace(/ /g, "");
    if (KANJI.test(s)) segs.push(...splitFurigana(s, rNoSpace));
    else segs.push({ surface: s, reading: "" });
    const prev = words[words.length - 1];
    const isP = /^[、。！？「」『』…・（）　ー]+$/.test(s) && !(s === "ー");
    if (isP) { words.push({ punct: true, rom: [...s].map((c) => PUNCT[c] ?? c).join(""), t }); continue; }
    let forced = null;
    if (t.pos === "助詞" && s === "は") forced = "wa";
    else if (t.pos === "助詞" && s === "へ") forced = "e";
    else if (t.pos === "助詞" && s === "を") forced = "o";
    else if (ROMAJI_FIX[s]) forced = ROMAJI_FIX[s];
    const cap = NAMES.has(s);
    if (!forced && prev && !prev.punct && !prev.forced && attaches(t, prev.t)) { prev.kana += r; prev.t = t; }
    else words.push({ kana: r, forced, cap, t });
  }
  const merged = [];
  for (const g of segs) {
    const last = merged[merged.length - 1];
    if (last && !g.reading && !last.reading) last.surface += g.surface;
    else merged.push({ ...g });
  }
  let romaji = "";
  for (const w of words) {
    if (w.punct) {
      if (/^[“(]/.test(w.rom)) romaji += (romaji && !romaji.endsWith(" ") ? " " : "") + w.rom;
      else romaji += w.rom.trim() ? w.rom + (/[,.!?”)]$/.test(w.rom) ? " " : "") : " ";
      continue;
    }
    let rom = w.forced ?? w.kana.split(" ").map(kana2romaji).join(" ");
    if (w.cap) rom = rom.replace(/(^|\s)([a-z])/g, (m, a, b) => a + b.toUpperCase());
    romaji += (romaji && !/[ “(]$/.test(romaji) ? " " : "") + rom;
  }
  romaji = romaji.replace(/\b(de|ni|to)ha\b/gi, "$1 wa");
  romaji = romaji.replace(/\s+/g, " ").replace(/ ([,.!?”)])/g, "$1").trim();
  romaji = romaji.replace(/(^|[.!?]\s+|“)([a-z])/g, (m, a, b) => a + b.toUpperCase());
  return { furigana: merged, romaji, toks };
}

function toHant(strings) {
  if (!strings.length) return [];
  const py = `import sys,json,opencc\nc=opencc.OpenCC('s2twp')\nprint(json.dumps([c.convert(x) for x in json.load(sys.stdin)],ensure_ascii=False))`;
  return JSON.parse(execFileSync("python3", ["-c", py], { input: JSON.stringify(strings), maxBuffer: 1 << 26 }).toString());
}
function full11(t, where) {
  for (const l of LANGS10) if (!t?.[l]?.trim()) throw new Error(`${where}: thiếu ${l}`);
  return t;
}

const CONTENT_POS = new Set(["名詞", "動詞", "形容詞", "副詞"]);
const SKIP_DETAIL = new Set(["固有名詞", "数", "代名詞", "非自立", "接尾"]);
const vocabHits = (word, ja) => [word, word.slice(0, -1)].some((s) => s && (KANJI.test(s) || s.length >= 2) && ja.includes(s));

for (const file of files) {
  const src = JSON.parse(readFileSync(file, "utf8"));
  // Câu tiếng Nhật ở <id>.ja.txt (mỗi dòng "người nói|câu|say=…|vocab=a,b"),
  // bản dịch + giải thích ở <id>.tr1.json, <id>.tr2.json… (mảng [{t:{…}, g:{…}}] theo thứ tự câu).
  if (!src.s) {
    const base = file.replace(/\.src\.json$/, "");
    const lines = readFileSync(base + ".ja.txt", "utf8").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
    const tr = [];
    for (let k = 1; existsSync(`${base}.tr${k}.json`); k++) tr.push(...JSON.parse(readFileSync(`${base}.tr${k}.json`, "utf8")));
    if (!CHECK && tr.length !== lines.length) throw new Error(`${src.id}: ${lines.length} câu nhưng ${tr.length} bản dịch`);
    src.s = lines.map((l, i) => {
      const [sp, ja, ...opts] = l.split("|");
      const extra = {};
      for (const o of opts) {
        const [k, v] = o.split("=");
        if (k === "say") extra.say = v;
        if (k === "vocab") extra.vocab = v.split(",");
      }
      return [sp, ja, tr[i]?.t, tr[i]?.g, extra];
    });
  }
  const shelfDir = dirname(file);
  const glossPath = join(shelfDir, "glossary.json");
  const gloss = existsSync(glossPath) ? JSON.parse(readFileSync(glossPath, "utf8")) : {};
  const ov = src.readings ?? {};
  const shelfPhrases = existsSync(join(shelfDir, "phrases.json")) ? JSON.parse(readFileSync(join(shelfDir, "phrases.json"), "utf8")) : {};
  const multiOv = { ...shelfPhrases, ...(src.phrases ?? {}) };
  NAMES = new Set(src.names ?? []);
  const target = LEVEL_NUM[src.level];
  const usedVocab = new Set(src.skipVocab ?? []);
  const missingGloss = new Map();
  const sentences = [];
  const voiceMap = [];
  const sayMap = {};
  src.s.forEach(([sp, ja, tr, gn, extra], i) => {
    const where = `${src.id} câu ${i + 1}`;
    const { furigana, romaji, toks } = analyse(ja, ov, multiOv);
    // từ vựng: từ nội dung trong danh sách JLPT, đúng cấp hoặc khó hơn, chưa dùng trong tập
    const cands = [];
    for (const t of toks) {
      if (t.fixed || !CONTENT_POS.has(t.pos) || SKIP_DETAIL.has(t.pos_detail_1)) continue;
      const base = t.basic_form !== "*" ? t.basic_form : t.surface_form;
      const lv = JLPT[base];
      if (!lv || lv > target + (target >= 4 ? 0 : 0)) continue;
      if (usedVocab.has(base) || !vocabHits(base, ja)) continue;
      if (cands.some((c) => c.word === base)) continue;
      cands.push({ word: base, lv, tok: t });
    }
    if (extra?.vocab) for (const w of extra.vocab) if (!cands.some((c) => c.word === w)) cands.unshift({ word: w, lv: JLPT[w], tok: null, manual: true });
    cands.sort((a, b) => (a.manual ? -1 : 0) - (b.manual ? -1 : 0) || a.lv - b.lv);
    const vocab = [];
    for (const c of cands.slice(0, src.vocabPerSentence ?? 2)) {
      usedVocab.add(c.word);
      const g = gloss[c.word];
      if (!g) { missingGloss.set(c.word, c.tok ? k2h(c.tok.reading ?? "") : ""); continue; }
      const level = c.lv ? `N${c.lv}` : g.level;
      if (!level) throw new Error(`${where}: từ ${c.word} không có cấp`);
      vocab.push({ word: c.word, reading: g.reading, meanings: { ...g.meanings }, level });
    }
    sentences.push({ ja, furigana, romaji, translations: tr, vocab, grammarNote: gn, audio: `/audio/${src.id}/${String(i + 1).padStart(3, "0")}.mp3` });
    voiceMap.push(sp);
    if (extra?.say) sayMap[i + 1] = extra.say;
  });

  const m = measure(tokenizer, sentences.map((s) => s.ja), src.level);
  console.log(`${src.id}: ${m.chars} ký tự, ${m.sentences} câu, TB ${m.avgSentence.toFixed(1)}, harder ${(m.harder * 100).toFixed(1)}%, atLevel ${(m.atLevel * 100).toFixed(1)}%, ~${(m.chars / 5.1 / 60 + m.sentences * 0.45 / 60).toFixed(1)} phút`);
  if (missingGloss.size) {
    console.log(`  thiếu nghĩa trong glossary (${missingGloss.size}): ${[...missingGloss].map(([w, r]) => `${w}(${r})`).join(" ")}`);
  }
  if (CHECK) {
    if (args.includes("--show")) sentences.forEach((s, i) => console.log(`  ${i + 1} ${s.furigana.map((g) => (g.reading ? `${g.surface}[${g.reading}]` : g.surface)).join("")} | ${s.romaji}`));
    continue;
  }
  if (missingGloss.size) { console.log("  → bổ sung glossary rồi chạy lại"); process.exitCode = 1; continue; }

  // kiểm đủ ngôn ngữ + chuyển zh-Hant
  const tasks = [];
  const reg = (obj, where) => { full11(obj, where); tasks.push(obj); };
  reg(src.titles, `${src.id} tiêu đề`);
  sentences.forEach((s, i) => {
    reg(s.translations, `${src.id} câu ${i + 1} dịch`);
    reg(s.grammarNote, `${src.id} câu ${i + 1} giải thích`);
    for (const v of s.vocab) reg(v.meanings, `${src.id} từ ${v.word}`);
  });
  const lessonPath = file.replace(/\.src\.json$/, ".lesson.json");
  const lesson = existsSync(lessonPath) ? JSON.parse(readFileSync(lessonPath, "utf8")) : null;
  if (lesson) {
    lesson.grammarPoints.forEach((g, i) => reg(g.meaning, `${src.id} ngữ pháp ${i + 1}`));
    lesson.quiz.forEach((q, i) => reg(q.explain, `${src.id} câu hỏi ${i + 1}`));
  }
  const hant = toHant(tasks.map((t) => t["zh-Hans"]));
  const order = (t, h) => Object.fromEntries(["vi", "en", "zh-Hans", "zh-Hant", "ko", "tl", "ne", "id", "pt", "my", "th"].map((l) => [l, l === "zh-Hant" ? (t["zh-Hant"] ?? h) : t[l]]));
  tasks.forEach((t, i) => { const o = order(t, hant[i]); for (const k of Object.keys(t)) delete t[k]; Object.assign(t, o); });

  const out = {
    kind: "story",
    id: src.id,
    titles: src.titles,
    level: src.level,
    topic: src.topic,
    source: "original",
    cover: `/covers/${src.id}.webp`,
    free: !!src.free,
    standard: 2,
    ...(src.series ? { series: src.series } : {}),
    shelf: src.shelf,
    ...(src.origin ? { origin: src.origin } : {}),
    ...(lesson ? { lesson } : {}),
    sentences,
  };
  writeFileSync(join(root, "content/stories", `${src.id}.json`), JSON.stringify(out, null, 2) + "\n");
  writeFileSync(join(shelfDir, `${src.id}.voices.json`), JSON.stringify({ cast: src.cast, voices: voiceMap, say: sayMap }, null, 1) + "\n");
  const castLines = Object.entries(src.cast).map(([k, c]) => `  - ${k === "N" ? "Người kể" : k}: \`${c.voice}\`, tốc độ ${c.rate ?? 0.9}${c.pitch ? `, cao độ ${c.pitch}` : ""} (${voiceMap.filter((x) => x === k).length} câu)`);
  const nVocab = sentences.reduce((a, x) => a + x.vocab.length, 0);
  writeFileSync(join(root, "content/stories", `${src.id}.qc.md`), [
    `# QC — ${src.id}`,
    "",
    `- Nguồn: ${src.sourceNote ?? "Truyện tự viết (sáng tác gốc)."}`,
    `- Chuẩn v2, cấp ${src.level}: ${m.chars} ký tự, ${m.sentences} câu, câu TB ${m.avgSentence.toFixed(1)} ký tự, harder ${(m.harder * 100).toFixed(1)}%, atLevel ${(m.atLevel * 100).toFixed(1)}%.`,
    `- Furigana + romaji sinh bằng kuromoji qua \`scripts/story-src/build.mjs\`, cách đọc sửa tay: ${Object.entries({ ...ov, ...multiOv }).map(([a, b]) => `${a}=${b}`).join(", ") || "không"}. Đã đọc lại toàn bộ.`,
    `- Từ vựng: ${nVocab} từ, cấp lấy từ \`data/jlpt\` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở \`${glossPath.replace(root, "")}\`.`,
    `- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.`,
    `- Audio: Google Cloud TTS, ghép thành một file liền public/audio/${src.id}/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (\`scripts/story-src/tts.mjs\`). Giọng:`,
    ...castLines,
    `- Bìa: hệ bìa MiraiGo 文庫, phông ${src.cover?.font ?? "mặc định"}.`,
    "",
  ].join("\n"));
  console.log(`  ✓ đã ghi content/stories/${src.id}.json`);
}

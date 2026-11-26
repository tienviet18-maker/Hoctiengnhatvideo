// Dựng một gói truyện chuẩn v2 từ nguồn trong content/sources/v2/<bộ>/.
//
//   node scripts/produce/build-story.mjs <đường-dẫn/chương.ja.txt> [--measure] [--readings]
//
// Nguồn gồm 3 file cạnh nhau:
//   <chương>.ja.txt     phần đầu (front matter) + mỗi dòng một câu. Câu có lời thoại tách đoạn bằng "|",
//                       mỗi đoạn mở đầu bằng {vai}: {n}…|{hanshichi}「…」|{n}と言いました。
//   <chương>.i18n.json  { titles, sentences: [{ tr, note, vocab: [{ word, reading?, m }] }] } (11 ngôn ngữ)
//   voices.json         vai -> giọng Google TTS (dùng chung cả bộ để nhân vật giữ một giọng)
//
// --measure  : chỉ in số đo cấp độ (không cần i18n), dùng khi đang soạn tiếng Nhật.
// --readings : in cách đọc kuromoji của mọi cụm có kanji để soát furigana bằng mắt.
// Không cờ   : ghi content/stories/<id>.json (audio/cover được tạo riêng bằng tts.mjs, cover.mjs).
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { loadTokenizer, measure, wordLevel, vocabLevel } from "../lib/level.mjs";

const root = new URL("../..", import.meta.url).pathname;
export const LANGS = ["vi", "en", "zh-Hans", "zh-Hant", "ko", "tl", "ne", "id", "pt", "my", "th"];
const LV = { 5: "N5", 4: "N4", 3: "N3", 2: "N2", 1: "N1" };
const KANJI = /[一-鿿㐀-䶿々〆ヶ]/;
const kata2hira = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

export function parseSource(file) {
  const raw = readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: thiếu front matter`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const readings = {};
  for (const p of (meta.readings ?? "").split(/[,、]/).map((x) => x.trim()).filter(Boolean)) {
    const [w, r] = p.split("=");
    readings[w.trim()] = r.trim();
  }
  const sentences = m[2]
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const segs = l.split("|").map((s) => {
        const mm = s.match(/^\{([a-z0-9-]+)\}(.*)$/);
        if (!mm) throw new Error(`${file}: đoạn thiếu {vai}: ${s}`);
        return { role: mm[1], text: mm[2] };
      });
      return { ja: segs.map((s) => s.text).join(""), segs };
    });
  return { meta, readings, sentences };
}

/** Tách cụm kanji+okurigana theo cách đọc: 呼び/よび -> [呼:よ][び] */
function alignToken(surface, reading) {
  if (!KANJI.test(surface)) return [{ surface, reading: "" }];
  const parts = surface.match(/[一-鿿㐀-䶿々〆ヶ]+|[^一-鿿㐀-䶿々〆ヶ]+/g);
  const re = new RegExp("^" + parts.map((p) => (KANJI.test(p) ? "(.+?)" : `(${kata2hira(p).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`)).join("") + "$");
  const mm = kata2hira(reading).match(re);
  if (!mm) return [{ surface, reading: kata2hira(reading) }];
  return parts.map((p, i) => ({ surface: p, reading: KANJI.test(p) ? mm[i + 1] : "" }));
}

export function tokenizeSentence(tokenizer, ja, readings) {
  // Ghép tay các từ có cách đọc riêng (tên người, từ cổ) trước khi tách.
  const fixed = Object.keys(readings).sort((a, b) => b.length - a.length);
  const pieces = [];
  let rest = ja;
  while (rest) {
    let hit = -1, word = null;
    for (const w of fixed) {
      const i = rest.indexOf(w);
      if (i >= 0 && (hit < 0 || i < hit)) { hit = i; word = w; }
    }
    if (hit < 0) { pieces.push({ text: rest }); break; }
    if (hit > 0) pieces.push({ text: rest.slice(0, hit) });
    pieces.push({ text: word, reading: readings[word] });
    rest = rest.slice(hit + word.length);
  }
  const toks = [];
  for (const p of pieces) {
    if (p.reading) toks.push({ surface: p.text, reading: p.reading, pos: "名詞", fixed: true });
    else for (const t of tokenizer.tokenize(p.text))
      toks.push({ surface: t.surface_form, reading: t.reading ? kata2hira(t.reading) : t.surface_form, pos: t.pos, d1: t.pos_detail_1, base: t.basic_form });
  }
  return toks;
}

function furiganaOf(toks) {
  const out = [];
  for (const t of toks) for (const g of alignToken(t.surface, t.reading)) {
    const last = out[out.length - 1];
    if (!g.reading && last && !last.reading) last.surface += g.surface;
    else out.push({ ...g });
  }
  return out;
}

const ROMA = (() => {
  const base = {
    あ: "a", い: "i", う: "u", え: "e", お: "o", か: "ka", き: "ki", く: "ku", け: "ke", こ: "ko",
    さ: "sa", し: "shi", す: "su", せ: "se", そ: "so", た: "ta", ち: "chi", つ: "tsu", て: "te", と: "to",
    な: "na", に: "ni", ぬ: "nu", ね: "ne", の: "no", は: "ha", ひ: "hi", ふ: "fu", へ: "he", ほ: "ho",
    ま: "ma", み: "mi", む: "mu", め: "me", も: "mo", や: "ya", ゆ: "yu", よ: "yo",
    ら: "ra", り: "ri", る: "ru", れ: "re", ろ: "ro", わ: "wa", ゐ: "i", ゑ: "e", を: "o", ん: "n",
    が: "ga", ぎ: "gi", ぐ: "gu", げ: "ge", ご: "go", ざ: "za", じ: "ji", ず: "zu", ぜ: "ze", ぞ: "zo",
    だ: "da", ぢ: "ji", づ: "zu", で: "de", ど: "do", ば: "ba", び: "bi", ぶ: "bu", べ: "be", ぼ: "bo",
    ぱ: "pa", ぴ: "pi", ぷ: "pu", ぺ: "pe", ぽ: "po", ぁ: "a", ぃ: "i", ぅ: "u", ぇ: "e", ぉ: "o", ゔ: "vu",
  };
  const yo = { ゃ: "a", ゅ: "u", ょ: "o" };
  return function (h) {
    let s = "";
    for (let i = 0; i < h.length; i++) {
      const c = h[i], n = h[i + 1];
      if (c === "っ") { const nx = ROMA_ONE(h.slice(i + 1)); s += nx ? (nx.startsWith("ch") ? "t" : nx[0]) : ""; continue; }
      if (c === "ー") { const v = s.match(/[aeiou]$/); s += v ? v[0] : ""; continue; }
      if (n && yo[n] && base[c]) {
        const b = base[c];
        s += (b.startsWith("sh") || b.startsWith("ch") || b === "ji" ? b.slice(0, -1) : b.slice(0, -1) + "y") + yo[n];
        i++;
        continue;
      }
      if (c === "ん" && n && /[あいうえおやゆよ]/.test(n)) { s += "n'"; continue; }
      s += base[c] ?? c;
    }
    return s;
    function ROMA_ONE(rest) { return rest ? (base[rest[0]] ?? "") : ""; }
  };
})();

const PUNCT = { "、": ",", "。": ".", "「": "“", "」": "”", "『": "“", "』": "”", "？": "?", "！": "!", "…": "...", "・": " ", "　": " ", "（": "(", "）": ")", "―": "—", "ー": "-" };
function romajiOf(toks) {
  let out = "";
  let gem = false; // っ ở cuối token: nhân đôi phụ âm đầu của token sau
  for (const t of toks) {
    if (PUNCT[t.surface] !== undefined || t.pos === "記号") {
      const p = [...t.surface].map((c) => PUNCT[c] ?? c).join("");
      out += p === "\u201c" ? " " + p : p;
      gem = false;
      continue;
    }
    let h = kata2hira(t.reading);
    const endsGem = h.endsWith("っ");
    if (endsGem) h = h.slice(0, -1);
    let r = ROMA(h);
    if (t.pos === "助詞" && t.surface === "は") r = "wa";
    if (t.pos === "助詞" && t.surface === "へ") r = "e";
    if (t.pos === "助詞" && t.surface === "を") r = "o";
    if (t.surface === "という") r = "to iu";
    if (gem && r) r = (r.startsWith("ch") ? "t" : r[0]) + r;
    gem = endsGem;
    const copula = t.pos === "助動詞" && /^(です|でし|だ|だっ|でしょ|だろ)/.test(t.surface);
    const attach =
      (t.pos === "助動詞" && !copula) || t.d1 === "接尾" ||
      (t.pos === "助詞" && t.d1 === "接続助詞" && /^(て|で|ば)$/.test(t.surface)) ||
      (t.pos === "形容詞" && t.d1 === "非自立" && false);
    const afterQuote = out.endsWith("\u201c");
    out += (attach || afterQuote || !out ? "" : " ") + r;
  }
  out = out.replace(/\s+([,.?!\u201d)])/g, "$1").replace(/\s+/g, " ").trim();
  return out.replace(/^([^A-Za-z]*)([a-z])/, (m, a, b) => a + b.toUpperCase()).replace(/([.?!]\s*\u201c?|\u201c)([a-z])/g, (m, a, b) => a + b.toUpperCase());
}

/**
 * Bản dịch ở dạng gọn <chương>.i18n.txt (có thể chia nhiều phần <chương>.i18n.1.txt, .2.txt…):
 *   TITLE vi|en|zh-Hans|zh-Hant|ko|tl|ne|id|pt|my|th
 *   @12                       (số câu, đếm từ 1)
 *   T  bản dịch 11 ngôn ngữ, cách nhau bằng |, đúng thứ tự LANGS
 *   N  giải thích (grammarNote) 11 ngôn ngữ
 *   V  từ[=cách đọc][@N2]: nghĩa 11 ngôn ngữ      (@cấp chỉ dùng khi từ không có trong danh sách JLPT)
 */
function split11Of(s, where) {
  const a = s.split("|").map((x) => x.trim());
  if (a.length !== LANGS.length) throw new Error(`${where}: có ${a.length} ô, cần ${LANGS.length}`);
  return Object.fromEntries(LANGS.map((l, i) => [l, a[i]]));
}

export function loadI18n(dir, chap) {
  const files = readdirSync(dir).filter((f) => f === `${chap}.i18n.txt` || new RegExp(`^${chap}\\.i18n\\.\\d+\\.txt$`).test(f))
    .sort((a, b) => (Number(a.split(".").at(-2)) || 0) - (Number(b.split(".").at(-2)) || 0));
  if (!files.length) throw new Error(`${chap}: chưa có file i18n`);
  const split11 = (x, where) => split11Of(x, `${chap} ${where}`);
  const out = { titles: null, sentences: [] };
  let cur = null;
  for (const f of files) for (const raw of readFileSync(join(dir, f), "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("TITLE ")) { out.titles = split11(line.slice(6), "TITLE"); continue; }
    const at = line.match(/^@(\d+)$/);
    if (at) {
      const n = Number(at[1]);
      if (n !== out.sentences.length + 1) throw new Error(`${chap}: @${n} không liền mạch (đang ở câu ${out.sentences.length})`);
      cur = { vocab: [] };
      out.sentences.push(cur);
      continue;
    }
    if (!cur) throw new Error(`${chap}: dòng trước @1: ${line}`);
    const tag = line.slice(0, 2);
    const body = line.slice(2).trim();
    if (tag === "T ") cur.tr = split11(body, `câu ${out.sentences.length} T`);
    else if (tag === "N ") cur.note = split11(body, `câu ${out.sentences.length} N`);
    else if (tag === "V ") {
      const i = body.indexOf(":");
      const head = body.slice(0, i).trim();
      const mm = head.match(/^([^=@]+)(?:=([^@]+))?(?:@(N[1-5]))?$/);
      cur.vocab.push({ word: mm[1].trim(), reading: mm[2]?.trim(), level: mm[3], m: split11(body.slice(i + 1), `câu ${out.sentences.length} V ${mm[1]}`) });
    } else if (tag === "R ") cur.romaji = body;
    else throw new Error(`${chap}: dòng không hiểu: ${line}`);
  }
  return out;
}

// Cách đọc của dạng từ điển: kuromoji chỉ cho cách đọc của dạng đã chia (雇っ → やとっ).
// Bỏ phần đuôi kana khác nhau của dạng chia, nối đuôi của dạng từ điển (→ やとう).
function baseReading(tok, word) {
  const r = kata2hira(tok.reading);
  if (tok.surface === word) return r;
  let k = 0;
  while (k < tok.surface.length && tok.surface[k] === word[k]) k++;
  const cut = tok.surface.length - k;
  return (cut ? r.slice(0, -cut) : r) + kata2hira(word.slice(k));
}

/**
 * Bài học của chương (chuẩn v2 mục 6c), file <chương>.lesson.txt:
 *   G 〜ことにする #26: nghĩa 11 ngôn ngữ (vi|en|…)      (#số câu ví dụ, đếm từ 1 như @ trong i18n)
 *   Q câu hỏi tiếng Nhật | lựa chọn 1 / lựa chọn 2 / lựa chọn 3 | số thứ tự đáp án đúng (từ 1)
 *   X giải thích đáp án 11 ngôn ngữ
 */
function loadLesson(dir, chap, nSent, errs) {
  const f = join(dir, `${chap}.lesson.txt`);
  if (!existsSync(f)) { errs.push(`chưa có ${chap}.lesson.txt`); return undefined; }
  const lesson = { grammarPoints: [], quiz: [] };
  for (const raw of readFileSync(f, "utf8").split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const tag = line.slice(0, 2), body = line.slice(2).trim();
    if (tag === "G ") {
      const i = body.indexOf(":");
      const mm = body.slice(0, i).trim().match(/^(.+?)\s+#(\d+)$/);
      if (!mm) throw new Error(`${chap}.lesson: dòng G sai: ${line}`);
      const example = Number(mm[2]) - 1;
      if (example < 0 || example >= nSent) errs.push(`lesson: câu ví dụ #${mm[2]} không có`);
      lesson.grammarPoints.push({ pattern: mm[1], meaning: split11Of(body.slice(i + 1), `${chap}.lesson G ${mm[1]}`), example });
    } else if (tag === "Q ") {
      const [ja, ch, ans] = body.split("|").map((x) => x.trim());
      const choices = ch.split(" / ").map((x) => x.trim());
      const answer = Number(ans) - 1;
      if (!(answer >= 0 && answer < choices.length)) errs.push(`lesson: đáp án sai ở câu hỏi ${ja}`);
      lesson.quiz.push({ ja, choices, answer });
    } else if (tag === "X ") {
      lesson.quiz.at(-1).explain = split11Of(body, `${chap}.lesson X ${lesson.quiz.length}`);
    } else throw new Error(`${chap}.lesson: dòng không hiểu: ${line}`);
  }
  return lesson;
}

export async function build(file, { mode } = {}) {
  const dir = dirname(file);
  const chap = basename(file).replace(/\.ja\.txt$/, "");
  const src = parseSource(file);
  const { meta } = src;
  const tokenizer = await loadTokenizer();
  const sents = src.sentences.map((s) => ({ ...s, toks: tokenizeSentence(tokenizer, s.ja, src.readings) }));

  if (mode === "measure" || mode === "readings") {
    const m = measure(tokenizer, sents.map((s) => s.ja), meta.level);
    console.log(`${meta.id} ${meta.level}: ${m.chars} ký tự, ${m.sentences} câu, TB ${m.avgSentence.toFixed(1)}, harder ${(m.harder * 100).toFixed(1)}%, atLevel ${(m.atLevel * 100).toFixed(1)}%, unlisted ${(m.unlisted * 100).toFixed(1)}%`);
    if (mode === "readings") {
      sents.forEach((s, i) => console.log(`${i + 1}. ` + s.toks.filter((t) => KANJI.test(t.surface)).map((t) => `${t.surface}(${t.reading})`).join(" ")));
    } else {
      // gợi ý từ vựng: từ khó hơn hoặc đúng cấp
      const target = { N5: 5, N4: 4, N3: 3, N2: 2, N1: 1 }[meta.level];
      sents.forEach((s, i) => {
        const hard = [...new Set(s.toks.filter((t) => ["名詞", "動詞", "形容詞", "副詞"].includes(t.pos)).map((t) => {
          const b = t.base && t.base !== "*" ? t.base : t.surface;
          const l = wordLevel(b) ?? wordLevel(t.surface, t.reading);
          return l && l <= target ? `${b}${l < target ? "↑" : ""}N${l}` : null;
        }).filter(Boolean))];
        if (hard.length) console.log(`  ${i + 1}: ${hard.join(" ")}`);
      });
    }
    return;
  }

  const i18n = loadI18n(dir, chap);
  if (i18n.sentences.length !== sents.length)
    throw new Error(`${chap}: ${sents.length} câu tiếng Nhật nhưng i18n có ${i18n.sentences.length}`);
  const errs = [];
  const tf = join(dir, `${chap}.timing.json`);
  const timing = existsSync(tf) ? JSON.parse(readFileSync(tf, "utf8")) : null;
  if (timing && timing.t.length !== sents.length) errs.push(`timing có ${timing.t.length} câu, khác ${sents.length}: chạy lại tts.mjs`);
  const full = (o) => LANGS.every((l) => typeof o?.[l] === "string" && o[l].trim());
  if (!full(i18n.titles)) errs.push("titles thiếu ngôn ngữ");
  const sentences = sents.map((s, i) => {
    const x = i18n.sentences[i];
    if (!full(x.tr)) errs.push(`câu ${i + 1}: tr thiếu ${LANGS.filter((l) => !x.tr?.[l]).join(",")}`);
    if (!full(x.note)) errs.push(`câu ${i + 1}: note thiếu ${LANGS.filter((l) => !x.note?.[l]).join(",")}`);
    const vocab = (x.vocab ?? []).map((v) => {
      const tok = s.toks.find((t) => t.base === v.word || t.surface === v.word);
      const reading = v.reading ?? (tok ? baseReading(tok, v.word) : "");
      const l = vocabLevel(v.word, reading);
      const level = l ? LV[l] : v.level;
      if (!level) errs.push(`câu ${i + 1}: từ ${v.word} không có trong danh sách JLPT, cần "level" + lý do trong .qc.md`);
      if (!full(v.m)) errs.push(`câu ${i + 1}: nghĩa từ ${v.word} thiếu ngôn ngữ`);
      return { word: v.word, reading: kata2hira(reading), meanings: v.m, level };
    });
    return {
      ja: s.ja,
      furigana: furiganaOf(s.toks),
      romaji: x.romaji ?? romajiOf(s.toks),
      translations: x.tr,
      grammarNote: x.note,
      vocab,
      audio: timing ? `${timing.src}#t=${timing.t[i][0]},${timing.t[i][1]}` : "",
      ...(timing ? { t: timing.t[i], voice: timing.voice[i] } : {}),
    };
  });
  if (!timing) errs.push(`chưa có ${chap}.timing.json: chạy scripts/produce/tts.mjs trước`);
  const lesson = loadLesson(dir, chap, sents.length, errs);
  if (!meta.shelf) errs.push("thiếu shelf trong phần đầu file");
  if (errs.length) { console.error(errs.join("\n")); process.exit(1); }
  const out = {
    kind: "story",
    id: meta.id,
    titles: i18n.titles,
    level: meta.level,
    topic: meta.topic,
    source: meta.source,
    cover: `/covers/${meta.id}.webp`,
    free: meta.free === "true",
    standard: 2,
    ...(meta.series ? { series: { id: meta.series, index: Number(meta.index) } } : {}),
    ...(meta.author ? { author: meta.author } : {}),
    shelf: meta.shelf,
    ...(meta.origin ? { origin: meta.origin } : {}),
    ...(timing ? { audioTrack: { src: timing.src, durationSec: timing.durationSec } } : {}),
    lesson,
    sentences,
  };
  writeFileSync(join(root, "content/stories", `${meta.id}.json`), JSON.stringify(out, null, 1) + "\n");
  if (out.lesson) execFileSync("node", [join(root, "scripts/lesson-furigana.mjs"), meta.id], { stdio: "inherit" });
  // Bản dịch kèm (content/translations/<lang>/<id>.tsv, ví dụ tiếng Sinhala) gộp lại sau mỗi lần dựng.
  for (const lang of existsSync(join(root, "content/translations")) ? readdirSync(join(root, "content/translations")) : [])
    if (existsSync(join(root, "content/translations", lang, `${meta.id}.tsv`)))
      execFileSync("node", [join(root, "scripts/i18n/apply.mjs"), lang, meta.id], { stdio: "inherit" });
  console.log(`✓ ${meta.id}: ${sentences.length} câu -> content/stories/${meta.id}.json`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const file = process.argv[2];
  if (!file || !existsSync(file)) { console.error("cần đường dẫn .ja.txt"); process.exit(1); }
  const mode = process.argv.includes("--measure") ? "measure" : process.argv.includes("--readings") ? "readings" : undefined;
  await build(file, { mode });
}

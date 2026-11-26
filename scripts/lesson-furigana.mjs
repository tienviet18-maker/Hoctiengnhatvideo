#!/usr/bin/env node
// Sinh furigana cho phần Bài học của truyện (mẫu ngữ pháp, câu hỏi, lựa chọn).
// Quy tắc của Việt: MỌI chữ kanji trong app phải có furigana.
// Cách đọc ưu tiên lấy từ chính furigana các câu trong truyện (đã sửa tay), rồi `phrases`
// trong content/sources/*/<id>.src.json, cuối cùng mới tới kuromoji.
//   node scripts/lesson-furigana.mjs            → ghi lại mọi truyện có lesson
//   node scripts/lesson-furigana.mjs <id>...    → chỉ các truyện này
//   node scripts/lesson-furigana.mjs --check    → báo lỗi nếu còn kanji chưa có furigana (không ghi)
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTokenizer } from "./lib/level.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const KANJI = /[一-鿿㐀-䶿々]/;
const k2h = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

function splitFurigana(surface, reading) {
  const chunks = surface.match(/[一-鿿㐀-䶿々]+|[^一-鿿㐀-䶿々]+/g);
  const pattern = chunks.map((c) => (KANJI.test(c) ? "(.+?)" : "(" + k2h(c).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")")).join("");
  const m = new RegExp("^" + pattern + "$").exec(reading);
  if (!m) return [{ surface, reading }];
  return chunks.map((c, i) => ({ surface: c, reading: KANJI.test(c) ? m[i + 1] : "" }));
}

function merge(segs) {
  const out = [];
  for (const g of segs) {
    const last = out[out.length - 1];
    if (last && !g.reading && !last.reading) last.surface += g.surface;
    else out.push({ ...g });
  }
  return out;
}

const srcIndex = {};
const srcDir = join(root, "content/sources");
if (existsSync(srcDir))
  for (const shelf of readdirSync(srcDir, { withFileTypes: true }).filter((d) => d.isDirectory()))
    for (const f of readdirSync(join(srcDir, shelf.name)).filter((f) => f.endsWith(".src.json")))
      srcIndex[f.replace(/\.src\.json$/, "")] = join(srcDir, shelf.name, f);

function makeAnnotator(tokenizer, story) {
  // Từ điển cách đọc lấy từ chính truyện: mỗi đoạn kanji (kèm okurigana phía sau) → cách đọc
  const known = {};
  for (const s of story.sentences ?? [])
    for (const g of s.furigana ?? []) if (g.reading && KANJI.test(g.surface) && !(g.surface in known)) known[g.surface] = g.reading;
  let phrases = { 一人: "ひとり", 二人: "ふたり", 大人: "おとな", 今日: "きょう", 明日: "あした", 昨日: "きのう", 一つ: "ひとつ", 二つ: "ふたつ", 三つ: "みっつ",
    一本: "いっぽん", 三本: "さんぼん", 四人: "よにん", 七日: "なのか", 夜中: "よなか", 救急車: "きゅうきゅうしゃ",
    何色: "なにいろ", お母さん: "おかあさん", 何時: "なんじ",
    何文: "なんもん", 一文: "いちもん", 十五文: "じゅうごもん", 十六文: "じゅうろくもん", 十七文: "じゅうななもん" };
  const sp = srcIndex[story.id];
  if (sp) {
    const src = JSON.parse(readFileSync(sp, "utf8"));
    phrases = { ...phrases, ...(src.readings ?? {}), ...(src.phrases ?? {}) };
  }
  for (const [k, v] of Object.entries(phrases)) if (KANJI.test(k)) phrases[k] = k2h(v.replace(/[ ・]/g, (c) => (c === "・" && k.includes("・") ? c : "")));
  // Từ nhiều chữ đã có trong truyện (tên riêng, cách đọc đã sửa tay) cũng ghép nguyên cụm
  for (const [k, v] of Object.entries(known)) if ([...k].length >= 2 && !(k in phrases)) phrases[k] = v;
  const keys = Object.keys(phrases).filter((k) => KANJI.test(k)).sort((a, b) => b.length - a.length);

  return function annotate(text) {
    if (!KANJI.test(text)) return null;
    const segs = [];
    let rest = text;
    while (rest.length) {
      let hit = null, at = rest.length;
      for (const k of keys) { const i = rest.indexOf(k); if (i >= 0 && i < at) { at = i; hit = k; } }
      const head = hit ? rest.slice(0, at) : rest;
      if (head)
        for (const t of tokenizer.tokenize(head)) {
          const s = t.surface_form;
          if (!KANJI.test(s)) { segs.push({ surface: s, reading: "" }); continue; }
          if (known[s] && ([...s].length >= 2 || t.pos_detail_1 === "固有名詞")) { segs.push({ surface: s, reading: known[s] }); continue; }
          const r = t.reading && t.reading !== "*" ? k2h(t.reading) : "";
          segs.push(...(r ? splitFurigana(s, r) : [{ surface: s, reading: "" }]));
        }
      if (!hit) break;
      segs.push(...splitFurigana(hit, phrases[hit]));
      rest = rest.slice(at + hit.length);
    }
    // Đoạn kanji đơn lẻ kuromoji không đọc được: thử tra từng chữ trong từ điển của truyện
    for (const g of segs) if (KANJI.test(g.surface) && !g.reading && known[g.surface]) g.reading = known[g.surface];
    // Đứng một mình, 都 trong truyện xưa luôn là みやこ (kuromoji hay đọc と)
    for (const g of segs) if (g.surface === "都" && g.reading === "と") g.reading = "みやこ";
    return merge(segs);
  };
}

const missing = (segs) => !segs || segs.some((g) => KANJI.test(g.surface) && !g.reading);

const args = process.argv.slice(2);
const check = args.includes("--check");
const only = args.filter((a) => !a.startsWith("--"));
const dir = join(root, "content/stories");
const files = readdirSync(dir).filter((f) => f.endsWith(".json") && (!only.length || only.includes(f.replace(/\.json$/, ""))));
const tokenizer = check ? null : await loadTokenizer();
let written = 0, problems = [];
for (const f of files) {
  const p = join(dir, f);
  const story = JSON.parse(readFileSync(p, "utf8"));
  const L = story.lesson;
  if (!L) continue;
  if (check) {
    L.grammarPoints.forEach((g, i) => { if (KANJI.test(g.pattern) && missing(g.patternFurigana)) problems.push(`${story.id} ngữ pháp ${i + 1}`); });
    L.quiz.forEach((q, i) => {
      if (KANJI.test(q.ja) && missing(q.jaFurigana)) problems.push(`${story.id} câu hỏi ${i + 1}`);
      q.choices.forEach((c, j) => { if (KANJI.test(c) && missing(q.choicesFurigana?.[j])) problems.push(`${story.id} câu hỏi ${i + 1} lựa chọn ${j + 1}`); });
    });
    continue;
  }
  const annotate = makeAnnotator(tokenizer, story);
  for (const g of L.grammarPoints) { const s = annotate(g.pattern); if (s) g.patternFurigana = s; else delete g.patternFurigana; }
  for (const q of L.quiz) {
    const s = annotate(q.ja); if (s) q.jaFurigana = s; else delete q.jaFurigana;
    const cs = q.choices.map((c) => annotate(c) ?? [{ surface: c, reading: "" }]);
    if (q.choices.some((c) => KANJI.test(c))) q.choicesFurigana = cs; else delete q.choicesFurigana;
  }
  const before = readFileSync(p, "utf8");
  const indent = /^\{\r?\n( +|\t)"/.exec(before)?.[1] ?? 2;
  const after = JSON.stringify(story, null, indent) + (before.endsWith("\n") ? "\n" : "");
  if (after !== before) { writeFileSync(p, after); written++; }
  for (const g of L.grammarPoints) if (missing(g.patternFurigana ?? (KANJI.test(g.pattern) ? null : []))) problems.push(`${story.id}: ${g.pattern}`);
  for (const q of L.quiz) if (KANJI.test(q.ja) && missing(q.jaFurigana)) problems.push(`${story.id}: ${q.ja}`);
}
if (check) {
  if (problems.length) { console.error(`✗ Bài học còn kanji chưa có furigana (${problems.length}): ${problems.slice(0, 10).join("; ")}. Chạy: node scripts/lesson-furigana.mjs`); process.exit(1); }
  console.log("✓ Furigana bài học: đủ.");
} else {
  console.log(`lesson-furigana: ghi ${written} truyện.` + (problems.length ? ` Còn thiếu cách đọc: ${problems.join("; ")}` : ""));
}

// Cổng chuẩn nội dung v2 (docs/content-standard.md).
// - Gói có "standard": 2  -> mọi tiêu chí là LỖI chặn (verify đỏ).
// - Gói cũ (chưa nâng cấp) -> chỉ đếm và báo cáo; `--report` ghi chi tiết ra docs/content-audit.md.
import { readdirSync, readFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadTokenizer, measure, vocabLevel, LEVEL_NUM } from "./lib/level.mjs";

const root = new URL("..", import.meta.url).pathname;
const LANGS = ["vi", "en", "zh-Hans", "zh-Hant", "ko", "tl", "ne", "id", "pt", "my", "th"];
const WRITE_REPORT = process.argv.includes("--report");

// Ngưỡng cho MỘT chương truyện / một clip. Hiệu chỉnh trên kho hiện có + văn gốc Aozora (夢十夜).
export const STORY_RULES = {
  N5: { chars: [250, 900], sentences: [15, 45], avgSentence: [0, 20], harderMax: 0.2 },
  N4: { chars: [500, 1800], sentences: [20, 60], avgSentence: [0, 26], harderMax: 0.15 },
  N3: { chars: [900, 3000], sentences: [25, 80], avgSentence: [20, 36], harderMax: 0.12, atLevelMin: 0.08 },
  N2: { chars: [1500, 4500], sentences: [30, 100], avgSentence: [24, 45], harderMax: 0.1, atLevelMin: 0.07 },
  N1: { chars: [2000, 8000], sentences: [35, 160], avgSentence: [26, 60], atLevelMin: 0.04 },
};
export const CLIP_RULES = { length: [45, 240], maxGap: 8, maxLine: 12 };

const tokenizer = await loadTokenizer();
const seen = new Map(); // câu -> id gói đầu tiên
const packs = [];
for (const kind of ["stories", "videos"]) {
  for (const f of readdirSync(join(root, "content", kind)).filter((x) => x.endsWith(".json"))) {
    packs.push(JSON.parse(readFileSync(join(root, "content", kind, f), "utf8")));
  }
}
for (const d of packs) for (const s of d.sentences ?? d.lines) if (s.ja.length > 6 && !seen.has(s.ja)) seen.set(s.ja, d.id);

let errors = 0;
const legacy = { packs: 0, problems: {} };
const report = [];

function checkPack(d) {
  const p = [];
  const items = d.sentences ?? d.lines;
  const fullLangs = (t) => LANGS.every((l) => t?.[l]?.trim());
  if (!fullLangs(d.titles)) p.push("tiêu đề chưa đủ 11 ngôn ngữ");
  let missTr = 0, missNote = 0, badTag = 0, dup = 0;
  const badTags = [];
  for (const s of items) {
    if (!fullLangs(s.translations)) missTr++;
    if (!fullLangs(s.grammarNote)) missNote++;
    for (const v of s.vocab ?? []) {
      const l = vocabLevel(v.word, v.reading);
      if (l && LEVEL_NUM[v.level] !== l) { badTag++; if (badTags.length < 3) badTags.push(`${v.word} ${v.level}→N${l}`); }
      if (!LANGS.every((x) => v.meanings?.[x]?.trim())) missTr++;
    }
    if (s.ja.length > 6 && seen.get(s.ja) !== d.id) dup++;
  }
  if (missTr) p.push(`${missTr} câu/từ thiếu bản dịch 11 ngôn ngữ`);
  if (missNote) p.push(`${missNote} câu thiếu giải thích (grammarNote) 11 ngôn ngữ`);
  if (badTag) p.push(`${badTag} từ gắn sai cấp JLPT (vd ${badTags.join(", ")})`);
  if (dup) p.push(`${dup} câu trùng y nguyên với gói khác`);

  const m = measure(tokenizer, items.map((s) => s.ja), d.level);
  if (d.kind === "story") {
    const r = STORY_RULES[d.level];
    const out = (v, [lo, hi]) => v < lo || v > hi;
    if (out(m.chars, r.chars)) p.push(`độ dài ${m.chars} ký tự (chuẩn ${r.chars[0]}–${r.chars[1]})`);
    if (out(m.sentences, r.sentences)) p.push(`${m.sentences} câu (chuẩn ${r.sentences[0]}–${r.sentences[1]})`);
    if (out(m.avgSentence, r.avgSentence)) p.push(`câu trung bình ${m.avgSentence.toFixed(1)} ký tự (chuẩn ${r.avgSentence[0]}–${r.avgSentence[1]})`);
    if (r.harderMax !== undefined && m.harder > r.harderMax) p.push(`quá khó: ${(m.harder * 100).toFixed(0)}% từ vượt cấp (tối đa ${r.harderMax * 100}%)`);
    if (r.atLevelMin !== undefined && m.atLevel < r.atLevelMin) p.push(`quá dễ: ${(m.atLevel * 100).toFixed(0)}% từ đạt cấp (tối thiểu ${r.atLevelMin * 100}%)`);
    const tr = d.audioTrack;
    if (!tr?.src || !existsSync(join(root, "public", tr.src))) p.push("chưa có audio liền cho chương (audioTrack, public/audio/…)");
    else {
      let bad = 0, prev = 0;
      for (const s of items) {
        const t = s.t;
        if (!Array.isArray(t) || !(t[0] >= prev - 0.05) || !(t[1] > t[0]) || t[1] > tr.durationSec + 0.5 || s.audio !== `${tr.src}#t=${t[0]},${t[1]}`) bad++;
        else prev = t[1];
      }
      if (bad) p.push(`${bad} câu thiếu hoặc sai mốc thời gian t trong audioTrack`);
    }
    const VOICES = ["ja-JP-Chirp3-HD-Aoede", "ja-JP-Neural2-B", "ja-JP-Neural2-C"];
    const noVoice = items.filter((s) => !VOICES.includes(s.voice)).length;
    if (noVoice) p.push(`${noVoice} câu chưa ghi giọng đọc (voice)`);
    const L = d.lesson;
    const gp = L?.grammarPoints ?? [], qz = L?.quiz ?? [];
    if (gp.length < 2 || gp.length > 4) p.push(`bài học có ${gp.length} điểm ngữ pháp (chuẩn 2–4)`);
    if (gp.some((g) => !fullLangs(g.meaning) || !(g.example >= 0 && g.example < items.length))) p.push("điểm ngữ pháp thiếu nghĩa 11 ngôn ngữ hoặc câu ví dụ sai");
    if (qz.length < 3 || qz.length > 5) p.push(`bài học có ${qz.length} câu hỏi (chuẩn 3–5)`);
    if (qz.some((q) => !q.ja || q.choices?.length < 3 || !(q.answer >= 0 && q.answer < q.choices.length) || !fullLangs(q.explain))) p.push("câu hỏi thiếu lựa chọn (≥3), đáp án hoặc giải thích 11 ngôn ngữ");
    if (!d.shelf) p.push("chưa gắn kệ (shelf)");
    if (d.shelf === "hometown" && !/^[A-Z]{2}$/.test(d.origin ?? "")) p.push("truyện quê hương chưa ghi mã nước (origin)");
    if (!d.cover || !d.cover.startsWith("/covers/") || !existsSync(join(root, "public", d.cover))) p.push("chưa có ảnh bìa (public/covers/…)");
  } else {
    const L = d.lines;
    const len = L.length ? L[L.length - 1].end - L[0].start : 0;
    if (d.episode) {
      // Trọn tập: phụ đề phải phủ gần hết video (chỗ trống chỉ được là nhạc/không lời)
      if (len < d.durationSec * 0.6) p.push(`trọn tập nhưng phụ đề chỉ phủ ${len.toFixed(0)}/${d.durationSec} giây`);
    } else if (len < CLIP_RULES.length[0] || len > CLIP_RULES.length[1]) p.push(`clip dài ${len.toFixed(0)} giây (chuẩn ${CLIP_RULES.length.join("–")})`);
    let gaps = 0, long = 0;
    L.forEach((s, i) => {
      if (i && !d.episode && s.start - L[i - 1].end > CLIP_RULES.maxGap) gaps++;
      if (s.end - s.start > CLIP_RULES.maxLine) long++;
    });
    if (gaps) p.push(`${gaps} khoảng trống phụ đề dài hơn ${CLIP_RULES.maxGap} giây`);
    if (long) p.push(`${long} dòng dài hơn ${CLIP_RULES.maxLine} giây (cần tách câu)`);
  }
  return { p, m };
}

for (const d of packs) {
  const { p, m } = checkPack(d);
  if (d.standard === 2) {
    for (const x of p) { errors++; console.log(`  ✗ ${d.id}: ${x}`); }
  } else {
    legacy.packs++;
    for (const x of p) {
      const key = x.replace(/[\d.]+/g, "#").replace(/\(vd .*\)/, "").trim();
      legacy.problems[key] = (legacy.problems[key] ?? 0) + 1;
    }
  }
  report.push({ id: d.id, kind: d.kind, level: d.level, standard: d.standard ?? 1, problems: p, m });
}

const v2 = packs.filter((d) => d.standard === 2).length;
console.log(`Chuẩn v2: ${v2} gói đạt chuẩn kiểm, ${errors} lỗi. Gói cũ chưa nâng cấp: ${legacy.packs}.`);
for (const [k, n] of Object.entries(legacy.problems).sort((a, b) => b[1] - a[1])) console.log(`  · ${n} gói cũ: ${k}`);

if (WRITE_REPORT) {
  const rows = report
    .filter((r) => r.problems.length)
    .map((r) => `| ${r.id} | ${r.kind === "story" ? "truyện" : "video"} | ${r.level} | ${r.standard} | ${r.problems.join("; ")} |`);
  writeFileSync(
    join(root, "docs/content-audit.md"),
    `# Báo cáo chuẩn nội dung v2\n\nSinh bởi \`npm run qc:report\`. Gói cũ chỉ báo cáo; gói \`standard: 2\` là lỗi chặn.\n\n` +
      `| Gói | Loại | Cấp | Chuẩn | Chưa đạt |\n| --- | --- | --- | --- | --- |\n${rows.join("\n")}\n`,
  );
  console.log("Đã ghi docs/content-audit.md");
}
if (errors) process.exit(1);

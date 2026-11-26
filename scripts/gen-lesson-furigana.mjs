/**
 * Sinh furigana cho phần chữ Nhật chưa có sẵn mảnh furigana trong dữ liệu:
 * câu hỏi + lựa chọn + mẫu ngữ pháp của tab Bài học, và câu nghe thử ở onboarding.
 * Quy tắc của app: MỌI chữ kanji hiển thị đều phải có furigana.
 *
 * Ra: src/lib/lesson-furigana.generated.json (chỉ trang đọc phía server nạp, theo từng id)
 *     src/lib/placement-furigana.generated.json (nhỏ, onboarding nạp)
 * Chạy tự động qua prebuild/predev; chạy tay: node scripts/gen-lesson-furigana.mjs
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTokenizer } from "./lib/level.mjs";
import { bareKanji, furigana } from "./lib/furigana.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tok = await loadTokenizer();
let bare = 0;
const furi = (ja) => {
  const f = furigana(tok, ja);
  if (bareKanji(f)) bare++;
  return f;
};

const lessons = {};
const dir = join(root, "content/stories");
for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const s = JSON.parse(readFileSync(join(dir, file), "utf8"));
  const l = s.lesson;
  if (!l) continue;
  lessons[s.id] = {
    g: (l.grammarPoints ?? []).map((g) => furi(g.pattern)),
    q: (l.quiz ?? []).map((q) => ({ ja: furi(q.ja), c: q.choices.map(furi) })),
  };
}
writeFileSync(join(root, "src/lib/lesson-furigana.generated.json"), JSON.stringify(lessons));

// Câu nghe thử: lấy đúng mảnh furigana của câu trong truyện gốc (đã soát), không có thì tự tách
const placementSrc = readFileSync(join(root, "src/lib/placement.ts"), "utf8");
const items = [...placementSrc.matchAll(/storyId: "([a-z0-9-]+)",\s*ja: "([^"]+)"/g)].map((m) => ({ id: m[1], ja: m[2] }));
const placement = items.map(({ id, ja }) => {
  try {
    const s = JSON.parse(readFileSync(join(dir, `${id}.json`), "utf8"));
    const hit = s.sentences.find((x) => x.ja === ja);
    if (hit?.furigana) return hit.furigana;
  } catch {}
  return furi(ja);
});
writeFileSync(join(root, "src/lib/placement-furigana.generated.json"), JSON.stringify(placement));
console.log(`gen-lesson-furigana: ${Object.keys(lessons).length} bài học, ${placement.length} câu nghe thử${bare ? `, ${bare} chuỗi còn kanji trần` : ""}`);

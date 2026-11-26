/**
 * Furigana cho câu nghe thử ở onboarding (src/lib/placement.ts).
 * Quy tắc của app: MỌI chữ kanji hiển thị đều phải có furigana.
 * (Tab Bài học đã có furigana trong dữ liệu truyện: scripts/lesson-furigana.mjs.)
 *
 * Ra: src/lib/placement-furigana.generated.json (nhỏ, onboarding nạp)
 * Chạy tự động qua prebuild/predev; chạy tay: node scripts/gen-placement-furigana.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
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

const dir = join(root, "content/stories");

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
console.log(`gen-placement-furigana: ${placement.length} câu nghe thử${bare ? `, ${bare} chuỗi còn kanji trần` : ""}`);

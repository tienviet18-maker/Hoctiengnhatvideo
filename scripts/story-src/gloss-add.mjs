// Thêm nghĩa từ vựng vào glossary.json của kệ từ file TSV gọn: từ|cách đọc|vi|en|zh-Hans|ko|tl|ne|id|pt|my|th
// Chạy: node scripts/story-src/gloss-add.mjs content/sources/<kệ>/glossary.json words.tsv
import { readFileSync, writeFileSync } from "node:fs";
const L = ["vi", "en", "zh-Hans", "ko", "tl", "ne", "id", "pt", "my", "th"];
const [gp, tsv] = process.argv.slice(2);
const g = JSON.parse(readFileSync(gp, "utf8"));
let n = 0;
for (const line of readFileSync(tsv, "utf8").split("\n")) {
  if (!line.trim() || line.startsWith("#")) continue;
  const c = line.split("|").map((s) => s.trim());
  if (c.length !== 12) throw new Error(`cần 12 cột: ${line}`);
  g[c[0]] = { reading: c[1], meanings: Object.fromEntries(L.map((l, i) => [l, c[i + 2]])) };
  n++;
}
writeFileSync(gp, JSON.stringify(g, null, 1) + "\n");
console.log(`✓ thêm/cập nhật ${n} từ`);

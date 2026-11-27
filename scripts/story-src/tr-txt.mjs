// Viết bản dịch + giải thích gọn hơn JSON: <id>.tr.txt, mỗi câu một khối 10 dòng "lang: bản dịch ‖ giải thích",
// các khối cách nhau bằng dòng trống (dòng bắt đầu bằng # bị bỏ qua). Script ghi ra <id>.tr1.json cho build.mjs.
// Thêm khối "@lesson" cuối file? Không — bài học vẫn viết ở <id>.lesson.json.
// Chạy: node scripts/story-src/tr-txt.mjs content/sources/<kệ>/<id>.tr.txt [...]
import { readFileSync, writeFileSync } from "node:fs";
const L = ["vi", "en", "zh-Hans", "ko", "tl", "ne", "id", "pt", "my", "th"];
for (const f of process.argv.slice(2)) {
  const blocks = readFileSync(f, "utf8").split(/\n\s*\n/).map((b) => b.split("\n").filter((l) => l.trim() && !l.startsWith("#"))).filter((b) => b.length);
  const out = blocks.map((b, i) => {
    const t = {}, g = {};
    for (const line of b) {
      const m = line.match(/^([a-zA-Z-]+):\s*(.*)$/);
      if (!m || !L.includes(m[1])) throw new Error(`${f} khối ${i + 1}: dòng lạ "${line}"`);
      const [tr, note] = m[2].split("‖").map((s) => s.trim());
      t[m[1]] = tr; g[m[1]] = note ?? "";
    }
    for (const l of L) if (!t[l] || !g[l]) throw new Error(`${f} khối ${i + 1}: thiếu ${l}`);
    return { t, g };
  });
  writeFileSync(f.replace(/\.tr\.txt$/, ".tr1.json"), JSON.stringify(out, null, 1) + "\n");
  console.log(`✓ ${f}: ${out.length} câu`);
}

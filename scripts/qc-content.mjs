// QC tự động nhiều lớp cho toàn bộ kho nội dung (chạy: node scripts/qc-content.mjs)
// Lớp 1: furigana ghép lại phải khớp 100% câu gốc.
// Lớp 2: mọi cụm có kanji đều phải có cách đọc (bắt lỗi thiếu furigana).
// Lớp 3: bản dịch vi + en không được trống.
// Lớp 4: từ vựng gắn kèm phải xuất hiện thật trong câu chứa nó.
// Lớp 5 (truyện): file audio phải tồn tại. Lớp 6 (video): mốc thời gian hợp lệ, nằm trong thời lượng.
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const KANJI = /[\u4e00-\u9fff\u3400-\u4dbf]/;
let fail = 0, packages = 0, lines = 0;
const bad = (id, msg) => { fail++; console.log(`  ✗ ${id}: ${msg}`); };

function checkSegments(id, idx, ja, furigana, romaji, translations, vocab) {
  lines++;
  const joined = furigana.map((g) => g.surface).join("");
  if (joined !== ja) bad(id, `câu ${idx}: furigana ghép lại không khớp câu gốc`);
  for (const g of furigana)
    if (KANJI.test(g.surface) && !g.reading) bad(id, `câu ${idx}: cụm "${g.surface}" có kanji nhưng thiếu cách đọc`);
  if (!romaji || !romaji.trim()) bad(id, `câu ${idx}: thiếu romaji`);
  for (const lang of ["vi", "en"])
    if (!translations?.[lang]?.trim()) bad(id, `câu ${idx}: thiếu bản dịch ${lang}`);
  for (const v of vocab ?? []) {
    // Khớp theo gốc từ: trong câu từ thường ở dạng đã chia (習いました), từ điển ghi dạng gốc (習う).
    const stems = [v.word, v.word.slice(0, -1)];
    const hit = stems.some((s) => s && (KANJI.test(s) || s.length >= 2) && ja.includes(s));
    if (!hit) bad(id, `câu ${idx}: từ vựng "${v.word}" không xuất hiện trong câu (kể cả dạng đã chia)`);
  }
}

for (const dir of ["content/stories", "content/videos"]) {
  for (const f of readdirSync(join(root, dir)).filter((x) => x.endsWith(".json"))) {
    const d = JSON.parse(readFileSync(join(root, dir, f), "utf8"));
    packages++;
    const before = fail;
    if (d.kind === "story") {
      d.sentences.forEach((s, i) => {
        checkSegments(d.id, i + 1, s.ja, s.furigana, s.romaji, s.translations, s.vocab);
        if (!s.audio || !existsSync(join(root, "public", s.audio))) bad(d.id, `câu ${i + 1}: thiếu file audio`);
      });
    } else {
      let prevEnd = 0;
      d.lines.forEach((s, i) => {
        checkSegments(d.id, i + 1, s.ja, s.furigana, s.romaji, s.translations, s.vocab);
        if (!(s.start < s.end)) bad(d.id, `dòng ${i + 1}: start >= end`);
        if (s.start < prevEnd) bad(d.id, `dòng ${i + 1}: mốc thời gian không tăng dần`);
        if (s.end > d.durationSec) bad(d.id, `dòng ${i + 1}: end vượt thời lượng video`);
        prevEnd = s.end;
      });
    }
    console.log(`${fail === before ? "✓" : "✗"} ${d.id} (${d.kind === "story" ? d.sentences.length : d.lines.length} câu/dòng)`);
  }
}
/* Lộ trình học (src/lib/paths.ts): mọi id phải tồn tại trong kho nội dung */
{
  const pathsSrc = readFileSync(join(root, "src/lib/paths.ts"), "utf8");
  const ids = [...pathsSrc.matchAll(/"([a-z0-9-]+)"/g)]
    .map((m) => m[1])
    .filter((s) => !["newcomer", "work", "family", "enjoy"].includes(s));
  for (const pid of ids) {
    const ok =
      existsSync(join(root, "content/stories", `${pid}.json`)) ||
      existsSync(join(root, "content/videos", `${pid}.json`));
    if (!ok) bad("paths", `id "${pid}" trong lộ trình không tồn tại trong kho nội dung`);
  }
  console.log(`✓ paths (${ids.length} bài trong 4 lộ trình)`);
}

console.log(`\nTổng: ${packages} gói, ${lines} câu/dòng, ${fail} lỗi.`);
process.exit(fail ? 1 : 0);

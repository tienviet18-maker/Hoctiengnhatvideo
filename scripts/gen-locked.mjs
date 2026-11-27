/**
 * Sau `next build` (output: "export"): ghi phần VIP của từng gói vào out/_locked/.
 *   out/_locked/videos/<id>.json  — đủ phụ đề của video VIP
 *   out/_locked/stories/<id>.json — đủ nội dung + bài học của chương VIP
 * Trang tĩnh chỉ mang phần miễn phí (src/lib/gate.ts). Worker (worker/index.ts) chặn mọi
 * request /_locked/* và chỉ trả file qua /api/content/<kind>/<id> khi tài khoản có VIP còn hạn.
 * Quy tắc miễn phí phải khớp storyFree() trong src/lib/access.ts.
 * Chạy tự động qua postbuild; chạy tay: node scripts/gen-locked.mjs
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");
if (!existsSync(out)) {
  console.error("gen-locked: chưa có out/ (chạy next build trước)");
  process.exit(1);
}

const storyFree = (s) => s.free || s.series?.index === 1 || (!s.series && s.level === "N5");
let videos = 0;
let stories = 0;
for (const [kind, isFree] of [["videos", (v) => v.free], ["stories", storyFree]]) {
  const dir = join(out, "_locked", kind);
  mkdirSync(dir, { recursive: true });
  for (const f of readdirSync(join(root, "content", kind)).filter((f) => f.endsWith(".json"))) {
    const item = JSON.parse(readFileSync(join(root, "content", kind, f), "utf8"));
    if (isFree(item)) continue;
    writeFileSync(join(dir, f), JSON.stringify(item));
    if (kind === "videos") videos++;
    else stories++;
  }
}

// Kiểm chứng: không trang tĩnh nào được chứa câu thứ 3 trở đi của một video VIP.
let leaks = 0;
for (const f of readdirSync(join(out, "_locked", "videos"))) {
  const v = JSON.parse(readFileSync(join(out, "_locked", "videos", f), "utf8"));
  const probe = v.lines.slice(2).find((l) => l.ja && l.ja.length >= 8)?.ja;
  if (!probe) continue;
  const html = join(out, "watch", `${v.id}.html`);
  if (existsSync(html) && readFileSync(html, "utf8").includes(probe)) {
    console.error(`gen-locked: LỘ nội dung VIP trong ${html}`);
    leaks++;
  }
}
// Truyện VIP: trang tĩnh chỉ mang FREE_STORY_SENTENCES (3) câu đầu (src/lib/access.ts).
for (const f of readdirSync(join(out, "_locked", "stories"))) {
  const st = JSON.parse(readFileSync(join(out, "_locked", "stories", f), "utf8"));
  const probe = st.sentences.slice(3).find((x) => x.ja && x.ja.length >= 8 && !st.sentences.slice(0, 3).some((y) => y.ja.includes(x.ja)))?.ja;
  if (!probe) continue;
  for (const html of [join(out, "read", `${st.id}.html`), join(out, "read", `${st.id}.txt`)]) {
    if (existsSync(html) && readFileSync(html, "utf8").includes(probe)) {
      console.error(`gen-locked: LỘ nội dung VIP trong ${html}`);
      leaks++;
    }
  }
}
if (leaks) process.exit(1);
console.log(`gen-locked: ${videos} video VIP, ${stories} chương VIP -> out/_locked/`);

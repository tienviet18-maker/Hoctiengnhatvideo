// Bìa chữ "MiraiGo 文庫" cho gói cũ chưa có bìa (26/11/2026): tựa dọc tiếng Nhật, ấn tròn một chữ Hán, phông đổi theo truyện.
// Dữ liệu: content/sources/old-covers/covers.tsv (id, tựa Nhật, dòng phụ, chữ trong ấn, dòng nhỏ).
// Chạy: node scripts/covers/render-old.mjs [id ...]   (không có id = vẽ hết) — ghi public/covers/<id>.webp và trường cover của gói.
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = new URL("../..", import.meta.url).pathname;
const html = "file://" + join(root, "scripts/covers/cover.html");
const FONTS = [
  ["Shippori Mincho B1", 800], ["Klee One", 600], ["Potta One", 400], ["Zen Old Mincho", 900], ["Yusei Magic", 400],
  ["Kaisei Decol", 700], ["Mochiy Pop P One", 400], ["Hina Mincho", 400], ["RocknRoll One", 400], ["Kaisei Tokumin", 800],
  ["Yuji Syuku", 400], ["Dela Gothic One", 400], ["Zen Kurenaido", 400], ["Sawarabi Mincho", 400], ["Reggae One", 400],
  ["Murecho", 800], ["Noto Serif JP", 900], ["Shippori Antique", 400], ["Kaisei Opti", 700],
  ["Zen Antique", 400], ["Yomogi", 400], ["BIZ UDPMincho", 700], ["Yuji Boku", 400], ["Stick", 400],
];
const KID = [["M PLUS Rounded 1c", 800], ["Kiwi Maru", 500], ["Zen Maru Gothic", 900], ["Hachi Maru Pop", 400], ["Kosugi Maru", 400], ["Mochiy Pop One", 400]];
const rows = readFileSync(join(root, "content/sources/old-covers/covers.tsv"), "utf8").split("\n").filter((l) => l && !l.startsWith("#")).map((l) => l.split("\t"));
const only = new Set(process.argv.slice(2));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 900, height: 1200 } });
let i = 0, k = 0;
for (const [id, ja, jsub, mon, ser] of rows) {
  const mai = id.startsWith("mai-chan-");
  const [font, w] = mai ? KID[k++ % KID.length] : FONTS[(i++ * 7) % FONTS.length];
  if (only.size && !only.has(id)) continue;
  const f = join(root, "content/stories", id + ".json");
  const raw = readFileSync(f, "utf8");
  const s = JSON.parse(raw);
  const d = { id, level: s.level, ja, jsub, mon, series: ser, title: s.titles.vi.replace(/\s*\([^)]*\)\s*$/, ""), motif: mai ? "monmai" : "mon", font, fontWeight: w, fontWeights: String(w) };
  await p.goto(html + "?d=" + encodeURIComponent(JSON.stringify(d)));
  await p.waitForLoadState("networkidle");
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  const png = join(root, "public/covers", id + ".png");
  await p.screenshot({ path: png });
  execFileSync("python3", ["-c", "import sys;from PIL import Image;Image.open(sys.argv[1]).convert('RGB').save(sys.argv[2],'WEBP',quality=86)", png, png.replace(/\.png$/, ".webp")]);
  unlinkSync(png);
  // Giữ nguyên định dạng file gói: chỉ thay giá trị trường cover (trước là mô tả ảnh để vẽ sau)
  const out = raw.replace(/"cover":\s*"(?:[^"\\]|\\.)*"/, (m) => m.replace(/"(?:[^"\\]|\\.)*"$/, `"/covers/${id}.webp"`));
  if (out === raw && s.cover !== `/covers/${id}.webp`) throw new Error("không tìm thấy trường cover trong " + id);
  writeFileSync(f, out);
  console.log("✓ bìa", id, font);
}
await b.close();

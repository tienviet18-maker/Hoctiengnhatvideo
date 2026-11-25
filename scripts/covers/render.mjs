// Vẽ bìa truyện theo hệ bìa "MiraiGo 文庫" (Việt duyệt 25/11/2026): chữ Nhật dọc, mỗi truyện một phông.
// Đọc trường "cover" trong file nguồn content/sources/<kệ>/<id>.src.json, ghi public/covers/<id>.webp (900×1200).
// Chạy: node scripts/covers/render.mjs content/sources/furusato/<id>.src.json [...]
import { readFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = new URL("../..", import.meta.url).pathname;
const html = "file://" + join(root, "scripts/covers/cover.html");
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 900, height: 1200 } });
for (const f of process.argv.slice(2)) {
  const src = JSON.parse(readFileSync(f, "utf8"));
  const d = { level: src.level, ...src.cover };
  await p.goto(html + "?d=" + encodeURIComponent(JSON.stringify(d)));
  await p.waitForLoadState("networkidle");
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  const png = join(root, "public/covers", src.id + ".png");
  await p.screenshot({ path: png });
  execFileSync("python3", ["-c", "import sys;from PIL import Image;Image.open(sys.argv[1]).convert('RGB').save(sys.argv[2],'WEBP',quality=88)", png, png.replace(/\.png$/, ".webp")]);
  unlinkSync(png);
  console.log("✓ bìa", src.id);
}
await b.close();

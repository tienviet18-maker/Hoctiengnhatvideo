// Đăng ký gói truyện vào src/lib/content.ts (import + mục trong STORIES), bỏ qua id đã có.
// Tên biến lấy từ id (camelCase) để không đụng số thứ tự storyN của luồng khác.
// Chạy: node scripts/story-src/register.mjs <id> [...]
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const root = new URL("../..", import.meta.url).pathname;
const p = join(root, "src/lib/content.ts");
let s = readFileSync(p, "utf8");
const camel = (id) => "s_" + id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
for (const id of process.argv.slice(2)) {
  if (s.includes(`content/stories/${id}.json"`)) { console.log("đã có", id); continue; }
  const v = camel(id);
  const imports = [...s.matchAll(/^import .* from "\.\.\/\.\.\/content\/stories\/.*";$/gm)];
  const last = imports[imports.length - 1];
  const at = last.index + last[0].length;
  s = s.slice(0, at) + `\nimport ${v} from "../../content/stories/${id}.json";` + s.slice(at);
  const start = s.indexOf("export const STORIES: StoryContent[] = [");
  const end = s.indexOf("\n];", start);
  s = s.slice(0, end) + `\n  ${v} as unknown as StoryContent,` + s.slice(end);
  console.log("✓ đăng ký", id);
}
writeFileSync(p, s);

// Đăng ký gói truyện vào src/lib/content.ts (nguồn sự thật duy nhất) nếu chưa có.
//   node scripts/produce/register.mjs <id> [...]
// Gói của kệ A/E (văn học) nằm giữa hai dòng đánh dấu riêng để các luồng khác thêm kệ của mình không đụng nhau.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../..", import.meta.url).pathname;
const p = join(root, "src/lib/content.ts");
let s = readFileSync(p, "utf8");
const IMP = "// --- kệ A/E văn học (chuẩn v2): import ---";
const ARR = "  // --- kệ A/E văn học (chuẩn v2) ---";
if (!s.includes(IMP)) s = s.replace("\nexport const VIDEOS", `\n${IMP}\n// --- hết kệ A/E: import ---\n\nexport const VIDEOS`);
if (!s.includes(ARR)) s = s.replace(/(export const STORIES: StoryContent\[\] = \[\n[\s\S]*?)(\n\];)/, `$1\n${ARR}\n  // --- hết kệ A/E ---$2`);
for (const id of process.argv.slice(2)) {
  if (s.includes(`/content/stories/${id}.json"`)) { console.log(`= ${id} đã đăng ký`); continue; }
  const name = "v2" + id.replace(/(^|-)([a-z0-9])/g, (_, a, b) => b.toUpperCase());
  s = s.replace("// --- hết kệ A/E: import ---", `import ${name} from "../../content/stories/${id}.json";\n// --- hết kệ A/E: import ---`);
  s = s.replace("  // --- hết kệ A/E ---", `  ${name} as unknown as StoryContent,\n  // --- hết kệ A/E ---`);
  console.log(`+ ${id}`);
}
writeFileSync(p, s);

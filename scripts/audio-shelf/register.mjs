// Đăng ký gói vào src/lib/content.ts trong khối riêng của kệ B/C (Rakugo, cổ tích bản dài),
// để các luồng khác thêm kệ của mình không đụng dòng nhau. Khối import đặt ngay sau dòng import type đầu file,
// khối mảng đặt ở đầu mảng STORIES (kệ A/E đặt ở cuối), nên hai bên không sửa chung một đoạn.
//   node scripts/audio-shelf/register.mjs <id> [...]
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../..", import.meta.url).pathname;
const p = join(root, "src/lib/content.ts");
let s = readFileSync(p, "utf8");
const IMP = "// --- kệ B/C Rakugo + cổ tích (chuẩn v2): import ---";
const IMP_END = "// --- hết kệ B/C: import ---";
const ARR = "  // --- kệ B/C Rakugo + cổ tích (chuẩn v2) ---";
const ARR_END = "  // --- hết kệ B/C ---";
if (!s.includes(IMP)) s = s.replace(/^(import type .*\n)/, `$1${IMP}\n${IMP_END}\n`);
if (!s.includes(ARR)) s = s.replace("export const STORIES: StoryContent[] = [\n", `export const STORIES: StoryContent[] = [\n${ARR}\n${ARR_END}\n`);
for (const id of process.argv.slice(2)) {
  if (s.includes(`/content/stories/${id}.json"`)) { console.log(`= ${id} đã đăng ký`); continue; }
  const name = "bc" + id.replace(/(^|-)([a-z0-9])/g, (_, a, b) => b.toUpperCase());
  s = s.replace(IMP_END, `import ${name} from "../../content/stories/${id}.json";\n${IMP_END}`);
  s = s.replace(ARR_END, `  ${name} as unknown as StoryContent,\n${ARR_END}`);
  console.log(`+ ${id}`);
}
writeFileSync(p, s);

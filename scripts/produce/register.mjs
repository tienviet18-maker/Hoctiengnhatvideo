// Đăng ký gói truyện vào src/lib/content.ts (nguồn sự thật duy nhất) nếu chưa có.
//   node scripts/produce/register.mjs <id> [...]
// Gói của kệ A/E (văn học) nằm giữa hai dòng đánh dấu riêng để các luồng khác thêm kệ của mình không đụng nhau.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../..", import.meta.url).pathname;
const p = join(root, "src/lib/content.ts");
let s = readFileSync(p, "utf8");
// --block=ma : dùng khối riêng của kệ ma & trinh thám (mystery-*), để không đụng khối A/E của luồng khác.
const args = process.argv.slice(2);
const blockArg = args.find((a) => a.startsWith("--block="))?.slice(8);
const B = blockArg === "ma" ? { name: "ma & trinh thám", end: "ma & trinh thám" } : { name: "A/E văn học", end: "A/E" };
const IMP = `// --- kệ ${B.name} (chuẩn v2): import ---`;
const ARR = `  // --- kệ ${B.name} (chuẩn v2) ---`;
const IMP_END = `// --- hết kệ ${B.end}: import ---`;
const ARR_END = `  // --- hết kệ ${B.end} ---`;
if (!s.includes(IMP)) s = s.replace("\nexport const VIDEOS", `\n${IMP}\n${IMP_END}\n\nexport const VIDEOS`);
if (!s.includes(ARR)) s = s.replace(/(export const STORIES: StoryContent\[\] = \[\n[\s\S]*?)(\n\];)/, `$1\n${ARR}\n${ARR_END}$2`);
for (const id of args.filter((a) => !a.startsWith("--"))) {
  if (s.includes(`/content/stories/${id}.json"`)) { console.log(`= ${id} đã đăng ký`); continue; }
  const name = "v2" + id.replace(/(^|-)([a-z0-9])/g, (_, a, b) => b.toUpperCase());
  s = s.replace(IMP_END, `import ${name} from "../../content/stories/${id}.json";\n${IMP_END}`);
  s = s.replace(ARR_END, `  ${name} as unknown as StoryContent,\n${ARR_END}`);
  console.log(`+ ${id}`);
}
writeFileSync(p, s);

// Đăng ký gói truyện vào src/lib/content.ts (nguồn sự thật duy nhất) nếu chưa có.
//   node scripts/produce/register.mjs <id> [...]
// Gói của kệ A/E (văn học) nằm giữa hai dòng đánh dấu riêng để các luồng khác thêm kệ của mình không đụng nhau.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../..", import.meta.url).pathname;
const p = join(root, "src/lib/content.ts");
let s = readFileSync(p, "utf8");
// --block=wisdom: kệ Triết lý sống có khối đánh dấu riêng (luồng kệ W), không đụng khối A/E.
const BLOCKS = { ae: "A/E văn học", wisdom: "W triết lý sống" };
const blockArg = process.argv.find((a) => a.startsWith("--block="))?.slice(8) ?? "ae";
const label = BLOCKS[blockArg];
if (!label) throw new Error(`không có khối ${blockArg}`);
const short = label.split(" ")[0];
const IMP = `// --- kệ ${label} (chuẩn v2): import ---`;
const ARR = `  // --- kệ ${label} (chuẩn v2) ---`;
const IMP_END = `// --- hết kệ ${short}: import ---`;
const ARR_END = `  // --- hết kệ ${short} ---`;
if (!s.includes(IMP)) s = s.replace("\nexport const VIDEOS", `\n${IMP}\n${IMP_END}\n\nexport const VIDEOS`);
if (!s.includes(ARR)) s = s.replace(/(export const STORIES: StoryContent\[\] = \[\n[\s\S]*?)(\n\];)/, `$1\n${ARR}\n${ARR_END}$2`);
for (const id of process.argv.slice(2).filter((a) => !a.startsWith("--"))) {
  if (s.includes(`/content/stories/${id}.json"`)) { console.log(`= ${id} đã đăng ký`); continue; }
  const name = "v2" + id.replace(/(^|-)([a-z0-9])/g, (_, a, b) => b.toUpperCase());
  s = s.replace(IMP_END, `import ${name} from "../../content/stories/${id}.json";\n${IMP_END}`);
  s = s.replace(ARR_END, `  ${name} as unknown as StoryContent,\n${ARR_END}`);
  console.log(`+ ${id}`);
}
writeFileSync(p, s);

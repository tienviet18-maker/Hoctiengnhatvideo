import { LISTED_STORIES, type StoryIndexItem } from "./catalog.generated";
import type { JlptLevel } from "./content-schema";

/** Thứ tự kệ trong tab Truyện (docs/ux-plan.md mục 2.2). folktale = cổ tích/ngụ ngôn của gói cũ. */
// Các kệ "book-*" là mục Sách nổi tiếng chia theo chủ đề (Việt 27/11): sách self-help, thiền, tâm linh, kinh điển phương Đông.
export const SHELF_ORDER = [
  "rakugo", "mystery", "ghost", "literature", "vn-lit", "folktale-jp", "hometown", "world",
  "book-people", "book-mind", "book-spirit", "book-east", "book-health", "wisdom", "life-series", "folktale", "life",
] as const;
export type ShelfKey = (typeof SHELF_ORDER)[number];

/** Gói v2 có shelf; gói cũ suy ra từ topic. */
// Tiểu thuyết và truyện ngắn Việt Nam (gói kệ "hometown" làm trước khi có kệ vn-lit) gom về kệ Văn học Việt Nam.
const VN_LIT = /^furusato-vn-(sodo|kieu|hoangle|thachlam|laohac|chipheo|tatden)(-|$)/;

export function shelfOf(s: StoryIndexItem): ShelfKey {
  if (s.shelf === "hometown" && VN_LIT.test(s.id)) return "vn-lit";
  if (s.shelf) return s.shelf;
  if (s.topic === "classics") return "literature";
  if (s.topic === "folktale") return "folktale";
  return "life";
}

/** Sở thích chọn ở onboarding → các kệ truyện tương ứng. */
export const INTEREST_SHELVES: Record<string, ShelfKey[]> = {
  anime: [],
  mystery: ["mystery", "ghost"],
  folktale: ["folktale-jp", "hometown", "folktale"],
  rakugo: ["rakugo"],
  literature: ["literature", "vn-lit", "world", "book-east", "book-spirit", "wisdom"],
  life: ["life-series", "life", "book-people", "book-mind", "book-health", "wisdom"],
  podcast: [],
};

/** Truyện miễn phí nên nghe đầu tiên: đúng cấp, ưu tiên kệ khớp sở thích, rồi gói có audio liền chương. */
export function recommendFirst(level: JlptLevel | undefined, interests: string[] | undefined): StoryIndexItem | null {
  const shelves = new Set((interests ?? []).flatMap((k) => INTEREST_SHELVES[k] ?? []));
  const free = LISTED_STORIES.filter((s) => s.free && (!s.series || s.series.index === 1));
  const atLevel = level ? free.filter((s) => s.level === level) : [];
  const score = (s: StoryIndexItem) => (shelves.has(shelfOf(s)) ? 2 : 0) + (s.audioTrack ? 1 : 0);
  const pool = atLevel.length ? atLevel : free;
  return [...pool].sort((a, b) => score(b) - score(a))[0] ?? null;
}

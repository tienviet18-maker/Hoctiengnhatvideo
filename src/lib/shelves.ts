import type { StoryIndexItem } from "./catalog.generated";

/** Thứ tự kệ trong tab Truyện (docs/ux-plan.md mục 2.2). folktale = cổ tích/ngụ ngôn của gói cũ. */
export const SHELF_ORDER = ["rakugo", "mystery", "ghost", "literature", "folktale-jp", "hometown", "world", "life-series", "folktale", "life"] as const;
export type ShelfKey = (typeof SHELF_ORDER)[number];

/** Gói v2 có shelf; gói cũ suy ra từ topic. */
export function shelfOf(s: StoryIndexItem): ShelfKey {
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
  literature: ["literature", "world"],
  life: ["life-series", "life"],
  podcast: [],
};

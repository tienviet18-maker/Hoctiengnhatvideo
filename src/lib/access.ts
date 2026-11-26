/**
 * Ranh giới miễn phí / VIP (docs/ux-plan.md mục 6). Mọi chỗ kiểm quyền đi qua file này,
 * để khi có Firebase chỉ cần chuyển phần kiểm sang máy chủ.
 * scripts/gen-catalog.mjs có bản sao của storyFree() — sửa ở đây thì sửa cả ở đó.
 */
import type { JlptLevel } from "./content-schema";

/** Video VIP: tài khoản thường thấy rõ bấy nhiêu câu phụ đề đầu. */
export const FREE_VIDEO_LINES = 2;
/** Truyện VIP: tài khoản thường đọc và nghe thử bấy nhiêu câu đầu (Việt 26/11: cho trải nghiệm trước rồi mới mời mua). */
export const FREE_STORY_SENTENCES = 3;
/** Thẻ ôn tối đa của tài khoản thường. */
export const FREE_DECK_CARDS = 100;
/** Số lần mở "Giải thích" câu mỗi ngày của tài khoản thường. */
export const FREE_EXPLAINS_PER_DAY = 5;

/** Truyện miễn phí: gói gắn nhãn free, chương 1 của mọi bộ, và mọi truyện ngắn N5. */
export function storyFree(s: { free: boolean; level: JlptLevel; series?: { index: number } }): boolean {
  return s.free || s.series?.index === 1 || (!s.series && s.level === "N5");
}

const EXPLAIN_KEY = "vimai-video:explain:v1";

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function readExplains(): { day: string; ids: string[] } {
  if (typeof window === "undefined") return { day: "", ids: [] };
  try {
    const v = JSON.parse(window.localStorage.getItem(EXPLAIN_KEY) ?? "null");
    if (v && v.day === today() && Array.isArray(v.ids)) return v;
  } catch {
    /* hỏng thì coi như hôm nay chưa dùng */
  }
  return { day: today(), ids: [] };
}

/**
 * Dùng một lượt giải thích cho câu `id`. Mở lại câu đã mở trong ngày không tốn lượt.
 * Trả về false khi tài khoản thường đã hết lượt hôm nay.
 */
export function spendExplain(id: string, vip: boolean): boolean {
  if (vip) return true;
  const cur = readExplains();
  if (cur.ids.includes(id)) return true;
  if (cur.ids.length >= FREE_EXPLAINS_PER_DAY) return false;
  cur.ids.push(id);
  try {
    window.localStorage.setItem(EXPLAIN_KEY, JSON.stringify(cur));
  } catch {
    /* bộ nhớ đầy: vẫn cho xem */
  }
  return true;
}

/** Lượt giải thích còn lại hôm nay (tài khoản thường). */
export function explainsLeft(): number {
  return Math.max(0, FREE_EXPLAINS_PER_DAY - readExplains().ids.length);
}

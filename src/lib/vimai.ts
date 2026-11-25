/**
 * Hệ sinh thái ViMai hiển thị ở tab Tôi, và link đánh giá app.
 * Các giá trị `url` / APP_STORE_ID để trống cho tới khi có link store chính thức:
 * khi trống, thẻ app vẫn hiện nhưng không bấm được, nút đánh giá bị ẩn.
 */
export interface VimaiApp {
  key: "vicare" | "menkyo" | "vibjt";
  name: string;
  color: string;
  url?: string;
}

export const VIMAI_APPS: VimaiApp[] = [
  { key: "vicare", name: "ViCare", color: "#2E7D5B" },
  { key: "menkyo", name: "ViMai Menkyo", color: "#C2410C" },
  { key: "vibjt", name: "ViBJT · ViJPT", color: "#1F3864" },
];

/** ID app trên App Store (số), điền khi app đã lên store. */
export const APP_STORE_ID: string | null = null;

/**
 * Link "Viết đánh giá" do người dùng chủ động bấm: Apple không giới hạn số lần
 * (khác với SKStoreReviewController, tối đa 3 lần/năm). Xem docs/ux-plan.md mục 5.
 */
export function writeReviewUrl(): string | null {
  return APP_STORE_ID ? `https://apps.apple.com/app/id${APP_STORE_ID}?action=write-review` : null;
}

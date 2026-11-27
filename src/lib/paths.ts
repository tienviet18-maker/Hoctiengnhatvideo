/**
 * Lộ trình học theo mục tiêu sống — danh sách bài được chọn tay, sắp theo
 * trình độ tăng dần. Mọi id ở đây PHẢI tồn tại trong kho nội dung;
 * scripts/qc-content.mjs kiểm tra điều này trong cổng `npm run verify`.
 */
export type PathId = "newcomer" | "work" | "family" | "enjoy";

export interface LearningPath {
  id: PathId;
  items: string[];
}

export const PATHS: LearningPath[] = [
  {
    id: "newcomer",
    items: [
      "supermarket-first",
      "at-the-convenience-store",
      "riding-the-bus",
      "buying-a-train-pass",
      "taking-out-garbage",
      "using-an-atm",
      "the-health-insurance-card",
      "at-city-hall",
      "at-the-bank",
      "getting-a-phone",
      "renting-a-room",
      "the-moving-registration",
      "my-number-card",
      "the-residence-tax",
      "the-apartment-contract",
    ],
  },
  {
    id: "work",
    items: [
      "baito-first-morning",
      "the-company-cafeteria",
      "first-day-at-work",
      "the-morning-meeting",
      "baito-interview",
      "finding-a-part-time-job",
      "asking-for-leave",
      "the-first-payday",
      "company-drinking-party",
      "the-year-end-party",
      "the-overtime-night",
      "the-night-shift",
    ],
  },
  {
    id: "family",
    items: [
      "maichan-01",
      "cooking-dinner",
      "zoo-with-kids",
      "school-sports-day",
      "maichan-07",
      "mai-chan-ep16-dad-cooks-pho",
      "childrens-vaccinations",
      "school-lunch",
      "entrance-ceremony",
      "parents-visiting-japan",
      "the-school-sports-day",
      "the-parents-visit",
      "the-hospital-stay",
    ],
  },
  {
    id: "enjoy",
    items: [
      "akane-cafe-phrases",
      "akane-bakery",
      "mukashi-momotaro-1",
      "mukashi-tsuru-1",
      "mukashi-kaguya-1",
      "the-letter-never-sent",
      "furusato-vn-sodo-1",
      "furusato-vn-kieu-1",
      "furusato-vn-hoangle-1",
    ],
  },
];

export function getPath(id: string): LearningPath | null {
  return PATHS.find((p) => p.id === id) ?? null;
}

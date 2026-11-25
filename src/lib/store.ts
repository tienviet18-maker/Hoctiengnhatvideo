import { useMemo, useSyncExternalStore } from "react";
import type {
  JlptLevel,
  LanguageCode,
  Translations,
  VocabItem,
} from "./content-schema";

/** Sự kiện báo cho các useSyncExternalStore biết dữ liệu local đã đổi (cùng tab). */
export const STORE_EVENT = "vimai-store";

export function notifyStore(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORE_EVENT));
  }
}

/** Đọc 1 khóa JSON trong localStorage theo cách an toàn với SSR/hydration. */
export function useLocalJson<T>(key: string, fallback: T): T {
  const raw = useSyncExternalStore(
    (cb) => {
      window.addEventListener(STORE_EVENT, cb);
      window.addEventListener("storage", cb);
      return () => {
        window.removeEventListener(STORE_EVENT, cb);
        window.removeEventListener("storage", cb);
      };
    },
    () => window.localStorage.getItem(key),
    () => null,
  );
  return useMemo<T>(() => {
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);
}

/* ---------- Hồ sơ người dùng ---------- */

export interface Profile {
  lang: LanguageCode | null;
  name: string;
  onboarded: boolean;
  vip: boolean;
}

export const PROFILE_KEY = "vimai-video:profile:v1";
const DEFAULT_PROFILE: Profile = {
  lang: null,
  name: "",
  onboarded: false,
  vip: false,
};

export function loadProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(p: Profile): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
  notifyStore();
}

/* ---------- Bộ thẻ từ vựng + SRS ---------- */

export interface DeckCard {
  id: string;
  word: string;
  reading: string;
  meanings: Translations;
  level: JlptLevel;
  sourceId?: string;
  /** Thời điểm đến hạn ôn (epoch ms) */
  due: number;
  /** Khoảng cách hiện tại, theo ngày */
  interval: number;
  ease: number;
  reps: number;
  /** Chỗ chừa cho điểm phát âm shadowing (giai đoạn 2) */
  pronunciationScore?: number;
}

export const DECK_KEY = "vimai-video:deck:v1";

export function loadDeck(): DeckCard[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(DECK_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveDeck(deck: DeckCard[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DECK_KEY, JSON.stringify(deck));
  notifyStore();
}

/** Lưu 1 từ vào bộ thẻ. Trả về false nếu từ đã có. */
export function addToDeck(v: VocabItem, sourceId?: string): boolean {
  const deck = loadDeck();
  if (deck.some((c) => c.word === v.word && c.reading === v.reading)) {
    return false;
  }
  deck.push({
    id: `${v.word}|${v.reading}`,
    word: v.word,
    reading: v.reading,
    meanings: v.meanings,
    level: v.level,
    sourceId,
    due: Date.now(),
    interval: 0,
    ease: 2.5,
    reps: 0,
  });
  saveDeck(deck);
  return true;
}

export type ReviewGrade = "again" | "good";

/** Thuật toán lặp lại ngắt quãng rút gọn kiểu SM-2. */
export function reviewCard(id: string, grade: ReviewGrade): void {
  const deck = loadDeck();
  const card = deck.find((c) => c.id === id);
  if (!card) return;
  const now = Date.now();
  if (grade === "again") {
    card.interval = 0;
    card.due = now + 10 * 60 * 1000; // 10 phút nữa
    card.ease = Math.max(1.3, card.ease - 0.2);
    card.reps = 0;
  } else {
    card.interval =
      card.reps === 0 ? 1 : card.reps === 1 ? 3 : Math.round(card.interval * card.ease);
    card.due = now + card.interval * 24 * 60 * 60 * 1000;
    card.ease = Math.min(2.8, card.ease + 0.05);
    card.reps += 1;
  }
  saveDeck(deck);
}

export function dueCards(now = Date.now()): DeckCard[] {
  return loadDeck()
    .filter((c) => c.due <= now)
    .sort((a, b) => a.due - b.due);
}

/* ---------- Hoạt động học + streak + mục tiêu ngày ---------- */

export interface DayActivity {
  videos: number;
  stories: number;
  minutes: number;
}

export const ACTIVITY_KEY = "vimai-video:activity:v1";

function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function loadActivity(): Record<string, DayActivity> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(ACTIVITY_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function logActivity(patch: Partial<DayActivity>): void {
  if (typeof window === "undefined") return;
  const all = loadActivity();
  const key = todayKey();
  const cur = all[key] ?? { videos: 0, stories: 0, minutes: 0 };
  all[key] = {
    videos: cur.videos + (patch.videos ?? 0),
    stories: cur.stories + (patch.stories ?? 0),
    minutes: cur.minutes + (patch.minutes ?? 0),
  };
  window.localStorage.setItem(ACTIVITY_KEY, JSON.stringify(all));
  notifyStore();
}

export function todayActivity(): DayActivity {
  return loadActivity()[todayKey()] ?? { videos: 0, stories: 0, minutes: 0 };
}

/** Số ngày học liên tiếp tính tới hôm nay (hôm nay chưa học thì tính tới hôm qua). */
export function getStreak(): number {
  const all = loadActivity();
  const has = (d: Date) => {
    const a = all[todayKey(d)];
    return !!a && a.videos + a.stories + a.minutes > 0;
  };
  let streak = 0;
  const d = new Date();
  if (!has(d)) d.setDate(d.getDate() - 1);
  while (has(d)) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

/* ---------- Tiến độ xem/đọc ---------- */

export interface Progress {
  pos: number;
  total: number;
  updatedAt: number;
}

export const PROGRESS_KEY = "vimai-video:progress:v1";

export function loadProgress(): Record<string, Progress> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveProgress(id: string, pos: number, total: number): void {
  if (typeof window === "undefined") return;
  const all = loadProgress();
  const prev = all[id];
  // Bỏ qua ghi trùng (vd. video đang dừng) để không bắn sự kiện store vô ích
  if (prev && prev.pos === pos && prev.total === total) return;
  all[id] = { pos, total, updatedAt: Date.now() };
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  notifyStore();
}

/* ---------- Video người dùng tự thêm ---------- */

export interface CustomVideo {
  youtubeId: string;
  title: string;
  addedAt: number;
}

export const CUSTOM_KEY = "vimai-video:custom:v1";

export function loadCustomVideos(): CustomVideo[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(CUSTOM_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addCustomVideo(v: CustomVideo): void {
  if (typeof window === "undefined") return;
  const all = loadCustomVideos();
  if (!all.some((c) => c.youtubeId === v.youtubeId)) {
    all.unshift(v);
    window.localStorage.setItem(CUSTOM_KEY, JSON.stringify(all));
    notifyStore();
  }
}

export const QUEUE_KEY = "vimai-video:queue:v1";

export function loadQueue(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(QUEUE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function toggleQueue(id: string): void {
  if (typeof window === "undefined") return;
  const all = loadQueue();
  const next = all.includes(id) ? all.filter((x) => x !== id) : [...all, id];
  window.localStorage.setItem(QUEUE_KEY, JSON.stringify(next));
  notifyStore();
}

export function removeFromQueue(id: string): void {
  if (typeof window === "undefined") return;
  const next = loadQueue().filter((x) => x !== id);
  window.localStorage.setItem(QUEUE_KEY, JSON.stringify(next));
  notifyStore();
}

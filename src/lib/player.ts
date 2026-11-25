/**
 * Trình phát truyện dùng chung toàn app (một thẻ <audio> duy nhất).
 *
 * Vì sao là singleton ở cấp module: layout giữ nguyên khi chuyển trang phía client,
 * nên audio không bị cắt khi người dùng rời màn truyện (thanh phát nhỏ ở các tab),
 * và có thể tự sang chương sau khi đang tắt màn hình (docs/ux-plan.md mục A2).
 */
import type { AudioTrack, JlptLevel } from "./content-schema";
import { STORY_INDEX } from "./catalog.generated";
import { loadProfile, loadProgress, logActivity, saveProgress } from "./store";

export interface Segment {
  audio: string;
  t?: [number, number];
}

export interface PlayerItem {
  id: string;
  title: string;
  level: JlptLevel;
  /** Gói v2: audio liền của chương */
  track: AudioTrack | null;
  /** Thời điểm từng câu (gói v2) hoặc file từng câu (gói cũ). Rỗng = chưa biết (vừa tự chuyển chương). */
  segs: Segment[];
  total: number;
  /** Ảnh bìa (public/covers/...) cho màn hình khoá; thiếu thì dùng ảnh MiraiGo */
  cover?: string;
}

/** off = không hẹn; "end" = dừng khi hết chương; số = mốc thời gian (ms) sẽ dừng */
export type SleepMode = "off" | "end" | number;

export interface PlayerState {
  item: PlayerItem | null;
  idx: number;
  started: boolean;
  playing: boolean;
  finished: boolean;
  time: number;
  rate: number;
  sleep: SleepMode;
}

const INITIAL: PlayerState = {
  item: null,
  idx: 0,
  started: false,
  playing: false,
  finished: false,
  time: 0,
  rate: 1,
  sleep: "off",
};

let state: PlayerState = INITIAL;
const listeners = new Set<() => void>();
let audio: HTMLAudioElement | null = null;
let stopAt: number | null = null;
let single = false;

function set(patch: Partial<PlayerState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}
export function getState(): PlayerState {
  return state;
}
export function getServerState(): PlayerState {
  return INITIAL;
}

/** Chương kế tiếp trong cùng bộ truyện (theo series.index). */
export function nextChapterId(id: string): string | null {
  const cur = STORY_INDEX.find((s) => s.id === id);
  if (!cur?.series) return null;
  const next = STORY_INDEX.find((s) => s.series?.id === cur.series!.id && s.series.index === cur.series!.index + 1);
  return next ? next.id : null;
}

function markSeen(i: number) {
  const item = state.item;
  if (!item) return;
  const seen = loadProgress()[item.id]?.pos ?? 0;
  const next = Math.max(seen, i + 1);
  if (next !== seen) saveProgress(item.id, next, item.total);
}

function updateMediaSession() {
  if (typeof navigator === "undefined" || !("mediaSession" in navigator) || !state.item) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: state.item.title,
    artist: "MiraiGo",
    album: state.item.level,
    artwork: state.item.cover
      ? [{ src: state.item.cover, sizes: "600x800" }]
      : [{ src: "/media-artwork.png", sizes: "512x512", type: "image/png" }],
  });
}

function getAudio(): HTMLAudioElement {
  if (audio) return audio;
  const a = new Audio();
  a.preload = "auto";
  audio = a;

  a.addEventListener("timeupdate", () => {
    const item = state.item;
    if (!item) return;
    const t = a.currentTime;
    if (typeof state.sleep === "number" && Date.now() >= state.sleep) {
      a.pause();
      set({ sleep: "off", playing: false, time: t });
      return;
    }
    if (item.track && stopAt !== null && t >= stopAt) {
      stopAt = null;
      a.pause();
      set({ playing: false, time: t });
      return;
    }
    let idx = state.idx;
    if (item.track && item.segs.length) {
      while (idx + 1 < item.segs.length && t >= item.segs[idx + 1].t![0]) idx++;
      while (idx > 0 && t < item.segs[idx].t![0]) idx--;
      if (idx !== state.idx) markSeen(state.idx);
    }
    set({ time: t, idx });
  });

  a.addEventListener("ended", () => {
    const item = state.item;
    if (!item) return;
    const i = state.idx;
    markSeen(item.track && item.segs.length ? item.segs.length - 1 : i);
    // Gói cũ: phát nối câu sau
    if (!item.track && !single && i + 1 < item.segs.length) {
      set({ idx: i + 1 });
      a.src = item.segs[i + 1].audio;
      void a.play();
      return;
    }
    if (single && !item.track && i + 1 < item.segs.length) {
      set({ playing: false });
      return;
    }
    // Hết chương
    logActivity({ stories: 1, minutes: Math.max(2, Math.round((item.track?.durationSec ?? item.total * 4) / 60)) });
    if (state.sleep === "end") {
      set({ playing: false, finished: true, sleep: "off" });
      return;
    }
    if (!advance()) set({ playing: false, finished: true });
  });

  a.addEventListener("play", () => set({ playing: true }));
  a.addEventListener("pause", () => set({ playing: false }));

  if (typeof navigator !== "undefined" && "mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler("play", () => toggle());
    navigator.mediaSession.setActionHandler("pause", () => pause());
    navigator.mediaSession.setActionHandler("previoustrack", () => prev());
    navigator.mediaSession.setActionHandler("nexttrack", () => next());
  }
  return a;
}

/** Tự sang chương sau (chỉ gói có audio liền, và người dùng được phép nghe chương đó). */
function advance(): boolean {
  const item = state.item;
  if (!item || !audio) return false;
  const nextId = nextChapterId(item.id);
  const meta = nextId ? STORY_INDEX.find((s) => s.id === nextId) : null;
  if (!meta?.audioTrack) return false;
  if (!meta.free && !loadProfile().vip) return false;
  const title = meta.titles.vi ?? meta.titles.en ?? meta.id;
  state = {
    ...state,
    item: { id: meta.id, title, level: meta.level, track: meta.audioTrack, segs: [], total: meta.sentenceCount, cover: meta.cover },
    idx: 0,
    time: 0,
    finished: false,
  };
  audio.src = meta.audioTrack.src;
  void audio.play();
  updateMediaSession();
  listeners.forEach((l) => l());
  return true;
}

/**
 * Nạp chương vào trình phát. Cùng id: chỉ bổ sung dữ liệu (ví dụ chương vừa tự chuyển
 * tới, nay mở màn đọc thì có thời điểm từng câu), không cắt audio đang phát.
 */
export function load(item: PlayerItem): void {
  if (state.item?.id === item.id) {
    set({ item });
    return;
  }
  audio?.pause();
  stopAt = null;
  single = false;
  set({ item, idx: 0, started: false, playing: false, finished: false, time: 0 });
}

/** Phát từ câu i. only = chỉ phát một câu rồi dừng ("Nghe lại câu"). */
export function playFrom(i: number, only = false): void {
  const item = state.item;
  if (!item) return;
  const a = getAudio();
  a.playbackRate = state.rate;
  single = only;
  const seg = item.segs[i];
  if (item.track) {
    if (!a.src.endsWith(item.track.src)) a.src = item.track.src;
    a.currentTime = seg?.t ? seg.t[0] : 0;
    stopAt = only && seg?.t ? seg.t[1] : null;
  } else if (seg) {
    a.src = seg.audio;
  }
  set({ idx: i, started: true, finished: false });
  updateMediaSession();
  void a.play().catch(() => set({ playing: false }));
}

export function pause(): void {
  audio?.pause();
}

export function toggle(resumeIdx = 0): void {
  if (state.playing) return pause();
  if (state.started && !state.finished && audio?.src) {
    single = false;
    stopAt = null;
    void audio.play().catch(() => set({ playing: false }));
  } else {
    playFrom(state.started && !state.finished ? state.idx : resumeIdx);
  }
}

export function prev(): void {
  playFrom(Math.max(0, state.idx - 1));
}
export function next(): void {
  const item = state.item;
  if (!item) return;
  playFrom(Math.min(Math.max(item.segs.length, 1) - 1, state.idx + 1));
}

/** Chọn câu (không phát). */
export function select(i: number): void {
  set({ idx: i });
}

export function setRate(rate: number): void {
  if (audio) audio.playbackRate = rate;
  set({ rate });
}

export function setSleep(mode: SleepMode): void {
  set({ sleep: mode });
}

/** Dừng hẳn và gỡ chương khỏi trình phát (nút đóng ở thanh phát nhỏ). */
export function stop(): void {
  audio?.pause();
  set({ ...INITIAL, rate: state.rate });
}

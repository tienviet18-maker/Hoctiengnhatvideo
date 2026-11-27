/**
 * Che nội dung VIP ở phía máy chủ (docs/ux-plan.md mục 6). Trang tĩnh chỉ mang phần miễn phí;
 * phần VIP nằm ở `/_locked/<kind>/<id>.json` (scripts/gen-locked.mjs sinh lúc build) và chỉ
 * Worker (worker/index.ts) trả về khi ID token Firebase có VIP còn hạn.
 * Chỉ dùng ở trang máy chủ (page.tsx), không import vào client.
 */
import { FREE_STORY_SENTENCES, FREE_VIDEO_LINES, storyFree } from "./access";
import type { StoryContent, TimedLine, VideoContent } from "./content-schema";

/** Câu bị che: giữ mốc thời gian (để trình phát và đếm câu), bỏ hết chữ. */
function hiddenLine(l: TimedLine): TimedLine {
  return { start: l.start, end: l.end, ja: "", furigana: [], romaji: "", translations: {}, vocab: [] };
}

export type GatedVideo = VideoContent & { partial?: true };
export type GatedStory = StoryContent & {
  partial?: true;
  /** Số câu VIP còn lại sau phần đọc thử */
  lockedCount?: number;
  /** Giây kết thúc phần nghe thử trong audio cả chương (dừng phát ở đây) */
  previewEnd?: number;
};

/** Video VIP: chỉ gửi rõ FREE_VIDEO_LINES câu đầu. */
export function gateVideo(v: VideoContent): GatedVideo {
  if (v.free) return v;
  return { ...v, partial: true, lines: v.lines.map((l, i) => (i < FREE_VIDEO_LINES ? l : hiddenLine(l))) };
}

/**
 * Truyện VIP: gửi rõ FREE_STORY_SENTENCES câu đầu để đọc và nghe thử, không gửi các câu sau và bài học.
 * Audio cả chương vẫn là file tĩnh (đã biết, docs/deploy.md); trình phát dừng ở previewEnd.
 */
export function gateStory(s: StoryContent): GatedStory {
  if (storyFree(s)) return s;
  const shown = s.sentences.slice(0, FREE_STORY_SENTENCES);
  const end = shown[shown.length - 1]?.t?.[1];
  const timed = !!s.audioTrack && shown.length > 0 && shown.every((x) => x.t) && typeof end === "number";
  return {
    ...s,
    partial: true,
    sentences: shown,
    lockedCount: Math.max(0, s.sentences.length - shown.length),
    lesson: undefined,
    audioTrack: timed ? s.audioTrack : undefined,
    previewEnd: timed ? end : undefined,
  };
}

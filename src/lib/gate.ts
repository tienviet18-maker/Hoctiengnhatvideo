/**
 * Che nội dung VIP ở phía máy chủ (docs/ux-plan.md mục 6). Trang tĩnh chỉ mang phần miễn phí;
 * phần VIP nằm ở `/_locked/<kind>/<id>.json` (scripts/gen-locked.mjs sinh lúc build) và chỉ
 * Worker (worker/index.ts) trả về khi ID token Firebase có VIP còn hạn.
 * Chỉ dùng ở trang máy chủ (page.tsx), không import vào client.
 */
import { FREE_VIDEO_LINES, storyFree } from "./access";
import type { StoryContent, TimedLine, VideoContent } from "./content-schema";

/** Câu bị che: giữ mốc thời gian (để trình phát và đếm câu), bỏ hết chữ. */
function hiddenLine(l: TimedLine): TimedLine {
  return { start: l.start, end: l.end, ja: "", furigana: [], romaji: "", translations: {}, vocab: [] };
}

export type GatedVideo = VideoContent & { partial?: true };
export type GatedStory = StoryContent & { partial?: true };

/** Video VIP: chỉ gửi rõ FREE_VIDEO_LINES câu đầu. */
export function gateVideo(v: VideoContent): GatedVideo {
  if (v.free) return v;
  return { ...v, partial: true, lines: v.lines.map((l, i) => (i < FREE_VIDEO_LINES ? l : hiddenLine(l))) };
}

/** Truyện VIP: không gửi câu nào và không gửi bài học; chỉ giữ thông tin bìa. */
export function gateStory(s: StoryContent): GatedStory {
  if (storyFree(s)) return s;
  return { ...s, partial: true, sentences: [], lesson: undefined, audioTrack: undefined };
}

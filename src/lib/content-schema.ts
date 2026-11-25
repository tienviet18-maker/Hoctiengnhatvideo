/**
 * Schema nội dung dùng chung cho video và truyện.
 * Mỗi video/truyện là 1 file JSON trong content/ theo đúng các type này.
 */

export const LANGUAGE_CODES = [
  "vi",
  "en",
  "zh-Hans",
  "zh-Hant",
  "ko",
  "tl",
  "ne",
  "id",
  "pt",
  "my",
  "th",
] as const;

export type LanguageCode = (typeof LANGUAGE_CODES)[number];

/** Bản dịch theo ngôn ngữ; thiếu ngôn ngữ nào thì fallback en -> ja. */
export type Translations = Partial<Record<LanguageCode, string>>;

export type JlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export interface FuriganaSegment {
  /** Bề mặt chữ gốc, ví dụ "私" hoặc "は" */
  surface: string;
  /** Cách đọc kana, ví dụ "わたし"; chuỗi rỗng nếu là kana/okurigana không cần ruby */
  reading: string;
}

export interface VocabItem {
  word: string;
  reading: string;
  meanings: Translations;
  level: JlptLevel;
}

export interface Sentence {
  ja: string;
  furigana: FuriganaSegment[];
  romaji: string;
  translations: Translations;
  vocab: VocabItem[];
  /** Ghi chú ngữ pháp cho nút "Giải thích" (theo ngôn ngữ) */
  grammarNote?: Translations;
}

export interface TimedLine extends Sentence {
  /** Giây bắt đầu trong video */
  start: number;
  /** Giây kết thúc trong video */
  end: number;
}

export type VideoCategory = "conversation" | "song" | "podcast" | "anime";

export interface TeaserPackage {
  start: number;
  end: number;
  /** Đường dẫn file phụ đề .ass của đoạn teaser, ví dụ /teasers/<id>.ass */
  assPath: string;
}

export interface VideoContent {
  kind: "video";
  id: string;
  youtubeId: string;
  titles: Translations;
  level: JlptLevel;
  category: VideoCategory;
  durationSec: number;
  lines: TimedLine[];
  teaser: TeaserPackage;
  free: boolean;
  /** 2 = đã đạt chuẩn nội dung v2 (docs/content-standard.md); thiếu = gói cũ */
  standard?: 2;
}

export interface StorySentence extends Sentence {
  /** Đường dẫn file âm thanh đọc câu, ví dụ /audio/<storyId>/001.mp3 */
  audio: string;
}

export interface StoryContent {
  kind: "story";
  id: string;
  titles: Translations;
  level: JlptLevel;
  /** Chủ đề, ví dụ "daily-life-japan" */
  topic: string;
  /** Nguồn: truyện tự viết hay biên soạn từ Aozora Bunko */
  source: "original" | "aozora-adapted";
  /** Mô tả ảnh bìa hoặc đường dẫn ảnh bìa */
  cover: string;
  sentences: StorySentence[];
  free: boolean;
  /** 2 = đã đạt chuẩn nội dung v2 (docs/content-standard.md); thiếu = gói cũ */
  standard?: 2;
  /** Truyện nhiều chương: id bộ truyện và số chương (từ 1) */
  series?: { id: string; index: number };
}

export type ContentItem = VideoContent | StoryContent;

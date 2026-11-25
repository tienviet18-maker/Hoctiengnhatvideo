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
  /**
   * Âm thanh của câu. Gói cũ: một file mỗi câu (/audio/<storyId>/001.mp3).
   * Gói v2: đoạn trong audio liền của chương, dạng media fragment
   * `${audioTrack.src}#t=<start>,<end>` (trùng với t), nên trình đọc hiện tại vẫn phát đúng câu.
   */
  audio: string;
  /** Gói v2: [giây bắt đầu, giây kết thúc] của câu trong audioTrack của chương */
  t?: [number, number];
  /** Gói v2: giọng đọc câu này (ghi theo docs/content-standard.md mục 6) */
  voice?: "ja-JP-Chirp3-HD-Aoede" | "ja-JP-Neural2-B" | "ja-JP-Neural2-C";
}

/** Một file audio liền cho cả chương: phát liền mạch khi tắt màn hình / Bluetooth. */
export interface AudioTrack {
  /** Ví dụ /audio/<storyId>/chapter.mp3 */
  src: string;
  durationSec: number;
}

/** Điểm ngữ pháp chính của chương (thẻ "Bài học"). */
export interface GrammarPoint {
  /** Mẫu ngữ pháp, ví dụ "〜てしまう" */
  pattern: string;
  /** Nghĩa và cách dùng, 11 ngôn ngữ */
  meaning: Translations;
  /** Chỉ số câu ví dụ trong sentences (từ 0) */
  example: number;
}

/** Câu hỏi hiểu bài sau chương. Câu hỏi và lựa chọn bằng tiếng Nhật đúng cấp. */
export interface QuizQuestion {
  ja: string;
  choices: string[];
  /** Chỉ số lựa chọn đúng (từ 0) */
  answer: number;
  /** Giải thích đáp án, 11 ngôn ngữ */
  explain: Translations;
}

export interface Lesson {
  grammarPoints: GrammarPoint[];
  quiz: QuizQuestion[];
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
  /** Gói v2: audio liền của chương; mỗi câu có t = [start, end] trong file này */
  audioTrack?: AudioTrack;
  /** Gói v2: thẻ Bài học (2–4 điểm ngữ pháp, 3–5 câu hỏi) */
  lesson?: Lesson;
  /** Kệ hiển thị trong tab Truyện */
  shelf?: "literature" | "mystery" | "ghost" | "rakugo" | "folktale-jp" | "hometown" | "world" | "life-series" | "life";
  /** Truyện quê hương: mã nước ISO 3166 (VN, KR, CN, PH, ID, TH, NP, MM, BR) */
  origin?: string;
}

export type ContentItem = VideoContent | StoryContent;

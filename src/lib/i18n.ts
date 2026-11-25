import type { LanguageCode, Translations } from "./content-schema";
import { LANGUAGE_CODES } from "./content-schema";
import vi from "../i18n/locales/vi.json";
import en from "../i18n/locales/en.json";
import zhHans from "../i18n/locales/zh-Hans.json";
import zhHant from "../i18n/locales/zh-Hant.json";
import ko from "../i18n/locales/ko.json";
import tl from "../i18n/locales/tl.json";
import ne from "../i18n/locales/ne.json";
import id from "../i18n/locales/id.json";
import pt from "../i18n/locales/pt.json";
import my from "../i18n/locales/my.json";
import th from "../i18n/locales/th.json";

export type UiStrings = typeof vi;

export const UI: Record<LanguageCode, UiStrings> = {
  vi: vi as UiStrings,
  en: en as UiStrings,
  "zh-Hans": zhHans as UiStrings,
  "zh-Hant": zhHant as UiStrings,
  ko: ko as UiStrings,
  tl: tl as UiStrings,
  ne: ne as UiStrings,
  id: id as UiStrings,
  pt: pt as UiStrings,
  my: my as UiStrings,
  th: th as UiStrings,
};

export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  vi: "Tiếng Việt",
  en: "English",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
  ko: "한국어",
  tl: "Filipino",
  ne: "नेपाली",
  id: "Bahasa Indonesia",
  pt: "Português",
  my: "မြန်မာ",
  th: "ไทย",
};

export { LANGUAGE_CODES };

/** Lấy chữ theo ngôn ngữ đang chọn; thiếu thì fallback en -> vi. */
export function pickText(
  t: Translations | undefined,
  lang: LanguageCode,
): string {
  if (!t) return "";
  return t[lang] ?? t.en ?? t.vi ?? "";
}

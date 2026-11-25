/**
 * Kệ theo kênh/series nguồn — mỗi series là một tiền tố trong id của gói video
 * (akane-*, teppei-*, yuta-*...). Thêm nguồn mới = thêm một dòng ở đây.
 */
export interface SeriesDef {
  key: string;
}

export const SERIES: SeriesDef[] = [
  { key: "akane" },
  { key: "teppei" },
  { key: "yuta" },
  { key: "peppa" },
  { key: "teded" },
  { key: "yuyu" },
  { key: "shun" },
];

export function seriesOf(videoId: string): string | null {
  const def = SERIES.find((s) => videoId.startsWith(`${s.key}-`));
  return def ? def.key : null;
}

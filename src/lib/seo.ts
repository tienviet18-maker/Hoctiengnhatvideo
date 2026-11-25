import type { Metadata } from "next";
import type { Translations } from "./content-schema";

/** Miền đích khi triển khai (CLAUDE.md mục 2). Đổi một chỗ này khi chốt tên/miền. */
export const SITE_URL = "https://video.vimai.jp";

/**
 * Metadata cho trang chi tiết: tiêu đề riêng + canonical + Open Graph.
 * Trước đây cả ~1.000 trang dùng chung một tiêu đề của layout.
 */
export function detailMetadata(opts: {
  path: string;
  titles: Translations;
  level?: string;
  description: string;
  image?: string;
}): Metadata {
  const name = opts.titles.vi ?? opts.titles.en ?? "";
  const title = opts.level ? `${name} (${opts.level})` : name;
  return {
    title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title,
      description: opts.description,
      url: opts.path,
      type: "article",
      ...(opts.image ? { images: [opts.image] } : {}),
    },
  };
}

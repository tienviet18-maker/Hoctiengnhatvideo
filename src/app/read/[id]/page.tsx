import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { detailMetadata } from "../../../lib/seo";
import ReaderClient from "./ReaderClient";
import { getStory, STORIES } from "../../../lib/content";
import { STORY_INDEX } from "../../../lib/catalog.generated";
import { gateStory } from "../../../lib/gate";

export function generateStaticParams() {
  return STORIES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const story = getStory(id);
  if (!story) return {};
  const meta = detailMetadata({
    path: `/read/${id}`,
    titles: story.titles,
    level: story.level,
    description: `Truyện tiếng Nhật ${story.level}: ${story.sentences[0]?.ja ?? ""} — furigana, bản dịch, giải thích và audio từng câu.`,
  });
  // Gói cũ đã có bản v2 thay thế: vẫn mở được nhưng không cho máy tìm kiếm lập chỉ mục, trỏ canonical sang bản mới
  const item = STORY_INDEX.find((s) => s.id === id);
  if (!item?.hidden) return meta;
  const replacedBy = item.replacedBy;
  // Gói cho nghỉ (không có bản thay): chỉ noindex
  if (!replacedBy) return { ...meta, robots: { index: false, follow: true } };
  return { ...meta, robots: { index: false, follow: true }, alternates: { ...meta.alternates, canonical: `/read/${replacedBy}` } };
}

export default async function ReadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStory(id);
  if (!story) notFound();
  const next = story.series
    ? STORIES.find((s) => s.series?.id === story.series!.id && s.series.index === story.series!.index + 1)
    : undefined;
  // Chương VIP: trang tĩnh không mang câu nào, nội dung tải qua /api/content khi có VIP
  return <ReaderClient story={gateStory(story)} next={next ? { id: next.id, titles: next.titles } : undefined} />;
}

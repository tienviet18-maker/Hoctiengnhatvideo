import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { detailMetadata } from "../../../lib/seo";
import ReaderClient from "./ReaderClient";
import { getStory, STORIES } from "../../../lib/content";

export function generateStaticParams() {
  return STORIES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const story = getStory(id);
  if (!story) return {};
  return detailMetadata({
    path: `/read/${id}`,
    titles: story.titles,
    level: story.level,
    description: `Truyện tiếng Nhật ${story.level}: ${story.sentences[0]?.ja ?? ""} — furigana, bản dịch, giải thích và audio từng câu.`,
  });
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
  return <ReaderClient story={story} next={next ? { id: next.id, titles: next.titles } : undefined} />;
}

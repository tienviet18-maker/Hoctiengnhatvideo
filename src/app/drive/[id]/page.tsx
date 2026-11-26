import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { detailMetadata } from "../../../lib/seo";
import DriveClient from "./DriveClient";
import { getStory, STORIES } from "../../../lib/content";
import { STORY_INDEX } from "../../../lib/catalog.generated";

const HIDDEN = new Set(STORY_INDEX.filter((s) => s.hidden).map((s) => s.id));
import { storyFree } from "../../../lib/access";

export function generateStaticParams() {
  return STORIES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const story = getStory(id);
  if (!story) return {};
  return {
    ...detailMetadata({
      path: `/drive/${id}`,
      titles: story.titles,
      level: story.level,
      description: `Nghe truyện tiếng Nhật ${story.level} liên tục khi lái xe.`,
    }),
    // Trùng nội dung với /read/<id>: không cho lập chỉ mục bản "nghe khi lái xe"
    robots: { index: false, follow: true },
  };
}

export default async function DrivePlayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStory(id);
  if (!story) notFound();

  const idx = STORIES.findIndex((s) => s.id === id);
  const nextStory = STORIES.slice(idx + 1).find((s) => s.level === story.level && !HIDDEN.has(s.id)) ?? null;

  return (
    <DriveClient
      story={{
        id: story.id,
        titles: story.titles,
        level: story.level,
        free: storyFree(story),
        // Chương VIP: không đưa câu vào trang tĩnh; DriveClient tải qua /api/content khi có VIP
        sentences: storyFree(story) ? story.sentences.map((s) => ({ ja: s.ja, furigana: s.furigana, audio: s.audio })) : [],
      }}
      next={nextStory ? { id: nextStory.id, titles: nextStory.titles, free: storyFree(nextStory) } : null}
    />
  );
}

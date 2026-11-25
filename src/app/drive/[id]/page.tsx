import { notFound } from "next/navigation";
import DriveClient from "./DriveClient";
import { getStory, STORIES } from "../../../lib/content";

export function generateStaticParams() {
  return STORIES.map((s) => ({ id: s.id }));
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
  const nextStory = STORIES.slice(idx + 1).find((s) => s.level === story.level) ?? null;

  return (
    <DriveClient
      story={{
        id: story.id,
        titles: story.titles,
        level: story.level,
        sentences: story.sentences.map((s) => ({ ja: s.ja, audio: s.audio })),
      }}
      next={nextStory ? { id: nextStory.id, titles: nextStory.titles } : null}
    />
  );
}

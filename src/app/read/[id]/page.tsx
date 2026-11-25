import { notFound } from "next/navigation";
import ReaderClient from "./ReaderClient";
import { getStory, STORIES } from "../../../lib/content";

export function generateStaticParams() {
  return STORIES.map((s) => ({ id: s.id }));
}

export default async function ReadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStory(id);
  if (!story) notFound();
  return <ReaderClient story={story} />;
}

import { notFound } from "next/navigation";
import WatchClient from "./WatchClient";
import { getVideo, VIDEOS } from "../../../lib/content";

export function generateStaticParams() {
  return VIDEOS.map((v) => ({ id: v.id }));
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id.startsWith("custom-")) {
    return <WatchClient videoId={id} youtubeId={id.slice("custom-".length)} video={null} />;
  }
  const video = getVideo(id);
  if (!video) notFound();
  return <WatchClient videoId={id} youtubeId={video.youtubeId} video={video} />;
}

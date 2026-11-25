import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { detailMetadata } from "../../../lib/seo";
import WatchClient from "./WatchClient";
import { getVideo, VIDEOS } from "../../../lib/content";

export function generateStaticParams() {
  return VIDEOS.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  if (id.startsWith("custom-")) return { robots: { index: false, follow: false } };
  const video = getVideo(id);
  if (!video) return {};
  return detailMetadata({
    path: `/watch/${id}`,
    titles: video.titles,
    level: video.level,
    description: `Video tiếng Nhật ${video.level} có phụ đề furigana bấm từng từ, chép chính tả và shadowing.`,
    image: `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`,
  });
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

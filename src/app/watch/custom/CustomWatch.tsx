"use client";

import { useSearchParams } from "next/navigation";
import WatchClient from "../[id]/WatchClient";

export default function CustomWatch() {
  const v = useSearchParams().get("v") ?? "";
  if (!/^[A-Za-z0-9_-]{11}$/.test(v)) return null;
  return <WatchClient key={v} videoId={`custom-${v}`} youtubeId={v} video={null} />;
}

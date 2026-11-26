import type { Metadata } from "next";
import { Suspense } from "react";
import CustomWatch from "./CustomWatch";

// Video người dùng tự thêm: /watch/custom?v=<youtubeId>. Bản web là trang tĩnh nên không có /watch/custom-<id>.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function CustomWatchPage() {
  return (
    <Suspense>
      <CustomWatch />
    </Suspense>
  );
}

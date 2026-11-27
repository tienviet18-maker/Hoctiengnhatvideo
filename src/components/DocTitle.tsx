"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "./LangProvider";

/**
 * Tiêu đề tab trình duyệt theo ngôn ngữ đang chọn. Trang tĩnh xuất sẵn tiêu đề tiếng Việt (cho SEO);
 * khi người dùng chọn ngôn ngữ khác thì đổi tiêu đề trên máy. Next có thể ghi lại thẻ <title> sau khi
 * trang chạy (metadata tải sau), nên theo dõi thẻ <title> và đặt lại khi bị đổi.
 */
let wanted: string | null = null;
let observer: MutationObserver | null = null;

function apply(title: string | null) {
  wanted = title;
  if (title === null) return;
  if (document.title !== title) document.title = title;
  if (!observer) {
    observer = new MutationObserver(() => {
      if (wanted !== null && document.title !== wanted) document.title = wanted;
    });
    observer.observe(document.head, { subtree: true, childList: true, characterData: true });
  }
}

/** Trang truyện/video đặt tên bài theo ngôn ngữ đang chọn. */
export function useDocTitle(title: string | null) {
  const { lang } = useLang();
  useEffect(() => {
    if (lang === "vi" || title === null) return;
    apply(`${title} · MiraiGo`);
    return () => apply(null);
  }, [lang, title]);
}

export default function DocTitle() {
  const pathname = usePathname();
  const { lang, ui } = useLang();
  useEffect(() => {
    if (lang === "vi" || pathname.startsWith("/read/") || pathname.startsWith("/watch/")) return;
    apply(pathname.startsWith("/paths") ? `${ui.paths.title} · MiraiGo` : `MiraiGo: ${ui.app.tagline}`);
    return () => apply(null);
  }, [lang, pathname, ui]);
  return null;
}

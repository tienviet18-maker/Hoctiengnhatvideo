import { Suspense } from "react";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "../lib/seo";
import { LangProvider } from "../components/LangProvider";
import DocTitle from "../components/DocTitle";
import TabBar from "../components/TabBar";
import MiniPlayer from "../components/MiniPlayer";
import AccountRoot from "../components/AccountRoot";

const bvp = Be_Vietnam_Pro({
  variable: "--font-bvp",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MiraiGo: Xem phim vui, nghe truyện hay",
    template: "%s · MiraiGo",
  },
  description:
    "Xem video, nghe và đọc truyện tiếng Nhật có furigana, bản dịch, giải thích từng câu, đúng cấp độ của bạn. Tiếng Nhật trong tay, giỏi lên mỗi ngày.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${bvp.variable} h-full`}>
      <body className="min-h-full">
        <LangProvider>
          <AccountRoot />
          <div className="app-shell">
            {children}
            <Suspense fallback={null}>
              <MiniPlayer />
              <TabBar />
              <DocTitle />
            </Suspense>
          </div>
        </LangProvider>
      </body>
    </html>
  );
}

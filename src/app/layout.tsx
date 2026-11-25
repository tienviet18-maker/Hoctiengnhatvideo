import { Suspense } from "react";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { LangProvider } from "../components/LangProvider";
import TabBar from "../components/TabBar";

const bvp = Be_Vietnam_Pro({
  variable: "--font-bvp",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ViMai Video — Học tiếng Nhật qua video và truyện",
  description:
    "Học tiếng Nhật qua video YouTube và truyện phân cấp: phụ đề furigana, chép chính tả, shadowing, ôn từ vựng mỗi ngày.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${bvp.variable} h-full`}>
      <body className="min-h-full">
        <LangProvider>
          <div className="app-shell">
            {children}
            <Suspense fallback={null}>
              <TabBar />
            </Suspense>
          </div>
        </LangProvider>
      </body>
    </html>
  );
}

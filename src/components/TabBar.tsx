"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LangProvider";

const HIDDEN_PREFIXES = ["/watch", "/read", "/drive", "/onboarding"];

function Icon({ d, filled }: { d: string; filled?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

export default function TabBar() {
  const pathname = usePathname();
  const { ui } = useLang();
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const tabs = [
    {
      href: "/",
      label: ui.tabs.video,
      icon: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M10 9.5l5 2.5-5 2.5z",
      match: (p: string) => p === "/" || p.startsWith("/watch"),
    },
    {
      href: "/books",
      label: ui.tabs.books,
      icon: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z M4 19a2 2 0 0 1 2-2h13",
      match: (p: string) => p.startsWith("/books") || p.startsWith("/read"),
    },
    {
      href: "/news",
      label: ui.tabs.news,
      icon: "M4 6h16 M4 12h16 M4 18h10",
      match: (p: string) => p.startsWith("/news"),
    },
    {
      href: "/library",
      label: ui.tabs.library,
      icon: "M5 4h14v16l-7-4-7 4z",
      match: (p: string) => p.startsWith("/library"),
    },
    {
      href: "/profile",
      label: ui.tabs.profile,
      icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c1.5-4 5-5.5 8-5.5s6.5 1.5 8 5.5",
      match: (p: string) => p.startsWith("/profile"),
    },
  ];

  return (
    <nav className="tabbar">
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} className={t.match(pathname) ? "on" : ""}>
          <Icon d={t.icon} />
          {t.label}
          <span className="pip" />
        </Link>
      ))}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { useLang } from "../../components/LangProvider";
import PathGrid from "../../components/PathGrid";

export default function PathsClient() {
  const { ui } = useLang();
  return (
    <div className="page">
      <Link href="/" style={{ color: "var(--navy)", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>← {ui.common.back}</Link>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--navy)", letterSpacing: "-.02em", marginTop: 12 }}>
        {ui.paths.title}
      </h1>
      <p style={{ marginTop: 6, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{ui.paths.subtitle}</p>
      <PathGrid />
    </div>
  );
}

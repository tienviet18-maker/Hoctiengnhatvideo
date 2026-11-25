"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";
import { PATHS } from "../lib/paths";
import { PROGRESS_KEY, useLocalJson, type Progress } from "../lib/store";

/** Lưới 4 lộ trình sống kèm tiến độ — dùng ở trang chủ và trang /paths. */
export default function PathGrid() {
  const { ui } = useLang();
  const progress = useLocalJson<Record<string, Progress>>(PROGRESS_KEY, {});
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
      {PATHS.map((p) => {
        const info = ui.paths[p.id];
        const done = p.items.filter((id) => {
          const pr = progress[id];
          return pr && pr.total > 0 && pr.pos / pr.total >= 0.9;
        }).length;
        return (
          <Link
            key={p.id}
            href={`/paths/${p.id}`}
            className="card"
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--navy)", lineHeight: 1.3 }}>{info.name}</span>
            <span style={{ display: "block", fontSize: 11, color: "var(--muted)", marginTop: 4, lineHeight: 1.45 }}>{info.desc}</span>
            <span style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--navy)", marginTop: 8 }}>
              {done}/{p.items.length} {ui.paths.lessons}
            </span>
            <span className="progress-track" style={{ display: "block", marginTop: 5 }}>
              <i style={{ width: `${(done / p.items.length) * 100}%` }} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}

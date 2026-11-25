"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LangProvider";
import * as player from "../lib/player";

/** Thanh phát nhỏ nằm trên thanh tab khi đang có truyện trong trình phát (docs/ux-plan.md mục 1). */
export default function MiniPlayer() {
  const ps = useSyncExternalStore(player.subscribe, player.getState, player.getServerState);
  const pathname = usePathname();
  const { ui } = useLang();
  const item = ps.item;
  if (!item || !ps.started) return null;
  if (pathname.startsWith("/read/") || pathname.startsWith("/drive") || pathname.startsWith("/watch") || pathname.startsWith("/onboarding")) return null;
  const pct = item.track ? Math.min(100, (ps.time / Math.max(1, item.track.durationSec)) * 100) : ((ps.idx + 1) / Math.max(1, item.total)) * 100;

  return (
    <div
      style={{
        position: "fixed", left: 0, right: 0, bottom: "calc(70px + env(safe-area-inset-bottom))", maxWidth: 430, margin: "0 auto",
        padding: "0 10px", zIndex: 45, pointerEvents: "none",
      }}
    >
      <div
        style={{
          pointerEvents: "auto", background: "#fff", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden",
          boxShadow: "0 6px 18px rgba(20,33,61,.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 6px 6px 12px" }}>
          <Link href={`/read/${item.id}`} style={{ flex: 1, minWidth: 0, textDecoration: "none", color: "inherit" }}>
            <span style={{ display: "block", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</span>
            <span style={{ display: "block", fontSize: 11, color: "var(--muted)" }}>
              {ps.playing ? `${item.level} · ${ui.reader.sentenceOf.replace("{i}", String(ps.idx + 1)).replace("{n}", String(item.total))}` : ui.reader.miniPaused}
            </span>
          </Link>
          <button
            type="button"
            aria-label={ps.playing ? ui.reader.pause : ui.reader.play}
            onClick={() => player.toggle()}
            style={{ width: 44, height: 44, border: 0, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {ps.playing ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--navy)" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--navy)" aria-hidden><path d="M8 5.5v13l11-6.5z" /></svg>
            )}
          </button>
          <button
            type="button"
            aria-label={ui.reader.miniClose}
            onClick={() => player.stop()}
            style={{ width: 44, height: 44, border: 0, background: "transparent", cursor: "pointer", color: "var(--muted)", fontSize: 20 }}
          >
            ×
          </button>
        </div>
        <div style={{ height: 3, background: "var(--muted-bg)" }}>
          <div style={{ width: `${pct}%`, height: 3, background: "var(--accent)" }} />
        </div>
      </div>
    </div>
  );
}

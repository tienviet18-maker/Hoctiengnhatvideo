import type { StoryIndexItem } from "../lib/catalog.generated";

/** Màu bìa chữ (kiểu bunko) ổn định theo id, cho truyện chưa có ảnh bìa. */
const TONES = [
  ["#F3D9B5", "#5A2D0C"],
  ["#20262E", "#F5C542"],
  ["#3B3A4A", "#E8E2F2"],
  ["#DCE6F2", "#1F3864"],
  ["#EFE6D2", "#2B1D14"],
  ["#E3EFE6", "#1E4D36"],
  ["#F6E1E1", "#7A1F2B"],
] as const;

export function coverTone(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

/** Mã nước ISO 3166 thành cờ emoji (VN → 🇻🇳). */
export function flag(code: string) {
  return code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export default function StoryCover({
  story,
  title,
  width = 104,
  pct = 0,
}: {
  story: StoryIndexItem;
  title: string;
  width?: number;
  pct?: number;
}) {
  const height = Math.round((width * 4) / 3);
  const [bg, fg] = coverTone(story.id);
  return (
    <span style={{ position: "relative", display: "block", width, height, borderRadius: 6, overflow: "hidden", background: bg, color: fg, boxShadow: "0 2px 6px rgba(20,33,61,.15)" }}>
      {story.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={story.cover} alt="" loading="lazy" width={width} height={height} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <span style={{ position: "absolute", inset: 0, padding: 9, fontSize: width > 110 ? 15 : 13, fontWeight: 800, lineHeight: 1.3, overflow: "hidden" }}>
          <span style={{ display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</span>
        </span>
      )}
      {/* Bìa ảnh v2 đã in sẵn cấp độ và nguồn gốc: chỉ bìa chữ mới cần nhãn */}
      {!story.cover && (
      <span style={{ position: "absolute", left: 6, bottom: pct > 0 ? 9 : 6, display: "flex", gap: 4 }}>
        <span style={{ fontSize: 10, fontWeight: 800, background: "rgba(255,255,255,.92)", color: "#14213D", borderRadius: 5, padding: "1px 5px" }}>{story.level}</span>
        {story.origin && (
          <span style={{ fontSize: 10, fontWeight: 800, background: "rgba(255,255,255,.92)", color: "#14213D", borderRadius: 5, padding: "1px 5px" }}>
            {flag(story.origin)} {story.origin}
          </span>
        )}
      </span>
      )}
      {!story.free && (
        <span style={{ position: "absolute", right: 6, top: 6, fontSize: 9, fontWeight: 800, background: "#14213D", color: "#F5C542", borderRadius: 5, padding: "2px 5px" }}>VIP</span>
      )}
      {pct > 0 && (
        <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: "rgba(0,0,0,.15)" }}>
          <span style={{ display: "block", width: `${pct}%`, height: 3, background: "var(--accent)" }} />
        </span>
      )}
    </span>
  );
}

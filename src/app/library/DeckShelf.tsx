"use client";

import { useState } from "react";
import { useLang } from "../../components/LangProvider";
import Paywall from "../../components/Paywall";
import { FREE_DECK_CARDS } from "../../lib/access";
import { DECKS, type DeckInfo } from "../../lib/decks.generated";
import { addPremadeCards, type DeckCard, type PremadeCard } from "../../lib/store";

const STEP = 10;

/** Mục "Bộ thẻ có sẵn" ở tab Ôn tập: thêm thẻ soạn sẵn (nguồn ViBJT) vào lượt ôn, mỗi lần 10 thẻ. */
export default function DeckShelf({ deck }: { deck: DeckCard[] }) {
  const { ui, profile } = useLang();
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);
  const L = ui.library;

  const addedOf = (id: string) => deck.filter((c) => c.deckId === id).length;
  const title = (d: DeckInfo) =>
    (d.group === "office" ? L.deckOffice : d.group === "keigo" ? L.deckKeigo : L.deckGrammar) + (d.level ? ` ${d.level}` : "");

  const add = async (d: DeckInfo) => {
    const room = profile.vip ? STEP : Math.min(STEP, FREE_DECK_CARDS - deck.length);
    if (room <= 0) {
      setPaywall(true);
      return;
    }
    setBusy(d.id);
    try {
      const res = await fetch(`/decks/${d.id}.json`);
      const cards: PremadeCard[] = await res.json();
      const n = addPremadeCards(cards, d.id, room);
      setNote(L.addedToday.replace("{n}", String(n)));
    } catch {
      setNote(null);
    } finally {
      setBusy(null);
    }
  };

  if (!DECKS.length) return null;

  return (
    <>
      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "22px 0 4px" }}>{L.decksTitle}</h2>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10 }}>{L.decksHint}</p>
      <div className="card" style={{ padding: 0 }}>
        {DECKS.map((d, i) => {
          const added = addedOf(d.id);
          const done = added >= d.count;
          return (
            <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderTop: i ? "1px solid var(--border)" : 0 }}>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>{title(d)}</span>
                <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                  {L.deckProgress.replace("{n}", String(added)).replace("{m}", String(d.count))}
                </span>
                <span style={{ display: "block", height: 4, borderRadius: 2, background: "var(--border)", marginTop: 6 }}>
                  <span style={{ display: "block", height: 4, borderRadius: 2, width: `${Math.round((added / d.count) * 100)}%`, background: "var(--accent)" }} />
                </span>
              </span>
              <button
                type="button"
                disabled={done || busy === d.id}
                onClick={() => add(d)}
                style={{
                  minHeight: 40, padding: "0 14px", borderRadius: 10, border: "none", flexShrink: 0, fontFamily: "inherit",
                  fontWeight: 700, fontSize: 13, cursor: done ? "default" : "pointer",
                  background: done ? "var(--border)" : "var(--navy)", color: done ? "var(--muted)" : "#fff",
                }}
              >
                {done ? L.deckAllAdded : L.addCards.replace("{n}", String(Math.min(STEP, d.count - added)))}
              </button>
            </div>
          );
        })}
      </div>
      {note && <p role="status" style={{ fontSize: 13, color: "var(--ok)", marginTop: 8, fontWeight: 600 }}>{note}</p>}
      {paywall && <Paywall onClose={() => setPaywall(false)} />}
    </>
  );
}

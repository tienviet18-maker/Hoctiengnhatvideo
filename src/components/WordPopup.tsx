"use client";

import { useState } from "react";
import type { VocabItem } from "../lib/content-schema";
import { pickText } from "../lib/i18n";
import { addToDeck, DECK_KEY, useLocalJson, type DeckCard } from "../lib/store";
import { FREE_DECK_CARDS } from "../lib/access";
import Paywall from "./Paywall";
import { useLang } from "./LangProvider";

const EMPTY_DECK: DeckCard[] = [];

export default function WordPopup({
  vocab,
  sourceId,
  onClose,
  dark,
}: {
  vocab: VocabItem;
  sourceId?: string;
  onClose: () => void;
  dark?: boolean;
}) {
  const { ui, lang, profile } = useLang();
  const [paywall, setPaywall] = useState(false);
  const deck = useLocalJson<DeckCard[]>(DECK_KEY, EMPTY_DECK);
  const [justSaved, setJustSaved] = useState(false);
  // Hiện "Đã lưu" cả khi từ đã có sẵn trong bộ thẻ (trước đây luôn hiện nút Lưu)
  const saved = justSaved || deck.some((c) => c.word === vocab.word && c.reading === vocab.reading);
  // Tài khoản thường giữ tối đa FREE_DECK_CARDS thẻ (ux-plan mục 6)
  const full = !saved && !profile.vip && deck.length >= FREE_DECK_CARDS;

  return (
    <div
      style={{
        background: "#fff",
        color: "var(--text)",
        borderRadius: 14,
        padding: "14px 16px",
        boxShadow: "0 8px 28px rgba(0,0,0,.25)",
        border: dark ? "none" : "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span className="jp" style={{ fontSize: 20, fontWeight: 700 }}>
          {vocab.word}
        </span>
        <span className="jp" style={{ fontSize: 13, color: "var(--muted)" }}>
          {vocab.reading}
        </span>
        <span className="lvl" style={{ marginLeft: "auto" }}>
          {vocab.level}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            background: "none",
            border: "none",
            fontSize: 18,
            color: "var(--muted)",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ×
        </button>
      </div>
      <div style={{ fontSize: 14, marginTop: 6 }}>
        {pickText(vocab.meanings, lang)}
      </div>
      <button
        type="button"
        disabled={saved}
        onClick={() => {
          if (full) {
            setPaywall(true);
            return;
          }
          addToDeck(vocab, sourceId);
          setJustSaved(true);
        }}
        style={{
          marginTop: 10,
          background: saved ? "var(--ok)" : "var(--navy)",
          color: "#fff",
          border: "none",
          fontWeight: 700,
          fontSize: 13,
          padding: "8px 14px",
          borderRadius: 9,
          cursor: saved ? "default" : "pointer",
        }}
      >
        {saved ? ui.common.saved : full ? ui.vip.deckFull.replace("{n}", String(FREE_DECK_CARDS)) : ui.wordPopup.saveToDeck}
      </button>
      {paywall && <Paywall onClose={() => setPaywall(false)} />}
    </div>
  );
}

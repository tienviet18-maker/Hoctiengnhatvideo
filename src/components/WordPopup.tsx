"use client";

import { useState } from "react";
import type { VocabItem } from "../lib/content-schema";
import { pickText } from "../lib/i18n";
import { addToDeck } from "../lib/store";
import { useLang } from "./LangProvider";

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
  const { ui, lang } = useLang();
  const [saved, setSaved] = useState(false);

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
          addToDeck(vocab, sourceId);
          setSaved(true);
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
        {saved ? ui.common.saved : ui.wordPopup.saveToDeck}
      </button>
    </div>
  );
}

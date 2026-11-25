"use client";

import { useState } from "react";
import { useLang } from "../../../components/LangProvider";
import type { StoryContent, VocabItem } from "../../../lib/content-schema";
import { pickText } from "../../../lib/i18n";

const card: React.CSSProperties = {
  background: "#fff", border: "1px solid var(--border)", borderRadius: 14,
};

/** Thẻ "Bài học" của chương: từ vựng, ngữ pháp, câu hỏi nhanh (docs/ux-plan.md mục 2.5). */
export default function LessonPanel({
  story,
  vocab,
  onWord,
  vip,
  onUnlock,
}: {
  story: StoryContent;
  vocab: VocabItem[];
  onWord: (v: VocabItem) => void;
  /** Tài khoản thường chỉ thấy từ vựng; ngữ pháp và câu hỏi là phần VIP (ux-plan mục 6). */
  vip: boolean;
  onUnlock: () => void;
}) {
  const { ui, lang } = useLang();
  const lesson = story.lesson;
  const quiz = lesson?.quiz ?? [];
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = q >= quiz.length;

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === quiz[q].answer) setScore((s) => s + 1);
  };
  const nextQ = () => {
    setPicked(null);
    setQ((n) => n + 1);
  };
  const retry = () => {
    setQ(0);
    setPicked(null);
    setScore(0);
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <h2 style={{ fontSize: 17, fontWeight: 700, margin: "18px 0 10px" }}>
        {ui.reader.vocabTitle.replace("{n}", String(vocab.length))}
      </h2>
      <div style={card}>
        {vocab.map((v, i) => (
          <button
            key={v.word}
            type="button"
            onClick={() => onWord(v)}
            style={{
              display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 14px", minHeight: 44,
              border: 0, borderTop: i ? "1px solid var(--border)" : 0, background: "transparent", cursor: "pointer",
              fontFamily: "inherit", textAlign: "left", color: "inherit",
            }}
          >
            <span lang="ja" className="jp" style={{ fontSize: 18, fontWeight: 700, minWidth: 64 }}>{v.word}</span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span lang="ja" style={{ display: "block", fontSize: 12, color: "var(--muted)" }}>{v.reading}</span>
              <span style={{ display: "block", fontSize: 14 }}>{pickText(v.meanings, lang)}</span>
            </span>
            <span className="lvl">{v.level}</span>
          </button>
        ))}
      </div>

      {!lesson && <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 18, lineHeight: 1.5 }}>{ui.reader.noLesson}</p>}

      {lesson && !vip && (lesson.grammarPoints.length > 0 || quiz.length > 0) && (
        <div style={{ background: "#14213D", color: "#fff", borderRadius: 14, padding: 16, marginTop: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>
            <span className="lock-badge" style={{ marginRight: 8 }}>VIP</span>
            {ui.vip.lessonLocked}
          </div>
          {lesson.grammarPoints.length > 0 && (
            <div lang="ja" className="jp" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              {lesson.grammarPoints.map((g) => (
                <span key={g.pattern} style={{ fontSize: 14, fontWeight: 700, border: "1px solid #33456A", borderRadius: 8, padding: "4px 10px" }}>{g.pattern}</span>
              ))}
            </div>
          )}
          {vip && quiz.length > 0 && (
            <div style={{ fontSize: 13, color: "#c9d8ee", marginTop: 10 }}>
              {ui.reader.quizTitle} · {quiz.length}
            </div>
          )}
          <button type="button" className="btn-primary" onClick={onUnlock} style={{ marginTop: 14, background: "#F5C542", color: "#14213D" }}>
            {ui.vip.unlock}
          </button>
        </div>
      )}

      {vip && lesson && lesson.grammarPoints.length > 0 && (
        <>
          <h2 style={{ fontSize: 17, fontWeight: 700, margin: "22px 0 10px" }}>
            {ui.reader.grammarTitle} · {lesson.grammarPoints.length}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {lesson.grammarPoints.map((g) => (
              <div key={g.pattern} style={{ ...card, padding: "12px 14px" }}>
                <div lang="ja" className="jp" style={{ fontSize: 17, fontWeight: 700 }}>{g.pattern}</div>
                <div style={{ fontSize: 13.5, marginTop: 4, lineHeight: 1.55 }}>{pickText(g.meaning, lang)}</div>
                {story.sentences[g.example] && (
                  <div style={{ marginTop: 8, fontSize: 13, color: "var(--muted)" }}>
                    <span style={{ fontSize: 11, fontWeight: 700 }}>{ui.reader.example}</span>
                    <div lang="ja" className="jp" style={{ marginTop: 2, color: "var(--text)" }}>{story.sentences[g.example].ja}</div>
                    <div style={{ marginTop: 2 }}>{pickText(story.sentences[g.example].translations, lang)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {quiz.length > 0 && (
        <>
          <h2 style={{ fontSize: 17, fontWeight: 700, margin: "22px 0 10px" }}>
            {ui.reader.quizTitle} · {Math.min(q + 1, quiz.length)}/{quiz.length}
          </h2>
          <div style={{ background: "#14213D", color: "#fff", borderRadius: 14, padding: 14 }}>
            {done ? (
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <div style={{ fontSize: 18, fontWeight: 800 }}>
                  {ui.reader.quizScore.replace("{n}", String(score)).replace("{m}", String(quiz.length))}
                </div>
                <button
                  type="button"
                  onClick={retry}
                  style={{ marginTop: 12, height: 44, padding: "0 20px", borderRadius: 10, border: "1px solid #33456A", background: "transparent", color: "#fff", fontFamily: "inherit", fontWeight: 700, cursor: "pointer" }}
                >
                  {ui.reader.quizRetry}
                </button>
              </div>
            ) : (
              <>
                <div lang="ja" className="jp" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.6 }}>{quiz[q].ja}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                  {quiz[q].choices.map((c, i) => {
                    const right = picked !== null && i === quiz[q].answer;
                    const wrong = picked === i && i !== quiz[q].answer;
                    return (
                      <button
                        key={i}
                        type="button"
                        lang="ja"
                        onClick={() => pick(i)}
                        aria-pressed={picked === i}
                        style={{
                          minHeight: 44, borderRadius: 10, textAlign: "left", padding: "8px 12px", fontFamily: "inherit",
                          fontSize: 14, fontWeight: 500, cursor: picked === null ? "pointer" : "default", color: "#fff",
                          border: right || wrong ? 0 : "1px solid #33456A",
                          background: right ? "#2E7D5B" : wrong ? "#B91C2B" : "transparent",
                        }}
                      >
                        {String.fromCharCode(65 + i)}. {c}
                        {right ? " ✓" : wrong ? " ✗" : ""}
                      </button>
                    );
                  })}
                </div>
                {picked !== null && (
                  <>
                    <div style={{ fontSize: 13, color: "#C9D4EA", marginTop: 10, lineHeight: 1.55 }}>{pickText(quiz[q].explain, lang)}</div>
                    <button
                      type="button"
                      onClick={nextQ}
                      style={{ marginTop: 12, width: "100%", height: 44, borderRadius: 10, border: 0, background: "#fff", color: "#14213D", fontFamily: "inherit", fontWeight: 700, cursor: "pointer" }}
                    >
                      {ui.reader.quizNext}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

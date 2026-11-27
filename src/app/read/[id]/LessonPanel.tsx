"use client";

import { seededOrder } from "../../../lib/shuffle";
import { useState } from "react";
import Furigana from "../../../components/Furigana";
import { useLang } from "../../../components/LangProvider";
import type { FuriganaSegment, StoryContent, VocabItem } from "../../../lib/content-schema";
import { pickText } from "../../../lib/i18n";

/** Mọi kanji đều có furigana (quy tắc của app): hiện ruby nếu có, không thì chữ trơn. */
function Ja({ text, segs }: { text: string; segs?: FuriganaSegment[] }) {
  return segs ? <Furigana segments={segs} /> : <>{text}</>;
}

/** Tách cách đọc của một từ vựng thành ruby cho phần kanji, giữ okurigana trơn. */
function wordSegments(word: string, reading: string): FuriganaSegment[] {
  const K = /[\u4e00-\u9fff\u3400-\u4dbf々]/;
  if (!reading || !K.test(word)) return [{ surface: word, reading: "" }];
  const toH = (s: string) => s.replace(/[\u30a1-\u30f6]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  const chunks = word.match(/[\u4e00-\u9fff\u3400-\u4dbf々]+|[^\u4e00-\u9fff\u3400-\u4dbf々]+/g) ?? [word];
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = new RegExp("^" + chunks.map((c) => (K.test(c) ? "(.+?)" : "(" + esc(toH(c)) + ")")).join("") + "$").exec(toH(reading));
  if (!m) return [{ surface: word, reading }];
  return chunks.map((c, i) => ({ surface: c, reading: K.test(c) ? m[i + 1] : "" }));
}

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
            <span lang="ja" className="jp" style={{ fontSize: 18, fontWeight: 700, minWidth: 64 }}><Furigana segments={wordSegments(v.word, v.reading)} /></span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "block", fontSize: 14 }}>{pickText(v.meanings, lang)}</span>
            </span>
            <span className="lvl">{v.level}</span>
          </button>
        ))}
      </div>

      {!lesson && <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 18, lineHeight: 1.5 }}>{ui.reader.noLesson}</p>}

      {lesson && !vip && (lesson.grammarPoints.length > 0 || quiz.length > 0) && (
        <div className="on-dark" style={{ background: "#14213D", color: "#fff", borderRadius: 14, padding: 16, marginTop: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>
            <span className="lock-badge" style={{ marginRight: 8 }}>VIP</span>
            {ui.vip.lessonLocked}
          </div>
          {lesson.grammarPoints.length > 0 && (
            <div lang="ja" className="jp" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
              {lesson.grammarPoints.map((g) => (
                <span key={g.pattern} style={{ fontSize: 14, fontWeight: 700, border: "1px solid #33456A", borderRadius: 8, padding: "4px 10px" }}><Ja text={g.pattern} segs={g.patternFurigana} /></span>
              ))}
            </div>
          )}
          {quiz.length > 0 && (
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
                <div lang="ja" className="jp" style={{ fontSize: 17, fontWeight: 700 }}><Ja text={g.pattern} segs={g.patternFurigana} /></div>
                <div style={{ fontSize: 13.5, marginTop: 4, lineHeight: 1.55 }}>{pickText(g.meaning, lang)}</div>
                {story.sentences[g.example] && (
                  <div style={{ marginTop: 8, fontSize: 13, color: "var(--muted)" }}>
                    <span style={{ fontSize: 11, fontWeight: 700 }}>{ui.reader.example}</span>
                    <div lang="ja" className="jp" style={{ marginTop: 2, color: "var(--text)", lineHeight: 2 }}><Ja text={story.sentences[g.example].ja} segs={story.sentences[g.example].furigana} /></div>
                    <div style={{ marginTop: 2 }}>{pickText(story.sentences[g.example].translations, lang)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {vip && quiz.length > 0 && (
        <>
          <h2 style={{ fontSize: 17, fontWeight: 700, margin: "22px 0 10px" }}>
            {ui.reader.quizTitle} · {Math.min(q + 1, quiz.length)}/{quiz.length}
          </h2>
          <div className="on-dark" style={{ background: "#14213D", color: "#fff", borderRadius: 14, padding: 14 }}>
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
                <div lang="ja" className="jp" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.9 }}><Ja text={quiz[q].ja} segs={quiz[q].jaFurigana} /></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                  {/* Xáo đáp án cố định theo gói + câu hỏi: nhiều gói lưu đáp án đúng ở vị trí đầu */}
                  {seededOrder(quiz[q].choices.length, `${story.id}:${q}`).map((i, pos) => {
                    const c = quiz[q].choices[i];
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
                          fontSize: 14, fontWeight: 500, lineHeight: 1.9, cursor: picked === null ? "pointer" : "default", color: "#fff",
                          border: right || wrong ? 0 : "1px solid #33456A",
                          background: right ? "#2E7D5B" : wrong ? "#B91C2B" : "transparent",
                        }}
                      >
                        {String.fromCharCode(65 + pos)}. <Ja text={c} segs={quiz[q].choicesFurigana?.[i]} />
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

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "../../components/LangProvider";
import Paywall from "../../components/Paywall";
import StoryCover from "../../components/StoryCover";
import { LANGUAGE_CODES, LANGUAGE_NAMES, pickText } from "../../lib/i18n";
import type { JlptLevel } from "../../lib/content-schema";
import { STORY_INDEX } from "../../lib/catalog.generated";
import { PLACEMENT } from "../../lib/placement";
import { INTEREST_SHELVES, shelfOf } from "../../lib/shelves";

/**
 * Onboarding (docs/ux-plan.md A1), học cách Tadoku hỏi nhiều để cá nhân hoá, nhưng
 * MiraiGo nghe thử thật để xếp cấp và kết thúc bằng một truyện miễn phí vừa sức.
 * Bước: 0 chào + ngôn ngữ · 1 sở thích · 2 tự đánh giá · 3 nghe thử · 4 mục tiêu · 5 tên · 6 dựng kế hoạch · 7 kế hoạch
 */
const STEPS = 8;
const INTERESTS = ["anime", "mystery", "folktale", "rakugo", "literature", "life", "podcast"] as const;
const SELF_LEVELS: JlptLevel[] = ["N5", "N4", "N3", "N2", "N1"];
const GOALS = [5, 10, 15, 20];
const WHEN = ["commute", "drive", "chores", "bed"] as const;
const ORDER: JlptLevel[] = ["N5", "N4", "N3", "N2", "N1"];

export default function OnboardingPage() {
  const { ui, lang, profile, ready, updateProfile } = useLang();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [selfLevel, setSelfLevel] = useState<JlptLevel | null>(null);
  const [heard, setHeard] = useState<Record<number, boolean>>({});
  const [goal, setGoal] = useState(10);
  const [when, setWhen] = useState<string[]>([]);
  const [paywall, setPaywall] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const o = ui.onboarding;

  useEffect(() => {
    if (ready && profile.onboarded) router.replace("/");
  }, [ready, profile.onboarded, router]);

  // Bước dựng kế hoạch: chờ ngắn cho cảm giác "đang chọn riêng cho bạn"
  useEffect(() => {
    if (step !== 6) return;
    const t = window.setTimeout(() => setStep(7), 1600);
    return () => window.clearTimeout(t);
  }, [step]);

  // Cấp gợi ý: câu khó nhất còn hiểu trong bài nghe; tự đánh giá cao hơn N3 thì giữ.
  const level: JlptLevel = useMemo(() => {
    const answered = Object.keys(heard).length > 0;
    let lv: JlptLevel = selfLevel ?? "N5";
    if (answered) {
      let best = -1;
      PLACEMENT.forEach((p, i) => {
        if (heard[i]) best = Math.max(best, ORDER.indexOf(p.level));
      });
      const tested: JlptLevel = best < 0 ? "N5" : ORDER[best];
      // Hiểu cả câu N3 và tự nhận N2/N1 → tin người dùng
      lv = heard[2] && selfLevel && ORDER.indexOf(selfLevel) > 2 ? selfLevel : tested;
    }
    return lv;
  }, [heard, selfLevel]);

  const firstStory = useMemo(() => {
    const shelves = new Set(interests.flatMap((k) => INTEREST_SHELVES[k] ?? []));
    const free = STORY_INDEX.filter((s) => s.free && (!s.series || s.series.index === 1));
    const atLevel = free.filter((s) => s.level === level);
    const score = (s: (typeof STORY_INDEX)[number]) => (shelves.has(shelfOf(s)) ? 2 : 0) + (s.audioTrack ? 1 : 0);
    const pool = atLevel.length ? atLevel : free;
    return [...pool].sort((a, b) => score(b) - score(a))[0] ?? null;
  }, [interests, level]);

  const save = () =>
    updateProfile({ name: name.trim(), onboarded: true, level, interests, dailyMinutes: goal, listenWhen: when });

  const finish = () => {
    save();
    router.replace(firstStory ? `/read/${firstStory.id}` : "/");
  };

  const play = (src: string) => {
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = src;
    void audioRef.current.play().catch(() => {});
  };

  const toggle = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const option = (on: boolean): React.CSSProperties => ({
    padding: "14px 16px", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left", minHeight: 48,
    border: on ? "2px solid var(--navy)" : "1px solid var(--border)", background: on ? "#EAF0F8" : "#fff",
    fontSize: 15, fontWeight: 600, color: "var(--text)", width: "100%",
  });
  const h1: React.CSSProperties = { fontSize: 22, fontWeight: 800, color: "var(--navy)", lineHeight: 1.35 };

  const nav = (canNext: boolean, onNext: () => void, skippable = false) => (
    <div style={{ marginTop: 24 }}>
      <button type="button" className="btn-primary" disabled={!canNext} style={{ opacity: canNext ? 1 : 0.5 }} onClick={onNext}>
        {o.next}
      </button>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <button type="button" className="link-btn" onClick={() => setStep((s) => Math.max(0, s - 1))}>
          {o.back}
        </button>
        {skippable && (
          <button type="button" className="link-btn" style={{ color: "var(--muted)" }} onClick={() => setStep((s) => s + 1)}>
            {o.skip}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="page" style={{ paddingBottom: 32 }}>
      {step < 6 && (
        <div style={{ height: 6, borderRadius: 99, background: "var(--border)", marginBottom: 24 }} aria-hidden>
          <div style={{ width: `${((step + 1) / STEPS) * 100}%`, height: 6, borderRadius: 99, background: "var(--navy)", transition: "width .3s" }} />
        </div>
      )}

      {step === 0 && (
        <>
          <h1 style={h1}>{o.welcome}</h1>
          <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
            {[o.feat1, o.feat2, o.feat3].map((f) => (
              <li key={f} style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.5 }}>
                <span aria-hidden style={{ color: "var(--accent)", fontWeight: 800 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 14, fontWeight: 700, marginTop: 22 }}>{o.chooseLanguage}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
            {LANGUAGE_CODES.map((code) => (
              <button key={code} type="button" onClick={() => updateProfile({ lang: code })} style={{ ...option(lang === code), padding: "12px", textAlign: "center" }}>
                {LANGUAGE_NAMES[code]}
              </button>
            ))}
          </div>
          <button type="button" className="btn-primary" style={{ marginTop: 24 }} onClick={() => setStep(1)}>
            {o.next}
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <h1 style={h1}>{o.askInterests}</h1>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>{o.pickMany}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
            {INTERESTS.map((k) => (
              <button key={k} type="button" aria-pressed={interests.includes(k)} onClick={() => setInterests((l) => toggle(l, k))} style={option(interests.includes(k))}>
                {o[`int_${k}`]}
              </button>
            ))}
          </div>
          {nav(interests.length > 0, () => setStep(2), true)}
        </>
      )}

      {step === 2 && (
        <>
          <h1 style={h1}>{o.askLevel}</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            {SELF_LEVELS.map((lv) => (
              <button key={lv} type="button" aria-pressed={selfLevel === lv} onClick={() => setSelfLevel(lv)} style={{ ...option(selfLevel === lv), display: "flex", gap: 10, alignItems: "center" }}>
                <span className="lvl">{lv}</span>
                {o[`lvl_${lv.toLowerCase() as "n5"}`]}
              </button>
            ))}
          </div>
          {nav(!!selfLevel, () => setStep(3))}
        </>
      )}

      {step === 3 && (
        <>
          <h1 style={h1}>{o.testTitle}</h1>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>{o.testHint}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            {PLACEMENT.map((p, i) => (
              <div key={p.audio} className="card" style={{ padding: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    type="button"
                    aria-label={`${ui.reader.play} ${i + 1}`}
                    onClick={() => play(p.audio)}
                    style={{ width: 44, height: 44, borderRadius: "50%", border: 0, background: "var(--navy)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path d="M8 5.5v13l11-6.5z" fill="#fff" /></svg>
                  </button>
                  <span className="lvl">{p.level}</span>
                  <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                    <button type="button" aria-pressed={heard[i] === true} onClick={() => setHeard((h) => ({ ...h, [i]: true }))} className={`chip${heard[i] === true ? " on" : ""}`}>
                      {o.testGot}
                    </button>
                    <button type="button" aria-pressed={heard[i] === false} onClick={() => setHeard((h) => ({ ...h, [i]: false }))} className={`chip${heard[i] === false ? " on" : ""}`}>
                      {o.testNot}
                    </button>
                  </span>
                </div>
                {heard[i] !== undefined && (
                  <div style={{ marginTop: 10 }}>
                    <div lang="ja" className="jp" style={{ fontSize: 15, fontWeight: 600 }}>{p.ja}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{pickText(p.translations, lang)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {Object.keys(heard).length === PLACEMENT.length && (
            <p style={{ marginTop: 14, fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{o.testResult.replace("{level}", level)}</p>
          )}
          {nav(true, () => setStep(4), true)}
        </>
      )}

      {step === 4 && (
        <>
          <h1 style={h1}>{o.askGoal}</h1>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8, marginTop: 16 }}>
            {GOALS.map((g) => (
              <button key={g} type="button" aria-pressed={goal === g} onClick={() => setGoal(g)} style={{ ...option(goal === g), textAlign: "center", padding: "14px 6px" }}>
                {o.goalMin.replace("{n}", String(g))}
              </button>
            ))}
          </div>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginTop: 24 }}>{o.askWhen}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
            {WHEN.map((w) => (
              <button key={w} type="button" aria-pressed={when.includes(w)} onClick={() => setWhen((l) => toggle(l, w))} style={option(when.includes(w))}>
                {o[`when_${w}`]}
              </button>
            ))}
          </div>
          {nav(true, () => setStep(5))}
        </>
      )}

      {step === 5 && (
        <>
          <h1 style={h1}>{o.askName}</h1>
          <input
            className="input"
            style={{ marginTop: 18, fontSize: 17, padding: "14px 16px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={o.namePlaceholder}
            autoComplete="given-name"
          />
          {nav(true, () => setStep(6), true)}
        </>
      )}

      {step === 6 && (
        <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <div className="spinner" aria-hidden style={{ width: 44, height: 44, borderRadius: "50%", border: "4px solid var(--border)", borderTopColor: "var(--accent)" }} />
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)" }} role="status">{o.building}</p>
        </div>
      )}

      {step === 7 && (
        <>
          <h1 style={h1}>
            {o.planTitle}
            {name.trim() ? `, ${name.trim()}` : ""}
          </h1>
          <div className="card" style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8, fontSize: 15, fontWeight: 600 }}>
            <span>✓ {o.planLevel.replace("{level}", level)}</span>
            <span>✓ {o.planGoal.replace("{n}", String(goal))}</span>
            {interests.length > 0 && <span>✓ {interests.map((k) => o[`int_${k as "anime"}`]).join(" · ")}</span>}
          </div>
          {firstStory && (
            <>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginTop: 22 }}>{o.planFirst}</h2>
              <div className="card" style={{ marginTop: 10, display: "flex", gap: 14, alignItems: "center" }}>
                <StoryCover story={firstStory} title={pickText(firstStory.titles, lang)} width={72} />
                <span style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35 }}>{pickText(firstStory.titles, lang)}</span>
              </div>
            </>
          )}
          <button type="button" className="btn-primary" style={{ marginTop: 22 }} onClick={finish}>
            {o.startFirst}
          </button>
          <button type="button" className="btn-ghost" style={{ marginTop: 10 }} onClick={() => setPaywall(true)}>
            {o.seeOffer}
          </button>
        </>
      )}

      {paywall && <Paywall onClose={() => setPaywall(false)} />}
    </div>
  );
}

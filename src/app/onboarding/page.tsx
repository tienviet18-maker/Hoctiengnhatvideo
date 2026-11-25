"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "../../components/LangProvider";
import Paywall from "../../components/Paywall";
import { LANGUAGE_CODES, LANGUAGE_NAMES } from "../../lib/i18n";
import type { LanguageCode } from "../../lib/content-schema";

export default function OnboardingPage() {
  const { ui, profile, ready, updateProfile } = useLang();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<LanguageCode>("vi");
  const [name, setName] = useState("");
  const [pains, setPains] = useState<string[]>([]);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    if (ready && profile.onboarded) router.replace("/");
  }, [ready, profile.onboarded, router]);

  const finish = () => {
    updateProfile({ lang, name: name.trim(), onboarded: true });
    router.replace("/");
  };

  const painOptions = [ui.onboarding.painShy, ui.onboarding.painWords, ui.onboarding.painPronunciation];

  return (
    <div className="page" style={{ paddingBottom: 32 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 26 }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ flex: 1, height: 5, borderRadius: 99, background: i <= step ? "var(--navy)" : "var(--border)" }} />
        ))}
      </div>

      {step === 0 && (
        <>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--navy)", lineHeight: 1.35 }}>
            {ui.onboarding.welcome}
          </h1>
          <p style={{ fontSize: 15, color: "var(--muted)", marginTop: 10 }}>{ui.onboarding.chooseLanguage}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
            {LANGUAGE_CODES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                style={{
                  padding: "14px 12px", borderRadius: 12, cursor: "pointer", fontFamily: "inherit",
                  border: lang === code ? "2px solid var(--navy)" : "1px solid var(--border)",
                  background: lang === code ? "#EAF0F8" : "#fff",
                  fontSize: 15, fontWeight: 600, color: "var(--text)",
                }}
              >
                {LANGUAGE_NAMES[code]}
              </button>
            ))}
          </div>
          <button type="button" className="btn-primary" style={{ marginTop: 24 }} onClick={() => setStep(1)}>
            {ui.common.next}
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--navy)", lineHeight: 1.35 }}>
            {ui.onboarding.askName}
          </h1>
          <input
            className="input"
            style={{ marginTop: 18, fontSize: 17, padding: "14px 16px" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={ui.onboarding.namePlaceholder}
          />
          <button type="button" className="btn-primary" style={{ marginTop: 24 }} onClick={() => setStep(2)}>
            {ui.common.next}
          </button>
          <button type="button" className="btn-ghost" style={{ marginTop: 10 }} onClick={() => setStep(0)}>
            {ui.common.back}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--navy)", lineHeight: 1.35 }}>
            {ui.onboarding.askPain}
          </h1>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
            {painOptions.map((p) => {
              const on = pains.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPains(on ? pains.filter((x) => x !== p) : [...pains, p])}
                  style={{
                    padding: "15px 16px", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                    border: on ? "2px solid var(--navy)" : "1px solid var(--border)",
                    background: on ? "#EAF0F8" : "#fff", fontSize: 15, fontWeight: 600, color: "var(--text)",
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button type="button" className="btn-primary" style={{ marginTop: 24 }} onClick={() => setShowPaywall(true)}>
            {ui.onboarding.start}
          </button>
          <button type="button" className="btn-ghost" style={{ marginTop: 10 }} onClick={() => setStep(1)}>
            {ui.common.back}
          </button>
        </>
      )}

      {showPaywall && <Paywall onClose={finish} />}
    </div>
  );
}

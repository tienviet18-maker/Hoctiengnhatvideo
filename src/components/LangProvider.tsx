"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { LanguageCode } from "../lib/content-schema";
import { UI, type UiStrings } from "../lib/i18n";
import {
  loadProfile,
  saveProfile,
  STORE_EVENT,
  type Profile,
} from "../lib/store";

interface LangState {
  ready: boolean;
  profile: Profile;
  /** Ngôn ngữ hiệu lực để hiển thị (chưa onboard thì mặc định vi) */
  lang: LanguageCode;
  ui: UiStrings;
  updateProfile: (patch: Partial<Profile>) => void;
}

const Ctx = createContext<LangState | null>(null);

const DEFAULT_PROFILE: Profile = {
  lang: null,
  name: "",
  onboarded: false,
  vip: false,
};

let profileCache: Profile | null = null;

function readProfileSnapshot(): Profile {
  if (!profileCache) profileCache = loadProfile();
  return profileCache;
}

function subscribeProfile(cb: () => void) {
  const handler = () => {
    profileCache = null;
    cb();
  };
  window.addEventListener(STORE_EVENT, handler);
  return () => window.removeEventListener(STORE_EVENT, handler);
}

function subscribeNoop() {
  return () => {};
}

export function LangProvider({ children }: { children: ReactNode }) {
  const profile = useSyncExternalStore(
    subscribeProfile,
    readProfileSnapshot,
    () => DEFAULT_PROFILE,
  );
  const ready = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const lang: LanguageCode = profile.lang ?? "vi";

  useEffect(() => {
    document.documentElement.dataset.lang = lang;
    document.documentElement.lang = lang;
  }, [lang]);

  const updateProfile = useCallback((patch: Partial<Profile>) => {
    const next = { ...readProfileSnapshot(), ...patch };
    profileCache = next;
    saveProfile(next);
  }, []);

  const value = useMemo<LangState>(
    () => ({ ready, profile, lang, ui: UI[lang], updateProfile }),
    [ready, profile, lang, updateProfile],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang phải dùng trong LangProvider");
  return ctx;
}

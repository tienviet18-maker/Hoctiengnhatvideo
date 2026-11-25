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
  PROFILE_KEY,
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
let profileRaw: string | null = null;

/**
 * Snapshot hồ sơ có giữ nguyên tham chiếu khi chuỗi localStorage không đổi.
 * Trước đây mỗi lần notifyStore() (vd. lưu tiến độ video 4 lần/giây) đều tạo
 * object hồ sơ mới -> toàn bộ cây dùng useLang() render lại liên tục.
 */
function readProfileSnapshot(): Profile {
  const raw = window.localStorage.getItem(PROFILE_KEY);
  if (!profileCache || raw !== profileRaw) {
    profileRaw = raw;
    profileCache = loadProfile();
  }
  return profileCache;
}

function subscribeProfile(cb: () => void) {
  window.addEventListener(STORE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(STORE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
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

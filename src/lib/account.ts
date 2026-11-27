"use client";
/**
 * Tài khoản MiraiGo (Firebase Auth), học theo ViBJT: đăng nhập là TUỲ CHỌN. Chưa đăng nhập thì
 * mọi thứ lưu trên máy như cũ; đăng nhập thì tiến độ đồng bộ (cloud-sync.ts) và VIP gắn với tài
 * khoản (web-vip.ts), nên đổi máy hay sang bản iPhone chỉ cần đăng nhập lại.
 * Firebase SDK chỉ nạp khi cần (import động) để trang danh sách nhẹ.
 */
import { useSyncExternalStore } from "react";
import { FIREBASE_ENABLED, FIREBASE_WEB_CONFIG } from "./firebase-config";
import type { Auth, User } from "firebase/auth";

export interface AccountUser {
  uid: string;
  email: string | null;
  name: string | null;
  provider: string | null;
}

export type AccountState =
  | { status: "off" } // chưa có cấu hình Firebase
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "signed-in"; user: AccountUser };

let state: AccountState = FIREBASE_ENABLED ? { status: "loading" } : { status: "off" };
const listeners = new Set<() => void>();
let authPromise: Promise<Auth> | null = null;
let started = false;

function set(next: AccountState) {
  state = next;
  for (const l of listeners) l();
}

function toUser(u: User): AccountUser {
  return {
    uid: u.uid,
    email: u.email,
    name: u.displayName,
    provider: u.providerData[0]?.providerId ?? null,
  };
}

/** Nạp Firebase Auth một lần. */
export function getAuthInstance(): Promise<Auth> {
  if (!authPromise) {
    authPromise = (async () => {
      const { initializeApp, getApps } = await import("firebase/app");
      const { initializeAuth, browserLocalPersistence, indexedDBLocalPersistence, browserPopupRedirectResolver } =
        await import("firebase/auth");
      const app =
        getApps()[0] ??
        initializeApp({
          ...FIREBASE_WEB_CONFIG,
          // Trang đăng nhập Google chạy trên chính tên miền app (Worker chuyển tiếp /__/auth)
          authDomain: window.location.host,
        });
      return initializeAuth(app, {
        persistence: [indexedDBLocalPersistence, browserLocalPersistence],
        popupRedirectResolver: browserPopupRedirectResolver,
      });
    })();
  }
  return authPromise;
}

/** Bắt đầu theo dõi trạng thái đăng nhập (gọi một lần ở AccountProvider). */
export function startAccount(onChange: (u: AccountUser | null) => void): void {
  if (!FIREBASE_ENABLED || started) return;
  started = true;
  void getAuthInstance().then(async (auth) => {
    const { onAuthStateChanged, getRedirectResult } = await import("firebase/auth");
    getRedirectResult(auth).catch(() => undefined);
    onAuthStateChanged(auth, (u) => {
      const user = u ? toUser(u) : null;
      set(user ? { status: "signed-in", user } : { status: "signed-out" });
      onChange(user);
    });
  });
}

/** Ảnh chụp phía máy chủ phải giữ nguyên tham chiếu, không thì React báo lỗi lặp vô hạn khi hydrate. */
const SERVER_STATE: AccountState = FIREBASE_ENABLED ? { status: "loading" } : { status: "off" };

export function useAccount(): AccountState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => SERVER_STATE,
  );
}

export function currentUser(): AccountUser | null {
  return state.status === "signed-in" ? state.user : null;
}

/** ID token hiện tại (Firebase tự làm mới khi sắp hết hạn), hoặc null khi chưa đăng nhập. */
export async function idToken(force = false): Promise<string | null> {
  if (!FIREBASE_ENABLED) return null;
  const auth = await getAuthInstance();
  return auth.currentUser ? auth.currentUser.getIdToken(force) : null;
}

/** Trình duyệt nhúng trong app (Facebook, Messenger, Zalo, Instagram, LINE...) chặn đăng nhập Google. */
export function isInAppBrowser(ua = typeof navigator === "undefined" ? "" : navigator.userAgent): boolean {
  return /FBAN|FBAV|FB_IAB|Messenger|Instagram|Zalo|Line\/|KAKAOTALK|; wv\)/i.test(ua);
}

export type AuthError = "cancelled" | "wrong" | "weak" | "in-use" | "invalid-email" | "recent" | "network" | "other";

function authError(e: unknown): AuthError {
  const code = String((e as { code?: string })?.code ?? "");
  if (code.includes("popup-closed") || code.includes("cancelled-popup")) return "cancelled";
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) return "wrong";
  if (code.includes("weak-password")) return "weak";
  if (code.includes("email-already-in-use")) return "in-use";
  if (code.includes("invalid-email")) return "invalid-email";
  if (code.includes("requires-recent-login")) return "recent";
  if (code.includes("network")) return "network";
  return "other";
}

async function run(fn: (auth: Auth) => Promise<unknown>): Promise<AuthError | null> {
  try {
    await fn(await getAuthInstance());
    return null;
  } catch (e) {
    return authError(e);
  }
}

export function signInGoogle(): Promise<AuthError | null> {
  return run(async (auth) => {
    const { GoogleAuthProvider, signInWithPopup, signInWithRedirect } = await import("firebase/auth");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      // Trình duyệt chặn cửa sổ bật lên: chuyển trang
      if (String((e as { code?: string })?.code).includes("popup-blocked")) await signInWithRedirect(auth, provider);
      else throw e;
    }
  });
}

export function signInEmail(email: string, password: string, create: boolean): Promise<AuthError | null> {
  return run(async (auth) => {
    const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import("firebase/auth");
    if (create) await createUserWithEmailAndPassword(auth, email.trim(), password);
    else await signInWithEmailAndPassword(auth, email.trim(), password);
  });
}

export function resetPassword(email: string): Promise<AuthError | null> {
  return run(async (auth) => {
    const { sendPasswordResetEmail } = await import("firebase/auth");
    await sendPasswordResetEmail(auth, email.trim());
  });
}

export function signOutAccount(): Promise<AuthError | null> {
  return run(async (auth) => {
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
  });
}

/**
 * Xoá tài khoản (Apple yêu cầu có nút này): xoá tiến độ trên máy chủ rồi xoá tài khoản.
 * Firebase đòi đăng nhập gần đây; quá lâu thì trả "recent" để người dùng đăng nhập lại.
 */
export function deleteAccount(deleteCloudData: () => Promise<void>): Promise<AuthError | null> {
  return run(async (auth) => {
    const user = auth.currentUser;
    if (!user) return;
    await deleteCloudData();
    const { deleteUser } = await import("firebase/auth");
    await deleteUser(user);
  });
}

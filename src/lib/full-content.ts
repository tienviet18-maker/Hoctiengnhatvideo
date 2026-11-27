"use client";
/**
 * Tải phần VIP của một gói từ Worker (/api/content/<kind>/<id>) khi trang tĩnh chỉ mang phần
 * miễn phí (src/lib/gate.ts). Chỉ gọi khi tài khoản có VIP; máy chủ kiểm lại VIP thật.
 */
import { useEffect, useState } from "react";
import { idToken, useAccount } from "./account";

type Kind = "videos" | "stories";
export type FullState<T> = { item: T; status: "ready" | "loading" | "error" | "locked" };

const memo = new Map<string, unknown>();

export function useFullContent<T extends { id: string; partial?: true } | null>(
  kind: Kind,
  initial: T,
  vip: boolean,
): FullState<T> & { retry: () => void } {
  const account = useAccount();
  const key = `${kind}/${initial?.id ?? ""}`;
  const [loaded, setLoaded] = useState<{ key: string; item: T } | null>(() =>
    memo.has(key) ? { key, item: memo.get(key) as T } : null,
  );
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "denied">("idle");
  const [attempt, setAttempt] = useState(0);
  const signedIn = account.status === "signed-in";
  const need = !!initial?.partial && vip && signedIn && loaded?.key !== key;

  useEffect(() => {
    if (!need) return;
    let alive = true;
    const run = async () => {
      setStatus("loading");
      try {
        const token = await idToken();
        if (!token) throw new Error("no token");
        const res = await fetch(`/api/content/${key}`, { headers: { authorization: `Bearer ${token}` } });
        if (res.status === 403) {
          if (alive) setStatus("denied");
          return;
        }
        if (!res.ok) throw new Error(String(res.status));
        const item = (await res.json()) as T;
        memo.set(key, item);
        if (alive) {
          setLoaded({ key, item });
          setStatus("idle");
        }
      } catch {
        if (alive) setStatus("error");
      }
    };
    void run();
    return () => {
      alive = false;
    };
  }, [need, key, attempt]);

  const retry = () => setAttempt((n) => n + 1);
  if (!initial?.partial) return { item: initial, status: "ready", retry };
  if (loaded?.key === key) return { item: loaded.item, status: "ready", retry };
  if (!vip || !signedIn || status === "denied") return { item: initial, status: "locked", retry };
  return { item: initial, status: status === "error" ? "error" : "loading", retry };
}

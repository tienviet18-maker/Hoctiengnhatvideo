"use client";
/**
 * Đồng bộ tiến độ lên tài khoản (Firestore `users/{uid}/progress/main`, giống ViBJT).
 * Một tài liệu: { v, data, updatedAt }; `data` là JSON các khóa SYNC_KEYS, nén gzip + base64 để
 * vừa giới hạn 1 MiB của Firestore khi bộ thẻ lớn (firestore.rules giới hạn 900.000 ký tự).
 * Đăng nhập: tải bản máy chủ, gộp với máy này (sync-merge.ts), ghi lại cả hai phía.
 * Sau đó mỗi lần dữ liệu đổi (STORE_EVENT) thì đẩy lên sau vài giây.
 */
import type { Firestore } from "firebase/firestore";
import { getAuthInstance } from "./account";
import { notifyStore, STORE_EVENT } from "./store";
import { mergeSync, SYNC_KEYS, type SyncData, type SyncKey } from "./sync-merge";

const VERSION = 1;
const PUSH_DELAY_MS = 4000;

let dbPromise: Promise<Firestore> | null = null;
function db(): Promise<Firestore> {
  if (!dbPromise) {
    dbPromise = (async () => {
      await getAuthInstance(); // khởi tạo app trước
      const { getApps } = await import("firebase/app");
      const { getFirestore } = await import("firebase/firestore");
      return getFirestore(getApps()[0]);
    })();
  }
  return dbPromise;
}

function readLocal(): SyncData {
  const out: SyncData = {};
  for (const [k, key] of Object.entries(SYNC_KEYS) as [SyncKey, string][]) {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) out[k] = JSON.parse(raw);
    } catch {
      /* khóa hỏng: bỏ qua */
    }
  }
  return out;
}

function writeLocal(data: SyncData): void {
  for (const [k, key] of Object.entries(SYNC_KEYS) as [SyncKey, string][]) {
    if (data[k] === undefined) continue;
    let value = data[k];
    if (k === "profile") {
      // Cờ VIP do web-vip.ts quản lý, không lấy từ bản đồng bộ
      const cur = JSON.parse(window.localStorage.getItem(key) ?? "{}");
      value = { ...(value as object), vip: !!cur.vip };
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

async function pack(data: SyncData): Promise<string> {
  const stream = new Blob([JSON.stringify(data)]).stream().pipeThrough(new CompressionStream("gzip"));
  const bytes = new Uint8Array(await new Response(stream).arrayBuffer());
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

async function unpack(b64: string): Promise<SyncData> {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
  return JSON.parse(await new Response(stream).text());
}

async function docRef(uid: string) {
  const { doc } = await import("firebase/firestore");
  return doc(await db(), "users", uid, "progress", "main");
}

let activeUid: string | null = null;
let pushTimer: number | null = null;
let applying = false;
let lastPushed = "";

async function push(uid: string): Promise<void> {
  if (activeUid !== uid) return;
  const data = await pack(readLocal());
  if (data === lastPushed) return;
  if (data.length > 900_000) {
    console.warn("[sync] dữ liệu quá lớn, chưa đồng bộ");
    return;
  }
  const { setDoc, serverTimestamp } = await import("firebase/firestore");
  await setDoc(await docRef(uid), { v: VERSION, data, updatedAt: serverTimestamp() });
  lastPushed = data;
}

function onLocalChange() {
  if (!activeUid || applying) return;
  const uid = activeUid;
  if (pushTimer) window.clearTimeout(pushTimer);
  pushTimer = window.setTimeout(() => {
    pushTimer = null;
    push(uid).catch((e) => console.warn("[sync] push failed", e));
  }, PUSH_DELAY_MS);
}

/** Gọi khi trạng thái đăng nhập đổi. */
export async function syncAccount(uid: string | null): Promise<void> {
  if (uid === activeUid) return;
  activeUid = uid;
  lastPushed = "";
  window.removeEventListener(STORE_EVENT, onLocalChange);
  if (!uid) return;
  try {
    const { getDoc } = await import("firebase/firestore");
    const snap = await getDoc(await docRef(uid));
    const cloud = snap.exists() && typeof snap.data().data === "string" ? await unpack(snap.data().data) : {};
    if (activeUid !== uid) return;
    const merged = mergeSync(readLocal(), cloud);
    applying = true;
    writeLocal(merged);
    notifyStore();
    applying = false;
    await push(uid);
  } catch (e) {
    applying = false;
    console.warn("[sync] first sync failed", e);
  }
  if (activeUid === uid) window.addEventListener(STORE_EVENT, onLocalChange);
}

/** Xoá bản trên máy chủ (nút Xoá tài khoản). */
export async function deleteCloudProgress(uid: string): Promise<void> {
  const { deleteDoc } = await import("firebase/firestore");
  await deleteDoc(await docRef(uid));
}

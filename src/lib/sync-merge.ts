/**
 * Gộp dữ liệu học giữa máy này và bản trên máy chủ (cloud-sync.ts), học theo sync_merge của ViBJT.
 * Hàm thuần, không đụng localStorage, test bằng `npm test`.
 * Không bao giờ làm mất tiến độ: mỗi mục lấy phần "đi xa hơn" của hai bên.
 */

/** Các khóa localStorage được đồng bộ. Hàng chờ phát, lượt giải thích, cờ VIP: không đồng bộ. */
export const SYNC_KEYS = {
  profile: "vimai-video:profile:v1",
  deck: "vimai-video:deck:v1",
  activity: "vimai-video:activity:v1",
  progress: "vimai-video:progress:v1",
  custom: "vimai-video:custom:v1",
} as const;

export type SyncKey = keyof typeof SYNC_KEYS;
export type SyncData = Partial<Record<SyncKey, unknown>>;

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => !!v && typeof v === "object" && !Array.isArray(v);
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);

/** Hồ sơ: bên máy chủ thắng từng trường, trừ trường máy chủ bỏ trống; không đồng bộ cờ VIP. */
function mergeProfile(local: unknown, cloud: unknown): Obj {
  const l = isObj(local) ? local : {};
  const c = isObj(cloud) ? cloud : {};
  const out: Obj = { ...l };
  for (const [k, v] of Object.entries(c)) {
    if (k === "vip") continue;
    if (v !== null && v !== undefined && v !== "") out[k] = v;
  }
  // Đã onboard ở một máy là đã onboard
  if (l.onboarded || c.onboarded) out.onboarded = true;
  delete out.vip;
  return out;
}

/** Thẻ ôn: hợp theo id; trùng id thì giữ thẻ đã ôn nhiều hơn (bằng nhau: hạn ôn muộn hơn). */
function mergeDeck(local: unknown, cloud: unknown): Obj[] {
  const map = new Map<string, Obj>();
  for (const list of [cloud, local]) {
    if (!Array.isArray(list)) continue;
    for (const card of list) {
      if (!isObj(card) || typeof card.id !== "string") continue;
      const prev = map.get(card.id);
      if (!prev) {
        map.set(card.id, card);
        continue;
      }
      const better =
        num(card.reps) > num(prev.reps) || (num(card.reps) === num(prev.reps) && num(card.due) > num(prev.due));
      if (better) map.set(card.id, card);
    }
  }
  return [...map.values()];
}

/** Hoạt động theo ngày: lấy số lớn hơn của từng chỉ số (cùng một ngày học trên 2 máy không cộng trùng). */
function mergeActivity(local: unknown, cloud: unknown): Obj {
  const out: Obj = {};
  for (const src of [cloud, local]) {
    if (!isObj(src)) continue;
    for (const [day, v] of Object.entries(src)) {
      if (!isObj(v)) continue;
      const prev = isObj(out[day]) ? (out[day] as Obj) : {};
      out[day] = {
        videos: Math.max(num(prev.videos), num(v.videos)),
        stories: Math.max(num(prev.stories), num(v.stories)),
        minutes: Math.max(num(prev.minutes), num(v.minutes)),
      };
    }
  }
  return out;
}

/** Tiến độ từng bài: giữ bản cập nhật sau cùng. */
function mergeProgress(local: unknown, cloud: unknown): Obj {
  const out: Obj = {};
  for (const src of [cloud, local]) {
    if (!isObj(src)) continue;
    for (const [id, v] of Object.entries(src)) {
      if (!isObj(v)) continue;
      const prev = out[id];
      if (!isObj(prev) || num(v.updatedAt) >= num(prev.updatedAt)) out[id] = v;
    }
  }
  return out;
}

/** Video tự thêm: hợp theo youtubeId. */
function mergeCustom(local: unknown, cloud: unknown): Obj[] {
  const map = new Map<string, Obj>();
  for (const list of [cloud, local]) {
    if (!Array.isArray(list)) continue;
    for (const v of list) if (isObj(v) && typeof v.youtubeId === "string" && !map.has(v.youtubeId)) map.set(v.youtubeId, v);
  }
  return [...map.values()].sort((a, b) => num(a.addedAt) - num(b.addedAt));
}

export function mergeSync(local: SyncData, cloud: SyncData): SyncData {
  return {
    profile: mergeProfile(local.profile, cloud.profile),
    deck: mergeDeck(local.deck, cloud.deck),
    activity: mergeActivity(local.activity, cloud.activity),
    progress: mergeProgress(local.progress, cloud.progress),
    custom: mergeCustom(local.custom, cloud.custom),
  };
}

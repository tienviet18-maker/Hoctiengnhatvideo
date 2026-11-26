import type { MetadataRoute } from "next";
import { PRELAUNCH } from "../lib/firebase-config";

export const dynamic = "force-static";

/** Chưa ra mắt thì chặn mọi máy tìm kiếm; mở bán thì cho lập chỉ mục. */
export default function robots(): MetadataRoute.Robots {
  return PRELAUNCH
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/_locked/"] } };
}

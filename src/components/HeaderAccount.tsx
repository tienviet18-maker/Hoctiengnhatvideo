"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "./LangProvider";
import AccountSheet from "./AccountSheet";
import { useAccount } from "../lib/account";

/**
 * Nút tài khoản ở đầu trang chủ (học ViBJT: đăng nhập luôn thấy ngay, không phải vào sâu mới thấy).
 * Chưa đăng nhập: nút "Đăng nhập". Đã đăng nhập: chữ cái đầu tên, bấm vào mở tab Tôi.
 */
export default function HeaderAccount() {
  const { ui } = useLang();
  const account = useAccount();
  const [sheet, setSheet] = useState(false);
  if (account.status === "off" || account.status === "loading") return null;
  if (account.status === "signed-in") {
    const u = account.user;
    const initial = (u.name || u.email || "M").slice(0, 1).toUpperCase();
    return (
      <Link
        href="/profile"
        aria-label={ui.tabs.profile}
        style={{
          width: 34, height: 34, borderRadius: "50%", background: "var(--navy)", color: "#fff", display: "flex",
          alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, textDecoration: "none", flexShrink: 0,
        }}
      >
        {initial}
      </Link>
    );
  }
  return (
    <>
      <button
        type="button"
        onClick={() => setSheet(true)}
        style={{
          height: 34, padding: "0 14px", borderRadius: 999, border: "1px solid var(--navy)", background: "#fff",
          color: "var(--navy)", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", flexShrink: 0,
        }}
      >
        {ui.account.signIn}
      </button>
      {sheet && <AccountSheet onClose={() => setSheet(false)} />}
    </>
  );
}

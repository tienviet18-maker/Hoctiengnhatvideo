"use client";

import { useEffect } from "react";
import { startAccount } from "../lib/account";
import { syncAccount } from "../lib/cloud-sync";
import { onAccountVip } from "../lib/web-vip";

/** Theo dõi đăng nhập một lần cho cả app: đồng bộ tiến độ và VIP theo tài khoản. */
export default function AccountRoot() {
  useEffect(() => {
    startAccount((user) => {
      void syncAccount(user?.uid ?? null);
      onAccountVip(user?.uid ?? null);
    });
  }, []);
  return null;
}

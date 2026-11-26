# Deploy miraigo.vimai.jp

Một Worker Cloudflare (`wrangler.toml`) vừa phục vụ bản web tĩnh (`out/`, Workers Static Assets) vừa chặn nội dung VIP (`worker/index.ts`).

```bash
npm ci
npm run verify          # QC + test + typecheck + lint + build (build tạo out/ và out/_locked/)
npx wrangler deploy     # cần wrangler đã đăng nhập tài khoản Cloudflare của ViMai
```

- Tên miền: `routes = [{ pattern = "miraigo.vimai.jp", custom_domain = true }]`. `vimai.jp` dùng DNS của Cloudflare nên bản ghi tự tạo. Bản xem trước: `miraigo.tienviet18.workers.dev`.
- D1: Worker chỉ đọc bảng `web_vip_grants` của `vimai-cms` (VIP web bán trên vimai.jp). Cần migration `0033_web_vip_plans.sql` của vimai-ecosystem đã chạy (cột `expires_at`).
- Giới hạn Workers Static Assets: 20.000 file mỗi bản (gói miễn phí), 25 MiB mỗi file. Hiện ~14.700 file. Khi audio đẩy số file gần ngưỡng: chuyển `/audio/` sang R2 (docs/engineering-standard.md).
- Firebase: project `miraigo-vimai`. Thêm tên miền mới vào Authentication → Settings → Authorized domains, và vào giới hạn website của API key (Google Cloud → Credentials).
- Firestore rules: `firestore.rules` (dán vào console → Firestore → Rules, hoặc `firebase deploy --only firestore:rules`).

# CLAUDE.md — Bàn giao dự án cho Claude (iMac): vai trò KIỂM DUYỆT & TỐI ƯU

Đọc file này TRƯỚC TIÊN, sau đó đọc `README.md` và `docs/engineering-standard.md`.
Repo này là nguồn sự thật duy nhất của dự án. Mọi số liệu dưới đây là số đã kiểm chứng
tại commit `235d6f5` (25/11/2026).

## 1. Phân vai — ai làm gì (Việt đã chốt, không tự ý đổi)

- **Muse** (trợ lý cá nhân của Việt, chạy trên máy chủ riêng): NGƯỜI XÂY + SẢN XUẤT NỘI DUNG.
  Tiếp tục sản xuất gói học, giữ cổng kiểm chứng, push lên `main`.
- **Claude (bạn, trên iMac)**: KIỂM DUYỆT + TỐI ƯU. Đọc toàn bộ, rà soát, sửa lỗi,
  tối ưu hiệu năng/trải nghiệm/hạ tầng để app hoàn thiện. KHÔNG sản xuất gói nội dung mới
  (trừ phần phụ đề anime ở mục 5 nếu bạn gỡ được) — tránh trùng lặp với dây chuyền của Muse.
- **Việt**: duyệt gộp MỘT lần cuối (tên app, deploy, thanh toán). Đừng hỏi Việt từng bước nhỏ.

## 2. App này là gì

- **Định vị (Việt chốt lại 25/11/2026): app giải trí bằng tiếng Nhật.** Xem video, nghe và đọc
  truyện tiếng Nhật có giải thích, đúng cấp độ từng người, ai cũng dùng lúc rảnh. KHÔNG phải app luyện
  thi JLPT; N5–N1 chỉ là nhãn độ khó. Bỏ hẳn câu "học để sống ở Nhật".
- Slogan: **"Xem phim vui, nghe truyện hay. Tiếng Nhật trong tay, giỏi lên mỗi ngày."** (11 ngôn ngữ
  ở `onboarding.welcome` trong `src/i18n/locales/`).
- Khác biệt đã có: chế độ **nghe khi lái xe** (`/drive`), **lộ trình theo mục tiêu sống**
  (`/paths`: Mới sang Nhật / Đi làm / Gia đình / Giải trí & văn hoá), từ vựng gắn cấp độ
  của chính từ đó và chảy vào hệ ôn tập SRS.
- Giá VIP (Việt chốt 25/11/2026): ¥900/1 tháng, ¥4.400/6 tháng, ¥7.800/1 năm. Giao diện 11 ngôn ngữ (`src/i18n/locales/`).
- **Tên app ĐÃ CHỐT (Việt chốt 25/11/2026): MiraiGo** — Mirai （未来， tương lai) + Go （語，
  ngôn ngữ). Đã kiểm chứng không trùng app nào trên App Store/Google Play. Tên hiển thị
  store theo từng ngôn ngữ, luôn mở đầu bằng MiraiGo, tối đa 30 ký tự (phần mô tả dài
  đưa vào dòng phụ đề): VI "MiraiGo: Học tiếng Nhật", EN "MiraiGo: Learn Japanese",
  JP "MiraiGo：動画で学ぶ日本語". Logo do Việt tự thiết kế.
  Tên đã LOẠI kèm lý do: Maemuki (trùng EdTech Singapore); Mirai và Miraii (loại 25/11/2026 —
  trùng/phát âm trùng "Mirai Japanese" của Mirai Language Systems, app học tiếng Nhật
  subscription có mặt trên cả App Store lẫn Google Play từ 2016).
- Domain web ĐÃ CHỐT: **miraigo.vimai.jp** (Việt chốt 25/11/2026; chưa nối — thuộc đợt deploy).

## 3. Trạng thái hiện tại (đã kiểm chứng)

- **552 gói nội dung, 4.770 câu/dòng**: 98 video + 454 truyện.
  - Truyện: Mai-chan 66 tập (series gốc, bible ở `content/mai-chan-series-bible.md`),
    cổ tích/truyện dân gian, văn học cổ điển public domain, đời sống Nhật thực tế.
  - Cấp độ truyện cao đã cân: N3 = 12, N2 = 12, N1 = 12 truyện. **N5 đã ĐÓNG BĂNG**
    (217 gói toàn kho) theo lệnh của Việt — sản xuất mới chỉ đi lên N4→N3→N2→N1.
  - Video: 54 Akane + 22 Teppei + 22 Yuta (đều là bài giảng/podcast/hội thoại).
    **Anime = 0** — lý do ở mục 5.
- Tính năng đã xong: xem video (phụ đề furigana bấm từng từ tra nghĩa, chép chính tả
  tự chấm, shadowing ghi âm, tốc độ 0.5–1.5×, lặp câu, nghe từng câu, ẩn/hiện bản dịch
  và romaji, nút câu trước/sau, **hàng chờ tự chuyển bài**), kệ kênh tròn theo series,
  đọc truyện (dịch/giải thích/nghe từng câu), chế độ lái xe (Media Session, tự chuyển
  truyện), lộ trình học có tiến độ, thư viện SRS + streak, onboarding, paywall
  (**chưa nối thanh toán thật**), dữ liệu người dùng hiện **chỉ ở localStorage**
  (chưa Firebase — thuộc đợt cuối, chờ Việt).
- Cổng bắt buộc: `npm run verify` (QC nội dung + typecheck + lint + build) — **xanh tại
  commit hiện tại**. Không được commit lên `main` khi cổng đỏ.

## 4. Việc của Claude — tối ưu để hoàn thiện (gợi ý thứ tự)

1. Rà soát toàn bộ code + trải nghiệm: luồng học, WatchClient/ReaderClient/DriveClient,
   lỗi tiềm ẩn, trường hợp biên. Sửa trực tiếp, commit nhỏ, message rõ.
2. Hiệu năng: ngân sách bundle trong `docs/engineering-standard.md` (trang danh sách
   không quá 300KB chunk) — kiểm lại sau các tính năng mới (kệ series, hàng chờ, paths).
3. Chuẩn bị deploy Cloudflare Pages: `next.config.ts` hiện CHƯA có cấu hình output cho
   Pages — cần adapter (OpenNext) hoặc phương án tương đương. Làm sẵn tới mức chỉ còn
   chờ Việt nối tài khoản Cloudflare + gắn domain. Lưu ý giới hạn Pages: 20.000 file/deploy
   (kho audio đang ~5.000 file; khi audio chạm ~10.000 file thì chuyển sang R2 — đã ghi
   trong engineering-standard).
4. QA: metadata/SEO từng trang, i18n đủ 11 ngôn ngữ cho mọi chuỗi mới, kiểm tra paywall
   hiển thị đúng giá VIP của app này (¥900/¥4.400/¥7.800 — trong app có thể còn sót giá của
   hệ ViMai 450k/700k, hãy rà và báo cáo, đừng tự đổi khi chưa có tên app chính thức).
5. Ghi mọi phát hiện + việc đã sửa vào `docs/review-log.md` (tạo mới) để Muse và Việt theo dõi.

## 5. Vướng mắc YouTube 429 — cần bạn gỡ nếu làm được

- Dây chuyền sản xuất video của Muse phải TẢI file phụ đề tiếng Nhật của từng video
  YouTube (bằng yt-dlp) để dựng lớp học (furigana, từ vựng, mốc thời gian từng câu).
  Khung nhúng KHÔNG cung cấp dữ liệu phụ đề — đây là giới hạn cứng của YouTube API.
- Từ sáng 25/11, YouTube trả **HTTP 429** cho mọi lần tải phụ đề từ máy của Muse
  (đã thử lại nhiều lần trong ngày, lần cuối 18:33 — vẫn 429). Muse đã dừng thử theo
  kỷ luật giới hạn dịch vụ và hẹn thử lại đúng 1 lần sáng 26/11 (~9:20 JST).
- **Cơ hội cho bạn**: máy iMac dùng IP mạng nhà — khác hẳn IP máy chủ của Muse, khả năng
  cao KHÔNG bị chặn. Nếu bạn tải được phụ đề, tuyến anime mở khoá ngay. Nguồn và thứ tự
  đã chuẩn bị sẵn trong `content/anime-queue.md` (Maruko tập #129 `pbwKSQaJ7Hc` trước;
  sau đó kiểm chứng TED-Ed tiếng Nhật, Peppa Pig Nhật...). Lệnh mẫu:
  `yt-dlp --write-auto-subs --sub-langs ja --sub-format json3 --skip-download --extractor-args "youtube:player_client=ios" <url>`
- Nếu bạn sản xuất gói từ phụ đề tải được: theo đúng schema + quy trình trong
  `skills/vimai-video-sub/SKILL.md`, đơn vị bài là **clip ngắn 1–3 phút**, đăng ký ID vào
  `src/lib/content.ts`, chạy `npm run verify` xanh rồi mới commit. Báo rõ trong
  `docs/review-log.md` bạn đã làm những gói nào để Muse không sản xuất trùng.

## 6. Quy tắc chống xung đột Muse ↔ Claude (quan trọng nhất)

1. **Pull trước khi làm, push ngay khi xong.** Không force-push. Gặp conflict: dừng, báo Việt.
2. **Phân vùng sở hữu**: `content/` + đăng ký trong `src/lib/content.ts` + `scripts/` =
   vùng của Muse (sản xuất nội dung). Code app, cấu hình, hạ tầng = vùng chung nhưng
   Claude là người tối ưu chính. Cần sửa vùng của bên kia: làm tối thiểu, ghi rõ lý do
   trong commit message.
3. **ID gói nội dung chỉ do MỘT bên cấp tại một thời điểm.** Bên nào sản xuất thì đăng ký
   ID vào `src/lib/content.ts` và commit TRƯỚC khi bên kia bắt đầu đợt mới. Đã có tiền lệ
   ghi đè file nội dung do trùng ID — quy trình chống trùng nằm trong
   `docs/engineering-standard.md` mục 3, đọc kỹ.
4. **Mọi commit lên `main` phải qua `npm run verify` xanh.** Không ngoại lệ.
5. Không tự ý triển khai: tên app, Firebase, thanh toán VIP thật (SePay), deploy
   Cloudflare — tất cả thuộc đợt duyệt cuối của Việt.
6. Hàng rào pháp lý nội dung (không phá): tuyến truyện chỉ dùng tác phẩm public domain
   hoặc sáng tác gốc (KHÔNG dùng nhân vật/cốt truyện anime/manga còn bản quyền, KHÔNG
   nhập sách của NPO 多言語多読 — giấy phép CC BY-NC-ND cấm thương mại và dịch);
   tuyến video chỉ NHÚNG YouTube + lớp học của mình, không lưu trữ bản sao video.

## 7. Cách báo cáo

- Bạn báo cáo cho Việt ngay trong project Claude này.
- Mọi việc đã làm ghi vào `docs/review-log.md` kèm commit hash — đó là kênh để Muse
  biết bạn đã đổi gì trước khi sản xuất tiếp.

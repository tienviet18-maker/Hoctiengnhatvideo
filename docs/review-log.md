# Nhật ký kiểm duyệt & tối ưu (Claude)

Kênh để Muse và Việt biết Claude đã đổi gì trước khi sản xuất tiếp (CLAUDE.md mục 7).
Mỗi mục ghi: phát hiện → việc đã làm (commit) hoặc việc còn mở.

Quy ước: Claude làm trên nhánh `claude/review-optimize` rồi mở PR vào `main`. Không có
commit nào đụng `content/`, `scripts/` hay danh sách đăng ký trong `src/lib/content.ts`
(vùng của Muse).

---

## Đợt 1 — 25/11/2026 (gốc: `fb9c141`)

Mỗi commit đều đã qua `npm run verify` xanh: QC 552 gói / 4.770 câu, 0 lỗi; typecheck;
lint 0 cảnh báo; build 1.024 trang.

### A. Đã sửa

| # | Mức | Phát hiện | Việc đã làm | Commit |
|---|---|---|---|---|
| 1 | **Cao** | `npm run verify` **đỏ trên bản clone mới**: `tsc` báo `Cannot find name 'LayoutProps'`. Kiểu này do Next sinh vào `.next/types`. Cổng chỉ xanh trên máy đã có thư mục `.next` cũ, nên câu "xanh tại commit hiện tại" chỉ đúng trên máy của Muse. | `typecheck` giờ là `next typegen && tsc --noEmit`. | `9c44734` |
| 2 | **Cao** | Trình xem video: **"Lặp câu", "Từng câu" và tự dừng khi shadowing gần như không bao giờ chạy.** Câu hiện tại được tìm theo `start <= t < end`, nên khi `t` vượt `end` thì chỉ số đã sang câu sau, và điều kiện `t >= end` không bao giờ đúng. Thêm nữa, ở khoảng lặng giữa hai câu, `findIndex` trả -1 nên highlight rơi về **câu cuối video** và danh sách cuộn xuống đáy. | Câu hiện tại giờ là câu cuối cùng đã bắt đầu. Lặp/dừng xét theo câu đang giữ, với cửa sổ 1 giây để không bắt nhầm khi tua xa. Mỗi câu chỉ dừng một lần, bấm ▶ thì dừng lại được. Chép chính tả không còn liên tục chặn video khi tua quá câu. | `898f862` |
| 3 | Trung bình | **Hiệu năng:** trong lúc xem video, toàn bộ cây dùng `useLang()` render lại 4 lần mỗi giây. Nguyên nhân: `saveProgress` chạy mỗi 250ms và bắn `notifyStore`, còn `LangProvider` xoá cache hồ sơ ở mọi sự kiện nên tạo object mới. | Snapshot hồ sơ giữ nguyên tham chiếu khi chuỗi localStorage không đổi, và nghe thêm sự kiện `storage` (đồng bộ giữa các tab). `saveProgress` bỏ ghi trùng. Trình xem video chỉ lưu tiến độ khoảng 5 giây một lần. | `d364149`, `898f862` |
| 4 | **Cao** | **Lách paywall:** mở thẳng `/drive/<id>` của truyện VIP thì nghe và đọc được toàn bộ. Danh sách `/drive` có chặn, nhưng trang chi tiết thì không. | `DriveClient` chặn bằng Paywall. Không tự chuyển sang truyện VIP khi chưa có VIP (tránh gặp paywall giữa lúc đang lái). Dùng chung một phần tử `Audio` cho mọi bài, để iOS cho tự phát tiếp khi chuyển bài. | `3081003` |
| 5 | Trung bình | **Tra từ:** 340/3.666 từ vựng (9%) không bấm được, gồm từ katakana (イルカ, レジ), hiragana (ろうそく) và từ có お/ご (お釣り, ご祝儀). Lý do là chỉ mảnh furigana có cách đọc mới thành nút. | Gán từ vựng theo từng ký tự của cả câu: mảnh kana được tách theo ranh giới từ, có xử lý động từ/tính từ đã chia. Còn **1/3.666** không bấm được (`色々` trong câu viết `色んな`). Đã kiểm trên trình duyệt thật: bấm イルカ ra đúng nghĩa, không có lỗi console. | `5abc1a1` |
| 6 | Trung bình | Popup từ: sau khi lưu từ A, bấm sang từ B vẫn hiện "Đã lưu" và nút bị khoá. Từ đã có trong bộ thẻ vẫn hiện nút "Lưu". | Popup có `key` theo từ, và đọc bộ thẻ để biết từ đã lưu. | `55ab47e` |
| 7 | Thấp | Ôn tập SRS: bộ đếm `n / tổng` có thể vượt tổng (vd. 3/2), vì thẻ "Đã nhớ" ra khỏi danh sách đến hạn làm mẫu số giảm. | Mẫu số = đã chấm + còn lại. | `55ab47e` |
| 8 | Trung bình | **i18n:** chuỗi cứng chỉ có vi/en ("Ghi âm/Dừng", "Chưa nhớ/Đã nhớ/Xem nghĩa", "Truyện tự viết", "câu/sentences", thông báo video tự thêm). | Thêm 9 khoá vào cả 11 ngôn ngữ. | `55ab47e` |
| 9 | **Cao** | **i18n:** 9/11 ngôn ngữ (zh-Hans, zh-Hant, ko, tl, ne, id, pt, my, th) có 102/107 chuỗi **chỉ là bản sao tiếng Anh**. Thực chất app mới có 2 ngôn ngữ. Kiểm tra cũ chỉ so khoá, không so giá trị. | Dịch đủ 106 chuỗi cho 9 ngôn ngữ. **Cần người bản ngữ duyệt**, nhất là ne/my/tl. | `88e5196` |
| 10 | Trung bình | **SEO:** khoảng 1.000 trang chi tiết dùng chung một `<title>`, không có canonical hay OG. | `generateMetadata` cho `/read`, `/watch`, `/drive`: tiêu đề riêng (vd. "Lần đầu đi siêu thị (N5) · MiraiGo"), canonical, OG (video dùng thumbnail YouTube). `/drive/*` là `noindex` vì trùng nội dung với `/read/*`. Video tự thêm cũng `noindex`. Miền cấu hình một chỗ: `src/lib/seo.ts`. | `13ff252` |
| 11 | Trung bình | **Thương hiệu/giá:** paywall hiện giá ViMai 700.000đ/450.000đ và dùng mẹo `monthly.replace(/^1/, "3")` thành "3 tháng". Tên app vẫn là "ViMai Video". | Tên **MiraiGo** và miền **miraigo.vimai.jp** đã chốt ngày 25/11 (CLAUDE.md `fb9c141`), nên đã áp vào giao diện 11 ngôn ngữ, tiêu đề trang và metadataBase. Paywall hiện **¥4.980 / 1 năm (≈ ¥415/tháng)** và **¥550 / 1 tháng**. | `5f3338f` |
| 12 | Thấp | Thanh tiến độ chép chính tả tràn ngang với video nhiều dòng. Lint báo thiếu dependency `router`. | Cho xuống dòng, thêm dependency. | `898f862` |

### B. Còn mở (chưa sửa, cần quyết định hoặc ngoài phạm vi đợt này)

1. **Triển khai Cloudflare: không xuất tĩnh được.** App dùng `cacheComponents` (PPR), còn
   `/watch/custom-<youtubeId>` là route động lúc chạy, nên `output: "export"` không dùng được.
   Phương án: `@opennextjs/cloudflare`, chạy trên **Workers** (Workers Assets) chứ không phải
   Pages thuần. Cần kiểm OpenNext có hỗ trợ Next 16.4 + Cache Components chưa. Nếu chưa, có thể
   chuyển video tự thêm sang trang client `/watch/custom?v=` để xuất tĩnh được, rồi dùng Pages.
   → Đợt 2 của Claude.
2. **Số liệu file triển khai lệch giữa các tài liệu.** Thực tế đo ngày 25/11: `public/` có
   4.390 file, trong đó audio 4.287 file (191MB). README ghi audio ~2.300, CLAUDE.md ghi
   ~5.000. Ngưỡng chuyển sang R2 (10.000 file) vẫn còn xa.
3. **README và docs vẫn ghi `video.vimai.jp` / "ViMai Video".** Đây là tài liệu chung, nên để
   Muse cập nhật khi chốt nội dung (code đã dùng `miraigo.vimai.jp`).
4. Bộ lọc thể loại có chip **Anime** và **Bài hát** nhưng chưa có video nào, nên bấm vào thì ra
   danh sách trống. Đề xuất ẩn chip khi thể loại rỗng.
5. Nhãn nguồn truyện chỉ có 2 giá trị (`original` → "Truyện tự viết", còn lại → "Aozora Bunko").
   Truyện dân gian và văn học nước ngoài phóng tác hiện hiện "Truyện tự viết". Nếu muốn nhãn
   đúng hơn, schema `source` cần thêm giá trị (vùng nội dung, cần Muse đồng ý).
6. Trang video tải catalog cho hàng chờ (chunk 108KB). Vẫn dưới ngân sách 300KB. Chunk lớn nhất
   toàn app là 224KB (framework). Ngân sách vẫn đạt.
7. `qc-content.mjs` nên kiểm thêm: (a) mọi từ vựng bấm được (dùng chung thuật toán ở
   `Furigana.tsx`), (b) chuỗi i18n không trùng y nguyên bản tiếng Anh. Đây là vùng `scripts/`
   của Muse, nên để Muse quyết.
8. **YouTube 429** (CLAUDE.md mục 5): cần chạy `yt-dlp` từ iMac (IP mạng nhà). Đang chờ Việt
   kết nối máy.

---

## Đợt 2 — Bước 0a (25/11/2026, nhánh `claude/step0-video-paywall`, xếp trên PR #1)

Kiểm tra lại toàn bộ dữ liệu (script đọc 552 gói) — chi tiết trong bản phân tích đối thủ gửi Việt.
Phát hiện chính: nhãn cấp truyện N3–N1 bị thổi phồng (8 câu ngắn, ngang N5); cấp từ vựng gần như
mặc định N3 (1.044/1.151 từ trong truyện N5; 191 từ mang nhiều cấp khác nhau); bài trùng
(hashire-melos/hashire-merosu, kaguya-hime/taketori-monogatari…); 67 truyện chuyển thể cần rà
bản quyền bản dịch. Các mục này xử lý ở Bước 0b–0c.

| # | Mức | Phát hiện | Việc đã làm | Commit |
|---|---|---|---|---|
| 13 | **Cao** | Trình phát mở video từ 0:00, trong khi đoạn học nằm giữa video (64/98 bài bắt đầu sau phút đầu, trung vị giây 128). Danh sách hiện độ dài cả video (13:05) thay vì đoạn học (~1 phút). | `lib/clip.ts`: player nhận `start/end` theo đoạn học; hàng chờ chuyển bài khi hết đoạn; danh sách + hàng chờ hiện độ dài đoạn học; tiến độ lưu theo đoạn. Kiểm bằng trình duyệt: `teppei-genki-01` → `start: 23, end: 71`; độ dài trên trang chủ 0:48, 0:59, 1:37… | xem PR |
| 14 | Trung bình | Paywall mở trên nền tối (video/lái xe) thừa hưởng chữ trắng: tên gói "1 năm"/"1 tháng" vô hình. | Sheet paywall đặt màu chữ riêng. Kiểm: màu chữ `rgb(26,32,44)`. | xem PR |

`npm run verify` xanh trên bản clone sạch (npm ci → QC → typegen+tsc → lint → build).

## Đợt 2 — Bước 0b–0c (25/11/2026)

| # | Mức | Việc | PR |
|---|---|---|---|
| 15 | **Cao** | Chuẩn nội dung v2 (`docs/content-standard.md`) + cổng `scripts/qc-standard.mjs` trong `npm run qc`: gói `standard: 2` trượt tiêu chí là verify đỏ. Báo cáo kho: `npm run qc:report`. | #3 |
| 16 | **Cao** | Gắn lại cấp từ vựng theo danh sách JLPT mở cho 1.518 từ trong 510 gói (trước đó chỉ 909/2.424 từ có trong danh sách được gắn đúng, 38%). Từ không có trong danh sách giữ nguyên, để soạn lại khi nâng cấp từng gói. Chỉ đổi trường `level` của từ vựng, giữ nguyên định dạng file. | #4 |
| 17 | Trung bình | Bỏ 5 gói truyện trùng tình huống/tác phẩm, giữ bản dài hơn: hashire-merosu (giữ hashire-melos), taketori-monogatari (giữ kaguya-hime), the-health-checkup (giữ health-checkup), the-hair-salon (giữ at-the-hairdresser), the-snow-day (giữ first-snow). Xoá kèm audio + `.qc.md`, gỡ đăng ký trong `src/lib/content.ts`. Kho còn 547 gói (449 truyện). | #5 |
| 18 | Trung bình | Trang `/paths` trả 404 mặc định tiếng Anh (chỉ có `/paths/[id]`). Thêm trang danh sách lộ trình; tách lưới lộ trình thành `src/components/PathGrid.tsx` dùng chung với trang chủ. | #6 |
| 19 | Thấp | Ẩn chip thể loại không có video nào (Anime đang 0 gói). Chip tự hiện lại khi có gói. | #6 |
| 20 | **Cao** | Rà bản quyền 66 truyện chuyển thể (`aozora-adapted`). Ở Nhật cả 66 đều hết bản quyền. Theo luật Mỹ (URAA), 5 tác phẩm của Dazai Osamu (mất 1948) in 1939–1947 còn bản quyền ở Mỹ đến 2035–2043: 走れメロス, 富嶽百景, 女生徒, 斜陽, ヴィヨンの妻. App bán toàn cầu nên đã gỡ 5 gói này. 61 gói còn lại: tác giả mất trước 1946, hoặc tác giả mất 1946–1967 nhưng tác phẩm in trước 1931 (Kōda Rohan, 五重塔 1891). Truyện của Hearn là tự kể lại bằng tiếng Nhật từ bản gốc tiếng Anh 1904, không dùng bản dịch hiện đại. Bản dịch 11 ngôn ngữ là bản tự dịch từ văn bản của mình. Chuẩn v2 mục 2 đã ghi rõ quy tắc URAA. | #7 |
| 21 | **Cao** | Schema v2 thêm `audioTrack` (audio liền cho cả chương, để nghe khi tắt màn hình hoặc qua Bluetooth), `t` và `voice` cho từng câu, `lesson` (điểm ngữ pháp và câu hỏi), `shelf`, `origin`. QC chặn gói v2 thiếu các trường này. Chuẩn v2 thêm mục 6b–6d. | #8 |

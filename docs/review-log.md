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

## Đợt 3 — Truyện chuẩn v2, kệ A (văn học Nhật) và E (văn học thế giới) (25/11/2026)

Nhánh `claude/stories-batch1-v2`. Kệ A/E do luồng này cấp id; khối đăng ký riêng trong `src/lib/content.ts`
(giữa dấu `kệ A/E văn học (chuẩn v2)`) để không đụng các luồng khác. Muse: đừng cấp id cho các tác phẩm ở kệ A/E
trong `/mnt/project-files/miraigo/content-plan/audio-tuyen-chon.md`.

| Gói | Cấp | Câu | Audio | Ghi chú |
|---|---|---|---|---|
| akai-rousoku-to-ningyo | N3 | 61 | 6:28 | 小川未明 (in 1921). Thay một trong 5 truyện Dazai đã gỡ. |
| hanshichi-ofumi-1 | N3 | 46 | 4:49 | 岡本綺堂 半七捕物帳「お文の魂」tập 1, miễn phí. |
| hanshichi-ofumi-2 | N3 | 58 | 6:28 | Tập 2 (VIP). |
| jigokuhen-1 | N2 | 48 | 6:07 | 芥川龍之介「地獄変」(1918) tập 1, miễn phí. Cảnh cưỡng ép chỉ gợi ý. |
| jigokuhen-2 | N2 | 48 | 5:48 | Tập 2 (VIP). Cái chết nói bằng 「自ら命を絶つ」, giải thích câu 42 có số よりそいホットライン. |
| budori-1 | N3 | 48 | 5:46 | 宮沢賢治「グスコーブドリの伝記」(1932) tập 1, miễn phí. Nạn đói, Neri bị bắt đi, xưởng tơ. |
| budori-2 | N3 | 48 | 5:42 | Tập 2 (VIP). Ruộng bùn của Râu Đỏ, sách của Kūbō, hạn hán. |
| budori-3 | N3 | 47 | 5:48 | Tập 3 (VIP). Đại bác sĩ Kūbō, Cục Núi lửa, cứu thị trấn Sanmutori. |
| budori-4 | N3 | 50 | 6:10 | Tập 4 (VIP). Mưa phân bón, gặp lại Neri, đảo Karbonado; sự hy sinh kể gián tiếp như bản gốc. Commit `6c5ad20`. |
| hanshichi-yukidaruma-1 | N3 | 52 | 6:09 | 岡本綺堂 半七捕物帳「雪達磨」(1919) tập 1, miễn phí. Người tuyết tan lộ thi thể, manh mối hạt cườm 南京玉. |
| hanshichi-yukidaruma-2 | N3 | 55 | 6:51 | Tập 2 (VIP). Đường dây tiền giả; thân phận お政 kể kín đáo, án tử làm mềm thành 厳しく罰せられました. |
| botchan-1 | N3 | 52 | 5:47 | 夏目漱石「坊っちゃん」(1906) series 6 tập, tập 1 miễn phí. Tuổi thơ, 清, rời Tokyo. Bản cũ `botchan` (N4, 12 câu) giữ nguyên cho người mới. |
| botchan-2 | N3 | 52 | 5:47 | Tập 2 (VIP). Biệt danh các thầy, 天ぷらそば, 「湯の中で泳ぐべからず」; giải thích nối với Matsuyama và Dōgo Onsen ngày nay. Commit `3f4b33b`. |
| botchan-3 | N3 | 52 | 5:43 | Tập 3 (VIP). Đêm trực, châu chấu trong nệm, đi câu với Áo đỏ; Botchan bắt đầu nghi Nhím núi. Commit `c51f1f6`. |
| botchan-4 | N3 | 52 | 5:56 | Tập 4 (VIP). Một sen năm rin, cuộc họp hội đồng, chuyện Madonna, Botchan từ chối tăng lương. Thêm giọng bà cụ Hagino (Neural2-B +1). Commit `047546a`. |
| botchan-5 | N3 | 52 | 5:26 | Tập 5 (VIP). Làm lành với Nhím núi, tiệc chia tay Bí cuối mùa, trận ẩu đả mừng chiến thắng, bài báo vu khống. Commit `ccbb22f`. |
| botchan-6 | N3 | 52 | 5:30 | Tập 6, tập cuối (VIP). Botchan đòi từ chức cùng Nhím núi, 8 đêm rình ở Masuya, ném trứng và trừng phạt Áo đỏ, Nodaiko, về Tokyo sống với Kiyo; câu kết về mộ Kiyo ở chùa Yōgen-ji. Series 坊っちゃん đủ 6 tập. |

Công cụ và sửa lỗi kèm theo:

- `scripts/produce/` (build-story, tts, cover, register): dây chuyền một chương từ file nguồn tới JSON chuẩn v2, audio liền
  `chapter.mp3` có mốc từng câu, bìa, đăng ký. Mô tả ở `docs/content-standard.md` mục 7b.
- `scripts/lib/level.mjs`: thêm `vocabLevel`. Trước đây cấp từ vựng tra cả theo cách đọc nên từ có kanji trúng từ đồng âm
  (怪談 かいだん bị nhận là 階段 N5). Nay chỉ tra cách đọc khi từ viết toàn kana; `qc-standard.mjs` dùng hàm mới.
- Cách đọc từ vựng lấy theo dạng từ điển (雇う やとう, không phải やとっ).
- Danh sách truyện hiện ảnh bìa nhỏ; trang đọc có nút "Chương tiếp theo" theo `series` (chuỗi mới đủ 11 ngôn ngữ).
- Quy tắc bìa Việt đã duyệt ghi vào `docs/content-standard.md` mục 7.

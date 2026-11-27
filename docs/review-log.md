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

## Đợt 3 — Gỡ YouTube 429 + 4 gói video chuẩn v2 đầu tiên (25/11/2026, nhánh `claude/video-peppa-teded`)

**429 đã gỡ được từ iMac**: yt-dlp bản độc lập mới nhất (2026.11.23, `~/ytsub-test/yt-dlp`) + Node làm JS runtime
(`--js-runtimes node`, không cần Deno). Tải phụ đề từ IP nhà ở Nhật: 0 lần bị 429 trong ~20 lượt gọi (giãn 4–6 giây/lượt).
Bản yt-dlp cũ chạy Python 3.9 trên máy là nguyên nhân phụ; client `ios` hiện chỉ trả ảnh, client mặc định + `web_embedded` tải được phụ đề.

| # | Mức | Việc | PR |
|---|---|---|---|
| 21 | **Cao** | Kiểm chứng nguồn trong `content/anime-queue.md` từ IP Nhật. **Maruko #129 `pbwKSQaJ7Hc` bị CHẶN tại Nhật** ("not available in your country", danh sách vùng không có JP) → loại cả kênh re-upload này. **Nippon Animation**: 30 video mới nhất đều là 「期間限定配信」 → loại theo quy tắc không xây kho trên link hết hạn. **もったいないばあさん** (Kodansha): ASR hỏng vì nhạc/hát → loại. **まんが日本昔ばなし 公式**: có phụ đề tự động, cho nhúng, nhưng giọng địa phương + tên riêng ASR không chắc (助け?, 大ガ/大鴨) → hoãn, cần người nghe kiểm. | PR này |
| 22 | **Cao** | Hai kênh mới vào kho, mỗi kênh kiểm 2 video mẫu (phụ đề `ja`, cho nhúng, xem được tại Nhật): **Peppa Pig 公式** (`peppa-*`, dòng A, N4) và **TED-Ed tiếng Nhật 「好奇心を持ち続けよう」** (`teded-*`, dòng B, N2–N1). Lưu ý TED-Ed: phụ đề người đăng là bản dịch kịch bản tiếng Anh, KHÔNG khớp lời lồng tiếng — phải dùng phụ đề tự động `ja-orig`. | PR này |
| 23 | **Cao** | 4 gói đầu tiên đạt `standard: 2` của toàn kho video: `peppa-pancake-batter` (69s, 17 dòng), `peppa-pancake-flip` (54s, 14 dòng), `teded-procrastination-cycle` (47s, 9 dòng, N2), `teded-procrastination-brain` (77s, 11 dòng, N1). Đủ 11 ngôn ngữ cho tiêu đề/câu/từ, `grammarNote` 11 ngôn ngữ mọi câu, từ vựng cấp theo `data/jlpt/`, teaser `.ass`. Đăng ký `video99–102` trong `src/lib/content.ts`, thêm kệ `peppa`/`teded` vào `src/lib/series.ts` + nhãn 11 ngôn ngữ. Chi tiết sửa ASR từng gói trong `.qc.md`. | PR này |
| 24 | Trung bình | **Còn mở**: mốc thời gian 4 gói lấy từ ASR + nội suy (±0,5–1,5 giây), CHƯA nghe kiểm bằng tai như chuẩn v2 mục 3 yêu cầu. Cần một lượt nghe kiểm trên app trước khi coi là chính thức. | — |

**Cho Muse — tránh trùng**: đã dùng `G0wHgMKJRSU` (Peppa パンケーキ, 26–153s) và `cSIX6prPwRk` (TED-Ed 先延ばし, 8–132s).
Phần còn lại của `cSIX6prPwRk` (132–343s) chưa dựng. ID `video99–video102` đã cấp.

## Đợt 4 — Thêm 4 clip TED-Ed chuẩn v2 (26/11/2026, nhánh `claude/video-teded-habits`, xếp trên PR #15)

| # | Mức | Việc | PR |
|---|---|---|---|
| 25 | **Cao** | 4 gói `standard: 2` từ bài TED-Ed 「悪い癖をやめるのが大変な理由」 (`cS8oEgJ9CXU`, dùng 7,5–272s): `teded-habits-what` (N2, 59s), `teded-habits-dopamine` (N1, 77s), `teded-habits-routine` (N2, 49s), `teded-habits-change` (N2, 80s). Đăng ký `video103–106`. Chi tiết sửa ASR trong `.qc.md`. | PR này |
| 26 | Trung bình | Kênh TED-Ed tiếng Nhật có 40+ bài lồng tiếng 4–6 phút, đều cho nhúng — nguồn N2–N1 dồi dào cho các đợt sau (danh sách 40 bài mới nhất đã kiểm). Bài `-2ntpAhMb3s` (ミスコミュニケーション) có đoạn ASR gộp 25 giây vào một sự kiện → mốc kém, để sau. | — |
| 27 | Trung bình | **Còn mở**: mốc thời gian vẫn là ASR + nội suy, chưa nghe kiểm. Phương án căn tự động bằng Whisper cần tải tạm âm thanh YouTube — đang chờ Việt quyết. | — |

**Cho Muse — tránh trùng**: đã dùng `cS8oEgJ9CXU` (7–272s). ID `video103–video106` đã cấp.

## Đợt 5 — 2 kênh mới: YUYU Podcast + Japanese with Shun (26/11/2026, nhánh `claude/video-yuyu-shun`, xếp trên PR #17)

| # | Mức | Việc | PR |
|---|---|---|---|
| 28 | **Cao** | Kênh mới `yuyu` (YUYUの日本語Podcast, dòng B, N3) và `shun` (Japanese with Shun, hội thoại N3–N2). Cả hai cho nhúng, xem được tại Nhật, có phụ đề tự động `ja`. Thêm vào `src/lib/series.ts` + nhãn 11 ngôn ngữ. | PR này |
| 29 | **Cao** | 3 gói `standard: 2`: `yuyu-learning-spanish` (72s), `yuyu-understand-first` (63s), `shun-moving-saitama` (56s), đều N3. Đăng ký `video107–109`. | PR này |
| 30 | Trung bình | Hội thoại 2 người (Shun) có ASR chen tiếng đệm của người nghe — mỗi clip phải tách tay, chậm hơn TED-Ed. Podcast một người (YUYU) sạch, không dấu câu. | — |

**Cho Muse — tránh trùng**: đã dùng `C9VabhxOPbA` (0–136s), `gnOOLxtSPLs` (72–128s). ID `video107–video109` đã cấp.
| 21 | **Cao** | Schema v2 thêm `audioTrack` (audio liền cho cả chương, để nghe khi tắt màn hình hoặc qua Bluetooth), `t` và `voice` cho từng câu, `lesson` (điểm ngữ pháp và câu hỏi), `shelf`, `origin`. QC chặn gói v2 thiếu các trường này. Chuẩn v2 thêm mục 6b–6d. | #8 |

## Kệ D "Truyện quê hương" — lô 1: truyện Việt Nam (25/11/2026, nhánh `claude/furusato-osaka`)

Truyện dân gian của nước người học, kể lại bằng tiếng Nhật bằng lời của mình (không chép tuyển tập hiện đại),
mỗi tập kết bằng phần so sánh với một truyện Nhật tương tự. Chuẩn v2 đủ: audio liền `chapter.mp3`
(Google TTS: Aoede kể chuyện, Neural2-B nữ / Neural2-C nam cho lời thoại, mỗi nhân vật giữ một giọng),
mốc thời gian từng câu, dịch + giải thích 11 ngôn ngữ (tự dịch, tự rà), từ vựng gắn cấp theo `data/jlpt`,
bài học 4 mẫu ngữ pháp + 4 câu hỏi, `shelf: hometown`, `origin: VN`, `series {id, index}`, bìa MiraiGo 文庫
mỗi truyện một phông. **Muse lưu ý: các ID `furusato-*` do Claude cấp, đừng dùng lại.**

| Gói | Cấp | Câu | Audio | So sánh với truyện Nhật | Commit |
|---|---|---|---|---|---|
| furusato-vn-tamcam-1 | N4 | 62 | 6,7 phút | — (tập mở đầu) | 509fc02, 6765121 |
| furusato-vn-tamcam-2 | N4 | 58 | 5,8 phút | — | 6765121 |
| furusato-vn-tamcam-3 | N4 | 65 | 6,3 phút | 米福粟福, Cinderella | 1cf1510 |
| furusato-vn-sodua-1 | N4 | 57 | 5,1 phút | タニシ長者 | 5244530 |
| furusato-vn-giong-1 | N3 | 55 | 4,8 phút | 三年寝太郎, 桃太郎 | dbdae05 |
| furusato-vn-sontinh-1 | N3 | 51 | 4,8 phút | 山幸彦と海幸彦 (+ mẹo ハザードマップ) | 17361f8 |
| furusato-vn-caytre-1 | N3 | 63 | 5,0 phút | 竹取物語 | 048c3e5 |
| furusato-vn-maiantiem-1 | N3 | 59 | 5,3 phút | わらしべ長者 | 4060c21 |
| furusato-vn-thachsanh-1 | N3 | 58 | 5,7 phút | ヤマタノオロチ | a3ba133 |
| furusato-vn-thachsanh-2 | N3 | 58 | 5,8 phút | 浦島太郎 | a6e10b3 |
| furusato-vn-thachsanh-3 | N3 | 56 | 5,6 phút | 天岩戸 | 455786a |
| furusato-vn-khe-1 | N3 | 56 | 5,4 phút | 舌切り雀 | e7f8875 |
| furusato-vn-hoguom-1 | N3 | 55 | 5,9 phút | 俵藤太 | 9cf5895 |
| furusato-vn-rongtien-1 | N3 | 56 | 5,8 phút | 山幸彦と豊玉姫 | 49e08eb |
| furusato-vn-chudongtu-1 | N3 | 58 | 6,3 phút | かぐや姫 | afd60bb |
| furusato-vn-tuthuc-1 | N3 | 56 | 5,6 phút | 浦島太郎 | 6635cad |
| furusato-vn-traucau-1 | N3 | 56 | 5,9 phút | 高砂・相生の松 | f4d0a60 |

Công cụ mới trong `scripts/story-src/` (build, tts, register) và motif bìa mới trong `scripts/covers/cover.html`
(bird, coconut, horse, mountainwave; lô 2 thêm bamboo, watermelon, snake, eagle, lute, starfruit, turtle, eggs,
umbrella, peony, betel). **Đã đủ 17 truyện Việt Nam theo kế hoạch.** Khoá TTS chỉ đọc từ biến môi trường, không in, không ghi file.

## Kệ D "Truyện quê hương" — lô 2: truyện Hàn Quốc (25/11/2026, nhánh `claude/furusato-osaka`)

Cùng chuẩn với lô 1, `origin: KR`, nhãn bìa "Truyện cổ tích Hàn Quốc". Kể lại bằng lời của mình theo cốt truyện
truyền thống public domain; 콩쥐팥쥐 lược phần kết bi thảm của một số dị bản cho hợp người học.

| Gói | Tiêu đề | Câu | Audio | So sánh với truyện Nhật | Commit |
|---|---|---|---|---|---|
| furusato-kr-heungbu-1 | ツバメとひょうたん (흥부와 놀부) | 54 | 5,9 phút | 腰折れ雀 | 843de2f |
| furusato-kr-simcheong-1 | はすの花の娘 (심청전) | 55 | 6,2 phút | 弟橘媛 | d0f8f02 |
| furusato-kr-onui-1 | 太陽と月になった兄妹 (해와 달이 된 오누이) | 58 | 6,2 phút | 天道さん金の鎖 | d3c0744 |
| furusato-kr-kongjwi-1 | 花のくつと黒い牛 (콩쥐팥쥐) | 48 | 5,5 phút | 米福粟福 | 78ed58f |

Motif bìa mới: gourd, lotus, sunmoon, flowershoe. **Đã đủ 4 truyện Hàn Quốc theo kế hoạch.**

## Kệ D "Truyện quê hương" — lô 3: truyện Trung Quốc (25/11/2026, nhánh `claude/furusato-osaka`)

`origin: CN`, nhãn bìa "Truyện cổ tích Trung Quốc". Truyền thuyết dân gian (truyền khẩu, thư tịch cổ) và tiểu thuyết
西游记 (thế kỷ 16) đều là public domain; Claude tự kể lại, không chép bản dịch hay tuyển tập hiện đại. 西游记 làm thành
series 3 tập (`series.id = furusato-cn-saiyuki`), dùng chung font Reggae One; tập 2 nối với 嫦娥奔月 (Bát Giới bị đày
vì ve vãn Hằng Nga — đúng nguyên tác).

| Gói | Tiêu đề | Câu | Audio | So sánh với truyện Nhật | Commit |
|---|---|---|---|---|---|
| furusato-cn-niulang-1 | 牛飼いと織り姫 (牛郎织女) | 49 | 5,8 phút | 七夕, 羽衣伝説 | a8cf088 |
| furusato-cn-baishe-1 | 白いヘビの恋 (白蛇传) | 52 | 5,8 phút | 雨月物語「蛇性の婬」 | b4adc97 |
| furusato-cn-change-1 | 月へのぼった妻 (嫦娥奔月) | 44 | 5,0 phút | お月見, かぐや姫 | 8434e39 |
| furusato-cn-saiyuki-1 | 石から生まれたサル (西游记 ①) | 48 | 5,2 phút | さるかに合戦 | 9e07780 |
| furusato-cn-saiyuki-2 | 三蔵法師と仲間たち (西游记 ②) | 46 | 5,0 phút | 桃太郎, 沙悟浄＝カッパ | 1bc2e0e |
| furusato-cn-saiyuki-3 | 火の山と大きな扇 (西游记 ③) | 43 | 5,1 phút | 天狗のうちわ | 77b6f4e |

Motif bìa mới: milkyway, whitesnake, moonrabbit, stonemonkey, pilgrims, flamefan. **Đã đủ 6 truyện Trung Quốc theo kế hoạch.**

## Kệ D "Truyện quê hương" — lô 4: truyện Philippines (25/11/2026, nhánh `claude/furusato-osaka`)

| Gói | Tựa | Câu | Audio | So sánh với truyện Nhật | Commit |
|---|---|---|---|---|---|
| `furusato-ph-malakas-1` | 竹から生まれた二人 (Malakas at Maganda) | 51 | 5,1 phút | かぐや姫, 国生み | 6e0402a |
| `furusato-ph-pinya-1` | 千の目をもつ実 (Alamat ng Pinya) | 50 | 5,0 phút | 言霊 (kiêng từ trong đám cưới), あまがえる | d765072 |
| `furusato-ph-pagong-1` | カメとサルとバナナの木 (Si Pagong at si Matsing) | 50 | 5,1 phút | さるかに合戦 | 2d4c6d1 |
| `furusato-ph-juan-1` | なまけ者のフアン (Juan Tamad) | 53 | 5,1 phút | ものぐさ太郎 | b13c7f2 |

- Cả 4 gói N3, đạt chuẩn v2 (dịch + grammarNote 10 thứ tiếng, bài học 4 điểm ngữ pháp + 4 câu đố), nhãn xuất xứ PH, bìa 文庫 font riêng (Yomogi, Mochiy Pop P One, Potta One, Rampart One).
- Juan Tamad có nhiều dị bản theo vùng; bài kể 3 mẩu phổ biến (cây ổi, bán cua, múc nước bằng giỏ) và nói rõ trong bài là truyện thay đổi theo đảo/làng.
- Đã đủ 4 truyện Philippines.

## Kệ D "Truyện quê hương" — lô 5: truyện Indonesia (25/11/2026, nhánh `claude/furusato-osaka`)

| Gói | Tựa | Câu | Audio | So sánh với truyện Nhật | Commit |
|---|---|---|---|---|---|
| `furusato-id-malin-1` | 石になった息子 (Malin Kundang) | 51 | 5,4 phút | スズメとキツツキ | 09d4a45 |
| `furusato-id-timun-1` | 金のキュウリの娘 (Timun Mas) | 50 | 5,6 phút | 三枚のお札, イザナギの逃走 (古事記) | 9f65190 |
| `furusato-id-bawang-1` | 小さいカボチャ (Bawang Merah Bawang Putih) | 48 | 5,2 phút | 舌切り雀, 米福粟福 | 4a3b309 |
| `furusato-id-sangkuriang-1` | ひっくり返った船の山 (Sangkuriang) | 49 | 5,7 phút | 男鹿の五社堂 999 bậc đá | 6c25fce |
| `furusato-id-kancil-1` | ワニのはし (Kancil dan Buaya) | 49 | 5,3 phút | 因幡の白うさぎ (古事記) | 1ae6bf0 |

- Cả 5 gói N3, đạt chuẩn v2, nhãn xuất xứ ID, bìa 文庫 font riêng (Train One, RocknRoll One, Stick, DotGothic16, Darumadrop One). Kể lại bằng lời của mình, không chép tuyển tập hiện đại.
- Darumadrop One thiếu chữ 橋 và có khung chữ to, nên tựa bìa Kancil viết bằng kana 「ワニのはし」 (5 chữ) cho vừa cột.
- Bài Kancil có ghi chú "ワニ" trong truyện cổ Nhật thường được hiểu là cá mập.
- Đã đủ 5 truyện Indonesia.

## Kệ D "Truyện quê hương" — lô 6–8: Thái Lan, Nepal, Việt Nam mới (25–26/11/2026)

Theo lệnh của Việt (26/11): Osaka làm ít, đẩy mạnh truyện Việt Nam. Truyện cổ tích VN xếp N4–N3 xen kẽ;
N2–N1 dành cho tiểu thuyết Việt Nam (đang chờ Việt chốt danh sách). Mọi gói theo chuẩn v2 (10 ngôn ngữ,
từ vựng có cấp, bài học 4 ngữ pháp + 4 câu đố, audio đo trên chapter.mp3 thật).

| Gói | Cấp | Câu | Audio | So sánh với truyện Nhật | Commit |
|---|---|---|---|---|---|
| furusato-th-sangthong-1 「金のほら貝」 | N3 | 52 | 6.2 phút | 鉢かづき姫, かぐや姫 | 95c547c |
| furusato-th-aphai-1 「海をこえる笛」 | N3 | 50 | 5.6 phút | 浦島太郎, 牛若丸と弁慶 | 3514e27 |
| furusato-np-manjushri-1 「湖だった町」 | N4 | 60 | 5.4 phút | truyền thuyết hồ cổ 甲府盆地 | 856f6e6 |
| furusato-np-indra-1 「しばられた神さま」 | N4 | 60 | 5.2 phút | 羽衣, お盆 | 3f6724e |
| furusato-vn-banhchung-1 「四角いおもち」 | N3 | 63 | 5.3 phút | 鏡もち, 鏡開き | 1b8e67f |
| furusato-vn-taoquan-1 「台所の神さま」 | N3 | 53 | 5.3 phút | 荒神さま, 登竜門, こいのぼり | 5b5f47b |
| furusato-vn-cuoi-1 「月のクオイ」 | N4 | 60 | 5.2 phút | 月のうさぎ, お月見, 竹取物語 | 5ed325b |
| furusato-vn-coc-1 「天へ行くカエル」 | N3 | 59 | 5.5 phút | 桃太郎, 雨ごい | 5eb4364 |
| furusato-vn-oc-1 「タニシの仙女」 | N3 | 60 | 5.3 phút | 鶴の恩返し, 田螺長者 | b262512 |
| furusato-vn-neu-1 「鬼とテトの竹」 | N3 | 63 | 5.5 phút | 門松/年神さま, 節分 | 9023413 |
| furusato-vn-tichchu-1 「鳥になったおばあさん」 | N4 | 60 | 5.3 phút | うばすて山 | 90b0120 |
| furusato-vn-vusua-1 「お母さんの木」 | N4 | 60 | 5.6 phút | 安寿と厨子王, 親孝行したいときに親はなし | 17c3af7 |
| furusato-vn-babe-1 「湖にしずんだ村」 | N4 | 60 | 5.5 phút | 蘇民将来 | 2fc5932 |
| furusato-vn-mychau-1 「白い羽の道」 | N3 | 66 | 6.5 phút | お市の方 và túi đậu đỏ | 034146a |
| furusato-kr-hokburi-1 「トッケビとこぶ」 (Hàn) | N4 | 60 | 5.2 phút | こぶとりじいさん | 2054124 |
| furusato-id-toba-1 「金の魚の湖」 (Indonesia) | N4 | 60 | 5.6 phút | 鶴の恩返し, 蛤女房 | 5bce13c |
| furusato-ph-magayon-1 「雲になった王子」 (Philippines) | N3 | 59 | 5.4 phút | 竹取物語 (不死→富士) | daf97c6 |
| furusato-mm-mahagiri-1 「火と兄と妹」 (Myanmar) | N3 | 63 | 5.5 phút | 菅原道真 và 天神 | b42f032 |
| furusato-mm-kyaiktiyo-1 「落ちない石」 (Myanmar, Chùa Đá Vàng) | N4 | 60 | 5.6 phút | 要石 ở 鹿島神宮 | c0dc8b1 |
| furusato-br-saci-1 「赤いぼうし」 (Brazil, Saci-Pererê) | N4 | 60 | 5.2 phút | かまいたち | 9736fa6 |
| furusato-br-iara-1 「イアラの歌」 (Brazil, Iara) | N4 | 60 | 5.7 phút | 人魚 và 八百比丘尼 | e2636e5 |
| furusato-br-curupira-1 「うしろ向きの足」 (Brazil, Curupira) | N4 | 60 | 5.4 phút | 天狗, 天狗かくし | 67fd9c9 |

Ghi chú: Bánh chưng, Táo quân, Cóc kiện trời, Nàng tiên Ốc dự định N4 nhưng tỉ lệ từ khó vượt 15% nên
chuyển N3 (kế hoạch cho phép N4–N3 với truyện VN). Nguồn Nepal đã kiểm chứng trước khi viết.
Bảy gói VN cuối (Cóc, Ốc, Nêu, Tích Chu, Vú sữa, Ba Bể, Mỵ Châu) nằm ở nhánh `claude/furusato-vn-2` (PR #23) tạo từ main
sau khi PR #19 đã gộp. Đủ 10 truyện VN mới theo lệnh 26/11; cân cấp hiện tại: N3 = 6 (Bánh chưng, Táo quân, Cóc, Ốc, Nêu,
Mỵ Châu), N4 = 4 (Cuội, Tích Chu, Vú sữa, Ba Bể). Hồ Ba Bể theo bản SGK (gói tro + hai mảnh vỏ trấu), không phải hạt thóc.

## Kệ F 「大阪で働く」 — tập 1–5 (25/11/2026, nhánh `claude/furusato-osaka`)

Phim truyện nghe N3, 20 tập, sáng tác gốc (bible: `content/sources/osaka/series-bible.md`). Kịch tính trước,
thông tin đời sống thật sau: mỗi tập lồng một thủ tục, nói qua miệng nhân vật hoặc 1–2 câu kể, kết bằng móc câu.
大阪弁 chỉ ở lời キヨ/ラジュ/田中, luôn có giải thích chuẩn hoá trong grammarNote. Chuẩn v2 đủ: `chapter.mp3`,
mốc `t`, dịch + giải thích 11 ngôn ngữ (tự dịch, tự rà), bài học 4 mẫu ngữ pháp + 3 câu hỏi, `shelf: life-series`,
`series {id: osaka-hataraku, index}`. Cách đọc chung của kệ ở `content/sources/osaka/phrases.json`.
**Muse lưu ý: các ID `osaka-hataraku-*` do Claude cấp, đừng dùng lại.**

**26/11/2026:** Việt muốn series phụ làm ít thôi, nên series rút còn 8 tập. Tập 6–8 khép toàn bộ mạch chính (sự thật tháng Tám, Iwata nhận lỗi, Hải trở về). Bible đã cập nhật.

| Gói | Tiêu đề | Câu | Audio | Thông tin thật | Commit |
|---|---|---|---|---|---|
| osaka-hataraku-01 | ようこそ、大阪へ | 60 | 5,6 phút | 転入届 trong 14 ngày | e98e94b |
| osaka-hataraku-02 | 初出勤 | 58 | 5,2 phút | 区役所: マイナンバー, bảo hiểm | 24e43b8 |
| osaka-hataraku-03 | 消えた先輩 | 57 | 5,3 phút | thứ tự địa chỉ → SIM → ngân hàng, quy định 6 tháng, ゆうちょ | 927208e |
| osaka-hataraku-04 | ゴミの日の事件 | 58 | 5,6 phút | phân loại rác, đổ buổi sáng, 粗大ごみ | 3bb4ecb |
| osaka-hataraku-05 | 夜の工場 | 57 | 5,4 phút | 緊急地震速報, 避難所, túi khẩn cấp | a1fb25e |
| osaka-hataraku-06 | あかりの秘密 | 58 | 5,8 phút | khám 内科: マイナ保険証, 問診票, trả 3 phần 10, ＃7119 | 260c93e |
| osaka-hataraku-07 | 社長が倒れた | 61 | 5,4 phút | gọi 119: 火事か救急か → địa chỉ → ai bị gì, ý thức/hơi thở, phiên dịch | bda449a |
| osaka-hataraku-08 | ただいま、大阪 (tập cuối) | 61 | 5,8 phút | 給与明細: các khoản trừ, 手取り, 住民税 từ tháng 6 năm sau, giữ phiếu lương | f13f208 |

Tập 1 miễn phí, tập 2–5 `free: false`. `npm run verify` xanh trên bản clone sạch: 553 gói, 0 lỗi; chuẩn v2 11 gói đạt.

Cập nhật 25/11 (sau lô 2 Truyện quê hương): `npm run verify` xanh trên bản clone sạch tại f4d0a60: 564 gói, 0 lỗi; chuẩn v2 22 gói đạt.
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
| botchan-6 | N3 | 52 | 5:30 | Tập 6, tập cuối (VIP). Botchan đòi từ chức cùng Nhím núi, 8 đêm rình ở Masuya, ném trứng và trừng phạt Áo đỏ, Nodaiko, về Tokyo sống với Kiyo; câu kết về mộ Kiyo ở chùa Yōgen-ji. Series 坊っちゃん đủ 6 tập. Commit `2fb335d`. |
| madara-1 | N3 | 52 | 5:41 | Sherlock Holmes「まだらの紐」(Conan Doyle 1892, tự kể lại từ tiếng Anh) tập 1, miễn phí, kệ world. Helen Stoner, cái chết của Julia, tiếng huýt sáo, Roylott bẻ que cời. Commit `ba5df9a`. |
| madara-2 | N3 | 52 | 5:22 | Tập 2, tập cuối (VIP). Dây chuông giả, lỗ thông gió, giường bắt chặt, đĩa sữa; đêm canh, tiếng xì, rắn đầm lầy là "dải băng lốm đốm". Series まだらの紐 đủ 2 tập. Cần đối chiếu câu chữ với nguyên tác khi Gutenberg mở lại. |

Công cụ và sửa lỗi kèm theo:

- `scripts/produce/` (build-story, tts, cover, register): dây chuyền một chương từ file nguồn tới JSON chuẩn v2, audio liền
  `chapter.mp3` có mốc từng câu, bìa, đăng ký. Mô tả ở `docs/content-standard.md` mục 7b.
- `scripts/lib/level.mjs`: thêm `vocabLevel`. Trước đây cấp từ vựng tra cả theo cách đọc nên từ có kanji trúng từ đồng âm
  (怪談 かいだん bị nhận là 階段 N5). Nay chỉ tra cách đọc khi từ viết toàn kana; `qc-standard.mjs` dùng hàm mới.
- Cách đọc từ vựng lấy theo dạng từ điển (雇う やとう, không phải やとっ).
- Danh sách truyện hiện ảnh bìa nhỏ; trang đọc có nút "Chương tiếp theo" theo `series` (chuỗi mới đủ 11 ngôn ngữ).
- Quy tắc bìa Việt đã duyệt ghi vào `docs/content-standard.md` mục 7.
## Kệ B Rakugo — lô 1 (25/11/2026)

Nhánh `claude/shelf-rakugo-mukashi`, dựa trên PR #8. Ba gói chuẩn v2, đều N3 (cấp đo bằng kuromoji + danh sách JLPT, không gán tay):

| Gói | Câu | Ký tự | Audio liền | Giọng | Bài học | Miễn phí |
|---|---|---|---|---|---|---|
| `rakugo-toki-soba` 時そば | 62 | 1.371 | 5,2 phút | Aoede kể; 3 vai Neural2-C khác cao độ/tốc độ; Neural2-B | ておく, ながら, すぎる, てしまう + 4 câu hỏi | có |
| `rakugo-manju-kowai` まんじゅうこわい | 52 | 1.475 | 5,4 phút | Aoede kể; 3 vai Neural2-C | のに, だけで, てしまう, たくなる + 4 câu hỏi | VIP |
| `rakugo-meguro-no-sanma` 目黒のさんま | 48 | 1.450 | 5,3 phút | Aoede kể; lãnh chúa, gia thần (Neural2-C); bà lão (Neural2-B) | うちに, ほど, に限る, たばかり + 4 câu hỏi | VIP |

- Pháp lý: rakugo cổ điển là tiết mục dân gian thời Edo, không có tác giả. Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm hay sách của nghệ sĩ nào. Ghi chú pháp lý trong từng `content/stories/<id>.qc.md`.
- Công cụ: `scripts/build-audio-pack.mjs` (bản thảo `content/sources/rakugo/<id>/` → JSON v2 + `chapter.mp3` + mốc `t` từng câu; khoá TTS chỉ đọc từ biến môi trường), `scripts/audio-shelf/cover.mjs` (bìa bunko dọc, mỗi truyện một font), `scripts/audio-shelf/register.mjs` (đăng ký ở ĐẦU mảng STORIES, giữa hai dấu `kệ B/C`, để không đụng khối của nhánh A/E ở cuối mảng).
- Romaji: viết hoa tên riêng, tách `de gozaimasu`, は cuối phó từ đọc `wa`, ép tách từ cho chữ kana kuromoji đọc sai (へい, しっぽく).
- Sửa kế hoạch: mục "饅頭" trong `audio-tuyen-chon.md` trùng với まんじゅうこわい, sẽ thay bằng 初天神 ở lô 2.
- `npm run verify` xanh trên bản clone sạch tại commit đầu nhánh.

## Kệ B Rakugo — lô 2 (25/11/2026)

Cùng nhánh và PR #10. Sáu gói chuẩn v2; kệ B đủ 9 gói (8 tiết mục, 芝浜 hai tập):

| Gói | Cấp | Câu | Ký tự | Audio liền | Vai (một giọng cố định mỗi vai) | Bài học |
|---|---|---|---|---|---|---|
| `rakugo-jugemu` 寿限無 | N3 | 55 | 1.894 | 5,7 phút | Aoede kể; bố, sư (Neural2-C), mẹ, bé Kin (Neural2-B) | てたまらない, ければ〜ほど, ているうちに, てほしい + 4 câu hỏi |
| `rakugo-shibahama-1` 芝浜 (上) | N3 | 58 | 1.492 | 5,3 phút | Aoede; Katsugorō, bạn nhậu (Neural2-C); vợ (Neural2-B) | ことにする, そうになる, どころじゃない, ようになる + 4 |
| `rakugo-shibahama-2` 芝浜 (下) | N3 | 55 | 1.409 | 5,1 phút | như tập 1 | ほど, ながらも, ところだった, てくれたから + 4 |
| `rakugo-hatsu-tenjin` 初天神 | N4 | 60 | 1.538 | 5,1 phút | Aoede; bố, người bán kẹo, người bán dango (Neural2-C); con, mẹ, người bán diều (Neural2-B) | (よ)うとする, すぎる, ないでください, んじゃなかった + 4 |
| `rakugo-kohome` 子ほめ | N4 | 60 | 1.520 | 5,1 phút | Aoede; Hachigorō, cụ Goinkyo, bantō, Take (Neural2-C, cao độ/tốc độ khác nhau) | そうですね, ばいい, たばかり, にしては + 4 |
| `rakugo-sokotsu-nagaya` 粗忽長屋 | N3 | 56 | 1.526 | 5,2 phút | Aoede; Hachigorō, Kumagorō, viên quan (Neural2-C) | はずがない, ている場合じゃない, ような気がする, わけがない + 4 |

- Series: 芝浜 dùng `series: {id: "rakugo-shibahama", index: 1|2}`, mỗi tập một bìa riêng.
- Pháp lý: 寿限無, 初天神, 子ほめ, 粗忽長屋 là tiết mục dân gian thời Edo; 芝浜 là nhân tình噺 cuối Edo–đầu Meiji (tương truyền của Sanyūtei Enchō, mất 1900), theo thuyết nào cũng đã hết bản quyền. Kịch bản tự viết lại, không chép bản ghi hay sách của nghệ sĩ nào.
- 初天神 thay mục "饅頭" bị trùng trong kế hoạch. Câu cuối mỗi gói dẫn sang gói kế; 粗忽長屋 dẫn sang kệ C (浦島太郎).
- Công cụ: TTS câu dài hơn 60 ký tự được tách ở 、 rồi nối (giới hạn Neural2); audio đọc theo cách đọc ép `{漢字|よみ}` nên không còn đọc sai (蒸す, 行き倒れ, 抱く…); romaji thêm luật ghép お-tiền tố, 接続詞/副詞 は→wa.
- zh-Hant viết tay, kiểm bằng phép mã hoá Big5 cho phần dịch (bắt chữ giản thể sót: 俩, 嘞, 凑, 连…); chữ Hán Nhật trong ghi chú ngữ pháp giữ nguyên dạng Nhật.
- Cấp N4 kiểm theo luật N4 (≤60 câu, TB câu ≤26 ký tự, từ khó ≤15%); hai gói N4 đã gộp/bớt câu để đạt luật mà vẫn ≥5 phút.

## Kệ C Truyện dân gian Nhật — lô 1 (25/11/2026)

Cùng nhánh `claude/shelf-rakugo-mukashi` và PR #10. Sáu gói chuẩn v2, `shelf: "folktale-jp"`, id `mukashi-<tên>-<tập>`, mỗi truyện là một series hai tập. Gói ngắn cũ của Muse (`urashima-taro`, `tsuru-no-ongaeshi`, `issun-boshi`…) giữ nguyên; đây là bản dài nghe liền.

| Gói | Cấp | Câu | Audio liền | Bìa (font) | Bài học | Miễn phí |
|---|---|---|---|---|---|---|
| `mukashi-urashima-1` 浦島太郎 (上) | N3 | 59 | 5,7 phút | Shippori Mincho B1 | たり〜たり, てはいけない, ていただく, にちがいない + 4 câu hỏi | có |
| `mukashi-urashima-2` 浦島太郎 (下) | N3 | 58 | 5,0 phút | Shippori Mincho B1 | ても, はずだ, たまま, てしまう + 4 | VIP |
| `mukashi-tsuru-1` 鶴の恩返し (上) | N3 | 59 | 5,7 phút | Klee One | てあげる, (さ)せてください, ようになる, ことにする + 4 | VIP |
| `mukashi-tsuru-2` 鶴の恩返し (下) | N3 | 57 | 5,4 phút | Klee One | のに, ずつ, たら, たびに + 4 | VIP |
| `mukashi-issun-1` 一寸法師 (上) | N3 | 58 | 5,4 phút | Potta One | しか〜ない, ないように, ために, ことになる + 4 | VIP |
| `mukashi-issun-2` 一寸法師 (下) | N3 | 60 | 5,1 phút | Potta One | みたいに, ながら, (よ)うとする, ば + 4 | VIP |

- Giọng: Chirp3-HD-Aoede kể; mỗi nhân vật một giọng cố định Neural2-C (nam) hoặc Neural2-B (nữ) với cao độ/tốc độ riêng (ông lão, bà lão, cô gái, công chúa, quan đại thần, hai con quỷ…), ghi trong `meta.json` từng gói.
- Pháp lý: cả ba truyện là cổ tích dân gian không tác giả (浦島太郎 có từ thời Nara; 一寸法師 trong Otogizōshi thời Muromachi; 鶴の恩返し truyền miệng từ thời Edo trở về trước). Bản kể do Claude tự viết. 鶴の恩返し tránh hẳn vở kịch 夕鶴 (Kinoshita Junji, còn bản quyền): không dùng tên つう, 与ひょう hay tình tiết riêng của vở.
- Đọc ép `{漢字|よみ}` cho các chỗ kuromoji đọc sai: 竜宮城 (bị tách thành 竜+宮城みやぎ), 山道 (やまみち), 宝物 (たからもの), 一本/一羽/一晩/三日三晩, 和尚, 呉服屋, 二人/一人.
- Bài học chọn để không trùng điểm ngữ pháp giữa các tập trong cùng kệ (trừ ことになる/ことにする được đặt cạnh nhau có chủ đích để so sánh).
- Glossary chung `content/sources/glossary-rakugo-mukashi.tsv` thêm khoảng 80 từ 11 ngôn ngữ.
- `npm run verify` xanh trên bản clone sạch (commit 4a8afc0); QC toàn kho sau gói cuối: 557 gói, 0 lỗi, 15 gói chuẩn v2.
- Còn lại kệ C: かぐや姫 (2–3 tập, Kiwi Maru), 酒呑童子 ×2 (RocknRoll One), 牛若丸と弁慶 ×2 (Yusei Magic).

## Kệ C Truyện dân gian Nhật — lô 2 (25/11/2026)

Cùng nhánh `claude/shelf-rakugo-mukashi` và PR #10. Bảy gói chuẩn v2, N3, `shelf: "folktale-jp"`. Với gói này, kệ C đủ 13 gói (6 truyện).

| Gói | Commit | Câu | Audio liền | Bìa (font) | Bài học | Miễn phí |
|---|---|---|---|---|---|---|
| `mukashi-kaguya-1` かぐや姫 (一) | 46eec2a | 58 | 5,9 phút | Kiwi Maru | ほど, ばかり, てもらう, たいものだ + 4 câu hỏi | VIP |
| `mukashi-kaguya-2` かぐや姫 (二) | d9e6d2f | 58 | 6,1 phút | Kiwi Maru | (さ)せる, まるで〜ようだ, ずに, ふりをする + 4 | VIP |
| `mukashi-kaguya-3` かぐや姫 (三) | e1102e1 | 57 | 6,0 phút | Kiwi Maru | なければならない, はず, まま, ように命じる + 4 | VIP |
| `mukashi-shuten-1` 酒呑童子 (一) | d1a9f78 | 59 | 6,0 phút | RocknRoll One | として, とおり, 使役受身, てはならない + 4 | có |
| `mukashi-shuten-2` 酒呑童子 (二) | 464907f | 58 | 6,0 phút | RocknRoll One | てみせる, たことがない, というのに, のためなら + 4 | VIP |
| `mukashi-ushiwaka-1` 牛若丸と弁慶 (一) | da51415 | 55 | 5,8 phút | Yusei Magic | ている場合ではない, の代わりに, さえ, てみたらどうですか + 4 | có |
| `mukashi-ushiwaka-2` 牛若丸と弁慶 (二) | ae05bcb + bài học sửa | 55 | 5,9 phút | Yusei Magic | てばかりいないで, より〜ほうが, と言われている, でも + 4 | VIP |

- Giọng: Aoede kể; nhân vật Neural2-C/B cố định mỗi người một giọng (Raikō, Kintoki, Tsuna, Shuten-dōji, quỷ gác cổng, thần linh, Tokiwa, Ushiwaka, Benkei, thiên cẩu, sứ giả cung trăng…), ghi trong `meta.json`.
- Pháp lý: かぐや姫 dựa trên 竹取物語 (thế kỷ 9–10), 酒呑童子 dựa trên Otogizōshi/emaki thời Muromachi, 牛若丸と弁慶 dựa trên 義経記 (thời Muromachi). Tất cả public domain, lời kể do Claude tự viết; không dùng lời bài hát đồng dao 牛若丸 (dù đã hết bản quyền, để tránh tranh cãi).
- 牛若丸と弁慶 tập 2 kết bằng các thành ngữ còn sống trong tiếng Nhật: 弁慶の立ち往生, 弁慶の泣き所, 内弁慶, 判官びいき (gắn "truyện cổ" với tiếng Nhật đời thường).
- Đọc ép thêm: 都 (みやこ), 頼光 (らいこう), 酒呑童子, 神便鬼毒酒, 殿 (どの), 牛若, 源氏/平家, 判官 (ほうがん), 体中 (からだじゅう), 一本 (いっぽん), 角 (つの), 夜中 (よなか)… Từ bị tách sai chuyển vào `skipVocab` (綱, 殿, 助け, 教え, ちゃんと, 丸).
- Bài học tập 2 牛若丸 đổi 2 điểm (たまま, ほど → と言われている, でも) để không trùng với các tập khác trong kệ.
- Glossary chung thêm khoảng 130 từ 11 ngôn ngữ. QC toàn kho: 564 gói, 0 lỗi, 22 gói chuẩn v2.
| 22 | Cao | Định vị mới do Việt chốt 25/11: app giải trí bằng tiếng Nhật, không còn là "học để sống ở Nhật". Slogan mới bằng 11 ngôn ngữ, đặt ở tagline, câu chào onboarding và metadata trang. Cập nhật CLAUDE.md mục 2 và chuẩn v2 mục 1. | #9 |
| 23 | Kế hoạch | Thêm `docs/ux-plan.md`: kế hoạch UX v2 Việt đã duyệt (6 màn hình, nhóm A bắt buộc trước khi lên store, nhóm B để vượt Tadoku, cách xin đánh giá) và kế hoạch VIP (mục 6; bảng miễn phí/VIP là đề xuất, chờ Việt duyệt). | ux-v2 |
| 24 | UX | Khung 5 tab theo `docs/ux-plan.md`: Trang chủ · Truyện · Video · Ôn tập · Tôi. Thêm Trang chủ mới (nghe/xem tiếp, số từ đến hạn ôn, truyện mới, video mới, lộ trình). Danh sách video chuyển sang `/video`. Bỏ tab Tin tức. Thẻ "Nghe khi lái xe" chuyển sang tab Truyện. Tab Tôi có lối vào Lộ trình, mục hệ sinh thái ViMai (ViCare, ViMai Menkyo, ViBJT·ViJPT) và dòng bản quyền ViMai. Nút đánh giá chỉ hiện khi đã có `APP_STORE_ID` (`src/lib/vimai.ts`). Thẻ app ViMai chưa có link vì chưa có link store chính thức. Chuỗi mới có đủ 11 ngôn ngữ. | ux-shell |
| 25 | Giá VIP | Việt chốt giá 1 tháng ¥900. Gói dài: 6 tháng ¥4.400 (≈ ¥733/tháng, tiết kiệm 19%), 1 năm ¥7.800 (≈ ¥650/tháng, tiết kiệm 28%, rẻ hơn Tadoku ¥8.000/năm). Paywall có 3 gói, mặc định chọn gói năm. % tiết kiệm tính từ giá tháng thật, không gạch giá giả. Đã cập nhật CLAUDE.md, README và ux-plan. | ux-shell |
| 26 | UX | Màn truyện mới: đọc và nghe chung một màn. Gói v2 phát một file audio liền cho cả chương, câu đang đọc được tô sáng theo `t` và tự cuộn theo. Gói cũ phát nối từng câu. Thanh phát gồm tốc độ, câu trước/sau, nghe tiếp từ câu đã dừng và điều khiển trên màn hình khoá (Media Session). Có công tắc furigana, dịch, romaji, cỡ chữ. Câu đang chọn có Dịch, Giải thích, Nghe lại câu. Thẻ Bài học gồm từ vựng của chương, ngữ pháp kèm câu ví dụ và câu hỏi nhanh có chấm điểm. Đã thử với gói rakugo 時そば (#10): sau 9 giây audio đến câu 2/62; gói cũ phát nối đến câu 3/8. | ux-reader |
| 27 | UX + giá | Theo góp ý của Việt: (1) Trang chủ có băng "Đang hot" ở đầu, gồm video mới của từng kênh và truyện chuẩn v2 mới nhất; phần lộ trình thu thành một dòng. (2) Tab Tôi: VIP lên đầu, hệ sinh thái ViMai thành 3 ô ngay dưới, mục ngôn ngữ chỉ còn một dòng và bấm vào mới mở bảng chọn. (3) Giá ra mắt: bán ¥900 / ¥4.400 / ¥7.800 và gạch giá thường gấp đôi (¥1.800 / ¥8.800 / ¥15.600) tới `LAUNCH_ENDS_AT`. Sau ngày đó, người mua mới trả giá thường thật, nên giá gạch đúng 景品表示法. Việt chốt: bản web dùng giá ra mắt có gạch giá; bản iOS (`NEXT_PUBLIC_PLATFORM=ios`) không gạch giá, chỉ so với giá tháng. Ngày kết thúc chờ Việt chốt theo ngày ra mắt. | ux-shell |
| 28 | UX | Trình phát dùng chung `src/lib/player.ts` (một thẻ audio cho cả app). Rời màn truyện, chuyển tab hay tắt màn hình thì audio vẫn phát. Có thanh phát nhỏ trên thanh tab, kèm nút phát/tạm dừng và đóng. Hết chương thì tự sang chương sau của bộ truyện (gói có audio liền; chương VIP chỉ tự chuyển khi người dùng là VIP), màn đọc đi theo. Hẹn giờ tắt: 15, 30, 60 phút hoặc hết chương. Màn hình khoá hiện bìa truyện (hoặc ảnh MiraiGo). Chế độ lái xe tắt trình phát truyện để không phát chồng. Thêm `cover` vào chỉ mục và nút "Chương tiếp theo", làm giống #11 để không xung đột khi gộp. Đã thử với 半七 お文の魂: hết tập 1 thì tự sang tập 2 và vẫn phát. Thanh phát nhỏ còn hiện sau khi về tab Truyện. | ux-player |
| 29 | UX | Tab Truyện chia theo kệ (Rakugo, Trinh thám, Truyện ma, Văn học Nhật, Cổ tích Nhật Bản, Truyện quê hương, Văn học thế giới, Series đời sống, Cổ tích và ngụ ngôn, Đời sống ở Nhật). Gói v2 dùng `shelf`; gói cũ suy ra từ `topic`. Mỗi kệ cuộn ngang, có "Xem tất cả" dạng lưới. Bộ nhiều chương chỉ hiện một bìa (chương đang nghe dở hoặc chương 1). Dùng ảnh bìa v2 nếu có, nếu không thì dùng bìa chữ màu theo id, kèm nhãn cấp, cờ nước gốc, VIP và tiến độ. Trang chủ dùng cùng component bìa. | ux-shelves |
| 30 | UX | Onboarding mới học từ Tadoku nhưng làm kỹ hơn, gồm 8 bước: chào và chọn ngôn ngữ, sở thích (chọn nhiều), tự đánh giá cấp N5–N1, nghe thử 3 câu thật (N5/N4/N3) để xếp cấp, mục tiêu phút mỗi ngày và lúc hay nghe, tên, màn "đang dựng kế hoạch", rồi kế hoạch riêng với truyện miễn phí đầu tiên. Ưu đãi VIP chỉ là nút phụ, không chặn. Hồ sơ lưu thêm level, interests, dailyMinutes, listenWhen. Sửa lỗi bấm "Nghe truyện đầu tiên" lại bị đưa về trang chủ (effect redirect đè điều hướng). | ux-onboarding |
| 31 | UX | Dùng câu trả lời onboarding. Tab Truyện mặc định lọc theo cấp đã xếp (người dùng vẫn đổi tay được) và đưa các kệ khớp sở thích lên đầu. Thẻ "Bắt đầu từ đây" ở Trang chủ gợi ý cùng truyện như màn kế hoạch (hàm chung `recommendFirst` trong `src/lib/shelves.ts`). | ux-personal |
| 32 | VIP | Phân quyền miễn phí/VIP phía máy khách theo bảng ở ux-plan mục 6, mọi quy tắc nằm ở `src/lib/access.ts`. Truyện miễn phí gồm gói gắn nhãn free, chương 1 của mọi bộ và mọi truyện ngắn N5 (từ 183 lên 223 gói); `gen-catalog` dùng cùng quy tắc. Video VIP giờ mở được, hiện rõ 2 câu phụ đề đầu, các câu sau là dòng giả làm mờ (không đưa chữ thật vào trang) kèm nút "Mở khoá VIP"; chép chính tả và shadowing cần VIP. Thẻ Bài học: từ vựng miễn phí, ngữ pháp và câu hỏi hiện tên mẫu câu kèm lời mời VIP. Thẻ ôn tối đa 100 thẻ. "Giải thích" câu 5 lượt mỗi ngày (mở lại câu đã xem không tốn lượt). Cờ VIP giả ở tab Tôi chỉ hiện ở bản dev hoặc khi build với `NEXT_PUBLIC_DEV_TOOLS=1`. Việc còn lại: chặn ở máy chủ khi có Firebase. | vip-gating |

## Kệ B Rakugo + Kệ C Cổ tích Nhật — vòng 2 (26/11/2026, nhánh `claude/shelf-bc-round2`)

17 gói chuẩn v2 mới, tất cả N3, mỗi gói đủ 11 ngôn ngữ, audio liền ≥ 5 phút, bài học 4 mẫu ngữ pháp + 4 câu hỏi, bìa bunko với font riêng từng truyện. Kệ B dùng `shelf: "rakugo"`, kệ C dùng `shelf: "folktale-jp"`. Tập 1 của bộ nhiều tập miễn phí; truyện một tập là VIP.

| Gói | Commit | Câu | Audio | Bìa (font) | Bài học | Miễn phí |
|---|---|---|---|---|---|---|
| `rakugo-shinigami-1` 死神 (一) | 1459c5a | 58 | 5,6 phút | Kaisei Tokumin | だらけ, なくていい, そうだ (truyền đạt), ものではない | có |
| `rakugo-shinigami-2` 死神 (二) | e706898 + 3fcf0d4 | 60 | 6,0 phút | Kaisei Tokumin | せめて〜だけでも, きれない, 今にも〜そう, ないと | VIP |
| `rakugo-tenshiki` 転失気 | c968ad5 | 62 | 5,2 phút | Hachi Maru Pop | とは言わない, くせに, こそ, あまり〜ので | VIP |
| `rakugo-hirabayashi` 平林 | c1f26b1 | 62 | 5,3 phút | Yomogi | っけ, もんか, ますます, ばよかった | VIP |
| `rakugo-doguya` 道具屋 | 7863795 | 62 | 5,6 phút | Shippori Antique | ても構わない, っぱなし, に決まっている, おかげで | VIP |
| `rakugo-inu-no-me` 犬の目 | c0fccfa | 62 | 5,8 phút | Stick | ついでに, わけにはいかない, ようがない, たとたん | VIP |
| `rakugo-kinmeichiku` 金明竹 | 8e60d6b | 63 | 5,9 phút | Zen Old Mincho | てくれない(かしら), 方, と言えば, わけだ | VIP |
| `mukashi-momotaro-1` 桃太郎 (一) | 52ee8d8 | 62 | 6,5 phút | Rampart One | につれて, からには, ところだ, なんか | có |
| `mukashi-momotaro-2` 桃太郎 (二) | 66a7f80 | 62 | 5,8 phút | Rampart One | どころか, ことはない, ずにはいられない, うえに | VIP |
| `mukashi-yuki-onna-1` 雪女 (一) | 2a1652a | 62 | 6,9 phút | Zen Kurenaido | かと思うと, にもかかわらず, ものの, ことなく | có |
| `mukashi-yuki-onna-2` 雪女 (二) | 617bdbe | 62 | 6,6 phút | Zen Kurenaido | ばかりか, わけではない, ほかない, ものなら | VIP |
| `mukashi-anju-zushio-1` 安寿と厨子王 (一) | 52f6bc5 | 62 | 6,7 phút | Kaisei HarunoUmi | ものだから, ばかりに, はもちろん, てしかたがない | có |
| `mukashi-anju-zushio-2` 安寿と厨子王 (二) | 46d3316 | 62 | 5,7 phút | Kaisei HarunoUmi | くらいなら, ざるをえない, とともに, の末に | VIP |
| `mukashi-shitakiri` 舌切り雀 | fb591ba | 62 | 6,4 phút | Zen Maru Gothic | くせに, に違いない, ついでに, よりしかたがない | VIP |
| `mukashi-hanasaka` 花咲かじいさん | 49ca880 | 61 | 6,1 phút | Kaisei Opti | おかげで, のせいで, ないうちに, わけがない | VIP |
| `mukashi-kintaro` 金太郎 | 6be405e | 58 | 5,3 phút | Train One | ば〜ほど, にとって, わけにはいかない, からこそ | VIP |
| `mukashi-kasajizo` 笠地蔵 | a70c83a | 59 | 6,2 phút | Sawarabi Mincho | せっかく〜のに, なんて, しかない, かえって | VIP |

- Giọng: Chirp3-HD-Aoede kể; mỗi nhân vật một giọng Neural2-C (nam) hoặc Neural2-B (nữ) cố định với tốc độ và cao độ riêng, ghi trong `meta.json` từng gói.
- Pháp lý: rakugo cổ điển (thời Edo–Meiji, khuyết danh) và truyện dân gian không tác giả, đều thuộc phạm vi công cộng. Lời kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép bản in, sách tranh hay lời bài hát. 金太郎 bỏ câu đồng dao 「まさかりかついで…」; 笠地蔵 thay bài hò của các tượng Jizō bằng lời tự viết; 安寿と厨子王 dựa trên truyện 説経節 cổ, không dùng câu chữ bản 山椒大夫 của Mori Ōgai.
- Độ khó: mọi gói có tỉ lệ từ vượt cấp ("harder") ≤ 12%. 安寿 tập 2 phải thay hai từ (ほとり, ひきとり) để xuống dưới ngưỡng.
- Đọc ép `{漢字|よみ}` cho các chỗ kuromoji đọc sai, ví dụ 米 (こめ), 宝物, 夜中, 二人/一人, 殿, 都, 頼光, 源頼光, 坂田金時, 大喜び, 無礼者. Từ bị tách sai thì đưa vào `skipVocab` (違い, しよう, うわる, さかり).
- Glossary chung `content/sources/glossary-rakugo-mukashi.tsv` thêm khoảng 150 từ 11 ngôn ngữ.
- **Trùng nội dung với gói cũ của Muse (chưa xoá vì là vùng của Muse):** các gói ngắn chuẩn cũ `momotaro`, `hanasaka-jiisan`, `shita-kiri-suzume`, `kintaro`, `kasa-jizo`, `kasako-jizo` kể cùng truyện với gói v2 mới. Đề xuất ẩn các gói cũ này khỏi kệ hoặc gỡ hẳn khi Việt đồng ý, để người dùng không thấy hai bản cùng một truyện.
- QC toàn kho sau gói cuối (trước khi gộp main): 659 gói, 0 lỗi, 117 gói đạt chuẩn v2.

## Ẩn 6 gói cổ tích cũ trùng bản v2 (26/11/2026, nhánh `claude/hide-old-duplicates`)

- Thêm `content/hidden-stories.json` (id cũ → id bản v2 thay thế): `momotaro` → `mukashi-momotaro-1`, `hanasaka-jiisan` → `mukashi-hanasaka`, `shita-kiri-suzume` → `mukashi-shitakiri`, `kintaro` → `mukashi-kintaro`, `kasa-jizo` và `kasako-jizo` → `mukashi-kasajizo`.
- `scripts/gen-catalog.mjs` gắn `hidden` + `replacedBy` vào chỉ mục và xuất `LISTED_STORIES`. Kệ, tab Truyện, Trang chủ, danh sách lái xe và gợi ý truyện đầu tiên chỉ dùng `LISTED_STORIES`. Chế độ lái xe không tự chuyển sang gói ẩn.
- Chỉ ẩn, không xoá: file nội dung và đăng ký trong `content.ts` giữ nguyên, `/read/<id>` cũ vẫn mở được (link và tiến độ cũ không hỏng), nhưng có `noindex` và canonical trỏ sang bản v2. Muốn hiện lại thì xoá dòng trong `hidden-stories.json`.
- Lộ trình "Giải trí & văn hoá" (`src/lib/paths.ts`) đổi `momotaro` → `mukashi-momotaro-1`.
- Đánh đổi: 4 trong 6 gói ẩn là N5 (ngắn 10–14 câu), bản v2 là N3, nên người mới bắt đầu có ít truyện cổ tích dễ hơn. Kho N5 vẫn còn hơn 200 gói khác.

## Bộ thẻ có sẵn từ ViBJT — lô 1 (26/11/2026, nhánh `claude/bjt-decks`)

Tab Ôn tập có mục "Bộ thẻ có sẵn", dựng từ kho thẻ ViBJT (repo BJT, cùng hệ sinh thái ViMai). Việt chọn phương án 1+2 ngày 26/11. Công cụ: `scripts/decks/build-decks.mjs` (BJT_DIR trỏ tới repo BJT) ghép thẻ gốc (ja, vi, en, câu ví dụ, mã audio) với bản dịch 9 ngôn ngữ ở `content/sources/decks/src/*.txt`, đổi sang JSONL bằng `scripts/decks/tr2jsonl.py`. Thẻ chỉ vào bộ khi đủ 11 ngôn ngữ. Đầu ra: `public/decks/*.json` (tải khi bấm thêm, không nằm trong bundle), `public/audio/bjt/*.mp3`, `src/lib/decks.generated.ts`. Lô đầu: Kính ngữ 135 thẻ có bảng thường/lịch sự/tôn kính/khiêm nhường, câu ví dụ và giọng đọc. Sửa nghĩa en sai của 帰る ("about" thành "go home, leave"). Mỗi lần thêm 10 thẻ; bản miễn phí vẫn giới hạn 100 thẻ. Lô sau: Tiếng Nhật công sở N5–N1 (1.293 từ có trong danh sách JLPT), ngữ pháp N3–N1, ví dụ cho 535 từ trùng với truyện/video.
## Rà chất lượng 444 gói truyện cũ của Muse, ẩn 62 gói (26/11/2026, nhánh `claude/retire-old-stories`)

Việt giao (26/11): truyện cũ không đạt chuẩn thì bỏ hoặc làm lại, Claude tự quyết.

**Hiện trạng gói cũ (cả 444 gói):** chỉ có bản dịch VI + EN (app có 11 ngôn ngữ, 9 ngôn ngữ còn lại thấy trống), trung bình khoảng 9 câu và 28 giây, audio từng câu, không có tab Bài học, không có ảnh bìa. 345 gói có quá 20% từ vượt cấp được gắn.

**Đã ẩn thêm 62 gói** (`content/hidden-stories.json`, chỉ ẩn, không xoá):

- 9 gói đã có bản v2 dài hơn: `botchan`, `benkei-ushiwakamaru`, `issun-boshi`, `kaguya-hime`, `sansho-dayu`, `shuten-doji`, `tsuru-no-ongaeshi`, `urashima-taro`, `yuki-onna`, mỗi gói trỏ sang tập 1 của bản v2.
- 15 gói trùng truyện với gói cũ khác. Giữ bản dài hơn: `the-golden-axe`, `the-little-mermaid`, `the-three-little-pigs`, `the-shinkansen-trip`, `the-dentist`, `opening-a-bank-account`, `tanabata`, `at-the-hairdresser`, `the-bicycle-puncture`, `the-onsen-trip`, `the-post-office`, `the-town-mouse`, `the-lost-umbrella`, `the-shepherd-boy`, `the-japanese-class`.
- 38 gói cho nghỉ, không có bản thay (giá trị `null`):
  - 23 bản tóm tắt tiểu thuyết phương Tây trong 8 câu cụt, không phải truyện (ví dụ Jane Eyre: 「ジェーンは、親戚の家で育ちました。家庭教師に、なりました。…」).
  - 7 tiểu sử tác giả.
  - 8 bài giới thiệu sách dạng 『…』は…の小説です.
- `gen-catalog.mjs` nhận `null` (ẩn, không có `replacedBy`). `/read/<id>` của gói cho nghỉ chỉ có `noindex`, không có canonical.
- Lộ trình (`paths.ts`): `opening-a-bank-account` → `at-the-bank`, `tsuru-no-ongaeshi` → `mukashi-tsuru-1`, `kaguya-hime` → `mukashi-kaguya-1`.
- Sau đợt này, gói cũ còn hiện: N5 150, N4 190, N3 12, N2 12, N1 12.

**Kế hoạch làm lại (theo thứ tự ưu tiên):**

1. Mai-chan (66 tập × 8 câu): dựng lại thành series v2 N5/N4 dài hơn, 11 ngôn ngữ. N5/N4 hiện toàn gói cũ, mà người mới là đông nhất.
2. Văn học Nhật ngắn public domain (Akutagawa, Miyazawa Kenji, Niimi Nankichi, Mười đêm mộng…, khoảng 35 gói): làm lại v2 N4/N3.
3. Ngụ ngôn và cổ tích phương Tây N5 (Aesop, Grimm, Andersen): gộp thành các tập v2 N5.
4. Đời sống Nhật (khoảng 190 gói): lệch định vị giải trí mới, nên ẩn dần khi đã đủ gói v2 N5/N4 thay thế. Riêng 12 bài luận N1/N2 chỉ 8 câu sẽ được ẩn khi tiểu thuyết Việt Nam N2/N1 lên kệ.

## Tiểu thuyết Việt Nam N2/N1 (26/11/2026, nhánh `claude/vn-novels`, `claude/vn-novels-2`)

Việt chọn: Số đỏ và Truyện Kiều (văn xuôi) ở N2, Hoàng Lê nhất thống chí (các hồi về Quang Trung) ở N1. Claude kể lại bằng lời mới từ nguyên tác tiếng Việt, không dùng bản dịch hiện đại. Thuộc kệ quê hương, series `furusato-vn-sodo`.

| id | Tên | Câu | Audio | Commit |
|---|---|---|---|---|
| furusato-vn-sodo-1 | 赤毛のスアン | 61 | 7,2 phút | 3a085a8 |
| furusato-vn-sodo-2 | ドクター・スアン | 61 | 6,6 phút | 43b51bd (+ commit kế: đổi ファン→ファーン) |
| furusato-vn-sodo-3 | 幸せな葬式 | 61 | 6,6 phút | 10a4284 |
| furusato-vn-sodo-4 | 救国の英雄 (hết; so sánh 『吾輩は猫である』) | 61 | 5,9 phút | ec176a0 |

- Bìa: thêm motif `tennis`, `sododoctor`, `sodofuneral`, `sodohero`. Font Chokokutai và Tsukimi Rounded thiếu nhiều chữ Hán (chữ bị chồng lên nhau), nên không dùng cho bìa có kanji.
- Nguồn tóm tắt các chương không thống nhất về cái chết của cụ cố tổ (tiếng hô "ông Phán mọc sừng"; ông Phán đưa 5 hay 10 đồng). Claude theo bản phổ biến nhất: tờ 5 đồng gấp tư.
- Tên ông Phán viết là ファーン, không viết ファン: kuromoji tách ファン thành từ "fan" (N1), làm chỉ số "từ vượt cấp" tăng sai.

## Bộ thẻ có sẵn từ ViBJT — lô 2 (Công sở N5–N4)

- Thêm bộ **Tiếng Nhật công sở N5** (50 thẻ) và **N4** (138 thẻ). Mỗi thẻ có nghĩa và câu ví dụ đủ 11 ngôn ngữ, kèm audio từ và câu của ViBJT. Bản dịch 9 ngôn ngữ do Claude tự soạn và tự duyệt, nguồn nằm ở `content/sources/decks/src/office-n5.txt` và `office-n4-*.txt`.
- `scripts/decks/tr2jsonl.py`: dòng `m` (nghĩa) giờ là tuỳ chọn. Thẻ nào mà nghĩa 11 ngôn ngữ đã có sẵn trong vocab truyện/video thì chỉ cần dịch câu ví dụ.
- Tổng hiện có 3 bộ (Kính ngữ, Công sở N5, Công sở N4) với 323 thẻ. Có 105 từ trong truyện/video được thêm câu ví dụ và audio ViBJT (`extras.json`).
- Còn lại: Công sở N3 (456 thẻ), N2 (235), N1 (414), Ngữ pháp N3–N1.

## Mai-chan bản mới N5 — đợt 1 (26/11/2026, nhánh `claude/maichan-v2`)

Trước đợt này kho chưa có gói N5 nào đạt chuẩn v2, nên Mai-chan được dựng lại thành series N5 chuẩn mới (`series: maichan`, nguồn ở `content/sources/maichan/`). Mỗi tập gộp và mở rộng một tập cũ 8 câu thành một chuyện có mở đầu, cao trào và kết vui: khoảng 40 câu, 690–760 ký tự, một file audio liền mạch 2,4–2,7 phút. N5 giới hạn 900 ký tự và 45 câu, nên tập N5 ngắn hơn mốc 5 phút của các kệ N4 trở lên; đây là chủ ý, vì người mới học nghe dài sẽ mệt.

| id | Tên | Câu | Audio | Thay cho |
|---|---|---|---|---|
| maichan-01 | あわてんぼうの朝 | 42 | 2,7 phút | mai-chan-ep01-hello, ep02-homework |
| maichan-02 | うんどうかい | 40 | 2,4 phút | mai-chan-ep05-sports-day |
| maichan-03 | グラグラの歯 | 42 | 2,5 phút | mai-chan-ep06-loose-tooth |
| maichan-04 | ビンへのプレゼント | 40 | 2,6 phút | mai-chan-ep07-birthday |

- Giọng: Aoede đọc dẫn (0.85), Mai Neural2-B pitch +6, Bin Neural2-B pitch +10, mẹ B −1, bố C −2, Yuki B +3, cô giáo B −3.
- Bìa: hàm vẽ nhân vật dùng chung `MAI()` và `BIN()` trong `scripts/covers/cover.html` (tóc bob đen, kẹp đỏ, hoodie vàng đúng bible), motif `mai01`–`mai04`, font M PLUS Rounded 1c cho cả series.
- 5 gói cũ được ẩn và trỏ sang gói mới trong `content/hidden-stories.json`; lộ trình "Gia đình" ở `src/lib/paths.ts` đổi sang `maichan-01`.
- Sửa romaji: kuromoji ghép では/には/とは thành "deha/niha/toha"; `build.mjs` giờ đổi thành "de wa/ni wa/to wa". 24 gói v2 đã dựng trước đó vẫn còn "deha" và sẽ được sửa khi dựng lại.
- Tập 3 có kiến thức phong tục: Nhật ném răng hàm dưới lên mái, răng hàm trên xuống gầm nhà; Việt Nam cũng ném răng và xin chuột đổi răng.

## Bộ thẻ có sẵn từ ViBJT — lô 3 (Công sở N3)

- Thêm bộ **Tiếng Nhật công sở N3** (456 thẻ). Mỗi thẻ có nghĩa và câu ví dụ đủ 11 ngôn ngữ, kèm audio ViBJT. Nguồn dịch nằm ở `content/sources/decks/src/office-n3-*.txt`.
- Sửa nghĩa cho `v_trade_29d1ec` (便): bản tiếng Anh của ViBJT ghi "train", nhưng câu ví dụ nói về chuyến bay. 9 ngôn ngữ mới dịch theo nghĩa "chuyến bay".
- Tổng hiện có 4 bộ với 779 thẻ. 279 từ trong truyện/video có thêm câu ví dụ và audio.
- Còn lại: Công sở N2 (235 thẻ), N1 (414), Ngữ pháp N3–N1.

## Bộ thẻ có sẵn từ ViBJT — lô 4 (Công sở N2)

- Thêm `content/sources/decks/src/office-n2-1.txt` + `office-n2-2.txt` (235 thẻ): nghĩa + câu ví dụ đủ 9 ngôn ngữ còn thiếu (zh-Hans, zh-Hant, ko, tl, ne, id, pt, my, th), Claude tự dịch.
- Bộ "Tiếng Nhật công sở N2" lên app. Tổng 5 bộ, 1014 thẻ.
- Một số nghĩa tiếng Anh gốc của ViBJT lệch câu ví dụ (ずらす, 貨物, 往復): dịch theo câu tiếng Nhật, không theo bản Anh.
- Câu có cụm tiếng Nhật giữ nguyên (「ご苦労様」) để nguyên chữ Nhật trong bản zh-Hant.

## 2026-11-26 — Furigana cho mọi kanji ở phần Bài học (quy tắc của Việt)

Việt nhắc: mọi chữ kanji trong app phải có furigana, kể cả hội thoại video. Kiểm toàn kho:

- Câu truyện + phụ đề video: 12.238 câu/dòng, **không câu nào thiếu** (mọi đoạn kanji đều có cách đọc, ghép lại khớp đúng câu gốc).
- Chỗ còn thiếu là **thẻ Bài học** (133 gói v2): mẫu ngữ pháp, câu hỏi, các lựa chọn và câu ví dụ hiển thị chữ trơn; danh sách từ vựng hiện cách đọc ở dòng phụ thay vì furigana trên chữ.

Đã sửa:
- `scripts/lesson-furigana.mjs` (mới): sinh `patternFurigana`, `jaFurigana`, `choicesFurigana` cho mọi truyện có lesson. Cách đọc ưu tiên lấy từ chính furigana đã sửa tay trong truyện (tên riêng, 甚右衛門, 酒呑童子…), rồi `phrases` của src.json, rồi kuromoji; có bảng sửa các lỗi kuromoji hay gặp (一人, 一本, 七日, 夜中, 救急車, 何文, 都→みやこ…). Đã đọc lại toàn bộ ~2.000 câu hỏi/lựa chọn.
- `--check` của script chạy trong `npm run qc` → gói nào có kanji trong bài học mà thiếu furigana thì cổng đỏ. Hai bộ dựng truyện (`scripts/story-src/build.mjs`, `scripts/produce/build-story.mjs`) tự gọi script sau khi ghi gói.
- `LessonPanel.tsx`: mẫu ngữ pháp, câu ví dụ (dùng furigana của câu), câu hỏi, lựa chọn và từ vựng đều hiện ruby; nút "Furigana" ẩn/hiện vẫn áp dụng như phần truyện. Hộp tối thêm `on-dark` để chữ ruby đủ tương phản.

## Bộ thẻ có sẵn từ ViBJT — lô 5 (Công sở N1)

- Thêm `content/sources/decks/src/office-n1-1..6.txt` (414 thẻ): nghĩa + câu ví dụ đủ 9 ngôn ngữ còn thiếu, Claude tự dịch.
- Bộ "Tiếng Nhật công sở N1" lên app. Tổng 6 bộ, 1428 thẻ (Kính ngữ + Công sở N5–N1 đã đủ).
- Một số bản tiếng Anh gốc lệch câu Nhật, đã dịch theo câu Nhật: 撤退を決断 (rút lui, không phải từ chức), 取材 (được phỏng vấn), 品質管理 v.v.

## 2026-11-26 — Truyện Kiều (N2, 4 tập, chuẩn v2)

Nguyễn Du (1766–1820), thuộc phạm vi công cộng. Claude tự kể lại bằng văn xuôi tiếng Nhật từ nguyên tác tiếng Việt, không dựa vào bản dịch hiện đại nào. Kệ hometown (VN), series `furusato-vn-kieu`. Tập 1 miễn phí, tập 2–4 VIP.

| Tập | id | Tựa | Câu | Audio | Nội dung |
|---|---|---|---|---|---|
| 1 | furusato-vn-kieu-1 | 清明の約束 | 57 | 5.7 phút | Thanh minh, mộ Đạm Tiên, Kim Trọng, thề nguyền, Bạc mệnh |
| 2 | furusato-vn-kieu-2 | 身を売る決心 | 57 | 5.9 phút | Gia biến, bán mình chuộc cha, trao duyên, Tú Bà, Sở Khanh |
| 3 | furusato-vn-kieu-3 | 刃なき嫉妬 | 57 | 6.2 phút | Thúc Sinh, Hoạn Thư đánh ghen, Giác Duyên, Từ Hải |
| 4 | furusato-vn-kieu-4 | 十五年目の琴 | 60 | 6.4 phút | Báo ân báo oán, Từ Hải chết đứng, sông Tiền Đường, đoàn viên; kết nối với 『風俗金魚伝』 của Bakin |

- Mỗi tập có: dịch và giải thích 10 ngôn ngữ (trích câu thơ gốc ở những đoạn nổi tiếng), bài học 4 ngữ pháp + 4 câu hỏi (đã có furigana), bìa 文庫 font Kaisei HarunoUmi, motif `kieu1`–`kieu4`.
- Giọng đọc: Aoede cho người dẫn truyện; Neural2-B/C cho từng nhân vật, chỉnh pitch riêng.
- Bìa: tựa tiếng Nhật 4 chữ làm dòng phụ dọc chồng lên tranh. Vì vậy tựa đặt từ 5 chữ trở lên.

## Furigana cho mọi chữ kanji (Việt nhắc 26/11)

Quy tắc: chữ kanji hiển thị ở bất kỳ đâu trong app đều phải có furigana.
- Rà dữ liệu: phụ đề video (610 câu) và câu truyện (11.571 câu) đã đủ furigana, 0 kanji trần.
- Thẻ ôn (bộ ViBJT): build-decks sinh furigana bằng kuromoji (`scripts/lib/furigana.mjs`) cho câu ví dụ (`ex.f`), từ chính (`wf`), bảng kính ngữ (`kmf`), dạng ngữ pháp (`formf`); báo số chuỗi còn kanji trần (hiện 0). Thẻ người dùng đã lưu trước đó tự được bổ sung khi mở tab Ôn tập (`refreshPremadeCards`, giữ tiến độ).
- Từ tự lưu và popup tra từ: từ hiện dạng ruby (`src/lib/furigana.ts` alignWord).
- Chế độ lái xe: câu hiện bằng furigana của truyện.
- Tab Bài học: đã xử lý ở PR #39 (furigana nằm trong dữ liệu truyện). Câu nghe thử onboarding: `scripts/gen-placement-furigana.mjs` (prebuild/predev) lấy đúng furigana của câu truyện gốc.

## Thẻ ôn từ ViBJT — lô 6 (Ngữ pháp N3) — 26/11/2026

- Dịch 120 thẻ ngữ pháp N3 (nghĩa mẫu câu + câu ví dụ) sang 9 ngôn ngữ còn thiếu (zh-Hans, zh-Hant, ko, tl, ne, id, pt, my, th): `content/sources/decks/src/grammar-n3-1.txt`, `grammar-n3-2.txt` → `tr/*.jsonl`.
- Dựng lại bộ thẻ: thêm `public/decks/grammar-N3.json` (7 bộ, 1.548 thẻ). Mọi câu ví dụ có furigana (0 kanji trần).
- Còn lại: Ngữ pháp N2 (194) và N1 (143).

## Trạng Quỳnh — series N4, 3 tập (Việt yêu cầu 26/11, "bé rất thích nghe")

Series `furusato-vn-quynh`, kệ truyện quê hương (VN), N4, kể lại bằng tiếng Nhật dễ cho thiếu nhi từ giai thoại dân gian về Nguyễn Quỳnh (1677–1748), thuộc phạm vi công cộng.

| Tập | id | Tựa | Audio | Nội dung |
|---|---|---|---|---|
| 1 (miễn phí) | furusato-vn-quynh-1 | 石の芽の料理 | 5.1 phút | Lừa thầy đồ ra khỏi phòng; chúa Trịnh ăn "mầm đá", hũ tương "Đại phong" (大風) |
| 2 | furusato-vn-quynh-2 | 殿様のねこ | 5.1 phút | Dạy mèo quý của chúa chỉ ăn cơm, thắng phép thử hai bát |
| 3 | furusato-vn-quynh-3 | 十ぴきの竜 | 5.3 phút | Mười ngón tay vẽ mười con giun = 地竜 (địa long); câu đố gốc/ngọn khúc gỗ |

- Chỉnh cho thiếu nhi: tập 2 không đánh mèo (Quỳnh lấy tay che bát), kết bằng việc Quỳnh trả mèo và xin chúa chia cá gạo cho trẻ nghèo. Bản gốc Quỳnh giữ luôn mèo; sourceNote ghi rõ chỗ đổi.
- Chơi chữ "Đại phong → lọ tương" không dịch được sang tiếng Nhật; phần giải thích tiếng Việt nói rõ. Ở tập 3, 地竜 là tên thật của giun đất trong sách thuốc, nên trò chơi chữ đứng được trong tiếng Nhật.
- Mỗi tập: dịch và giải thích 10 ngôn ngữ, bài học 4 ngữ pháp + 4 câu hỏi (có furigana), bìa 文庫 font Mochiy Pop P One, motif mới `quynh1`–`quynh3`.
- Giọng: Aoede dẫn truyện; Quỳnh Neural2-C (p+3); chúa C (p-3); thầy đồ C (p-6); sứ thần C (rate 0.92, p-9). QC chuẩn v2 chỉ nhận Aoede/Neural2-B/Neural2-C, nên không dùng Neural2-D.
- Dừng ở 3 tập để tránh gán nhầm giai thoại không chắc là của Trạng Quỳnh. Tập 3 kết bằng "tạm kết, còn nhiều chuyện nữa", nên có thể làm thêm nếu cần.

## Thẻ ôn từ ViBJT — lô 7 (Ngữ pháp N2) — 26/11/2026

- Dịch 194 thẻ ngữ pháp N2 (nghĩa mẫu câu + câu ví dụ) sang 9 ngôn ngữ còn thiếu: `content/sources/decks/src/grammar-n2-1..3.txt` → `tr/*.jsonl`.
- Thêm `public/decks/grammar-N2.json` (8 bộ, 1.742 thẻ). Furigana: 0 chuỗi còn kanji trần.
- Còn lại: Ngữ pháp N1 (143).

## Thẻ ôn từ ViBJT — lô 8 (Ngữ pháp N1, hoàn tất) — 26/11/2026

- Dịch 143 thẻ ngữ pháp N1 sang 9 ngôn ngữ còn thiếu: `content/sources/decks/src/grammar-n1-1..2.txt` → `tr/*.jsonl`.
- Thêm `public/decks/grammar-N1.json`. Tổng: **9 bộ, 1.885 thẻ**, đủ 11 ngôn ngữ (build báo thiếu 0 nghĩa, 0 câu ví dụ), furigana 0 kanji trần.
- Bản tiếng Anh gốc lệch câu Nhật ở 2 thẻ, đã dịch theo câu Nhật: 移転に伴い (chuyển địa điểm, không chỉ trụ sở), 周囲の心配をよそに独立した (ra làm riêng, không phải dọn ra ở riêng).

## Hoàng Lê nhất thống chí — tiểu thuyết Việt Nam N1, 3 tập (Việt chọn 26/11)

Kể lại hồi 14 (đoạn Quang Trung đại phá quân Thanh) bằng tiếng Nhật N1, từ nguyên tác public domain (Ngô gia văn phái), không dựa trên bản dịch hiện đại. Kệ `hometown`, origin VN, series `furusato-vn-hoangle`.

| Tập | ID | Nội dung | Câu / ký tự | Audio |
| --- | --- | --- | --- | --- |
| 1 (free) | `furusato-vn-hoangle-1` | Tôn Sĩ Nghị chiếm Thăng Long, Nguyễn Huệ lên ngôi Quang Trung, tuyển quân Nghệ An, gặp La Sơn phu tử | 60 | 7,2 phút |
| 2 | `furusato-vn-hoangle-2` | Đến Tam Điệp 30 tháng Chạp, tha tội Sở và Lân, khen kế Ngô Thì Nhậm, ăn Tết sớm hẹn mùng 7, phá đồn Hà Hồi không mất một người | 60 / 2032 | 7,0 phút |
| 3 | `furusato-vn-hoangle-3` | Mộc ván phủ rơm ướt đánh Ngọc Hồi, Sầm Nghi Đống thắt cổ, Tôn Sĩ Nghị bỏ chạy, cầu phao đứt, Lê Chiêu Thống sang Tàu, vào Thăng Long trưa mùng 5, cầu hòa | 64 / 2053 | 7,3 phút |

- Đủ chuẩn v2: dịch và giải thích 10 ngôn ngữ, bài học 4 ngữ pháp + 4 câu hỏi, bìa 文庫 (motif `hoangle1`–`hoangle3`), chỉ giọng Aoede và Neural2-C (nhân vật phân biệt bằng pitch và tốc độ).
- Chi tiết truyền thuyết (võng khiêng quân, áo bào sạm đen khói súng) được ghi rõ là lời truyền tụng trong ghi chú câu và `sourceNote`.
- Lỗi đọc sửa bằng `phrases`: 清 しん, 民 たみ, 戦 いくさ/たたかい, 大将, 後を あと, 数知れず かず. Bỏ phrase thừa 「この戦」 từ tập 1.

## Ẩn 24 bài luận N1/N2 cũ dạng 8 câu — 26/11/2026

Việt cho phép bỏ hoặc làm lại truyện của Muse không đạt chuẩn. 24 gói N1/N2 (12 N1 + 12 N2: the-aging-society, the-interpreter, the-narrow-road, the-job-change, the-mentor…) chỉ có 8 câu, 104–188 ký tự. Chuẩn v2 đòi N2 ≥1500 và N1 ≥2000 ký tự, nên đây là đoạn tóm tắt gắn nhãn cấp cao chứ không phải bài đọc N1/N2.

- Thêm cả 24 id vào `content/hidden-stories.json` với giá trị `null` (cho nghỉ). Chỉ ẩn, không xoá: link cũ vẫn mở, trang để noindex.
- `src/lib/paths.ts`: gỡ các id này khỏi lộ trình Đi làm, Gia đình và Giải trí. Phần cấp cao của lộ trình Giải trí thay bằng tập 1 của Số đỏ, Truyện Kiều và Hoàng Lê (đều chuẩn v2).
- Sau khi ẩn, kệ đang hiện: N2 có 10 gói v2 + 0 gói cũ, N1 có 3 gói v2. Cần thêm truyện N1 (ứng viên: truyện ngắn Thạch Lam, văn học Nhật public domain).

## Truyện ngắn Thạch Lam — N1, 3 truyện (26/11/2026)

Thêm truyện N1 để bù kệ N1 sau khi ẩn bài luận cũ. Thạch Lam mất 1942 nên tác phẩm đã thuộc public domain. Mỗi truyện được kể lại bằng tiếng Nhật N1 từ nguyên tác tiếng Việt, có giản lược và ghi rõ trong `sourceNote`. Kệ `hometown`, origin VN, series `furusato-vn-thachlam`.

| # | ID | Truyện | Câu / ký tự | Audio | Commit |
| --- | --- | --- | --- | --- | --- |
| 1 (free) | `furusato-vn-thachlam-1` | Hai đứa trẻ (夜汽車を待つ子) | 61 / 2023 | 6,8 phút | bc47f6b |
| 2 | `furusato-vn-thachlam-2` | Gió lạnh đầu mùa (初冬の冷たい風) | 60 / 2018 | 6,7 phút | de6b69c |
| 3 | `furusato-vn-thachlam-3` | Dưới bóng hoàng lan (ホアンランの木陰で) | 61 / 2078 | 7,1 phút | c557f8a |

- Đủ chuẩn v2: dịch và giải thích 10 ngôn ngữ, bài học 4 ngữ pháp + 4 câu hỏi, bìa 文庫 (motif `thachlam1`–`thachlam3`, mỗi truyện một font), chỉ giọng Aoede, Neural2-B và Neural2-C.
- atLevel N1 của tập 3 ban đầu chỉ 3,4%, đã nâng lên 5,4% bằng từ N1 tự nhiên (郷愁, 素朴, 趣, 名残, 傍ら, 惜しむ).
- Sửa romaji bằng `phrases`: ガーはね → "wa ne", じんわり, 取るに足りない, もう少し, タンさん.
- Kệ N1 hiện có 6 gói v2 (Hoàng Lê ×3, Thạch Lam ×3).

## Đăng nhập, VIP theo tài khoản, chặn VIP ở máy chủ, deploy Cloudflare — 26/11/2026

Việt giao đấu nối Firebase, Cloudflare và SePay, học theo ViBJT. Bài học từ ViBJT: VIP phải gắn với **tài khoản** chứ không với máy, để người mua VIP trên web cài bản iOS rồi đăng nhập vẫn giữ VIP.

- **Firebase** project `miraigo-vimai` (gói Spark miễn phí, cùng tài khoản với ViBJT). Đăng nhập Google + email/mật khẩu, Apple để bản iOS. Firestore Tokyo, rules ở `firestore.rules` (chỉ chủ tài khoản đọc/ghi `users/{uid}/progress/main`). Cấu hình web công khai ở `src/lib/firebase-config.ts`.
- **Đăng nhập tuỳ chọn** (`src/lib/account.ts`, `AccountSheet`, `AccountCard` ở tab Tôi): SDK Firebase nạp động nên trang danh sách không nặng thêm. Cảnh báo khi mở trong Facebook/Zalo (chặn đăng nhập Google). Có nút **Xoá tài khoản** (yêu cầu của Apple). `/__/auth/*` chạy trên chính tên miền app như ViBJT.
- **Đồng bộ tiến độ** (`src/lib/cloud-sync.ts`, `src/lib/sync-merge.ts` + `tests/sync-merge.test.ts`): hồ sơ, thẻ ôn, hoạt động, tiến độ bài, video tự thêm. Gộp không mất dữ liệu; nén gzip để vừa 1 MiB của Firestore.
- **VIP web** dùng hệ VIP chung trên vimai.jp (vimai-ecosystem `docs/WEB_VIP.md`): chuyển khoản VietQR, SePay báo vimai.jp, VIP ghi vào D1 `vimai-cms` theo uid. Giá Việt chốt 26/11: 159.000đ / 749.000đ / 1.299.000đ (1/6/12 tháng), gạch giá gấp đôi tới hết đợt ra mắt. Không tự gia hạn; mua thêm thì cộng nối hạn. Màn cảm ơn `VipWelcome` khi tiền về. Bản iOS giữ giá yên (IAP, chưa nối).
- **Chặn VIP ở máy chủ** (ux-plan mục 6): `src/lib/gate.ts` cắt phần VIP khỏi trang tĩnh (video VIP chỉ còn 2 câu đầu, chương VIP không còn câu nào). `scripts/gen-locked.mjs` (postbuild) ghi phần VIP vào `out/_locked/` và tự kiểm không trang nào lộ câu VIP. Worker `worker/index.ts` chặn `/_locked/*`, chỉ trả nội dung qua `/api/content/<kind>/<id>` khi ID token hợp lệ và tài khoản có VIP còn hạn. Đã thử bằng `wrangler dev`: `/_locked` 404, không token 401. `tests/worker.test.ts`.
- **Deploy**: Next `output: "export"` (bỏ `cacheComponents`/`partialPrefetching`, không chạy được ở chế độ export) + Workers Static Assets, `wrangler.toml`, tên miền `miraigo.vimai.jp`. Video tự thêm đổi từ `/watch/custom-<id>` sang `/watch/custom?v=<id>` (trang tĩnh không có id động). Cách deploy ở `docs/deploy.md`.
- Còn lại: audio của chương VIP vẫn là file tĩnh công khai (chỉ chữ được chặn); ngữ pháp/câu hỏi của chương miễn phí vẫn chặn phía máy khách. Đưa audio VIP qua Worker khi chuyển audio sang R2.

## Thêm tiếng Sinhala (Sri Lanka) cho giao diện — 26/11/2026

- Việt hỏi đủ ngôn ngữ chưa (có nhắc Sri Lanka): giao diện có 11 thứ tiếng nhưng thiếu Sinhala.
- Thêm `src/i18n/locales/si.json` (đủ khoá như `en.json`, Claude tự dịch và tự rà), đăng ký `si` trong
  `LANGUAGE_CODES` và `LANGUAGE_NAMES` ("සිංහල"), thêm câu Sinhala cho 3 câu xếp lớp ở `src/lib/placement.ts`.
- Bản dịch nội dung truyện/video hiện chỉ có vi/en/id; Sinhala và các tiếng khác đang rơi về tiếng Anh (pickText).
- `npm run verify` xanh.

## Tiêu đề tab theo ngôn ngữ + lỗi hydrate ở tab Tôi — 26/11/2026

- Tiêu đề tab trình duyệt luôn là tiếng Việt (trang tĩnh xuất sẵn cho SEO). Thêm `src/components/DocTitle.tsx`:
  khi chọn ngôn ngữ khác tiếng Việt thì đổi tiêu đề trên máy (trang chung theo `app.tagline`, Lộ trình theo
  `paths.title`, truyện/video theo tên bài qua `useDocTitle`), giữ tiêu đề khi Next ghi lại thẻ `<title>`.
- Lỗi React #418 ở `/profile` (bản dịch khác vi): `useAccount` trả object mới mỗi lần gọi getServerSnapshot.
  Sửa bằng hằng `SERVER_STATE` trong `src/lib/account.ts`. Gốc thứ hai: thanh tab nằm trong <Suspense> nên hydrate sau khi ngôn ngữ đã đổi; lần hydrate đầu dùng chữ tiếng Việt cho khớp HTML tĩnh. Đã kiểm bằng Playwright trên bản build (Indonesia): hết lỗi.
- `npm run verify` xanh.

## Sửa theo góp ý của Việt sau khi xem bản web — 26/11/2026

- Biểu tượng tab trình duyệt là chữ "N" mặc định của Next: thay bằng logo MiraiGo của Việt
  (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`; logo trang chủ `public/logo-192.png`).
- Bỏ màn "Kế hoạch của bạn" (chỉ có 2 nút, khách không được chọn): xong onboarding vào thẳng trang chủ.
- Truyện VIP trước đây bấm vào là bật màn mua ngay, 0 câu. Nay khách đọc và nghe thử 3 câu đầu
  (`FREE_STORY_SENTENCES` trong `src/lib/access.ts`, `gateStory` trong `src/lib/gate.ts`), trình phát dừng ở cuối
  câu 3 (`endAt`), phía dưới mờ dần và có nút "Mở khoá VIP". gen-locked kiểm thêm: câu thứ 4 trở đi không có trong trang tĩnh.
- "Thêm video YouTube của bạn" tạm ẩn: chưa có máy dựng phụ đề tự động, video thêm vào chỉ phát trống.
- Đăng nhập (học ViBJT): nút "Đăng nhập" ở đầu trang chủ; màn chọn gói VIP nói rõ phải đăng nhập và nút mua
  mở đăng nhập trước, xong thì sang bước chuyển khoản; tab Tôi hiện tên/email tài khoản thay cho chữ "MiraiGo".
- Phần video (phụ đề YouTube che hình, tua ra ngoài đoạn cắt) chuyển cho luồng video.
- `npm run verify` xanh.

## Chưa ra mắt: tắt bán VIP web và chặn lập chỉ mục — 27/11/2026

- Việt 27/11: "data còn đang quá mỏng, không thể tung ra thị trường". SePay qua vimai.jp đã nối thật, nên tắt bán:
  cờ `PRELAUNCH` trong `src/lib/firebase-config.ts`. Màn VIP vẫn hiện giá nhưng nút mua thành "Sắp mở bán" (khoá).
- Cùng cờ đó: `robots.txt` chặn mọi máy tìm kiếm và mọi trang có `noindex, nofollow`.
- Mở bán: đổi `PRELAUNCH = false`, deploy lại.

## Bỏ nhãn VIP trên bìa và danh sách — 27/11/2026

- Việt: không hiện VIP ngay từ ảnh bìa, cho khách đọc thử vài câu rồi mới mời mua. Bỏ nhãn VIP ở bìa truyện
  (`StoryCover`), ảnh video, danh sách lái xe và lộ trình; chỉ còn nhãn "Miễn phí". Phần đọc thử 3 câu giữ nguyên.
## Truyện: bìa cho mọi gói, bỏ nhãn VIP trên bìa, cân lại free/VIP — 26/11/2026

Việt xem bản web và đánh giá "chưa đạt": nhiều sách chưa có bìa, truyện VIP bấm vào là bắt mua, nội dung mỏng.
Kiểm kê lúc bắt đầu: 492 truyện đang hiện; 347 gói cũ của Muse chỉ ~10 câu, chỉ có vi/en, không bìa; N4 chỉ 3/264 truyện miễn phí.

- **Bìa cho cả 347 gói cũ** (`scripts/covers/render-old.mjs`, dữ liệu `content/sources/old-covers/covers.tsv`): kiểu 文庫 đã duyệt,
  tựa Nhật dọc, một ấn tròn đỏ mang chữ Hán gợi truyện (羅生門 → 門, ごんぎつね → 狐), hoa văn nền đổi theo id, phông đổi theo truyện
  (26 phông; Mai-chan dùng 6 phông tròn kèm hình Mai). Motif mới `mon`/`monmai` trong `scripts/covers/cover.html`; tựa Nhật dài
  (10–14 chữ) có cỡ chữ nhỏ hơn. Trường `cover` của gói đổi từ mô tả ảnh sang `/covers/<id>.webp`. Nay 492/492 truyện có bìa.
- **Bỏ nhãn VIP trên bìa** (`StoryCover`) theo ý Việt: truyện nào cũng mở được, đọc và nghe thử 3 câu rồi mới hiện lời mời VIP.
  Lộ trình (`PathClient`) cũng mở trang đọc thay vì bật màn mua ngay.
- **Free/VIP**: gói cũ ngắn (~10 câu) chuyển hết sang miễn phí, vì không đáng thu tiền. VIP chỉ còn các gói chuẩn v2 (30–60 câu,
  audio liền, bài học, 11 ngôn ngữ), tập 1 mỗi bộ vẫn miễn phí. N4: 204/208 miễn phí, N3 69/119, N2 3/10, N1 2/6.
- Việc tiếp: sản xuất thật nhiều truyện v2 (truyện cổ thế giới, triết lý sống public domain, truyện Việt, văn học Nhật làm lại bản dài),
  rồi thay dần gói cũ.
- `npm run verify` xanh.

## Kệ truyện cổ thế giới: Lọ Lem, Bạch Tuyết bản dài N4 — 27/11/2026
- 4 truyện v2 mới trên kệ `world` (id tiền tố `world-`, thread truyện cổ thế giới cấp):
  - `world-cinderella-1` (miễn phí), `world-cinderella-2` (VIP): Lọ Lem theo Perrault 1697.
  - `world-shirayuki-1` (miễn phí), `world-shirayuki-2` (VIP): Bạch Tuyết theo Grimm 1857. Kết đôi giày sắt nung được làm nhẹ đi: hoàng hậu bỏ trốn.
- Mỗi truyện 50–56 câu, audio liền 1 file (Aoede kể, thoại Neural2-B/C đổi cao độ theo vai), bài học 4 điểm ngữ pháp + 4 câu hỏi, 10 ngôn ngữ (+ zh-Hant tự sinh), furigana mọi chữ Hán, bìa 文庫 riêng (giày thủy tinh, gương, táo).
- Gói cũ ~10 câu `cinderella`, `snow-white` ẩn và trỏ sang bản mới qua `content/hidden-stories.json`.
- Công cụ mới: `scripts/story-src/tr-txt.mjs` (viết bản dịch dạng khối văn bản thay JSON), `scripts/story-src/gloss-add.mjs` (thêm từ vào glossary kệ).
- Muse/thread khác: chưa có Sinhala cho 4 truyện này; id `world-` do thread truyện cổ thế giới cấp, đừng dùng trùng.

## Mai-chan v2 tập 5–10 (N5), thay 7 tập cũ 8 câu — 27/11/2026

- 6 tập mới, mỗi tập 38–40 câu, 690–760 ký tự, audio liền 2,4–2,6 phút (Aoede kể, Neural2-B/C cho từng nhân vật), bài học 4 điểm ngữ pháp
  + 4 câu hỏi, 11 ngôn ngữ, furigana mọi chữ Hán, bìa 文庫 riêng (motif `mai05`–`mai10` trong `scripts/covers/cover.html`):
  05 ころころおにぎり (cơm nắm lăn xuống dốc trong buổi dã ngoại), 06 あいあいがさ (che chung ô, cầu vồng), 07 おかゆとさとう (mẹ ốm,
  Mai nấu cháo, suýt cho đường), 08 トマトくん (Bin ghét cà chua đến khi tự trồng), 09 タマはどこ？ (đi tìm mèo, bố mắc kẹt trên cây),
  10 お父さん二号 (tuyết đầu mùa, người tuyết giống bố). Tập 5–10 là VIP (đọc thử 3 câu), tập 1 bộ vẫn miễn phí.
- Ẩn 7 gói cũ qua `content/hidden-stories.json`: mai-chan-ep03/04/08/11/13/15/17 → maichan-05…10. Lộ trình "Gia đình" đổi
  mai-chan-ep08-sick-mom → maichan-07.
- Sửa câu hỏi bài học: trước đây đáp án đúng luôn ở vị trí đầu (app không xáo trộn). Nay xoay vị trí đáp án cho cả tập 1–10.
- Đăng ký trong khối đánh dấu riêng "làm lại Mai-chan + văn học Nhật" ở `src/lib/content.ts`.

## Kệ mới "Triết lý sống" (wisdom), lô 1 — 27/11/2026

- Việt muốn có sách triết lý đời sống, kiểu "nghĩ giàu làm giàu" hay "nóng giận là bản năng". Các sách đó còn bản quyền nên không dùng. Kệ này chỉ dùng tác phẩm public domain (Epictetus, Lão Tử, sau đó Marcus Aurelius, Seneca, Wattles, James Allen, Samuel Smiles, 学問のすゝめ…) và bài viết gốc của ViMai.
- Code đã sửa:
  - Thêm kệ `wisdom` vào `content-schema.ts`, `shelves.ts` (sau `world`; hiện cho người chọn sở thích văn học hoặc đời sống) và tên kệ ở 12 locale.
  - `register.mjs --block=wisdom` có khối đăng ký riêng trong `content.ts` (khối W).
  - Thêm motif bìa `chain`, `drop`, `letter`.
- Lô 1 có 4 chương chuẩn v2:
  - `life-epictetus-1` (N3, miễn phí) và `life-epictetus-2` (N3, VIP)
  - `life-roshi-1` (N3, miễn phí)
  - `life-ikari-1` (N4, miễn phí, truyện gốc)
- QC từng chương nằm ở `content/stories/life-*.qc.md`.
- Id có dạng `life-<tác phẩm>-<n>` và chỉ luồng kệ W được cấp.
- `npm run verify` xanh.

## 2026-11-27 — Xáo đáp án câu hỏi Bài học (branch claude/quiz-shuffle)

- Phát hiện: ở 55/155 gói v2, đáp án đúng luôn nằm ở vị trí A (320/617 câu có answer=0), người học đoán được mà không cần đọc.
- Sửa: `src/lib/shuffle.ts` (`seededOrder`) xáo thứ tự đáp án cố định theo `story.id` + số câu hỏi, nên lần nào mở lại cũng cùng thứ tự và không lệch khi hydrate. `LessonPanel.tsx` hiển thị theo thứ tự đã xáo; chữ A/B/C theo vị trí hiển thị, còn chấm điểm và furigana vẫn theo chỉ số gốc. Dữ liệu nội dung không đổi.
- Test: `tests/shuffle.test.ts`.
## Kệ ma & trinh thám — lô 1 (truyện ma 小泉八雲) — 26/11/2026

Việt muốn kho truyện dày và hay hơn nhiều. Luồng này làm kệ ma (`shelf: ghost`) và trinh thám (`shelf: mystery`), id `mystery-<tác phẩm>-<n>`.

- **Bản quyền**: 小泉八雲 (mất 1904), Conan Doyle (mất 1930) hết bản quyền mọi nơi; 江戸川乱歩 (mất 1965) hết ở Nhật, ở Mỹ chỉ dùng tác phẩm in trước 1931 (二銭銅貨 1923, D坂 1925, 心理試験 1925…); không dùng 怪人二十面相 (1936). Truyện tiếng Anh do Claude tự kể lại bằng tiếng Nhật, không dùng bản dịch nào.
- **3 gói v2**: `mystery-hoichi-1/2` (耳なし芳一, N3, tập 1 miễn phí), `mystery-mujina-1` (むじな, N4, miễn phí). Mỗi gói 45–56 câu, audio liền 4–6 phút, 11 ngôn ngữ, bài học, `.qc.md`.
- **Gói cũ bị thay**: `miminashi-hoichi`, `mujina` (~10 câu) ẩn qua `content/hidden-stories.json`, trỏ sang bản mới.
- **Công cụ**: `scripts/produce/register.mjs --block=ma` đăng ký vào khối riêng `kệ ma & trinh thám` trong `src/lib/content.ts`, không đụng khối A/E. Motif bìa mới trong `scripts/produce/cover.html`: `biwa`, `lens`, `coin`, `noface`.
- Tiếp: シャーロック・ホームズ「赤毛組合」(N3), 乱歩「二銭銅貨」(N2), ろくろ首, 食人鬼, 茶碗の中, 青いガーネット, D坂の殺人事件, 心理試験.

## Tiếng Sinhala (si) cho truyện v2, đợt 1: 24 gói tập 1 / miễn phí — 27/11/2026 (nhánh `claude/si-stories-free`)

- **Cách lưu bản dịch (sidecar):** mỗi gói có file `content/translations/si/<id>.tsv`, gồm tên truyện, câu dịch, ghi chú ngữ pháp, nghĩa từ vựng, điểm ngữ pháp và lời giải câu hỏi. Nghĩa từ vựng dùng chung cho cả kho, nên mỗi nghĩa tiếng Anh chỉ dịch một lần. `node scripts/i18n/apply.mjs si` gộp bản dịch vào JSON của gói. Dòng `#@src` lưu dấu vân tay của gói gốc: nếu gói bị dựng lại, câu bị xê dịch thì QC báo lỗi, không để lệch câu.
- `scripts/story-src/build.mjs` và `scripts/produce/build-story.mjs` tự áp lại sidecar sau khi dựng gói, nên dựng lại không làm mất bản dịch. `npm run qc` thêm bước `apply.mjs si --check`.
- **24 gói đã dịch:** maichan-01–04, botchan-1, budori-1, rakugo-toki-soba, rakugo-shinigami-1, osaka-hataraku-01, hanshichi-ofumi-1, hanshichi-yukidaruma-1, madara-1, jigokuhen-1, mukashi-momotaro-1, mukashi-urashima-1, mukashi-yuki-onna-1, mukashi-shuten-1, mukashi-ushiwaka-1, mukashi-anju-zushio-1, furusato-vn-tamcam-1, furusato-vn-quynh-1, furusato-vn-hoangle-1, furusato-vn-kieu-1, furusato-vn-thachlam-1.
- **Văn phong:** truyện thiếu nhi (Mai-chan) dùng khẩu ngữ. Phần kể của văn học, lịch sử N1–N2 dùng văn viết, lời thoại giữ khẩu ngữ. Ghi chú ngữ pháp giữ nguyên đoạn tiếng Nhật, chỉ dịch phần giải thích. Tên riêng được phiên âm thống nhất (ví dụ ත්‍රින් = Trịnh, ක්වාං චුං = Quang Trung).
- **Lỗi nguồn phát hiện (chưa sửa, vùng nội dung):** `furusato-vn-quynh-1` câu 37: ghi chú tiếng Anh ghi `〜はじめる = start to`, nhưng câu dùng 煮つづける. Bản si dịch đúng theo 〜つづける.
- `npm run verify` xanh: 712 gói, 0 lỗi; sidecar si 24 gói, 0 lỗi; build OK.
- **Còn lại:** khoảng 121 gói v2 khác, cộng 4 gói world- mới (world-cinderella-1/2, world-shirayuki-1/2), Mai-chan v2 tập 5–10 và kệ wisdom. Sau đó rà các ngôn ngữ khác còn thiếu trong các gói này.

## Tiếng Sinhala đợt 2a: 4 truyện cổ thế giới + sidecar không chặn luồng khác — 27/11/2026 (nhánh `claude/si-stories-2`)

- Dịch tiếng Sinhala 4 gói: world-cinderella-1, world-cinderella-2, world-shirayuki-1, world-shirayuki-2 (luồng kệ thế giới nhờ).
- **Đổi cách kiểm sidecar:** dòng `#@src` (dấu vân tay cả gói) được thay bằng `#@h`, lưu băm tiếng Anh của **từng ô**. Trước đây, nếu một luồng khác sửa câu hay thêm câu vào gói đã dịch thì cổng `npm run verify` của luồng đó sẽ đỏ. Giờ ô nào đổi thì bản si cũ của ô đó bị bỏ, app tự hiện tiếng Anh, và QC chỉ **cảnh báo**, không chặn. `extract.mjs` in các ô đổi kèm bản cũ để dịch lại; dịch xong thì chạy `apply.mjs si <id> --rehash`. Đã thử: sửa 1 câu và thêm 1 câu thì ra cảnh báo 3 ô, cổng vẫn xanh.

## Văn học Nhật v2: ごんぎつね 2 tập (N4), thay gói cũ 13 câu — 27/11/2026

- Nhánh `claude/bungaku-v2-batch1`. Nguồn mới ở `content/sources/bungaku/` (glossary riêng, chép từ Mai-chan + từ N4).
- `gongitsune-1` (54 câu, 1.212 ký tự, harder 11,9%, audio 3,9 phút) và `gongitsune-2` (48 câu, 1.230 ký tự, harder 9,9%, audio 3,8 phút).
  Phỏng theo 新美南吉 (mất 1943, xuất bản 1932; public domain ở Nhật, và ở Mỹ vì tác giả mất trước 1946 nên không bị URAA phục hồi). Giữ hai câu kết gốc.
- Tên riêng viết katakana (ヒョウジュウ, カスケ) để chỉ số độ khó không đếm 兵/助 là N3; tập 1 miễn phí, tập 2 VIP.
- Giọng: Aoede kể chuyện; ごん Neural2-C cao giọng, ヒョウジュウ/カスケ/いわし屋 Neural2-C các cao độ khác nhau.
- Bìa: motif mới `gon1` (ban ngày) và `gon2` (đêm trăng, khói súng) trong `scripts/covers/cover.html`, font Shippori Mincho B1.
- Bài học 4 điểm ngữ pháp + 5 câu hỏi mỗi tập, vị trí đáp án đúng xoay vòng.
- Ẩn gói cũ `gongitsune` → `gongitsune-1` qua `content/hidden-stories.json`. Đăng ký trong khối "làm lại Mai-chan + văn học Nhật".
- `npm run verify` xanh.

## Kệ ma & trinh thám — lô 2 (Sherlock Holmes「赤毛組合」) — 26/11/2026

- Lô 1 (PR #62: `mystery-hoichi-1/2`, `mystery-mujina-1`) đã gộp vào main.
- Thêm `mystery-akagami-1` (N3, 55 câu, 6:07, miễn phí) và `mystery-akagami-2` (N3, 52 câu, 5:11, VIP): bản kể lại tiếng Nhật dễ của "The Red-Headed League" (Doyle 1891, public domain). Chi tiết ở `content/stories/mystery-akagami-*.qc.md`.
- `register.mjs`: gộp với cơ chế `--block` của luồng Triết lý sống; thêm khóa `ma` → khối "kệ ma & trinh thám".
- ID đã cấp cho kệ này (để luồng khác không trùng): `mystery-hoichi-*`, `mystery-mujina-*`, `mystery-akagami-*`; sắp tới `mystery-nisen-*` (二銭銅貨), `mystery-rokuro-*`, `mystery-chawan-*`, `mystery-garnet-*`, `mystery-dzaka-*`, `mystery-shinri-*`.
## Kệ truyện cổ thế giới đợt 2: Hansel & Gretel, Cô bé quàng khăn đỏ — 27/11/2026
- `world-hansel-1` (miễn phí), `world-hansel-2` (VIP): Hansel & Gretel theo Grimm 1857, N4, 53–54 câu mỗi tập. Kết bỏ chi tiết mẹ kế chết, chỉ nói bà không còn ở nhà.
- `world-akazukin` (N5, miễn phí): Cô bé quàng khăn đỏ theo Grimm (thợ săn cứu, nhét đá vào bụng sói), 44 câu, cho người mới bắt đầu (kệ N5 đang thiếu).
- Gói cũ `hansel-and-gretel`, `akazukin` ẩn, trỏ sang bản mới.
- Bìa mới: nhà bánh kẹo, lò nướng, cô bé mũ đỏ (motif `candyhouse`, `oven`, `redhood` trong `scripts/covers/cover.html`).
- `scripts/story-src/build.mjs`: romaji こんにちは → konnichiwa, こんばんは → konbanwa (trước đây ra "konnichiha"). Chỉ ảnh hưởng truyện dựng lại sau này.
- Glossary kệ `world` thêm ~50 từ cơ bản N5/N4 để truyện N5 có đủ nghĩa từ vựng.

## Tiếng Sinhala đợt 2b: 5 gói — 27/11/2026 (nhánh `claude/si-stories-3`)

- Đã dịch: mukashi-momotaro-2, mukashi-urashima-2, world-akazukin, world-hansel-1, world-hansel-2.
- **Lỗi nguồn (chưa sửa, vùng glossary):** từ はさみ trong `world-akazukin` (câu 37, nghĩa là cái kéo) đang mang nghĩa glossary "pincer (はさみうち: attack from both sides)". Bản si ghi "කතුර (kéo), අඬුව (càng)". Nên sửa nghĩa en trong glossary thành "scissors".

## Kệ truyện cổ thế giới: Nhạc sĩ thành Bremen — 27/11/2026
- `world-bremen` (N5, miễn phí, 42 câu) theo Grimm 1857; gói cũ `bremen-musicians` ẩn, trỏ sang bản mới. Bìa motif `bremen`.
- Sửa glossary kệ world: はさみ = cái kéo (trước bị gán nghĩa はさみうち), thread Sinhala báo.

## Kệ truyện cổ thế giới đợt 3: Nàng tiên cá, Jack và cây đậu thần — 27/11/2026
- `world-ningyo-1` (N3, miễn phí, 51 câu) và `world-ningyo-2` (N3, VIP, 56 câu): Andersen 1837, giữ đúng kết thúc gốc (thành con gái của không trung), không theo phim hoạt hình. Gói cũ `ningyo-hime` và `the-little-mermaid` ẩn, trỏ sang tập 1.
- `world-jack` (N3, VIP, 51 câu): bản Joseph Jacobs 1890 (túi vàng, gà đẻ trứng vàng, đàn hạc biết hát). Gói cũ `jack-and-the-beanstalk` ẩn, trỏ sang bản mới. Viết ban đầu cho N4 nhưng từ khoá 豆/牛/金 đẩy tỉ lệ từ khó lên 32%, nên xếp N3 (3,7%).
- Bìa: motif mới `mermaid`, `seafoam`, `beanstalk` trong scripts/covers/cover.html. Glossary kệ world thêm 9 từ (交換, いびき, たてごと, おの…).
## Kệ truyện cổ thế giới đợt 4: Mèo đi hia, Rapunzel, Aladdin 2 tập — 27/11/2026
- `world-nagagutsu` (N3, VIP, 49 câu, Perrault 1697, cờ FR). Gói cũ `puss-in-boots` ẩn, trỏ sang bản mới.
- `world-rapunzel` (N3, VIP, 50 câu, Grimm 1857, cờ DE). Gói cũ `rapunzel` ẩn, trỏ sang bản mới.
- `world-aladdin-1` (N3, miễn phí, 48 câu) và `world-aladdin-2` (N3, VIP, 49 câu): series `world-aladdin`, theo bản Galland/Nghìn lẻ một đêm (không gắn cờ quốc gia). Chưa có gói Aladdin cũ.
- Cả bốn viết nhắm N4 nhưng từ khoá (宝石, 魔法使い, 侯爵…) vượt ngưỡng từ khó, nên xếp N3 (harder 3–9%).
- build.mjs: thêm ROMAJI_FIX cho じつは, あっという間, 本当は, ラプンツェル. Bìa: motif mới `pussboots`, `tower`, `lamp`, `palace`. Glossary world thêm 息子, 侯爵, 馬車, 粉屋, 働き, はめる, ワイン…

## Kệ truyện cổ thế giới đợt 6: Vasilisa (Nga), Khỉ và cá sấu (Ấn Độ), Pinocchio (Ý) — 27/11/2026
- `world-vasilisa-1` (miễn phí, 47 câu) và `world-vasilisa-2` (VIP, 47 câu), N3, series `world-vasilisa`, truyện dân gian Nga trong tuyển tập Afanasyev (cờ RU). Chưa có gói cũ.
- `world-saru-wani` (VIP, 46 câu), N3, Panchatantra (cờ IN). Bản nháp N4 vượt ngưỡng từ khó (実, 心臓, 岸 là N3) nên xếp N3.
- `world-pinocchio-1` (miễn phí, 48 câu) và `world-pinocchio-2` (VIP, 47 câu), N3, series `world-pinocchio`, theo nguyên tác Collodi 1883 (cờ IT; cá mập, không phải cá voi). Gói cũ `pinocchio` (N5) ẩn, trỏ sang tập 1.
- Truyện châu Á (Trung, Hàn, Việt...) thuộc kệ `furusato-*` nên kệ thế giới không làm trùng.
- build.mjs: thêm ROMAJI_FIX cho 土から, 土に, けしの実, 夜の森, 木の下, 元の. Bìa: motif mới `chickenhut`, `skulllamp`, `sarucroc`, `nosewood`, `sharkbelly`. Glossary world thêm たまらない, 変える, てっぺん, 決して, めちゃくちゃ, くしゃみ, マスク.

## Kệ truyện cổ thế giới đợt 5: Ali Baba, Người đẹp và quái vật, Bà chúa tuyết (mỗi truyện 2 tập) — 27/11/2026
- `world-alibaba-1` (miễn phí, 47 câu) và `world-alibaba-2` (VIP, 48 câu), N3, series `world-alibaba`, theo Nghìn lẻ một đêm (không gắn cờ). Chưa có gói Ali Baba cũ.
- `world-bijo-1` (miễn phí, 56 câu) và `world-bijo-2` (VIP, 49 câu), N3, series `world-bijo`, theo bản Beaumont 1756 (cờ FR). Bản nháp N4 vượt ngưỡng từ khó (野獣 tính là từ khó, harder 18–20%) nên xếp N3. Chưa có gói cũ.
- `world-yukinojoo-1` (miễn phí, 47 câu) và `world-yukinojoo-2` (VIP, 48 câu), N3, series `world-yukinojoo`, Andersen 1844 (cờ DK). Gói cũ `the-snow-queen` (8 câu) ẩn, trỏ sang tập 1.
- Bìa: motif mới `sesame`, `jars`, `rose`, `rosebloom`, `snowsled`, `icepalace`. Glossary world thêm くっつく, チョーク, 積む, 泊める, 注ぐ, がっかり, みっともない, こぼす.
- Romaji: sửa qua `phrases` (アリババ, かけら, なみだ, 塀…) và viết lại các câu bị đọc "hai".

## Văn học Nhật v2: 手袋を買いに 2 tập (N4), thay gói cũ — 27/11/2026

- Nhánh `claude/bungaku-v2-batch2`. `tebukuro-1` (55 câu, 1.360 ký tự, harder 7,0%, audio 4,4 phút) và `tebukuro-2` (54 câu, 1.390 ký tự, harder 12,0%, audio 4,5 phút).
- Phỏng theo 新美南吉 (mất 1943, xuất bản 1943; public domain ở Nhật, và ở Mỹ vì tác giả mất trước 1946). Giữ câu kết gốc 「ほんとうに人間はいいものかしら」.
- Giọng: Aoede kể; 子ぎつね Neural2-B cao, 母さんぎつね Neural2-B trầm, ぼうし屋 Neural2-C, mẹ con nhà người Neural2-B.
- Bìa: motif `teb1`/`teb2` (đêm tuyết, đèn phố, găng đỏ). Tập 1 miễn phí.
- Ẩn gói cũ `tebukuro-o-kai-ni` → `tebukuro-1`. `npm run verify` xanh.

## Kệ ma & trinh thám — lô 3 (江戸川乱歩「二銭銅貨」) — 27/11/2026

- Nhánh `claude/shelf-mystery-ranpo`. Lô 2 (PR #68, `mystery-akagami-1/2`) đã gộp.
- Thêm `mystery-nisen-1` (miễn phí), `mystery-nisen-2`, `mystery-nisen-3` (VIP): N2, 52/49/60 câu, audio 6:10 / 5:38 / 7:39. Viết lại tiếng Nhật N2 theo Aozora card56647. Ranpo mất 1965 nên tác phẩm đã PD ở Nhật; in năm 1923 nên cũng PD ở Mỹ.
- Giữ nguyên mật mã gốc: 南無阿弥陀仏 → chữ nổi → thông điệp katakana chính tả cũ. Đọc mỗi chữ thứ 9 ra ゴジヤウダン, đúng như bản gốc. Chi tiết ở `content/stories/mystery-nisen-*.qc.md`.
- Thêm motif bìa `coin` (đã có trong `scripts/produce/cover.html` từ lô 1).
- ID kệ còn giữ chỗ: `mystery-rokuro-*`, `mystery-chawan-*`, `mystery-garnet-*`, `mystery-dzaka-*`, `mystery-shinri-*`.
## Văn học Nhật v2: 蜘蛛の糸 (N3), thay gói cũ — 27/11/2026

- Nhánh `claude/bungaku-v2-batch3`. `kumonoito-1` (59 câu, 1.608 ký tự, harder 5,5% so với N3, audio 5,3 phút), một tập, miễn phí.
- Phỏng theo 芥川龍之介 (mất 1927, xuất bản 1918; public domain ở Nhật và Mỹ). Giữ cảnh kết gốc (hoa sen không bận tâm, gần trưa). Xếp N3 vì 地獄/天国 và văn phong; bản N4 vượt ngưỡng từ khó.
- Giọng: Aoede kể, カンダタ Neural2-C trầm. Bìa motif `kumo` (vùng tranh hẹp hơn để chừa chỗ tên tác giả dài).
- Ẩn gói cũ `kumo-no-ito` → `kumonoito-1`. `npm run verify` xanh.

## Tiếng Sinhala đợt 3: hết kệ Mukashi + Bremen — 27/11/2026 (nhánh `claude/si-stories-4`)

- Đã dịch 17 gói: world-bremen; mukashi-kasajizo, mukashi-kintaro, mukashi-shitakiri, mukashi-hanasaka, mukashi-issun-1/2, mukashi-kaguya-1/2/3, mukashi-tsuru-1/2, mukashi-anju-zushio-2, mukashi-shuten-2, mukashi-ushiwaka-2, mukashi-yuki-onna-2. Thêm dòng `V scissors` cho world-akazukin và băm lại sau khi glossary sửa はさみ.
- Kệ Mukashi giờ đủ si cho mọi tập. Tên riêng giữ thống nhất với tập 1 (රයිකෝ, කින්තොකි, අන්ජු/සුෂියෝ, සන්ෂෝ දායූ, ඔයුකි/මිනොකිචි, උෂිවකා/බෙන්කේ).
- **Lỗi nguồn (chưa sửa, vùng nội dung):** một số ô "giải thích" của câu hỏi chỉ lặp lại câu hỏi bằng tiếng Anh thay vì đưa đáp án: mukashi-kasajizo (4 ô), mukashi-kintaro (4 ô), hanshichi-yukidaruma-1 (1 ô), rakugo-sokotsu-nagaya (1 ô). Bản si dịch đúng như nguồn; luồng sở hữu nên viết lại thành đáp án.
- **Lệch số câu nhỏ:** nhiều lời giải câu hỏi ghi "câu N" lệch 1 so với số thứ tự hiển thị (vd. mukashi-hanasaka Q0 ghi câu 10, đáp án nằm ở câu 9 tính từ 0). Không ảnh hưởng người dùng nhiều, ghi lại để luồng sở hữu rà.
- `npm run verify` xanh: 726 gói, 0 lỗi; sidecar si 49 gói, 0 lỗi; build OK.

## Tiếng Sinhala đợt 4: Nàng tiên cá, Jack, Mai-chan 5–10, Gongitsune, Tebukuro, Kumonoito — 27/11/2026 (nhánh `claude/si-stories-5`)

- Đã dịch 14 gói: world-ningyo-1/2, world-jack (luồng truyện thế giới nhờ sau PR #73); maichan-05 → maichan-10; gongitsune-1/2; tebukuro-1/2; kumonoito-1.
- Tên riêng thống nhất: මායි-චන්, බින්-කුන්, යුකි-චන්; ගොන්, හියෝජූ, කසුකෙ; ජැක්; කන්දත. Truyện thiếu nhi dùng giọng nói thường ngày; dòng kết Tebukuro giữ lặp hai lần như bản gốc.
- Dòng mẫu câu (P) chỉ ghi nghĩa, không chép lại tiếng Nhật.
- Sau đợt này: 63 gói có si. Còn lại: Botchan 2–6, Budori 2–4, Furusato, Rakugo, Osaka 02–08, Kumonoito 2, các gói chumon-1/2 mới và những gói world- tiếp theo.

## Tiếng Sinhala đợt 19: 4 gói Đắc nhân tâm — 27/11/2026 (nhánh `claude/si-stories-20`)

- Thêm sidecar tiếng Sinhala cho `life-dacnhan-1..4` (truyện quán ramen của Yōta, cảm hứng từ «Đắc nhân tâm»).
- Tên riêng nhất quán: යෝතා, ලින්, යුයි, ගෙන්-සාන්, සාතෝ මහත්තයා, සකමොතෝ නෝනා; 店長 = මැනේජර්, 大将 = ලොක්කා.
- `apply.mjs si`: 4 gói, 0 lỗi. Kiểm tra khoảng trống sau khi gộp main: 0 gói đang hiện thiếu si (242 sidecar).

## Tiếng Sinhala đợt 18: 7 gói Triết lý sống mới — 27/11/2026 (nhánh `claude/si-stories-19`)

- Thêm sidecar tiếng Sinhala cho `life-allen-3`, `life-epictetus-3`, `life-gakumon-3`, `life-ikari-4`, `life-marcus-3`, `life-seneca-4`, `life-yukkuri-4`.
- Giữ tên riêng và thuật ngữ nhất quán với các tập trước (නෝරා, එපික්ටීටස්, මිසාකි, මාකස්, ලුසිලියස්, කෙන්ජි; 陛下 = දේවයන් වහන්ස; tác phẩm của Fukuzawa = "ඉගෙනීමට දිරිගැන්වීමක්"). Q giữ nguyên số "වාක්‍යය N" theo bản tiếng Anh.
- `apply.mjs si`: 7 gói, 0 lỗi. Kiểm tra khoảng trống sau khi gộp main: còn 4 gói `life-dacnhan-1..4` mới lên, làm ở đợt 19.

## Tiếng Sinhala đợt 17: 3 gói quê hương Việt Nam mới — 27/11/2026 (nhánh `claude/si-stories-18`)

- Thêm sidecar tiếng Sinhala cho 3 gói N2 vừa vào main qua PR #106: `furusato-vn-chipheo` (Chí Phèo), `furusato-vn-tatden-1`, `furusato-vn-tatden-2` (Tắt đèn).
- Tên riêng phiên âm Sinhala nhất quán (නම් කාඕ, චී ෆේඕ, ගෝ තත් තෝ, චි සව්...); lời thoại giữ sắc thái (quan lại xưng උඹ/පන්, chị Dậu đổi từ khiêm nhường sang ngang hàng khi phản kháng).
- `apply.mjs si`: 3 gói, 0 lỗi. Kiểm tra khoảng trống sau khi gộp main: còn 7 gói Triết lý sống mới (life-*-3/4) chưa có si, làm ở đợt 18.

## Tiếng Sinhala đợt 16: kệ Triết lý sống — 27/11/2026 (nhánh `claude/si-stories-17`)

- Thêm 27 sidecar `content/translations/si/`: `life-allen-1..2`, `life-bushido-1..2`, `life-epictetus-1..2`, `life-gakumon-1..2`, `life-ikari-1..3`, `life-marcus-1..2`, `life-rongo-1..2`, `life-roshi-1`, `life-seneca-1..3`, `life-smiles-1..3`, `life-wattles-1..2`, `life-yukkuri-1..3`. Việt duyệt làm tiếp phần kệ của luồng khác (27/11).
- Dịch trong phiên, tự rà: giữ nguyên tiếng Nhật trong G/P, ví dụ đời sống trong P có nghĩa tiếng Sinhala, số câu trong Q giữ như bản tiếng Anh. Tên riêng phiên âm nhất quán (මාකස්, සෙනෙකා, ලුසිලියස්, කොන්ෆියුසියස්, ලාඕත්සු, ෆුකුසාවා යුකිචි...).
- Rà lại sau khi gộp main: mọi gói v2 đang hiện trên main (228 gói) đã có tiếng Sinhala. `apply.mjs` báo 0 lỗi cho từng gói.

## Tiếng Sinhala đợt 15: kệ Ma – trinh thám — 27/11/2026 (nhánh `claude/si-stories-16`)

- Thêm 8 sidecar `content/translations/si/`: `mystery-mujina-1`, `mystery-hoichi-1`, `mystery-hoichi-2`, `mystery-akagami-1`, `mystery-akagami-2`, `mystery-nisen-1`, `mystery-nisen-2`, `mystery-nisen-3`. Việt duyệt làm tiếp phần kệ của luồng khác (27/11).
- Chỉ thêm file sidecar, không sửa JSON gốc. Ví dụ đời sống trong P được dịch đầy đủ; số câu trong Q giữ nguyên như bản tiếng Anh.
- `apply.mjs` báo 0 lỗi cho từng gói. Còn lại 22 gói kệ Triết lý sống (đợt 16).

## Tiếng Sinhala đợt 14: truyện quê hương (phần 2 + 5 gói PR #94) — 27/11/2026 (nhánh `claude/si-stories-15`)

- Thêm 19 sidecar `content/translations/si/`: phần còn lại kệ Việt Nam (Số Đỏ 1–4, Sọ Dừa, Sơn Tinh Thủy Tinh, Táo Quân, Thạch Sanh 1–3, Tích Chu, Trầu Cau, Từ Thức, Vú Sữa) và 5 gói mới từ PR #94 (`furusato-vn-laohac`, `furusato-vn-vongphu-1`, `furusato-vn-tranglon-1`, `furusato-cn-liangzhu-1`, `furusato-kr-tokki-1`).
- Dịch trong phiên, tự rà: giữ nguyên mẫu ngữ pháp tiếng Nhật trong G/Q, tên riêng Việt/Trung/Hàn phiên âm nhất quán với các đợt trước.
- Sau đợt này, mọi gói `furusato-*` trên main đều có tiếng Sinhala. `apply.mjs` báo 0 lỗi cho từng gói.

## Tiếng Sinhala đợt 13: truyện quê hương Việt Nam (phần 1) — 27/11/2026 (nhánh `claude/si-stories-14`)

- Thêm sidecar `content/translations/si/` cho 14 gói kệ quê hương Việt Nam: furusato-vn-babe-1, vn-banhchung-1, vn-caytre-1, vn-chudongtu-1, vn-coc-1, vn-cuoi-1, vn-giong-1, vn-hoguom-1, vn-khe-1, vn-maiantiem-1, vn-mychau-1, vn-neu-1, vn-oc-1, vn-rongtien-1. Tổng sidecar si: 174.
- Claude tự dịch trong phiên (không dùng API trả phí), giọng kể dân gian tự nhiên; tên riêng Việt phiên âm theo cách đọc (හුං රජු, ලේ ලොයි, මී චාඋ, අව් කෝ...); thuật ngữ Phật giáo theo cách người Sri Lanka dùng (බුදුරජාණන් වහන්සේ, සිවුර).
- Mỗi gói `apply.mjs` báo 0 lỗi; câu ngữ pháp điền chỗ trống giữ nguyên mẫu tiếng Nhật.
- Còn lại kệ Việt Nam (sodo, sodua, sontinh, taoquan, thachsanh, tichchu, traucau, tuthuc, vusua) và 5 gói mới từ PR #94 làm ở đợt 14.

## Tiếng Sinhala đợt 12: truyện quê hương các nước — 27/11/2026 (nhánh `claude/si-stories-13`)

- Đã dịch 31 gói furusato không phải Việt Nam: Brazil (curupira, iara, saci), Trung Quốc (baishe, change, niulang, saiyuki-1/2/3), Indonesia (bawang, kancil, malin, sangkuriang, timun, toba), Hàn (heungbu, hokburi, kongjwi, onui, simcheong), Myanmar (kyaiktiyo, mahagiri), Nepal (indra, manjushri), Philippines (juan, magayon, malakas, pagong, pinya), Thái (aphai, sangthong).
- Lời kể khẩu ngữ như các gói world-/furusato trước. Thuật ngữ Phật giáo theo cách người Sri Lanka quen dùng: බුදුරජාණන් වහන්සේ, බෝසතාණන් වහන්සේ (Manjushri), චෛත්‍යය, පාරිජාත, ඉන්ද්‍ර දෙවියා. Dokkaebi để phiên âm දොක්කේබි; oni dịch ඔනි යක්ෂයා; yamanba dịch "කඳු යක්ෂණිය".
- Câu Q dạng điền chỗ trống (kongjwi, onui, simcheong, malakas, pinya) chỉ dịch phần giải thích, giữ nguyên mẫu ngữ pháp tiếng Nhật.
- Sau đợt này: 160 gói có si. Còn lại các gói furusato-vn (~33) cho đợt sau.

## Tiếng Sinhala đợt 11: truyện thế giới đợt 6 — 27/11/2026 (nhánh `claude/si-stories-12`)

- Đã dịch 5 gói từ PR #88: world-vasilisa-1/2, world-saru-wani, world-pinocchio-1/2.
- Lời kể khẩu ngữ như các gói world- trước. Tên: වසිලීසා, බාබා යාගා; වඳුරා සහ කිඹුලා (truyện Jataka quen thuộc với người Sri Lanka); පිනෝකියෝ, ජෙපෙටෝ, රොමියෝ, සුරංගනාවිය.
- Tục ngữ Nga 「朝は夜よりかしこい」 dịch thống nhất "උදේ, රෑට වඩා බුද්ධිමත්" ở cả hai tập.
- Sau đợt này: 129 gói có si.

## Tiếng Sinhala đợt 10: văn học Nhật + tập tiếp truyện Việt — 27/11/2026 (nhánh `claude/si-stories-11`)

- Đã dịch 15 gói: mikan-1, torokko-1, toshishun-1/2; furusato-vn-tamcam-2/3, kieu-2/3/4, quynh-2/3, hoangle-2/3, thachlam-2/3.
- Văn học cổ điển (Akutagawa) và Hoàng Lê dùng lời kể văn viết (සිටියේය/විය), lời thoại khẩu ngữ; Kiều, Tấm Cám, Trạng Quỳnh kể khẩu ngữ như tập 1. Thạch Lam: lời kể văn viết, thoại khẩu ngữ (khớp tập 1).
- Tên khớp tập 1 của từng series: Kiều (කියෙව්, කිම්, වාන්, තූ බා, හොවාන් තු, තු හායි, ශාක් යුයෙන්), Hoàng Lê (ක්වාං චුං, ඉන්ගෝ ති ඤාම්, සුන් ෂියී, තාං ලොං, ඉන්ගොක් හොයි, දොං දා), Quỳnh (ක්වින්, ත්‍රින් ස්වාමියා).
- Chơi chữ 地竜 (con giun = "rồng đất") giữ chữ Hán rồi giải thích. "Trao duyên" để kèm phiên âm ත්‍රාඕ යුයෙන්.
- Sau đợt này: 124 gói có si.

## Tiếng Sinhala đợt 9: truyện thế giới đợt 5 — 27/11/2026 (nhánh `claude/si-stories-10`)

- Đã dịch 6 gói từ PR #84: world-alibaba-1/2, world-bijo-1/2, world-yukinojoo-1/2.
- Văn phong khớp các gói world- trước (lời kể khẩu ngữ, lời thoại giữ ngoặc kép). Tên: අලිබාබා, කාසිම්, මොර්ජියානා; බෙල්, මෘගයා; කායි, ගර්ඩා, හිම රැජින. "Vừng ơi mở ra" dịch là "අරින්න, තලපු!".
- world-bijo-2 T4 dịch theo câu mới 「ベル、今夜も聞くよ。わたしの妻になってくれないか。」.
- Sau đợt này: 109 gói có si.

## Tiếng Sinhala đợt 8: Rakugo trọn bộ — 27/11/2026 (nhánh `claude/si-stories-9`)

- Đã dịch 14 gói: rakugo-doguya, hatsu-tenjin, hirabayashi, inu-no-me, jugemu, kinmeichiku, kohome, manju-kowai, meguro-no-sanma, shibahama-1/2, shinigami-2, sokotsu-nagaya, tenshiki (kệ Rakugo giờ đủ si cả 16 gói).
- Rakugo dịch khẩu ngữ suốt (kể cả lời dẫn), lời thoại không có ngoặc kép như bản gốc. Shinigami-2 khớp văn phong và tên với tập 1 (මරු දෙවියා, හචිගෝරෝ, câu thần chú giữ phiên âm). Lời của lãnh chúa (Meguro no Sanma) dùng thể trang trọng cổ.
- Chơi chữ giữ nguyên âm Nhật rồi giải thích: かわず (không mua / con ếch), ただ (0 tuổi / miễn phí), tên dài Jugemu phiên âm sang chữ Sinhala, 転失気 (đánh rắm).
- Sau đợt này: 103 gói có si.

## Tiếng Sinhala đợt 7: Làm việc ở Osaka trọn bộ — 27/11/2026 (nhánh `claude/si-stories-8`)

- Đã dịch 6 gói: osaka-hataraku-03 → osaka-hataraku-08 (series Osaka giờ đủ si cả 8 tập).
- Lời kể thể văn viết, lời thoại khẩu ngữ; câu tiếng Osaka (Kansai-ben) dịch sang khẩu ngữ thân mật, ghi chú phương ngữ giữ nguyên ví dụ tiếng Nhật. Tên giữ thống nhất: මින්, මොරිත අකාරි, ඉවතා, හයි (ෆාම් හයි), කියෝ, ජොෂුවා, රාජු, තනක.
- Thông tin đời sống (119, #7119, bảo hiểm, thuế, rác, động đất) dịch sát, giữ nguyên số điện thoại.
- Sau đợt này: 89 gói có si.

## Tiếng Sinhala đợt 6: Budori trọn bộ, Địa ngục biến 2, Dải băng lốm đốm 2, Hanshichi 2 vụ, Nến đỏ và nàng tiên cá, Osaka 2 — 27/11/2026 (nhánh `claude/si-stories-7`)

- Đã dịch 8 gói: budori-3, budori-4 (Budori giờ đủ si cả 4 tập); jigokuhen-2; madara-2; hanshichi-ofumi-2, hanshichi-yukidaruma-2; akai-rousoku-to-ningyo; osaka-hataraku-02.
- Văn học cổ điển (Jigokuhen, Holmes, Hanshichi): lời kể thể văn viết, lời thoại khẩu ngữ, khớp tập 1. Tên giữ thống nhất với tập 1 (මහා ස්වාමියා, යොෂිහිදේ; හෝම්ස්, වොට්සන්, හෙලන් ස්ටෝනර්; හන්ෂිචි, K මාමා, ඔමිචි, ජින්එමොන්; මින්, මොරිත අකාරි).
- Jigokuhen-2 G41 giữ nguyên số đường dây hỗ trợ よりそいホットライン (0120-279-338).
- Sau đợt này: 83 gói có si.

## Tiếng Sinhala đợt 5: Nhà hàng lắm yêu cầu, Botchan trọn bộ, Budori 2, truyện thế giới đợt 4 — 27/11/2026 (nhánh `claude/si-stories-6`)

- Đã dịch 12 gói: chumon-1/2; botchan-2 → botchan-6 (Botchan giờ đủ si cả 6 tập); budori-2; world-nagagutsu, world-rapunzel, world-aladdin-1/2 (luồng truyện thế giới nhờ sau PR #77).
- Botchan: lời kể dùng thể văn viết (giống tập 1), lời thoại dùng khẩu ngữ. Tên/biệt danh giữ thống nhất: බොච්චන්, කියෝ, තනුකි, රතු කමිසය, යමාඅරාෂි (හොත්තා), උරනරි (කොගා), නොදයිකෝ, මැඩෝනා. Ghi chú ngữ pháp giữ nguyên ví dụ tiếng Nhật, chỉ dịch phần giải thích.
- Sau đợt này: 75 gói có si.

## Văn học Nhật v2: 注文の多い料理店 2 tập (N3), thay gói cũ — 27/11/2026

- Nhánh `claude/bungaku-v2-batch4`. `chumon-1` (52 câu, 1.366 ký tự, harder 6,4%, audio 4,4 phút, miễn phí) và `chumon-2` (60 câu, 1.865 ký tự, harder 7,9%, audio 6,0 phút).
- Phỏng theo 宮沢賢治 (mất 1933, xuất bản 1924; public domain ở Nhật và Mỹ). Giữ các lời dặn trên cửa, câu lặp gió thổi và cảnh kết gốc (mặt nhàu như giấy vụn). Câu lặp ở tập 2 thêm 「また、」 để tránh trùng câu giữa hai gói.
- Giọng: Aoede kể; hai chàng trai Neural2-C hai cao độ; hai con mèo rừng Neural2-B/C; người dẫn đường Neural2-C trầm.
- Bìa: motif `chumon1` (nhà hàng Tây giữa núi) và `chumon2` (cánh cửa với hai mắt xanh ở lỗ khóa).
- Ẩn gói cũ `chumon-no-oi-ryoriten` → `chumon-1`. `npm run verify` xanh.

## Văn học Nhật v2: 杜子春 2 tập (N3), thay gói cũ — 27/11/2026

- Nhánh `claude/bungaku-v2-batch5`. `toshishun-1` (56 câu, 1.644 ký tự, harder 10,4%, audio 5,5 phút, miễn phí) và `toshishun-2` (62 câu, 1.837 ký tự, harder 9,7%, audio 6,1 phút).
- Phỏng theo 芥川龍之介 (mất 1927, xuất bản 1920; public domain ở Nhật và Mỹ). Giữ ba lần đào vàng theo bóng (đầu, ngực, bụng), thử thách im lặng trên núi 峨眉山, cảnh hai con ngựa ở địa ngục, lời mẹ và cái kết căn nhà hoa đào dưới chân 泰山.
- Giọng: Aoede kể; 杜子春 Neural2-C; ông lão 鉄冠子 Neural2-C trầm chậm; khách, tiếng nói lạ, 神将, 閻魔 Neural2-C các cao độ khác nhau; mẹ Neural2-B.
- Bìa: motif `toshi1` (cổng tây Lạc Dương lúc hoàng hôn, bóng người dài, vàng) và `toshi2` (vách đá dưới chòm Bắc Đẩu, gậy trúc bay, hoa đào). Font Yuji Boku.
- Ẩn gói cũ `toshishun` → `toshishun-1`. `npm run verify` xanh.

## Kệ "Triết lý sống" (wisdom), lô 2 — 27/11/2026

Lô này thêm 4 chương chuẩn v2, cả 4 đều miễn phí vì là tập 1 của từng bộ:

| Id | Cấp | Nội dung | Audio |
| --- | --- | --- | --- |
| `life-marcus-1` | N3 | Marcus Aurelius, *Suy tưởng* | 3:57 |
| `life-wattles-1` | N3 | Wattles, *Khoa học làm giàu*, kể qua chuyện anh phục vụ quán cà phê | 4:00 |
| `life-rongo-1` | N4 | Luận ngữ: Tử Lộ, Tử Cống | 3:36 |
| `life-yukkuri-1` | N4 | Truyện gốc về sống chậm | 3:24 |

- QC từng chương ở `content/stories/life-*.qc.md`.
- Kệ hiện có 8 chương: 5 chương N3 (epictetus-1, epictetus-2, roshi-1, marcus-1, wattles-1) và 3 chương N4 (ikari-1, rongo-1, yukkuri-1).
- Ghi chú: import `world-bremen` (của luồng truyện thế giới) đang nằm trong khối W ở `content.ts`. Không ảnh hưởng gì nên để nguyên.
- `npm run verify` xanh.

## Văn học Nhật v2: トロッコ và 蜜柑 (N3), thay gói cũ — 27/11/2026

- Nhánh `claude/bungaku-v2-batch6`. Hai truyện ngắn của 芥川龍之介 (mất 1927; xuất bản 1922 và 1919; public domain ở Nhật và Mỹ), mỗi truyện một gói, miễn phí.
- `torokko-1`: 70 câu, 1.969 ký tự, harder 8,0%, audio 6,7 phút. Giữ hai lần đẩy goòng, lời thoại giọng địa phương của hai người thợ (われ, 帰んな, ずら), đoạn chạy về một mình và đoạn kết năm 26 tuổi ở tòa soạn. Giọng: Aoede kể; 良平 Neural2-B cao; người thợ quát Neural2-C trầm; thanh niên Neural2-C; mẹ Neural2-B.
- `mikan-1`: 61 câu, 2.137 ký tự, harder 8,6%, audio 7,1 phút. Ngôi kể thứ nhất, chỉ một giọng Aoede. Giữ toa hạng hai và vé hạng ba, đường hầm, khói đen, ba cậu bé ở đường ngang và cảnh quýt rơi.
- Bìa: motif `torokko` (goòng lao dốc giữa vườn quýt, biển phía xa) và `mikan` (cô bé ném quýt qua cửa sổ tàu về phía ba cậu bé). Font Zen Kaku Gothic Antique và Zen Old Mincho.
- Ẩn gói cũ `torokko` → `torokko-1`, `mikan` → `mikan-1`. `npm run verify` xanh.
## Kệ "Triết lý sống" (wisdom), lô 3 — 27/11/2026

Lô này thêm 4 chương chuẩn v2, cả 4 đều miễn phí vì là tập 1 của từng bộ. Lần đầu kệ có một chương N2:

| Id | Cấp | Nội dung | Audio |
| --- | --- | --- | --- |
| `life-seneca-1` | N2 | Seneca, *Bàn về sự ngắn ngủi của đời người*, viết dưới dạng thư gửi bạn Paulinus | 5:17 |
| `life-allen-1` | N3 | James Allen, *As a Man Thinketh* (『原因と結果の法則』): tâm hồn là khu vườn | 4:19 |
| `life-smiles-1` | N4 | Samuel Smiles, *Self-Help*: thợ gốm Palissy đốt cả bàn ghế để nung chiếc đĩa trắng | 3:36 |
| `life-gakumon-1` | N3 | 福沢諭吉『学問のすゝめ』, kể qua chuyện cô bé Misaki tìm thấy tờ 10.000 yên cũ của bà | 4:21 |

- Cả 4 tác phẩm gốc đều thuộc phạm vi công cộng. Phần hội thoại và khung truyện là sáng tác của ViMai. Câu trích được dịch lại bằng tiếng Nhật dễ hiểu, riêng câu mở đầu của 福沢 giữ nguyên văn.
- QC từng chương ở `content/stories/life-*.qc.md`.
- Kệ hiện có 12 chương: 1 chương N2 (seneca-1), 7 chương N3 và 4 chương N4.
- `npm run verify` xanh.

## Kệ "Triết lý sống" (wisdom), lô 4 — 27/11/2026

Lô này thêm 3 chương chuẩn v2. Lần đầu kệ có tập 2 (VIP) cho các bộ đã có tập 1 miễn phí:

| Id | Cấp | Miễn phí/VIP | Nội dung | Audio |
| --- | --- | --- | --- | --- |
| `life-bushido-1` | N3 | miễn phí | 新渡戸稲造『武士道』(1900): cuộc trò chuyện với de Laveleye, năm đức 義・勇・仁・礼・誠 | 4:08 |
| `life-smiles-2` | N4 | VIP | Smiles, *Self-Help*: Audubon vẽ lại 200 bức chim bị chuột gặm; chó Diamond của Newton | 3:18 |
| `life-ikari-2` | N4 | VIP | Truyện gốc ViMai 心の練習 2: Misaki bị mắng trên tàu, bà kể giai thoại sư 坦山 cõng cô gái qua sông | 3:20 |

- 『武士道』 và *Self-Help* thuộc phạm vi công cộng; 心の練習 là sáng tác của ViMai, giai thoại 坦山 là chuyện thiền dân gian.
- QC từng chương ở `content/stories/life-*.qc.md`.
- Kệ hiện có 15 chương: 1 chương N2, 8 chương N3 và 6 chương N4. Lô 5 dự kiến: Seneca 2 (N2), thêm N4.

## Kệ "Triết lý sống" (wisdom), lô 5 — 27/11/2026

Lô này thêm 2 chương VIP chuẩn v2, đều là tập 2:

| Id | Cấp | Nội dung | Audio |
| --- | --- | --- | --- |
| `life-seneca-2` | N2 | Seneca, *Thư gửi Lucilius* (thư 5, 13, 24): Lucilius mất ngủ vì tin đồn bị kiện; "ta khổ trong tưởng tượng nhiều hơn trong thực tế" | 6:13 |
| `life-rongo-2` | N4 | 『論語』: Nhan Hồi nghèo mà vui, "過ぎたるは猶及ばざるがごとし", 温故知新, các tuổi 十五〜七十 (不惑) | 2:58 |

- Cả hai tác phẩm thuộc phạm vi công cộng; lời thoại và khung truyện là ViMai kể lại. Kết cục vụ kiện của Lucilius không có trong thư, truyện nói rõ điều này.
- QC từng chương ở `content/stories/life-*.qc.md`.
- Kệ hiện có 17 chương: 2 chương N2, 8 chương N3 và 7 chương N4.

## Kệ quê hương: truyện Việt/Trung/Hàn mới (nhánh claude/furusato-vn-3)

5 gói mới, đủ bản dịch 10 ngôn ngữ, tab Bài học, audio liền mạch (Aoede kể; thoại Neural2-B/C), bìa bunko:

| ID | Cấp | Nội dung | Commit |
|---|---|---|---|
| furusato-vn-laohac | N2 | Lão Hạc (Nam Cao, PD), truyện ngắn Việt Nam | a3a3c50c |
| furusato-vn-vongphu-1 | N3, miễn phí | Hòn Vọng Phu (bản Lạng Sơn) + so sánh Sayohime | 135c6485 |
| furusato-vn-tranglon-1 | N3 | Trạng Lợn (truyện cười) | 301a3aae |
| furusato-cn-liangzhu-1 | N3 | Lương Sơn Bá – Chúc Anh Đài | d36c89ec |
| furusato-kr-tokki-1 | N3, miễn phí | Thỏ và Ba Ba (토끼전) + so sánh くらげ骨なし | 179a04fc |

- build.mjs ROMAJI_FIX thêm: 元の, 山の上, にまつわる, 金の印, 海の底, 陸の方, 山のふもと, 何が何だか, 実は (để romaji tách đúng từ).
- Motif bìa mới trong scripts/covers/cover.html: laohac, vongphu, tranglon, liangzhu, tokki.
- Muse/các luồng khác: các ID trên đã cấp, đừng dùng lại.
## Kệ "Triết lý sống" (wisdom), lô 6 — 27/11/2026

Lô này thêm 2 chương VIP chuẩn v2, đều là tập 2:

| Id | Cấp | Nội dung | Audio |
| --- | --- | --- | --- |
| `life-yukkuri-2` | N4 | Truyện gốc ViMai 小さな休み 2: Kenji có 20 việc phải làm, bà chủ quán trà dạy "từng việc một" qua cách pha trà | 3:08 |
| `life-marcus-2` | N3 | Marcus Aurelius: cuộc nổi loạn của Cassius năm 175, muốn tha thứ, đốt thư không đọc; "hãy như tảng đá trước sóng" (Suy tưởng 4.49, 8.47, 10.30) | 3:38 |

- *Meditations* và sử của Cassius Dio thuộc phạm vi công cộng; 小さな休み là sáng tác của ViMai.
- QC từng chương ở `content/stories/life-*.qc.md`.
- Kệ hiện có 19 chương: 2 chương N2, 9 chương N3 và 8 chương N4.

## Kệ "Triết lý sống" (wisdom), lô 7 — 27/11/2026

Lô này thêm 3 chương VIP chuẩn v2:

| Id | Cấp | Nội dung | Audio |
| --- | --- | --- | --- |
| `life-ikari-3` | N4 | Truyện gốc ViMai 心の練習 3: đàn em 山田 quên email, Misaki suýt quát thì đếm đến mười (lời Jefferson, 1825) và nhận ra cậu ấy đang lo vì mẹ nhập viện; bên dưới cơn giận thường là một cảm xúc khác | 3:08 |
| `life-allen-2` | N3 | James Allen, *As a Man Thinketh*: Nora trượt đội hợp xướng và nói bạn "may mắn"; Allen kể ngụ ngôn chàng trai nhà máy, "Dream lofty dreams…", suy nghĩ cần mục đích | 3:48 |
| `life-seneca-3` | N2 | Seneca, thư 2 "Về việc đọc": Lucilius mua sách tràn lan mà chẳng nhớ gì; "người ở khắp nơi thì chẳng ở đâu", mỗi ngày tiêu hóa một ý, lời Epicurus về sự nghèo; nối sang chuyện lướt điện thoại ngày nay | 5:11 |

- *As a Man Thinketh* (1903), thư của Seneca và thư của Jefferson (1825) thuộc phạm vi công cộng; 心の練習 và các cảnh đối thoại là sáng tác của ViMai.
- QC từng chương ở `content/stories/life-*.qc.md`.
- Kệ hiện có 22 chương: 3 chương N2, 10 chương N3 và 9 chương N4.

## Kệ "Triết lý sống" (wisdom), lô 8 — 27/11/2026

Lô này thêm 2 chương VIP chuẩn v2 và đưa kệ đạt mục tiêu 24 chương:

| Id | Cấp | Nội dung | Audio |
| --- | --- | --- | --- |
| `life-smiles-3` | N3 | Smiles, *Self-Help*: "天は自ら助くる者を助く" và George Stephenson 18 tuổi mới vào lớp một ở trường đêm, sau thành "cha đẻ đường sắt"; không bao giờ là quá muộn | 3:28 |
| `life-yukkuri-3` | N4 | Truyện gốc ViMai 小さな休み 3: Kenji so mình với ảnh khoe trên mạng của bạn cũ; hai cây trà trồng cùng năm, cây nhỏ lớn chậm nhưng vị sâu; so với mình năm ngoái | 3:15 |

- *Self-Help* (1859) thuộc phạm vi công cộng; 小さな休み và các cảnh đối thoại là sáng tác của ViMai.
- QC từng chương ở `content/stories/life-*.qc.md`.
- Kệ hiện có 24 chương: 3 chương N2, 11 chương N3 và 10 chương N4.

## Kệ "Triết lý sống" (wisdom), lô 9 — 27/11/2026

Lô này thêm 3 chương VIP chuẩn v2 (tập 2 của ba bộ đang có tập 1):

| Id | Cấp | Nội dung | Audio |
| --- | --- | --- | --- |
| `life-wattles-2` | N3 | Wattles, *The Science of Getting Rich*: Takuya làm quản lý cửa hàng thứ hai, mải nhìn quán chuỗi đối diện; ông Mori dạy ba ý: hình dung rõ điều mình muốn, việc hôm nay làm hết hôm nay (mỗi việc trọn vẹn tự thân), làm người mình gặp thấy "đang tiến lên"; "quán mình cứ đi theo bản đồ của mình" | 3:46 |
| `life-bushido-2` | N3 | Nitobe, *Bushido* chương 8, 11, 13: Kenta thua kiếm đạo, ném kiếm tre; ông nội đọc danh dự (lời Mạnh Tử), di huấn Ieyasu, 「ならぬ堪忍するが堪忍」, Katsu Kaishū buộc chặt kiếm, 「負くるが勝ち」; tuần sau thua tiếp nhưng cúi chào đối thủ | 3:46 |
| `life-gakumon-2` | N2 | Fukuzawa, 『学問のすゝめ』 phần 13, 15, 17: Misaki đi làm năm đầu, ghen tị bài đăng của đồng nghiệp Reina, suýt chia sẻ tin giảm cân giả; đọc về oán vọng, 「信の世界に偽詐多く、疑の世界に真理多し」 và 人望論; bắt chuyện với Reina và biết cô đã nộp 30 bản đề xuất | 5:52 |

- Ba tác phẩm gốc (1910, 1900, 1872–1876) thuộc phạm vi công cộng; nhân vật và đối thoại là sáng tác của ViMai.
- Giọng mới: Kenta và ông nội (bushido), Reina (gakumon), thêm vào `voices.json` của từng bộ.
- QC từng chương ở `content/stories/life-*.qc.md`.
- Kệ hiện có 27 chương: 4 chương N2, 13 chương N3 và 10 chương N4.

## Kệ "Triết lý sống" (wisdom), lô 10 — 27/11/2026

Lô này thêm 4 chương VIP chuẩn v2:

| Id | Cấp | Nội dung | Audio |
| --- | --- | --- | --- |
| `life-epictetus-3` | N3 | Epictetus, *Enchiridion* 43, 46, 49: mọi việc có hai cái quai (người anh và mảnh ruộng); con cừu không nôn cỏ ra để khoe đã ăn bao nhiêu; đừng tự gọi mình là triết gia, hãy sống cho đúng; Chrysippus | 3:45 |
| `life-allen-3` | N3 | James Allen, *As a Man Thinketh* chương sức khoẻ: Nohra và bác thợ bánh đang buồn; "khuôn mặt chua là do suy nghĩ chua", bà cụ 96 tuổi, "không thầy thuốc nào bằng ý nghĩ vui" | 3:48 |
| `life-marcus-3` | N3 | Marcus Aurelius, *Meditations* 4.3, 4.17, 6.30, 7.59, cùng chuyện trong *Historia Augusta*: hoàng đế bán đấu giá báu vật trong cung hai tháng để cứu ngân khố, chỉ hoàn tiền cho ai muốn trả lại | 3:48 |
| `life-ikari-4` | N4 | Truyện gốc 心の練習: Misaki bỏ hàng chờ sau một ông cụ, làm vỡ ba quả trứng và về muộn hơn; bà dạy 「短気は損気」, 「急がば回れ」 và câu của Franklin (1734) "What is begun in anger ends in shame"; tuần sau cô kiên nhẫn chờ và biết ông cụ chậm vì mắt kém | 3:12 |

- Các tác phẩm gốc (thế kỷ 2, 1903, 1734) và tục ngữ dân gian thuộc phạm vi công cộng; nhân vật và đối thoại là sáng tác của ViMai.
- Giọng mới: học trò (epictetus), thợ bánh (allen), ông cụ `ojii` (ikari), thêm vào `voices.json` của từng bộ.
- QC từng chương ở `content/stories/life-*.qc.md`.
- Kệ hiện có 31 chương: 4 chương N2, 16 chương N3 và 11 chương N4.

## Kệ "Triết lý sống" (wisdom), lô 11 — 27/11/2026

Lô này thêm 3 chương VIP chuẩn v2, ưu tiên N2 vì kệ đang thiếu cấp này:

| Id | Cấp | Nội dung | Audio |
| --- | --- | --- | --- |
| `life-seneca-4` | N2 | Seneca, *De Ira* II.29, II.36, III.12, III.36, III.40: Lucilius quát đầu bếp vì cá cháy trước mặt khách; thư Seneca kể Augustus cho đập hết bình pha lê của Pollio, Platon giữ cánh tay đã vung, "liều thuốc lớn nhất cho cơn giận là chờ đợi", mỗi tối tự xét một ngày; phần cuối nối sang tin nhắn giận dữ lúc nửa đêm | 5:20 |
| `life-gakumon-3` | N2 | Fukuzawa, 『学問のすゝめ』 thiên 14 「心事の棚卸」: Misaki năm hai ở nhà xuất bản, kiểm kê kho cuối năm thấy 3.000 cuốn in quá tay, mở sổ mục tiêu tháng Một chỉ gạch được chưa nửa; kẻ ba cột "được, mất, hàng ế" và giữ lại một mục tiêu nhỏ | 5:21 |
| `life-yukkuri-4` | N4 | Truyện gốc 小さな休み: Kenji không biết từ chối; bà chủ quán rót trà tràn chén; thứ Hai anh từ chối khéo kèm lựa chọn khác | 3:08 |

- Các tác phẩm gốc (thế kỷ 1, 1872–1876) thuộc phạm vi công cộng; nhân vật và đối thoại là sáng tác của ViMai.
- Không thêm giọng mới.
- QC từng chương ở `content/stories/life-*.qc.md`.
- Kệ hiện có 34 chương: 6 chương N2, 16 chương N3 và 12 chương N4.

## Kệ quê hương: Chí Phèo và Tắt đèn, N2 (nhánh claude/furusato-vn-4)

Văn học hiện thực Việt Nam ở mức N2, đều là tác phẩm thuộc phạm vi công cộng (Nam Cao mất 1951, Ngô Tất Tố mất 1954). Có đủ bản dịch 10 ngôn ngữ, tab Bài học, audio liền mạch và bìa bunko:

| ID | Nội dung | Commit |
|---|---|---|
| furusato-vn-chipheo | Chí Phèo (Nam Cao), 65 câu, 8.2 phút | b87ce905 |
| furusato-vn-tatden-1 | Tắt đèn phần 1: bán cái Tý nộp sưu, 43 câu | 3c111711 |
| furusato-vn-tatden-2 | Tắt đèn phần 2: Tức nước vỡ bờ, đêm chạy trốn, 42 câu | 3c111711 |

- Thêm vào ROMAJI_FIX trong build.mjs: 芥川龍之介, タッ・デン, ゴー・タッ・トー, 小林多喜二.
- Motif bìa mới: chipheo, tatden1, tatden2.
- Luồng "Đắc nhân tâm" đã giữ các ID: furusato-vn-vantien-*, furusato-vn-namcao-* (truyện Nam Cao khác), furusato-vn-giongto-*, furusato-vn-honbuom-*. Đừng dùng trùng.

## Mục "Sách nổi tiếng" — đợt 1: Đắc nhân tâm (cảm hứng) — 27/11/2026

Việt yêu cầu làm các sách nổi tiếng (Đắc nhân tâm, Nhà giả kim, Sử ký…), sắp theo chủ đề dễ tìm. Bìa có dòng tên sách theo ngôn ngữ người đọc chọn, và người Việt phải thấy đúng tên sách tiếng Việt chuẩn.

**Hạ tầng**
- Bìa đa ngôn ngữ: front matter `cover_book` và `cover_book_label` (11 giá trị nối bằng `|`). `cover.mjs` dựng `<id>.webp` (bản en) và `<id>.<lang>.webp`. `build-story.mjs` ghi `coverLangs`, `gen-catalog.mjs` chuyển tiếp trường này. `StoryCover`/`coverFor()` và trình phát trong `ReaderClient` chọn bìa theo ngôn ngữ app.
- Kệ theo chủ đề: thêm `vn-lit` (Văn học Việt Nam; Số đỏ, Kiều, Hoàng Lê, Thạch Lam, Lão Hạc được gom vào bằng regex, không sửa nội dung), `book-people`, `book-mind`, `book-spirit`, `book-east`, `book-health`. Nhãn đủ 12 locale. Trang Truyện có thêm hàng chip "Chủ đề" để nhảy tới từng kệ.
- `register.mjs --block=books`.

**Nội dung**: series 「ラーメン店長の一年」 gồm 4 tập N3 (`life-dacnhan-1..4`, kệ book-people, tập 1 miễn phí). Đây là truyện gốc dạy các ý tưởng nổi tiếng của Carnegie, không dịch sách. QC từng tập ở `content/stories/life-dacnhan-*.qc.md`.

**Bản quyền**: sách còn bản quyền (Carnegie, Coelho, Nguyên Phong, Thích Nhất Hạnh, Tony Buổi Sáng…) chỉ làm truyện gốc "Cảm hứng từ «…»". Chuyển thể đầy đủ chỉ dành cho tác phẩm công cộng: Sử ký, Kinh Dịch, và Spalding 1924 (bản gốc tiếng Anh của Hành trình về phương Đông).

**Tự kiểm**: phát hiện tập 2–4 thiếu dòng `cover_book`, nên bìa không có tên sách. Đã thêm, dựng lại và xem ảnh bìa vi/th.

## Mục "Sách nổi tiếng" — đợt 2: 史記の物語 (phỏng theo Sử ký Tư Mã Thiên) — 27/11/2026

Nhánh `claude/famous-books-2`. 4 chương N2, kệ `book-east` (chủ đề lịch sử), đăng ký bằng `register.mjs --block=books`.
Nguồn: 司馬遷『史記』(thế kỷ 1 TCN) và thơ Đỗ Mục (thế kỷ 9), đều phạm vi công cộng; ViMai kể lại, không dùng bản dịch hiện đại nào.
Bìa nhãn "Phỏng theo «Sử ký Tư Mã Thiên»" theo 11 ngôn ngữ.

| id | Tựa | Nội dung | Câu | Audio | Truy cập |
|---|---|---|---|---|---|
| life-shiki-1 | 易水の別れ | Kinh Kha (1) | 53 | 6:17 | miễn phí |
| life-shiki-2 | 地図の中の短剣 | Kinh Kha (2), 図窮まりて匕首見る | 50 | 5:49 | VIP |
| life-shiki-3 | 背水の陣 | Hàn Tín: chui háng, 国士無双, 背水の陣 | 50 | 6:18 | VIP |
| life-shiki-4 | 四面楚歌の夜 | Hạng Vũ: 四面楚歌, Ô Giang, 捲土重来 | 48 | 6:08 | VIP |

- Mỗi chương có từ vựng, dịch + giải thích 11 ngôn ngữ, bài học 3 mẫu ngữ pháp + 4 câu hỏi, qc.md riêng.
- Tự kiểm: đối chiếu số liệu với nguyên văn (800/28 kỵ, 70 trận, tuổi 31…); sửa đọc 秦=しん, 行っ=いっ, 遷, 最後, 見る (chỉ trong thành ngữ). Viết lại câu tránh đọc sai (たった今, 間違い, 土けむり, 一そう).
- Muse: id `life-shiki-*` thuộc khối books, đừng cấp trùng.

## Mục "Sách nổi tiếng" — đợt 3: 易経の物語 (phỏng theo Kinh Dịch) — 27/11/2026

Nhánh `claude/famous-books-3`. 2 chương N2, kệ `book-east`, chủ đề triết học, `register.mjs --block=books`.

| id | Tựa | Nội dung | Câu | Audio | Truy cập |
|---|---|---|---|---|---|
| life-ekikyo-1 | 龍の六つの季節 | Khổng Tử, 韋編三絶, sáu hào quẻ Càn | 46 | 6:16 | miễn phí |
| life-ekikyo-2 | 牢屋の六十四卦 | Văn Vương ở Dữu Lý, 太公望, 窮すれば通ず, Tư Mã Thiên | 44 | 6:04 | VIP |

- Nguồn: 『易経』, 『史記』 (周本紀, 斉太公世家, 孔子世家), 「報任少卿書」; đều phạm vi công cộng.
- Bìa "Phỏng theo «Kinh Dịch»" theo 11 ngôn ngữ. Không ghi tựa sách Nguyễn Hiến Lê "Kinh Dịch – Đạo của người quân tử" vì nội dung lấy từ kinh văn gốc, không từ sách đó.
- Người dùng (27/11) muốn ưu tiên sách giới trẻ đang đọc, nên đợt này dừng ở 2 chương; tập 3 (Chu Công, 謙, 君子豹変) để sau.
- Muse: id `life-ekikyo-*` thuộc khối books.
## Đợt 7 — Peppa Pig 「おかいもの」: 3 clip chuẩn v2 (26/11/2026, nhánh `claude/video-peppa-shopping`)

| # | Mức | Việc | PR |
|---|---|---|---|
| 34 | **Cao** | 3 gói `standard: 2` từ tập Peppa 「おかいもの」 (`Yif3a5eW_-E`): `peppa-shopping-list` (76s, 19 dòng), `peppa-shopping-spaghetti` (71s, 26 dòng), `peppa-shopping-cake` (97s, 28 dòng), N4, chủ đề đi siêu thị ở Nhật. Lời thoại đối chiếu Whisper + phụ đề tự động; câu không chắc thì bỏ (ghi trong `.qc.md`). | PR này |
| 35 | Trung bình | Thử まんが日本昔ばなし 「あずき峠」 bằng Whisper: giọng địa phương làm cả Whisper lẫn ASR sai tên riêng (助け?, 大賀茂?), và tập có nhiều đoạn chỉ có nhạc > 8 giây → không cắt được clip 45 giây đạt luật khoảng trống. Hoãn. | — |
| 36 | Trung bình | Kênh Peppa Pig 公式 có hàng chục tập 307 giây (おかたづけ, ランチ, キャンプ, はくぶつかん…) — nguồn hoạt hình N5–N4 ổn định cho các đợt sau. | — |

**Cho Muse — tránh trùng**: đã dùng `Yif3a5eW_-E` (24–280s).


## Mục "Sách nổi tiếng" — đợt 4: 夢の地図 (cảm hứng từ «Nhà giả kim») — 27/11/2026

Nhánh `claude/famous-books-4`. Trọn bộ 3 tập N3, kệ `book-spirit`, chủ đề self-help, `register.mjs --block=books`. Đợt đầu theo yêu cầu "đẩy mạnh sách giới trẻ đang đọc".

| id | Tựa | Nội dung | Câu | Audio | Truy cập |
|---|---|---|---|---|---|
| life-yume-1 | 灯台の夢 | Akari bỏ ca đêm Tokyo, theo giấc mơ lên Kanazawa | 47 | 5:08 | miễn phí |
| life-yume-2 | 金継ぎの冬 | nhà trọ, nghệ nhân kintsugi, dấu hiệu và kiên nhẫn | 47 | 5:05 | VIP |
| life-yume-3 | 椿の下の宝物 | kho báu ở quê nhà, mở lại quán của bà | 47 | 5:24 | VIP |

- Bản quyền: "Nhà giả kim" còn bản quyền nên đây là truyện gốc hoàn toàn (nhân vật, bối cảnh Nhật hiện đại), chỉ mượn các ý nổi tiếng. Bìa ghi "Cảm hứng từ «Nhà giả kim»" và tựa phổ biến của sách ở từng ngôn ngữ (vd. 연금술사, O Alquimista, ขุมทรัพย์สุดปลายฝัน). Kết truyện nhắc truyện cổ Hida 「味噌買い橋」 (công cộng) cùng mô-típ.
- Sửa thêm: đáp án câu hỏi trong lesson tính từ 1 (tập 1 đã ghi nhầm kiểu tính từ 0, sửa trước khi xuất bản).
- Muse: id `life-yume-*` thuộc khối books.

## Sửa audio 夢の地図: tên 灯 bị TTS đọc thành "ひ" — 27/11/2026

- So sánh độ dài audio Neural2 (đầu ra cố định): 「灯は二十五歳。」 dài gần bằng 「ひは…」, ngắn hơn hẳn 「あかりは…」, nên TTS đọc tên nhân vật sai.
- `scripts/produce/tts.mjs` thêm khoá front matter `tts_say: 灯台=灯台, 灯=あかり`: chỉ đổi chữ gửi cho TTS, không đổi chữ hiển thị (khoá dài khớp trước để giữ từ ghép). Đã tạo lại audio và mốc thời gian life-yume-1..3 (dài thêm 1–6 giây/tập).
- Kiểm thêm: 源さん, 美智子, 灯台 đọc đúng. Truyện mới dùng tên nhân vật một chữ Hán thì kiểm cách đọc TTS hoặc viết tên bằng katakana.

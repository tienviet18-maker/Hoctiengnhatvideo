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

## Kệ F 「大阪で働く」 — tập 1–5 (25/11/2026, nhánh `claude/furusato-osaka`)

Phim truyện nghe N3, 20 tập, sáng tác gốc (bible: `content/sources/osaka/series-bible.md`). Kịch tính trước,
thông tin đời sống thật sau: mỗi tập lồng một thủ tục, nói qua miệng nhân vật hoặc 1–2 câu kể, kết bằng móc câu.
大阪弁 chỉ ở lời キヨ/ラジュ/田中, luôn có giải thích chuẩn hoá trong grammarNote. Chuẩn v2 đủ: `chapter.mp3`,
mốc `t`, dịch + giải thích 11 ngôn ngữ (tự dịch, tự rà), bài học 4 mẫu ngữ pháp + 3 câu hỏi, `shelf: life-series`,
`series {id: osaka-hataraku, index}`. Cách đọc chung của kệ ở `content/sources/osaka/phrases.json`.
**Muse lưu ý: các ID `osaka-hataraku-*` do Claude cấp, đừng dùng lại.**

| Gói | Tiêu đề | Câu | Audio | Thông tin thật | Commit |
|---|---|---|---|---|---|
| osaka-hataraku-01 | ようこそ、大阪へ | 60 | 5,6 phút | 転入届 trong 14 ngày | e98e94b |
| osaka-hataraku-02 | 初出勤 | 58 | 5,2 phút | 区役所: マイナンバー, bảo hiểm | 24e43b8 |
| osaka-hataraku-03 | 消えた先輩 | 57 | 5,3 phút | thứ tự địa chỉ → SIM → ngân hàng, quy định 6 tháng, ゆうちょ | 927208e |
| osaka-hataraku-04 | ゴミの日の事件 | 58 | 5,6 phút | phân loại rác, đổ buổi sáng, 粗大ごみ | 3bb4ecb |
| osaka-hataraku-05 | 夜の工場 | 57 | 5,4 phút | 緊急地震速報, 避難所, túi khẩn cấp | a1fb25e |

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

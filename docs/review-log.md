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

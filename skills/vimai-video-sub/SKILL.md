# Skill: vimai-video-sub — BỘ LỌC YouTube chuẩn + biến 1 video thành gói học tiếng Nhật

Đây là bộ lọc đầu vào của toàn bộ kho video. Video không qua được bộ lọc này thì không vào app, bất kể hay đến đâu. Ba dòng nội dung (theo kế hoạch vượt Tadoku): **(A) Anime & giải trí** — dòng hút khách; **(B) Đời sống Nhật** — dòng khác biệt; **(C) Tin tức** — dòng tạo thói quen (áp dụng từ V1.2).

## Danh sách trắng kênh (chỉ lấy từ đây)

Đã kiểm chứng có phụ đề Nhật dùng được (24/11/2026):
- **Nihongo con Teppei** (Teppei) — podcast N5, phụ đề tự động, ASR khá sạch. Dòng B.
- **あかね的日本語教室** (Akane) — bài học đời sống N5–N4, NHIỀU video có phụ đề người đăng (chất lượng cao nhất). Dòng B.

Ứng viên — phải kiểm chứng phụ đề trên ít nhất 2 video mẫu trước khi đưa vào danh sách trắng:
- **Muse Asia / Ani-One Asia** — anime bản quyền có phụ đề nhiều ngôn ngữ; kiểm tra track `ja`. Dòng A.
- **Peppa Pig — Official JP channel** và kênh thiếu nhi Nhật chính thức tương tự — anime thiếu nhi, câu ngắn, hợp N5. Dòng A.
- **Comprehensible Japanese (Yuki)**, **Nihongo no Mori**, **Japanese with Shun** — bài học/hội thoại. Lưu ý 24/11/2026: nhiều video của các kênh này KHÔNG có phụ đề nào (đã kiểm chứng 3 video bị loại) — kiểm chứng từng video, không tin theo tên kênh. Dòng B.
- **NHK / ANN News** và kênh tin tức chính thức — kiểm chứng phụ đề Nhật từng bản tin. Dòng C (V1.2).

Kênh bị loại khỏi danh sách trắng nếu 3 video liên tiếp không có phụ đề Nhật dùng được.

## Quy trình lọc (6 bước, theo thứ tự — rớt bước nào dừng bước đó)

1. **Tìm ứng viên** theo dòng nội dung + cấp độ đang thiếu trong kho. Ghi lại: link, kênh, thời lượng, chủ đề dự kiến.
2. **Kiểm tra phụ đề**: `yt-dlp --list-subs <url>` trên CẢ 2 client (`ios` và `web_embedded`) — dữ liệu phụ đề YouTube trả về không ổn định theo client và theo lần gọi; một client báo không có chưa phải là kết luận. Vẫn không có track `ja` nào (người đăng hoặc tự động) → **LOẠI**, ghi vào sổ loại kèm lý do.
3. **Tải phụ đề** (json3): thử client `ios` trước, không được thì `web_embedded`, tối đa 3 lần đổi chéo. Cú pháp gốc: `yt-dlp --write-subs --write-auto-subs --sub-langs ja --sub-format json3 --skip-download --ignore-no-formats-error --extractor-args "youtube:player_client=<client>" -o <id> <url>`. (Client web thường bị chặn bot từ IP datacenter: "Sign in to confirm you're not a bot".)
4. **Chấm điểm chất lượng** (thang 10, lấy khi đạt ≥7 và không có điểm 0 ở tiêu chí phụ đề):
   - Phụ đề: người đăng tải = 4 điểm; tự động nhưng ASR sạch (ít lỗi đồng âm/tên riêng) = 3; tự động lỗi nhiều nhưng sửa được chắc chắn = 2; lỗi không sửa chắc = 0 → LOẠI.
   - Cấp độ thật: đối chiếu từ vựng/ngữ pháp chiếm đa số trong đoạn chọn với trần mức gắn nhãn = 2 điểm; lệch quá 1 cấp → hạ nhãn hoặc LOẠI.
   - Đoạn học được: có đoạn liên tục 1–3 phút câu trọn vẹn, đứng độc lập = 2 điểm.
   - Thời lượng video 2–15 phút = 1 điểm; ngoài khoảng này vẫn lấy nếu các tiêu chí khác đạt, ghi chú lý do.
   - Thuộc 1 trong 3 dòng nội dung và lấp đúng ô đang thiếu trong kho = 1 điểm.
5. **Xử lý gói** (mục Quy trình xử lý bên dưới): rà ASR, furigana, romaji, dịch, từ vựng, teaser.
6. **Cổng QC**: kiểm tra tự động ghép mảnh furigana khớp 100% câu gốc + audio/teaser tồn tại + `npx tsc --noEmit` và build đạt sau khi đăng ký vào `src/lib/content.ts`. Ghi tóm tắt QC cạnh file gói: nguồn phụ đề, điểm lọc, lỗi ASR đã sửa, điểm chưa chắc. Chờ Claude rà độc lập trước khi coi là nội dung chính thức.

## Loại ngay, không thương lượng

- Không có phụ đề Nhật ở cả 2 client sau 3 lần thử.
- ASR hỏng tới mức phải ĐOÁN nội dung (ví dụ tên riêng/địa danh nghe không chắc) — thà bỏ câu đó khỏi gói hoặc bỏ cả video, tuyệt đối không bịa.
- Nội dung không thuộc 3 dòng, hoặc trùng gần như nguyên vẹn với gói đã có.
- Video của kênh ngoài danh sách trắng mà chưa qua kiểm chứng 2 mẫu.

## Quy trình xử lý gói (sau khi qua lọc)

1. **Rà ASR**: đọc toàn bộ phụ đề, sửa lỗi nhận dạng tiếng nói (đồng âm, tên riêng, số đếm), ngắt lại câu theo đúng lời thoại; mốc `start`/`end` giữ từ phụ đề gốc, không tự chế.
2. **Furigana**: tách câu theo từng từ; mỗi từ kanji gắn cách đọc kana **khớp cách nói thật trong ngữ cảnh** （私 trong hội thoại = わたし; 生 có thể là なま/せい tuỳ câu). Kana thuần và okurigana để `reading` rỗng. Bất biến kiểm tra tự động: ghép mọi `surface` phải khớp đúng 100% câu `ja`.
3. **Romaji**: Hepburn, phản ánh đúng âm đọc (は = wa khi là trợ từ, へ = e, を = o).
4. **Dịch**: dịch sang 11 ngôn ngữ trong `translations{}` cùng một lượt. Chuẩn cao nhất: tiếng Việt — sát nghĩa, tự nhiên, giữ đúng tính chất câu (khẳng định không thành câu hỏi, mệnh lệnh giữ mệnh lệnh). Các ngôn ngữ còn lại cùng đường ống, kiểm tra mẫu bằng dịch ngược.
5. **Từ vựng**: chọn 5–10 từ chính của video: từ, cách đọc, nghĩa, mức JLPT thật thà.
6. **Teaser**: chọn đoạn 30–45 giây hay nhất, câu trọn vẹn, đứng độc lập được; xuất file `.ass` 2 lớp (Nhật + Việt, căn dưới khung dọc 9:16) vào `public/teasers/<id>.ass`, ghi `teaser.start/end`.
7. **Xuất bản**: ghi `content/videos/<id>.json` đúng schema `VideoContent` trong `src/lib/content-schema.ts` + tóm tắt QC ở `content/videos/<id>.qc.md`.

## Chuẩn cứng

- Tiếng Nhật đúng tuyệt đối; không bịa câu không có trong video.
- Cách đọc furigana sai = lỗi nghiêm trọng nhất, rà từng từ kanji.
- Không tải video về host — app chỉ nhúng YouTube IFrame.
- Mỗi đợt lọc phải cân bằng 3 dòng nội dung theo kế hoạch kho; không để kho lệch hẳn về một dòng.

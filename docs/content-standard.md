# Chuẩn nội dung v2 — MiraiGo

Áp dụng từ 25/11/2026 cho mọi gói mới và mọi gói cũ được nâng cấp. Mục tiêu: làm đúng một lần,
không phải sửa đi sửa lại. Mọi tiêu chí đo được bằng máy nằm trong `scripts/qc-standard.mjs`.
Gói có `"standard": 2` mà trượt bất kỳ tiêu chí nào thì `npm run verify` đỏ, không được gộp.

Báo cáo toàn kho: `npm run qc:report` → `docs/content-audit.md`.

## 1. Định vị (Việt chốt lại 25/11/2026)

MiraiGo là app **giải trí bằng tiếng Nhật**: xem video, nghe và đọc truyện bằng tiếng Nhật, có giải thích và đúng
cấp độ của từng người. Ai cũng dùng được lúc rảnh. Đây không phải app luyện thi JLPT; N5–N1 chỉ là nhãn độ khó.
Slogan: **"Xem phim vui, nghe truyện hay. Tiếng Nhật trong tay, giỏi lên mỗi ngày."** (bản 11 ngôn ngữ nằm ở
`onboarding.welcome` trong `src/i18n/locales/`). Mỗi bài trước hết phải **hay**: có cốt truyện, hài hoặc cuốn hút.
Bài về đời sống ở Nhật vẫn là một kệ, nhưng không phải định vị chính.

## 2. Pháp lý (chặn tuyệt đối)

- Truyện: chỉ sáng tác gốc hoặc tác phẩm public domain. Ở Nhật: tác giả mất năm 1967 trở về trước
  (thời hạn 70 năm từ 30/12/2018 không áp ngược). App bán toàn cầu nên kiểm thêm luật Mỹ: xuất bản
  trước 1931 là an toàn. Tác phẩm còn bản quyền ở Nhật vào ngày 1/1/1996 (tác giả mất từ 1946 trở đi)
  được Mỹ khôi phục bản quyền 95 năm tính từ năm xuất bản (luật URAA), nên tác giả mất 1946–1967 thì
  chỉ dùng tác phẩm in trước 1931. Ví dụ: Dazai Osamu (mất 1948), 走れメロス in 1940, còn bản quyền ở
  Mỹ đến hết 2035. **Bản dịch** cũng phải hết bản quyền hoặc do mình tự dịch. Không dùng nhân vật/cốt truyện
  anime, manga, phim còn bản quyền. Không dùng sách của NPO 多言語多読 (CC BY-NC-ND).
- Tin tức: tự viết từ sự kiện, thông tin công khai. Không chép hay dịch bài của NHK, Asahi hay báo khác.
- Video: chỉ nhúng YouTube (cho phép nhúng, xem được ở Nhật), không lưu bản sao.
- Ảnh: tự thiết kế hoặc có giấy phép thương mại rõ ràng. Không tranh AI phong cách Ghibli, không bìa
  sách thương mại.

## 3. Cấp độ đo bằng số liệu

Tách từ bằng kuromoji, tra cấp từng từ trong danh sách JLPT mở (`data/jlpt/`). Chỉ tính từ nội dung
(danh từ, động từ, tính từ, phó từ), bỏ tên riêng và số.

- **harder**: tỉ lệ từ khó hơn cấp bài. Đo "không quá khó".
- **atLevel**: tỉ lệ từ đúng cấp bài hoặc khó hơn. Đo "không quá dễ".

Ngưỡng cho **một chương truyện** (hiệu chỉnh trên kho hiện có và văn gốc 夢十夜 của Natsume Sōseki):

| Cấp | Độ dài (ký tự) | Số câu | Câu trung bình (ký tự) | harder tối đa | atLevel tối thiểu |
| --- | --- | --- | --- | --- | --- |
| N5 | 250–900 | 15–45 | ≤ 20 | 20% | |
| N4 | 500–1.800 | 20–60 | ≤ 26 | 15% | |
| N3 | 900–3.000 | 25–80 | 20–36 | 12% | 8% |
| N2 | 1.500–4.500 | 30–100 | 24–45 | 10% | 7% |
| N1 | 2.000–8.000 | 35–160 | 26–60 | | 4% |

Truyện dài hơn thì chia thành bộ nhiều chương (`series: { id, index }`). Mỗi chương đạt ngưỡng riêng.

**Video (một clip):** dài 45–240 giây. Không có khoảng trống phụ đề nào dài hơn 8 giây trong clip. Mỗi
dòng dài tối đa 12 giây (dài hơn thì tách câu). Mốc thời gian phải khớp tiếng nói, sai lệch tối đa
0,5 giây (nghe kiểm, ghi trong `.qc.md`).

## 4. Từ vựng

- Cấp của từ = cấp trong danh sách JLPT. Từ không có trong danh sách thì người soạn tự gắn và ghi lý do
  trong `.qc.md`. Gắn khác danh sách là lỗi chặn.
- Mỗi từ có nghĩa đủ 11 ngôn ngữ.
- Từ vựng chọn là từ người học cần tra ở cấp đó (từ đúng cấp hoặc khó hơn), không liệt kê từ quá cơ bản.

## 5. Bản dịch và giải thích

- Tiêu đề, mọi câu, mọi nghĩa từ: đủ 11 ngôn ngữ (vi, en, zh-Hans, zh-Hant, ko, tl, ne, id, pt, my, th).
- **Mọi câu có giải thích viết sẵn** (`grammarNote`, 11 ngôn ngữ): ngữ pháp chính, sắc thái, và cách
  dùng ngoài đời ở Nhật khi có. Không gọi AI lúc người dùng bấm (Việt chốt 25/11).
- Dịch từ tiếng Nhật (không dịch chồng qua tiếng Anh khi tránh được). Claude tự kiểm và duyệt theo
  quy tắc của Việt: dịch ngược kiểm nghĩa, kiểm thuật ngữ đời sống Nhật nhất quán.

## 6. Audio

- Truyện: mỗi câu một file, Google Cloud TTS giọng Nhật (Việt chốt 25/11). Ba giọng, Việt chọn 25/11:
  - `ja-JP-Chirp3-HD-Aoede`: giọng kể chuyện (lời dẫn, văn tự sự).
  - `ja-JP-Neural2-B` (nữ) và `ja-JP-Neural2-C` (nam): giọng giao tiếp, dùng cho lời thoại của nhân vật
    và cho bài hội thoại đời sống.
  - Chọn giọng theo cốt truyện và theo từng đoạn. Mỗi nhân vật giữ một giọng xuyên suốt bộ truyện.
- Ghi giọng của từng câu (hoặc quy tắc gán giọng) và tốc độ vào `.qc.md`. Mẫu nghe thử ở
  `/mnt/project-files/miraigo/tts-samples/`.

## 6b. Audio liền cho chương (bắt buộc với gói v2, Việt yêu cầu 25/11)

Người dùng nghe qua Bluetooth hoặc tai nghe khi đã tắt màn hình, nên mỗi chương là **một file audio liền**,
không phải mỗi câu một file (iOS có thể dừng giữa hai file khi máy khoá).

- Tạo audio từng câu bằng Google TTS, rồi ghép thành `public/audio/<id>/chapter.mp3` (mp3 mono 64 kbps). Giữa
  hai câu nghỉ 0,6 giây, khi đổi người nói thì nghỉ 0,9 giây. Không lưu file từng câu vào repo.
- `audioTrack: { src: "/audio/<id>/chapter.mp3", durationSec }`. Mỗi câu có `t: [start, end]` (giây, đo bằng ffprobe
  khi ghép), `voice` (một trong 3 giọng ở mục 6), và `audio: "<src>#t=<start>,<end>"` để trình đọc phát đúng câu.
- QC kiểm: file tồn tại, mốc tăng dần, nằm trong thời lượng, `audio` khớp `t`, câu nào cũng có `voice`.

## 6c. Bài học của chương (thẻ "Bài học")

- `lesson.grammarPoints`: 2–4 mẫu ngữ pháp chính của chương. Mỗi mẫu có `pattern`, `meaning` đủ 11 ngôn ngữ, và
  `example` là chỉ số của câu ví dụ trong chương.
- `lesson.quiz`: 3–5 câu hỏi hiểu bài. Câu hỏi và các lựa chọn viết bằng tiếng Nhật đúng cấp, có ít nhất 3 lựa
  chọn, `answer` là chỉ số đáp án đúng, `explain` đủ 11 ngôn ngữ.
- Từ vựng vẫn ghi theo từng câu (mục 4). Thẻ Bài học tự gom từ vựng của cả chương, nên không cần ghi lại.

## 6d. Kệ

- `shelf`: literature | mystery | ghost | rakugo | folktale-jp | hometown | world | life-series | life.
- Truyện quê hương: `shelf: "hometown"` và `origin` là mã nước gồm 2 chữ in hoa (VN, KR, CN, PH, ID, TH, NP, MM, BR).

## 7. Bìa và hình ảnh

- Mỗi truyện hoặc bộ truyện có ảnh bìa ở `public/covers/<id>.webp`, tỉ lệ 3:4, tối thiểu 900×1200.
- Một hệ hình ảnh thống nhất theo màu logo (navy, đỏ). Không tranh AI phong cách Ghibli.

## 8. Không trùng

- Không câu nào (dài hơn 6 ký tự) trùng y nguyên với gói khác.
- Không hai gói cùng một tình huống hoặc cùng một tác phẩm gốc (vd hashire-melos và hashire-merosu).

## 9. Quy trình một gói

1. Chọn chủ đề theo lộ trình sống. Kiểm tra trùng trong `docs/content-audit.md`.
2. Soạn tiếng Nhật đạt ngưỡng ở mục 3. Chạy `npm run qc:report` để xem số đo.
3. Furigana, romaji, từ vựng (cấp theo danh sách), dịch và giải thích 11 ngôn ngữ.
4. Audio (truyện) hoặc nghe kiểm mốc thời gian (video). Ảnh bìa.
5. Đặt `"standard": 2`, chạy `npm run verify` trên bản clone sạch, commit, ghi `docs/review-log.md`.

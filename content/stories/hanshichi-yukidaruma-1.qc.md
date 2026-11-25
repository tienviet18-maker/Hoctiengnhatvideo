# QC — hanshichi-yukidaruma-1 （岡本綺堂「半七捕物帳・雪達磨」一）· chuẩn v2

- **Nguồn**: 岡本綺堂「雪達磨」(半七捕物帳), đăng 1919. Tác giả mất 1939: hết bản quyền ở Nhật và ở Mỹ. Văn bản gốc đọc từ Aozora Bunko.
- **Chuyển thể**: tự viết lại bằng tiếng Nhật N3, chia 2 tập. Tập 1: Tết 文久二年 tuyết lớn, ngày 17 người tuyết ở 一ツ橋 tan lộ ra thi thể không vết thương, Hanshichi nhặt hạt 南京玉 trong bùn và trong tay áo, lần theo tiệm 菊一 đến quán trọ 信濃屋, xác định người chết là 甚右衛門 (上州太田), mở tủ thấy đầy hạt cườm. Kết bằng tiếng 「あっ」 để nối sang tập 2. Nguồn soạn: `content/sources/v2/hanshichi-yukidaruma/`.
- **Cảnh nhạy cảm**: thi thể chỉ mô tả "ngồi, không vết thương, đi chân đất"; không có chi tiết ghê rợn.
- **Cấp độ** (`build-story.mjs --measure`): 1.769 ký tự, 52 câu, TB 34,0 ký tự/câu, từ vượt cấp 6,0%, từ đạt cấp 23,4% → N3.
- **Từ vựng**: cấp lấy từ `data/jlpt` bằng script đồng bộ (tra chữ viết, rồi `kana:` cách đọc). Không có trong danh sách, tự gắn:
  - 雪だるま → N2 (danh sách chỉ có dạng khác; từ đời sống quen thuộc).
  - ずらりと, 空き地, 岡っ引, 縄張り, 番屋, 同心, 南京玉, 旅人, 番頭, 宿帳, 百姓 → N1: từ lịch sử Edo hoặc từ văn viết.
  - 炭 (すみ) → N1: danh sách không có 炭; tra theo cách đọc sẽ trúng 隅 (N4) nên giữ tay.
  - 一粒 → N2 (粒 N2 + 一); 昼過ぎ → N3 (昼 N5 + 過ぎ).
- **Furigana**: sửa kuromoji bằng `readings`: 三日間 みっかかん, 日かげ ひかげ, 一ツ橋 ひとつばし, 馬喰町 ばくろちょう, 上州 じょうしゅう, 甚右衛門 じんえもん, 菊一 きくいち, 信濃屋 しなのや, 三浦 みうら.
- **Dịch và giải thích**: 52 câu × 11 ngôn ngữ, dịch từ tiếng Nhật. Claude tự kiểm: dịch ngược bản en/vi; tên riêng thống nhất (半七 Hanshichi, 三浦 Miura, 甚右衛門 Jin'emon, 菊一 Kikuichi, 信濃屋 Shinanoya); 南京玉 = "hạt cườm thủy tinh / glass bead". Giải thích nối đời sống (お土産 cho đồng nghiệp, 宿帳 ở khách sạn, 一合 khi nấu cơm, お疲れさまです vs ご苦労さま, 番屋 ≈ 交番).
- **Audio** (`voices.json` dùng chung cả bộ): lời kể Aoede 0,9. Thoại nam Neural2-C: Hanshichi (0, 1,0, giống bộ お文の魂), Miura (−4, 0,95), người tuyết/dân phố (+1, 1,05), quản lý 菊一 (+3, 0,95), quản lý quán trọ (+2). Một file liền `chapter.mp3`, 6 phút 9 giây, mỗi câu −18 LUFS.
- **Kệ**: mystery, nhóm 岡本綺堂. Miễn phí (tập 1).
- **Bài học**: 〜たがる (câu 38), 〜たきり (câu 44), 〜はずだ (câu 51); 4 câu hỏi hiểu bài.
- **Bìa**: motif tuyết, font Shippori Antique, dòng phụ 半七捕物帳 一.

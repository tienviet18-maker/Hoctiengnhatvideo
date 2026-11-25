# QC — peppa-pancake-flip

- **Nguồn**: như `peppa-pancake-batter` (Peppa Pig 公式, `G0wHgMKJRSU`, cho nhúng, xem được tại Nhật).
- **Clip**: 98.68–152.86 (54 giây, 14 dòng). Khoảng trống lớn nhất 5,5 giây, dòng dài nhất 5,4 giây.
- **Vì sao dừng ở 152,86s**: sau đó có khoảng nhạc 152,9–161,2s (8,3 giây, vượt luật 8 giây). Đoạn 192–202s ASR không nhận được lời (「誰言ったら」) nên không dựng tiếp phần cuối tập.
- **Nguồn phụ đề / điểm lọc**: phụ đề tự động `ja-orig`; 9/10 như gói trên.
- **Lỗi ASR đã sửa**: マミーピック/ダディピック/ダディック → マミーピッグ/ダディピッグ; 「1 / 枚目はジョージの分」 (ASR tách số) → 「1枚目はジョージの分。」; 「ミーピッグが…」 → 「マミーピッグが…」; tách câu bị gộp trong một sự kiện.
- **Đã BỎ**: 「うん。おし。」 (156,6s, không rõ nghĩa) — nằm ngoài clip.
- **Mốc thời gian (căn lại 26/11/2026 bằng Whisper)**: tải tạm âm thanh YouTube về iMac, faster-whisper `small` lấy mốc từng từ, khớp chữ với câu của gói (tỉ lệ khớp 0,90), rồi XOÁ file âm thanh. Mốc cũ từ phụ đề tự động lệch trung bình 0,29 giây, tối đa 1,5 giây so với Whisper. Giữ mốc cũ cho 「美味しいね。」 (133s) vì Whisper không khớp đủ chữ.
- **Cấp độ**: N4. **Từ vựng**: 3 từ (焼く N4, ひっくり返す N2, 分 N3); 放り上げる・シロップ không có trong danh sách nên không chọn.
- **Teaser**: 112.76–152.86 (40,1 giây).
- **26/11**: clip mới 112–197s (21 dòng). Thêm 9 câu 156–197s theo Whisper; câu 156s 「うーん、美味しい。」 trước bị bỏ vì ASR ghi 「うん。おし。」, Whisper xác nhận lời nói.

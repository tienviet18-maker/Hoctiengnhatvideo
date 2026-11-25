# QC — budori-4 （宮沢賢治「グスコーブドリの伝記」四）· chuẩn v2

- **Nguồn**: 宮沢賢治「グスコーブドリの伝記」, đăng trên tạp chí 児童文学 năm 1932. Tác giả mất 1933: hết bản quyền ở Nhật và ở Mỹ. Văn bản gốc đọc từ Aozora Bunko.
- **Chuyển thể**: tự viết lại bằng tiếng Nhật N3. Tập 4 (雲の海とカルボナード島): mưa phân bón từ lưới khói điện, mùa màng bội thu; Budori bị dân làng hiểu lầm và đánh, sự thật về kỹ sư nông nghiệp đổ lỗi; gặp lại Neri; năm năm hạnh phúc; cái lạnh trở lại; Budori xin đi làm nổ núi lửa đảo カルボナード và ở lại một mình. Kết thúc giữ đúng bản gốc: không mô tả cái chết, chỉ "一人、島に残りました" và hình ảnh các gia đình qua mùa đông ấm áp. Nguồn soạn: `content/sources/v2/budori/`.
- **Cảnh nhạy cảm**: cảnh bị đánh chỉ một câu (câu 16), không chi tiết. Sự hy sinh được kể gián tiếp, không cổ vũ việc tự hại; giải thích nhấn vào lý do Budori chọn (người khác sẽ tiếp tục công việc) và sự ấm áp của đoạn kết.
- **Cấp độ** (`build-story.mjs --measure`): 1.794 ký tự, 50 câu, TB 35,9 ký tự/câu, từ vượt cấp 7,5%, từ đạt cấp 22,5% → N3.
- **Từ vựng**: cấp lấy từ `data/jlpt`, đã đối chiếu từng dòng V và theo cấp của danh sách khi có. Không có trong danh sách, tự gắn:
  - 張る, 立派 → N3: từ đời thường (ポスターを張る, 立派な人); danh sách chỉ có dạng khác chữ.
  - 見つめる → N2: động từ ghép thường gặp trong văn kể.
  - ざあざあ, ぐんぐん (tượng thanh/tượng hình), 飛び上がる, 通りかかる (động từ ghép), 生きがい, にごる, たき火 → N1: văn chương, ngoài tầm N2.
- **Furigana**: sửa cách đọc kuromoji bằng `readings`: 一面 いちめん, 緑色 みどりいろ, 赤銅色 しゃくどういろ, 二十七歳 にじゅうななさい, 今爆発 いまばくはつ, 雲の下 くものした, 下は したは, 大博士 だいはかせ, 老技師 ろうぎし, 火山局 かざんきょく, 発電所 はつでんしょ…
- **Dịch và giải thích**: 50 câu × 11 ngôn ngữ, dịch từ tiếng Nhật. Claude tự kiểm: dịch ngược bản en/vi; tên riêng thống nhất (カルボナード島 = đảo Karbonado / Karbonado Island, ネリ = Neri, ペンネン = Pennen). Giải thích nối với đời sống ở Nhật: お見舞い (tránh hoa chậu), 生きがい / ikigai, 〜させてください khi xin phép ở chỗ làm, cặp 〜のせいで / 〜のおかげで, ý tưởng khí làm ấm Trái Đất mà Kenji viết từ 1932.
- **Audio** (`voices.json` dùng chung cả bộ): lời kể Aoede 0,9. Thoại nam Neural2-C: Budori (+4), Kūbō (−2, 0,95), Pennen (−6, 0,88), dân làng (0, 1,05). Thoại nữ Neural2-B: Neri (+4, 0,95), giữ đúng giọng Neri của tập 1. Một file liền `chapter.mp3`, 6 phút 10 giây.
- **Kệ**: literature, nhóm 宮沢賢治. Gói trả phí (free: false).
- **Bài học**: 〜のせいで (câu 15), 〜のおかげで (câu 26), 〜た末(に) (câu 33); 4 câu hỏi hiểu bài.
- **Bìa**: motif núi, font BIZ UDPMincho, dòng phụ 宮沢賢治 四.

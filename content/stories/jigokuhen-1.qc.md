# QC — jigokuhen-1 （芥川龍之介「地獄変」一）· chuẩn v2

- **Nguồn**: 芥川龍之介「地獄変」, đăng trên 大阪毎日新聞 và 東京日日新聞 năm 1918. Tác giả mất 1927: hết bản quyền ở Nhật và ở Mỹ. Văn bản gốc đọc từ Aozora Bunko.
- **Chuyển thể**: tự viết lại bằng tiếng Nhật N2, chia 2 tập. Giữ người kể là gia nhân của 堀川の大殿様 và giọng kính ngữ của bản gốc. Tập 1: chân dung Yoshihide, cô con gái và con khỉ nhỏ, lệnh vẽ bình phong địa ngục, thói "phải tận mắt thấy" (xích đệ tử, thả cú), giấc mơ địa ngục, đêm cô gái chạy ra khỏi căn phòng, lời xin đốt cỗ xe bò. Kết ở tiếng cười của lãnh chúa làm móc nối sang tập 2. Nguồn soạn: `content/sources/v2/jigokuhen/`.
- **Cảnh nhạy cảm**: cảnh lãnh chúa cưỡng ép cô gái chỉ được gợi ý (quần áo xộc xệch, tiếng bước chân xa dần, cô không nói gì), không mô tả, giống cách bản gốc để người đọc tự hiểu. Cảnh đệ tử bị xích, bị cú đuổi giữ ở mức một câu.
- **Cấp độ** (`build-story.mjs --measure`): 1.732 ký tự, 48 câu, TB 36,1 ký tự/câu, từ vượt cấp 8,0%, từ đạt cấp 12,8% → N2.
- **Từ vựng**: cấp lấy từ `data/jlpt`. Không có trong danh sách, tự gắn:
  - 由来, 絵師, 献上 → N1: từ văn viết/lịch sử, đời sống ít dùng.
  - 閉じこもる, うなされる → N1: động từ sắc thái, ngoài cấp N2 của danh sách.
  - 牛車 (ぎっしゃ) → N1: từ lịch sử thời Heian.
  - 思いやり, 足音, 望み → N2: từ thường gặp ở trình độ trung cao, cùng nhóm với 思い込む, 浮かべる (N2 trong danh sách).
- **Furigana**: sửa cách đọc kuromoji bằng `readings`: 小猿 こざる, 近くの間 ちかくのあいだ, ほど後 ほどあと, 牛車 ぎっしゃ, 大殿様 おおとのさま, 良秀 よしひで, 屏風 びょうぶ, 女房 にょうぼう.
- **Dịch và giải thích**: 48 câu × 11 ngôn ngữ, dịch từ tiếng Nhật. Claude tự kiểm: dịch ngược bản en/vi; thuật ngữ thống nhất (大殿様 = Đại lãnh chúa / the Lord, 若殿様 = cậu chủ trẻ / the young lord, 女房 = nữ quan / lady-in-waiting, 屏風 = bình phong / screen). Giải thích tập trung vào 敬語 (お〜になる, お〜する, ございます, いらっしゃる) và nối với đời sống ở Nhật (自分へのごほうび, 二割引, 予約でなければ入れません, 女房 ngày nay là "vợ").
- **Audio** (`voices.json` dùng chung cả bộ): lời kể Aoede 0,9. Thoại nam Neural2-C: Yoshihide (−4, 0,88), Đại lãnh chúa (−7, 0,85), cậu chủ trẻ (+4), đệ tử (+2, 1,05). Thoại nữ Neural2-B: cô con gái (+1, 0,9). Một file liền `chapter.mp3`, 6 phút 7 giây, mỗi câu −18 LUFS.
- **Kệ**: literature.
- **Bài học**: AほどBはない (câu 3), 〜たがる (câu 26), 〜でなければ〜ない (câu 29); 4 câu hỏi hiểu bài.
- **Bìa**: motif ngọn lửa, font Shippori Mincho B1 (văn học), dòng phụ 芥川龍之介 一.

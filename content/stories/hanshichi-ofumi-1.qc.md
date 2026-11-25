# QC — hanshichi-ofumi-1 （半七捕物帳「お文の魂」一）· chuẩn v2

- **Nguồn**: 岡本綺堂「お文の魂」, vụ đầu tiên của 半七捕物帳, đăng trên 文芸倶楽部 tháng 1/1917. Tác giả mất 1939: hết bản quyền ở Nhật và ở Mỹ. Văn bản gốc đọc từ Aozora Bunko.
- **Chuyển thể**: tự viết lại bằng tiếng Nhật dễ, chia 2 tập. Tập 1 giữ khung kể của bản gốc (ông chú K kể cho cháu), vụ ma ướt sũng nước hiện về đòi Oharu, Omichi xin ly hôn, Matsumura và Obata tra sổ Sakaiya, Hanshichi xuất hiện và hỏi hai câu then chốt (sách tranh, chùa của gia đình). Tập kết ở câu móc nối "giao cho tôi" để chế độ lái xe chuyển sang tập 2. Nguồn soạn: `content/sources/v2/hanshichi-ofumi/`.
- **Cấp độ** (`build-story.mjs --measure`): 1.320 ký tự, 46 câu, TB 28,7 ký tự/câu, từ vượt cấp 8,2%, từ đạt cấp 19,1% → N3.
- **Từ vựng**: cấp lấy từ `data/jlpt` (tra theo chữ viết, xem ghi chú công cụ bên dưới). Không có trong danh sách, tự gắn:
  - 怪談 → N1: từ văn hoá/văn học, đời sống ít dùng (cùng nhóm 幽霊, 屋敷 là N1 trong danh sách).
  - 岡っ引 → N1: từ lịch sử thời Edo, chỉ gặp trong truyện và phim cổ trang.
- **Dịch và giải thích**: 46 câu × 11 ngôn ngữ, dịch từ tiếng Nhật. Claude tự kiểm: dịch ngược bản en/vi về ý tiếng Nhật; thuật ngữ thống nhất (旦那 = "ông/ngài/sir", 岡っ引 giữ phiên âm okappiki và giải thích ở câu 34, 菩提寺 = chùa của gia đình). Giải thích nối với đời sống ở Nhật khi hợp (人材派遣, 喫煙所/路上喫煙, 漫画喫茶, マイナンバー).
- **Audio** (`scripts/produce/tts.mjs`, `voices.json` dùng chung cả bộ): lời kể `ja-JP-Chirp3-HD-Aoede` 0,9. Thoại nam Neural2-C: chú K (−2), Matsumura (−5), Obata (+2), Hanshichi (0, tốc độ 1,0), sư trụ trì (−6, 0,85, dùng ở tập 2). Thoại nữ Neural2-B: Omichi (0), bé Oharu (+5). Một file liền `chapter.mp3` (mono 64 kbps, 4 phút 49 giây), nghỉ 0,6/0,9 giây (đổi người nói), mỗi câu −18 LUFS.
- **Kệ**: mystery.
- **Bài học**: 〜たことがない (câu 25), 〜ことにする (câu 26), AというのはBです (câu 34); 4 câu hỏi hiểu bài.
- **Bìa**: motif đèn lồng, font Shippori Antique (trinh thám), dòng phụ 半七捕物帳 一, nhãn kệ 岡本綺堂.
- **Sửa công cụ trong đợt này**: (1) cấp từ vựng không còn tra theo cách đọc khi từ có kanji (trước đó 怪談 bị nhận nhầm thành 階段 N5); áp cho cả `qc-standard.mjs`; (2) cách đọc từ vựng lấy theo dạng từ điển (雇う やとう, không phải やとっ). Đã dựng lại akai-rousoku-to-ningyo với công cụ mới.

# QC — akai-rousoku-to-ningyo （赤い蝋燭と人魚）· chuẩn v2

- **Nguồn**: 小川未明「赤い蝋燭と人魚」, in lần đầu trên 東京朝日新聞 16–20/2/1921. Tác giả mất 1961: hết bản quyền ở Nhật; in trước 1931 nên an toàn ở Mỹ (không bị URAA khôi phục). Văn bản gốc đọc từ Aozora Bunko (card 54372).
- **Chuyển thể**: tự viết lại bằng tiếng Nhật dễ, giữ đủ 5 phần của truyện gốc (人魚 lên bờ → ông bà nhặt con → nến vẽ và lời đồn → kẻ buôn và cũi sắt → người đàn bà tóc ướt, bão, thị trấn biến mất). Nguồn soạn: `content/sources/v2/akai-rousoku/`.
- **Cấp độ (đo bằng `build-story.mjs --measure`)**: 1.810 ký tự, 61 câu, TB 29,7 ký tự/câu, từ vượt cấp 6,0%, từ đạt cấp 18,7% → N3 (ban đầu định N4 nhưng từ vượt cấp 18,7% > 15%, nên xếp N3 đúng số liệu).
- **Từ vựng**: cấp lấy từ `data/jlpt`. 人魚 không có trong danh sách: gắn N2 (từ văn học, ít gặp trong đời sống, cùng nhóm với 漁師, 神様).
- **Dịch và giải thích**: 61 câu × 11 ngôn ngữ, dịch từ tiếng Nhật. Claude tự kiểm theo quy tắc của Việt: dịch ngược bản en/vi về ý tiếng Nhật, giữ thống nhất thuật ngữ (神社 = đền/shrine, không lẫn với お寺; ろうそく = nến). Mỗi giải thích nêu ngữ pháp chính và một ví dụ đời sống ở Nhật khi hợp.
- **Audio** (`scripts/produce/tts.mjs`, giọng ghi ở `voices.json`): lời kể `ja-JP-Chirp3-HD-Aoede` tốc độ 0,9. Lời thoại: mẹ tiên cá Neural2-B (pitch −1), cô gái Neural2-B (+2), bà lão Neural2-B (−4, 0,85), ông lão Neural2-C (−4, 0,85), kẻ buôn Neural2-C (+1). Ghép thành một file liền `public/audio/akai-rousoku-to-ningyo/chapter.mp3` (mono 64 kbps, 6 phút 28 giây), nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói; mỗi câu chuẩn hoá −18 LUFS. Mốc `t` tính theo số mẫu khi ghép (kiểm bằng silencedetect: khoảng lặng nằm đúng giữa hai mốc).
- **Bìa**: `scripts/produce/cover.mjs`, motif nến, font Zen Old Mincho.
- **Kệ**: literature.
- **Bài học** (`.lesson.txt`): 〜てもらいたい (câu 11), 〜ようになる (câu 32), 〜てしまう (câu 42); 4 câu hỏi hiểu bài, đáp án ở vị trí khác nhau.

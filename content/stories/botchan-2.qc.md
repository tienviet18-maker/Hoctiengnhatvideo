# QC — botchan-2 （夏目漱石「坊っちゃん」二）· chuẩn v2

- **Nguồn**: 夏目漱石「坊っちゃん」, đăng 1906. Tác giả mất 1916: hết bản quyền ở Nhật và ở Mỹ. Văn bản gốc đọc từ Aozora Bunko (chương 2–3).
- **Chuyển thể**: tự viết lại bằng tiếng Nhật N3. Tập 2: tới cảng, tàu "hộp diêm", nhà trọ và 5 yên tiền trà nước, hiệu trưởng "Lửng" và giấy bổ nhiệm, đặt biệt danh (赤シャツ, うらなり, 野だいこ, 山嵐 = 堀田), thư cho 清, học trò nói phương ngữ 〜ぞなもし, 天ぷらそば 4 bát → 「天ぷら先生」, 団子二皿七銭, 赤手ぬぐい, bơi ở onsen → 「湯の中で泳ぐべからず」. Kết có móc nối sang tập 3 (đêm trực, châu chấu).
- **Lược bỏ so với gốc**: phần lớn bài giảng ở trường và vài cảnh phụ ở quán trọ, để giữ nhịp nghe 5–6 phút. Không thêm tình tiết mới.
- **Cấp độ** (`build-story.mjs --measure`): 1.655 ký tự, 52 câu, TB 31,8 ký tự/câu, từ vượt cấp 8,6%, từ đạt cấp 16,5% → N3.
- **Từ vựng**: cấp lấy từ `data/jlpt` bằng script đồng bộ, rồi soát các từ khớp qua kana: 移す (khớp 写す N4) → N3; 手ぬぐい (khớp 手拭い N2) giữ N2. Không có trong danh sách, tự gắn: 宿屋, 茶代, たぬき, 辞令, あだ名, 職員室, 教頭, 主任, 汽船, 手本, 団子, 湯船, 見張る → N1; 顔色 → N2; 話し方 → N4.
- **Furigana**: sửa kuromoji bằng `readings`: 教育者 きょういくしゃ, 茶代 ちゃだい, 辞令 じれい, 教頭 きょうとう, 堀田 ほった, 山嵐 やまあらし, 江戸っ子 えどっこ, 四杯 よんはい, 二皿 ふたさら, 七銭 ななせん, 湯船 ゆぶね, 札 ふだ, 十分 じっぷん (mười phút), 真っ裸 まっぱだか, 床 ゆか, v.v.
- **Dịch và giải thích**: 52 câu × 11 ngôn ngữ. Claude tự kiểm: dịch ngược en/vi; biệt danh dịch nghĩa ở vi (Lửng, Áo đỏ, Bí cuối mùa, Hề nhà quê, Nhím núi), phiên âm kèm nghĩa ở các ngôn ngữ khác; phương ngữ 〜ぞなもし dịch bằng đuôi câu quê mộc tương ứng (vi "nà", ko "~유", zh "哩"), en/tl/id/pt giữ "zonamoshi". Giải thích nối với du lịch Matsuyama hiện nay (tàu Botchan, dango Botchan, Dōgo Onsen và tấm biển cấm bơi) và văn hóa (không có tiền boa ở Nhật, không bơi trong onsen).
- **Audio**: lời kể Aoede 0,9. Thoại: Botchan Neural2-C (+2, 1,05), hiệu trưởng Tanuki Neural2-C (−6, 0,88), Yamaarashi Neural2-C (−2, 1,05), học trò Neural2-C (+7, 1,1). Giọng cố định cho cả series (`voices.json`). Một file liền `chapter.mp3`, 5 phút 47 giây.
- **Kệ**: literature, nhóm 夏目漱石. VIP (tập 2).
- **Bài học**: まるで〜ようだ (câu 43), 〜つもりだ (câu 47), 〜たら、きっと〜だろう (câu 50); ôn lại 〜ことにする của tập 1 ở câu 48; 4 câu hỏi hiểu bài.
- **Bìa**: motif sóng, font Zen Old Mincho, dòng phụ 夏目漱石 二.

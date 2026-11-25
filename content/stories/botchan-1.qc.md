# QC — botchan-1 （夏目漱石「坊っちゃん」一）· chuẩn v2

- **Nguồn**: 夏目漱石「坊っちゃん」, đăng 1906. Tác giả mất 1916: hết bản quyền ở Nhật và ở Mỹ. Văn bản gốc đọc từ Aozora Bunko (chương 1).
- **Chuyển thể**: tự viết lại bằng tiếng Nhật N3, giữ giọng kể ngôi thứ nhất 「おれ」 sảng khoái. Tập 1: tuổi thơ liều lĩnh (nhảy từ tầng hai, cắt tay), cha mẹ lạnh nhạt, bà giúp việc 清 thương cậu, cha mất, anh trai chia 600 yên, học trường Vật lý ba năm, nhận việc dạy toán ở Shikoku 40 yên/tháng, chia tay 清 ở ga Shinbashi (笹飴 xứ Echigo).
- **Series**: 坊っちゃん 6 tập (N3). Bản cũ `botchan` (N4, 12 câu) vẫn giữ cho người mới; series v2 là id mới `botchan-1..6`.
- **Cấp độ** (`build-story.mjs --measure`): 1.622 ký tự, 52 câu, TB 31,2 ký tự/câu, từ vượt cấp 11,1%, từ đạt cấp 22,3% → N3.
- **Từ vựng**: cấp lấy từ `data/jlpt` bằng script đồng bộ, rồi soát tay các từ chỉ khớp qua cách đọc kana: 気性 (khớp nhầm 気象) → N1, 甥 → N2, ろく → N1. Không có trong danh sách, tự gắn: 親譲り, 無鉄砲, 同級生, 弱虫, ひいき, 女中, 枕元, 笹飴 → N1; 飛び降りる → N2.
- **Furigana**: sửa kuromoji bằng `readings`: お家 おうち, 清 きよ, 十日 とおか, 八日目 ようかめ, 六百円 ろっぴゃくえん, 白髪 しらが, 気性 きしょう, 越後 えちご, 笹飴 ささあめ, 甥 おい, 枕元 まくらもと, v.v.
- **Dịch và giải thích**: 52 câu × 11 ngôn ngữ. Claude tự kiểm: dịch ngược en/vi; tên thống nhất (清 Kiyo, 坊っちゃん Botchan, おやじ = bố); sửa một lỗi gõ Devanagari trong ghi chú tiếng Nepal. Giải thích nối với đời sống (〜らしい, 〜ことにする/〜ことになる, お土産).
- **Audio**: lời kể Aoede 0,9. Thoại: Botchan Neural2-C (+2, 1,05), bố Neural2-C (−5, 0,9), anh Neural2-C (+1, 0,95), bạn học Neural2-C (+6, 1,1), Kiyo Neural2-B (−4, 0,85). Giọng cố định cho cả series (`voices.json`). Một file liền `chapter.mp3`, 5 phút 47 giây.
- **Kệ**: literature, nhóm 夏目漱石. Miễn phí (tập 1).
- **Bài học**: 〜らしい (câu 18), 〜ことにする (câu 30), もう少しで〜ところだった (câu 51); 4 câu hỏi hiểu bài.
- **Bìa**: motif sóng (biển Shikoku), font Zen Old Mincho, dòng phụ 夏目漱石 一.

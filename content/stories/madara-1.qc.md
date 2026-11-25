# QC — madara-1 （コナン・ドイル「まだらの紐」一）· chuẩn v2

- **Nguồn**: Arthur Conan Doyle, "The Adventure of the Speckled Band" (1892, tiếng Anh). Tác giả mất 1930: hết bản quyền ở Nhật, ở Mỹ (in trước 1929) và ở Anh. Không dùng bản dịch tiếng Nhật nào (các bản dịch hiện đại còn bản quyền); Claude tự kể lại bằng tiếng Nhật từ nguyên tác tiếng Anh.
- **Ghi chú nguồn**: lúc soạn (25/11/2026), Project Gutenberg đang bảo trì và Wikisource giới hạn truy cập, nên Claude kể lại theo cốt truyện nguyên tác đã biết rõ (ngày tháng, tên người, tên nơi, chi tiết vật chứng). Đối chiếu lại câu chữ với nguyên tác khi trang mở lại.
- **Trường `source`**: schema chỉ có `original | aozora-adapted`; dùng `original` giống `a-christmas-carol` (truyện nước ngoài public domain do mình tự kể lại).
- **Chuyển thể**: N3, ngôi thứ nhất của Watson (わたし). Tập 1: tháng 4/1883, Helen Stoner run vì sợ; Holmes đoán cô đi tàu nhờ vé ở găng tay; cha dượng Dr. Grimesby Roylott (từng ở Ấn Độ, nóng nảy, nuôi báo săn và khỉ đầu chó); di sản của mẹ chia khi các con gái lấy chồng; Julia (chị song sinh) chết hai năm trước, hai tuần trước lễ cưới, sau câu hỏi về tiếng huýt sáo lúc 3 giờ sáng, đêm bão, tiếng thét, huýt sáo, tiếng kim loại; "まだらのひも!"; phòng kín, không vết thương; nay Helen cũng sắp cưới, phải ngủ ở phòng chị vì sửa nhà và nghe lại tiếng huýt sáo; Roylott xông vào dọa, bẻ cong que cời, Holmes uốn thẳng lại; di chúc cho thấy động cơ; Holmes dặn Watson mang súng.
- **Lược bỏ so với gốc**: chi tiết xe ngựa chở Helen ra ga, bùn trên tay áo, tên ga Leatherhead, cô bà Honoria, nghề nghiệp của mẹ, số tiền cụ thể của di chúc. Thứ tự sự kiện giữ như gốc.
- **Cấp độ** (`build-story.mjs --measure`): 1.695 ký tự, 52 câu, TB 32,6 ký tự/câu, từ vượt cấp 6,5%, từ đạt cấp 23,2% → N3.
- **Từ vựng**: cấp lấy từ `data/jlpt` bằng script đồng bộ; soát các từ khớp qua kana (見つめる, 式, 指さす: đúng từ, giữ). Không có trong danh sách, tự gắn: 暖炉, 怒りっぽい, 放し飼い, 口笛, 叫び声, まだら, 火かき棒, 遺言 → N1; 寝室, 内側, 天井 → N2; ひも → N3.
- **Furigana**: sửa kuromoji bằng `readings`: 一人 ひとり (kuromoji tách いち/にん), 開いた あいた, 一八八三年 せんはっぴゃくはちじゅうさんねん, 白いもの, 放し飼い, 怒りっぽい, 火かき棒, 遺言 ゆいごん, v.v.
- **Dịch và giải thích**: 52 câu × 11 ngôn ngữ. Tên thống nhất theo cách gọi phổ biến từng nước (vi "Dải băng lốm đốm", zh-Hant 「花斑帶探案」, zh 福尔摩斯/华生, ko 셜록 홈스). Giải thích nối với đời sống ở Nhật: 往復/片道 khi mua vé, 〜と申します khi phỏng vấn, mê tín huýt sáo ban đêm gọi rắn, 来月から大阪で働くことになりました, 市役所, いいお天気ですね, なるほど vs そうなんですね với cấp trên.
- **Audio**: lời kể Aoede 0,9. Thoại: Holmes Neural2-C (0, 1,0), Helen Neural2-B (+1, 0,95), Julia Neural2-B (+4, 1,0), Roylott Neural2-C (−8, 0,88). Một file liền `chapter.mp3`, 5 phút 41 giây.
- **Kệ**: world. Tập 1 miễn phí.
- **Bài học**: 〜ことになる (câu 35), 〜ようにする (câu 40), 〜ほど (câu 42); 4 câu hỏi hiểu bài.
- **Bìa**: motif nến (đêm canh), font Shippori Mincho B1, dòng phụ シャーロック・ホームズ 一, nhãn コナン・ドイル.

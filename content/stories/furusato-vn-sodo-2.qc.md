# QC — furusato-vn-sodo-2

- Nguồn: Tiểu thuyết 『Số đỏ』 của Vũ Trọng Phụng (1912–1939), in năm 1936; public domain. Claude tự kể lại bằng tiếng Nhật từ cốt truyện nguyên tác (Xuân làm 'đốc tờ' trong nhà cụ cố Hồng, cô Tuyết mặc bộ 'Ngây thơ', ông Phán 'mọc sừng' và cô Hoàng Hôn, Xuân chơi quần vợt giỏi nhờ thời nhặt bóng, báo Phật giáo 'Gõ Mõ' của Văn Minh, cụ cố tổ ốm nặng), rút gọn, có lược và sắp xếp lại một số chi tiết; không dùng bản dịch hiện đại nào.
- Chuẩn v2, cấp N2: 1994 ký tự, 61 câu, câu TB 32.7 ký tự, harder 7.7%, atLevel 11.8%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 大旦那=おおだんな, 寝台=しんだい, 親類=しんるい, 上流=じょうりゅう, 末の娘=すえのむすめ, 上の娘=うえのむすめ, 新作=しんさく, 無邪気=むじゃき, 品定め=しなさだめ, 薄々=うすうす, 薄暗い=うすぐらい, 容体=ようだい, 決まり文句=きまりもんく, 名手=めいしゅ, 木魚=もくぎょ, 前途有望=ぜんとゆうぼう, 名士=めいし, 一行=いちぎょう, 数か月=すうかげつ, 十九歳=じゅうきゅうさい, 一生=いっしょう, 心得て=こころえて, 手首=てくび, 脈=みゃく, 角=つの. Đã đọc lại toàn bộ.
- Từ vựng: 14 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-sodo-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (42 câu)
  - スアン: `ja-JP-Neural2-C`, tốc độ 1, cao độ 2 (6 câu)
  - ホン老人: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -8 (3 câu)
  - トゥエット: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 4 (2 câu)
  - ファーン氏: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -5 (3 câu)
  - ヴァンミン: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -2 (3 câu)
  - 紳士: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 5 (1 câu)
  - フォー・ドアン夫人: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -2 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông BIZ UDGothic.

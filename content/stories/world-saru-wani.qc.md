# QC — world-saru-wani

- Nguồn: Truyện 'Khỉ và cá sấu' trong Panchatantra (Ấn Độ, khoảng thế kỷ 3 TCN) và Jataka, thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật: cây hồng táo bên sông, vợ cá sấu đòi ăn tim khỉ, khỉ nói đã để tim trên cây.
- Chuẩn v2, cấp N3: 1252 ký tự, 46 câu, câu TB 27.2 ký tự, harder 1.5%, atLevel 25.4%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一本=いっぽん, 実=み, 一ぴき=いっぴき, 心臓=しんぞう, 背中=せなか, 真ん中=まんなか, 岸=きし, 向き=むき, 飛び下りて=とびおりて, 生き物=いきもの, 相手=あいて, 底=そこ, 知恵=ちえ, 命=いのち, 一度=いちど, お礼=おれい, 飛び乗りました=とびのりました, 木の下=きのした. Đã đọc lại toàn bộ.
- Từ vựng: 5 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-saru-wani/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (25 câu)
  - サル: `ja-JP-Neural2-C`, tốc độ 1.1, cao độ 6 (9 câu)
  - ワニ: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -6 (10 câu)
  - ワニの妻: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ -3 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kiwi Maru.

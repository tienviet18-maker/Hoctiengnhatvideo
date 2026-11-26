# QC — world-cinderella-2

- Nguồn: Truyện cổ tích 'Cendrillon' của Charles Perrault (1697), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N4, giữ mạch truyện gốc của Perrault (bà tiên đỡ đầu, quả bí, giày thủy tinh). Tập 2: hoàng tử đi tìm chủ chiếc giày, Lọ Lem tha thứ cho hai chị (đúng kết của Perrault).
- Chuẩn v2, cấp N4: 1025 ký tự, 48 câu, câu TB 21.4 ký tự, harder 14.4%, atLevel 34.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 何曲=なんきょく, 一度=いちど, 十二時=じゅうにじ, 六匹=ろっぴき, 一つ=ひとつ, お母さま=おかあさま, 行っても=いっても, かまど=かまど, 三人=さんにん, いただけません=いただけません, 上のお姉さん=うえ の おねえさん, 下のお姉さん=した の おねえさん, 数日後=すうじつご, 三百年=さんびゃくねん, 世界中=せかいじゅう, ひざ=ひざ, 娘さん=むすめさん, はいてみても=はいて みても. Đã đọc lại toàn bộ.
- Từ vựng: 33 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-cinderella-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (34 câu)
  - シンデレラ: `ja-JP-Neural2-B`, tốc độ 1, cao độ 4 (3 câu)
  - 継母: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -5 (1 câu)
  - 姉: `ja-JP-Neural2-B`, tốc độ 1.08, cao độ 1 (5 câu)
  - 魔法使い: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -2 (0 câu)
  - 王子: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 1 (3 câu)
  - 家来: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -5 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kaisei Decol.

# QC — world-cinderella-1

- Nguồn: Truyện cổ tích 'Cendrillon' của Charles Perrault (1697), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N4, giữ mạch truyện gốc của Perrault (bà tiên đỡ đầu, quả bí, giày thủy tinh). Tập 1: từ cuộc sống trong bếp đến nửa đêm ở vũ hội.
- Chuẩn v2, cấp N4: 1126 ký tự, 52 câu, câu TB 21.7 ký tự, harder 14.9%, atLevel 33.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 何曲=なんきょく, 一度=いちど, 十二時=じゅうにじ, 六匹=ろっぴき, 一つ=ひとつ, お母さま=おかあさま, 行っても=いっても, かまど=かまど, 三人=さんにん, いただけません=いただけません. Đã đọc lại toàn bộ.
- Từ vựng: 33 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-cinderella-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (37 câu)
  - シンデレラ: `ja-JP-Neural2-B`, tốc độ 1, cao độ 4 (4 câu)
  - 継母: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -5 (3 câu)
  - 姉: `ja-JP-Neural2-B`, tốc độ 1.08, cao độ 1 (3 câu)
  - 魔法使い: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -2 (4 câu)
  - 王子: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 1 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kaisei Decol.

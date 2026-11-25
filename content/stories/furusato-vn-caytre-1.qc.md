# QC — furusato-vn-caytre-1

- Nguồn: Truyện cổ tích dân gian Việt Nam (truyền khẩu, không thuộc bản quyền), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: 竹取物語 (thế kỷ 10, public domain).
- Chuẩn v2, cấp N3: 1476 ký tự, 63 câu, câu TB 23.4 ký tự, harder 6.0%, atLevel 20.9%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 百本=ひゃっぽん, 一本=いっぽん, 節=ふし, 一生けんめい=いっしょうけんめい, 竹取物語=たけとり ものがたり, かぐや姫=かぐやひめ, わし=わし, 三十=さんじゅう, 四十=よんじゅう, では=でわ, はなれなく=はなれなく, はなれました=はなれました, カック・ニャップ=かっく にゃっぷ, カック・スアット=かっく すあっと, ひとつになれ=ひとつ に なれ, ばらばらになれ=ばらばら に なれ. Đã đọc lại toàn bộ.
- Từ vựng: 15 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-caytre-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (45 câu)
  - コアイ: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 1 (5 câu)
  - 地主: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -4 (7 câu)
  - ブット: `ja-JP-Neural2-C`, tốc độ 0.82, cao độ -7 (4 câu)
  - 娘: `ja-JP-Neural2-B`, tốc độ 0.98, cao độ 1 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Yuji Syuku.

# QC — furusato-vn-maiantiem-1

- Nguồn: Truyện cổ tích dân gian Việt Nam (truyền khẩu, không thuộc bản quyền), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: わらしべ長者 (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1590 ký tự, 59 câu, câu TB 26.9 ký tự, harder 3.2%, atLevel 24.2%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, フン王=ふん おう, アン・ティエム=あん てぃえむ, ズア・ハウ=ずあ はう, 何羽=なんば, 三人=さんにん, わらしべ長者=わらしべ ちょうじゃ, 一本=いっぽん, では=でわ, 王さま=おうさま, わし=わし, 甘さ=あまさ, 人々=ひとびと, 宝物=たからもの, この実=この み, 土を=つち を. Đã đọc lại toàn bộ.
- Từ vựng: 26 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-maiantiem-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (46 câu)
  - アン・ティエム: `ja-JP-Neural2-C`, tốc độ 0.95 (5 câu)
  - 王: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -5 (4 câu)
  - 妻: `ja-JP-Neural2-B`, tốc độ 0.96 (2 câu)
  - 客: `ja-JP-Neural2-B`, tốc độ 1, cao độ -1 (1 câu)
  - 船の人: `ja-JP-Neural2-C`, tốc độ 1.02, cao độ -2 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Dela Gothic One.

# QC — furusato-kr-kongjwi-1

- Nguồn: Truyện dân gian Hàn Quốc 콩쥐팥쥐 (truyền khẩu và bản tiểu thuyết cổ, public domain), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống (lược phần kết bi thảm của một số dị bản), không chép tuyển tập hiện đại nào. Phần so sánh: 米福粟福 (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1676 ký tự, 48 câu, câu TB 34.9 ký tự, harder 5.6%, atLevel 27.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, やわらかい土=やわらかい つち, 一度=いちど, 一ぴき=いっぴき, 村中=むらじゅう, 米福粟福=こめぶくあわぶく, 米福=こめぶく, コンジュイ=こんじゅい, パッジュイ=ぱっじゅい, 韓国=かんこく, 世界中=せかいじゅう. Đã đọc lại toàn bộ.
- Từ vựng: 21 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-kr-kongjwi-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (38 câu)
  - コンジュイ: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (2 câu)
  - まま母: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ -5 (2 câu)
  - パッジュイ: `ja-JP-Neural2-B`, tốc độ 1.08, cao độ 5 (2 câu)
  - 黒い牛: `ja-JP-Neural2-C`, tốc độ 0.84, cao độ -8 (2 câu)
  - 役人: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -2 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kosugi Maru.

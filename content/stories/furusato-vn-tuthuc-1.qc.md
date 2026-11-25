# QC — furusato-vn-tuthuc-1

- Nguồn: Truyền thuyết dân gian Việt Nam (truyền khẩu; cũng có trong 傳奇漫錄 thế kỷ 16, public domain), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: 浦島太郎 (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1693 ký tự, 56 câu, câu TB 30.2 ký tự, harder 1.8%, atLevel 17.3%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一度でいいから=いちど で いい から, もう一度=もう いちど, 琴=こと, 岩の間=いわ の あいだ, 二人とも=ふたり とも, 一本=いっぽん, 一通=いっつう, 数年後=すうねんご, 竜宮城=りゅうぐうじょう, 三百年=さんびゃくねん, 何百年=なんびゃくねん, 一年=いちねん, 二度と=にどと, トゥ・トゥック=とぅ とぅっく, ザン・フオン=ざん ふおん, 浦島太郎=うらしまたろう, 仙女=せんにょ, 二つ=ふたつ. Đã đọc lại toàn bộ.
- Từ vựng: 23 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-tuthuc-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (39 câu)
  - トゥ・トゥック: `ja-JP-Neural2-C`, tốc độ 0.95 (6 câu)
  - 少女: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 3 (2 câu)
  - ザン・フオン: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 3 (3 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -2 (3 câu)
  - 寺の人: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -3 (1 câu)
  - おじいさん: `ja-JP-Neural2-C`, tốc độ 0.84, cao độ -6 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho.

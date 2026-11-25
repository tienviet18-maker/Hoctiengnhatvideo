# QC — furusato-id-kancil-1

- Nguồn: Truyện dân gian Indonesia/Malaysia về chú hươu chuột Kancil (Sang Kancil) qua sông nhờ đếm cá sấu (truyền khẩu, public domain). Claude tự kể lại bằng tiếng Nhật, không chép tuyển tập hiện đại nào. Phần so sánh: 因幡の白うさぎ trong 古事記 (năm 712, public domain).
- Chuẩn v2, cấp N3: 1662 ký tự, 49 câu, câu TB 33.9 ký tự, harder 4.5%, atLevel 24.5%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 向こう岸=むこうぎし, 王さま=おうさま, 何びき=なんびき, 一列=いちれつ, 一ぴき目=いっぴきめ, 一ぴき=いっぴき, 二ひき=にひき, 三びき=さんびき, 四ひき=よんひき, 十ぴき=じゅっぴき, 十一ぴき=じゅういっぴき, 二十ぴき=にじゅっぴき, 因幡の白うさぎ=いなばのしろうさぎ, 古事記=こじき, 隠岐の島=おきのしま, 白うさぎ=しろうさぎ, 神さま=かみさま, 陸=りく, 毛=け, 命令=めいれい, 数えくらべ=かぞえくらべ, 調子に乗る=ちょうしにのる. Đã đọc lại toàn bộ.
- Từ vựng: 15 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-id-kancil-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (34 câu)
  - カンチル: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 5 (10 câu)
  - ワニ: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -7 (5 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Darumadrop One.

# QC — furusato-kr-heungbu-1

- Nguồn: Truyện dân gian Hàn Quốc 흥부와 놀부 (truyền khẩu và bản 판소리 cổ, public domain), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: 腰折れ雀 (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1791 ký tự, 54 câu, câu TB 33.2 ký tự, harder 4.3%, atLevel 19.5%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 宝物=たからもの, 罰を=ばつ を, 一羽=いちわ, 一人の=ひとり の, 一つ目=ひとつめ, 二つ目=ふたつめ, 三つ目=みっつめ, 村一番=むらいちばん, 二度と=にどと, あっという間に=あっと いう ま に, ノルブ=のるぶ, フンブ=ふんぶ, トッケビ=とっけび, 腰折れ雀=こしおれすずめ, 韓国=かんこく, 大人=おとな, ざあざあ=ざあざあ, ぽかぽか=ぽかぽか. Đã đọc lại toàn bộ.
- Từ vựng: 33 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-kr-heungbu-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (41 câu)
  - ノルブ: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -4 (6 câu)
  - フンブ: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 1 (3 câu)
  - フンブの妻: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 1 (2 câu)
  - ツバメ: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 6 (1 câu)
  - トッケビ: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -8 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Mochiy Pop One.

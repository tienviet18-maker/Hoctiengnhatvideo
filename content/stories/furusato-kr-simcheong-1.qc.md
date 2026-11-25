# QC — furusato-kr-simcheong-1

- Nguồn: Truyện dân gian Hàn Quốc 심청전 (truyền khẩu và bản 판소리 cổ, public domain), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: 弟橘媛 (古事記・日本書紀, public domain).
- Chuẩn v2, cấp N3: 1816 ký tự, 55 câu, câu TB 33.0 ký tự, harder 5.1%, atLevel 19.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 仏さま=ほとけさま, 三百俵=さんびゃっぴょう, 一けん=いっけん, 二人とも=ふたり とも, 一晩中=ひとばんじゅう, 数日後=すうじつご, 十五歳=じゅうごさい, 村一番=むらいちばん, 弟橘媛=おとたちばなひめ, ヤマトタケル=やまとたける, シムチョン=しむちょん, シム・ハッキュ=しむ はっきゅ, インダンス=いんだんす, 韓国=かんこく, 神さま=かみさま, 王さま=おうさま, 人々=ひとびと. Đã đọc lại toàn bộ.
- Từ vựng: 24 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-kr-simcheong-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (38 câu)
  - シムチョン: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (4 câu)
  - 父: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -5 (7 câu)
  - お坊さん: `ja-JP-Neural2-C`, tốc độ 0.82, cao độ -7 (1 câu)
  - 船乗り: `ja-JP-Neural2-C`, tốc độ 1, cao độ -1 (3 câu)
  - 竜王: `ja-JP-Neural2-C`, tốc độ 0.84, cao độ -9 (1 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -2 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Sawarabi Mincho.

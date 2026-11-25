# QC — furusato-ph-juan-1

- Nguồn: Truyện dân gian Philippines về Juan Tamad (truyền khẩu, public domain; nhiều dị bản theo vùng). Claude tự kể lại ba mẩu chuyện phổ biến (cây ổi, bán cua, gánh nước bằng giỏ) bằng tiếng Nhật, không chép tuyển tập hiện đại nào. Phần so sánh: ものぐさ太郎 (御伽草子, public domain).
- Chuẩn v2, cấp N3: 1530 ký tự, 53 câu, câu TB 28.9 ký tự, harder 1.0%, atLevel 15.9%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一つ目=ひとつめ, 二つ目=ふたつめ, 三つ目=みっつめ, 一時間=いちじかん, 二時間=にじかん, 一てき=いってき, 三日=みっか, 太郎=たろう, ものぐさ太郎=ものぐさたろう, 木の葉=このは, 横歩き=よこあるき, 目を丸く=めをまるく, お母さん=おかあさん, 市場=いちば, 実=み, お餅=おもち, 損=そん, 気がきかない=きがきかない, 向こう=むこう. Đã đọc lại toàn bộ.
- Từ vựng: 5 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-ph-juan-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (39 câu)
  - フアン: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 3 (9 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.95 (5 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Rampart One.

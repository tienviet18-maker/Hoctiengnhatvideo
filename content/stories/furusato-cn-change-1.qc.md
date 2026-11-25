# QC — furusato-cn-change-1

- Nguồn: Truyện dân gian Trung Quốc 嫦娥奔月 và 后羿射日 (truyền khẩu, thư tịch cổ như 淮南子, public domain), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống phổ biến, không chép tuyển tập hiện đại nào. Phần so sánh: お月見 và 竹取物語 (public domain).
- Chuẩn v2, cấp N3: 1506 ký tự, 44 câu, câu TB 34.2 ký tự, harder 10.1%, atLevel 29.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 十個=じゅっこ, 一本=いっぽん, 八月十五日=はちがつ じゅうごにち, 中秋節=ちゅうしゅうせつ, ホウイー=ほういー, チャンオー=ちゃんおー, フォンモン=ふぉんもん, 女王さま=じょおうさま, 中国=ちゅうごく, 不老不死=ふろうふし, 人影=ひとかげ. Đã đọc lại toàn bộ.
- Từ vựng: 23 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-cn-change-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (36 câu)
  - ホウイー: `ja-JP-Neural2-C`, tốc độ 0.93, cao độ -2 (4 câu)
  - チャンオー: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ 1 (2 câu)
  - 女王: `ja-JP-Neural2-B`, tốc độ 0.86, cao độ -6 (1 câu)
  - フォンモン: `ja-JP-Neural2-C`, tốc độ 1, cao độ -5 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Hachi Maru Pop.

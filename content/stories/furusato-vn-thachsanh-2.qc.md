# QC — furusato-vn-thachsanh-2

- Nguồn: Truyện cổ tích dân gian Việt Nam (truyền khẩu, không thuộc bản quyền), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: 浦島太郎 (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1767 ký tự, 58 câu, câu TB 30.5 ký tự, harder 4.7%, atLevel 39.5%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, タック・サイン=たっく さいん, リー・トン=りー とん, ガジュマル=がじゅまる, 一本=いっぽん, 一歩=いっぽ, 王さま=おうさま, 神さま=かみさま, 化け物=ばけもの, 一人ずつ=ひとり ずつ, では=でわ, 夜中=よなか, 木の下=き の した, 琴=こと, 竜宮城=りゅうぐうじょう, 竜宮=りゅうぐう, 浦島太郎=うらしま たろう, 玉手箱=たまてばこ, お姫さま=おひめさま, 一言=ひとこと. Đã đọc lại toàn bộ.
- Từ vựng: 28 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-thachsanh-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (41 câu)
  - タック・サイン: `ja-JP-Neural2-C`, tốc độ 0.96, cao độ 1 (6 câu)
  - リー・トン: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ -3 (4 câu)
  - 姫: `ja-JP-Neural2-B`, tốc độ 1, cao độ 2 (2 câu)
  - 王: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -5 (1 câu)
  - 王子: `ja-JP-Neural2-C`, tốc độ 1, cao độ 3 (2 câu)
  - 竜王: `ja-JP-Neural2-C`, tốc độ 0.82, cao độ -8 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Yuji Boku.

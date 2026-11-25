# QC — furusato-vn-thachsanh-1

- Nguồn: Truyện cổ tích dân gian Việt Nam (truyền khẩu, không thuộc bản quyền), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: ヤマタノオロチ (thần thoại Nhật trong Kojiki, public domain).
- Chuẩn v2, cấp N3: 1765 ký tự, 58 câu, câu TB 30.4 ký tự, harder 4.0%, atLevel 30.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, タック・サイン=たっく さいん, リー・トン=りー とん, ガジュマル=がじゅまる, ヤマタノオロチ=やまたのおろち, スサノオ=すさのお, 一本=いっぽん, 一歩=いっぽ, 王さま=おうさま, 神さま=かみさま, 大蛇=だいじゃ, お化け=おばけ, 化け物=ばけもの, 一人ずつ=ひとり ずつ, では=でわ, 夜中=よなか, 木の下=き の した. Đã đọc lại toàn bộ.
- Từ vựng: 22 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-thachsanh-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (41 câu)
  - タック・サイン: `ja-JP-Neural2-C`, tốc độ 0.96, cao độ 1 (7 câu)
  - リー・トン: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ -3 (6 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -4 (2 câu)
  - 神: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -6 (1 câu)
  - 大蛇: `ja-JP-Neural2-C`, tốc độ 0.78, cao độ -9 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Yuji Boku.

# QC — furusato-vn-tamcam-2

- Nguồn: Truyện cổ tích dân gian Việt Nam (truyền khẩu, không thuộc bản quyền), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào.
- Chuẩn v2, cấp N3: 1690 ký tự, 58 câu, câu TB 29.1 ký tự, harder 5.0%, atLevel 27.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 端=はし, 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 一頭=いっとう. Đã đọc lại toàn bộ.
- Từ vựng: 33 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-tamcam-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (42 câu)
  - タム: `ja-JP-Neural2-B`, tốc độ 0.95 (4 câu)
  - カム: `ja-JP-Neural2-B`, tốc độ 1, cao độ 3 (1 câu)
  - 継母: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -4 (4 câu)
  - 仏様: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -3 (2 câu)
  - 役人: `ja-JP-Neural2-C`, tốc độ 0.95 (1 câu)
  - 王様: `ja-JP-Neural2-C`, tốc độ 0.92 (4 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Yuji Syuku.

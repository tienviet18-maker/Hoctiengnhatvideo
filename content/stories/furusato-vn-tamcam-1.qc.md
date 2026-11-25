# QC — furusato-vn-tamcam-1

- Nguồn: Truyện cổ tích dân gian Việt Nam (truyền khẩu, không thuộc bản quyền), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào.
- Chuẩn v2, cấp N3: 1981 ký tự, 62 câu, câu TB 32.0 ký tự, harder 5.7%, atLevel 24.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 端=はし, 一日中=いちにちじゅう, 二人=ふたり, 小魚=こざかな, 仏様=ほとけさま, 一匹=いっぴき, 家中=いえじゅう, 継母=ままはは, つぼ=つぼ, 白いひげ=しろい ひげ, 一つかみ=ひとつかみ, お姉さん=おねえさん, でいっぱい=で いっぱい, 水の上=みず の うえ. Đã đọc lại toàn bộ.
- Từ vựng: 33 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, mỗi câu một file, nối 0,4 giây lặng cuối câu. Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (49 câu)
  - タム: `ja-JP-Neural2-B`, tốc độ 0.95 (1 câu)
  - カム: `ja-JP-Neural2-B`, tốc độ 1, cao độ 3 (2 câu)
  - 継母: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -4 (4 câu)
  - 仏様: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -3 (5 câu)
  - ニワトリ: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 4 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Yuji Syuku.

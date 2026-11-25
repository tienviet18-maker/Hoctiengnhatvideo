# QC — furusato-vn-chudongtu-1

- Nguồn: Truyền thuyết dân gian Việt Nam (truyền khẩu, không thuộc bản quyền), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: 竹取物語 (văn học cổ điển, public domain).
- Chuẩn v2, cấp N3: 1844 ký tự, 58 câu, câu TB 31.8 ký tự, harder 5.8%, atLevel 22.2%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 紅河=こうが, 大勢=おおぜい, 市場=いちば, 一年の間=いちねん の あいだ, 夜中=よなか, 一本の=いっぽん の, 一人の=ひとり の, 一人で=ひとり で, 何ということだ=なん と いう こと だ, チュー・ドン・トゥ=ちゅー どん とぅ, ティエン・ズン=てぃえん ずん, フン王=ふん おう, 王さま=おうさま, 人々=ひとびと, お父さま=おとうさま, 一夜の沼=いちや の ぬま, かぐや姫=かぐやひめ. Đã đọc lại toàn bộ.
- Từ vựng: 34 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-chudongtu-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (44 câu)
  - 父: `ja-JP-Neural2-C`, tốc độ 0.86, cao độ -5 (1 câu)
  - チュー・ドン・トゥ: `ja-JP-Neural2-C`, tốc độ 0.98, cao độ 1 (4 câu)
  - ティエン・ズン: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (6 câu)
  - 王: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -3 (2 câu)
  - お坊さん: `ja-JP-Neural2-C`, tốc độ 0.82, cao độ -6 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Klee One.

# QC — furusato-ph-malakas-1

- Nguồn: Thần thoại khởi nguyên dân gian Tagalog "Si Malakas at si Maganda" (truyền khẩu, public domain; có nhiều dị bản). Claude tự kể lại bằng tiếng Nhật theo cốt truyện phổ biến (chim khích trời và biển, trời ném đá thành đảo, chim mổ ống tre), không chép tuyển tập hiện đại nào. Phần so sánh: 竹取物語 và thần thoại 国生み trong 古事記 (public domain).
- Chuẩn v2, cấp N3: 1517 ký tự, 51 câu, câu TB 29.7 ký tự, harder 11.2%, atLevel 25.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 七千=ななせん, 一羽=いちわ, 一本=いっぽん, タガログ語=たがろぐご, 国生み=くにうみ, 島々=しまじま, 浜辺=はまべ, ご先祖さま=ごせんぞさま, 神話=しんわ, かぐや姫=かぐやひめ, 木の実=きのみ, 人々=ひとびと, 鳥=とり, 二本=にほん, 楽器=がっき. Đã đọc lại toàn bộ.
- Từ vựng: 20 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-ph-malakas-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (44 câu)
  - 鳥: `ja-JP-Neural2-C`, tốc độ 1.02, cao độ 2 (4 câu)
  - 空: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -9 (1 câu)
  - マラカス: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -2 (1 câu)
  - マガンダ: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Yomogi.

# QC — furusato-th-sangthong-1

- Nguồn: Truyện cổ Thái Lan 「สังข์ทอง」 (Sang Thong, truyền khẩu và bản kịch thơ thời vua Rama II, đầu thế kỷ 19, public domain). Claude tự kể lại bằng tiếng Nhật, rút gọn, không chép bản kể hiện đại nào. Phần so sánh: 鉢かづき姫 (御伽草子, thời Muromachi, public domain) và かぐや姫.
- Chuẩn v2, cấp N3: 1850 ký tự, 52 câu, câu TB 35.6 ký tự, harder 6.1%, atLevel 27.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 王妃=おうひ, 王さま=おうさま, 金=きん, ほら貝=ほらがい, 巻き貝=まきがい, 城=しろ, 畑=はたけ, 金色=きんいろ, 名づけ=なづけ, 鬼=おに, 池=いけ, 身につけ=みにつけ, 国じゅう=くにじゅう, 若者=わかもの, 首かざり=くびかざり, 六人=ろくにん, 七人=しちにん, 姫=ひめ, 小屋=こや, 勝負=しょうぶ, 一ぴき=いっぴき, 天=てん, 神さま=かみさま, 試合=しあい, 宝=たから, 見た目=みため, かぐや姫=かぐやひめ, はちかづき姫=はちかづきひめ, 竹=たけ, 上の=うえの, 下の=したの. Đã đọc lại toàn bộ.
- Từ vựng: 16 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-th-sangthong-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (45 câu)
  - 王妃: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -2 (2 câu)
  - 王さま: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -6 (4 câu)
  - ロッチャナー: `ja-JP-Neural2-B`, tốc độ 1, cao độ 3 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kaisei Tokumin.

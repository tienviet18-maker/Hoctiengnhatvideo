# QC — furusato-id-timun-1

- Nguồn: Truyện dân gian Java (Indonesia) "Timun Mas" (truyền khẩu, public domain). Claude tự kể lại bằng tiếng Nhật theo cốt truyện phổ biến (bốn túi: hạt dưa, kim, muối, mắm tôm terasi), không chép tuyển tập hiện đại nào. Phần so sánh: 三枚のお札 (truyện dân gian Nhật) và đoạn イザナギ chạy trốn trong 古事記 (năm 712) — đều public domain.
- Chuẩn v2, cấp N3: 1671 ký tự, 50 câu, câu TB 33.4 ký tự, harder 4.8%, atLevel 28.4%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 十七才=じゅうななさい, 金色=きんいろ, 大男=おおおとこ, 赤ちゃん=あかちゃん, お坊さん=おぼうさん, 四つ=よっつ, 一つずつ=ひとつずつ, 三つ目=みっつめ, 三枚=さんまい, お札=おふだ, 小僧さん=こぞうさん, 山んば=やまんば, 和尚さん=おしょうさん, 一枚ずつ=いちまいずつ, 古事記=こじき, 竹の子=たけのこ, 大地=だいち, 火の海=ひのうみ, うらの戸=うらのと, 世界中=せかいじゅう, 命がけ=いのちがけ, 星=ほし. Đã đọc lại toàn bộ.
- Từ vựng: 29 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-id-timun-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (39 câu)
  - ブト・イジョ: `ja-JP-Neural2-C`, tốc độ 0.82, cao độ -8 (6 câu)
  - スリニ: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -3 (3 câu)
  - お坊さん: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -2 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông RocknRoll One.

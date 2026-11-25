# QC — furusato-cn-niulang-1

- Nguồn: Truyện dân gian Trung Quốc 牛郎织女 (truyền khẩu, một trong Tứ đại dân gian truyền thuyết, public domain), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: 七夕 và 羽衣伝説 Nhật (public domain).
- Chuẩn v2, cấp N3: 1668 ký tự, 49 câu, câu TB 34.0 ký tự, harder 7.4%, atLevel 31.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一頭=いっとう, 四人=よにん, 一本=いっぽん, 一年に一度=いちねん に いちど, 七月七日=しちがつ なのか, 天の兵=てん の へい, 頭のかんざし=あたま の かんざし, わし座=わしざ, こと座=ことざ, ニウラン=にうらん, ジーニュイ=じーにゅい, 中国=ちゅうごく, 世界中=せかいじゅう, 女王さま=じょおうさま, 天女=てんにょ. Đã đọc lại toàn bộ.
- Từ vựng: 32 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-cn-niulang-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (39 câu)
  - ニウラン: `ja-JP-Neural2-C`, tốc độ 0.95 (2 câu)
  - ジーニュイ: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ 2 (3 câu)
  - 老牛: `ja-JP-Neural2-C`, tốc độ 0.82, cao độ -9 (3 câu)
  - 女王: `ja-JP-Neural2-B`, tốc độ 0.86, cao độ -6 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Maru Gothic.

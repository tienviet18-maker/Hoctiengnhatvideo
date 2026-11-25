# QC — furusato-cn-baishe-1

- Nguồn: Truyện dân gian Trung Quốc 白蛇传 (truyền khẩu, một trong Tứ đại dân gian truyền thuyết, public domain), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Chi tiết thật: tháp Lôi Phong sập năm 1924, dựng lại năm 2002. Phần so sánh: 上田秋成『雨月物語』「蛇性の婬」(1776, public domain).
- Chuẩn v2, cấp N3: 1731 ký tự, 52 câu, câu TB 33.3 ký tự, harder 8.6%, atLevel 31.5%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一杯=いっぱい, 三人=さんにん, 一九二四年=せんきゅうひゃくにじゅうよねん, 二〇〇二年=にせんにねん, 何度も=なんども, 何日も=なんにちも, 雷峰塔=らいほうとう, 蛇性の婬=じゃせいのいん, 上田秋成=うえだあきなり, 西湖=せいこ, 杭州=こうしゅう, 江戸時代=えどじだい, 崑崙山=こんろんさん, 中国=ちゅうごく, スーチェン=すーちぇん, シャオチン=しゃおちん, シューシェン=しゅーしぇん, ファーハイ=ふぁーはい, 千年=せんねん. Đã đọc lại toàn bộ.
- Từ vựng: 40 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-cn-baishe-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (42 câu)
  - スーチェン: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ 1 (3 câu)
  - シャオチン: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 5 (1 câu)
  - シューシェン: `ja-JP-Neural2-C`, tốc độ 0.97, cao độ 2 (2 câu)
  - ファーハイ: `ja-JP-Neural2-C`, tốc độ 0.84, cao độ -8 (4 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Antique.

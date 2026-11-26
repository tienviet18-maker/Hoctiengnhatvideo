# QC — tebukuro-1

- Nguồn: Phỏng theo 「手袋を買いに」 của 新美南吉 (Niimi Nankichi, mất 1943; xuất bản 1943; public domain ở Nhật và Mỹ). Claude viết lại bằng tiếng Nhật N4 cho MiraiGo, giữ cốt truyện và câu kết gốc. Thay gói cũ tebukuro-o-kai-ni.
- Chuẩn v2, cấp N4: 1360 ký tự, 55 câu, câu TB 24.7 ký tự, harder 7.0%, atLevel 28.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一つ=ひとつ, 二つ=ふたつ, 大きな=おおきな, 小さな=ちいさな, お手々=おてて, 母ちゃん=かあちゃん, 十メートル=じゅうメートル, 真っ白=まっしろ, お日さま=おひさま, ほら穴=ほらあな, 白銅貨=はくどうか, お星さま=おほしさま, 毛糸=けいと, お百姓さん=おひゃくしょうさん, ぼうし屋=ぼうしや, 両手=りょうて, 片方=かたほう, ささった=ささった, ささって=ささって, にじ=にじ, かいだり=かいだり, かんばん=かんばん, ぼうし=ぼうし, 子ども用=こどもよう, お礼=おれい, 銀色=ぎんいろ, 目あて=めあて, 子ぎつね=こぎつね, 母さんぎつね=かあさんぎつね, ぼうや=ぼうや, こんばんは=こんばんわ, えだ=えだ, どさっと=どさっと, はあっと=はあっと, しもやけ=しもやけ, まど=まど, すなお=すなお, すきま=すきま, 二ひき=にひき, カチ合わせ=かちあわせ, チンチン=ちんちん, どきっと=どきっと, 戸=と. Đã đọc lại toàn bộ.
- Từ vựng: 23 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/bungaku/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/tebukuro-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (35 câu)
  - 子ぎつね: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 8 (7 câu)
  - 母さんぎつね: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -2 (13 câu)
  - ぼうし屋: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -4 (0 câu)
  - 人間のお母さん: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ 1 (0 câu)
  - 人間の子ども: `ja-JP-Neural2-B`, tốc độ 1, cao độ 9 (0 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho B1.

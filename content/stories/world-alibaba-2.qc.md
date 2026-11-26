# QC — world-alibaba-2

- Nguồn: Truyện 'Ali Baba và bốn mươi tên cướp' trong Nghìn lẻ một đêm, theo bản Antoine Galland (1717) và bản dịch Anh của Andrew Lang (1898), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N3, theo truyện gốc: hang 'Vừng ơi, mở ra', người anh Kassim tham lam, cô hầu Morgiana cứu cả nhà (dấu phấn trên cửa, ba mươi bảy chum dầu, điệu múa).
- Chuẩn v2, cấp N3: 1328 ký tự, 48 câu, câu TB 27.7 ký tự, harder 8.0%, atLevel 27.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 木こり=きこり, 盗賊=とうぞく, 召し使い=めしつかい, 呪文=じゅもん, 宝物=たからもの, 宝石=ほうせき, 金貨=きんか, 入り口=いりぐち, 仕返し=しかえし, 見せかけ=みせかけ, 手下=てした, 油売り=あぶらうり, 合図=あいず, 恩人=おんじん, 真夜中=まよなか, お嫁さん=およめさん, 数日後=すうじつご, 十頭=じゅっとう, 何枚=なんまい, 一枚=いちまい, 四十人=よんじゅうにん, 三十八=さんじゅうはち, 三十七=さんじゅうなな, 夕食=ゆうしょく, 命=いのち, 二度=にど, 今度=こんど, 今夜=こんや, ひと晩=ひとばん, 妻=つま, 夫=おっと, 兄=あに, 弟さん=おとうとさん, 娘=むすめ, 息子=むすこ, 役人=やくにん, 秘密=ひみつ, 近所=きんじょ, 一方=いっぽう, 夢中=むちゅう, 刀=かたな, 塩=しお, 客=きゃく, 印=しるし, 戸=と, 底=そこ, 穴=あな, 岩=いわ, アリババ=アリババ, ペルシャ=ペルシャ, ほら穴=ほらあな, なきがら=なきがら, 塀=へい. Đã đọc lại toàn bộ.
- Từ vựng: 12 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-alibaba-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (34 câu)
  - アリババ: `ja-JP-Neural2-C`, tốc độ 1, cao độ 3 (4 câu)
  - かしら: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -10 (3 câu)
  - 手下: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ -2 (2 câu)
  - モルジアナ: `ja-JP-Neural2-B`, tốc độ 1, cao độ 4 (5 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Dela Gothic One.

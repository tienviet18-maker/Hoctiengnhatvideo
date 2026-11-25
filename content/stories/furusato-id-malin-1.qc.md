# QC — furusato-id-malin-1

- Nguồn: Truyền thuyết dân gian Minangkabau (Tây Sumatra, Indonesia) "Malin Kundang" (truyền khẩu, public domain). Claude tự kể lại bằng tiếng Nhật theo cốt truyện phổ biến, không chép tuyển tập hiện đại nào. Phần so sánh: すずめとキツツキ (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1656 ký tự, 51 câu, câu TB 32.5 ký tự, harder 1.6%, atLevel 16.3%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 何年=なんねん, 最期=さいご, 間に合=まにあ, 見た目=みため, 村人=むらびと, 神さま=かみさま, 海辺=うみべ, 木の葉=このは, 手を合わせ=てをあわせ, 髪=かみ, 腰=こし, 命じ=めいじ, 姿=すがた, 打ち上げ=うちあげ, 恥ずかしい=はずかしい. Đã đọc lại toàn bộ.
- Từ vựng: 17 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-id-malin-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (39 câu)
  - マリン: `ja-JP-Neural2-C`, tốc độ 1, cao độ 1 (4 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -3 (6 câu)
  - 妻: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 3 (1 câu)
  - 村人: `ja-JP-Neural2-C`, tốc độ 1, cao độ -3 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Train One.

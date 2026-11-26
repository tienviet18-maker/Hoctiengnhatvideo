# QC — world-hansel-2

- Nguồn: Truyện 'Hänsel und Gretel' trong tuyển tập Grimm (bản 1857), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N4. Tập 2: chuồng nhốt, mẹo khúc xương, lò nướng, kho báu, con vịt trắng đưa qua sông, về nhà; giữ cả câu kết vui của Grimm về con chuột.
- Chuẩn v2, cấp N4: 1518 ký tự, 53 câu, câu TB 28.6 ký tự, harder 14.2%, atLevel 36.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 木こり=きこり, 亡くなって=なくなって, 四人=よにん, 一晩中=ひとばんじゅう, 三日間=みっかかん, 一けん=いっけん, 小石=こいし, 後ろ=うしろ, 帰り道=かえりみち, 帰り着き=かえりつき, 今度こそ=こんどこそ, 一つずつ=ひとつずつ, 一つ=ひとつ, 大丈夫=だいじょうぶ, 何度=なんど, 長い間=ながい あいだ, お母さん=おかあさん, お父さん=おとうさん, お兄ちゃん=おにいちゃん, 月の光=つき の ひかり, 中に=なかに, 光の下=ひかり の した, 病気=びょうき, 四週間=よんしゅうかん, 二度と=にどと, 一日=いちにち, 部屋中=へやじゅう, 三人=さんにん, 向こう岸=むこうぎし, 入り口=いりぐち, 言われた通り=いわれた とおり, 兄さん=にいさん, 小屋=こや, 力いっぱい=ちからいっぱい, 背中=せなか, 一緒=いっしょ, 大声=おおごえ, 毎朝=まいあさ, かまど=かまど, 一本=いっぽん. Đã đọc lại toàn bộ.
- Từ vựng: 28 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-hansel-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (37 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -4 (0 câu)
  - 父: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -4 (1 câu)
  - ヘンゼル: `ja-JP-Neural2-C`, tốc độ 1, cao độ 6 (2 câu)
  - グレーテル: `ja-JP-Neural2-B`, tốc độ 1, cao độ 6 (5 câu)
  - 魔女: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ -7 (8 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Maru Gothic.

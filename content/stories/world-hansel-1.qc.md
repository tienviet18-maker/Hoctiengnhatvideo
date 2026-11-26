# QC — world-hansel-1

- Nguồn: Truyện 'Hänsel und Gretel' trong tuyển tập Grimm (bản 1857), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N4, giữ chi tiết của Grimm (sỏi trắng dưới trăng, vụn bánh mì, chim trắng, câu đối đáp với mụ phù thủy). Tập 1: từ nạn đói đến ngôi nhà bánh.
- Chuẩn v2, cấp N4: 1435 ký tự, 54 câu, câu TB 26.6 ký tự, harder 8.9%, atLevel 27.4%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 木こり=きこり, 亡くなって=なくなって, 四人=よにん, 一晩中=ひとばんじゅう, 三日間=みっかかん, 一けん=いっけん, 小石=こいし, 後ろ=うしろ, 帰り道=かえりみち, 帰り着き=かえりつき, 今度こそ=こんどこそ, 一つずつ=ひとつずつ, 一つ=ひとつ, 大丈夫=だいじょうぶ, 何度=なんど, 長い間=ながい あいだ, お母さん=おかあさん, お父さん=おとうさん, お兄ちゃん=おにいちゃん, 月の光=つき の ひかり, 中に=なかに, 光の下=ひかり の した, 病気=びょうき. Đã đọc lại toàn bộ.
- Từ vựng: 31 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-hansel-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (37 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -4 (5 câu)
  - 父: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -4 (2 câu)
  - ヘンゼル: `ja-JP-Neural2-C`, tốc độ 1, cao độ 6 (5 câu)
  - グレーテル: `ja-JP-Neural2-B`, tốc độ 1, cao độ 6 (3 câu)
  - 魔女: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ -7 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Maru Gothic.

# QC — world-akazukin

- Nguồn: Truyện 'Rotkäppchen' trong tuyển tập Grimm (bản 1857), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N5, giữ bản kết của Grimm (bác thợ săn cứu bà và cháu, nhét đá vào bụng sói).
- Chuẩn v2, cấp N5: 876 ký tự, 44 câu, câu TB 19.9 ký tự, harder 19.0%, atLevel 100.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 赤ずきん=あかずきん, 三人=さんにん, 寄り道=よりみち, 向こう=むこう, お母さん=おかあさん, 行ってきます=いってきます, 病気=びょうき, 大きな=おおきな, 元気=げんき, その間=その あいだ, 心の中=こころ の なか, 家の中=いえ の なか, 一つ=ひとつ, 猟師=りょうし. Đã đọc lại toàn bộ.
- Từ vựng: 51 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-akazukin/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.82 (22 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -2 (3 câu)
  - 赤ずきん: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ 6 (8 câu)
  - オオカミ: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -8 (9 câu)
  - おばあさん: `ja-JP-Neural2-B`, tốc độ 0.8, cao độ -5 (1 câu)
  - りょうし: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -2 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kaisei Decol.

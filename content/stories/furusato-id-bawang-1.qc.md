# QC — furusato-id-bawang-1

- Nguồn: Truyện dân gian Indonesia "Bawang Merah Bawang Putih" (truyền khẩu, public domain). Claude tự kể lại bằng tiếng Nhật theo cốt truyện phổ biến (mất tấm vải, bà lão bên sông, chọn quả bí nhỏ), không chép tuyển tập hiện đại nào. Phần so sánh: 舌切り雀 và 米福粟福 (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1624 ký tự, 48 câu, câu TB 33.8 ký tự, harder 1.3%, atLevel 21.3%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 玉ねぎ=たまねぎ, 亡くなり=なくなり, 亡くなった=なくなった, 文句一つ=もんくひとつ, 日がくれる=ひがくれる, 正直者=しょうじきもの, 米福粟福=こめぶくあわぶく, 舌切りすずめ=したきりすずめ, お宿=おやど, 宝物=たからもの, 宝石=ほうせき, 世界中=せかいじゅう, 欲=よく, 目の色=めのいろ, 下の方=したのほう, 小さい方=ちいさいほう, 大きい方=おおきいほう, 温かい=あたたかい, 布=ぬの, 台所=だいどころ, 野菜=やさい. Đã đọc lại toàn bộ.
- Từ vựng: 18 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-id-bawang-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (36 câu)
  - プティ: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (2 câu)
  - メラ: `ja-JP-Neural2-B`, tốc độ 1.08, cao độ 5 (3 câu)
  - まま母: `ja-JP-Neural2-B`, tốc độ 1.02, cao độ -4 (3 câu)
  - おばあさん: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ -6 (4 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Stick.

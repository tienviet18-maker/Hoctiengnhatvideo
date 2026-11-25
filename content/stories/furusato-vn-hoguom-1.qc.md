# QC — furusato-vn-hoguom-1

- Nguồn: Truyền thuyết dân gian Việt Nam (truyền khẩu, không thuộc bản quyền), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: 俵藤太 (truyền thuyết Nhật, public domain).
- Chuẩn v2, cấp N3: 1701 ký tự, 55 câu, câu TB 30.9 ký tự, harder 9.2%, atLevel 36.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 緑色=みどりいろ, 明かりの下=あかり の した, 数日後=すうじつご, もう一度=もう いちど, ホアンキエム湖=ほあんきえむ こ, レ・ロイ=れ ろい, レ・タン=れ たん, タインホア=たいんほあ, ハノイ=はのい, 順天=じゅんてん, 俵藤太=たわらのとうた, 琵琶湖=びわこ, 竜神=りゅうじん, 六百年=ろっぴゃくねん, 王さま=おうさま, 神さま=かみさま, 人々=ひとびと, 十年=じゅうねん, 一年=いちねん, 三回目=さんかいめ, では=でわ. Đã đọc lại toàn bộ.
- Từ vựng: 42 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-hoguom-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (45 câu)
  - レ・ロイ: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -2 (5 câu)
  - レ・タン: `ja-JP-Neural2-C`, tốc độ 1, cao độ 1 (3 câu)
  - 亀: `ja-JP-Neural2-B`, tốc độ 0.84, cao độ -5 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Old Mincho.

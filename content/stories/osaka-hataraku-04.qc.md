# QC — osaka-hataraku-04

- Nguồn: Sáng tác gốc của Claude cho MiraiGo (series 「大阪で働く」, bible ở content/sources/osaka/series-bible.md). Nhân vật, công ty và sự việc đều hư cấu; thông tin thật: phân loại rác (cháy được, nhựa, lon/chai/PET, giấy), ngày và cách phân loại khác nhau theo địa phương, đổ vào buổi sáng ngày thu gom, rác cồng kềnh (粗大ごみ) phải đăng ký và trả phí.
- Chuẩn v2, cấp N3: 1697 ký tự, 58 câu, câu TB 29.3 ký tự, harder 3.4%, atLevel 23.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 角=かど, 間=あいだ, 日本=にほん, 一人=ひとり, 一階=いっかい, 一冊=いっさつ, 一機=いっき, 一日目=いちにち め, 十四日=じゅうよっか, 三十分=さんじゅっぷん, 二十六歳=にじゅうろく さい, グエン・ヴァン・ミン=ぐえん ゔぁん みん, ファム・ハイ=ふぁむ はい, 布施駅=ふせ えき, のりば=のりば, 言うてた=いうてた, はよおいで=はよ おいで, 来えへんかったん=こえへんかったん, つながらなくて=つながらなくて, かべ=かべ, ふとん=ふとん, では=でわ, 運転席=うんてんせき, 一行=いちぎょう, 入る方=はいる かた, どきっと=どきっと, へんかった=へんかった, 三・八=さんてんはち, 〇・二=れいてんに, 日本語=にほんご, 二人=ふたり, ゆうちょ=ゆうちょ, 二十年=にじゅう ねん, 言わへんかった=いわへんかった, はなれた=はなれた, 三十年=さんじゅう ねん, いちばん上=いちばん うえ. Đã đọc lại toàn bộ.
- Từ vựng: 35 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/osaka/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/osaka-hataraku-04/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (34 câu)
  - ミン: `ja-JP-Neural2-C`, tốc độ 0.95 (8 câu)
  - キヨ: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -4 (13 câu)
  - 田中: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -4 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Kaku Gothic New.

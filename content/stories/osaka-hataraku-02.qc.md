# QC — osaka-hataraku-02

- Nguồn: Sáng tác gốc của Claude cho MiraiGo (series 「大阪で働く」, bible ở content/sources/osaka/series-bible.md). Nhân vật, công ty và sự việc đều hư cấu; thông tin thủ tục (転入届, マイナンバー, 健康保険 công ty / 国民健康保険, tỉ lệ tự trả 3 phần) theo quy định hiện hành.
- Chuẩn v2, cấp N3: 1576 ký tự, 58 câu, câu TB 27.2 ký tự, harder 7.3%, atLevel 18.7%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 日本=にほん, 一人=ひとり, 一階=いっかい, 一冊=いっさつ, 一機=いっき, 一日目=いちにち め, 十四日=じゅうよっか, 三十分=さんじゅっぷん, 二十六歳=にじゅうろく さい, グエン・ヴァン・ミン=ぐえん ゔぁん みん, ファム・ハイ=ふぁむ はい, 布施駅=ふせ えき, のりば=のりば, 言うてた=いうてた, はよおいで=はよ おいで, 来えへんかったん=こえへんかったん, つながらなくて=つながらなくて, かべ=かべ, ふとん=ふとん, では=でわ, 運転席=うんてんせき, 一行=いちぎょう, 入る方=はいる かた, どきっと=どきっと, へんかった=へんかった, 三・八=さんてんはち, 〇・二=れいてんに. Đã đọc lại toàn bộ.
- Từ vựng: 31 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/osaka/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/osaka-hataraku-02/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (33 câu)
  - ミン: `ja-JP-Neural2-C`, tốc độ 0.95 (8 câu)
  - あかり: `ja-JP-Neural2-B`, tốc độ 0.98, cao độ 1 (8 câu)
  - 社長: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -5 (2 câu)
  - 岩田: `ja-JP-Neural2-C`, tốc độ 1.02, cao độ -2 (4 câu)
  - 役所の人: `ja-JP-Neural2-B`, tốc độ 1, cao độ -1 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Kaku Gothic New.

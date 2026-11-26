# QC — osaka-hataraku-08

- Nguồn: Sáng tác gốc của Claude cho MiraiGo (series 「大阪で働く」, tập cuối; bible ở content/sources/osaka/series-bible.md). Nhân vật, công ty và sự việc đều hư cấu; thông tin thật: lương ở Nhật bị trừ trước bảo hiểm y tế, 厚生年金, bảo hiểm thất nghiệp (雇用保険) và thuế thu nhập (所得税), nên 手取り ít hơn lương ghi; 住民税 tính theo thu nhập năm trước nên năm đầu đi làm chưa bị trừ, thường bắt đầu từ tháng 6 năm sau; giữ lại 給与明細 vì cần cho thủ tục thuế.
- Chuẩn v2, cấp N3: 1742 ký tự, 61 câu, câu TB 28.6 ký tự, harder 7.2%, atLevel 22.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 日本=にほん, 一人=ひとり, 一階=いっかい, 一冊=いっさつ, 一機=いっき, 一日目=いちにち め, 十四日=じゅうよっか, 三十分=さんじゅっぷん, 二十六歳=にじゅうろく さい, グエン・ヴァン・ミン=ぐえん ゔぁん みん, ファム・ハイ=ふぁむ はい, 布施駅=ふせ えき, のりば=のりば, 言うてた=いうてた, はよおいで=はよ おいで, 来えへんかったん=こえへんかったん, つながらなくて=つながらなくて, かべ=かべ, ふとん=ふとん, では=でわ, 運転席=うんてんせき, 一行=いちぎょう, 入る方=はいる かた, どきっと=どきっと, へんかった=へんかった, 三・八=さんてんはち, 〇・二=れいてんに, 日本語=にほんご, 二人=ふたり, ゆうちょ=ゆうちょ, 二十年=にじゅう ねん, 言わへんかった=いわへんかった, はなれた=はなれた, 三十年=さんじゅう ねん, いちばん上=いちばん うえ, 震度四=しんど よん, 三十秒=さんじゅう びょう, 何十冊=なんじゅっさつ, 数秒前=すうびょう まえ, 明日作り=あした つくり, いちばん下=いちばん した, 一歩=いっぽ, 手取り=てどり, 二十五日=にじゅうごにち, 二十五万円=にじゅうごまんえん, 二十万円=にじゅうまんえん, 一か月前=いっかげつまえ, 何言うてんの=なにいうてんの, 教えたる=おしえたる, おるねん=おるねん, 来てや=きてや, なりや=なりや, 大阪弁=おおさかべん, 給与明細=きゅうよめいさい, 所得税=しょとくぜい, 住民税=じゅうみんぜい. Đã đọc lại toàn bộ.
- Từ vựng: 28 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/osaka/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/osaka-hataraku-08/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (33 câu)
  - ミン: `ja-JP-Neural2-C`, tốc độ 0.95 (6 câu)
  - 部長: `ja-JP-Neural2-C`, tốc độ 1, cao độ -6 (2 câu)
  - あかり: `ja-JP-Neural2-B`, tốc độ 0.98, cao độ 1 (3 câu)
  - 岩田: `ja-JP-Neural2-C`, tốc độ 1.02, cao độ -2 (4 câu)
  - ラジュ: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -1 (2 câu)
  - ハイ: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 2 (4 câu)
  - キヨ: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -4 (5 câu)
  - 社長: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -5 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Kaku Gothic New.

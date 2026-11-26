# QC — world-yukinojoo-1

- Nguồn: Truyện 'Snedronningen' của Hans Christian Andersen (1844), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N3, theo bản gốc (không theo phim hoạt hình): mảnh gương quỷ, Kai và Gerda, cô con gái tướng cướp, con tuần lộc, chữ 'Vĩnh cửu' bằng băng, nước mắt làm tan trái tim.
- Chuẩn v2, cấp N3: 1364 ký tự, 47 câu, câu TB 29.0 ký tự, harder 2.7%, atLevel 23.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 雪の女王=ゆきのじょおう, 女王=じょおう, 花だん=かだん, となり同士=となりどうし, 絵本=えほん, 広場=ひろば, 野原=のはら, 山賊=さんぞく, 若者=わかもの, 背中=せなか, 世界中=せかいじゅう, 小さな舟=ちいさなふね, 干した=ほした, 十二人分=じゅうににんぶん, 大つぶ=おおつぶ, 手ぶくろ=てぶくろ, 兵隊=へいたい, 天使=てんし, 次々=つぎつぎ, 真ん中=まんなか, 永遠=えいえん, 湖=みずうみ, 胸=むね, 息=いき, 実=み, 薬=くすり, 門=もん, 時計=とけい, 大人=おとな, 昔=むかし, 日ざし=ひざし, お礼=おれい, 代わり=かわり, 遊び相手=あそびあいて, 北の国=きたのくに, 鏡=かがみ, 氷=こおり, 虫=むし, まもの=まもの, かけら=かけら, うしろ=うしろ, 涙=なみだ, 途中=とちゅう, 乱暴=らんぼう, 姿=すがた, 靴=くつ. Đã đọc lại toàn bộ.
- Từ vựng: 11 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-yukinojoo-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (33 câu)
  - おばあさん: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ -6 (1 câu)
  - カイ: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 6 (3 câu)
  - ゲルダ: `ja-JP-Neural2-B`, tốc độ 1, cao độ 5 (3 câu)
  - 雪の女王: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ -2 (1 câu)
  - カラス: `ja-JP-Neural2-C`, tốc độ 1.1, cao độ 4 (1 câu)
  - 山賊の娘: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ -1 (3 câu)
  - ハト: `ja-JP-Neural2-B`, tốc độ 1.1, cao độ 8 (1 câu)
  - トナカイ: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -6 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Antique.

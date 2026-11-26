# QC — furusato-vn-thachlam-2

- Nguồn: Gió lạnh đầu mùa (1937, tập cùng tên) của Thạch Lam (1910–1942); public domain. Claude tự kể lại bằng tiếng Nhật (N1) từ nguyên tác, rút gọn: gió bấc đầu mùa, mẹ lấy áo rét, Sơn mặc áo dạ, lũ trẻ nghèo ngoài chợ, bé Hiên co ro bên cột quán trong manh áo rách, Sơn nhớ em Duyên đã mất và chiếc áo bông cũ, Lan về lấy áo cho Hiên, mẹ Hiên mang trả, mẹ Sơn không mắng mà cho mẹ Hiên vay tiền may áo. Một số lời thoại và trình tự (mẹ tự phát hiện mất áo) được giản lược.
- Chuẩn v2, cấp N1: 2018 ký tự, 60 câu, câu TB 33.6 ký tự, harder 0.0%, atLevel 5.4%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 市場=いちば, 一杯=いっぱい, 一息=ひといき, 一瞬=いっしゅん, 一本=いっぽん, 一枚=いちまい, 戸板=といた, 杯=さかずき, 甲高く=かんだかく, 轟音=ごうおん, 気のふれた=き の ふれた, 夜更け=よふけ, 行き交う=ゆきかう, 店番=みせばん, 係=かかり, 金具=かなぐ, 竹=たけ, 石嵐=せきらん, 後ろ姿=うしろすがた, 明日=あした, 銅=どう, 来そう=きそう, 担いで=かついで, 昼の間=ひる の あいだ, 綿入れ=わたいれ, 仕立て屋=したてや, 上等=じょうとう, 木綿=もめん, 形見=かたみ, 坊ちゃん=ぼっちゃん, 奥さま=おくさま, 手元=てもと, 一晩=ひとばん, 裏地=うらじ, 毛織り=けおり, 見比べた=みくらべた, 芯=しん, 唇=くちびる, 空き地=あきち, ヒエン=ひえん. Đã đọc lại toàn bộ.
- Từ vựng: 9 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-thachlam-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (45 câu)
  - ソン: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 6 (3 câu)
  - ラン: `ja-JP-Neural2-B`, tốc độ 1.02, cao độ 3 (1 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ -1 (7 câu)
  - 子ども: `ja-JP-Neural2-C`, tốc độ 1.08, cao độ 8 (1 câu)
  - ヒエン: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 6 (1 câu)
  - ヒエンの母: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -4 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Old Mincho.

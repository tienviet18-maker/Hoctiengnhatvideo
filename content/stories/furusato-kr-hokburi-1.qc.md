# QC — furusato-kr-hokburi-1

- Nguồn: Truyện dân gian Hàn Quốc 혹부리 영감 (ông lão có bướu hát hay, dokkaebi tưởng giọng hát ở trong bướu nên lấy bướu đổi vàng bạc; ông hàng xóm tham lam bắt chước, bị gắn thêm bướu), truyền khẩu, public domain. Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống. Phần so sánh: 『こぶとりじいさん』 (宇治拾遺物語 巻一, public domain).
- Chuẩn v2, cấp N4: 1534 ký tự, 60 câu, câu TB 25.6 ký tự, harder 14.3%, atLevel 29.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 韓国=かんこく, 昔話=むかしばなし, 右=みぎ, 上手=じょうず, 下手=へた, 空き家=あきや, 歌声=うたごえ, 戸=と, 宝物=たからもの, 金=きん, 正直=しょうじき, 欲ばり=よくばり, 反対=はんたい, 鬼=おに, 指さしました=ゆびさしました, 空=そら, 暗く=くらく, こぶ=こぶ, こぶとりじいさん=こぶとりじいさん. Đã đọc lại toàn bộ.
- Từ vựng: 12 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-kr-hokburi-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.86 (45 câu)
  - おじいさん: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -6 (4 câu)
  - トッケビ: `ja-JP-Neural2-C`, tốc độ 1, cao độ -10 (8 câu)
  - 欲ばりじいさん: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -2 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Antique B1.

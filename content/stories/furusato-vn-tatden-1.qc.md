# QC — furusato-vn-tatden-1

- Nguồn: Tiểu thuyết 『Tắt đèn』 của Ngô Tất Tố (1893–1954), đăng báo từ 1937, in thành sách 1939; tác giả mất năm 1954 nên tác phẩm đã thuộc phạm vi công cộng ở Việt Nam và Nhật Bản. Claude tự kể lại bằng tiếng Nhật N2 theo nguyên tác, chia 2 phần. Phần 1: mùa sưu thuế ở làng Đông Xá, anh Dậu ốm bị trói ở đình vì thiếu suất sưu của người em đã chết, chị Dậu bán ổ chó và khoai, bán cái Tý cho nhà Nghị Quế, câu 'U nhất định bán con đấy ư?', nộp sưu nhưng vẫn thiếu, anh Dậu được khiêng về như chết, bà lão hàng xóm cho gạo nấu cháo.
- Chuẩn v2, cấp N2: 1565 ký tự, 43 câu, câu TB 36.4 ký tự, harder 3.0%, atLevel 11.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, ゴー・タッ・トー=ゴー・タッ・トー, タッ・デン=タッ・デン, チ・ザウ=チ・ザウ, ザウ=ザウ, ティー=ティー, ザン=ザン, ギ・クエ=ギ・クエ, ドンサー=ドンサー, 一九三七年=せんきゅうひゃくさんじゅうななねん, 灯=ひ, 人頭税=じんとうぜい, 帳面=ちょうめん, 集会所=しゅうかいじょ, 戸板=といた, 一口=ひとくち, 一度=いちど, 第二部=だいにぶ, 長女=ちょうじょ, 値切り=ねぎり, 買いたたかれて=かいたたかれて, 片っ端=かたっぱし, 別れ際=わかれぎわ, 死なれて=しなれて, 堤=つつみ, 乳母=うば, 元役人=もとやくにん, 八十近い=はちじゅうちかい, 寝静まった=ねしずまった, 墨=すみ, 行く末=ゆくすえ, 裏口=うらぐち, 小林多喜二=こばやしたきじ, 蟹工船=かにこうせん, 捨てぜりふ=すてぜりふ, ほうほうの体=ほうほうのてい, 牢屋行き=ろうやゆき, 言葉づかい=ことばづかい, 枯れ草=かれくさ, 乳飲み子=ちのみご, 七つ=ななつ, 五ひき=ごひき, 村長=そんちょう, 金=かね, 行くあて=いくあて, 日本語=にほんご, 一杯=いっぱい, お金=おかね, 金持ち=かねもち, 破れる=やぶれる. Đã đọc lại toàn bộ.
- Từ vựng: 13 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-tatden-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.88 (34 câu)
  - ティー: `ja-JP-Neural2-B`, tốc độ 1.12, cao độ 7 (2 câu)
  - ギ・クエの妻: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 2 (1 câu)
  - チ・ザウ: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ -2 (3 câu)
  - 村長: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -4 (2 câu)
  - おばあさん: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ -5 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho B1.

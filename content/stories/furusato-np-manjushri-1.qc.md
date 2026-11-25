# QC — furusato-np-manjushri-1

- Nguồn: Truyền thuyết Nepal về Bồ Tát Văn Thù (Manjushri) dùng kiếm xẻ núi Chobhar tháo nước hồ, tạo ra thung lũng Kathmandu, chép trong Swayambhu Purana (văn bản Phật giáo Newar cổ, public domain) và lưu truyền dân gian. Đã đối chiếu tài liệu về Chobhar, Taudaha, Swayambhunath và giả thuyết địa chất hồ cổ Kathmandu. Claude tự kể lại bằng tiếng Nhật. Phần so sánh: truyền thuyết hồ cổ ở bồn địa Kōfu (Yamanashi), thần đá núi tháo nước ra sông Fuji (蹴裂伝説, dân gian).
- Chuẩn v2, cấp N4: 1531 ký tự, 60 câu, câu TB 25.5 ký tự, harder 14.2%, atLevel 32.9%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 首都=しゅと, 盆地=ぼんち, 土地=とち, 湖=みずうみ, 神さま=かみさま, 一本=いっぽん, 光=ひかり, 仏さま=ほとけさま, 剣=けん, 南=みなみ, 北=きた, 谷=たに, 何日=なんにち, 丘=おか, お寺=おてら, 王さま=おうさま, 池=いけ, 学者=がくしゃ, 底=そこ, 山梨県=やまなしけん, 甲府盆地=こうふぼんち, 富士川=ふじかわ, 神社=じんじゃ, 大むかし=おおむかし, 穴=あな, 足=あし, 外=そと, 土=つち, 姿=すがた, 星=ほし, 細い=ほそい, 畑=はたけ, 刀=かたな, 地面=じめん, 名前=なまえ, 大切=たいせつ, 目の前=めのまえ. Đã đọc lại toàn bộ.
- Từ vựng: 14 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-np-manjushri-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (55 câu)
  - マンジュシュリ: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -3 (4 câu)
  - ナーガ: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -5 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Yuji Mai.

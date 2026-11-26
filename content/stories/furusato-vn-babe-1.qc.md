# QC — furusato-vn-babe-1

- Nguồn: Truyện cổ tích dân tộc Tày 「Sự tích hồ Ba Bể」 (Bắc Kạn): bà lão ăn xin (Giao Long hóa thân) đến lễ hội bị cả làng xua đuổi, chỉ hai mẹ con bà góa cho ăn ngủ; bà để lại gói tro (dặn rắc quanh nhà) và hai mảnh vỏ trấu; đêm đó nước dâng thành hồ, nhà hai mẹ con thành gò Pò Gia Mải (gò bà góa), vỏ trấu thành thuyền cứu người. Truyền khẩu, public domain. Claude tự kể lại bằng tiếng Nhật. Phần so sánh: truyền thuyết 「蘇民将来」 (備後国風土記 逸文, public domain).
- Chuẩn v2, cấp N4: 1541 ký tự, 60 câu, câu TB 25.7 ký tự, harder 13.0%, atLevel 30.2%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 竜=りゅう, 蘇民将来=そみんしょうらい, 大水=おおみず, 北=きた, 湖=みずうみ, 島=しま, 野原=のはら, 神さま=かみさま, 旅人=たびびと, 地面=じめん, 神社=じんじゃ, 田んぼ=たんぼ, 今夜=こんや, 高い所=たかいところ, お金持ち=おかねもち, 灰=はい. Đã đọc lại toàn bộ.
- Từ vựng: 13 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-babe-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.86 (46 câu)
  - おばあさん: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ -5 (7 câu)
  - お母さん: `ja-JP-Neural2-B`, tốc độ 0.92 (4 câu)
  - 男の子: `ja-JP-Neural2-C`, tốc độ 1, cao độ 4 (1 câu)
  - 村の男: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -4 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Antique Soft.

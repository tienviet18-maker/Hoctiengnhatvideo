# QC — furusato-kr-tokki-1

- Nguồn: Truyện dân gian Hàn Quốc 'Tokki-jeon' (Thỏ truyện, còn gọi Byeoljubu-jeon; phạm vi công cộng, cũng là một tích pansori Sugungga): Long Vương bệnh, cần gan thỏ; ba ba lên cạn dụ thỏ xuống Long cung bằng lời hứa phú quý; thỏ bảo đã lấy gan ra phơi trên núi, được thả về và chế giễu ba ba. Claude tự kể lại bằng tiếng Nhật N3; câu kết so sánh với truyện Nhật 'Kurage hone-nashi' (con sứa không xương).
- Chuẩn v2, cấp N3: 1380 ký tự, 39 câu, câu TB 35.4 ký tự, harder 4.0%, atLevel 34.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 竜宮=りゅうぐう, 竜王=りゅうおう, 海の底=うみのそこ, 国じゅう=くにじゅう, 年老いた=としおいた, 一つ=ひとつ, 陸=りく, 肝=きも, 一ぴき=いっぴき, 使い=つかい, 宝物=たからもの, 位=くらい, 背中=せなか, 兵士=へいし, 縄=なわ, 谷=たに, 岩=いわ, 干して=ほして, 岸=きし, 命=いのち, 後ろ姿=うしろすがた, 忠義=ちゅうぎ, 神様=かみさま, 知恵=ちえ, 猿=さる, 骨=ほね, 罰=ばつ, 伝統的=でんとうてき, 語り歌=かたりうた, 山のふもと=やまのふもと, 韓国=かんこく, 行ってまいります=いってまいります, 竜王様=りゅうおうさま, もしもし=もしもし, 陸の方=りくのかた. Đã đọc lại toàn bộ.
- Từ vựng: 18 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-kr-tokki-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (24 câu)
  - 医者: `ja-JP-Neural2-C`, tốc độ 0.82, cao độ -6 (1 câu)
  - スッポン: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -2 (4 câu)
  - うさぎ: `ja-JP-Neural2-B`, tốc độ 1.12, cao độ 5 (7 câu)
  - 竜王: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -8 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kosugi Maru.

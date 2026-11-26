# QC — furusato-br-saci-1

- Nguồn: Truyện dân gian Brazil về Saci-Pererê (cậu bé một chân, đội mũ đỏ, hút tẩu, đến cùng gió xoáy, hay nghịch: làm đổ sữa, bỏ muối vào đường, tết bờm ngựa; bắt được bằng cách ném cái sàng vào gió xoáy và lấy mũ đỏ, người giữ mũ được một điều ước; Saci rành cây thuốc trong rừng). Truyền khẩu, public domain. Câu chuyện cậu bé João là Claude tự sáng tác theo các mô-típ truyền thống. Phần so sánh: yêu quái かまいたち (dân gian Nhật, public domain).
- Chuẩn v2, cấp N4: 1524 ký tự, 60 câu, câu TB 25.4 ký tự, harder 7.6%, atLevel 20.5%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一本=いっぽん, 足=あし, 男の子=おとこのこ, 赤い=あかい, 頭=あたま, 風=かぜ, 昔=むかし, 家=いえ, 牛=うし, 一頭=いっとう, 馬=うま, 二頭=にとう, 朝=あさ, 次=つぎ, 塩=しお, 外=そと, 一週間=いっしゅうかん, 午後=ごご, 畑=はたけ, 方=ほう, 土=つち, 空=そら, 今=いま, 何か=なにか, 返して=かえして, 一つ=ひとつ, 少し=すこし, 遠く=とおく, 森=もり, 草=くさ, 緑=みどり, 持って=もって, お茶=おちゃ, 作って=つくって, 毎日=まいにち, 飲んで=のんで, 約束=やくそく, 消えました=きえました, 一か月=いっかげつ, 顔=かお, 気=き, 血=ち, 説明=せつめい, 民話=みんわ, かまいたち=かまいたち, 三びき目=さんびきめ, 三びき=さんびき, 薬=くすり. Đã đọc lại toàn bộ.
- Từ vựng: 14 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-br-saci-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.86 (38 câu)
  - ジョアン: `ja-JP-Neural2-C`, tốc độ 1, cao độ 6 (8 câu)
  - おばあちゃん: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -4 (7 câu)
  - サシ: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 10 (7 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông M PLUS 1.

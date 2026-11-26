# QC — furusato-br-curupira-1

- Nguồn: Truyện dân gian Brazil (gốc Tupi) về Curupira: thần nhỏ giữ rừng, tóc đỏ như lửa, bàn chân quay ngược để dấu chân dẫn kẻ săn đi sai hướng; trừng phạt người săn bắn quá mức, làm họ lạc đường; huýt sáo trong rừng; người vào rừng để lại lễ vật. Truyền khẩu, public domain. Chuyện thợ săn José là Claude tự sáng tác theo các mô-típ truyền thống. Phần so sánh: 天狗, 天狗隠し và 天狗倒し (dân gian Nhật, public domain).
- Chuẩn v2, cấp N4: 1537 ký tự, 60 câu, câu TB 25.6 ký tự, harder 9.3%, atLevel 23.7%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 森=もり, 男の子=おとこのこ, 名前=なまえ, 火=ひ, 赤い=あかい, 足=あし, 向き=むき, 足あと=あしあと, 反対=はんたい, 方=ほう, 向いて=むいて, 昔=むかし, 近く=ちかく, 村=むら, 男=おとこ, 鉄砲=てっぽう, 上手=じょうず, 動物=どうぶつ, 町=まち, 売って=うって, お金=おかね, 次=つぎ, 奥=おく, 木=き, 間=あいだ, 子ども=こども, 二頭=にとう, 今日=きょう, 地面=じめん, 先=さき, 暗く=くらく, 同じ=おなじ, 所=ところ, 回って=まわって, 口笛=くちぶえ, 立って=たって, 本当=ほんとう, 二度と=にどと, 家=いえ, 顔=かお, 言葉=ことば, 生きて=いきて, 一度=いちど, 細い=ほそい, 道=みち, 明かり=あかり, 家族=かぞく, 分=ぶん, 前=まえ, 今=いま, 山=やま, 天狗=てんぐ, 長い=ながい, 鼻=はな, 羽=はね, 急に=きゅうに, 何日=なんにち, 夜=よる, 音=おと, 朝=あさ, 注意=ちゅうい, 気=き, 民話=みんわ, うしろ向き=うしろむき, かみの毛=かみのけ, 鳥=とり, 声=こえ, 下=した, 強く=つよく, 風=かぜ, 話=はなし, 教えて=おしえて, 虫=むし, 考えられて=かんがえられて. Đã đọc lại toàn bộ.
- Từ vựng: 8 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-br-curupira-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.86 (43 câu)
  - ジョゼ: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -2 (8 câu)
  - おじいさん: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -8 (2 câu)
  - クルピラ: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ -2 (7 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kosugi.

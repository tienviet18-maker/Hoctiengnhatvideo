# QC — furusato-vn-tichchu-1

- Nguồn: Truyện cổ tích Việt Nam 「Tích Chu」 (bà nuôi cháu, cháu ham chơi bỏ mặc bà ốm khát nước; bà hóa chim bay đi; tiên chỉ đường lấy nước suối tiên, bà trở lại thành người), truyền khẩu, public domain. Claude tự kể lại bằng tiếng Nhật. Phần so sánh: 『姨捨山 / うばすて山』 (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N4: 1546 ký tự, 60 câu, câu TB 25.8 ký tự, harder 10.2%, atLevel 23.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 村=むら, 男の子=おとこのこ, お父さん=おとうさん, お母さん=おかあさん, 早く=はやく, 死んで=しんで, 大切=たいせつ, 朝=あさ, 夜=よる, 田んぼ=たんぼ, 食べて=たべて, 大きく=おおきく, 夏=なつ, 暑い=あつい, 風=かぜ, 送りました=おくりました, 冬=ふゆ, 寒い=さむい, 寝ました=ねました, 遊んで=あそんで, 家=いえ, 出て=でて, 友だち=ともだち, 帰りません=かえりません, 年=とし, 取って=とって, 体=からだ, 弱く=よわく, 手伝いません=てつだいません, 日=ひ, 病気=びょうき, 熱=ねつ, 水=みず, 一ぱい=いっぱい, 持って=もって, 外=そと, 聞こえません=きこえません, 何度=なんど, 来ません=きません, 夕方=ゆうがた, 帰る=かえる, 上=うえ, 一羽=いちわ, 小さな=ちいさな, 鳥=とり, 鳴いて=ないて, 空=そら, 泣き=なき, 追いかけました=おいかけました, 帰って=かえって, 悪かった=わるかった, 人=ひと, 高い=たかい, 木=き, 止まって=とまって, 言いました=いいました, 下=した, 白い=しろい, 服=ふく, 着た=きた, 仙女=せんにょ, 遠い=とおい, 山=やま, 飲ませなさい=のませなさい, 行く=いく, 道=みち, 長くて=ながくて, 行きます=いきます, 出発=しゅっぱつ, 大きな=おおきな, 川=かわ, 何日=なんにち, 足=あし, 血=ち, 止まりません=とまりません, 番=ばん, 光る=ひかる, 見つけました=みつけました, 入れて=いれて, 帰りました=かえりました, 声=こえ, 飲みました=のみました, 毎日=まいにち, 手伝いました=てつだいました, お年より=おとしより, 話=はなし, 親=おや, 決まり=きまり, 男=おとこ, 知恵=ちえ, 助かった=たすかった, 昔話=むかしばなし, 教えて=おしえて, 今日=きょう, 家族=かぞく, 電話=でんわ, 光る水=ひかるみず. Đã đọc lại toàn bộ.
- Từ vựng: 10 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-tichchu-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.86 (44 câu)
  - おばあさん: `ja-JP-Neural2-B`, tốc độ 0.86, cao độ -5 (3 câu)
  - 鳥: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -2 (2 câu)
  - ティックチュー: `ja-JP-Neural2-C`, tốc độ 1, cao độ 4 (8 câu)
  - 仙女: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ 3 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Noto Serif JP.

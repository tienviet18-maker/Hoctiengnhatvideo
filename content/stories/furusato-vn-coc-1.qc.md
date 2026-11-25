# QC — furusato-vn-coc-1

- Nguồn: Truyện dân gian Việt Nam 「Cóc kiện trời」 (cóc cùng cua, gấu, cọp, cáo, ong lên thiên đình đánh trống kiện trời vì hạn hán; Ngọc Hoàng gọi cóc là 'cậu' — 'Con cóc là cậu ông Trời'), truyền khẩu, public domain. Claude tự kể lại bằng tiếng Nhật. Phần so sánh: 『桃太郎』 (dân gian, public domain) và tục 雨ごい.
- Chuẩn v2, cấp N3: 1593 ký tự, 59 câu, câu TB 27.0 ký tự, harder 10.8%, atLevel 27.2%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 天=てん, 王さま=おうさま, 言葉=ことば, 小さな=ちいさな, 小さい=ちいさい, 年=とし, 雨=あめ, 川=かわ, 池=いけ, 田んぼ=たんぼ, 土=つち, 草=くさ, 木=き, 動物=どうぶつ, 苦しみました=くるしみました, 中=なか, 一ぴき=いっぴき, 言い=いい, 空=そら, 上=うえ, 国=くに, 出発=しゅっぱつ, 会いました=あいました, 話=はなし, 行く=いく, 二ひき=にひき, 聞いて=きいて, 一行=いっこう, 門=もん, 着きました=つきました, 横=よこ, 大きな=おおきな, 合図=あいず, 助けて=たすけて, 水=みず, 近く=ちかく, 音=おと, 出て=でて, 神=かみ, 神さま=かみさま, 持って=もって, 足=あし, 入れる=いれる, 何か月=なんかげつ, 死に=しに, 歯=は, 鳴く=なく, 昔話=むかしばなし, 思い出しません=おもいだしません, 桃太郎=ももたろう, 鬼=おに, 者=もの, 力=ちから, 合わせれば=あわせれば, 相手=あいて, 勝てる=かてる, 村=むら, 人=ひと, 自分=じぶん, 今度=こんど, 声=こえ, 思い出して=おもいだして, 帰って=かえって, 大よろこび=おおよろこび, 下=した, 何=なに, 行って=いって, 行かせて=いかせて, 行かせろ=いかせろ, 出して=だして, 水がめ=みずがめ. Đã đọc lại toàn bộ.
- Từ vựng: 2 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-coc-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (45 câu)
  - カエル: `ja-JP-Neural2-C`, tốc độ 1, cao độ 5 (4 câu)
  - カニ: `ja-JP-Neural2-B`, tốc độ 1, cao độ 4 (2 câu)
  - 天の王さま: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -7 (6 câu)
  - かみなりの神: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -3 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho B1.

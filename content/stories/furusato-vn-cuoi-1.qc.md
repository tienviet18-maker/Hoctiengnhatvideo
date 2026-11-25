# QC — furusato-vn-cuoi-1

- Nguồn: Truyền thuyết dân gian Việt Nam 「Sự tích chú Cuội cung trăng」 (Cuội thấy hổ mẹ cứu hổ con bằng lá cây đa thần, mang cây về chữa bệnh; vợ tưới nước bẩn, cây bay lên cung trăng kéo theo Cuội), truyền khẩu, public domain. Claude tự kể lại bằng tiếng Nhật. Phần so sánh: 月のうさぎ, お月見 và 『竹取物語』 (thế kỷ 9–10, public domain).
- Chuẩn v2, cấp N4: 1536 ký tự, 60 câu, câu TB 25.6 ký tự, harder 14.6%, atLevel 38.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 秋=あき, 夜=よる, 祭り=まつり, 子ども=こども, 星=ほし, 形=かたち, 町=まち, 歩きます=あるきます, 月=つき, 中=なか, 黒い=くろい, 木=き, 下=した, 男=おとこ, 村=むら, 若い=わかい, 毎日=まいにち, 山=やま, 切って=きって, 三びき=さんびき, 近づきました=ちかづきました, 大きな=おおきな, 音=おと, 急いで=いそいで, 上=うえ, 動かない=うごかない, 少し=すこし, 近く=ちかく, 葉っぱ=はっぱ, 取って=とって, 口=くち, 入れました=いれました, 目=め, 元気=げんき, 起き上がった=おきあがった, 親子=おやこ, 下りました=おりました, 根っこ=ねっこ, 家=いえ, 持って=もって, 帰って=かえって, 植えました=うえました, 病気=びょうき, 助ける=たすける, 食べる=たべる, 治りました=なおりました, 感謝=かんしゃ, お金持ち=おかねもち, 娘=むすめ, 川=かわ, 落ちて=おちて, 死んで=しんで, 使って=つかって, 生き返らせました=いきかえらせました, お嫁さん=およめさん, 結婚=けっこん, 一つ=ひとつ, 心配=しんぱい, 水=みず, 妻=つま, 何度=なんど, 土=つち, 空=そら, 走って=はしって, 引っかけました=ひっかけました, 高く=たかく, 地上=ちじょう, お月見=おつきみ, 竹取物語=たけとりものがたり, 姫=ひめ, お姫さま=おひめさま, 同じ=おなじ, 国=くに, 今夜=こんや, 出たら=でたら, 見て=みて, 行って=いって, お母さん=おかあさん, 楽しみます=たのしみます. Đã đọc lại toàn bộ.
- Từ vựng: 8 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-cuoi-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (54 câu)
  - クオイ: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 1 (4 câu)
  - お金持ち: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -6 (1 câu)
  - クオイの妻: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông M PLUS Rounded 1c.

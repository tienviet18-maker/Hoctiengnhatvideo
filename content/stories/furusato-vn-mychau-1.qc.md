# QC — furusato-vn-mychau-1

- Nguồn: Truyền thuyết Việt Nam 「An Dương Vương và Mỵ Châu – Trọng Thủy」 (thành Cổ Loa, rùa vàng Kim Quy cho vuốt làm nỏ thần, Trọng Thủy đánh tráo lẫy nỏ, Mỵ Châu rắc lông ngỗng, rùa vàng nói 'giặc ngồi sau lưng', máu Mỵ Châu thành ngọc trai, Trọng Thủy nhảy giếng), truyền khẩu và 『Lĩnh Nam chích quái』 (thế kỷ 15), public domain. Claude tự kể lại bằng tiếng Nhật. Phần so sánh: giai thoại お市の方 và túi đậu đỏ buộc hai đầu (『朝倉家記』, tương truyền), public domain.
- Chuẩn v2, cấp N3: 1968 ký tự, 66 câu, câu TB 29.8 ký tự, harder 10.7%, atLevel 32.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 首都=しゅと, 城=しろ, お城=おしろ, 恋=こい, 王さま=おうさま, 王=おう, 亀=かめ, 金色=きんいろ, 金の亀=きんのかめ, 半月=はんつき, 弓=ゆみ, 矢=や, 千本=せんぼん, 敵=てき, 作戦=さくせん, 息子=むすこ, 娘=むすめ, 結婚=けっこん, お姫さま=おひめさま, 夫婦=ふうふ, 夫=おっと, 上着=うわぎ, 羽=はね, 本物=ほんもの, 大軍=たいぐん, 約束=やくそく, 真珠=しんじゅ, 剣=けん, 血=ち, 貝=かい, 井戸=いど, 身=み, 戦国時代=せんごくじだい, お市の方=おいちのかた, お市=おいち, 織田信長=おだのぶなが, 信長=のぶなが, 浅井長政=あざいながまさ, 兄=あに, 小豆=あずき, 両はし=りょうはし, 二千年=にせんねん, 神さま=かみさま, 完成=かんせい, 平和=へいわ, 危険=きけん, 一まい=いちまい, 海=うみ. Đã đọc lại toàn bộ.
- Từ vựng: 16 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-mychau-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (51 câu)
  - 王: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -6 (2 câu)
  - 金の亀: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -10 (3 câu)
  - チョントゥイ: `ja-JP-Neural2-C`, tốc độ 0.98, cao độ 2 (4 câu)
  - ミーチャウ: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (6 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông BIZ UDMincho.

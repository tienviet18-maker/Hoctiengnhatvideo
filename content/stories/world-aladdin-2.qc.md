# QC — world-aladdin-2

- Nguồn: Truyện 'Aladdin' trong Nghìn lẻ một đêm, theo bản Antoine Galland (1710) và bản dịch Anh của Andrew Lang (1898), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N3. Tập 2: cầu hôn bằng châu báu, cung điện dựng trong một đêm, 'đổi đèn cũ lấy đèn mới', cung điện bay sang châu Phi, thần nhẫn giúp Aladdin, đoạt lại cây đèn.
- Chuẩn v2, cấp N3: 1384 ký tự, 49 câu, câu TB 28.2 ký tự, harder 8.8%, atLevel 32.4%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 見知らぬ=みしらぬ, 魔法使い=まほうつかい, 親せき=しんせき, 数日後=すうじつご, 呪文=じゅもん, 洞窟=どうくつ, 宝物=たからもの, 宝石=ほうせき, 指輪=ゆびわ, お守り=おまもり, 入り口=いりぐち, 真っ暗=まっくら, 二日間=ふつかかん, 暗やみ=くらやみ, 精霊=せいれい, 命令=めいれい, 一枚ずつ=いちまい ずつ, 商人=しょうにん, 世の中=よのなか, お姫様=おひめさま, 王様=おうさま, お風呂=おふろ, 手を合わせた=て を あわせた, 目もくらむ=め も くらむ, 亡くなって=なくなって, 父親=ちちおや, 母親=ははおや, あっという間=あっという ま, ご命令=ごめいれい, 何をいたしましょう=なに を いたしましょう, ごちそう=ごちそう, 布=ぬの, 銀=ぎん, 知らせ=しらせ, 者=もの, 役に立つ=やく に たつ, その間=その あいだ, 戸のかげ=と の かげ, 早くに=はやく に, 三か月=さんかげつ, 二か月後=にかげつご, 大臣=だいじん, 結婚式=けっこんしき, 物置=ものおき, 入れ物=いれもの, 四十=よんじゅう, 八十人=はちじゅうにん, 行列=ぎょうれつ, 一晩=ひとばん, 大広間=おおひろま, 二十四=にじゅうよん, 取りもどして=とりもどして, 取りもどしました=とりもどしました, 四十日=よんじゅうにち, ねむり薬=ねむりぐすり, 笑顔=えがお, 二度と=にどと, 目を丸く=め を まるく, 狩り=かり, 手に入れる=て に いれる, 浮かんで=うかんで, 姫=ひめ, 場所=ばしょ, 娘=むすめ. Đã đọc lại toàn bộ.
- Từ vựng: 9 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-aladdin-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (30 câu)
  - 魔法使い: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -6 (4 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -3 (1 câu)
  - アラジン: `ja-JP-Neural2-C`, tốc độ 1, cao độ 5 (6 câu)
  - 指輪の精: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -2 (1 câu)
  - ランプの精: `ja-JP-Neural2-C`, tốc độ 0.8, cao độ -10 (0 câu)
  - 王様: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -5 (4 câu)
  - 姫: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 4 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Dela Gothic One.

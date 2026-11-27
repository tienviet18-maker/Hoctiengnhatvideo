# QC — world-vasilisa-2

- Nguồn: Truyện dân gian Nga 'Vasilisa Prekrasnaya' trong tuyển tập của Alexander Afanasyev (1855–1863), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N3, giữ các chi tiết gốc: con búp bê của mẹ, mụ phù thủy Baba Yaga, ba kỵ sĩ trắng, đỏ, đen, túp lều chân gà, ngọn lửa đầu lâu.
- Chuẩn v2, cấp N3: 1435 ký tự, 47 câu, câu TB 30.5 ký tự, harder 4.1%, atLevel 25.9%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 商人=しょうにん, 夫婦=ふうふ, 八つ=やっつ, 重い病気=おもいびょうき, 人形=にんぎょう, 亡くなりました=なくなりました, 畑=はたけ, 日に日に=ひにひに, 商売=しょうばい, 魔女=まじょ, 無事=ぶじ, 一本=いっぽん, 明かり=あかり, 空き地=あきち, 骨=ほね, 小屋=こや, 麦=むぎ, 粒=つぶ, 一つ残らず=ひとつのこらず, 庭=にわ, お祈り=おいのり, 三組=さんくみ, 祝福=しゅくふく, 棒=ぼう, 灰=はい, 機織り機=はたおりき, 見事=みごと, 布=ぬの, 織=お, 妃=きさき, 一目=ひとめ, 一晩=ひとばん, 一生=いっしょう, 顔色=かおいろ, 糸=いと, 王様=おうさま, お日さま=おひさま, 奥=おく, 使い=つかい, 姉さん=ねえさん, 住まわせて=すまわせて, 一日じゅう=いちにちじゅう, 十分=じゅうぶん, 土から=つちから, 土に=つちに, けしの実=けしのみ, 夜の森=よるのもり, がいこつ=がいこつ, 塀=へい, 置いて=おいて. Đã đọc lại toàn bộ.
- Từ vựng: 12 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-vasilisa-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (28 câu)
  - ババ・ヤガー: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -9 (8 câu)
  - 人形: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 9 (1 câu)
  - ワシリーサ: `ja-JP-Neural2-B`, tốc độ 1, cao độ 4 (5 câu)
  - がいこつ: `ja-JP-Neural2-C`, tốc độ 0.8, cao độ -8 (1 câu)
  - 継母: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ -5 (1 câu)
  - おばあさん: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ -4 (1 câu)
  - 王様: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -2 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Yuji Syuku.

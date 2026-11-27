# QC — furusato-vn-hoangle-1

- Nguồn: Hoàng Lê nhất thống chí (皇黎一統志) của Ngô gia văn phái (Ngô Thì Chí †1788, Ngô Thì Du †1829…), tiểu thuyết chương hồi chữ Hán; public domain. Claude tự kể lại bằng tiếng Nhật (N1) từ nguyên tác, không dựa trên bản dịch hiện đại. Tập 1 theo hồi 12–14: Lê Chiêu Thống cầu viện nhà Thanh, Tôn Sĩ Nghị vào Thăng Long, Ngô Văn Sở theo kế Ngô Thì Nhậm rút về Tam Điệp; Nguyễn Huệ lên ngôi (25 tháng 11 Mậu Thân), tuyển quân ở Nghệ An, hỏi Nguyễn Thiếp, dụ tướng sĩ.
- Chuẩn v2, cấp N1: 2036 ký tự, 60 câu, câu TB 33.9 ký tự, harder 0.0%, atLevel 10.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 孫士毅=そん しき, 乾隆帝=けんりゅう てい, 両広総督=りょうこう そうとく, 黎朝=れい ちょう, 鄭氏=てい し, 西山=せいざん, 北平王=ほくへい おう, 富春=ふしゅん, 昇龍=しょうりゅう, 三畳=さんじょう, 乂安=がいあん, 光中=こうちゅう, 光中帝=こうちゅう てい, 戊申=ぼしん, 十一月二十五日=じゅういちがつ にじゅうごにち, 二十九万=にじゅうきゅう まん, 十万=じゅうまん, 数百頭=すうひゃく とう, 皇黎一統志=こうれい いっとうし, 呉家=ご け, 夫子=ふうし, 我が軍=わが ぐん, 我が国=わが くに, 一戦=いっせん, 玉座=ぎょくざ, 政=まつりごと, 早馬=はやうま, 名分=めいぶん, 閲兵=えっぺい, 雄たけび=おたけび, 行く手=ゆくて, 陣営=じんえい, 要害=ようがい, 布石=ふせき, 奢らせて=おごらせて, 禁じ手=きんじて, 山野=さんや, 軍馬=ぐんば, 谷という谷=たに という たに, 居並ぶ=いならぶ, 明け渡して=あけわたして, 一国=いっこく, 十日=とおか, 数日=すうじつ, 数日後=すうじつ ご, 三兄弟=さん きょうだい, 次男=じなん, 渦中=かちゅう, 大軍=たいぐん, 動乱=どうらん, 文臣=ぶんしん, 文人=ぶんじん, 名高い=なだかい, 眉=まゆ, 顧みられ=かえりみられ, 天下=てんか, 祭壇=さいだん, 即位=そくい, 年号=ねんごう, 陛下=へいか, 穂先=ほさき, 日差し=ひざし, 上り=のぼり, 十八世紀=じゅうはっ せいき, 英雄=えいゆう, 清=しん, 民=たみ, 罰=ばつ, 土を=つち を, 戦の=いくさ の, この戦=この いくさ, 間には=あいだ には. Đã đọc lại toàn bộ.
- Từ vựng: 19 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-hoangle-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (46 câu)
  - フエ: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -4 (2 câu)
  - 光中: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -4 (4 câu)
  - ニャム: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 1 (3 câu)
  - 将軍: `ja-JP-Neural2-C`, tốc độ 1, cao độ -1 (3 câu)
  - ティエップ: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -7 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho B1.

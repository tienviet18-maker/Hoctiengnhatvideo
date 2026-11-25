# QC — furusato-vn-banhchung-1

- Nguồn: Truyền thuyết Việt Nam 「Sự tích bánh chưng bánh giầy」 (Lang Liêu, đời Hùng Vương thứ sáu), chép trong 嶺南摭怪 (Lĩnh Nam chích quái, thế kỷ 15, public domain) và truyền khẩu. Claude tự kể lại bằng tiếng Nhật. Phần so sánh: 鏡もち và 鏡開き trong Tết Nhật.
- Chuẩn v2, cấp N3: 1546 ký tự, 63 câu, câu TB 24.5 ký tự, harder 6.7%, atLevel 22.4%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, お正月=おしょうがつ, 四角い=しかくい, 四角く=しかくく, 食べ物=たべもの, もち米=もちごめ, 王さま=おうさま, 二十人=にじゅうにん, 王子=おうじ, 王=おう, 先祖=せんぞ, 国=くに, 鳥=とり, 肉=にく, 海=うみ, 魚=さかな, 十八番目=じゅうはちばんめ, 畑=はたけ, 毎晩=まいばん, 神さま=かみさま, この世=このよ, 米=こめ, 命=いのち, 宝=たから, 天=てん, 地=ち, 形=かたち, 緑豆=りょくとう, ぶた肉=ぶたにく, 葉っぱ=はっぱ, 豆=まめ, 一晩中=ひとばんじゅう, 地面=じめん, 空=そら, 丸い=まるい, 一つずつ=ひとつずつ, 心=こころ, 家族=かぞく, 夜=よる, 火=ひ, 鏡もち=かがみもち, 年神さま=としがみさま, 鏡開き=かがみびらき, 大事=だいじ, 主役=しゅやく, 友だち=ともだち, 思い出=おもいで, 二つ=ふたつ, 一つ=ひとつ, 大地=だいち, 特別=とくべつ, 自分=じぶん, 生活=せいかつ, 水=みず, 台所=だいどころ, 消えて=きえて, 手伝います=てつだいます, 子どもたち=こどもたち. Đã đọc lại toàn bộ.
- Từ vựng: 3 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-banhchung-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (48 câu)
  - 王さま: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -6 (5 câu)
  - ランリュー: `ja-JP-Neural2-C`, tốc độ 0.98, cao độ 2 (5 câu)
  - 神さま: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ -4 (3 câu)
  - 王子: `ja-JP-Neural2-C`, tốc độ 1.02, cao độ -2 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Murecho.

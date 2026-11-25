# QC — furusato-vn-taoquan-1

- Nguồn: Truyền thuyết dân gian Việt Nam 「Sự tích Táo Quân」 (Trọng Cao, Thị Nhi, Phạm Lang; tục tiễn ông Táo cưỡi cá chép về trời ngày 23 tháng Chạp), truyền khẩu, public domain. Claude tự kể lại bằng tiếng Nhật. Phần so sánh: 荒神さま (thần bếp Nhật), truyền thuyết cá chép vượt thác hóa rồng (登竜門, 後漢書) và こいのぼり.
- Chuẩn v2, cấp N3: 1578 ký tự, 53 câu, câu TB 29.8 ký tự, harder 11.1%, atLevel 28.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, お正月=おしょうがつ, 一週間=いっしゅうかん, 台所=だいどころ, 神さま=かみさま, 空=そら, 旧暦=きゅうれき, 十二月二十三日=じゅうにがつにじゅうさんにち, 人々=ひとびと, 生きた=いきた, 川=かわ, 池=いけ, 放します=はなします, 放して=はなして, 天=てん, 王さま=おうさま, 信じられて=しんじられて, 村=むら, 男=おとこ, 女=おんな, 夫婦=ふうふ, 大げんか=おおげんか, 手を上げて=てをあげて, 遠く=とおく, 結婚=けっこん, 生活=せいかつ, 一方=いっぽう, 自分=じぶん, 後悔=こうかい, 畑=はたけ, 旅=たび, 何年=なんねん, 物ごい=ものごい, 一軒=いっけん, 食べ物=たべもの, 夫=おっと, 足音=あしおと, 灰=はい, 火=ひ, 妻=つま, 三人=さんにん, 命=いのち, 心=こころ, 一年じゅう=いちねんじゅう, 家族=かぞく, 一度=いちど, 用意=ようい, 荒神さま=こうじんさま, 滝=たき, 竜=りゅう, 中国=ちゅうごく, 五月=ごがつ, 成長=せいちょう, 願います=ねがいます, 特別=とくべつ, 一人の=ひとりの. Đã đọc lại toàn bộ.
- Từ vựng: 7 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-taoquan-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (46 câu)
  - ティーニー: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 1 (4 câu)
  - チョンカオ: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -3 (1 câu)
  - 天の王さま: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -7 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kaisei Opti.

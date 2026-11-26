# QC — furusato-vn-vongphu-1

- Nguồn: Truyền thuyết dân gian Việt Nam (phạm vi công cộng), theo dị bản Tô Thị ở Lạng Sơn: hai anh em mồ côi, anh lỡ tay đánh em ngất rồi bỏ trốn, nhiều năm sau lấy nhau, nhận ra vết sẹo trên đầu vợ, chồng đi lính không về, vợ bế con đứng chờ trên núi rồi hóa đá. Claude tự kể lại bằng tiếng Nhật N3; câu kết so sánh với truyền thuyết Matsura Sayohime (Saga, Nhật Bản).
- Chuẩn v2, cấp N3: 1334 ký tự, 43 câu, câu TB 31.0 ký tự, harder 4.4%, atLevel 19.4%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 兄妹=きょうだい, 二人きり=ふたりきり, 言い争い=いいあらそい, 傷あと=きずあと, 年月=としつき, 転々=てんてん, 行方=ゆくえ, 夫婦=ふうふ, 真っ青=まっさお, 兵士=へいし, 戦場=せんじょう, 二度と=にどと, 一歩=いっぽ, 詠まれ=よまれ, 語り継がれて=かたりつがれて, 佐賀県=さがけん, 佐用姫=さよひめ, 中国=ちゅうごく. Đã đọc lại toàn bộ.
- Từ vựng: 21 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-vongphu-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.88 (38 câu)
  - ヴァン: `ja-JP-Neural2-C`, tốc độ 1 (3 câu)
  - ティ: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Yusei Magic.

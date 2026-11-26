# QC — furusato-vn-oc-1

- Nguồn: Truyện cổ tích Việt Nam 「Nàng tiên Ốc」 (bà lão nghèo nuôi con ốc vàng trong chum, nàng tiên chui ra làm việc nhà, bà đập vỡ vỏ ốc để nàng ở lại làm con), truyền khẩu, public domain. Claude tự kể lại bằng tiếng Nhật. Phần so sánh: 『鶴の恩返し』 và 『田螺長者』 (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1559 ký tự, 60 câu, câu TB 26.0 ký tự, harder 4.9%, atLevel 17.8%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 小さな=ちいさな, 村=むら, 家族=かぞく, 毎日=まいにち, 田んぼ=たんぼ, 魚=さかな, 売って=うって, 日=ひ, 貝=かい, 見つけました=みつけました, 金色=きんいろ, 光る=ひかる, 食べる=たべる, 家=いえ, 持って=もって, 帰って=かえって, 水がめ=みずがめ, 中=なか, 入れました=いれました, 次=つぎ, 行きました=いきました, 夕方=ゆうがた, 帰る=かえる, 上=うえ, 聞きました=ききました, 知りません=しりません, 同じ=おなじ, 起きました=おきました, 草=くさ, 服=ふく, 明日=あした, 見て=みて, 朝=あさ, 行く=いく, 出ました=でました, 何か=なにか, 出て=でて, 開いて=ひらいて, 女=おんな, 人=ひと, 台所=だいどころ, 作り=つくり, 始めました=はじめました, 子=こ, 助けて=たすけて, 静か=しずか, 近づきました=ちかづきました, 手=て, 取りました=とりました, 音=おと, 取って=とって, 言いました=いいました, 娘=むすめ, 目=め, 本当=ほんとう, 親子=おやこ, 仙女=せんにょ, 子ども=こども, 話=はなし, 返って=かえって, 似た=にた, 昔話=むかしばなし, 鶴=つる, 恩返し=おんがえし, 来ます=きます, 織る=おる, 言います=いいます, 空=そら, 来ます。=きます。, 若者=わかもの, 長者=ちょうじゃ, 思い出して=おもいだして, 鶴の恩返し=つるのおんがえし, 見た=みた, 見ない=みない, 作って=つくって. Đã đọc lại toàn bộ.
- Từ vựng: 8 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-oc-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (50 câu)
  - おばあさん: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -4 (8 câu)
  - 女の人: `ja-JP-Neural2-B`, tốc độ 0.97, cao độ 3 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Kaku Gothic Antique.

# Danh sách từ JLPT dùng để chấm cấp độ

- `jlpt-vocab.json`: bảng tra `từ → cấp` (5 = N5 … 1 = N1) và `kana:<cách đọc> → cấp`. Khi một từ có
  ở nhiều cấp, lấy cấp dễ nhất.
- Nguồn: [open-anki-jlpt-decks](https://github.com/jamsinclair/open-anki-jlpt-decks) (giấy phép MIT,
  file `LICENSE-open-anki-jlpt-decks.txt`), dữ liệu gốc từ danh sách của Jonathan Waller (tanos.co.uk).
- Sinh lại: tải 5 file `src/n1.csv … n5.csv` của repo trên vào một thư mục rồi chạy
  `node scripts/lib/build-jlpt-vocab.mjs` trong thư mục đó.
- JLPT không công bố danh sách từ chính thức từ 2010; đây là danh sách tham chiếu phổ biến nhất,
  dùng để chấm thống nhất, không phải chân lý tuyệt đối.

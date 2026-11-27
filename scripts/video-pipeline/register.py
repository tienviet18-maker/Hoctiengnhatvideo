#!/usr/bin/env python3
"""Đăng ký vào src/lib/content.ts mọi gói content/videos/*.json chưa được import (chạy lại bao nhiêu lần cũng được).
Dùng sau khi gộp main nếu content.ts bị xung đột: giữ bản của main rồi chạy lại script này."""
import os, re
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
p = os.path.join(ROOT, "src/lib/content.ts"); s = open(p, encoding="utf-8").read()
have = set(re.findall(r'from "\.\./\.\./content/videos/([^"]+)\.json"', s))
ids = sorted(f[:-5] for f in os.listdir(os.path.join(ROOT, "content/videos")) if f.endswith(".json") and f[:-5] not in have)
if ids:
    n = max(int(x) for x in re.findall(r"import video(\d+) from", s))
    last_imp = re.search(rf'import video{n} from "[^"]+";\n', s).group(0)
    last_arr = f"  video{n} as unknown as VideoContent,\n"
    assert last_arr in s, "array entry for last video not found"
    s = s.replace(last_imp, last_imp + "".join(f'import video{n+1+k} from "../../content/videos/{i}.json";\n' for k, i in enumerate(ids)), 1)
    s = s.replace(last_arr, last_arr + "".join(f"  video{n+1+k} as unknown as VideoContent,\n" for k in range(len(ids))), 1)
    open(p, "w", encoding="utf-8").write(s)
print(f"registered {len(ids)} new video pack(s)")

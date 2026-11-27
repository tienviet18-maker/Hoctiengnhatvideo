#!/usr/bin/env python3
"""Đổi raw/<id>.json đã cắt clip sang trọn tập; gộp bản dịch cũ (nếu có) vào clip 0. In ra các dòng còn thiếu bản dịch."""
import json, os, sys
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raw")
for vid in sys.argv[1:]:
    p = os.path.join(R, f"{vid}.json"); d = json.load(open(p, encoding="utf-8"))
    d["clips"] = [list(range(len(d["lines"])))]; d["episode"] = True
    json.dump(d, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    ap = os.path.join(R, f"{vid}.ann.json")
    if os.path.exists(ap):
        a = json.load(open(ap, encoding="utf-8"))
        if set(a["clips"]) != {"0"} or a.get("episode") is not True:
            lines = {l["i"]: l for c in a["clips"].values() for l in c["lines"]}
            first = a["clips"]["0"]
            a["clips"] = {"0": {"titles": first["titles"], "lines": [lines[i] for i in sorted(lines)]}}; a["episode"] = True
            json.dump(a, open(ap, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        have = {l["i"] for l in a["clips"]["0"]["lines"]}
    else:
        have = set()
    miss = [i for i in range(len(d["lines"])) if i not in have]
    print(f"{vid}: {len(d['lines'])} lines, {len(miss)} need annotation")

#!/usr/bin/env python3
"""Bước 3 dây chuyền video: ghép gói chuẩn v2 từ work/<id>.json + work/<id>.ann.json.

    python3 scripts/video-pipeline/build.py <youtubeId> [--dry-run]

- Bỏ câu annotate đánh dấu keep=false, bỏ câu trùng y nguyên gói khác (> 6 ký tự).
- Sau khi bỏ, kiểm lại luật clip (45–240s, khoảng trống ≤ 8s): tự tách/bỏ clip không đạt.
- Furigana + romaji bằng kuromoji (furi.mjs); cấp từ vựng theo data/jlpt (từ dưới cấp clip hoặc không có trong danh sách bị bỏ).
- Ghi content/videos/<id>.json, <id>.qc.md, public/teasers/<id>.ass, đăng ký vào src/lib/content.ts.
Kênh (series) phải có sẵn trong src/lib/series.ts và nhãn 11 ngôn ngữ (thêm tay một lần cho mỗi kênh mới).
"""
import argparse, json, os, re, subprocess, sys, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
WORK = os.path.join(HERE, "work")
LANGS = ["vi", "en", "zh-Hans", "zh-Hant", "ko", "tl", "ne", "id", "pt", "my", "th"]
LV = {5: "N5", 4: "N4", 3: "N3", 2: "N2", 1: "N1"}; LNUM = {v: k for k, v in LV.items()}
KANJI = re.compile(r"[一-鿿㐀-䶿]")
J = json.load(open(os.path.join(ROOT, "data/jlpt/jlpt-vocab.json"), encoding="utf-8"))
k2h = lambda s: "".join(chr(ord(c) - 0x60) if "ァ" <= c <= "ヶ" else c for c in s)
ROMAJI_FIX = [("teimasu", "te imasu"), ("teiru", "te iru"), ("deari", "de ari"), ("dearu", "de aru"), ("niyo", "ni yo"),
              ("nitai", "ni tai"), ("tsugini", "tsugi ni"), ("mōichido", "mō ichido"), ("sure ba", "sureba"), ("are ba", "areba"),
              ("shimashou", "shimashō"), ("deshou", "deshō"), ("o kaimono", "okaimono")]


def existing_sentences():
    seen = {}
    for kind in ("stories", "videos"):
        dd = os.path.join(ROOT, "content", kind)
        for f in os.listdir(dd):
            if f.endswith(".json"):
                d = json.load(open(os.path.join(dd, f), encoding="utf-8"))
                for s in d.get("sentences") or d.get("lines") or []:
                    if len(s["ja"]) > 6: seen.setdefault(s["ja"], d["id"])
    return seen


def furigana(sents):
    os.makedirs(WORK, exist_ok=True); tmp = os.path.join(WORK, "_sents.json")
    json.dump(sents, open(tmp, "w", encoding="utf-8"), ensure_ascii=False)
    r = subprocess.run(["node", os.path.join(HERE, "furi.mjs"), ROOT, tmp], capture_output=True, text=True)
    if r.returncode: sys.exit(r.stderr[-500:])
    return json.loads(r.stdout)


def romaji(r):
    for a, b in ROMAJI_FIX: r = r.replace(a, b)
    return r.replace("ou", "ō")


def slug(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return "-".join(s.split("-")[:4]) or "clip"


def split_rules(lines):
    """Split a list of kept lines into runs that satisfy the clip rules."""
    runs, cur = [], []
    for l in lines:
        if cur and (l["start"] - cur[-1]["end"] > 8.0 or l["end"] - cur[0]["start"] > 240):
            runs.append(cur); cur = []
        cur.append(l)
    if cur: runs.append(cur)
    return [r for r in runs if r[-1]["end"] - r[0]["start"] >= 45]


def teaser(lines):
    best = None
    for i in range(len(lines)):
        for j in range(i, len(lines)):
            span = lines[j]["end"] - lines[i]["start"]
            if span > 45: break
            if span >= 30 and (best is None or span > best[2]): best = (i, j, span)
    if best is None:
        j = 0
        while j + 1 < len(lines) and lines[j + 1]["end"] - lines[0]["start"] <= 45: j += 1
        best = (0, j, lines[j]["end"] - lines[0]["start"])
    return best[0], best[1]


def write_ass(pid, lines, i, j):
    hdr = open(os.path.join(ROOT, "public/teasers/yuta-kore-are.ass"), encoding="utf-8").read().split("[Events]")[0]
    t0, t1 = lines[i]["start"], lines[j]["end"]
    ts = lambda x: f"{int(x // 3600)}:{int(x % 3600 // 60):02d}:{x % 60:05.2f}"
    ev = []
    for l in lines[i:j + 1]:
        a, b = ts(l["start"] - t0), ts(l["end"] - t0)
        ev += [f"Dialogue: 0,{a},{b},JP,,0,0,0,,{l['ja']}", f"Dialogue: 1,{a},{b},VI,,0,0,0,,{l['translations']['vi']}"]
    hdr = re.sub(r"Title: .*", f"Title: Teaser {t0}-{t1} of {pid}", hdr)
    open(os.path.join(ROOT, f"public/teasers/{pid}.ass"), "w", encoding="utf-8").write(
        hdr + "[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n" + "\n".join(ev) + "\n")
    return t0, t1


def register(ids):
    p = os.path.join(ROOT, "src/lib/content.ts"); s = open(p, encoding="utf-8").read()
    n = max(int(x) for x in re.findall(r"import video(\d+) from", s))
    last_imp = re.search(rf'import video{n} from "[^"]+";\n', s).group(0)
    last_arr = f"  video{n} as unknown as VideoContent,\n"
    assert last_arr in s
    s = s.replace(last_imp, last_imp + "".join(f'import video{n + 1 + k} from "../../content/videos/{i}.json";\n' for k, i in enumerate(ids)), 1)
    s = s.replace(last_arr, last_arr + "".join(f"  video{n + 1 + k} as unknown as VideoContent,\n" for k in range(len(ids))), 1)
    open(p, "w", encoding="utf-8").write(s)


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("vid"); ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    jp = os.path.join(WORK, f"{a.vid}.json")
    d = json.load(open(jp if os.path.exists(jp) else os.path.join(HERE, "raw", f"{a.vid}.json"), encoding="utf-8"))
    src = WORK if os.path.exists(os.path.join(WORK, f"{a.vid}.ann.json")) else os.path.join(HERE, "raw")
    ann = json.load(open(os.path.join(src, f"{a.vid}.ann.json"), encoding="utf-8"))
    series = d["series"]
    if f'key: "{series}"' not in open(os.path.join(ROOT, "src/lib/series.ts"), encoding="utf-8").read():
        sys.exit(f"series '{series}' missing in src/lib/series.ts (+ locales) — add it first")
    seen = existing_sentences(); level = d["level"]; built = []
    for ci, idxs in enumerate(d["clips"]):
        c = ann["clips"].get(str(ci))
        if not c: continue
        by_i = {l["i"]: l for l in c["lines"]}
        kept, dropped = [], []
        for i in idxs:
            al = by_i.get(i)
            if not al or not al.get("keep") or not al.get("ja", "").strip():
                dropped.append((i, "keep=false")); continue
            ja = al["ja"].strip()
            if len(ja) > 6 and ja in seen:
                dropped.append((i, f"dup {seen[ja]}")); continue
            kept.append(dict(start=d["lines"][i]["start"], end=d["lines"][i]["end"], ja=ja,
                             translations={x: al["translations"][x].strip() for x in LANGS},
                             grammarNote={x: al["grammarNote"][x].strip() for x in LANGS}, _vocab=al.get("vocab", []),
                             _readings=al.get("readings", [])))
        for run in split_rules(kept):
            F = furigana([l["ja"] for l in run])
            lines = []
            for l, f in zip(run, F):
                voc = []
                for v in l.pop("_vocab"):
                    w, r = v.get("word", ""), k2h(v.get("reading", ""))
                    lv = J.get(w) or J.get("kana:" + r)
                    hit = any(s and (KANJI.search(s) or len(s) >= 2) and s in l["ja"] for s in (w, w[:-1]))
                    if lv and lv <= LNUM[level] and hit and all(str(v["meanings"].get(x, "")).strip() for x in LANGS):
                        voc.append(dict(word=w, reading=r, meanings={x: v["meanings"][x].strip() for x in LANGS}, level=LV[lv]))
                # Gemini's contextual readings override kuromoji when the kanji core matches exactly.
                rd = {x.get("surface", ""): k2h(x.get("reading", "")) for x in l.pop("_readings")}
                for g in f["furigana"]:
                    if not KANJI.search(g["surface"]): continue
                    for surf, r in rd.items():
                        if surf == g["surface"] and r:
                            g["reading"] = r
                        elif surf.startswith(g["surface"]) and r and len(surf) > len(g["surface"]):
                            tail = surf[len(g["surface"]):]  # okurigana: 引き -> 引(ひ)き
                            if not KANJI.search(tail) and r.endswith(k2h(tail)): g["reading"] = r[: len(r) - len(tail)]
                    if not g["reading"]: g["reading"] = "?"
                lines.append(dict(start=l["start"], end=l["end"], ja=l["ja"], furigana=f["furigana"], romaji=romaji(f["romaji"]),
                                  translations=l["translations"], grammarNote=l["grammarNote"], vocab=voc))
            if any(g["reading"] == "?" for l in lines for g in l["furigana"]):
                print("  skip run: kanji without reading"); continue
            base = f"{series}-{slug(c['titles']['en'].split(':')[-1])}"
            pid, k = base, 2
            while os.path.exists(os.path.join(ROOT, f"content/videos/{pid}.json")) or pid in [b[0] for b in built]:
                pid = f"{base}-{k}"; k += 1
            ti, tj = teaser(lines)
            pack = dict(kind="video", id=pid, youtubeId=a.vid, titles={x: c["titles"][x].strip() for x in LANGS}, level=level,
                        category=d["category"], durationSec=d["meta"]["duration"], lines=lines,
                        teaser=dict(start=lines[ti]["start"], end=lines[tj]["end"], assPath=f"/teasers/{pid}.ass"), free=False, standard=2)
            span = lines[-1]["end"] - lines[0]["start"]
            built.append((pid, len(lines), span, sum(len(l["vocab"]) for l in lines)))
            if a.dry_run: continue
            json.dump(pack, open(os.path.join(ROOT, f"content/videos/{pid}.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
            write_ass(pid, lines, ti, tj)
            for l in lines:
                if len(l["ja"]) > 6: seen.setdefault(l["ja"], pid)
            open(os.path.join(ROOT, f"content/videos/{pid}.qc.md"), "w", encoding="utf-8").write(
                f"# QC — {pid}\n\n"
                f"- **Nguồn**: kênh 「{d['meta']['channel']}」, video 「{d['meta']['title']}」 (youtubeId `{a.vid}`, {d['meta']['duration']} giây). "
                f"Kiểm tự động khi làm gói: cho nhúng, công khai, chạy từ IP ở Nhật.\n"
                f"- **Clip**: {lines[0]['start']}–{lines[-1]['end']} ({span:.0f} giây, {len(lines)} dòng).\n"
                f"- **Dây chuyền**: `scripts/video-pipeline` — Whisper (âm thanh tải tạm, đã xoá) + phụ đề tự động YouTube; "
                f"Gemini sửa chính tả/dấu câu theo 2 bản nghe, bỏ câu không chắc ({len(dropped)} câu bị bỏ trong đoạn), dịch + giải thích 11 ngôn ngữ; "
                f"furigana kuromoji; cấp từ vựng theo `data/jlpt/`. Claude duyệt mẫu tiếng Việt/Anh theo lô.\n"
                f"- **Mốc thời gian**: theo Whisper.\n- **Cấp độ**: {level}.\n")
    if built and not a.dry_run:
        subprocess.run([sys.executable, os.path.join(HERE, "register.py")], check=True)
    for b in built: print(f"  {b[0]}: {b[1]} lines, {b[2]:.0f}s, vocab {b[3]}")
    print(f"{a.vid}: built {len(built)} pack(s){' (dry run)' if a.dry_run else ''}")


if __name__ == "__main__":
    main()

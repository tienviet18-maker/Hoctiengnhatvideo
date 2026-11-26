#!/usr/bin/env python3
"""Bước 1 dây chuyền video: YouTube -> lời thoại đã căn mốc -> các clip đạt luật chuẩn v2.

Chạy trên máy có IP được YouTube cho tải phụ đề (iMac), bằng Python của môi trường Whisper:
    ~/ytsub-test/whisper-env/bin/python scripts/video-pipeline/prepare.py <youtubeId> --series peppa --level N4 --category anime

- Kiểm video: cho nhúng, công khai (xem được tại Nhật vì máy chạy ở Nhật).
- Lời thoại: Whisper (âm thanh tải TẠM, xoá ngay sau khi chạy) + phụ đề tự động YouTube `ja-orig` cùng khung giờ.
  Mỗi dòng giữ cả hai bản; bước annotate quyết định giữ / sửa / bỏ (câu không chắc thì bỏ, không đoán).
- Cắt clip: 45–240 giây, không khoảng trống > 8 giây, dòng ≤ 12 giây (docs/content-standard.md mục 3).
Kết quả: scripts/video-pipeline/work/<id>.json (không commit; thư mục work/ bị .gitignore).
"""
import argparse, difflib, json, os, re, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
WORK = os.path.join(HERE, "work")
YTDLP = os.path.expanduser(os.environ.get("YTDLP", "~/ytsub-test/yt-dlp"))
CLIP_MIN, CLIP_MAX, CLIP_TARGET, MAX_GAP, MAX_LINE = 45, 240, 75, 8.0, 12.0
PUN = re.compile(r"[、。？！?!「」『』（）()…・,.\s　ー〜~]")
norm = lambda s: PUN.sub("", s)


def ytdlp(args):
    return subprocess.run([YTDLP, "--js-runtimes", "node", *args], capture_output=True, text=True)


def probe(vid):
    r = ytdlp(["--skip-download", "--print", "%(title)s\t%(channel)s\t%(duration)s\t%(playable_in_embed)s\t%(availability)s", "--", vid])
    if r.returncode != 0:
        sys.exit(f"probe failed: {r.stderr.strip()[-300:]}")
    t, ch, dur, emb, av = r.stdout.strip().split("\n")[-1].split("\t")
    return dict(title=t, channel=ch, duration=int(float(dur)), embeddable=emb == "True", availability=av)


def asr_events(vid, tmp):
    ytdlp(["--skip-download", "--write-auto-subs", "--sub-langs", "ja-orig", "--sub-format", "json3", "-o", os.path.join(tmp, "%(id)s"), "--", vid])
    p = os.path.join(tmp, f"{vid}.ja-orig.json3")
    if not os.path.exists(p):
        return []
    ev = []
    for e in json.load(open(p, encoding="utf-8")).get("events", []):
        t = re.sub(r"\[[^\]]*\]", "", "".join(s.get("utf8", "") for s in e.get("segs") or [])).replace("\n", "").strip()
        if t:
            ev.append((e["tStartMs"] / 1000, (e["tStartMs"] + e.get("dDurationMs", 0)) / 1000, t))
    return ev


def whisper_segments(vid, tmp, music=False):
    from faster_whisper import WhisperModel
    r = ytdlp(["-q", "-f", "140/bestaudio[ext=m4a]/bestaudio", "-o", os.path.join(tmp, "%(id)s.%(ext)s"), "--", vid])
    found = [f for f in os.listdir(tmp) if f.startswith(vid + ".") and not f.endswith(".json3")]
    audio = os.path.join(tmp, found[0]) if found else os.path.join(tmp, f"{vid}.m4a")
    if not os.path.exists(audio):
        sys.exit(f"audio download failed: {r.stderr.strip()[-300:]}")
    try:
        m = WhisperModel(os.environ.get("WHISPER_MODEL", "small"), device="cpu", compute_type="int8")
        segs, _ = m.transcribe(audio, language="ja", word_timestamps=True, condition_on_previous_text=False, vad_filter=True,
                                  # anime: background music fools the default VAD (it dropped almost all speech)
                                  vad_parameters=dict(threshold=0.2, min_silence_duration_ms=1500) if music else None)
        out = []
        for s in segs:
            words = [(w.start, w.end, w.word) for w in (s.words or [])]
            out.append(dict(start=round(s.start, 2), end=round(s.end, 2), text=s.text.strip(), words=words))
        return out
    finally:
        os.remove(audio)  # never keep a copy of the audio


def split_long(seg):
    """Split a Whisper segment longer than MAX_LINE at word boundaries near punctuation."""
    if seg["end"] - seg["start"] <= MAX_LINE or not seg["words"]:
        return [seg]
    parts, cur = [], []
    for w in seg["words"]:
        cur.append(w)
        if cur[-1][1] - cur[0][0] >= MAX_LINE * 0.75 and re.search(r"[、。？！?!]$", w[2].strip()):
            parts.append(cur); cur = []
    if cur:
        parts.append(cur)
    out = []
    for p in parts:
        out.append(dict(start=round(p[0][0], 2), end=round(p[-1][1], 2), text="".join(x[2] for x in p).strip(), words=p))
    return out


def asr_window(line, asr):
    return "".join(t for s, e, t in asr if e >= line["start"] - 1.5 and s <= line["end"] + 1.5)


def agreement(line, asr):
    a, b = norm(line["text"]), norm(asr_window(line, asr))
    if not a:
        return 0.0
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    return sum(blk.size for blk in sm.get_matching_blocks()) / len(a)


def cut(lines):
    clips, cur = [], []
    def close():
        if cur and cur[-1]["end"] - cur[0]["start"] >= CLIP_MIN:
            clips.append(list(cur))
    for l in lines:
        if l["end"] - l["start"] > MAX_LINE:
            close(); cur.clear(); continue
        if cur and (l["start"] - cur[-1]["end"] > MAX_GAP or l["end"] - cur[0]["start"] > CLIP_MAX):
            close(); cur.clear()
        cur.append(l)
        span = cur[-1]["end"] - cur[0]["start"]
        if (span >= CLIP_TARGET and re.search(r"[。？！?!]$", l["text"])) or span >= CLIP_TARGET * 1.3:
            close(); cur.clear()
    close()
    return clips


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("vid"); ap.add_argument("--series", required=True); ap.add_argument("--level", required=True)
    ap.add_argument("--category", default="podcast"); ap.add_argument("--min-agree", type=float, default=0.6)
    a = ap.parse_args()
    meta = probe(a.vid)
    if not meta["embeddable"] or meta["availability"] != "public":
        sys.exit(f"REJECT {a.vid}: embeddable={meta['embeddable']} availability={meta['availability']}")
    with tempfile.TemporaryDirectory() as tmp:
        asr = asr_events(a.vid, tmp)
        segs = whisper_segments(a.vid, tmp, music=a.category == "anime")
    lines = [x for s in segs for x in split_long(s)]
    for l in lines:
        l["agree"] = round(agreement(l, asr), 2) if asr else None
        l["asr"] = asr_window(l, asr) if asr else ""
        l["uncertain"] = bool(asr) and l["agree"] < a.min_agree  # decided later by annotate (keep / fix / drop)
        l.pop("words", None)
    clips = cut(lines)
    os.makedirs(WORK, exist_ok=True)
    out = dict(youtubeId=a.vid, series=a.series, level=a.level, category=a.category, meta=meta, has_asr=bool(asr),
               lines=lines, clips=[[lines.index(l) for l in c] for c in clips])
    json.dump(out, open(os.path.join(WORK, f"{a.vid}.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    unc = sum(l["uncertain"] for l in lines)
    print(f"{a.vid} '{meta['title'][:40]}' {meta['duration']}s lines={len(lines)} uncertain={unc} clips={len(clips)} "
          + " ".join(f"[{c[0]['start']:.0f}-{c[-1]['end']:.0f}s {len(c)}l]" for c in clips))


if __name__ == "__main__":
    main()

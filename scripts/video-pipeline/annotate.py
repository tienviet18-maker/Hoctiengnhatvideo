#!/usr/bin/env python3
"""Bước 2 dây chuyền video: Gemini soạn lớp học cho từng clip (chuẩn v2, 11 ngôn ngữ).

    python3 scripts/video-pipeline/annotate.py <youtubeId> [--model gemini-3.6-flash]

Key: biến môi trường GEMINI_API_KEY, hoặc file ~/ytsub-test/.gemini_key (chmod 600). Không bao giờ ghi key vào repo.
Đầu vào: work/<id>.json (từ prepare.py). Đầu ra: work/<id>.ann.json.
Với mỗi dòng, mô hình nhận 2 bản nghe (Whisper + phụ đề tự động) và quyết định:
  keep=false nếu không chắc người nói nói gì (không đoán); keep=true kèm câu tiếng Nhật đã sửa chính tả/dấu câu,
  bản dịch, giải thích (grammarNote) và từ vựng — đủ 11 ngôn ngữ.
"""
import argparse, json, os, sys, time, urllib.request, urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
WORK = os.path.join(HERE, "work")
LANGS = ["vi", "en", "zh-Hans", "zh-Hant", "ko", "tl", "ne", "id", "pt", "my", "th"]
LANG_NAMES = "vi=Vietnamese, en=English, zh-Hans=Simplified Chinese, zh-Hant=Traditional Chinese, ko=Korean, tl=Tagalog/Filipino, ne=Nepali, id=Indonesian, pt=Brazilian Portuguese, my=Burmese, th=Thai"

SYSTEM = f"""You are the content editor of MiraiGo, an app where foreigners LIVING in Japan learn Japanese from real YouTube videos.
For one short clip you receive numbered lines. Each line has two independent transcripts of the same audio:
"w" (Whisper) and "a" (YouTube auto-captions for the same time window, may include neighbouring words or be empty).
Return STRICT JSON:
{{"titles": {{11 langs}}, "lines": [{{"i": <index>, "keep": true|false, "ja": "...", "translations": {{11 langs}},
  "grammarNote": {{11 langs}}, "vocab": [{{"word": "...", "reading": "...", "meanings": {{11 langs}}}}],
  "readings": [{{"surface": "<every kanji word in ja, as written>", "reading": "<hiragana as SPOKEN here>"}}]}}]}}
Languages (keys exactly): {LANG_NAMES}.
Rules:
1. "ja" must be what was actually SAID. Use the two transcripts to fix mishearings, kanji and punctuation (add 、。？！).
   Keep the speaker's words; never add or invent words. Character names: ペッパ, ジョージ, マミーピッグ, ダディピッグ etc.
2. If the two transcripts disagree and you cannot be confident what was said, or the line is babble/noise/song, set keep=false
   (omit other fields). Never guess.
3. translations: natural, faithful, same sentence type (question stays question). Translate from the Japanese directly.
4. grammarNote: 1–2 short sentences per language explaining the key grammar/nuance of THIS line, quoting the Japanese
   pattern in 「」, and when useful how it is used in daily life in Japan. Same content in every language.
5. vocab: 0–3 words a learner at level {{LEVEL}} would need to look up (at that level or harder), that appear in "ja"
   in dictionary or conjugated form. "word" = dictionary form as written in the line, "reading" = hiragana.
6. readings: EVERY word containing kanji in "ja" (each occurrence, in order) with its hiragana reading as actually
   pronounced in this context (e.g. 今日 きょう vs こんにち, 日本 にほん, 何 なに/なん). Every kanji in the app must have furigana.
7. titles: a short lesson title "<Series name>: <topic>" in each language.
Return only JSON."""


def key():
    k = os.environ.get("GEMINI_API_KEY", "").strip()
    if not k:
        p = os.path.expanduser("~/ytsub-test/.gemini_key")
        if os.path.exists(p):
            k = open(p).read().strip()
    if not k:
        sys.exit("No Gemini key: set GEMINI_API_KEY or create ~/ytsub-test/.gemini_key")
    return k


def call(model, apikey, system, user):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
    body = {"system_instruction": {"parts": [{"text": system}]},
            "contents": [{"role": "user", "parts": [{"text": user}]}],
            "generationConfig": {"temperature": 0.2, "responseMimeType": "application/json"}}
    for attempt in range(5):
        req = urllib.request.Request(url, data=json.dumps(body).encode(), method="POST",
                                     headers={"Content-Type": "application/json; charset=utf-8", "x-goog-api-key": apikey})
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                res = json.load(r)
            text = res["candidates"][0]["content"]["parts"][0]["text"]
            usage = res.get("usageMetadata", {})
            return json.loads(text), usage
        except urllib.error.HTTPError as e:
            msg = e.read().decode()[:300]
            if e.code in (429, 500, 503):
                wait = 20 * (attempt + 1); print(f"  HTTP {e.code}, retry in {wait}s"); time.sleep(wait); continue
            sys.exit(f"HTTP {e.code}: {msg}")
        except (KeyError, json.JSONDecodeError) as e:
            print(f"  bad response ({e}), retry"); time.sleep(5)
    sys.exit("Gemini failed after retries")


def validate(ann, idxs):
    probs = []
    for l in ann.get("lines", []):
        if not l.get("keep"):
            continue
        for f in ("translations", "grammarNote"):
            if not all(str(l.get(f, {}).get(x, "")).strip() for x in LANGS):
                probs.append(f"line {l.get('i')}: {f} missing langs")
        for v in l.get("vocab", []):
            if not all(str(v.get("meanings", {}).get(x, "")).strip() for x in LANGS):
                probs.append(f"line {l.get('i')}: vocab {v.get('word')} meanings missing")
    if not all(str(ann.get("titles", {}).get(x, "")).strip() for x in LANGS):
        probs.append("titles missing langs")
    if {l.get("i") for l in ann.get("lines", [])} != set(idxs):
        probs.append("line indices mismatch")
    return probs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("vid"); ap.add_argument("--model", default=os.environ.get("GEMINI_MODEL", "gemini-3.6-flash"))
    ap.add_argument("--sleep", type=float, default=6.0)
    a = ap.parse_args()
    d = json.load(open(os.path.join(WORK, f"{a.vid}.json"), encoding="utf-8"))
    apikey = key()
    out_p = os.path.join(WORK, f"{a.vid}.ann.json")
    out = json.load(open(out_p, encoding="utf-8")) if os.path.exists(out_p) else {"clips": {}, "usage": []}
    for ci, idxs in enumerate(d["clips"]):
        if str(ci) in out["clips"]:
            continue
        payload = [{"i": i, "w": d["lines"][i]["text"], "a": d["lines"][i].get("asr", "")} for i in idxs]
        user = f"Series: {d['series']}. Video title: {d['meta']['title']}. Target level: {d['level']}.\nLines:\n" + json.dumps(payload, ensure_ascii=False)
        for attempt in range(3):
            ann, usage = call(a.model, apikey, SYSTEM.replace("{LEVEL}", d["level"]), user)
            probs = validate(ann, idxs)
            if not probs:
                break
            print(f"  clip {ci}: {probs[:3]} -> retry")
        else:
            print(f"  clip {ci}: SKIPPED after retries"); continue
        out["clips"][str(ci)] = ann; out["usage"].append(usage)
        json.dump(out, open(out_p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        kept = sum(1 for l in ann["lines"] if l.get("keep"))
        print(f"{a.vid} clip {ci}: kept {kept}/{len(idxs)} tokens in={usage.get('promptTokenCount')} out={usage.get('candidatesTokenCount')}")
        time.sleep(a.sleep)


if __name__ == "__main__":
    main()

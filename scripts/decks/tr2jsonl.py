# Đổi bản dịch dạng khối văn bản sang JSONL cho build-decks.
# Khối: dòng "@id", dòng "m ‖ zh-Hans ‖ zh-Hant ‖ ko ‖ tl ‖ ne ‖ id ‖ pt ‖ my ‖ th", dòng "ex ‖ ...", tuỳ chọn "en ‖ ..." / "vi ‖ ..."
import json,sys
L=["zh-Hans","zh-Hant","ko","tl","ne","id","pt","my","th"]
src,dst=sys.argv[1],sys.argv[2]
out=[];cur=None
for n,line in enumerate(open(src,encoding="utf8"),1):
    line=line.strip()
    if not line: continue
    if line.startswith("@"):
        cur={"id":line[1:].strip()};out.append(cur);continue
    k,*parts=[p.strip() for p in line.split("‖")]
    if k in("m","ex"):
        assert len(parts)==9,(n,len(parts),line[:60])
        assert all(parts),(n,line[:60])
        cur[k]=dict(zip(L,parts))
    elif k in("en","vi"):
        cur[k]=parts[0]
    else: raise SystemExit(f"{n}: khoá lạ {k}")
for o in out: assert "m" in o and "ex" in o, o["id"]
with open(dst,"w",encoding="utf8") as f:
    for o in out: f.write(json.dumps(o,ensure_ascii=False)+"\n")
print(len(out),"thẻ")

#!/bin/zsh
# Chạy nền bền bỉ cho gói Gemini miễn phí (hay báo quá tải): mỗi video thử annotate lại tối đa 18 lần, cách 10 phút.
#   nohup scripts/video-pipeline/batch.sh 4 > ~/ytsub-test/batch.log 2>&1 &
set -u
cd "$(dirname "$0")/../.."
N=${1:-4}; PY=~/ytsub-test/whisper-env/bin/python; W=scripts/video-pipeline/work; DONE=$W/done.txt
mkdir -p $W; touch $DONE; count=0
while IFS=$'\t' read -r vid series level category dur title; do
  grep -qx -- "$vid" $DONE && continue
  (( count >= N )) && break
  count=$((count+1))
  echo "== $(date '+%H:%M') $vid [$series $level] ${title:0:40}"
  [ -f $W/$vid.json ] || $PY scripts/video-pipeline/prepare.py "$vid" --series "$series" --level "$level" --category "$category" 2>&1 | grep -v Warning | tail -1
  [ -f $W/$vid.json ] || { echo "  prepare failed"; continue; }
  for t in {1..18}; do
    python3 -u scripts/video-pipeline/annotate.py "$vid" 2>&1 | grep -E "clip|SKIPPED|failed|No Gemini" | tail -3
    python3 - "$vid" <<'PY' && break
import json,sys,os
w="scripts/video-pipeline/work/"+sys.argv[1]
d=json.load(open(w+".json")); a=json.load(open(w+".ann.json")) if os.path.exists(w+".ann.json") else {"clips":{}}
sys.exit(0 if len(a["clips"])>=len(d["clips"]) else 1)
PY
    echo "  $(date '+%H:%M') incomplete, waiting 10 min"; sleep 600
  done
  python3 scripts/video-pipeline/build.py "$vid" && echo "$vid" >> $DONE
done < scripts/video-pipeline/queue.tsv
echo "== $(date '+%H:%M') batch finished"

#!/bin/zsh
# iMac: chạy bước 1 (phụ đề + Whisper + cắt clip) cho N video kế tiếp, chép kết quả vào raw/ để các luồng Claude dịch.
#   nohup scripts/video-pipeline/prepare_batch.sh 40 > ~/ytsub-test/prepare.log 2>&1 &
set -u
cd "$(dirname "$0")/../.."
N=${1:-20}; PY=~/ytsub-test/whisper-env/bin/python; W=scripts/video-pipeline/work; RAW=scripts/video-pipeline/raw
mkdir -p $W $RAW; count=0
while IFS=$'\t' read -r vid series level category dur title; do
  [ -f $RAW/$vid.json ] && continue
  grep -qx -- "$vid" $W/done.txt 2>/dev/null && continue
  (( count >= N )) && break
  count=$((count+1))
  echo "== $(date '+%H:%M') [$count/$N] $vid [$series $level]"
  $PY scripts/video-pipeline/prepare.py "$vid" --series "$series" --level "$level" --category "$category" 2>&1 | grep -v Warning | tail -1
  [ -f $W/$vid.json ] && cp $W/$vid.json $RAW/$vid.json
  sleep 5
done < scripts/video-pipeline/queue.tsv
echo "== $(date '+%H:%M') prepare batch finished: $(ls $RAW | wc -l) raw files"

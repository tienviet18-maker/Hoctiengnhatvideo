#!/bin/zsh
# Chạy dây chuyền cho N video kế tiếp trong queue.tsv (một luồng, tuần tự).
#   scripts/video-pipeline/run.sh 10      # 10 video
# Cần: ~/ytsub-test/yt-dlp, ~/ytsub-test/whisper-env, key Gemini ở ~/ytsub-test/.gemini_key
set -u
cd "$(dirname "$0")/../.."
N=${1:-5}; PY=~/ytsub-test/whisper-env/bin/python; DONE=scripts/video-pipeline/work/done.txt
mkdir -p scripts/video-pipeline/work; touch $DONE
count=0
while IFS=$'\t' read -r vid series level category dur title; do
  grep -qx "$vid" $DONE && continue
  (( count >= N )) && break
  echo "== $vid [$series $level] $title"
  $PY scripts/video-pipeline/prepare.py "$vid" --series "$series" --level "$level" --category "$category" 2>&1 | grep -v Warning | tail -1 \
    && python3 scripts/video-pipeline/annotate.py "$vid" \
    && python3 scripts/video-pipeline/build.py "$vid" \
    && echo "$vid" >> $DONE
  count=$((count+1)); sleep 5
done < scripts/video-pipeline/queue.tsv
node scripts/gen-catalog.mjs >/dev/null && npm run qc 2>&1 | grep -E '✗|Tổng|Chuẩn v2'

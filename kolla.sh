#!/bin/sh
# Kör alla kontroller. Ett kommando före varje push.
#   sh kolla.sh
set -e
KAT=$(dirname "$0")
STATUS=0

for f in kora.html mapillary.html index.html; do
  [ -f "$KAT/$f" ] || continue
  echo "═══ $f ═══"
  node "$KAT/kontrollera.js" "$KAT/$f" || STATUS=1
done

echo
echo "═══ Regressionsprov ═══"
node "$KAT/tester.js" "$KAT/kora.html" || STATUS=1

echo
[ $STATUS -eq 0 ] && echo "ALLT GRÖNT — går att pusha" || echo "NÅGOT ÄR TRASIGT — pusha inte"
exit $STATUS

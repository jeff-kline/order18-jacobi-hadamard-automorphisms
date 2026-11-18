#!/bin/sh
# Run every exact certificate cited in the paper and write each output to OUT.
# Usage: sh code/run-certificates.sh OUT   (from the repository root)
# Environment: NODE (default: node), CXX (default: c++).
set -eu
OUT=${1:?output directory}
NODE=${NODE:-node}
CXX=${CXX:-c++}
ROOT=$(pwd)
mkdir -p "$OUT"
OUT=$(cd "$OUT" && pwd)

run() {  # run NAME DIR COMMAND...
  name=$1; dir=$2; shift 2
  ( cd "$ROOT/code/$dir" && "$@" ) > "$OUT/$name.txt" 2>&1 || {
    echo "FAILED: $name"; cat "$OUT/$name.txt"; exit 1; }
  echo "ran $name"
}

# Theorem 2.2: Gauss-sum grouping, profiles, Fourier supports and means.
run uniform-I families "$NODE" uniform.cjs
run uniform-II families "$NODE" uniform.cjs second
# Theorem 2.2 cross-check in explicit fields of sizes 7^3, 31^3, 43^3.
run family-crosscheck base "$NODE" family-crosscheck.cjs
# Character identities and base quartets for the published matrix.
run recognition recognition "$NODE" verify.cjs
# Theorem 3.1 at Q = 343: representatives, both systems, both orientations.
for s in first second; do for o in forward inverse; do for p in 0123 0132; do
  run "quartets-$s-$o-$p" algebra "$NODE" flip-quartets.cjs "$p" 2 "$s" "$o"
done; done; done
# Proposition 4.2: templates and arrangement classes.
run skeleton-I algebra "$NODE" skeleton.cjs
run skeleton-II-0 families "$NODE" second-skeleton.cjs 0
run skeleton-II-1 families "$NODE" second-skeleton.cjs 1
run placements-I algebra "$NODE" placements.cjs
run placements-II algebra "$NODE" placements.cjs --second
run transporter-II-even algebra "$NODE" placements.cjs --second 1246 1264
# Theorem 5.1(3): origin-marking certificates modulo 37, all odd d.
for f in 0 1; do for p in 0123 0132; do
  run "frame-I-$f-$p" algebra "$NODE" frame.cjs "$f" "$p"
done; done
for o in forward inverse; do for p in 0123 0132; do
  run "frame-II-1-$p-$o" families "$NODE" odd-frames.cjs 1 "$p" "$o"
done; done
# Table 2: histogram modulo 19 for the even arrangements of system II.
run histogram-II families "$NODE" even-frames.cjs
# Lemma 2.1 at Q = 343 for all 768 arrangements, and the base automorphism search.
BIN=$(mktemp -d)
"$CXX" -O2 -std=c++17 -o "$BIN/gram" "$ROOT/code/base/gram.cpp"
"$CXX" -O3 -std=c++17 -o "$BIN/aut" "$ROOT/code/base/aut.cpp"
run gram base "$BIN/gram"
run automorphisms base "$BIN/aut"
echo "all certificates ran; outputs in $OUT"

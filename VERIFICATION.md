# Verification record

## Environment of the pinned run (2026-11-17)

- macOS 26.6.2, x86_64, one core, run under `nice`.
- Node.js v22.11.0, the official binary from nodejs.org, SHA-256 checked
  against its `SHASUMS256.txt`.
- Apple clang 21.0.0, used as `c++ -std=c++17`.
- pdfTeX 3.141592653-2.6-1.40.22 (TeX Live 2021).

The programs need no packages, no network and no precomputed tables. Their
SHA-256 hashes are in [MANIFEST.sha256](MANIFEST.sha256).

## Commands

```sh
make verify NODE=/path/to/node CXX=c++
make paper
```

`make verify` runs [code/run-certificates.sh](code/run-certificates.sh). It
writes 29 outputs to `build/certificates/` and compares each byte for byte
with its pinned copy in [evidence/](evidence/), printing one `MATCH` line per
file. It fails on any mismatch, or if the number of outputs differs. The
total running time is about two and a half minutes, most of it in
`gram.cpp`.

## What each certificate checks

| Paper step | Program and arguments | Pinned output |
|---|---|---|
| Theorem 2.2: grouped Gauss-sum identities, profiles, Fourier supports, subset means | `families/uniform.cjs` and `families/uniform.cjs second` | `uniform-I.txt`, `uniform-II.txt` |
| Theorem 2.2, cross-check: off-peak correlations from cyclotomic numbers in explicit fields of sizes $7^3$, $31^3$, $43^3$ | `base/family-crosscheck.cjs` (uses `families/search.cjs`) | `family-crosscheck.txt` |
| System I in characteristic 7: four autocorrelations sum to $-4$ (18 exact identities); base quartets of the published matrix | `recognition/verify.cjs` | `recognition.txt` |
| Lemma 2.1 at $Q=343$: $HH^{\mathsf T}=NI$ and $H+H^{\mathsf T}=2I$ for all 768 arrangements | `base/gram.cpp` | `gram.txt` |
| Theorem 3.1 at $Q=343$: all exceptional row quartets, for both systems, placements `0123` and `0132`, position 0 reversed or not, both character orientations | `algebra/flip-quartets.cjs P 2 S O` | `quartets-*.txt` (8 files) |
| Proposition 4.2: templates | `algebra/skeleton.cjs`; `families/second-skeleton.cjs 0` and `1` | `skeleton-*.txt` |
| Proposition 4.2: the four classes of 96 arrangements | `algebra/placements.cjs`, `--second` | `placements-I.txt`, `placements-II.txt` |
| No marked equivalence between the two even arrangements of system II | `algebra/placements.cjs --second 1246 1264` | `transporter-II-even.txt` (null witness) |
| Theorem 5.1(3), system I: the origin marking yields no Paley block, all odd $d$ (mod 37) | `algebra/frame.cjs F P`, $F\in\{0,1\}$, $P\in\{$`0123`,`0132`$\}$ | `frame-I-*.txt` |
| Theorem 5.1(3), system II, odd reversal | `families/odd-frames.cjs 1 P O` | `frame-II-*.txt` |
| Table 2: histogram modulo 19 for the even arrangements of system II | `families/even-frames.cjs` | `histogram-II.txt` |
| Remark after Theorem 5.1: exhaustive automorphism search at order 1376 | `base/aut.cpp` | `automorphisms.txt` |

Programs that check a claim for every odd $d$ use the lifting lemma
(Lemma 2.4). They also check every value they use at $d=1$ by summing
matrix entries directly over $\mathbb F_{343}$.

## Paper build

`make paper` runs pdfLaTeX three times with a fixed `SOURCE_DATE_EPOCH` and
fails on any warning, overfull box or undefined reference. The release PDF
`paper/main.pdf` has SHA-256

```text
e9f45cd139ca16f9d57656df383ab6b1d9d92a4a80f64fa5634c71dde2010b9c
```

## Exclusions

The files in `notes/` (in folders named as in the original workspace, so that their relative links resolve) are the source notes from which the paper was
assembled, imported unchanged; their hashes are in `audit/imports.sha256`.
They are kept for provenance. The scripts under `notes/` that are not copied
into `code/` are not part of the release evidence.

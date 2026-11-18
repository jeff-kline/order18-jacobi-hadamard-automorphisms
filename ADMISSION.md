# Admission record

**Current state:** ADMITTED

Current verdict: ADMITTED (2026-11-17)

**Version:** 0.1.0

**Tag:** `v0.1.0` → `edc6913ef375b3ecc00a42e09c407d1b0593f2fd`

**Version DOI:** [`10.5281/zenodo.24329143`](https://doi.org/10.5281/zenodo.24329143) · **Concept DOI:** `10.5281/zenodo.24329142` · **Record:** <https://zenodo.org/records/24329143>

**Standard:** [A Public Standard for This Work](https://jeff-kline.github.io/posts/research-program/index.html)

Admission is a project release decision. It is not peer review, a correctness
certificate, or proof of global novelty.

**Scope set by the author.** On 2026-11-17 the author asked for a release of
the order-18 completed-matrix results, as a sequel to
[order18-jacobi-triples](https://github.com/jeff-kline/order18-jacobi-triples).
The scope covers:

- the automorphism groups;
- the four-row theorem;
- system II, and both systems for $p\equiv7,31\pmod{36}$;
- the class counts;
- the comparisons.

The author approved the repository name
`order18-jacobi-hadamard-automorphisms`, the title, the abstract and the
README introduction. The author authorized a private GitHub repository.
Each further external action needs the author's explicit authorization.

## Principal claim

For $Q=343^d$ with $d$ odd, every automorphism of the completed order-18
Jacobi skew Hadamard matrix of [Kline 2026](https://doi.org/10.5281/zenodo.21783219)
fixes the border. It acts on all eight field copies by one map
$x\mapsto ax^{343^j}$, with $a$ an eighteenth power. These maps form a group
of order $d(Q-1)/18$ (paper Theorems 1.1 and 5.1).

Further results:

- the four-row theorem (Theorem 3.1);
- two systems for every $p\equiv7,31\pmod{36}$ and odd $d$, with at least
  eight inequivalent matrices per order (Theorems 2.2 and 1.2);
- exactly 16 classes on the characteristic-7 tower, for the published
  character, when $3\nmid d$ (Theorem 1.3);
- inequivalence to transposes, Kronecker products, skew doublings and
  sextic-class matrices of the same array (Theorem 1.4).

No new orders are claimed.

## P1 — prior work and credit

| Check | Status | Evidence or residual |
|---|---|---|
| Closest mechanisms and parameter families compared | PASS | `audit/PRIOR-ART.md`: Momihara–Xiang (2-power cyclotomy), Karoui (order 1252, partial automorphism group), Pantangi (critical groups), Kantor and Hall (Paley), the predecessor |
| Obtainable primary sources checked | PARTIAL | Kantor Trans. AMS pp. 19–21 read; Kantor 1969 note read; Momihara–Xiang, Karoui, Pantangi and Orrick read in the relevant parts. Cooper–Milas–Wallis, Yamada, Lehmer, de Launey–Stafford and Ó Catháin: title or abstract only |
| Contribution types distinguished | PASS | README "What is new" and "Not new"; paper §1.4 |
| Novelty bounded to searched corpus | PASS | paper §1.4, README, `audit/PRIOR-ART.md` |
| Inaccessible or unperformed searches visible | PASS | MathSciNet and zbMATH NOT PERFORMED; rate-limited requests logged |
| Fast-follow scan within 7 days of tagging | PASS | scan of 2026-11-17; tag created 2026-11-18 |

**P1 gate:** PARTIAL, residual accepted. The residual is the older sources
read only by title or abstract, listed in `audit/PRIOR-ART.md`. The author
explicitly accepted it on 2026-11-17.

## A1 — claim and artifact consistency

| Check | Status | Evidence or residual |
|---|---|---|
| Principal claim precise and no broader than proof | PASS | proof lane (`audit/LEDGER.md`): no proof defect; the missing "$d$ odd" hypothesis is fixed |
| Scope visible near claim | PASS | Theorems 1.1–1.4 statements; §8 Remarks; README "Evidence and limits" |
| Proof, computation, literature separated | PASS | README evidence table; VERIFICATION.md; paper Table 3 |
| Credit | PASS | citation lane fixes C-M1–C-M5 |
| Public prose | PASS | prose lane fixes P-M1–P-M4 |
| What is new | PASS | README section directly after the introduction, separate from "Earlier work" |
| Claims consistency | PASS | re-audit of the edited text and end-to-end consistency check (`audit/LEDGER.md`, entries of 2026-11-17) |
| Predecessor mirror | PASS | README layout, CITATION.cff, CORRECTIONS.md and this file follow the author's previous release; the sequel links its predecessor |
| Admitted status | PASS | living README opens with the bold admitted status paragraph; the living paper carries the version DOI |
| Adversarial check | PASS | three process-separated lanes; dispositions in `audit/LEDGER.md` |

## R1 — release and stewardship

| Check | Status | Evidence or residual |
|---|---|---|
| Reproduction | PASS | fresh `git archive` extraction of the candidate, no inherited build files: manifest verifies, `make paper` reproduces the recorded PDF hash byte for byte, `make verify` gives 29 MATCH (Node v22.11.0, Apple clang 21). The tagged tree differs from that candidate only in records (P1 acceptance, ledger note, manifest) |
| Artifact integrity | PASS | `MANIFEST.sha256` covers every tracked file; two consecutive paper builds are byte-identical |
| Hygiene | PASS | whole-tree scan for private paths, emails and placeholders; private history squashed before publication; README math rendered by GitHub, every span recognized |
| Stewardship | PASS | `CORRECTIONS.md` |
| Immutable semantic tag | PASS | annotated `v0.1.0` (object `19b662c`) → `edc6913`; tagger is the GitHub noreply identity |
| Public permanent archive with provider byte identity | PASS | the pinned GitHub `zipball/v0.1.0` (downloaded twice, identical) and the Zenodo file are byte-identical: 485,166 bytes, SHA-256 `97d1ecac8bdaaa5257d0e4219d88feddb3be9d7035503517a4209c277a2c122f`; Zenodo MD5 `6ad6e5a768a4590aaf7e463d0474b284`; all 89 files inside pass `MANIFEST.sha256` |
| DOI resolves; living repository identifies the version | PASS | `doi.org/10.5281/zenodo.24329143` redirects to the Zenodo record; README, `CITATION.cff` and the living paper carry the version DOI |
| Archive metadata matches repository | PASS | title, creator Kline, Jeffery, version v0.1.0, publication date 2026-11-18 (UTC), license `gpl-3.0`, resource type software |
| Machine-readable citation | PASS | `CITATION.cff` with version DOI, concept DOI and `date-released: 2026-11-18` (Zenodo's date) |

**R1 gate:** PASS.

**Admission verdict:** ADMITTED (2026-11-17). The accepted P1 residual, the
open cases stated in paper §8 and the residual risks in `audit/LEDGER.md`
remain. No independent human expert has reviewed the proofs.

## Archive verification

- Route: Zenodo GitHub integration; no manual deposit.
- Pinned before the GitHub Release: GitHub API `zipball/v0.1.0`, downloaded
  twice, identical, 485,166 bytes, SHA-256
  `97d1ecac8bdaaa5257d0e4219d88feddb3be9d7035503517a4209c277a2c122f`.
- Zenodo file `jeff-kline/order18-jacobi-hadamard-automorphisms-v0.1.0.zip`,
  downloaded through the record's file link: identical to the pinned zipball.
- Separate determinism check: `git archive --format=zip
  --prefix=order18-jacobi-hadamard-automorphisms-0.1.0/ v0.1.0`, generated
  twice, identical, 482,410 bytes, SHA-256
  `879a7f28decfe7a88fa5623bfbe7fb84560805da1406811629d2cf2645f383bd`. This is
  a different file from the provider zipball and is not compared with it.
- Mechanical audit at the archived state, on the unchanged tagged tree:
  11 pass, 0 warnings, 0 fail.

## External actions and owners

| Action | Owner | Status |
|---|---|---|
| Private GitHub repository and pushes | author authorization | done 2026-11-17 |
| Squash of the private history, force-push | author authorization | done 2026-11-17 |
| Public visibility; secret scanning and push protection | author authorization | done 2026-11-17 |
| Zenodo enablement before the Release | author, in the Zenodo portal | done 2026-11-17; Zenodo release webhook present and active |
| Annotated tag `v0.1.0`, GitHub Release | author authorization (freeze bundle) | done 2026-11-18 02:47 UTC: Release "Version 0.1.0" |
| Public-site listing | author authorization (admission bundle) | done 2026-11-17: landing entry "Automorphisms of the order‑18 Jacobi Hadamard matrices" at <https://jeff-kline.github.io/> (site commit `828f52d`); Pages build and live HTML checked for title, blurb, repository link and version DOI |
| Living-metadata update (this commit) | author authorization (admission bundle) | done 2026-11-17, pushed after the site listing was verified live |

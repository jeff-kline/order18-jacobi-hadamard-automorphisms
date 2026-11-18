# Admission record

**Current state:** CANDIDATE

Current verdict: NOT YET ADMITTED

**Version:** 0.1.0 (release candidate)

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
| Fast-follow scan within 7 days of tagging | PASS for 2026-11-17 | repeat if tagging after 2026-11-24 |

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
| Admitted status | N/A until admission | |
| Adversarial check | PASS | three process-separated lanes; dispositions in `audit/LEDGER.md` |

## R1 — release and stewardship

| Check | Status | Evidence or residual |
|---|---|---|
| Reproduction | PASS | fresh `git archive` extraction of the candidate, no inherited build files: manifest verifies, `make paper` reproduces the recorded PDF hash byte for byte, `make verify` gives 29 MATCH (Node v22.11.0, Apple clang 21) |
| Artifact integrity | PASS | `MANIFEST.sha256` covers every tracked file; two consecutive paper builds are byte-identical |
| Hygiene | PASS | whole-tree scan for private paths, emails, placeholders (records lane); README math 52/52 rendered by GitHub |
| Stewardship | PASS | CORRECTIONS.md policy |
| Tag, archive, citation, metadata | not started | Zenodo GitHub-integration route planned, as for the predecessor |

## External actions and owners

| Action | Owner | Status |
|---|---|---|
| Local edits and checks | Claude | ongoing |
| Push to the private GitHub repository | Claude, authorized by the author 2026-11-17 | done through the candidate |
| Making the repository public | Claude, authorized by the author 2026-11-17 (after squashing the private draft history) | in progress |
| Tag `v0.1.0` and GitHub Release | author's authorization required | not started |
| Zenodo integration | author, in the Zenodo portal | not started |
| Public-site entry | author's authorization required | not started |

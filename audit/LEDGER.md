# Audit ledger

This file is append-only. Each audit records its scope, what it checked,
its findings and their dispositions. The auditors are process-separated AI
agents in fresh contexts; they are not independent expert reviewers, and
their agreement is not peer review. Finding labels: error, gap, missing
hypothesis, sharpening, documentation.

## 2026-11-17 — review of the source notes (before the release cycle)

- **Auditor:** Claude (Opus), in the session that later prepared the release.
- **Scope:** the eight source notes now in `notes/` and their programs.
- **Runs:**
  - `base/aut.cpp`, compiled and extended with an $HH^{\mathsf T}=NI$ and skewness check;
  - 27 certificate runs under a JavaScriptCore shim, with a negative control.
- **Findings:**
  - R1 (documentation): the Kantor citations were inconsistent across the notes.
  - R2 (gap): no shipped script checked that $H$ is Hadamard.
  - R3 (documentation): the "rigidity" summary claimed more than the notes prove; the result covers this tower only.
  - R4 (documentation): the base search depends on the quartet theorem to restrict its anchors.
- **Dispositions:**
  - R1: fixed. Kantor, Trans. AMS 146 (1969), Corollary 8.2 was read on p. 20 and is cited in Proposition 4.1.
  - R2: fixed. New `code/base/gram.cpp` checks all 768 arrangements.
  - R3: fixed. The paper's scope is stated in §6.
  - R4: fixed. Stated in the remark after Theorem 5.1.

## 2026-11-17 — claims-consistency and prose lane

- **Auditor:** Sonnet, fresh context, read-only.
- **Verdict:** PARTIAL.
- **Must-fix findings and dispositions:**
  - P-M1 (documentation): the README linked `audit/PRIOR-ART.md`, which did not exist. Fixed: file written; the README notes the abstract-only sources.
  - P-M2 (documentation): the README Reproduce section was a placeholder. Fixed with the Makefile and verification record.
  - P-M3 (sharpening): "the group has order $d(Q-1)/18$" omitted that this is the group of permutations, i.e. automorphisms modulo global negation. Fixed in the abstract, README introduction and What is new ("these maps form a group of order …"). This is an approved-prose change, reported to the author.
  - P-M4 (documentation): the paper's Role of AI promised review records that did not yet exist. Fixed: this ledger.
- **Optional findings and dispositions:**
  - P-O1: the README's earlier-work list was incomplete. Adopted.
  - P-O2: citation placement. Adopted.
  - P-O3: character scope. Adopted.
  - P-O4: Kantor theorem numbers. Consistent: the paper cites Corollary 8.2.
  - P-O6: glosses. Partly adopted.
  - P-O7: Makefile reference. Fixed. The candidate status wording will be set at freeze.

## 2026-11-17 — citation and attribution lane

- **Auditor:** Sonnet, fresh context, read-only.
- **Verdict:** PARTIAL.
- **Must-fix findings:**
  - C-M1 (documentation): Pantangi is published in Electron. J. Combin. 26(3) (2019), P3.59, doi:10.37236/8753.
  - C-M2 (error): "Hall and Kantor" cited no Hall paper. Kantor's own reference list gives M. Hall, Jr., *Note on the Mathieu group $M_{12}$*, Arch. Math. 13 (1962) 334–340, for the Paley-matrix subgroup.
  - C-M3 (error): the Momihara–Xiang description ("four blocks, as used in this array") was imprecise. Their families have $2^{u-1}$ blocks with $q\equiv2^u+1\pmod{2^{u+1}}$ and cyclotomy of order a power of 2; characteristic 7 is not covered. Checked against arXiv:1801.08776.
  - C-M4 (error): Pantangi's critical groups are used there to prove inequivalence of the Paley matrix from the two- and four-block families. The paper's description "a different invariant from equivalence" understated this. Checked against the arXiv abstract.
  - C-M5 (documentation): four-row products credited to Orrick. Checked: Orrick (arXiv math/0507515, §3) defines closed quadruples and type-1 quadruples, so the citation stands.
- **Optional findings:** DOIs; wording of the Davenport–Hasse step (Theorem 5.14 is for Gauss sums, Jacobi sums by quotient); $Q\equiv3\pmod 4$ at the Kantor step; Lidl–Niederreiter Theorem 5.41 number UNVERIFIED.
- **Dispositions:** all applied together with the proof-lane fixes (next entry).
  - C-M1: fixed; the bibliography now gives EJC 26(3) P3.59 with the DOI.
  - C-M2: fixed; Hall (1962) added; the sentence now credits Hall and Kantor for the Paley Hadamard matrix and Kantor for the design.
  - C-M3: fixed; Momihara–Xiang is described with $2^{u-1}$ blocks, the congruence, and "these congruences exclude characteristic 7".
  - C-M4: fixed in the paper and the README.
  - C-M5: kept, with wording that names Orrick's closed quadruples.
  - Optional items:
    - DOIs added for Kantor ×2, Orrick, Lehmer, Wallis–Whiteman, Yamada and Pantangi.
    - Davenport–Hasse step reworded (Gauss-sum lifting plus the Jacobi quotient).
    - "$Q\equiv3\pmod4$" noted at the Kantor step.
    - Lidl–Niederreiter Theorem 5.41: confirmed by secondary citations (arXiv:1902.04736 and arXiv:2105.02374 cite it for exactly this bound); the book itself was not checked.
    - Lehmer and Yamada descriptions softened to what their titles and abstracts support.

## 2026-11-17 — proof and parameter lane

- **Auditor:** Opus, fresh context, read-only.
- **Verdict:** PARTIAL. No defect was found in any proof.
- **Method:**
  - re-derived by hand: Lemmas 2.1 and 2.4, Theorems 2.2 and 3.1, Proposition 4.1, the template count, Theorem 5.1 and Theorems 1.2–1.4;
  - wrote independent C++ ports of the Gauss-sum grouping, the Hadamard check, the quartet search (16 configurations), the frame certificate, the histogram (direct at $d=1$, lifted for all residues) and the 96/48 corner count. All reproduced the paper's values.
- **Findings and dispositions:**
  - 1 (must-fix, missing hypothesis): "$d$ odd" was missing from the abstract and README sentence about all $p\equiv7,31\pmod{36}$. Fixed in both.
  - 2 (documentation): group order versus signed group. Already addressed by P-M3; the abstract says "these maps form a group".
  - 3 (documentation): "every permutation of a fixed profile" is wrong for system II. Fixed: "each pattern attains $0$, $V$, $-V$".
  - 4 (sharpening): `uniform.cjs` did not assert the permutation and attainment facts. Fixed: two assertions added, the outputs are unchanged, and a deliberately broken assertion makes it fail.
  - 5 (gap, one line): in the Theorem 1.4 proof, why $g$ has trivial template permutations and $h=0$. Fixed: argument added (non-proportional columns of $U$; the class condition does not depend on the arrangement).
  - 6 (documentation): orientation scope of the system I frame certificate. Fixed in Remarks.
  - 7 (documentation): citations for Davenport–Hasse and the product formula. Fixed: Gauss-sum lifting [LN 5.14] with the Jacobi quotient; product formula [BEW, Ch. 11].
  - 8 (sharpening): Lemma 2.4 is exact over $\mathbb Z$. Fixed: restated, with the reduction modulo $\ell$ separated and $0^d=0$ noted implicitly via $d\ge1$.
  - 9 (documentation): Cauchy–Schwarz; the clash between $E$ (field) and the Gauss sum; the clash between $L$ and $L_Q$; the skipped step $G_3/G_9=G_6/G_{12}$. Fixed: Gauss sums written as $G_1,G_5,G_9$; $L_Q$ renamed $\Lambda_Q$; the step added.
  - 10 (documentation): forward reference to Proposition 4.2 in Theorem 3.1. Fixed: stated that only the explicit equivalences are used.
  - 11 (documentation): attribution of the three-value statement. Fixed: [Kline18] proved only the sum.
  - 12 (documentation): the certificate table did not name programs. Fixed: Table 3 now names each program; outputs are pinned in `evidence/` (29 files); `make verify` compares them byte for byte.
  - 13 (documentation): the standard arrangement equals [Kline18] by its code conventions. Fixed: stated.

## 2026-11-17 — re-audit of the edits (10aca11..60a8743) and claims consistency

- **Auditor:** Opus, fresh context, read-only.
- **Verdict:** PARTIAL.
- **Method:**
  - checked every changed hunk of the paper and README;
  - reran `uniform.cjs` and the skeleton scripts (outputs identical to `evidence/`);
  - checked the Gauss-sum chain numerically in $\mathbb F_{7^3}$ and $\mathbb F_{31^3}$;
  - enumerated the 54 class actions directly;
  - looked up the new DOIs and Hall (1962) on Crossref.
- **Correct as edited:** Lemma 2.4 (exact identity, then reduction); the Gauss-sum chain of Theorem 2.2; the Kantor hypothesis remark; $\Lambda_Q$; the new assertions in `uniform.cjs`; the descriptions of Orrick and Pantangi; all new DOIs.
- **Findings and dispositions:**
  - D1 (error): "these congruences exclude characteristic 7" was false; for example $49\equiv17\pmod{32}$ fits $u=4$. Fixed: the congruences force $q\equiv1\pmod4$, so no Momihara–Xiang family lives in $\mathbb F_{343^d}$ with $d$ odd. Fixed in the paper, README and PRIOR-ART.
  - D2 (error, credit): the claim that the three-value statement of Theorem 2.2 is new was wrong for system I and $p=7$. The predecessor proves it (its main.tex lines 426–431, checked). Fixed: the remark credits the predecessor; system II and $p\ne7$ are new.
  - D3 (gap): the Theorem 1.4 step "$m(h+p^kj)=\pm m(j)$, only $h=0$" was false as written, since $h=9$ also works. Fixed: trivial permutations force equal row/column signs (border and origin entries) and equal coordinate signs ($t'P=tS'$); after the normalization of Proposition 4.2 the condition is $m(h+p^kj)=m(j)$, which the enumeration shows has only $h=0$, $p^k\equiv1$. The order variable is renamed $\mu$ to avoid the clash with pattern $m$.
  - D4 (missing hypothesis): CITATION.cff lacked "$d$ odd". Fixed.
  - D5 (documentation): ADMISSION cited "§6 Remarks"; Remarks is §8. Fixed.
  - D6 (documentation, scope): the open-case statement listed only $p\ne7$. Fixed in the paper and README: also the other orientation, and system II with an even number of reversals.
  - D7 (documentation): MANIFEST.sha256 to be generated at the freeze.
  - Optional items adopted:
    - README orientation sentence aligned;
    - running time "about 2.5 minutes" everywhere;
    - "published character" stated with the 16-class count in README, CITATION and ADMISSION;
    - "$d$ odd" in the ADMISSION bullet;
    - Orrick and Hall rows added to PRIOR-ART;
    - Hall (order 12, large subgroup) and Kantor ($q>11$) separated;
    - $u\ge2$ added to the Momihara–Xiang description;
    - the Berndt–Evans–Williams citation narrowed to §11.3 (Davenport–Hasse product formula, per the book's table of contents).

## 2026-11-17 — check of the re-audit fixes (60a8743..3e85ee2)

- **Auditor:** Opus, fresh context, read-only.
- **Verdict:** PARTIAL.
- **Passed:**
  - the Theorem 1.4 sign-normalization argument, re-derived; a direct enumeration of the 54 class actions gives the single joint survivor $(h,p^k)=(0,1)$ for both systems, and $(9,1)$ survives only under the old "$\pm$" reading;
  - the renaming to $\mu$;
  - the Momihara–Xiang mod-4 argument;
  - the predecessor credit, checked against the predecessor's main.tex;
  - consistency of CITATION, ADMISSION and README;
  - Hall and Kantor: consistent, but the primary texts were paywalled to the auditor; Kantor's own summary of Hall was read by the root agent.
- **Finding and disposition:**
  - E1 (documentation, understatement): "Open cases" listed the other orientation as open even for system II with odd reversal, which the pinned `odd-frames.cjs … inverse` certificates settle. Fixed by extending Theorem 5.1(3): system II with odd reversal holds for every character of order 18, the two orientations covering all characters up to Frobenius. The open cases are narrowed to system I with the other orientation, $p\ne7$, and system II with even reversal, in both the paper and the README.
- **Optional, adopted:** the Momihara–Xiang remark now covers every field $\mathbb F_Q$ of the paper (all $Q\equiv3\pmod4$).
- **Optional, not adopted:** a "published character" qualifier in the abstract's sixteen-class sentence. "The original tower" denotes the predecessor's matrices, whose character is fixed. Theorem 1.3 states the character.

## 2026-11-17 — README rendering

- **Check:** `gh api markdown` gives 52 of 52 inline math spans rendered.
- **Fixes:**
  - $M_{12}$ was moved out of an italic title, where it did not render;
  - $q>11$ was rewritten as `\gt`, since GitHub double-escapes `>`.

## 2026-11-17 — reproducibility and release-records lane (candidate 948a361)

- **Auditor:** Sonnet, fresh context, read-only.
- **Verdict:** PASS.
- **Checked:**
  - the manifest covers all tracked files and verifies;
  - the whole tree is free of private paths, emails, credentials and placeholders;
  - CITATION.cff is in candidate form;
  - LICENSE matches the GNU GPL v3 text;
  - all local links resolve;
  - VERIFICATION.md agrees with the Makefile, the runner, the 29 evidence files and the PDF hash;
  - 19 "Fixed" dispositions are present in the paper or README;
  - the Theorem 5.1(3) extension is sound. The auditor derived the Frobenius equivalence $H_{\chi\circ\varphi}(x,y)=H_\chi(\varphi x,\varphi y)$ and the two orbits $\{1,7,13\}$, $\{5,11,17\}$ of $\times7$ on primitive classes.
- **Optional items:**
  - The paper should state the Frobenius identity explicitly. Adopted: one sentence in the proof of Theorem 3.1, referenced from Theorem 5.1(3).
  - The pending R1 rows in ADMISSION.md are now closed.
  - D7 (manifest) is closed: MANIFEST.sha256 exists and verifies.

## 2026-11-17 — fresh-extraction reproduction (root agent)

- **Candidate:** `git archive` of 948a361 extracted into an empty scratch directory.
- **Results:**
  - `shasum -c MANIFEST.sha256`: all OK;
  - after deleting the PDF, `make paper` rebuilt it with SHA-256 44c125d4…4900, equal to the hash recorded in VERIFICATION.md;
  - `make verify` gave 29 MATCH.
- **Follow-up:** the Frobenius sentence above changed the PDF, so the records are refreshed and the reproduction is repeated on the new candidate commit.

## 2026-11-17 — history squashed before publication

At the author's request, the private development history was squashed into a
single commit before the repository was made public. One early commit's
search log named another private repository of the author; that name had
already been redacted from the tree. The commit identifiers cited in the
entries above (ef6e4d1, 10aca11, 60a8743, 3e85ee2, 9a5fa9b, 948a361, 163659a)
refer to that private history and do not exist in the public repository. The
file tree of the published commit equals the audited candidate, plus this
note, the author's acceptance of the P1 residual in ADMISSION.md, and the
refreshed MANIFEST.sha256.

## 2026-11-17/18 — tag, archive and admission

- **Tag:** annotated `v0.1.0` (object 19b662c) → edc6913, with the noreply tagger. Candidate audit 8/8.
- **Pinning:** before the GitHub Release, the GitHub zipball was downloaded twice, identical: 485,166 bytes, SHA-256 97d1ecac…122f. `git archive` was generated twice, identical: 482,410 bytes, SHA-256 879a7f28…83bd.
- **Release and Zenodo:** the GitHub Release was published 2026-11-18 02:47 UTC. Zenodo record 24329143 has version DOI 10.5281/zenodo.24329143 and concept DOI 10.5281/zenodo.24329142.
  - The Zenodo file is byte-identical to the pinned zipball.
  - The 89 files inside pass the manifest.
  - The DOI resolves.
  - Archived-state audit: 11/11.
- **Site:** entry live at site commit 828f52d. The title and blurb were approved by the author, the latter after one revision. Pages build and live HTML verified.
- **Living metadata:** README status paragraph, CITATION.cff DOI and date-released, DOI on the paper's title page with the PDF rebuilt, ADMISSION ADMITTED, CORRECTIONS version history.

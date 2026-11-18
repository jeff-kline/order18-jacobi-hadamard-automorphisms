# Prior-art search, 2026-11-17 (read-only audit)

Scope: claims 1-4 of the order-18 automorphisms paper (quartet invariant; full automorphism group K ⋊ Gal; "system II" masks for p ≡ 7, 31 mod 36; 16 classes on the characteristic-7 tower). Only abstracts, titles and repository snippets were read unless stated. No full text of any cited paper was read.

## 1. RISK items

No hit pre-empts any of claims 1-4 on the evidence read. Two items need a full-text read before the release states "first":

- RISK-LOW (claim 2 overlap in kind): Karoui, arXiv 2602.16089 (Feb 2026), skew-Hadamard matrix of order 1252 = 2(5^4+1) from a bordered skew difference family over GF(5^4) with cyclotomic unions of order 16. It exhibits only "an explicit affine subgroup of the automorphism group of size 24375", a lower bound, not the full group. Different order, field and mask system. Full text not read.
- RISK-LOW (claim 3 overlap in kind): Momihara-Xiang, arXiv 1801.08776, skew Hadamard difference families (Wallis-Whiteman four-block type) from cyclotomic classes via Gauss sums. Claim 3's order-18 system II at p ≡ 7, 31 mod 36 is not in the abstract. Full text not read, so UNKNOWN for a possible order-18 / small-order family.
- Own prior work (not external): the predecessor, 10.5281/zenodo.21783219 (Zenodo record, 2026-08-04, GitHub jeff-kline/order18-jacobi-triples), matches "order 1376" and "Jacobi triple" searches. A private repository of the author [name redacted 2026-11-17] also appeared in the GitHub search listing (not read).

## 2. Search log (all dated 2026-11-17)

| # | Tool | Query | Results | Outcome |
|---|---|---|---|---|
| A1 | gh search repos | skew hadamard | 3 | jeff-kline/order18-jacobi-triples; [private repository of the author, name redacted 2026-11-17]; adrianmaciasquintero/weighing-matrices (weighing matrices from Paley/Kronecker/GS arrays, not automorphisms) |
| A2 | gh search repos | Wallis-Whiteman | 0 | none |
| A3 | gh search repos | hadamard automorphism | 0 | none |
| A4 | gh search repos | order 1376 hadamard | 0 | none |
| A5 | gh search repos | jacobi triple | 1 | jeff-kline/order18-jacobi-triples only |
| A6 | gh search repos | supplementary difference sets cyclotomic | 0 | none |
| A7 | gh search repos | Paley design automorphism | 0 | none |
| A8 | gh search code | skew hadamard | 20 shown | sagemath hadamard_matrix.py; OEIS dumps; WoS dumps; nothing on automorphisms of cyclotomic WW matrices |
| A9 | gh search code | Wallis-Whiteman | 20 shown | vatskishan03/Hadamard (skew_triage.py, skew_wallis.py: Wallis product, Goethals-Seidel quadruples of prime length), nreff/hadamard-search and Paul-Lez/hadamard-668-comparator (order 668), dylan-plummer/srg442 (rshcd_ww.py), qedavid/solverz (signed difference sets). Repository descriptions only; none computes automorphism groups or equivalence classes of cyclotomic WW matrices |
| A10 | gh search code | hadamard automorphism | 14 shown | tavisrudd/othello notes (Golay/order-668 automorphism notes), kim-em toolkit HadamardExperiments.scala, gororoba-quantum (unrelated). Not read in depth |
| A11 | gh search code | 1376 hadamard | 0 | none |
| A12 | gh search code | jacobi triple | 20 shown | theta-function / Jacobi triple product identity hits; irrelevant |
| A13 | gh search code | supplementary difference sets cyclotomic | 0 | none |
| A14 | gh search code | Paley design automorphism | 0 | none |
| A15 | gh search code (limitation test) | "Jacobi" with --repo jeff-kline/order18-jacobi-triples | 0 | Code search failed to retrieve a known file from the user's own public repo. GitHub code search is therefore not reliable negative evidence; A11, A13, A14 zeros carry little weight. |
| B1 | Zenodo API | skew Hadamard (unquoted, OR semantics) | 2541 | noise; top hits Bright "Best Matrix Conjecture" |
| B2 | Zenodo API | Hadamard automorphism group (unquoted) | 356928 | noise; relevant: Valtonen datasets (symmetric Hadamard up to order 32; complex Hadamard equivalence) |
| B3 | Zenodo API | Wallis-Whiteman (unquoted) | 2164 | noise, no relevant hit |
| B4 | Zenodo API | order-18 Jacobi (unquoted) | 291081 | noise, no relevant hit (predecessor not ranked) |
| B5 | Zenodo API | cyclotomic Hadamard inequivalent (unquoted) | 2263 | noise; Randriafanomezantsoa 10.5281/zenodo.17863827 "Hadamard 2-Designs from Frobenius Groups" (not read; titled different family) |
| B6 | Zenodo API | "skew Hadamard" (phrase) | 7 | Bright; Tayfeh-Rezaie "Skew-Hadamard matrices up to order 32" (10.5281/zenodo.3613659); predecessor 21783219; Macias-Quintero weighing matrices; Schumer, periodic T-matrices order 151, skew spin Goethals-Seidel family over Z/919Z (10.5281/zenodo.22820997, Hadamard orders 3676-7852, not read beyond title); Riabov Paley tournament discrepancy; Perera order 668 |
| B7 | Zenodo API | "Hadamard matrices" AND automorphism AND skew | 0 | none |
| B8 | Zenodo API | "Wallis-Whiteman" OR "Wallis–Whiteman" | 0 | none |
| B9 | Zenodo API | "Jacobi sums" AND Hadamard | 2 | Kline MSX determinant bounds (own); Blackthorn Legendre pairs 9p (not read) |
| B10 | Zenodo API | "supplementary difference sets" | 3 | Bright; Blackthorn Legendre pairs (two records) |
| B11 | Zenodo API | "order 1376" | 1 | predecessor 21783219 only |
| C0 | arXiv API | five "abs:..." queries (inequivalent, automorphism, cyclotomic SDS, Jacobi sums, Wallis) | 0 each | INVALID: malformed field prefix; not counted as evidence. Redone below with "all:". |
| C1 | arXiv API | all:"skew Hadamard" AND all:inequivalent | 5 | Pantangi 1905.08568; Hadamard-inequivalence of Feng-Xiang SDS 1308.1161; Dickson-polynomial SDS 1305.1831; Ree-Tits slice math/0609586 |
| C2 | arXiv API | all:"skew Hadamard" AND all:automorphism | 1 (feed header only) | effectively 0 |
| C3 | arXiv API | all:Hadamard AND all:"automorphism group" AND all:cyclotomic | 0 | none |
| C4 | arXiv API | all:"supplementary difference sets" AND all:cyclotomic | 0 | none |
| C5 | arXiv API | all:"Jacobi sums" AND all:Hadamard | 0 | none |
| C6 | arXiv API | all:"skew Hadamard" AND all:Wallis | 2 | Pantangi 1905.08568; Momihara-Xiang 1801.08776 |
| C7 | arXiv API | all:"skew Hadamard" (newest first) | 40 total, 25 screened | 2602.16089 Karoui; 2606.13536 (nonexistence of SHDS in non-abelian groups); 2411.18897 database of constructions; 2402.11074 order 36 classification; 2301.02751 orders 276, 292; 2011.14523 pure Gauss sums and SHDS; 1907.07024 morphisms |
| C8 | arXiv API | all:"automorphism group" AND all:"Hadamard matrices" | 9 | 2602.15264 Automorphisms of Kimura Hadamard matrices; 2608.09750 principal-unit Dita-type Butson matrices; 2109.05514 Pless symmetry codes; 2203.16439 self-dual Hadamard bent sequences |
| C9 | arXiv API | all:"Hadamard matrices" AND all:"Weil bound" | 0 | none |
| C10 | arXiv API | all:"Paley" AND "Hadamard" AND "automorphism" | 2 | 2109.05514 |
| C11 | arXiv API | all:"generalized Paley graph" AND all:automorphism | 1 (header only) | effectively 0 under this phrasing; see D5 |
| C12 | arXiv API | all:"Hadamard matrices" AND cyclotomic AND "Goethals-Seidel" | 0 | none |
| C13 | arXiv API | Orrick switching | 4 | math/0507515 Orrick, 2410.10638 switching graphs and Hadamard matrices, 2511.07020 universal switching theory (titles only) |
| C14 | arXiv API | Hadamard AND "4-profile" | 0 | none |
| C15 | arXiv API | "Hadamard matrices" AND inequivalent AND Paley | 1 (header) | effectively 0 |
| C16 | arXiv API | "Hadamard matrices" AND "Jacobi sums" | 0 | none |
| C17 | arXiv API | difference families AND "order 18" OR "18th power" | 0 | none (weak query) |
| C18 | arXiv API | Szekeres difference sets AND automorphism | 0 | none |
| C19 | arXiv API | Goethals-Seidel AND inequivalent | 1 (header) | effectively 0 |
| C20 | arXiv API | Yamada AND "supplementary difference sets" | 0 | none |
| C21 | arXiv API | Lehmer AND cyclotomic AND Hadamard | 0 | none |
| C22 | arXiv API | "Hadamard matrices" AND quadruple AND equivalence | 1 (header) | effectively 0 |
| C23 | arXiv API | "skew Hadamard" AND transpose | 0 | none |
| D1 | OpenAlex | works citing Kantor 1969 (W2026779623) | 43 | screened below |
| D2 | OpenAlex | works citing Momihara-Xiang (W2896490474, indexed as "Constructions of skew Hadamard difference families") | 4 | 2602.16089; Construction, extension and paths of near-homogeneous tournaments (Discrete Appl. Math. 2026); Pantangi 2019 (Electron. J. Combin. 10.37236/8753); one unrelated item |
| D3 | OpenAlex | works citing Lim-Praeger (W2051631358) | 81 | screened by title; see below |
| D4 | Semantic Scholar | citations of Lim-Praeger (math/0605252) | ~100 | consistent with D3 |
| D5 | Semantic Scholar | citations of Momihara-Xiang (arXiv:1801.08776) | 2 | 2602.16089, near-homogeneous tournaments; consistent with D2 |
| D6 | Semantic Scholar | first call for Momihara-Xiang metadata | 429 | NOT PERFORMED (rate limited); retried successfully as D5 |
| D7 | OpenAlex | title/search queries for Momihara-Xiang and Lim-Praeger | rate limited / empty | NOT PERFORMED; resolved by DOI lookup instead |

Not performed: Google Scholar, MathSciNet, zbMATH, Springer/Elsevier full texts, Seberry-Yamada and Cooper-Milas-Wallis 1978 originals, Yamada's SDS papers, de Launey-Stafford and Ó Catháin papers (no targeted query returned them; full text not openly accessible or not located). These are unknowns, not negatives.

## 3. Closest works

**Karoui, "An Explicit Skew-Hadamard Matrix of Order 1252 via Cyclotomic Unions", arXiv 2602.16089 (Feb 2026).** Object: skew-Hadamard matrix of order 1252 = 2(5^4+1), a bordered skew difference family over GF(5^4), blocks are unions of order-16 cyclotomic classes. Mechanism: explicit construction, GF(2)/GF(3)/GF(5) ranks, an exhibited affine automorphism subgroup of size 24375. Overlap: claim 2 PARTIAL in kind (an automorphism subgroup, not the full group, no border or block recognition, no quartet invariant); claims 1, 3, 4 NONE. Not an order-18 family, different characteristic. Full text not read.

**Momihara-Xiang, "Skew Hadamard difference families and skew Hadamard matrices", arXiv 1801.08776 (2018).** Object: four-block skew difference families from cyclotomic classes of finite fields, assembled into Wallis-Whiteman-type skew Hadamard matrices. Mechanism: Gauss-sum and Jacobi-sum evaluations. This is the nearest construction-side ancestor (the predecessor's tower is a variant). Overlap: claim 3 UNKNOWN (whether any order-18 system at p ≡ 7, 31 mod 36 appears; full text not read); claims 1, 2, 4 NONE on the abstract.

**Pantangi, "Difference families, skew Hadamard matrices, and critical groups of doubly regular tournaments", arXiv 1905.08568.** Studies critical groups of DRTs from one-, two- and four-block skew difference families (Wallis-Whiteman four-block case named in the abstract). Invariant-based: the critical group, not an automorphism group or equivalence-class count of an order-18 family. Overlap: claim 1 NONE (a different invariant); claim 4 NONE. Related as an invariant of Wallis-Whiteman matrices, so it should be cited.

**Kantor, "Automorphism groups of Hadamard matrices", J. Combin. Theory 6 (1969).** Method source for claim 2 (automorphisms of the Paley design). Cited by 43 works in OpenAlex; none of the titles screened suggest a cyclotomic Wallis-Whiteman or Goethals-Seidel computation. Nearest by title: "On the automorphisms of Paley's type II Hadamard matrix" (Discrete Math 2007, doi 10.1016/j.disc.2007.07.118) and "Structure and automorphism groups of Hadamard designs" (J. Algebraic Combin. 2006); both concern Paley or general designs, not four-mask bordered arrays. Overlap with claim 2: PARTIAL-method only; abstracts and full texts not read.

**Lim-Praeger, "On generalised Paley graphs and their automorphism groups", arXiv math/0605252; Ponomarenko, arXiv 2511.18304 (Nov 2025), "The automorphism groups and identification of some Generalized Paley Graphs".** Tools for the automorphism group of the cubic generalized Paley graph; Ponomarenko shows Aut ⊆ AΓL(1,q) for q large relative to k. Method input for claim 2, not an application to Hadamard matrices. Overlap: claim 2 NONE on the object; tool-level support only.

**arXiv 1308.1161, "Inequivalence of skew Hadamard difference sets and triple intersection numbers modulo a prime" (authors not checked) (triple intersection numbers modulo a prime).** Inequivalence invariant for difference sets of Feng-Xiang type versus Paley sets. Different object (difference sets in elementary abelian groups, not completed matrices under signed permutations), different invariant. Claim 1 NONE (no quartet/pointwise-product invariant); claim 4 NONE.

**Orrick, "Switching operations for Hadamard matrices", arXiv math/0507515, and Cooper-Milas-Wallis (1978).** Orrick's switching and Cooper-Milas-Wallis profile-type invariants are general tools for Hadamard inequivalence. Orrick abstract and titles only; Cooper-Milas-Wallis full text not openly accessible. Whether either gives claim 1's "exactly two 4-row sets with ≤4 off-constant entries" is UNKNOWN; mechanism (multiplicative Weil bound plus exhaustive Q=343 check) is not visible in these.

**arXiv 2011.14523 (authors not checked) ("Pure Gauss sums and skew Hadamard difference sets").** Constructs skew Hadamard difference sets from cyclotomic classes via pure Gauss sums with odd extension degree f up to 23. Parameter families: difference sets, not four-mask bordered arrays. Claim 3 PARTIAL in technique (Gauss-sum evaluation under extension degree) but not order 18 or Hasse-Davenport for q = p^{3d}; UNKNOWN on full text.

**Tayfeh-Rezaie, "Skew-Hadamard matrices up to order 32" (Zenodo 10.5281/zenodo.3613659); arXiv 2402.11074 (order 36 classification).** Computer classification at small orders. Orders far below 1376. Claims 1-4 NONE.

**Weak neighbours, not read:** Schumer, Zenodo 10.5281/zenodo.22820997 (skew spin Goethals-Seidel family over Z/919Z, orders 3676-7852; different family and mechanism by title); arXiv 2602.15264 (automorphisms of Kimura Hadamard matrices, a different object); arXiv 2411.18897 / SageMath database of constructions (construction tables, not automorphism groups); arXiv 2606.13536 (non-existence of SHDS in non-abelian groups; unrelated).

**Not found in any searched source:** a prior construction of order-18 cyclotomic supplementary difference sets for p ≡ 7, 31 (mod 36); any computation of the full automorphism group of a completed cyclotomic Wallis-Whiteman matrix; any mention of "16 equivalence classes" or a quartet invariant. These are absences in the corpus searched, not evidence of absence elsewhere.

## 4. Bounded conclusion

Corpus searched: GitHub repo search (public) and code search (unreliable, see A15); the Zenodo public API; the arXiv API (titles and abstracts, submitted-date order, small result windows, many queries returned few records, partly due to phrase matching); OpenAlex and Semantic Scholar citation lists for Kantor 1969, Momihara-Xiang and Lim-Praeger (rate limits partly hit; indexed counts may be incomplete, notably Momihara-Xiang at only 4). Method: titles and abstracts only for 2602.16089, 1801.08776, 1905.08568, 1308.1161, 2011.14523, 2511.18304; no full texts read. Inaccessible or unsearched: MathSciNet, zbMATH, journal full texts, Yamada and Cooper-Milas-Wallis originals, de Launey-Stafford and Ó Catháin work.

On this evidence no found work states claims 1-4. Residual risk is concentrated in (a) the full text of Momihara-Xiang for claim 3 and (b) the full text of Karoui 2602.16089 and the Kantor-citing automorphism papers for claim 2. This report does not establish global novelty; a "first" phrasing should stay tied to "to the authors' knowledge, after a search of the sources listed here."

# Prior-art record

Date of searches: 2026-11-17. Detailed query log:
[searches/prior-art-search-2026-11-17.md](searches/prior-art-search-2026-11-17.md).

This is a bounded comparison. It supports the README statement that the
results were not found in the sources checked. It is not evidence of global
novelty.

## Corpus searched

- GitHub repository and code search. Code search failed to retrieve a known
  file in a public repository during the same session, so its zero-hit
  queries carry little weight.
- Zenodo public API.
- arXiv API, including 2025–2026 listings.
- Citation lists from Semantic Scholar and OpenAlex for three anchors:
  Kantor's 1969 note on Hadamard matrices (43 citing works), Lim–Praeger on
  generalized Paley graphs (81), and Momihara–Xiang (4; probably incomplete).
  Some requests were rate limited and are logged as NOT PERFORMED.
- Publisher and arXiv metadata for the cited works.

## Sources read in full or in the relevant part

| Source | What it does | Overlap with this paper |
|---|---|---|
| Kantor, *2-transitive symmetric designs*, Trans. Amer. Math. Soc. 146 (1969), pp. 19–21 read | Theorem 8.1: full automorphism group of the Paley design for $11<v\equiv3\pmod4$. Corollary 8.2: permutations $f,g$ with $f(x+q)-g(x)$ a square whenever $q$ is a square satisfy $f=g=bx^\sigma+a$ | Used as a tool (Proposition 4.1). Credited. |
| Kantor, *Automorphism groups of Hadamard matrices*, J. Combin. Theory 6 (1969) | Automorphism group of the Paley Hadamard matrix ($q>11$), building on Hall | Context. Credited. |
| Momihara–Xiang, arXiv:1801.08776 (abstract, introduction, main theorems) | Skew Hadamard difference families with $2^{u-1}$ blocks over $\mathbb F_{q^e}$, $q\equiv2^u+1\pmod{2^{u+1}}$, $u\ge2$, cyclotomy of order a power of 2, for every $e$ | Different cyclotomic order; the congruence forces $q\equiv1\pmod4$, so no such family lives in $\mathbb F_{343^d}$, $d$ odd; no equivalence or automorphism results. NONE for the theorems here. |
| Hall, *Note on the Mathieu group $M_{12}$*, Arch. Math. 13 (1962), as summarized and cited by Kantor (1969) | A subgroup $P\Sigma L(2,q)$-type action on the Paley Hadamard matrix; $M_{12}$ at order 12 | Context. Credited. |
| Orrick, *Switching operations for Hadamard matrices*, SIAM J. Discrete Math. 22 (2008), arXiv:math/0507515, §3 read | Closed and type-1 quadruples of rows; switching operations | The four-row products used here; credited. NONE for the theorems here. |
| Karoui, arXiv:2602.16089 (abstract and automorphism section) | One skew Hadamard matrix of order $1252=2(5^4+1)$ from order-16 cyclotomic unions; exhibits an affine subgroup of order 24,375 of its automorphism group | A lower bound for one matrix, a different family and order. PARTIAL in kind only (automorphisms studied); NONE for the theorems here. |
| Pantangi, arXiv:1905.08568 (abstract, introduction) | Critical groups of doubly-regular tournaments from skew Hadamard difference families with one, two or four blocks | A different invariant. Cited. |
| Predecessor, doi:10.5281/zenodo.21783219 | System I in characteristic 7, the tower, and separation from the sextic shift orbit at the input level | Explicitly left equivalence of completed matrices open. |

## Not read (access or time); not counted as negative evidence

- Cooper, Milas and Wallis (1978), *Hadamard equivalence*, and later
  four-profile papers: the full text was not openly accessible.
- Yamada's papers on supplementary difference sets and Jacobi sums; Lehmer
  (1974): metadata only.
- de Launey–Stafford and Ó Catháin on automorphism groups of Hadamard
  matrices from difference sets: not located in open access during the search.
- MathSciNet and zbMATH: NOT PERFORMED, since no access was available.

## Conclusion

No source checked contains:

- the automorphism groups of the completed order-18 matrices;
- the four-row classification;
- system II, or the order-18 systems for $p\equiv7,31\pmod{36}$;
- the class counts.

The closest constructions (Momihara–Xiang, Karoui) use different cyclotomic
orders. Karoui determines no full automorphism group.

A fast-follow rescan is required within 7 days before tagging.

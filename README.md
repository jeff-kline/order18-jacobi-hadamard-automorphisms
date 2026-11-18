# Automorphisms and equivalence classes of the order-18 Jacobi Hadamard matrices

Jeffery Kline

[![Version DOI: 10.5281/zenodo.24329143](https://zenodo.org/badge/DOI/10.5281/zenodo.24329143.svg)](https://doi.org/10.5281/zenodo.24329143)

**Status: version 0.1.0 admitted 2026-11-17.** The immutable release is
[`v0.1.0`](https://github.com/jeff-kline/order18-jacobi-hadamard-automorphisms/releases/tag/v0.1.0),
archived at version DOI [`10.5281/zenodo.24329143`](https://doi.org/10.5281/zenodo.24329143). The concept DOI
[`10.5281/zenodo.24329142`](https://doi.org/10.5281/zenodo.24329142) resolves to the latest version; cite the
version DOI for reproducibility. Admission under the project's
[public research standard](https://jeff-kline.github.io/posts/research-program/index.html)
is a release decision, not peer review or a correctness certificate; see
[ADMISSION.md](ADMISSION.md). The tagged snapshot retains its prepublication
“release candidate” wording because the DOI did not exist when it was made.

This is the sequel to
[*Order-18 Jacobi triples beyond the sextic shift orbit*](https://github.com/jeff-kline/order18-jacobi-triples)
([doi:10.5281/zenodo.21783219](https://doi.org/10.5281/zenodo.21783219)).

The paper is [paper/main.pdf](paper/main.pdf); its source is
[paper/main.tex](paper/main.tex).

## Introduction

The earlier paper constructed skew Hadamard matrices of orders
$4(343^d+1)$, for every odd $d$, beginning with order $1376$. It placed three
sign patterns on the eighteen classes of an order-18 multiplicative character
of the field with $343^d$ elements, together with the Paley pattern, in the
bordered array of Wallis and Whiteman. That paper proved that the patterns
work at every order. It left open whether the completed matrices are new up
to equivalence, that is, up to permuting and negating rows and columns.

This paper determines their automorphism groups. Every automorphism fixes the
border and acts on each of the eight copies of the field by the same map
$x\mapsto ax^{343^j}$, where $a$ is an eighteenth power. These maps form a
group of order $d(343^d-1)/18$, which is $19$ at order $1376$.

The proof recovers the array's structure from the matrix alone:

- exactly two sets of four rows have a product that is constant away from
  four columns;
- the Paley submatrices are recognized by their row correlations;
- Kantor's theorem on the automorphisms of the Paley design then makes the
  coordinate maps semilinear.

The paper also gives a second set of three patterns, and proves that both sets
work for every prime $p\equiv7$ or $31\pmod{36}$ and field size $p^{3d}$ with
$d$ odd. The same invariants give at least eight inequivalent skew Hadamard
matrices at every such order $4(p^{3d}+1)$. On the original tower, the two sets, their
arrangements in the array and the transposes give exactly sixteen equivalence
classes when $3\nmid d$, and fourteen or sixteen when $3\mid d$. None of these
matrices is equivalent to a Kronecker product, to a skew doubling, or to a
matrix in the same array whose patterns are constant on the classes of sixth
powers. All of these orders were known to admit skew Hadamard matrices.

## What is new

Wallis and Whiteman gave the bordered array. Kantor determined the
automorphism group of the Paley design. The earlier paper built the
characteristic-7 tower from system I and proved it is not the classical
sextic construction in disguise. It made no claim about equivalence of the
completed matrices. New here:

1. **Principal result: the automorphism group.** For $Q=343^d$ with $d$ odd,
   every automorphism of the published matrix fixes the border. It acts on all
   eight field copies by one map $x\mapsto ax^{343^j}$ with $a$ an
   eighteenth power. Every such map is an automorphism. These maps form a
   group of order $d(Q-1)/18$; together with negating every row and column
   they give all automorphisms (paper Theorems 1.1 and 5.1).
2. **Four-row sets.** In every matrix considered, exactly two sets of four
   rows have at most four columns where their product differs from its
   majority sign: the border rows and the rows at the origins of the field
   copies (Theorem 3.1). Consequently no such matrix is equivalent to its
   transpose, to a Kronecker product, or to a skew doubling (Corollaries 3.2
   and 3.3, Theorem 1.4).
3. **A second system and all admissible characteristics.** A second set of
   three patterns, system II, gives skew Hadamard matrices of order
   $4(p^{3d}+1)$ for every prime $p\equiv7$ or $31\pmod{36}$, odd $d$ and
   any character of order 18. So does system I, which was proved before only
   for $p=7$ (Theorem 2.2).
4. **Class counts.**
   - At every such order the two systems give at least eight inequivalent
     matrices (Theorem 1.2).
   - On the characteristic-7 tower, with the published character, the
     $768$ arrangements and their transposes give exactly $16$ classes when $3\nmid d$, and $14$ or $16$
     when $3\mid d$ (Theorem 1.3).
5. **Sextic comparison.** No matrix here is equivalent to a Hadamard matrix of
   the same array whose patterns are constant on the cosets of the sixth
   powers (Theorem 1.4).

Not new:

- The orders. All orders $4(p^{3d}+1)$ were known to admit skew Hadamard
  matrices, for example from Paley matrices by doubling.
- The array (Wallis–Whiteman) and the automorphism group of the Paley design
  (Kantor), which the proof uses.
- Davenport–Hasse lifting and Weil's bound, both used as stated in Lidl and
  Niederreiter.
- System I in characteristic 7 (the earlier paper).

These statements rest on a bounded comparison recorded in
[audit/PRIOR-ART.md](audit/PRIOR-ART.md). We have not found the results above
in the sources checked; several older sources could be checked only through
their titles and abstracts, as listed there. This is not a claim of global
novelty.

## Earlier work

- **Kline (2026)**, *Order-18 Jacobi triples beyond the sextic shift orbit*,
  [doi:10.5281/zenodo.21783219](https://doi.org/10.5281/zenodo.21783219):
  the characteristic-7 tower from system I, and its separation from the
  sextic shift orbit at the level of the three patterns.
- **Wallis and Whiteman (1972)**, *Some classes of Hadamard matrices with
  constant diagonal*, Bull. Austral. Math. Soc. 7: the bordered array.
- **Kantor (1969)**, *2-transitive symmetric designs*, Trans. Amer. Math.
  Soc. 146: Theorem 8.1 and Corollary 8.2, the automorphisms of the Paley
  design, including independent permutations of points and blocks.
- **Hall (1962)**, *Note on the Mathieu group* $M_{12}$, Arch. Math. 13: a
  large group of automorphisms of the Paley Hadamard matrix, and the whole
  group at order 12. **Kantor (1969)**, *Automorphism groups of Hadamard
  matrices*, J. Combin. Theory 6: the whole group for $q\gt11$.
- **Lehmer (1974)** and **Yamada (1992)**: supplementary difference sets from
  cyclotomy, and their relation to Jacobi sums (titles and abstracts only; see
  the prior-art record).
- **Orrick (2008)**, *Switching operations for Hadamard matrices*, SIAM J.
  Discrete Math. 22: closed and type-1 quadruples of rows, the four-row
  products used here.
- **Momihara and Xiang (2018)**,
  [*Skew Hadamard difference families and skew Hadamard matrices*](https://arxiv.org/abs/1801.08776):
  skew Hadamard difference families with $2^{u-1}$ blocks over
  $\mathbb F_{q^e}$ for $q\equiv2^u+1\pmod{2^{u+1}}$, $u\ge2$, and every $e$,
  from cyclotomy of order a power of 2. These congruences force
    $q\equiv1\pmod4$, so none of their families lives in a field of this
  paper, all of which have $Q\equiv3\pmod4$.
- **Karoui (2026)**,
  [*An explicit skew-Hadamard matrix of order 1252 via cyclotomic unions*](https://arxiv.org/abs/2602.16089):
  one matrix from order-16 cyclotomic unions, with an explicit subgroup of
  its automorphism group.
- **Pantangi (2019)**,
  [*Difference families, skew Hadamard matrices, and critical groups of doubly regular tournaments*](https://doi.org/10.37236/8753),
  Electron. J. Combin. 26(3): critical groups of the tournaments attached to
  one-, two- and four-block families, used to show that those skew Hadamard
  matrices are not equivalent to the Paley matrix.

## Evidence and limits

| Claim | Status |
|---|---|
| Lifting lemma, quartet theorem for $Q\ge31^3$, reduction of equivalences to templates | proved on paper; uses Weil's bound, Davenport–Hasse lifting and Kantor's corollary as cited |
| Gauss-sum identities for both systems (Theorem 2.2) | proved on paper, with the grouped coefficients checked by exact computation in $\mathbb Z[\zeta_{18}]$ |
| Quartet theorem at $Q=343$ | certified computation over all row quartets |
| Templates, the 96-element arrangement classes | certified finite enumeration |
| Border recognition in characteristic 7, all odd $d$ | certified computation modulo 37, reduced to 18 residues of $d$ by the lifting lemma, with direct checks at $d=1$ |
| Sixteen classes when $3\nmid d$ | certified computation modulo 19, as above |
| Order 19 at order 1376 | also confirmed by an exhaustive automorphism search |

Limits:

- When $3\mid d$, whether the two even arrangements of system II are
  equivalent is open.
- For $p\ne7$, for system I with the other orientation of the character, and
  for system II with an even number of reversed patterns, whether an
  automorphism exchanges the border rows with the origin rows is open. In
  these cases the group order is known only up to a factor 2.
- The sixteen-class count is proved for the published character. The other
  orientation was checked for the quartet theorem and for system II's
  origin-marking certificate only.
- The matrices are not compared with every other construction of the same
  orders.

## Reproduce

The certificates need Node.js (tested with v22.11.0) and a C++17 compiler;
the paper needs pdfLaTeX.

```sh
make verify NODE=/path/to/node   # runs every certificate, about 2.5 minutes on one core
make paper                       # builds paper/main.pdf
```

`make verify` writes each output to `build/certificates/` and prints `MATCH`
for each file that equals its pinned copy in `evidence/`.
[VERIFICATION.md](VERIFICATION.md) maps each certificate to the step of the
paper it checks.

## Role of AI

AI assisted the derivations, the computer verification, the literature search
and the exposition under the author's direction. Process-separated AI reviews
checked the proofs and certificates; they are not independent expert peer
review, and no independent human expert has examined the proofs. The audits
and their dispositions are in [audit/LEDGER.md](audit/LEDGER.md).

## License

GPL-3.0-only. See [LICENSE](LICENSE).

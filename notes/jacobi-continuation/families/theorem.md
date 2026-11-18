# Two order-18 triples in infinitely many characteristics

Let $p$ be a prime congruent to 7 or 31 modulo 36, let $d$ be a positive odd integer, and put $Q=p^{3d}$. Over $F=\mathbb F_Q$, fix an arbitrary character $\chi$ of order 18 and a primitive complex eighteenth root $z$. For $x\ne0$ put $j(x)=j$ when $\chi(x)=z^j$. Extend a half-word $w$ by $w(j+9)=-w(j)$, and let $f(x)=w(j(x))$ for $x\ne0$, with $f(0)=1$.

| Triple | First half-word | Second half-word | Third half-word |
|---|---|---|---|
| I | `+-------+` | `+--+---+-` | `+-+++-++-` |
| II | `+-+++++++` | `++++++-+-` | `+++-+----` |

**Theorem.** In either triple the three additive autocorrelations sum to $-3$ at every nonzero shift. The negative supports give a skew difference family with block sizes $(Q-1)/2$ and difference multiplicity $3(Q-3)/4$. The aligned vectors of the three individual correlations have six distinct values for I and three for II. Thus the triples are inequivalent under one common additive-group automorphism, independent translations and negations, and block permutations. Triple I is inequivalent under the same operations to any triple of sextic-class unions. Both triples, completed by the Paley half-word `+-+-+-+-+`, give bordered Wallis–Whiteman skew Hadamard matrices of order $4(Q+1)$.

Both prime congruence classes contain infinitely many primes by Dirichlet's theorem. The order and supplementary-difference parameters already have classical constructions. The characteristic-7 instance of I is the earlier paper's triple. [Earlier construction](https://github.com/jeff-kline/order18-jacobi-triples)

## Gauss-sum identities

Use the canonical additive character of $F$ and put $G_j=G(\chi^j)$. The norm exponent $S=(Q-1)/(p-1)$ is $3d\pmod {18}$, since $1+p+p^2=3\pmod {18}$ and $p^3=1\pmod {18}$. Consequently $\chi^3$ restricts to the quadratic character on $\mathbb F_p^*$, $\chi^6$ restricts trivially, and $\tau=\chi(4)$ is a cube root of unity. Since $p=7\bmod12$, quadratic reciprocity gives $(3/p)=-1$. The field size is 19 modulo 36, hence $\chi(-1)=-1$.

Frobenius invariance of the canonical additive character gives $G_j=G_{pj}$. Both allowed values of $p\bmod18$ generate the same three-element subgroup, represented by the residues 1, 7 and 13. Write
$$
 A=G_1=G_7=G_{13},\quad B=G_5=G_{11}=G_{17},\quad E=G_9 .
$$
Inversion gives $AB=E^2=-Q$. Apply cubic Hasse–Davenport to $\chi$ and the cubic character $\chi^6$. The left side is $A^3$, and the right side is $G_3\chi^{-3}(3)G_6G_{12}=-QG_3$. Thus $G_3=A^2/B$. The same argument for $\chi^{-1}$ gives $G_{15}=B^2/A$. These relations apply in $F$ itself at every degree. [Hasse–Davenport product formula, Theorem 3.1](https://www.math.ttu.edu/~mccarthy/publications/SumGmn)

Define
$$
 \delta=(A^2-BE)/G_2.
$$
Quadratic Hasse–Davenport on $\chi^{-1}$ yields $BG_8=\tau G_{16}E$. Since $G_2=G_8=G_{14}$, $G_4=G_{10}=G_{16}$, and $\overline{G_2}=G_4$, this gives $BE/G_2=\tau^{-1}\overline{A^2/G_2}$. In particular $\overline\delta=-\tau\delta$.

The ratio $A^2/(BE)=G_3/E$ is $G_6/G_{12}$ by quadratic Hasse–Davenport applied to $\chi^3$, since $\chi^3(4)=1$. If $G_6=G_{12}$, then $G_6^2=Q$. But $G_6\in\mathbb Q(z^6)$. Indeed all automorphisms of $\mathbb Q(\zeta_3,\zeta_p)$ fixing $\zeta_3$ act on $G_6$ by changing the additive character by a scalar in $\mathbb F_p^*$, and $\chi^6$ is trivial there. The real subfield of this imaginary quadratic field is $\mathbb Q$, whereas $\sqrt Q$ is irrational. This proves $\delta\ne0$.

## The finite mask calculation

For each row let $C(u)=\sum_{j=0}^8w(j)z^{-uj}$. At a shift in class $c$ its autocorrelation is
$$
 -\frac{1}{81}\sum_{h\ {\rm even}}z^{hc}
 \sum_{u\ {\rm odd}} C(u)C(h-u)J(\chi^u,\chi^{h-u}).
$$
This follows by expanding the two factors off zero in characters and substituting $x=-sy$ at a shift $s$. The two origin terms cancel by skewness. The $h=0$ term is $-1$ by Parseval and $J(\chi^u,\chi^{-u})=1$.

For $h\ne0$, $J(\chi^u,\chi^{h-u})=G_u G_{h-u}/G_h$. For each $h$, group $u$ by the numerator monomial in $A,B,E$, using $E^2=AB$, $G_3=A^2/B$ and $G_{15}=B^2/A$. All three-row Gram coefficients cancel in every group, in both systems. For each single row, the layers $h=6,12$ also vanish. The layers $h=2,8,14$ have opposite coefficients on the $A^2$ and $BE$ groups and vanish elsewhere. The layers $h=4,10,16$ have opposite coefficients on the two conjugate groups. Thus every nonconstant part of the inverse Fourier expansion is a known coefficient times $\delta$, after substituting $\overline\delta=-\tau\delta$.

The verifier reduces all operations in the basis $1,z,\ldots,z^5$, with $z^6=z^3-1$. For $\tau=1,z^6,z^{12}$, respectively, a representative coefficient of $\delta$ in the numerator of the inverse expansion for I is
$$
 -36+72z^3,\qquad -72+36z^3,\qquad 36+36z^3 .
$$
For II take their negatives. At each of the 18 shifts, the triple of specialized coefficients is a permutation of $0,V,-V$, where $V$ is the corresponding displayed coefficient. For I the six permutations have multiplicities $2,2,2,4,4,4$. The three small colors occupy exactly $j=1,4,7,10,13,16$, at each value of $\tau$. For II three cyclic permutations occur, each six times. Since $\delta V\ne0$, the counts persist upon specialization. A sextic triple has at most three joint difference counts, since differences are unchanged by negation and sextic scalar multiplication. Negative support difference counts are an affine function of the correlation, with the same slope for all three blocks.

Run `node uniform.cjs` and `node uniform.cjs second` for the exact monomial groupings and zero checks. The independent explicit field search, for example `node search.cjs 31 3 18`, enumerates all normalized rows and uses the exact cyclotomic table to verify the odd-lift condition. Its 36 primitive solutions in characteristics 7,31,43 split into orbits of sizes 27 and 9 under class translation, Frobenius, independent word negation and permutation of the triple. These counts do not enter the proof.

## Consequences for the completed matrices

Consider the bordered array and exceptional-quartet definition in the [earlier note](../../research-directions-2026-11-17/jacobi-proof.md). For both systems the four full masks multiply to 1 and every proper nonempty subset product has absolute mean at most $1/3$. Every single mask has at most seven nonzero Fourier coefficients, as checked in `uniform.cjs`. A product at the same center has a definite parity under $j\mapsto j+9$, hence has at most nine nonzero Fourier coefficients and normalized Fourier norm at most 3. Apply the earlier note's character-sum bound to each nonspecial quartet. With four distinct centers the block sum has magnitude at most $49(3\sqrt Q+4)+4$, since the trivial term vanishes. With at most three centers it is at most $Q/3+27(2\sqrt Q+3)+3$. Both are less than $Q-8$ already at $Q=31^3$, and remain so thereafter. Every allowed $Q>343$ meets the threshold. At $Q=343$, `base-quartets.cjs` exhausts every quartet candidate for each system and both character orientations. Multiplication of the character exponent by 7 is induced by field Frobenius, exhausting all primitive characters. In all four checks precisely the border quartet and zero quartet qualify and each has four minority columns. For a nontrivial character monomial with $r$ distinct roots whose exponents are nonzero, the complete multiplicative-character Weil bound is at most $(r-1)\sqrt Q$. Omitting and restoring centers gives the constants above. [Weil bound, Theorem 3.7](https://people.cs.uchicago.edu/~laci/papers/span1.pdf)

Write $K=(F^*)^{18}$. The effective ordinary automorphism group preserving the border quartet has order $d|K|$ for I and $3d|K|$ for II. Use the [frame and synchronization argument](../algebra/rigidity.md) with the border marked. The true four column and row blocks and the four minority columns of each quartet are now intrinsic. Each of the four Paley cells is recognizable by having constant absolute nonzero autocorrelation 1. Each remaining cell has some absolute correlation different from 1, because its three values are $-1,-1+t,-1-t$ with $t\ne0$. Kantor's Paley design theorem applies because $Q>11$ and $Q=3\bmod4$. It allows independent point and block permutations. The theorem and the trivial-period argument of the frame proof then synchronize the eight coordinate permutations to $x\mapsto ax^{p^t}$ up to signs. The finite skeleton calculation applies when $p\bmod18$ equals 7 or 13, since these generate the same three-element subgroup. For I there is one survivor. For II, `second-skeleton.cjs` gives three survivors with multiplier classes $0,3,6$, all with $t=0\bmod3$. Each of the three is an actual array automorphism for every $a$ in its prescribed class and each exponent divisible by three. Only the class-zero survivor fixes the eight row and eight column indices pointwise. Here automorphisms are taken modulo simultaneous negation of all row and column signs. [Kantor, Theorem 8.1 and Corollary 8.2](https://pages.uoregon.edu/~kantor/PAPERS/2traSymDes.pdf#page=20)

The pair of exceptional quartets is intrinsic. Thus either border stabilizer has index 1 or 2 in the full group. The two ranges of group sizes are disjoint, proving I and II inequivalent under unrestricted ordinary Hadamard equivalence at every $Q$.

A sextic comparator in the same template has a scalar automorphism of odd order $M=(Q-1)/6$. Its eight border and zero indices are fixed on both sides and every remaining orbit has length $M>8$. If the matrix were equivalent to one of ours, the odd-order element must stabilize both exceptional quartets and their two four-element minority column sets. Every orbit on those small sets has length 1, since all other orbits have length $M$. It therefore fixes the entire frame pointwise. In either family such an element belongs to $K\rtimes\mathrm{Gal}(F/\mathbb F_{p^3})$. With trivial Frobenius part its order divides $(Q-1)/18$. If its Frobenius part has order $b\ge3$, its $b$th power is a scalar in the fixed field, so its order is at most $b(p^{3d/b}-1)<(Q-1)/6$. The latter follows from $1+x+\cdots+x^{b-1}>6b$ for $x=p^{3d/b}\ge343$ and $b\ge3$. Both alternatives contradict order $M$. The quartet count also gives the earlier note's exclusions of standard skew doublings and nontrivial Hadamard Kronecker products for both families.

The two classes are provably distinct from each other and the listed comparators. Classical constructions attain every stated order. The earlier characteristic-7 study describes Lehmer’s sextic shift orbits and Yamada’s general Jacobi-sum criterion. Feng–Xiang construct individually flat difference sets, whereas every constituent here has three correlation values. A bounded search located no primary source for these specific two triple constructions throughout these characteristic classes. Historical priority and equivalence to constructions beyond the named comparators remain open. [Earlier literature comparison](https://github.com/jeff-kline/order18-jacobi-triples/blob/main/paper/companion/LITERATURE-REVIEW-order18.md) · [Feng and Xiang](https://arxiv.org/abs/1101.2994)

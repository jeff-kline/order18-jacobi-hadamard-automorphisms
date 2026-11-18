# Ordinary automorphisms of the Jacobi tower

Let $E=\mathbb F_Q$, $Q=343^d$ with $d$ odd, and let $K\le E^\times$ be the kernel of the character of order 18 used for the four masks. Let $H_d$ denote the explicit bordered matrix in the [construction and quartet theorem](../../research-directions-2026-11-17/jacobi-proof.md). The ordinary signed-pair automorphism group of $H_d$ is
$$
 C_2\times\bigl(K\rtimes\operatorname{Gal}(E/\mathbb F_{343})\bigr).
$$
Each field coordinate on each side undergoes the same map $x\mapsto a x^{343^j}$, with $a\in K$ and $j\bmod d$. All four border indices on each side are fixed. The factor of order two negates every row and every column simultaneously. In particular the base group has 38 elements and its effective action has 19.

## An exhaustive upper bound at the base

The two intrinsic row quartets have disjoint four-column minority supports. Choose border row 0 and border column 0 in its quartet's minority support. An ordinary equivalence carries this pair into one of 32 candidates, four column choices for each of eight possible row images. For a possible anchor $(u,v)$, normalize each entry by forming
$$
 B^{uv}_{ij}=H_{ij}H_{uj}H_{iv}H_{uv}.
$$
Signs cancel from this expression, and equality of the normalized matrices under two permutations is also sufficient to lift them to a signed equivalence. Color row and column vertices separately. On each side additionally distinguish the anchor, the remaining three members of its quartet, the other quartet, and the ordinary vertices. The two column quartets here mean the two minority supports.

The [base verifier](aut.cpp) uses the negative entries of $B^{uv}$ as the edges of a bipartite graph. It refines the colors by counting neighbors in each color and stops a branch if two graphs have differing signature multiplicities. Otherwise it individualizes a source point in the smallest remaining nonsingleton color and tries each possible target of that color. A discrete assignment is checked against every entry of the normalized matrices. The program counts every map for the first anchor image. For other images it suffices to determine existence. Only the original pair is attainable. Its stabilizer has exactly 19 elements. The 19 simultaneous $K$-multipliers supply them all. This gives the base result independently of the design theorem used below.

## A uniform finite certificate

On each side there are eight distinguished indices and 72 orbits of ordinary coordinates under the known simultaneous $K$-action. The ordinary orbits are indexed by field block $b$ and character class $e\bmod18$ and each has size $m=(Q-1)/18$. Colors start as above. There is no assumption that an arbitrary automorphism normalizes $K$. Each coloring in the computation is constant on $K$-orbits because $K$ fixes both anchors. The computation only uses the orbits to evaluate the following intrinsic refinement.

For each vertex and each current opposite color, take the signed sum of normalized entries over the entire color. Record these sums modulo 37 together with the old color. If the vertex is distinguished and the opposite color consists of ordinary vertices, first divide the integer sum by $m$. The division is exact because the entry is constant on each opposite $K$-orbit. It depends only on the two intrinsic vertex types and the common integer $m$, so it commutes with every possible equivalence. The initial colors distinguish the vertex types, a property preserved by refinement. Exact multiplicities of each new color are tested by counting the orbits with that color, since they have equal sizes within any one color.

For two ordinary orbits let $e$ be the source class and $h$ the target class. The coordinate in a core entry can be written as $o(y-u)$, where $o=\pm1$ and $u=x$ on the diagonal and $u=-x$ elsewhere. Write $c$ for the class of $u$, and put $s=0$ if $o=1$ and $s=9$ otherwise. The unnormalized signed row sum, up to the displayed sign of the core block, is
$$
 [c=h]+\sum_{t=0}^{17}T_d(h-c,t)f_l(C_{c+9+s+t}).
$$
This follows by setting $z=y/u$ and including $y=u$ separately. The reverse sum agrees by double counting, since the two orbits have equal sizes. The anchor normalization is constant on an orbit rectangle. When one orbit is a singleton the signed entries there are constant and can be read directly from the array.

The [tower verifier](orbits.cjs) starts from the base field multiplication table and computes $T_d\bmod37$ by Jacobi lifting and Fourier inversion as in the construction. The result only depends on the positive odd degree $d\bmod36$. At degree one the verifier checks every row and column orbit sum independently by direct field arithmetic. It compares all 32 possible anchor images in every odd residue. The surviving pairs and the induced images of classes 0, 1, 2 of field row block 0 are identical in each degree.

| Anchor row | Anchor column | Images of classes 0, 1, 2 |
|---:|---:|:---|
| 0 | 0 | 0, 1, 2 |
| 1 | 3 | 12, 7, 14 |
| 3 | 2 | 15, 4, 17 |

For each surviving pair the final coloring has 160 colors, one per orbit on the two sides. Matching these colors specifies the target orbit for every source orbit. The verifier checks that the four field blocks on each side are carried to field blocks, that their zeros match, and that all four positions occupied by the Paley mask map to positions occupied by the same mask. For anchor $(0,0)$ it checks that all 160 orbit labels are fixed.

## The full group

Both surviving anchors of every potential automorphism are border indices, including the distinguished source pair. Consequently the original row signs are constant within each field row block, and the original column signs are constant within each field column block. This follows directly by comparing entries at the border anchor column and row. The action on each designated Paley position therefore preserves the smaller of the two sign fibers. For a fixed row this is a translate of one of the two quadratic classes and has $(Q-1)/2$ members. After changing signs of the row and column coordinates if necessary, this incidence relation is $y-x\in (E^\times)^2$. Negation exchanges the two quadratic classes because $Q\equiv3\pmod4$.

Kantor's theorem on the Paley design implies that both coordinate permutations of such an isomorphism are semiaffine. In the standard coordinates, his Corollary 8.2 explicitly treats independent point and block permutations. Conjugating the source and target coordinates by negations leaves the maps semiaffine. All eight maps send zero to zero by the orbit calculation. They thus have the form $x\mapsto a x^{7^j}$, inducing an affine map $e\mapsto c+7^j e\pmod{18}$ of the character classes. Neither of the two nonidentity triples in the table is an arithmetic progression modulo 18. This leaves only the original anchor pair. [Kantor, *2-transitive symmetric designs*, Theorem 8.1 and Corollary 8.2, p. 20](https://pages.uoregon.edu/~kantor/PAPERS/2traSymDes.pdf#page=20)

Every index orbit on each side is now fixed as a set. As $e=0,1$ are fixed, the scalar phase $c$ is 0 and $7^j\equiv1\pmod{18}$, so $3\mid j$. In particular each of the eight additive coordinate maps preserves all four masks. In fact the only signs are the simultaneous global signs. The anchor comparison forces this because each field block and border index is fixed, so every entry on the anchored border row and column is preserved before introducing row or column signs.

It remains to prove that these eight maps all agree. In any block write the mask as $g(y+\epsilon x)$ with $\epsilon\in\{-1,1\}$, absorbing both the argument orientation and the outside sign into $g$. For a row map $A$ and column map $B$, preservation gives
$$
 g(y+\epsilon x)=g(B(y)+\epsilon A(x))=g(y+\epsilon B^{-1}A(x)).
$$
The second equality uses additivity of $B$ and preservation of $g$. The sum of $g$ on the field is $1$ or $-1$, so it has no nonzero additive period. Such a period would partition the field into orbits of size seven and force divisibility by seven. Therefore $B^{-1}A(x)=x$ for every $x$. Every row block meets every column block, which identifies all eight maps. Conversely each claimed map is additive, preserves the multiplicative classes, and commutes with negation, so it preserves each array entry. The scalar subgroup is cyclic of order $(Q-1)/18$ and the relative Galois group acts on it by the 343rd power.

## Reproduction

From this directory run the following commands. The scripts need no third-party packages.

```sh
clang++ -O3 -std=c++17 aut.cpp -o /tmp/jacobi-aut
/tmp/jacobi-aut
node orbits.cjs
```

The [base output](group-output.txt) and [18 residue outputs](orbits-output.txt) are included.

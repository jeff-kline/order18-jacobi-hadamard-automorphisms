# How many completed matrices does the construction give?

Fix the norm character of the original characteristic-7 construction. Write $Q=343^d$ with $d$ positive and odd. Use either displayed mask system, permute its four masks, reverse any subset of their arguments, and optionally transpose the resulting matrix. Under independent signed row and column permutations, these operations give **exactly sixteen equivalence classes when $3$ does not divide $d$**. When $3$ divides $d$, the number is either fourteen or sixteen. In particular the order-1,376 construction gives sixteen classes. If transposition itself is added to the equivalence relation, these counts are halved.

For the broader construction over $Q=p^{3d}$ with $p$ prime congruent to 7 or 31 modulo 36, the two systems, single reversals, and transposes give **at least eight** classes at each order $4(Q+1)$, for every fixed primitive character. All orders here are known Hadamard orders. The counts refer only to the matrices produced by these operations. [Uniform eight-class theorem](../algebra/uniform-placements.md)

## Proof of the characteristic-7 count

The first system contributes exactly eight. For each system the $384=24\cdot16$ placements fall into four classes of 96 when the border is marked, one for each permutation and reversal parity. Forgetting the mark can merge classes. The closed row and column quartet counts separate the reversal parities and the two transpose choices. The first system has effective group order $L=d(Q-1)/18$ in all its placements, while every placement of the second has at least $3L$ effective automorphisms. For the second system its two odd-reversal permutation parities are distinct even with the border forgotten. Thus only its two even-reversal representatives can still merge. Their transposes merge exactly when they do. [First system classification](../algebra/placements.md) · [Second system odd placements](odd-placements.md) · [Both marked classifications](../algebra/placements.cjs)

Compare the even representatives of the second system with mask orders $(A,B,C,D)$ and $(A,B,D,C)$. For either matrix, the only row quartets with at most four minority columns are the four border rows and the four field-zero rows. Their minority supports are the disjoint sets of border and field-zero columns. This holds at $Q=343$ by direct pair-product enumeration, and at larger $Q$ because permuting the masks preserves the mean and Fourier support bounds in the quartet proof. [Base quartet certificate](base-quartets.cjs) · [Uniform bounds](theorem.md)

Discard the eight identified columns. Group the remaining columns by their sign pattern on the eight distinguished rows, up to negating all eight signs. For both representatives there are 24 cells, each comprising three of the eighteen multiplicative classes inside one column block. Each choice of distinguished row quartet partitions those cells into four groups of six by its four-entry projective pattern. These statements follow by evaluating the displayed masks on the 72 block/class pairs.

For any remaining row $r$ and any of the 24 cells $C$, select an anchor $s$ among the eight distinguished rows. Compute the residue of $\sum_{c\in C} H_{rc}H_{sc}$ modulo 19 and fold it up to sign into $\{0,\ldots,9\}$. Any two anchors are proportional on a cell. Column signs cancel and changing row signs only changes the overall sign. For each candidate quartet, each of its four groups, and each remaining row, sort the six folded values. For a given six-tuple take the unordered pair of its occurrence counts for the two quartet choices. This is intrinsic even when an equivalence exchanges the quartets. Each count is a multiple of $(Q-1)/18$, since scalar multiplication by an eighteenth power acts transitively on each row class.

The characteristic-7 lift computes these residues for every odd $d$ from the base table $T(i,j)$ counting $z\in C_i$ with $1-z\in C_j$. Modulo 19 the table at $d$ equals the $d$-fold cyclic convolution of $T$ plus the constant $(343^d-2-341^d)/324$. The elementary proof of this lifting identity appears in the recognition note. Both $324$ and the character-table determinant are units modulo 19. The finite verifier checks return of the table and the two scalar powers after advancing the nine positive odd residues modulo 18. It also checks the base cell sums directly from field entries. Thus the following finite check covers every odd degree. [Lifting proof](../../research-directions-2026-11-17/jacobi-proof.md) · [Exact histogram verifier](even-frames.cjs)

The last two columns give the counts after division by $(Q-1)/18$.

| $d$ modulo 18 | Six-tuple | Original order | Swapped order |
|---|---|---|---|
| 1 | $(1,5,5,5,7,7)$ | $72,72$ | $0,72$ |
| 5 | $(1,1,1,3,6,8)$ | $72,144$ | $72,72$ |
| 7 | $(1,3,3,4,4,7)$ | $0,0$ | $0,72$ |
| 11 | $(1,3,3,4,4,7)$ | $0,72$ | $0,0$ |
| 13 | $(1,1,1,3,6,8)$ | $72,72$ | $72,144$ |
| 17 | $(1,5,5,5,7,7)$ | $0,72$ | $72,72$ |

Each witness separates the two even representatives and hence their transposes. At residues 3, 9 and 15 the test finds equal count pairs for every six-tuple. Equivalence at these degrees remains open. The fourteen-class lower bound already holds there by the odd-placement argument.

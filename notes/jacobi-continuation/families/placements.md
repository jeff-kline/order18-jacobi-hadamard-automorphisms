# Four classes from the second family

Use the notation of the [two-family theorem](theorem.md). For every admissible $Q$, form $H_0$ from the displayed second triple in its displayed order. Form $H_1$ by reversing only its first mask, replacing $f(x)$ by $f(-x)$. This leaves $f(0)=1$ and preserves every additive autocorrelation. Both are skew Hadamard matrices.

**Proposition.** The four matrices $H_0,H_1,H_0^T,H_1^T$ are pairwise inequivalent under independent signed row and column permutations. On the characteristic-7 tower all four lie outside the eight classes already obtained from the first triple. Thus there are at least twelve classes at each order $4(343^d+1)$ for $d$ positive and odd.

For $H_1$, reversal negates one mask on nonzero entries. The absolute means and Fourier support bounds used in the quartet proof are unchanged. At $Q>343$ the same Weil bounds give only the border quartet and the zero quartet among row quartets with at most four exceptions. At $Q=343$ exact pair-product enumeration gives the same result. Both character orientations have been checked. For the border quartet the four minority columns are the border columns. For the zero quartet the pointwise product is $+1$ on border columns and $-1$ on zero columns. Its value away from those eight columns is $+1$ in $H_0$ and $-1$ in $H_1$. Consequently its four minority columns are the zero columns in $H_0$ and the border columns in $H_1$.

A closed quartet has constant pointwise product. In a skew Hadamard matrix, the product of four columns with index set $S$ changes sign exactly at the four indices in $S$ upon passage to the corresponding row product. Off those four indices transposition changes all four factors, while on any one of them it changes three. A closed column quartet thus corresponds exactly to a row quartet whose minority set equals that quartet's own index set in the skew presentation. There are no closed row quartets in either matrix. There are exactly two closed column quartets in $H_0$ and exactly one in $H_1$. The ordered numbers of closed row and column quartets are therefore $(0,2),(0,1),(2,0),(1,0)$ for the four matrices, respectively. The counts are invariant under ordinary Hadamard equivalence.

Let $K=(\mathbb F_Q^*)^{18}$. The template enumeration gives at least $3d|K|$ effective automorphisms of both untransposed matrices. For $H_0$ the class shifts are $0,3,6$. For $H_1$ they are $0,12,15$. All three use a Frobenius exponent divisible by three. The certificate gives a signed border and block permutation and eight coordinate signs for each survivor. Substitution in the array verifies equality for all 18 nonzero classes and at each zero argument. The scalar and Frobenius exponent can then be chosen independently within the prescribed classes. This count needs no converse classification of the automorphisms of $H_1$. Transposition preserves effective automorphism group order. All eight matrices in the earlier [characteristic-7 placement classification](../algebra/placements.md) have full effective group order $d|K|$, separating all four matrices here from those eight.

The exact checks use Node.js without packages. The base code checks both the two exceptional row index sets and their minority columns. The last argument 1 reverses the first mask.

    node base-quartets.cjs second forward 1
    node base-quartets.cjs second inverse 1
    node second-skeleton.cjs 0
    node second-skeleton.cjs 1

Twelve is a lower bound on the number of ordinary classes at each of these known orders. Equivalence of the second family's two positive reversal-parity representatives under an interchange of the two exceptional quartets is unresolved.

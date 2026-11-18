# Eight equivalence classes from the placed Jacobi masks

Let $E=\mathbb F_Q$ with $Q=343^d$ and $d$ positive and odd. Use the four masks $A,B,C,D$ and the bordered array of the order-18 construction, with $D$ the Paley mask. Let $K$ be the kernel of the order-18 character defined by the norm to $\mathbb F_{343}$. The border-frame recognition and synchronization proofs for the original placement appear in [the companion rigidity note](rigidity.md).

Permute the four masks among the array positions and independently replace any mask $f(z)$ by $f(-z)$. These operations preserve the sum of the four autocorrelations and hence yield skew Hadamard matrices. The 384 resulting matrices comprise exactly four ordinary equivalence classes. Two placed matrices are equivalent exactly when their placement permutations have the same parity and their numbers of reversals have the same parity. Each equivalence class contains 96 placements. All four classes have effective automorphism group $K\rtimes\operatorname{Gal}(E/\mathbb F_{343})$. Taking transposes brings the count to exactly eight classes.

The four representatives are $(A,B,C,D)$, $(A^{\rm rev},B,C,D)$, $(A,B,D,C)$, and $(A^{\rm rev},B,D,C)$. The finite transporter calculation first establishes positive equivalences taking every placement to a representative. This part only needs the explicit formula of the array. A normalized transporter consists of the same 48 possibilities for the eight border and block labels and signs, a norm class $a\bmod18$, and a Frobenius power $k\bmod3$. The zero-zero entries force the matrix-entry signs to cancel the two overall signs of the corresponding core cells. For each remaining cell, therefore, equality for all nonzero entries is exactly equality between two signed masks under the corresponding affine permutation of the 18 class indices. A surviving transporter is realized over every tower field by choosing a scalar of norm class $a$ and applying the $7^k$ power map. For each source placement the set of all reachable targets is its 96-element parity class. In each case exactly one normalized template transports the source to itself.

To exclude additional equivalences it now suffices to work with the four representatives. At $d\ge3$ the preceding character bound excluding other exceptional row quartets works without change. A mask reversal multiplies its signs away from its origin by $-1$. Products of one through three distinct masks are therefore still nonconstant. At the base field the pair-product search gives the same two exceptional quartets for all four representatives. For either reversal parity the border marking has minority set equal to the four border columns. The zero marking has minority set equal to the zero columns for even parity and to the border columns for odd parity. The zero-row product is $+1$ on border columns and $-1$ on zero columns. It has the uniform sign $(-1)^{\#\mathrm{reversals}}$ on every nonzero field column.

In all four representatives the border frame gives exactly four Paley submatrices and the zero frame gives none. The 18-degree residue test uses the actual minority columns of the chosen quartet. In particular, for the odd zero marking the rows outside the quartet are grouped by their four border-column entries. The columns outside the border are grouped by their four zero-row entries. Each such column cell contains exactly one zero column and 18 nonzero class atoms, while each row cell contains one border row and the nonzero field rows of one true block. In both parities the same base direct-entry check verifies the restricted scalar products. This proves that the original border frame must be carried to the original border frame.

With odd reversal parity the zero columns cease to be the minority set of an exceptional row quartet. They are still fixed as a set. Each normalized Paley block gives a design isomorphism with affine semilinear point and block permutations, after the elementary coordinate reflections. Its overall sign is determined by its row sum, of magnitude one. Because the zero rows are already marked, the translation in the paired design maps vanishes. Alternatively, the cubic graph gives affine maps on the original column blocks even before their origins are known. Every row at field coordinate zero sums to $\pm1$ on each block and its signed first moment $\sum_y yH_{(i,0),(j,y)}$ vanishes in $E$, by invariance under an order-19 scalar. An affine additive map on the column coordinates carries a zero first moment to the translation times that nonzero block sum. The marked zero row at its target has zero first moment, hence that translation must vanish. This puts all potential equivalences between representatives into the finite calculation above.

For even reversal parity the number of closed column quartets is two; for odd parity it is one. Both parities have zero closed row quartets. Each transposed class therefore differs from all four original classes, and the four transposes differ from each other by transposing back.

The finite checks can be run from this directory with Node. The placement string names the masks by their original zero-based indices, and the integer is the reversal bitmask on the four positions.

    node placements.cjs
    node frame.cjs 0 0123
    node frame.cjs 1 0123
    node frame.cjs 0 0132
    node frame.cjs 1 0132
    node flip-quartets.cjs 0123 2
    node flip-quartets.cjs 0132 2

For a specific transporter use the next command, in which each digit is twice the input mask index plus its reversal bit. It prints the row and column permutations, matrix-entry signs, coordinate signs, scalar norm class and Frobenius power. A null witness certifies that the pair is inequivalent.

    node placements.cjs 0246 1346

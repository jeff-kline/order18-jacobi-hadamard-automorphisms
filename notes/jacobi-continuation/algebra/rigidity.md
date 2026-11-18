# The automorphism group of the completed Jacobi tower

Let $Q=343^d$ for positive odd $d$, let $E=\mathbb F_Q$, and write $j(x)$ for the logarithm modulo 18 of the norm of $x\ne0$ to $\mathbb F_{343}$, using the base generator of the construction. Write $K=\{a\in E^*:j(a)=0\}$. Assume the previous theorem that the only near-constant row quartets are the four border rows and the four zero rows, and that their four minority columns are, respectively, the border and zero columns. Under this hypothesis the full effective ordinary automorphism group of the matrix is
$$
 K\rtimes\operatorname{Gal}(E/\mathbb F_{343}).
$$
The group acts by the same coordinate map on all eight field copies and fixes each border index. Its order is $d(Q-1)/18$. For pairs of signed permutations before quotienting by simultaneous negation, take the direct product with $C_2$.

## Identifying the frame

There is also an immediate distinction between rows and columns. For any four indices $T$ in a skew Hadamard matrix, the product of the corresponding columns agrees with the product of the corresponding rows off $T$ and has opposite sign on $T$. At an index in $T$ exactly three of the four factors change sign under transposition. Consequently a closed column quartet gives a row quartet whose minority set is exactly $T$. The preceding quartet classification proves that there are exactly two closed column quartets and zero closed row quartets. In particular the completed matrix is inequivalent to its transpose and to every symmetric Hadamard matrix under ordinary equivalence.

For a marked exceptional quartet $S$ and its four minority columns $T$, discard $S$ from the row set and $T$ from the column set. Partition the remaining rows by their signs on $T$, up to negation, and partition the remaining columns by their signs on $S$, up to negation. These partitions are intrinsic under independent signed permutations. Each has four parts of size $Q$ for either candidate. With the border marking these are the original field blocks. With the zero marking each part contains one border index and 18 class atoms of size $(Q-1)/18$. The assertion about the false marking follows by evaluating the four signs on the 72 block-class pairs as in `frame.cjs`. Deleting the marked rows and columns matters. A transposed quartet need not have the same minority count.

In any of the 16 induced submatrices, test whether every two distinct rows have absolute scalar product 1, restricted to its $Q$ columns. Independent signs and permutations preserve this predicate. The four true Paley submatrices pass, by the quadratic character correlation. As an elementary calculation, the zero-normalized quadratic character $\eta$ satisfies $\sum_y\eta(y)\eta(y-x)=-1$ for $x\ne0$, by the bijection $y\mapsto y/(y-x)$ from $E\setminus\{x\}$ onto $E\setminus\{1\}$. Replacing $\eta(0)=0$ by 1 adds $\eta(x)+\eta(-x)=0$. The other 12 true submatrices and all 16 submatrices of the zero marking fail. Thus the border and all four Paley locations are recognized under ordinary equivalence.

The negative tests use the same 18 odd residue classes of $d\bmod36$ and the same lifted cyclotomic table modulo 37 as the previous note. The script computes, for the three original non-Paley masks, a shift whose folded autocorrelation differs from 1. For each of the false submatrices it pairs the original border row in that row part with an ordinary row in the same part. It checks the 18 possible block-class pairs of ordinary rows and finds a folded restricted scalar product differing from 1. For a pair involving border row $a$, ordinary row $(b,x)$, and false column part containing original border column $c$, the border contribution is $L_{ac}(-U_{cb})$. On true field column block $h$ the contribution is $U_{ah}$ times the sum of the ordinary row over the class atoms belonging to the false part. The script verifies every tested residue at $d=1$ by direct summation of matrix entries.

## From the Paley blocks to additive coordinates

Once the border sets are known, the field row and column blocks are known. The zero quartet and its minority columns mark the zero of each of these blocks. All row signs in a field row block are the same under an ordinary automorphism, by evaluating at a fixed border column and its image. All column signs in a field column block are the same by the transposed observation. In each Paley submatrix the constant entry sign in the defining formula is fixed up to these two signs, as seen at the zero-zero entry. After changing the signs of the two *field coordinates* as prescribed by the source and target blocks, the two permutations thus induce an ordinary bipartite automorphism of the translates of the nonzero quadratic residues. The negative entries of the normalized Paley mask pick out the nonsquares, which are a scalar multiple of the squares. The negative-entry incidence relation gives the claimed design after this coordinate choice.

Kantor identifies its full point action as the maps $x\mapsto ax^{7^t}+b$ with $a$ a nonzero square, for $Q>11$. In the same coordinates a block labeled by a translate is taken to the block with its translate label transformed by this same affine semilinear map. Translate labels are unique since the block size $(Q-1)/2$ is prime to 7. Every geometric row and column block belongs to a Paley submatrix, so all eight coordinate permutations are affine semilinear. They fix zero and are therefore additive. This argument works for distinct permutations of rows and columns. [Kantor, *Automorphism Groups of Hadamard Matrices*, Theorem 6 and its proof](https://pages.uoregon.edu/kantor/PAPERS/AutHadMat.pdf)

The fourth-mask design can also be bypassed. For a pair of rows in one geometric block take the four absolute scalar products restricted to the original column blocks and fold them modulo 37. The four coordinates are permuted in the same way for all pairs. Every autocorrelation is even in the shift. For all odd residues of $d$ the ordered vector of mask autocorrelations induces these color classes of the nonzero difference index modulo 9,
$$
 \{0,5\},\quad\{1\},\quad\{2,6\},\quad\{3,8\},\quad\{4\},\quad\{7\}.
$$
The script checks these equalities in the residue space itself. The three colors of valency $(Q-1)/9$ recover one scaled cubic-residue graph on each geometric block of rows. The identical argument works on columns. A cubic-graph rigidity theorem then suffices to prove semilinearity.

## Synchronizing the eight maps

In a core cell write the argument of its mask as $h_{ij}(y+t_{ij}x)$, with $h_{ij}=\pm1$, and $t_{ij}=-1$ on the diagonal, $+1$ off it. Every mask $f$, including its value 1 at the origin, sums to 1 over $E$. A nonzero additive period would split the field into seven-element orbits and make that sum divisible by 7. Hence its additive period group is trivial.

Write $P_i$ and $S_j$ for the additive maps on row and column coordinates in a prospective automorphism, and let $r,c$ be its permutations of their four blocks. Hold $z=y+t_{ij}x$ fixed and vary $x$. In the target the argument runs over
$$
 h_{r(i),c(j)}\big(S_j(z)+(t_{r(i),c(j)}P_i-t_{ij}S_j)(x)\big).
$$
The source entry is constant in $x$ and the two entry signs are constant. Since $z$ ranges over $E$ and $S_j$ is bijective, every difference in the image of the displayed additive operator is a period of the target mask. Hence $t_{r(i),c(j)}P_i=t_{ij}S_j$. Thus all eight maps are one common $M:x\mapsto ax^{7^t}$, each multiplied by a fixed coordinate sign.

## The finite calculation and descent

The verifier `skeleton.cjs` normalizes the first border row sign and the coordinate sign on field row block zero to $+1$. It enumerates the $24^4$ permutations of border rows, field row blocks, border columns and field column blocks. In the eight-by-eight submatrix of borders and zeros, the first row and column force all eight row signs and column signs. Exactly 96 candidates preserve this signed corner. The preceding $t$-constraint first forces the field column signs from the coordinate sign on field row block zero, then forces the field row signs from the first column. It leaves 48 candidates. Here these are signs acting on field coordinates, distinct from signs multiplying matrix entries.

For a nonzero field element $z$,
$$
 j(Mz)=j(a)+7^t j(z)\pmod {18}.
$$
All 18 values $j(z)$ occur, and $7^t\bmod18$ depends only on $t\bmod3$. For each of the 48 candidates the verifier tries every one of the 54 class actions and checks every mask in all 16 cells. The sole survivor fixes the eight row and column labels, uses positive entry signs and positive coordinate signs, has $j(a)=0$, and has $t\equiv0\pmod3$. The class calculation is valid even when $3\mid d$, since it uses the *surjective extension norm* and the action on its labels directly. Restriction to the embedded base field would lose information in those degrees. Conversely every such map preserves the array entrywise and fixes the borders. Undoing the two normalizations gives only the central simultaneous sign and the already included choice of $M$ with its specified sign.

The same calculation on all signed placements gives four classes and another four on transposition. [Classification of the 384 placements](placements.md)

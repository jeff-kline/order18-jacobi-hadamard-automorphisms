# Eight ordinary classes at every admissible prime and odd lift

Let $p$ be a prime congruent to $7$ or $31$ modulo $36$, let $d$ be positive and odd, and set $Q=p^{3d}$. Fix one primitive order-18 multiplicative character of $\mathbb F_Q$. For each of the two explicit systems I and II take its original placement, the placement with its first mask reversed, and the transpose of each of these matrices. **The resulting eight matrices are pairwise inequivalent under independent signed permutations of rows and columns.** This gives at least eight ordinary classes at each order $4(Q+1)$ in this family. The statement holds for every choice of primitive character separately. [Mask definitions and uniform Gauss-sum theorem](../families/theorem.md)

Write $L=d(Q-1)/18$. Denote the border rows by $B$ and the four field-zero rows by $Z$. Count a quartet as exceptional when its row product has at most four minority columns. Count it as closed when it has none.

| System and reversal | Closed row quartets | Closed column quartets | Effective automorphism order |
|---|---:|---:|---|
| I, original | 0 | 2 | $L$ or $2L$ |
| I, first reversed | 0 | 1 | $L$ or $2L$ |
| II, original | 0 | 2 | $3L$ or $6L$ |
| II, first reversed | 0 | 1 | $3L$ or $6L$ |

Transposition exchanges the two quartet counts and preserves the group order. Thus the displayed facts separate all eight matrices.

### Exceptional quartets

Reversing a mask replaces its nonzero signs by their negatives, fixes its origin value of $1$, and preserves its autocorrelation by the evenness of autocorrelation. The Gram-block verification is unchanged. In each system the four unaltered masks multiply to $1$ off zero, every proper nonempty subset product has mean of absolute value at most $1/3$, and each single mask has Fourier support at most seven. These last two bounds survive arbitrary reversals. For four distinct centers in a field column block, the zero Fourier term vanishes and the absolute block sum is at most $49(3\sqrt Q+4)+4$. With at most three centers, one bearing a proper nonempty subset, the bound is $Q/3+27(2\sqrt Q+3)+3$. Here each factor grouped at one center has a fixed parity under $j\mapsto j+9$, so its normalized Fourier norm is at most $3$. Both bounds are smaller than $Q-8$ at $Q=31^3$ and at every larger field size. The center-alignment argument leaves just $B$ and $Z$. For the only smaller field, $Q=343$, exhaustive pair-product tests cover both systems, both reversals, and both character orientations modulo Frobenius. [Character bounds and base checks](../families/theorem.md) · [Base verifier](../families/base-quartets.cjs)

The minority columns of $B$ are its four border columns. The minority columns of $Z$ are the zero columns in the original array and the border columns after one reversal. Both quartets have exactly four minorities. In a skew matrix, for a set of four indices the column product agrees with the row product away from those indices and has the opposite sign on them. Hence a closed column quartet is exactly a row quartet whose minority set equals its own four indices. This proves the two count columns of the table.

### Effective automorphism orders

Fix $B$ as a set. Its minority columns and the other exceptional row quartet $Z$ are then fixed as sets. Projective signs against the border on the opposite side distinguish the four field blocks, with the border indices themselves omitted. There is one marked zero row per field row block. Row signs are constant on each such block by evaluation at one border column, and dually for column signs.

The four genuine Paley blocks are recognized inside this marked frame. All their row-pair correlations have absolute value $1$. Each remaining mask has the three autocorrelations $-1,-1+t,-1-t$ with $t\ne0$; at least one has absolute value greater than $1$. The single reversal does not affect these values. Thus the marked automorphism sends Paley cells to Paley cells, one in each row block and one in each column block. In each Paley cell its overall sign correction is fixed by the row sum, which has absolute value $1$. Changing the prescribed signs of the field coordinates presents it as the design whose blocks are translates of the nonzero squares. Kantor's theorem for $Q>11$ gives semiaffine maps on the points and their translate labels. The zero row fixes the translation part and also sends the paired column origin to the column origin. This includes the case of independent permutations of rows and columns. [Kantor, *Automorphism Groups of Hadamard Matrices*, proof of Theorem 6](https://pages.uoregon.edu/kantor/PAPERS/AutHadMat.pdf)

One can also recover the column origins directly after semiaffinity. Every zero-row block mask $f$ satisfies $\sum_y f(y)=\pm1$ and $\sum_y yf(y)=0$ in $\mathbb F_Q$, since it is invariant under a nonidentity eighteenth-power scalar. A semiaffine column map with translation $b$ takes its first moment to $b\sum f$. The target is again a zero-row block, forcing $b=0$. This handles the odd reversal even though the four zero columns are no longer a minority set.

Every coordinate map is now additive. The fact that each mask sums to $1$ excludes nonzero additive periods in characteristic $p$. Holding $y+t_{ij}x$ fixed in each core cell, with $t_{ij}=-1$ on the diagonal and $+1$ off it, forces the eight coordinate maps to be a single $x\mapsto ax^{p^j}$ up to coordinate signs. The resulting finite equations use only the action of $p$ on the 18 class indices. Both $7$ and $13$ modulo $18$ generate the subgroup $\{1,7,13\}$. The class of $a$ has 18 possibilities, all realized for every primitive character.

For I the unique normalized template for each placement has multiplier class zero and $j=0\bmod3$. For II the three normalized templates have multiplier classes $0,3,6$ in the original and $0,12,15$ after first-mask reversal, all with $j=0\bmod3$. Every surviving template lifts to exactly $L$ effective signed-coordinate actions, with $d$ Frobenius powers and $(Q-1)/18$ actual scalars. The fixed-border subgroup therefore has order $L$ or $3L$ as indicated by the system. Its index is at most two because the pair of exceptional row quartets is intrinsic. [Synchronization and finite-template method](rigidity.md) · [System I verifier](skeleton.cjs) · [System II verifier](../families/second-skeleton.cjs)

### Placement parity and scope

For a **marked** border, the two permutation parities within the same reversal parity can be distinguished in both systems by checking all 48 compatible border/block actions and all 54 multiplier/Frobenius actions. This calculation applies uniformly. Forgetting the mark could identify the two placement classes by exchanging the border and zero quartets. The eight-class lower bound does not require a decision about that possibility. The additional characteristic-7 result for system I uses a separate finite field certificate to identify the border and prove eight classes for that system alone. [System I placements](placements.md) · [Complete marked comparison for either system](placements.cjs)

To reproduce the finite part, run the following from this directory. For each system, the generic permutation check gives four marked classes of 96. The base run covers both permutation parities, both reversal parities, and every primitive character modulo field Frobenius.

    node placements.cjs
    node placements.cjs --second
    for system in first second; do
      for direction in forward inverse; do
        for placement in 0123 0132; do
          node flip-quartets.cjs "$placement" 2 "$system" "$direction"
        done
      done
    done

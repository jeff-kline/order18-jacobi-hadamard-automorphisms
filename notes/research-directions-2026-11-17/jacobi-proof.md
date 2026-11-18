# How to recognize the completed order-18 Jacobi matrices

Research note, November 17, 2026. Ordinary Hadamard equivalence means independent signed row and column permutations. Let $q=343$, let $d$ be any positive odd integer, and put $Q=q^d$ and $N=4(Q+1)$.

**Theorem 1.** The explicit order-18 skew Hadamard matrix below is inequivalent to every Hadamard matrix in the same bordered Wallis–Whiteman array over the additive group of the same field whose four developed functions are constant on sextic multiplicative cosets. It is also inequivalent to the twice-skew-doubled Paley matrix over that field.

**Theorem 2.** Exactly two unordered sets of four distinct rows have pointwise product with at most four entries differing from a constant sign. Both have exactly four exceptional columns. Consequently the matrix is inequivalent to every nontrivial Kronecker product of real Hadamards and every standard skew doubling of a skew Hadamard.

The first theorem has an elementary proof with a finite integer certificate. The second proof uses the classical multiplicative-character Weil bound. The construction and the orders are already known. The claims here concern the completed matrices. The source paper distinguishes the three input sets under a smaller group of operations and specifically leaves equivalence after completion open. [Order-18 paper and release](https://github.com/jeff-kline/order18-jacobi-triples)

## 1. The array and its supply

Take $F=\mathbb F_7[t]/(t^3+t^2+1)$ and $g=t+2$. Number the multiplicative classes on $F^*$ by the discrete logarithm to $g$ modulo 18. On $E=\mathbb F_Q$, use the logarithm of the norm to $F$, modulo 18. Write $C_j$ for the resulting classes. The norm is onto and $d$ is odd, so $-C_j=C_{j+9}$. All class indices are modulo 18. Define four functions $f_l(0)=1$. On classes 0 through 8 their respective signs are

```text
+-------+
+--+---+-
+-+++-++-
+-+-+-+-+
```

Negate each sign on adding 9. The last function is the Paley sign. Put $A_l(x,y)=f_l(y-x)$, $R(x,y)=[x=-y]$, and write $A,B,C,D$ for the four developments in the given order. The matrix has four border indices and four copies of the field for rows and columns. Its border corner and upper-right block signs are

```text
L = + + + +        U = - - - -
    - + - +            - - + +
    - + + -            - + + -
    - - + +            - + - +
```

Each upper-right sign is repeated across its field block. The lower-left part is minus its transpose. The field-by-field core is

```text
 A       BR      CR      DR
-BR       A     -DᵀR     CᵀR
-CR      DᵀR     A      -BᵀR
-DR     -CᵀR    BᵀR      A
```

For reference, here is a short independent way to certify existence at *every* degree along with the inequivalence calculation. It also gives the reduction used in Section 3.

Let $T_d(i,j)$ count $z\in C_i$ with $1-z\in C_j$. Zero and one are omitted. Its Fourier coefficient $J_d(u,v)$ is the sum of $\chi^u(z)\chi^v(1-z)$ over the field, where the character records the class and even the trivial character is extended by zero at zero. At $(0,0)$ this coefficient is $Q-2$. At every other frequency,
$$
J_d(u,v)=(-1)^{d-1}J_1(u,v)^d.
$$
Give a monic polynomial $P$ over $F$ the weight $w(P)=\chi^u((-1)^{\deg P}P(0))\chi^v(P(1))$, using the base characters. The weight is multiplicative. The generating series $L(T)=\sum_P w(P)T^{\deg P}$ has constant coefficient 1 and linear coefficient $J_1(u,v)$. In every degree $m\ge2$, the two evaluations $P(0),P(1)$ occur in all possible pairs equally often, so that coefficient vanishes if either character is nontrivial. Unique factorization gives the Euler product for $L$. In $TL'/L$, a monic irreducible of degree $h\mid d$ contributes $h w(P)^{d/h}$ to degree $d$. This is precisely the sum over its $h$ roots in $E$ of their two norm-character weights. Thus the coefficient is $J_d$, and expansion of $TJ_1/(1+TJ_1)$ proves the identity. This is the classical Jacobi-sum lifting phenomenon. [Prior work on lifting cyclotomic numbers](https://arxiv.org/abs/2105.14872)

For an explicit existence certificate, set $W_e(i,j)=\sum_l f_l(C_{e+9+i})f_l(C_{e+j})$. Then $\sum_{i,j}T_d(i,j)W_e(i,j)$ is the sum of the four autocorrelations at a nonzero shift $x\in C_e$, by writing the two arguments as $-xz,x(1-z)$. The omitted values at 0 and 1 sum to zero by skewness. Each $W_e$ sums to zero. Write hats for the unnormalized positive-exponent Fourier transform on the pair of class indices. Fourier inversion gives
$$
324\langle T_d,W_e\rangle=\sum_{u,v}J_d(u,v)\widehat W_e(-u,-v)
$$
with the bracket denoting the entrywise dot product. Group $J_1(u,v)$ up to sign, in the integral basis $1,\zeta,\ldots,\zeta^5$, using $\zeta^6=\zeta^3-1$ for a primitive 18th root. Choose the sign of the first nonzero coefficient positive. For each $e=0,\ldots,17$, the sum of the corresponding *signed* weights $\widehat W_e(-u,-v)$ is $-1296$ for the group represented by 1, and zero for every other nonzero group. The verifier checks these finite identities. It enumerates the 341 base-field elements and evaluates the displayed sums by addition of six integer coefficients. The total-weight-zero observation removes the trivial frequency before it matters. For odd $d$ the sign factors out of the power, so the four autocorrelations sum to $-4$ at every nonzero shift. At shift zero they sum to $4Q$.

In the array, the developments commute, $RA_l=A_l^TR$, $A_l+A_l^T=2I$, and each row sum is 1. In the product of the core with its transpose the off-diagonal blocks cancel in pairs. Each diagonal block is $4(Q+1)I-4J$. The lower border contributes $4J$ on each diagonal block and zero elsewhere. The top block has Gram matrix $LL^T+QUU^T=4(Q+1)I$. The mixed products vanish by the displayed signs and the row sums. The transposed off-diagonal core blocks have opposite signs. This proves $HH^T=NI$ and $H+H^T=2I$.

## 2. Removing the marked rows from the invariant

Mark any eight rows $S$. Partition the columns by their sign vector on $S$, identifying a vector with its negative. For a cell $C$, a row $r\notin S$, and any anchor $s\in S$, measure
$$
  h(r,C)=\left|\sum_{j\in C} H_{rj}H_{sj}\right|.
$$
The value is independent of the anchor because the ratio of two anchor entries is constant within the cell. Column signs cancel. Row signs, row permutations and column permutations preserve the sizes and absolute correlations of the corresponding cells. Thus the number of eight-row sets satisfying any given predicate in these quantities is an ordinary matrix invariant.

Take a scalar of order 19 in the multiplicative group of $F$. It acts on all four copies of $E$ by multiplication. It fixes the four border and four zero indices, and every other index lies on a 19-cycle. Its norm has order dividing 19, so the class character of order 18 is trivial there. The same scalar preserves every sextic mask. The action is a simultaneous row and column permutation in both matrices. Since $8<19$, the only eight-row set it fixes is exactly the set $S_0$ of eight fixed rows. Hence the total count of qualifying markings is 1 or 0 modulo 19 according as $S_0$ qualifies or fails. This step allows an arbitrary equivalence to move the border and avoids any assumption about uniqueness or conjugacy of automorphism subgroups.

## 3. Distinguishing the sextic matrices

Put $m=(Q-1)/6$. At $S_0$ of the order-18 array, there are eight singleton cells and 24 cells of size $m$. This partition is independent of $d$, because entries on a multiplicative class are specified by the same 18 signs. In field column block zero, the six cells of size $m$ are the unions of the index-18 classes

```text
{0,10,14}   {1,5,9}   {2,4,6}   {3,7,17}   {8,12,16}   {11,13,15}.
```

The verifier forms all the column labels directly from $L,U$ and the four zero rows, including all eight exceptional columns.

For a comparator, take any four sign functions constant on the sextic cosets. If the completed matrix is Hadamard, those four masks are balanced. Indeed, testing the first diagonal core Gram block $4(Q+1)I-4J$ on the all-ones vector gives $\sum_l \sigma_l^2=4$ for their four odd row sums. Each has magnitude 1, which forces three positive and three negative sextic classes since $m>2$. Normalize a single function's zero value to 1 by a global sign when computing its absolute local correlation. This leaves 20 possible masks and allows non-skew choices as well.

Every sextic cell of size $m$ at $S_0$ consists of exactly one whole sextic coset in one field column block. It is a union of such cosets and at most eight exceptional columns, with $m>8$. Choose a border-row anchor, which is constant on that coset. Thus every possible absolute correlation has the form
$$
  \left|\sum_{y\in C_B} f(y-x)\right|,\qquad
  C_B=\bigcup_{b\in B}C_b,\quad B=\{j,j+6,j+12\},\quad x\ne 0,
$$
allowing all 20 balanced sextic masks. Signs in the array, negations of an argument and transposes are absorbed by a change of coset, a change of $x$, or reflection of the mask. Six classes of $x$ suffice for a sextic mask. Simultaneously scaling $x$ and $y$ by a sextic power preserves its coset and the summand. For the order-18 array we need only $f_1$ from the diagonal block and the six explicit triples above.

Work in $\mathbb F_{37}$, which contains the 18th roots and $324$ is invertible. The table $T_d$, for odd $d$, is the $d$-fold circular convolution of $T_1$ on $(\mathbb Z/18)^2$, plus the constant table with entry
$$
 \bigl(343^d-2-341^d\bigr)/324 .
$$
This follows by comparing Fourier coefficients using Section 1. Every nonzero field element has 36th power 1 and zero raised to a positive power is always zero. The result therefore depends only on $d\bmod36$. For $x\in C_e$, the signed cell sum is explicitly
$$
 \sum_{b\in B}\left([b=e]+\sum_{j=0}^{17}T_d(b-e,j)f(C_{e+9+j})\right).
$$
The indicator restores the term at $y=x$. Fold a residue $a$ modulo 37 to the smaller of its two representatives $a,-a$ in $0,\ldots,36$. For degrees $1,3,\ldots,35$ in order, a folded residue attained by the order-18 matrix and absent from **all 20** sextic masks is

```text
13  2  2  0  0  3  0  2  2  11  2  3  0  0  0  0  2  3
```

For example, at $d=1$ use $e=4,B=\{1,5,9\}$, whose residue is 13. The complete sextic set is $\{1,3,5,7,9,11,18\}$. The verifier emits the witness and competing set for every residue class. The predicate in Section 2 is **existence** of a size-$m$ cell and an outside row with the indicated folded correlation. Its counts differ modulo 19. This proves the sextic assertion.

The standard Paley matrix of order $Q+1$ is indexed by $E\cup\{\infty\}$ and admits multiplication by every nonzero square as a simultaneous row and column permutation. This follows immediately from its quadratic-character entries on differences and constant border. The standard skew doubling $D(K)$ has block rows $(K,K)$ and $(-K^T,K^T)$, so this permutation action persists through two doublings. All square multipliers fix the eight distinguished rows of the doubled array pointwise. Their column orbits have size $(Q-1)/2$, apart from eight fixed columns. No union of such orbits can have size $m$, since $8<m<(Q-1)/2$. Apply Section 2 with the predicate requiring only a cell of size $m$. This completes the elementary proof of Theorem 1. [Standard doubling formula](https://arxiv.org/pdf/2011.06141)

## 4. The two exceptional quartets

For four rows, the minimum of the numbers of plus and minus signs in their coordinatewise product is invariant under ordinary equivalence. Consider $Q\ge 343^3=40{,}353{,}607$, the second tower field size. On field column block $c$, an interior row from block $b$, coordinate $x$, has a fixed sign times one mask evaluated at $y-a$, away from its center $a$. The center is $x$ when $b=c$ and $-x$ otherwise, by the displayed core and skewness. For fixed $c$ the four row-block types use the four different masks. Rows meeting at the same center must have different types, since two rows of the same type and center would coincide.

A product of one, two or three distinct masks is nonconstant on the 18 classes. The four masks multiply to 1, each is nonconstant and no two agree up to sign, as checked on the nine displayed signs. A border row is constant on the block. It follows that with one, two or three interior rows there is a nonconstant factor at some center. With four interior rows, avoiding a nonconstant factor in every block requires one row of each type and all their centers equal within each block. In column block 0 this requires $x_0=-x_1=-x_2=-x_3$. In block 1 it requires $-x_0=x_1=-x_2=-x_3$. In odd characteristic these force all four coordinates to be zero.

Here is the quantitative reason a nonconstant factor prevents four or fewer exceptions. Suppose the $s\le4$ distinct centers in a block carry sign masks on the cyclic group of order 18. The absolute value of the mean of at least one mask is at most $8/9$. In normalized Fourier coordinates each mask has coefficient norm $\ell^1\le\sqrt{18}$ by Parseval and Cauchy–Schwarz. When $s=4$, each factor is an original anti-periodic mask, so has at most nine nonzero coefficients and norm at most 3. In all cases the product of the coefficient norms is at most 81. For a nonzero exponent vector the polynomial $\prod_a(y-a)^{j_a}$, $0\le j_a<18$, is not an 18th power, by the multiplicity at any root with $j_a\ne0$. The standard multiplicative Weil bound gives at most $3\sqrt Q$ for the complete character sum. Omitting up to four centers costs at most four, and restoring the original signs there costs at most four more. Thus the absolute sum on this field block is bounded above by
$$
 8Q/9 +81(3\sqrt Q+4)+4 < Q-8.
$$
The inequality holds at $Q=343^3$ and the margin increases thereafter. At most four minority entries in the entire row product would require absolute sum at least $Q-8$ in every field block. This rules out all but the two candidate quartets. Reading the border signs gives exactly four exceptions for the four border rows. For the four zero rows the product is $+1$ on the border and at every nonzero field column, and $-1$ at the four zero columns, by the core signs and the four-mask product. [Multiplicative Weil bound, Theorem 3.7](https://people.cs.uchicago.edu/~laci/papers/span1.pdf)

At $Q=343$, the verifier constructs each of the 1,376 rows and checks all 946,000 row pairs. If the products of two disjoint row pairs differ up to global sign in at most four columns, they agree up to sign on at least one of five disjoint sets of 32 columns. Within each of those five samples group all row pairs by the exact sign pattern up to negation, then check every collision against all columns. The only qualifying quartets, in zero-based array numbering, are $\{0,1,2,3\}$ and $\{4,347,690,1033\}$, each with four exceptions. The samples are an exhaustive filter, so this finite check covers the first field size.

In a Kronecker product of two Hadamard matrices of orders greater than 1, a rectangle of four row indices $(i,k),(i,l),(j,k),(j,l)$ has constant product. In a skew doubling $D(K)$ of order $N$, the top and bottom copies of any two distinct indices $i,j$ give a quartet with four exceptions. In each half only coordinates $i,j$ have a different sign because $K^T$ reverses every off-diagonal sign. This gives at least $\binom{N/2}{2}>2$ different quartets. Both exclusions follow. The use of four-row profiles to distinguish Hadamards is classical. [Orrick on closed quadruples and switching](https://arxiv.org/abs/math/0507515)

The two quartets also recover part of the array coordinates. Partition columns by their projective signs on the four border rows alone. The four columns of $U$ have distinct projective signs and each occurs on an entire field block. The four columns of $L$ give distinct singleton cells. None of them is parallel to a column of $U$, as seen from their opposite sign products. Thus any ordinary equivalence carries the original field-column partition to one of at most two partitions determined by the target matrix alone, one for each exceptional quartet. Distinguishing the two choices, or identifying the field addition law inside these large cells, requires further work.

## Verification and scope

Run `node verify.cjs` in this directory with Node.js. It requires no packages, network, table of precomputed cyclotomic numbers, or released matrix image. The finite-field identities, all 18 residue classes, all 20 masks and the complete base quartet check run together. The class-group convolution implementation and a separate calculation via Jacobi powers agreed. A second base quartet check started from the released matrix image and found the same two quartets.

The input construction, the Wallis–Whiteman architecture, Jacobi lifting, character bounds, quartet profiles and orbit counting all have precedents. The contribution argued here is the specific completed-matrix inequivalence and quartet classification. An unrestricted comparison with every other same-order construction and a historical priority determination are open. Neither the draft nor its verifier has undergone independent human review. [Momihara–Xiang on related block constructions](https://arxiv.org/abs/1801.08776) · [Momihara on inequivalence of lifted difference sets](https://arxiv.org/abs/1308.1161)

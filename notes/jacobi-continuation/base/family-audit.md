# Check of the two uniform mask families

For primes $p\equiv7,31\pmod{36}$ and $Q=p^{3d}$ with $d$ odd, the proposed cubic and quadratic Hasse–Davenport steps and the nonvanishing argument hold. Indeed, $1+p+\cdots+p^{3d-1}\equiv3d\pmod{18}$, which makes $\chi^3$ quadratic and $\chi^6$ trivial on $\mathbb F_p^\times$. Since $p\equiv7\pmod{12}$, $\chi^3(3)=-1$. With $A=G_1$, $B=G_5$ and $E=G_9$, the cubic formula gives $A^3=-QG_3$. Since $AB=-Q$ this gives $G_3=A^2/B$. Conjugation gives $G_{15}=B^2/A$.

With $\tau=\chi(4)$ the quadratic formula for $\chi^{-1}$ gives $BG_2=\tau G_4E$. Therefore $\Delta=(A^2-BE)/G_2$ satisfies $\overline\Delta=-\tau\Delta$. The quadratic formula for $\chi^3$ gives $G_3/E=G_6/G_{12}$. Vanishing of $\Delta$ would imply $G_6=G_{12}$, hence $G_6^2=Q$. The automorphisms scaling the additive root of unity fix $G_6$ because $\chi^6$ is trivial on $\mathbb F_p^\times$. Thus $G_6\in\mathbb Q(\zeta_3)$, whose real subfield is rational. The odd exponent of $p$ in $Q$ gives a contradiction.

Both modes of the symbolic verifier pass. The [direct check](family-crosscheck.cjs) also tests the off-peak correlations in fields of sizes $7^3,31^3,43^3$ using the enumerated cyclotomic numbers. The absolute nonzero correlation defects in those examples are 28, 248 and 344, respectively, for both families. The first profile has counts $2,2,2,4,4,4$ and the second has counts $6,6,6$ in each of the three examples.

## Sextic exclusion using the fixed zeros

Assume the two exceptional quartets and their four-column minority supports have been established for the chosen source matrix. A sextic generator acts on either side of its own presentation with eight fixed indices and all other cycles of common odd length $m=(Q-1)/6>4$. Conjugation by an ordinary signed equivalence preserves the permutation cycle types on both sides. Odd order precludes exchange of the two exceptional quartets. The lengths of the remaining cycles force pointwise fixation of these quartets and their minority supports.

Every field row and column block is consequently fixed setwise. The border quartet and its support give these partitions by projective signs. Since all distinguished rows and columns are fixed pointwise, their signs agree on their nonzero corner. Comparison at the fixed border anchor in the other direction now forces the common sign on all indices. Thus each Paley block gives a genuine design automorphism, and Kantor's Theorem 8.1 (or Corollary 8.2) makes each coordinate map semiaffine. The fixed zero gives zero translation. Every nonzero coordinate is on a cycle of length $m$.

For a map $T(x)=ax^{p^j}$ let $k$ be the order of the field automorphism $x\mapsto x^{p^j}$. Its $k$th power multiplies by the norm of $a$ in the subfield of size $Q^{1/k}$. If $k\ge2$, its order is at most $k(Q^{1/k}-1)\le2(\sqrt Q-1)<m$ for $Q>121$. The middle inequality follows from the increase of $(e^t-1)/t$ on $t>0$.

For $k=1$, an order-$m$ scalar generates the unique multiplicative subgroup of index 6. The first row mask $f_1$ must be invariant under it because the diagonal column block and its zero column are fixed and the entry there is $f_1(-x)$. A generator of this cyclic subgroup shifts classes by 6 or 12 modulo 18. Both first masks fail period 6; for example the first mask differs at 0 and 6 and the second differs at 1 and 7. This excludes the pure scalar for either mask family. This argument uses the fixed zeros only, so the second family's larger profile counts pose no obstruction to the proof.

The conclusion applies precisely to orders for which the quartet theorem is supplied. Large-field character bounds alone do not verify intermediate small fields.

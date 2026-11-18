# Corrections, withdrawals, and supersession

This repository keeps a visible record of material corrections to released
claims and artifacts.

## Policy

- Minor typographical or navigational fixes may be made on the living default
  branch without changing an archived release.
- A change to a theorem statement, hypothesis, proof dependency, citation that
  affects priority or scope, or verification artifact creates a new version.
  The earlier tag and permanent archive remain unchanged and identifiable.
- A material error that invalidates a principal claim will be marked
  prominently in the README and in this file. The affected release will not be
  deleted or silently replaced.
- A withdrawn result remains findable with the reason, date, affected
  versions, and any replacement or correction linked here.
- Public tags and archived files are immutable. Corrections are made in a new
  commit and, when material, a new tagged release.
- If earlier work is found that anticipates a result here, the novelty
  statements will be narrowed and the source credited in a new version. The
  sources that could be checked only by title or abstract are listed in
  [audit/PRIOR-ART.md](audit/PRIOR-ART.md).
- If the open case of the sixteen-class count ($3\mid d$) or the factor-two
  ambiguity for $p\ne7$ is settled, the result will appear in a new version.

Suspected errors may be reported through the repository's issue tracker:
<https://github.com/jeff-kline/order18-jacobi-hadamard-automorphisms/issues>.

## Version history

### 0.1.0 — released 2026-11-17

- Tag `v0.1.0` at commit `edc6913`; version DOI
  [`10.5281/zenodo.24329143`](https://doi.org/10.5281/zenodo.24329143), concept DOI `10.5281/zenodo.24329142`. Zenodo records the
  publication date as 2026-11-18 (UTC).
- The tagged snapshot retains its prepublication “release candidate” wording
  and carries no DOI, because the DOI was minted by Zenodo after the GitHub
  Release. The living repository and paper now carry the active DOI; the
  archived files were not changed.
- Release preparation, before the tag: the dispositions of all audit findings
  are in [audit/LEDGER.md](audit/LEDGER.md). The private development history
  was squashed into one commit before publication (ledger entry of
  2026-11-17).

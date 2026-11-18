// Check H H^T = N I and H + H^T = 2 I for every arrangement of both systems
// at Q = 343 (order 1376): 24 placements x 16 reversal sets x 2 systems.
// Field F_7[t]/(t^3+t^2+1), generator t+2, class = discrete log mod 18.
// Build: c++ -O2 -std=c++17 gram.cpp -o gram && ./gram
#include <cstdint>
#include <cstdio>
#include <algorithm>
#include <vector>
constexpr int q = 343, n = 4 * (q + 1), W = (n + 63) / 64;
int md(int x, int m) { return (x % m + m) % m; }
int enc(int a, int b, int c) { return md(a, 7) + 7 * md(b, 7) + 49 * md(c, 7); }
int addf(int a, int b, int s) {  // a + s*b in the field
  return enc(a % 7 + s * (b % 7), a / 7 % 7 + s * (b / 7 % 7), a / 49 + s * (b / 49));
}
int cl[q];
const int L[4][4] = {{1, 1, 1, 1}, {-1, 1, -1, 1}, {-1, 1, 1, -1}, {-1, -1, 1, 1}};
const int U[4][4] = {{-1, -1, -1, -1}, {-1, -1, 1, 1}, {-1, 1, 1, -1}, {-1, 1, -1, 1}};
const char* SYS[2][4] = {{"+-------+", "+--+---+-", "+-+++-++-", "+-+-+-+-+"},
                         {"+-+++++++", "++++++-+-", "+++-+----", "+-+-+-+-+"}};
int mask(const char* w, int z, bool rev) {  // pattern value at field element z
  if (z == 0) return 1;
  int a = cl[z], v = (w[a % 9] == '+' ? 1 : -1) * (a < 9 ? 1 : -1);
  return rev ? -v : v;  // reversal m(-z) negates the value off the origin
}
int main() {
  int z = 1;
  for (int k = 0; k < 342; k++) {
    cl[z] = k % 18;
    int a = z % 7, b = z / 7 % 7, c = z / 49;
    z = enc(2 * a - c, a + 2 * b, b + c);  // multiply by t+2
  }
  if (z != 1) { std::puts("generator check failed"); return 1; }
  std::vector<int8_t> H((size_t)n * n);
  std::vector<uint64_t> M((size_t)n * W);
  long checked = 0, failures = 0;
  for (int s = 0; s < 2; s++) {
    int perm[4] = {0, 1, 2, 3};
    do {
      for (int rev = 0; rev < 16; rev++) {
        for (int r = 0; r < n; r++)
          for (int c = 0; c < n; c++) {
            int v;
            if (r < 4) v = c < 4 ? L[r][c] : U[r][(c - 4) / q];
            else if (c < 4) v = -U[c][(r - 4) / q];
            else {
              int i = (r - 4) / q, j = (c - 4) / q, x = (r - 4) % q, y = (c - 4) % q;
              int arg = i == j ? addf(y, x, -1) : addf(y, x, 1);
              if (i != j && (i == 0 || j == 0)) arg = addf(0, arg, -1);
              int pos = i ^ j;
              v = L[i][j] * mask(SYS[s][perm[pos]], arg, (rev >> pos) & 1);
            }
            H[(size_t)r * n + c] = (int8_t)v;
          }
        long skew = 0;
        for (int r = 0; r < n; r++)
          for (int c = 0; c < n; c++)
            if (r == c ? H[(size_t)r * n + c] != 1 : H[(size_t)r * n + c] + H[(size_t)c * n + r] != 0) skew++;
        std::fill(M.begin(), M.end(), 0);
        for (int r = 0; r < n; r++)
          for (int c = 0; c < n; c++)
            if (H[(size_t)r * n + c] < 0) M[(size_t)r * W + c / 64] |= 1ULL << (c % 64);
        long gram = 0;
        for (int r = 0; r < n; r++)
          for (int t = r + 1; t < n; t++) {
            int diff = 0;
            for (int w = 0; w < W; w++) diff += __builtin_popcountll(M[(size_t)r * W + w] ^ M[(size_t)t * W + w]);
            if (2 * diff != n) gram++;  // inner product n - 2*diff must be 0
          }
        checked++;
        if (skew || gram) {
          failures++;
          std::printf("FAIL system %s perm %d%d%d%d rev %d skew %ld gram %ld\n", s ? "II" : "I", perm[0], perm[1], perm[2], perm[3], rev, skew, gram);
        }
      }
    } while (std::next_permutation(perm, perm + 4));
  }
  std::printf("arrangements checked %ld, failures %ld\n", checked, failures);
  std::puts(failures ? "FAIL" : "PASS: every arrangement is a skew Hadamard matrix of order 1376");
  return failures ? 1 : 0;
}

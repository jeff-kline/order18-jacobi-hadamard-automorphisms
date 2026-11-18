// Exact finite certificates. Run with Node.js, no packages required.
'use strict';
const assert = require('node:assert/strict');
const mod = (x, n) => ((x % n) + n) % n;
const q = 343, n = 18, prime = 37;
const grid = fn => Array.from({length:n}, (_,i) => Array.from({length:n}, (_,j) => fn(i,j)));
const masks = ['+-------+', '+--+---+-', '+-+++-++-', '+-+-+-+-+'].map(s => {
  const half = [...s].map(ch => ch === '+' ? 1 : -1);
  return half.concat(half.map(v => -v));
});

// F7[t]/(t^3+t^2+1), encoded a+7b+49c. Multiply by t+2.
const encode = (a,b,c) => mod(a,7) + 7*mod(b,7) + 49*mod(c,7);
const digits = z => [z%7, Math.floor(z/7)%7, Math.floor(z/49)];
const cls = Array(q).fill(-1);
let g = 1;
for (let k=0; k<q-1; k++) {
  assert.equal(cls[g], -1);
  cls[g] = k%n;
  const [a,b,c] = digits(g);
  g = encode(2*a-c, a+2*b, b+c);
}
assert.equal(g,1);
assert.equal(cls[0],-1);
const base = grid(() => 0);
for (let z=2; z<q; z++) {
  const [a,b,c] = digits(z);
  base[cls[z]][cls[encode(1-a,-b,-c)]]++;
}

// Compute the actual projective column partition on the four border and four
// zero rows. In the core: (function index, argument sign at x=0, entry sign).
const L = [[1,1,1,1],[-1,1,-1,1],[-1,1,1,-1],[-1,-1,1,1]];
const U = [[-1,-1,-1,-1],[-1,-1,1,1],[-1,1,1,-1],[-1,1,-1,1]];
const core = [
  [[0,1,1],[1,-1,1],[2,-1,1],[3,-1,1]],
  [[1,-1,-1],[0,1,1],[3,1,-1],[2,1,1]],
  [[2,-1,-1],[3,1,1],[0,1,1],[1,1,-1]],
  [[3,-1,-1],[2,1,-1],[1,1,1],[0,1,1]]
];
const cells = new Map();
function addColumn(vec, atom) {
  const key = vec.map(v => v*vec[0]).join(',');
  if (!cells.has(key)) cells.set(key,[]);
  cells.get(key).push(atom);
}
for (let b=0;b<4;b++) {
  addColumn(L.map(row=>row[b]).concat(U[b].map(v=>-v)), {kind:'border', b});
  for (let j=-1;j<n;j++) {
    const vec = U.map(row=>row[b]);
    for (let r=0;r<4;r++) {
      const [l,arg,sign] = core[r][b];
      vec.push(sign*(j===-1 ? 1 : masks[l][mod(j+(arg<0 ? 9:0),n)]));
    }
    addColumn(vec,{kind:j<0?'zero':'coset',b,j});
  }
}
const triples = [];
let singletons=0;
for (const atoms of cells.values()) {
  if (atoms.length===1 && atoms[0].kind!=='coset') { singletons++; continue; }
  assert.equal(atoms.length,3);
  assert(atoms.every(a=>a.kind==='coset' && a.b===atoms[0].b));
  if (atoms[0].b===0) triples.push(atoms.map(a=>a.j));
}
assert.equal(singletons,8); assert.equal(cells.size,32); assert.equal(triples.length,6);

// Integral existence check in Z[zeta18], with zeta^6=zeta^3-1.
// All values in this calculation are small integers (no floating-point transforms).
const powers = [[1,0,0,0,0,0]];
for (let k=1;k<=n;k++) {
  const [a,b,c,d,e,f]=powers[k-1];
  powers.push([-f,a,b,c+f,d,e]);
}
assert.deepEqual(powers[n].map(v=>v+0), powers[0]);
function fourier(table,u,v) {
  const coeff=Array(n).fill(0), out=Array(6).fill(0);
  for(let i=0;i<n;i++) for(let j=0;j<n;j++) coeff[mod(u*i+v*j,n)]+=table[i][j];
  for(let k=0;k<n;k++) for(let h=0;h<6;h++) out[h]+=coeff[k]*powers[k][h];
  return out;
}
const jacobi = grid((u,v)=>fourier(base,u,v));
for(let e=0;e<n;e++) {
  const weight=grid((i,j)=>masks.reduce((s,f)=>s+f[(e+i+9)%n]*f[(e+j)%n],0));
  const grouped = new Map();
  for(let u=0;u<n;u++) for(let v=0;v<n;v++) {
    const value=jacobi[u][v], sign=Math.sign(value.find(x=>x!==0)||0);
    if (!sign) continue;
    const key=value.map(x=>x*sign).join(',');
    const part=fourier(weight,-u,-v);
    if(!grouped.has(key)) grouped.set(key,Array(6).fill(0));
    part.forEach((x,h)=>grouped.get(key)[h]+=sign*x);
  }
  for (const [key,coef] of grouped) {
    assert.deepEqual(coef,key==='1,0,0,0,0,0'?[-4*n*n,0,0,0,0,0]:Array(6).fill(0));
  }
  assert(grouped.has('1,0,0,0,0,0'));
}
console.log('All 18 exact character identities give four-block off-peak correlation -4.');

// Work directly in the group algebra F37[C18 x C18]. For odd d the
// nontrivial Fourier coefficients of the lifted table are its base values
// to the power d. The uniform correction sets its total mass to q^d-2.
function convolve(a,b) {
  const c=grid(()=>0);
  for(let i=0;i<n;i++) for(let j=0;j<n;j++) if(a[i][j])
    for(let k=0;k<n;k++) for(let h=0;h<n;h++) c[(i+k)%n][(j+h)%n]+=a[i][j]*b[k][h];
  return c.map(row=>row.map(v=>mod(v,prime)));
}
const square=convolve(base,base);
let conv=base;
let qPower=q%prime, massPower=(q-2)%prime;
const inv324=Array.from({length:prime},(_,i)=>i).find(i=>mod(i*n*n,prime)===1);
function sumOnCell(c, e, B, mask) {
  // Entry f(y-x). Set z=y/x; y-x=-x(1-z), and z=1 contributes f(0)=1.
  let sum=0;
  for (const b of B) {
    const i=mod(b-e,n);
    if(i===0) sum++;
    for(let j=0;j<n;j++) sum+=c[i][j]*mask[(e+9+j)%n];
  }
  return sum;
}
const absResidue = x => Math.min(mod(x,prime),mod(-x,prime));
const allSix = [];
for(let h=0;h<64;h++) {
  const mask=Array.from({length:n},(_,j)=>((h>>(j%6))&1) ? 1 : -1);
  if(mask.reduce((a,b)=>a+b,0)===0) allSix.push(mask);
}
assert.equal(allSix.length,20);
const sexticCosets = Array.from({length:6},(_,b)=>[b,b+6,b+12]);
const rows=[];
for(let d=1;d<=35;d+=2) {
  const correction=mod((qPower-2-massPower)*inv324,prime);
  const c=conv.map(row=>row.map(z=>mod(z+correction,prime)));
  const possible=new Set();
  for(const f of allSix) for(let e=0;e<6;e++) for(const B of sexticCosets)
    possible.add(absResidue(sumOnCell(c,e,B,f)));
  const witnesses=[];
  for(let e=0;e<n;e++) for (const B of triples) {
    const w=absResidue(sumOnCell(c,e,B,masks[0]));
    if(!possible.has(w)) witnesses.push({w,e,B});
  }
  assert(witnesses.length);
  witnesses.sort((a,b)=>a.w-b.w || a.e-b.e);
  rows.push({d,...witnesses[0],sextic:[...possible].sort((a,b)=>a-b)});
  conv=convolve(conv,square);
  qPower=mod(qPower*(q%prime)**2,prime);
  massPower=mod(massPower*((q-2)%prime)**2,prime);
}
assert.deepEqual(conv,base); // redundant cycle check (base entries are <37).
console.table(rows.map(r=>({...r,B:r.B.join('/'),sextic:r.sextic.join('/')})));
console.log('All odd degrees separated. Marked cells: 8 singletons and 24 cells of size (Q-1)/6.');

// Quartets at the base order. Construct every row from the finite field,
// independently of the released image. A pair of pair-products at distance
// <=4 up to sign agrees up to sign on one of five disjoint column samples.
const order=4*(q+1), wordCount=order/32;
const sums=Array.from({length:q},(_,x)=>{
  const [a,b,c]=digits(x);
  return Uint16Array.from({length:q},(_,y)=>{
    const [u,v,w]=digits(y);
    return encode(a+u,b+v,c+w);
  });
});
const neg=Array.from({length:q},(_,x)=>encode(...digits(x).map(z=>-z)));
function matrixEntry(r,c) {
  if(r<4) return c<4 ? L[r][c] : U[r][Math.floor((c-4)/q)];
  const i=Math.floor((r-4)/q), x=(r-4)%q;
  if(c<4) return -U[c][i];
  const j=Math.floor((c-4)/q), y=(c-4)%q;
  const [index,orientation,sign]=core[i][j];
  const arg = i===j ? sums[neg[x]][y] : (orientation<0 ? neg[sums[x][y]] : sums[x][y]);
  return sign*(arg===0?1:masks[index][cls[arg]]);
}
const packed=Array.from({length:order},(_,r)=>{
  const v=new Uint32Array(wordCount);
  for(let c=0;c<order;c++) if(matrixEntry(r,c)<0) v[c>>>5]|=1<<(c%32);
  return v;
});
function popcount(x) {
  x-=(x>>>1)&0x55555555;
  x=(x&0x33333333)+((x>>>2)&0x33333333);
  return (((x+(x>>>4))&0x0f0f0f0f)*0x01010101)>>>24;
}
const quartets=new Set();
function compare(i,j,code) {
  const k=Math.floor(code/order), l=code%order;
  if(i===k || i===l || j===k || j===l) return;
  let ones=0,zeros=0;
  for(let w=0;w<wordCount;w++) {
    const count=popcount(packed[i][w]^packed[j][w]^packed[k][w]^packed[l][w]);
    ones+=count; zeros+=32-count;
    if(ones>4 && zeros>4) return;
  }
  quartets.add([i,j,k,l].sort((a,b)=>a-b).join(',')+' / '+Math.min(ones,zeros));
}
for(let s=0;s<5;s++) {
  // 89 is coprime to 1376, so these five 32-column samples are disjoint.
  const sig=packed.map(row=>{
    let bits=0;
    for(let j=0;j<32;j++) {
      const c=((32*s+j)*89)%order;
      bits|=((row[c>>>5]>>>(c%32))&1)<<j;
    }
    return bits;
  });
  const seen=new Map();
  for(let i=0;i<order;i++) for(let j=0;j<i;j++) {
    const word=sig[i]^sig[j], key=word<0?~word:word, code=i*order+j;
    const old=seen.get(key);
    if(old===undefined) seen.set(key,code);
    else if(typeof old==='number') {
      compare(i,j,old);
      seen.set(key,[old,code]);
    } else {
      for(const other of old) compare(i,j,other);
      old.push(code);
    }
  }
}
assert.deepEqual([...quartets].sort(),['0,1,2,3 / 4','4,347,690,1033 / 4']);
console.log('Base quartets / minority columns:', [...quartets].sort().join('; '));

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
const L = [[1,1,1,1],[-1,1,-1,1],[-1,1,1,-1],[-1,-1,1,1]];
const U = [[-1,-1,-1,-1],[-1,-1,1,1],[-1,1,1,-1],[-1,1,-1,1]];
const core = [
  [[0,1,1],[1,-1,1],[2,-1,1],[3,-1,1]],
  [[1,-1,-1],[0,1,1],[3,1,-1],[2,1,1]],
  [[2,-1,-1],[3,1,1],[0,1,1],[1,1,-1]],
  [[3,-1,-1],[2,1,-1],[1,1,1],[0,1,1]]
];
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
  const flip=(index===0 && arg!==0) ? -1 : 1;
  return sign*flip*(arg===0?1:masks[index][cls[arg]]);
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
for(let i=0;i<order;i++) for(let j=0;j<i;j++) {
  let distance=0;
  for(let w=0;w<wordCount;w++) distance+=popcount(packed[i][w]^packed[j][w]);
  assert.equal(distance,order/2);
  assert.equal(matrixEntry(i,j),-matrixEntry(j,i));
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
  const indices=[i,j,k,l].sort((a,b)=>a-b);
  const minority=[];
  for(let col=0;col<order;col++) {
    const value=indices.reduce((sgn,r)=>sgn*matrixEntry(r,col),1);
    if(value===(ones<zeros?-1:1)) minority.push(col);
  }
  quartets.add(indices.join(',')+' / '+minority.join(','));

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
assert.deepEqual([...quartets].sort(),['0,1,2,3 / 0,1,2,3','4,347,690,1033 / 0,1,2,3']);
console.log('Base quartets / minority columns:', [...quartets].sort().join('; '));

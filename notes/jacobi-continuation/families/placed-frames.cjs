// Exact certificate recognizing the border frame and its four Paley blocks.
// Run with Node.js, no packages required.
'use strict';
const assert = require('node:assert/strict');
const mod = (x, n) => ((x % n) + n) % n;
const n=18, p=Number(process.argv[2]), q=p**3, prime=Number(process.argv[6]||37);
const grid = fn => Array.from({length:n}, (_,i) => Array.from({length:n}, (_,j) => fn(i,j)));
const originals = (process.argv[3]==='second'?['+-+++++++','++++++-+-','+++-+----','+-+-+-+-+']:['+-------+', '+--+---+-', '+-+++-++-', '+-+-+-+-+']).map(s => {
  const half = [...s].map(ch => ch === '+' ? 1 : -1);
  return half.concat(half.map(v => -v));
});
const placement=Array.from(process.argv[4]||'0123',Number);
assert.deepEqual(placement.slice().sort(),[0,1,2,3]);
const masks=placement.map(i=>originals[i]);
const flip=Number(process.argv[5]||0);
assert(Number.isInteger(flip)&&flip>=0&&flip<16);
const odd=masks.reduce((parity,_,l)=>parity^((flip>>l)&1),0)===1;
for(let l=0;l<4;l++) if(flip&(1<<l)) masks[l]=masks[l].map(v=>-v);

const base=require('./search.cjs').fieldTable(p,3,n).table;
// In the core: (function index, argument sign at x=0, entry sign).
const L = [[1,1,1,1],[-1,1,-1,1],[-1,1,1,-1],[-1,-1,1,1]];
const U = [[-1,-1,-1,-1],[-1,-1,1,1],[-1,1,1,-1],[-1,1,-1,1]];
const core = [
  [[0,1,1],[1,-1,1],[2,-1,1],[3,-1,1]],
  [[1,-1,-1],[0,1,1],[3,1,-1],[2,1,1]],
  [[2,-1,-1],[3,1,1],[0,1,1],[1,1,-1]],
  [[3,-1,-1],[2,1,-1],[1,1,1],[0,1,1]]
];
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

function zeroRow(i, e, j) {
  const [l,h,s]=core[i][j];
  return s*masks[l][mod(e+(h<0?9:0),18)];
}
function key(v) { return v.map(x=>x*v[0]).join(','); }
// The four label representatives are the border rows on the four zero columns
// and the four border columns on the four zero rows, respectively.
const rowLabels=(odd?L:U).map(key);
const colLabels=odd?core.map((_,j)=>key(core.map(row=>row[j][2]))):U.map(v=>key(v.map(x=>-x)));
// The marked zero rows and their four minority columns are deleted before
// the two partitions are formed. The remaining special indices are borders.
assert.equal(new Set(rowLabels).size,4);
assert.equal(new Set(colLabels).size,4);
const rowFrame=Array.from({length:4},()=>[]);
const colFrame=Array.from({length:4},()=>[]);
for(let b=0;b<4;b++)for(let e=0;e<18;e++){
 const rv=odd?U.map(row=>-row[b]):core[b].map((_,j)=>zeroRow(b,mod(e+(j===b?9:0),18),j));
 const cv=core.map((_,i)=>zeroRow(i,e,b)); // x=0
 rowFrame[rowLabels.indexOf(key(rv))].push([b,e]);
 colFrame[colLabels.indexOf(key(cv))].push([b,e]);
}
for(const f of [rowFrame,colFrame]) for(const cell of f) assert.equal(cell.length,18);
function local(table,b,e,j,classes) {
 const [l,h,s]=core[b][j];
 const shift=h<0?9:0;
 const center=e+(b===j?0:9);
 return s*sumOnCell(table,mod(center+shift,18),classes.map(k=>mod(k+shift,18)),masks[l]);
}
function ac(table,l,e){
 let res=0;
 for(let b=0;b<18;b++)for(let j=0;j<18;j++){
  res+=table[b][j]*masks[l][(b+e+9)%18]*masks[l][(j+e)%18];
 }
 return res;
}
for(let d=1;d<prime;d+=2){
 const correction=mod((qPower-2-massPower)*inv324,prime);
 const table=conv.map(row=>row.map(z=>mod(z+correction,prime)));
 let good=0;
 for(let a=0;a<4;a++)for(let c=0;c<4;c++){
   const parts=core.map((_,j)=>colFrame[c].filter(pair=>pair[0]===j).map(p=>p[1]));
   const values=rowFrame[a].map(([b,e])=>{
     // Pair the individual border row a with an ordinary row (b,x) in its
     // zero-derived cell. The border column c belongs to the tested column cell.
     const special=odd?U[a][c]*zeroRow(b,mod(e+(b===c?9:0),18),c):L[a][c]*(-U[c][b]);
     let total=special;
     for(let j=0;j<4;j++) total+=U[a][j]*local(table,b,e,j,parts[j]);
     return absResidue(total);
   });
   if(values.some(v=>v!==1)) good++;
 }
 const nonPaley=masks.map((_,l)=>Array.from({length:18},(_,e)=>absResidue(ac(table,l,e))).some(v=>v!==1));


 console.log(d,good,nonPaley.filter(Boolean).length);
 conv=convolve(conv,square);
 qPower=mod(qPower*(q%prime)**2,prime);
 massPower=mod(massPower*((q-2)%prime)**2,prime);
}
assert.deepEqual(conv,base.map(row=>row.map(x=>mod(x,prime))));

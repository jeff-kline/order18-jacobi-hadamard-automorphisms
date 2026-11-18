// Distinguish the two even placements of triple II on the characteristic-7 tower.
'use strict';
const assert = require('node:assert/strict');
const n=18, ell=19;
const mod = (a,b)=>((a%b)+b)%b;
const range=k=>Array.from({length:k},(_,i)=>i);
const fill=f=>range(n).map(i=>range(n).map(j=>f(i,j)));
const field = (a,b,c)=>mod(a,7)+7*mod(b,7)+49*mod(c,7);
const xyz = x=>[x%7,Math.floor(x/7)%7,Math.floor(x/49)];
const log=Array(343).fill(-1);
let x=1;
for(let i=0;i<342;i++) {
  assert.equal(log[x],-1);
  log[x]=i%18;
  const [a,b,c]=xyz(x);
  x=field(2*a-c,a+2*b,b+c);
}
const T=fill(()=>0);
for(let z=2;z<343;z++) {
  const [a,b,c]=xyz(z);
  T[log[z]][log[field(1-a,-b,-c)]]++;
}
const U=[[-1,-1,-1,-1],[-1,-1,1,1],[-1,1,1,-1],[-1,1,-1,1]];
// [mask index, orientation on y, overall sign] for field row x=0
const core=[
  [[0,1,1],[1,-1,1],[2,-1,1],[3,-1,1]],
  [[1,-1,-1],[0,1,1],[3,1,-1],[2,1,1]],
  [[2,-1,-1],[3,1,1],[0,1,1],[1,1,-1]],
  [[3,-1,-1],[2,1,-1],[1,1,1],[0,1,1]]
];
function label(seq) { return seq.map(v=>v*seq[0]).join(','); }
function conv(a,b) {
  const out=fill(()=>0);
  for(const i of range(n)) for(const j of range(n))
    for(let k=0;k<n;k++) for(let h=0;h<n;h++)
      out[(i+k)%n][(j+h)%n]+=a[i][j]*b[k][h];
  return out.map(row=>row.map(v=>mod(v,ell)));
}
function makeHistogram(placement) {
  const words=['+-+++++++','++++++-+-','+++-+----','+-+-+-+-+'];
  const masks=placement.map(i=>{
    const f=[...words[i]].map(z=>z==='+'?1:-1);
    return f.concat(f.map(z=>-z));
  });
  const fine=new Map();
  for(const b of range(4)) for(const j of range(n)) {
    const top=U.map(row=>row[b]);
    const bot=core.map(row=>{
      const [mask,orientation,sign]=row[b];
      return sign*masks[mask][(j+(orientation<0?9:0))%18];
    });
    const key=label(top.concat(bot));
    if(!fine.has(key)) fine.set(key,{b,parts:[label(top),label(bot)],B:[]});
    assert.equal(fine.get(key).b,b);
    fine.get(key).B.push(j);
  }
  const cells=[...fine.values()];
  assert.equal(cells.length,24);
  assert(cells.every(c=>c.B.length===3));
  function absResidue(v) {return Math.min(mod(v,ell),mod(-v,ell));}
  function cellSum(t,r,e,cell) {
    const [mask,o]=core[r][cell.b];
    const center=(e+(r===cell.b?0:9))%18;
    let s=0;
    for(const b of cell.B) {
      const i=mod(b-center,n);
      s+=Number(i===0);
      for(let j=0;j<n;j++) {
        const idx=(center+9+(o<0?9:0)+j)%18;
        s+=t[i][j]*masks[mask][idx];
      }
    }
    return absResidue(s);
  }
  function histograms(t) {
    const hist=[new Map(),new Map()];
    for(const r of range(4)) for(const e of range(n)) {
      const vals=cells.map(c=>cellSum(t,r,e,c));
      for(const side of [0,1]) {
        const grouped=new Map();
        cells.forEach((c,i)=>{
          const key=c.parts[side];
          if(!grouped.has(key)) grouped.set(key,[]);
          grouped.get(key).push(vals[i]);
        });
        for(const arr of grouped.values()) {
          assert.equal(arr.length,6);
          const key=arr.sort((a,b)=>a-b).join(',');
          hist[side].set(key,(hist[side].get(key)||0)+1);
        }
      }
    }
    return hist;
  }
  // Directly check the base-field folded values, before reducing via lifting.
  // Each removed special column is in one of the two minority supports.
  for (const r of range(4)) for(const e of range(n)) for(const cell of cells){
    const b=cell.b, [f,o]=core[r][b], rx=xyz(log.indexOf(e));
    let acc=0;
    for(let cy=1;cy<343;cy++) if(cell.B.includes(log[cy])){
      const yy=xyz(cy);
      const u=field(...yy.map((v,i)=>o*(v+(r===b?-1:1)*rx[i])));
      acc+=u===0?1:masks[f][log[u]];
    }
    assert.equal(absResidue(acc),cellSum(T,r,e,cell));
  }
  return histograms;
}
const first=makeHistogram([0,1,2,3]), swap=makeHistogram([0,1,3,2]);
const asPair=(h,key)=>h.map(x=>x.get(key)||0).sort((a,b)=>a-b);
let power=T, size=343%ell, old=341%ell;
const inv=range(ell).find(a=>a*324%ell===1);
const T2=conv(T,T);
for(let d=1;d<18;d+=2) {
  const correction=mod((size-2-old)*inv,ell);
  const t=power.map(row=>row.map(v=>mod(v+correction,ell)));
  const a=first(t), b=swap(t);
  const keys=new Set([...a,...b].flatMap(h=>[...h.keys()]));
  const witness=[...keys].sort().find(k=>asPair(a,k).join()!==asPair(b,k).join());
  if(d%3!==0){
    assert(witness);
    console.log(d,witness,asPair(a,witness),asPair(b,witness));
  }else{
    assert.equal(witness,undefined);
    console.log(d,'no distinction from this test');
  }
  power=conv(power,T2);
  size=mod(size*(343%ell)**2,ell);old=mod(old*(341%ell)**2,ell);
}
assert.deepEqual(power,T.map(row=>row.map(v=>mod(v,ell))));
assert.equal(size,343%ell);
assert.equal(old,341%ell);

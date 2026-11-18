// Label the two exceptional quartets by testing the refinement of their
// projective column cells. No matrix at an extension degree is materialized.
'use strict';
const assert = require('node:assert/strict');
const n=18, ell=37;
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
const masks=['+-------+','+--+---+-','+-+++-++-','+-+-+-+-+'].map(row=>{
  const f=[...row].map(c=>c==='+'?1:-1);
  return f.concat(f.map(i=>-i));
});
const U=[[-1,-1,-1,-1],[-1,-1,1,1],[-1,1,1,-1],[-1,1,-1,1]];
// [mask index, orientation on y, overall sign] for field row x=0
const core=[
  [[0,1,1],[1,-1,1],[2,-1,1],[3,-1,1]],
  [[1,-1,-1],[0,1,1],[3,1,-1],[2,1,1]],
  [[2,-1,-1],[3,1,1],[0,1,1],[1,1,-1]],
  [[3,-1,-1],[2,1,-1],[1,1,1],[0,1,1]]
];
function label(seq) { return seq.map(v=>v*seq[0]).join(','); }
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
function conv(a,b) {
  const out=fill(()=>0);
  for(const i of range(n)) for(const j of range(n))
    for(let k=0;k<n;k++) for(let h=0;h<n;h++)
      out[(i+k)%n][(j+h)%n]+=a[i][j]*b[k][h];
  return out.map(row=>row.map(v=>mod(v,ell)));
}
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
let power=T, size=343%ell, old=341%ell;
const inv=range(ell).find(a=>a*324%ell===1);
const T2=conv(T,T);
for(let d=1;d<36;d+=2) {
  const correction=mod((size-2-old)*inv,ell);
  const t=power.map(row=>row.map(v=>mod(v+correction,ell)));
  // Recover a cubic coset from the joint color of a row or column pair.
  // For a fixed nonzero difference, the omitted endpoints cancel by skewness.
  const colors=new Map();
  for (const e of range(n)) {
    const tuple=masks.map(mask=>{
      let acc=0;
      for(let i=0;i<n;i++) for(let j=0;j<n;j++)
        acc+=t[i][j]*mask[(e+i+9)%n]*mask[(e+j)%n];
      return mod(acc,ell);
    }).join(',');
    if(!colors.has(tuple)) colors.set(tuple,[]);
    colors.get(tuple).push(e);
  }
  const colorParts=[...colors.values()];
  assert.deepEqual(colorParts.map(v=>v.length).sort(),[2,2,2,4,4,4]);
  assert.deepEqual(colorParts.filter(v=>v.length===2).flat().sort((a,b)=>a-b),[1,4,7,10,13,16]);
  const [a,b]=histograms(t);
  const key=[...a.keys()].find(k=>!b.has(k)) || [...new Set([...a.keys(),...b.keys()])].find(k=>a.get(k)!==b.get(k));
  assert(key,'quartet histograms collide at degree '+d);
  console.log(d,a.size,b.size,key,a.get(key)||0,b.get(key)||0);
  power=conv(power,T2);
  size=mod(size*(343%ell)**2,ell);old=mod(old*(341%ell)**2,ell);
}

// Enumerate the finite data left after recognition of the four Paley blocks.
// The class of the common multiplier is the class of its norm to GF(343).
'use strict';
const assert = require('node:assert/strict');
const range=n=>Array.from({length:n},(_,i)=>i);
const four=range(4),eight=range(8);
const args=process.argv.slice(2);
const second=args[0]==='--second';
if(second)args.shift();
const words=second?['+-+++++++','++++++-+-','+++-+----','+-+-+-+-+']:['+-------+', '+--+---+-', '+-+++-++-', '+-+-+-+-+'];
const masks=words.map(s=>{
 const f=[...s].map(c=>c==='+'?1:-1);
 return f.concat(f.map(x=>-x));
});
const L=[[1,1,1,1],[-1,1,-1,1],[-1,1,1,-1],[-1,-1,1,1]];
const U=[[-1,-1,-1,-1],[-1,-1,1,1],[-1,1,1,-1],[-1,1,-1,1]];
// Each core cell is entry sign times mask applied to h*(y+t*x),
// where t=-1 on the diagonal and +1 elsewhere.
const core=[
 [[0,1,1],[1,-1,1],[2,-1,1],[3,-1,1]],
 [[1,-1,-1],[0,1,1],[3,1,-1],[2,1,1]],
 [[2,-1,-1],[3,1,1],[0,1,1],[1,1,-1]],
 [[3,-1,-1],[2,1,-1],[1,1,1],[0,1,1]]
];
function t(i,j){return i===j?-1:1;}
function corner(i,j){
 if(i<4) return j<4?L[i][j]:U[i][j-4];
 return j<4?-U[j][i-4]:core[i-4][j-4][2];
}
function permutations(xs){
 if(!xs.length) return [[]];
 return xs.flatMap(x=>permutations(xs.filter(y=>y!==x)).map(p=>[x,...p]));
}
const perm=permutations(four);
const corners=perm.flatMap(border=>perm.map(field=>border.concat(field.map(b=>b+4))));
let cornerCount=0,geometricCount=0;
const templates=[];
for(const row of corners)for(const col of corners){
 // Normalize the first row sign to +1, then the first row and column
 // uniquely force every row and column sign.
 const cs=eight.map(j=>corner(0,j)*corner(row[0],col[j]));
 const rs=eight.map(i=>cs[0]*corner(i,0)*corner(row[i],col[0]));
 if(!eight.every(i=>eight.every(j=>corner(i,j)===rs[i]*cs[j]*corner(row[i],col[j])))) continue;
 cornerCount++;
 const r=row.slice(4).map(u=>u-4),c=col.slice(4).map(u=>u-4);
 // Normalize the coordinate sign on field row block 0 to +1.
 const cj=four.map(j=>t(0,j)*t(r[0],c[j]));
 const ri=four.map(i=>cj[0]*t(i,0)*t(r[i],c[0]));
 if(!four.every(i=>four.every(j=>t(r[i],c[j])*ri[i]===cj[j]*t(i,j)))) continue;
 geometricCount++;
 templates.push({r,c,cj,row,col,rs,cs,ri});
}
// Encode all signed placements, including those with Paley on the diagonal.
// Entries are two times the input mask index plus its sign bit.
const arrangements=perm.flatMap(p=>range(16).map(bits=>p.map((l,i)=>2*l+((bits>>i)&1))));
const asIndex=new Map(arrangements.map((v,i)=>[v.join(','),i]));
const witnessRequest=args.map(s=>asIndex.get(Array.from(s,Number).join(',')));
assert(witnessRequest.length===0||(witnessRequest.length===2&&witnessRequest.every(i=>i!==undefined)));
let witness=null;
const vectors=range(8).map(k=>masks[k>>1].map(v=>(k%2?-1:1)*v).join(','));
const inverse=range(3).map(k=>range(18).map(shift=>{
 const result=Array(8).fill(-1);
 for(const target of range(8)){
   const args=range(18).map(e=>masks[target>>1][(shift+(7**k)*e)%18]*(target%2?-1:1));
   const source=vectors.indexOf(args.join(','));
   if(source>=0){assert.equal(result[source],-1);result[source]=target;}
 }
 return result;
}));
// For a fixed skeleton and class action, every oriented source mask uniquely
// determines the oriented target on that cell when a match exists.
const reachable=arrangements.map(()=>new Set());
const selfCount=arrangements.map(()=>0);
const unlabelledOrbitSizes=new Map();
for(const template of templates) for(const k of range(3))for(const a of range(18)){
 const {r,c,cj}=template;
 const rules=[];
 for(const i of four)for(const j of four){
  const [source,h]=core[i][j], [target,w]=core[r[i]][c[j]];
  rules.push([source,target,inverse[k][(a+(w*cj[j]*h<0?9:0))%18]]);
 }
 for(let idx=0;idx<arrangements.length;idx++) {
  const source=arrangements[idx], target=Array(4).fill(-1);
  let ok=true;
  for(const [s,t,rule] of rules){
   const v=rule[source[s]];
   if(v===-1 || (target[t]!==-1 && target[t]!==v)){ok=false;break;}
   target[t]=v;
  }
  if(ok){
    const other=asIndex.get(target.join(','));
    if(other!==undefined) {
     reachable[idx].add(other);
     if(other===idx) selfCount[idx]++;
     if(idx===witnessRequest[0]&&other===witnessRequest[1]) witness={...template,k,a};
    }
  }
 }
}
const seen=new Set(), reps=[];
for(let i=0;i<arrangements.length;i++)if(!seen.has(i)){
 const orbit=reachable[i];
 assert(orbit.has(i));
 for(const other of orbit){
  assert.deepEqual(reachable[other],orbit);
  seen.add(other);
 }
 const byDiagonal=[...new Set([...orbit].map(u=>arrangements[u][0]>>1))];
 const parities=[...new Set([...orbit].map(u=>arrangements[u].reduce((p,k)=>p^(k%2),0)))];
 assert.equal(parities.length,1);
 const permutationParity=arrangement=>arrangement.reduce((p,item,i)=>
   p^(arrangement.slice(i+1).filter(v=>(v>>1)<(item>>1)).length%2),0);
 const permutationParities=[...new Set([...orbit].map(u=>permutationParity(arrangements[u])))];
 assert.equal(permutationParities.length,1);
 unlabelledOrbitSizes.set(orbit.size,(unlabelledOrbitSizes.get(orbit.size)??0)+1);
 reps.push({rep:arrangements[i],orbitSize:orbit.size,diagonal:byDiagonal,parity:parities[0],permutationParity:permutationParities[0],selfTemplates:selfCount[i]});
}
assert.equal(reps.length,4);
assert(reps.every(r=>r.orbitSize===96&&r.selfTemplates===(second?3:1)));
assert(selfCount.every(i=>i===(second?3:1)));
if(witnessRequest.length)console.log(JSON.stringify({source:arrangements[witnessRequest[0]],target:arrangements[witnessRequest[1]],witness},null,2));
else console.log(JSON.stringify({cornerCount,geometricCount,total:arrangements.length,orbitHistogram:[...unlabelledOrbitSizes],count:reps.length,reps},null,2));

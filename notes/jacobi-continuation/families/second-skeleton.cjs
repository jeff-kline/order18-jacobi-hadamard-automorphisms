// Enumerate the finite data left after recognition of the four Paley blocks.
// The class of the common multiplier is the class of its norm to GF(343).
'use strict';
const assert = require('node:assert/strict');
const range=n=>Array.from({length:n},(_,i)=>i);
const four=range(4),eight=range(8);
const masks=['+-+++++++','++++++-+-','+++-+----', '+-+-+-+-+'].map((s,which)=>{
 const f=[...s].map(c=>(c==='+'?1:-1)*((Number(process.argv[2]||0)>>which)&1?-1:1));
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
const survivors=[];
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
 for(const a of range(18))for(const k of range(3)){
   const ok=four.every(i=>four.every(j=>{
     const [l,h,s]=core[i][j], [v,w,z]=core[r[i]][c[j]];
     const shift=w*cj[j]*h<0?9:0;
     return range(18).every(b=>s*masks[l][b]===rs[i+4]*cs[j+4]*z*masks[v][(a+shift+(7**k)*b)%18]);
   }));
   if(ok)survivors.push({row,col,rs,cs,ri,cj,a,k});
 }
}
console.log(survivors.map(s=>[s.a,s.k,s.row,s.col]));
assert.deepEqual(survivors.map(s=>[s.a,s.k]).sort((a,b)=>a[0]-b[0]),Number(process.argv[2]||0)===1 ? [[0,0],[12,0],[15,0]] : [[0,0],[3,0],[6,0]]);
const pointwise=survivors.filter(s=>s.row.every((r,i)=>r===i)&&s.col.every((c,j)=>c===j));
assert.equal(pointwise.length,1);
assert.equal(pointwise[0].a,0); assert.equal(pointwise[0].k,0);

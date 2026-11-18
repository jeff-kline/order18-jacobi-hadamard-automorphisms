// Enumerate the finite data left after recognition of the four Paley blocks.
// The class of the common multiplier is the class of its norm to GF(343).
'use strict';
const assert = require('node:assert/strict');
const range=n=>Array.from({length:n},(_,i)=>i);
const four=range(4),eight=range(8);
const masks=['+-+++++++','++++++-+-','+++-+----', '+-+-+-+-+'].map(s=>{
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

const sourceA=['+-------+','+--+---+-','+-+++-++-','+-+-+-+-+'];
const sourceB=['+-+++++++','++++++-+-','+++-+----','+-+-+-+-+'];
function catalog(words){
  const fs=words.map(s=>[...s+s].map((x,i)=>(x==='+'?1:-1)*(i<9?1:-1)));
  return fs.concat(fs.map(w=>w.map(x=>-x)));
}
const allWords=catalog(sourceA).concat(catalog(sourceB));
const geometries=[];
for(const row of corners)for(const col of corners){
 const cs=eight.map(j=>corner(0,j)*corner(row[0],col[j]));
 const rs=eight.map(i=>cs[0]*corner(i,0)*corner(row[i],col[0]));
 if(!eight.every(i=>eight.every(j=>corner(i,j)===rs[i]*cs[j]*corner(row[i],col[j])))) continue;
 const r=row.slice(4).map(u=>u-4),c=col.slice(4).map(u=>u-4);
 const cj=four.map(j=>t(0,j)*t(r[0],c[j]));
 const ri=four.map(i=>cj[0]*t(i,0)*t(r[i],c[0]));
 if(!four.every(i=>four.every(j=>t(r[i],c[j])*ri[i]===cj[j]*t(i,j))))continue;
 const equations=[];
 for(const i of four)for(const j of four){
   const [l,h,s]=core[i][j], [v,w,z]=core[r[i]][c[j]];
   const shift=w*cj[j]*h<0?9:0;
   assert.equal(s,rs[i+4]*cs[j+4]*z);
   equations.push([l,v,shift]);
 }
 geometries.push(equations);
}
const dirs=[1,7,13];
let ii=0;
for(const source of [sourceA,sourceB]){
 const options=catalog(source),ids=new Map(options.map((w,i)=>[w.join(','),i]));
 const phases=new Map();
 for(const a of range(18))for(const m of dirs)for(const ix of eight){
   const w=range(18);for(let k=0;k<18;k++)w[(a+m*k)%18]=options[ix][k];
   phases.set([a,m,ix].join(','),ids.get(w.join(','))??-1);
 }
 const all=perm.flatMap(ord=>range(16).filter(bits=>four.filter(i=>(bits>>i)&1).length%2===0).map(bits=>ord.map((x,i)=>x+4*((bits>>i)&1))));
 const allKeys=new Set(all.map(s=>s.join(',')));
 const unseen=new Set(allKeys), components=[];
 while(unseen.size){
   const key=[...unseen][0], entry=key.split(',').map(Number), done=new Set();
   for(const eqs of geometries)for(const a of range(18))for(const m of dirs){
     const dest=[-1,-1,-1,-1];
     const ok=eqs.every(([l,v,shift])=>{
       const t=phases.get([(shift+a)%18,m,entry[l]].join(','));
       if(t<0)return false;
       if(dest[v]===-1)dest[v]=t;
       return dest[v]===t;
     });
     if(ok && allKeys.has(dest.join(',')))done.add(dest.join(','));
   }
   assert(done.has(key));
   for(const s of done){assert(unseen.has(s));unseen.delete(s);}
   components.push({representative:entry,size:done.size});
 }
 const group={}; for(const c of components)group[c.size]=(group[c.size]||0)+1;
 console.log(++ii,all.length,components.length,group,components.slice(0,12));
}

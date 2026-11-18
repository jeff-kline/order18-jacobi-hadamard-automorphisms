// Independent comparison of the symbolic Gram predictions to actual fields.
'use strict';
const assert=require('node:assert/strict');
const {fieldTable}=require('../families/search.cjs');
const signs=['+-------+ +--+---+- +-+++-++-','+-+++++++ ++++++-+- +++-+----'];
const paley='+-+-+-+-+';
const mod=(a,n)=>(a%n+n)%n;
for(const p of [7,31,43]){
 const {table}=fieldTable(p,3,18);
 for(const [h,words] of signs.entries()){
  const masks=[...words.split(' '),paley].map(word=>{
   assert.equal(word.length,9);
   const half=[...word].map(x=>x==='+'?1:-1);
   return [...half,...half.map(x=>-x)];
  });
  assert(masks[0].some((x,i)=>x!==masks[0][(i+6)%18]));
  const profiles=new Map();
  for(let e=0;e<18;e++){
   const val=masks.map(s=>{
    let a=1;
    for(let i=0;i<18;i++)for(let j=0;j<18;j++)a+=table[i][j]*s[(e+i+9)%18]*s[(e+j)%18];
    return a;
   });
   assert.equal(val[3],0);
   assert.equal(val.reduce((s,x)=>s+x),0);
   assert.deepEqual(val.slice(0,3).sort((a,b)=>a-b),[-Math.max(...val),0,Math.max(...val)]);
   const k=val.join(',');profiles.set(k,(profiles.get(k)||0)+1);
  }
  const counts=[...profiles.values()].sort((a,b)=>a-b);
  assert.deepEqual(counts,h===0?[2,2,2,4,4,4]:[6,6,6]);
  console.log(p,h+1,JSON.stringify([...profiles]));
 }
}

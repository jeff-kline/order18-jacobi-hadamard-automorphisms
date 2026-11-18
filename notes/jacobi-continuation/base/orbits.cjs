// Refine the marked, normalized matrix on scalar orbits at every degree.
'use strict';
const assert=require('node:assert/strict');
const range=n=>Array.from({length:n},(_,i)=>i);
const mod=(x,n)=>((x%n)+n)%n;
const ell=37;
const grid=f=>range(18).map(i=>range(18).map(j=>f(i,j)));
const field=(a,b,c)=>mod(a,7)+7*mod(b,7)+49*mod(c,7);
const digits=x=>[x%7,Math.floor(x/7)%7,Math.floor(x/49)];
const log=Array(343).fill(-1);
let z=1;
for(let k=0;k<342;k++){
 assert.equal(log[z],-1);log[z]=k%18;
 const [a,b,c]=digits(z);z=field(2*a-c,a+2*b,b+c);
}
assert.equal(z,1);
const T=grid(()=>0);
for(let t=2;t<343;t++){
 const [a,b,c]=digits(t);T[log[t]][log[field(1-a,-b,-c)]]++;
}
function conv(a,b){
 const c=grid(()=>0);
 for(let i=0;i<18;i++)for(let j=0;j<18;j++)for(let u=0;u<18;u++)for(let v=0;v<18;v++)c[(i+u)%18][(j+v)%18]+=a[i][j]*b[u][v];
 return c.map(row=>row.map(z=>mod(z,ell)));
}
const M=['+-------+','+--+---+-','+-+++-++-','+-+-+-+-+'].map(s=>{
 const half=[...s].map(c=>c==='+'?1:-1);return half.concat(half.map(z=>-z));
});
const L=[[1,1,1,1],[-1,1,-1,1],[-1,1,1,-1],[-1,-1,1,1]];
const U=[[-1,-1,-1,-1],[-1,-1,1,1],[-1,1,1,-1],[-1,1,-1,1]];
const S=[[1,1,1,1],[-1,1,-1,1],[-1,1,1,-1],[-1,-1,1,1]];
const orbit=range(4).map(block=>({kind:'border',block}));
for(const block of range(4))orbit.push({kind:'zero',block});
for(const block of range(4))for(const e of range(18))orbit.push({kind:'ordinary',block,e});
const V=80;
function entry(r,c){
 const i=r.block,j=c.block;
 if(r.kind==='border')return c.kind==='border'?L[i][j]:U[i][j];
 if(c.kind==='border')return -U[j][i];
 if(r.kind==='zero'&&c.kind==='zero')return S[i][j];
 assert(r.kind==='zero'||c.kind==='zero');
 const d=i!==j&&(i===0||j===0)?9:0;
 const e=r.kind==='zero'?c.e:r.e+(i===j?9:0);
 return S[i][j]*M[i^j][(e+d)%18];
}
function quotients(table){
 const row=[],col=range(V).map(()=>Array(V)); // Signed sums on each opposite orbit.
 for(const [i,r] of orbit.entries()){
  const sums=[];
  for(const [j,c] of orbit.entries()){
   if(i<8||j<8){
    const s=entry(r,c);
    // For a singleton vertex, divide its sum to ordinary color cells by
    // their common orbit size before modular reduction. Fixed and ordinary
    // color cells are disjoint from the first refinement onward.
    sums.push(s);col[j][i]=s;
   }else{
    const b=r.block,h=c.block,center=(r.e+(b===h?0:9))%18;
    const offset=b!==h&&(b===0||h===0)?9:0;
    const index=mod(c.e-center,18);
    let sum=Number(index===0);
    for(let a=0;a<18;a++)sum+=table[index][a]*M[b^h][(center+9+offset+a)%18];
    const s=mod(S[b][h]*sum,ell);
    sums.push(s);col[j][i]=s; // Equal sizes imply reverse row sums agree as integers.
   }
  }
  row.push(sums);
 }
 return [row,col];
}
function normalized(data,k,l){
 const [row,col]=data;const pivot=entry(orbit[k],orbit[l]);
 const sign=(i,j)=>entry(orbit[k],orbit[j])*entry(orbit[i],orbit[l])*pivot;
 return row.map((v,i)=>v.map((s,j)=>mod(s*sign(i,j),ell)))
 .concat(col.map((v,j)=>v.map((s,i)=>mod(s*sign(i,j),ell))));
}
// Rebuild the base orbit sums directly from field elements in both directions.
// For an orbit pair of unequal sizes the code above divides only the sum from
// a singleton to an ordinary orbit by 19. Here we use literal field sums first.
function checkBase(data){
 const points=orbit.map(o=>o.kind==='ordinary'?range(343).filter(x=>log[x]===o.e):[0]);
 function ordinaryEntry(r,x,c,y){
  const a=digits(x),b=digits(y),same=r.block===c.block;
  const orientation=!same&&(r.block===0||c.block===0)?-1:1;
  const u=field(...b.map((v,k)=>orientation*(v+(same?-1:1)*a[k])));
  return S[r.block][c.block]*(u===0?1:M[r.block^c.block][log[u]]);
 }
 for(let i=0;i<V;i++)for(let j=0;j<V;j++){
  const r=orbit[i],c=orbit[j];
  const value=(x,y)=>(r.kind==='border'||c.kind==='border')?
   entry(r,c):ordinaryEntry(r,x,c,y);
  const row=points[j].reduce((s,y)=>s+value(points[i][0],y),0);
  const col=points[i].reduce((s,x)=>s+value(x,points[j][0]),0);
  assert.equal(mod(data[0][i][j],ell),mod(row/(i<8?points[j].length:1),ell));
  assert.equal(mod(data[1][j][i],ell),mod(col/(j<8?points[i].length:1),ell));
 }
}
function initial(k,l){
 return [k,l].flatMap((anchor,side)=>range(V).map(i=>{
  if(i===anchor)return 4*side+3;
  if(i<8)return 4*side+1+Number((i<4)!==(anchor<4));
  return 4*side;
 }));
}
function signatures(graph,colors,count){
 return graph.map((row,i)=>{
  const totals=Array(count).fill(0),offset=i<V?V:0;
  for(let j=0;j<V;j++)totals[colors[offset+j]]+=row[j];
  return [colors[i],...totals.map(v=>mod(v,ell))].join(',');
 });
}
function refine(a,b,p,t){
 let count=8;
 for(;;){
  const x=signatures(a,p,count),y=signatures(b,t,count);
  const keys=[...new Set(x)].sort();
  const dict=new Map(keys.map((s,i)=>[s,i]));
  const nx=x.map(s=>dict.get(s)),ny=y.map(s=>dict.get(s));
  if(ny.includes(undefined))return null;
  // A color consists either of singleton orbits or of equal-sized ordinary orbits.
  const balance=Array(keys.length).fill(0);
  for(let i=0;i<2*V;i++){balance[nx[i]]++;balance[ny[i]]--;}
  if(balance.some(z=>z!==0))return null;
  if(keys.length===count){
   assert.equal(count,2*V);
   return nx.map(color=>ny.indexOf(color));
  }
  p=nx;t=ny;count=keys.length;
 }
}
function checkBlocks(map){
 const blocks=[[],[]];
 for(const side of [0,1])for(const b of range(4)){
  const local=j=>map[side*V+j]-side*V;
  const targetBlock=local(4+b)-4;
  assert(targetBlock>=0&&targetBlock<4);
  const targetClasses=range(18).map(e=>local(8+18*b+e)-8-18*targetBlock);
  assert.deepEqual([...targetClasses].sort((a,b)=>a-b),range(18));
  blocks[side].push({targetBlock,targetClasses});
 }
 for(const b of range(4)){
  // Paley mask D occurs in the four positions i XOR j = 3.
  assert.equal(blocks[0][b].targetBlock ^ blocks[1][b^3].targetBlock,3);
 }
 return blocks;
}
const inv=n=>range(ell).find(t=>t*n%ell===1);
const T2=conv(T,T);let P=T,Q=343%ell,mass=341%ell;
for(let d=1;d<36;d+=2){
 const table=P.map(row=>row.map(s=>mod(s+(Q-2-mass)*inv(324),ell)));
 const data=quotients(table),a=normalized(data,0,0);
 if(d===1)checkBase(data);
 const pairs=[];
 for(let k=0;k<8;k++)for(let l=4*Math.floor(k/4);l<4*Math.floor(k/4)+4;l++){
  const map=refine(a,normalized(data,k,l),initial(0,0),initial(k,l));
  if(!map)continue;
  const blocks=checkBlocks(map);
  const sample=blocks[0][0].targetClasses.slice(0,3);
  if(k===0)assert.deepEqual(map,range(2*V));
  else assert.notEqual(mod(sample[1]-sample[0],18),mod(sample[2]-sample[1],18));
  pairs.push([k,l,sample]);
 }
 assert.deepEqual(pairs.map(([k,l])=>[k,l]),[[0,0],[1,3],[3,2]]);
 console.log(d,JSON.stringify(pairs));
 P=conv(P,T2);Q=mod(Q*(343%ell)**2,ell);mass=mod(mass*(341%ell)**2,ell);
}
assert.deepEqual(P,T);

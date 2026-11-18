'use strict';
const assert = require('node:assert/strict');
const mod=(a,n)=>(a%n+n)%n;
function primeFactors(n) {
  const out=[];
  for(let d=2;d*d<=n;d++) if(n%d===0) {
    out.push(d); while(n%d===0) n/=d;
  }
  if(n>1) out.push(n);
  return out;
}
// An element with an orbit of size q-1 supplies both irreducibility and primitivity.
function fieldTable(p,r,n) {
  const q=p**r, h=n/2;
  assert((q-1)%n===0 && (q-1)/n%2===1);
  const digits=a=> Array.from({length:r},(_,j)=>Math.floor(a/p**j)%p);
  const encode=a=>a.reduceRight((s,d)=>s*p+mod(d,p),0);
  let coeff, c, logs;
  search: for(let k=1;k<q;k++) {
    coeff=digits(k); if(!coeff[0]) continue;
    for(c=0;c<p;c++) {
      const step=a=>encode(a.map((v,i)=>c*v+(i?a[i-1]:0)-a[r-1]*coeff[i]));
      let a=1; logs=new Int16Array(q).fill(-1);
      for(let i=0;i<q-1;i++) {
        if(!a || logs[a]>=0) break;
        logs[a]=i%n; a=step(digits(a));
        if (i===q-2 && a===1) break search;
      }
    }
  }
  assert(!logs.includes(-1,1));
  const table=Array.from({length:n},()=>Array(n).fill(0));
  for(let x=2;x<q;x++) {
    const y=encode(digits(x).map((a,i)=>(i===0?1:0)-a));
    table[logs[x]][logs[y]]++;
  }
  return {table,coeff,c};
}
function firstLevel(table,n) {
  const h=n/2;
  const masks=[],residual=[];
  for(let m=0;m<2**(h-1);m++) {
    const half=Array.from({length:h},(_,j)=>j && (m & (1<<(j-1))) ? -1:1);
    const w=half.concat(half.map(v=>-v)); masks.push(w);
    residual.push(Array.from({length:h},(_,e)=>{
      let sum=1;
      for(let i=0;i<n;i++) for(let j=0;j<n;j++) sum+=table[i][j]*w[(e+h+i)%n]*w[(e+j)%n];
      return sum;
    }));
  }
  const index=new Map();
  for(let i=0;i<masks.length;i++) {
    const key=residual[i].join(',');
    if(!index.has(key)) index.set(key,[]);
    index.get(key).push(i);
  }
  const triples=[];
  for(let a=0;a<masks.length;a++) {
    if(residual[a].every(z=>!z)) continue;
    for(let b=a;b<masks.length;b++) {
      if(residual[b].every(z=>!z)) continue;
      const key=residual[a].map((v,j)=>-v-residual[b][j]).join(',');
      for(const c of index.get(key)||[]) if(c>=b && residual[c].some(Boolean)) triples.push([a,b,c]);
    }
  }
  return {masks,residual,triples};
}
function classTable(table,n) {
  const h=n/2, primes=primeFactors(n);
  const phi=d=> {
    let p=[-1,...Array(d-1).fill(0),1];
    for(let v=1;v<d;v++) if(d%v===0) {
      const rv=phi(v),quot=Array(p.length-rv.length+1).fill(0);
      for(let i=quot.length-1;i>=0;i--) {
        quot[i]=p[i+rv.length-1]; for(let j=0;j<rv.length;j++)p[i+j]-=quot[i]*rv[j];
      }
      assert(p.every(x=>!x)); p=quot;
    } return p;
  };
  const poly=phi(n), dim=poly.length-1;
  const z=Array.from({length:n},()=>Array(dim).fill(0)); z[0][0]=1;
  for(let i=1;i<n;i++) {
    const prev=z[i-1]; for(let j=0;j<dim;j++)z[i][j]=(prev[j-1]||0)-poly[j]*prev[dim-1];
  }
  const groups=[];
  for(let u=1;u<n;u+=2)for(let v=1;v<n;v+=2) {
    if((u+v)%n===0)continue;
    const exp=Array(n).fill(0);
    for(let i=0;i<n;i++)for(let j=0;j<n;j++)exp[(u*i+v*j)%n]+=table[i][j];
    const val=Array.from({length:dim},(_,j)=>exp.reduce((s,x,k)=>s+x*z[k][j],0));
    const sign=Math.sign(val.find(Boolean)); assert(sign);
    const key=[(u+v)%n,...val.map(x=>sign*x)].join(',');
    let group=groups.find(g=>g.key===key);
    if(!group) {group={key,uv:[]}; groups.push(group);}
    group.uv.push([u,v,sign]);
  }
  function rowSignature(w) {
    const sig=[];
    for(const {uv} of groups) {
      const bin=Array(n).fill(0);
      for(const [u,v,sign] of uv)for(let i=0;i<h;i++)for(let j=0;j<h;j++)
        bin[mod(-u*i-v*j,n)]+=sign*w[i]*w[j];
      for(let j=0;j<dim;j++)sig.push(bin.reduce((s,b,k)=>s+b*z[k][j],0));
    }
    return sig;
  }
  return {groups,rowSignature};
}
function search(p,r,n) {
  const {table,coeff,c}=fieldTable(p,r,n);
  const {masks,residual,triples}=firstLevel(table,n);
  const {rowSignature}=classTable(table,n), cache=new Map();
  const get=i=>{ if(!cache.has(i)) cache.set(i,rowSignature(masks[i])); return cache.get(i); };
  const lifts=triples.filter(([a,b,c])=> {const A=get(a),B=get(b),C=get(c); return A.every((v,j)=>v+B[j]+C[j]===0);});
  const primitive=w=>primeFactors(n).every(p=>w.some((s,j)=>s!==w[(j+n/p)%n]));
  const prim=lifts.filter(t=>t.every(i=>primitive(masks[i])));
  const published=['+-------+', '+--+---+-', '+-+++-++-'];
  const word=i=>masks[i].slice(0,n/2).map(x=>x>0?'+':'-').join('');
  const half=i=>word(i);
  const form=t=>t.map(half).sort().join('/');
  const expected=published.sort().join('/');
  console.log(JSON.stringify({p,r,n,coeff,c,triples:triples.length,lifts:lifts.length,primitive:prim.length,example:prim[0]?.map(i=>({word:word(i),res:residual[i]})),published:prim.some(t=>form(t)===expected)}));
  return {table,masks,residual,prim,lifts,coeff,c};
}
module.exports={search,fieldTable,firstLevel,classTable};
if(require.main===module) search(...process.argv.slice(2).map(Number));

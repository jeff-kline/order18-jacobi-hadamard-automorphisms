'use strict';
const assert=require('node:assert/strict');
const {fieldTable}=require('./search.cjs');
const n=18, mod=(a,n)=>(a%n+n)%n;
const wordsA=['+-------+', '+--+---+-', '+-+++-++-', '+-+-+-+-+'];
const wordsB=['+-+++++++','++++++-+-','+++-+----','+-+-+-+-+'];
const prepare=words=>{
  const masks=words.map(s=>[...s+s].map((v,j)=>(v==='+'?1:-1)*(j<9?1:-1)));
  const index=new Map();
  for(let b=0;b<n;b++){
    const key=masks.map(f=>f[b]).join(',');
    if(!index.has(key))index.set(key,[]);
    index.get(key).push(b);
  }
  const cells=[...index.values()];
  assert.equal(cells.length,6);assert(cells.every(c=>c.length===3));
  return {masks,cells};
};
const A=prepare(wordsA),B=prepare(wordsB);
const sextic={masks:[],cells:Array.from({length:6},(_,j)=>[j,j+6,j+12])};
for(let k=0;k<64;k++) {
  const w=Array.from({length:n},(_,j)=>k>>(j%6)&1?1:-1);
  if(!w.reduce((a,b)=>a+b))sextic.masks.push(w);
}
function tableMap(fn){return Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>fn(i,j)));}
function pow(a,b,p) {
  let x=1;
  while(b){if(b%2)x=x*a%p; a=a*a%p;b=Math.floor(b/2);}
  return x;
}
function solve(p,ell,verbose=false) {
  assert((ell-1)%n===0 && p!==ell);
  const q=p**3;
  const {table}=fieldTable(p,3,n);
  let z=1;
  while(++z<ell) if(pow(z,n,ell)===1 && pow(z,9,ell)!==1 && pow(z,6,ell)!==1)break;
  assert(z<ell);
  const roots=Array.from({length:18},(_,i)=>pow(z,i,ell)), inv=pow(324,ell-2,ell);
  const fourier=(t,s)=>tableMap((u,v)=>{
    let val=0;
    for(let i=0;i<n;i++)for(let j=0;j<n;j++)val+=t[i][j]*roots[mod(s*(u*i+v*j),18)];
    return mod(val,ell);
  });
  const J=fourier(table,1);
  let current=J.map(row=>row.slice());
  const sq=tableMap((i,j)=>pow(J[i][j],2,ell));
  const unsupported=[[],[],[],[]];
  for(let d=1;d<ell;d+=2){
    const actual=current.map(row=>row.slice());actual[0][0]=mod(pow(q%ell,d,ell)-2,ell);
    const counts=fourier(actual,-1).map(row=>row.map(x=>x*inv%ell));
    function profile({masks,cells}){
      const hist=Array((ell+1)/2).fill(0);
      for(const mask of masks)for(let e=0;e<18;e++)for(const cell of cells){
        let sum=0;
        for(const b of cell){
          if(b===e)sum++;
          for(let j=0;j<n;j++)sum+=counts[mod(b-e,n)][j]*mask[(e+9+j)%18];
        }
        hist[Math.min(mod(sum,ell),mod(-sum,ell))]++;
      }
      return hist;
    }
    const a=profile(A),b=profile(B),s=profile(sextic);
    // Valencies and multiplicities are complete for A,B. Sextic support is a superset.
    const ab=a.findIndex((v,k)=>v!==b[k]);
    const as=a.findIndex((v,k)=>v>0&&!s[k]);
    const bs=b.findIndex((v,k)=>v>0&&!s[k]);
        // If the sextic marking has 24 cells of size (Q-1)/6, each such cell is a whole
    // sextic coset; all of them appear. The histogram is then the sum of four
    // single-mask histograms. Testing all multisets permits arbitrary balanced masks.
    let sexticMatch=false;
    if(bs<0){
      const unique=new Map();
      for(const mask of sextic.masks){
        const h=profile({masks:[mask],cells:sextic.cells});
        unique.set(h.join(','),h);
      }
      const opts=[...unique.values()];
      for(let i=0;i<opts.length;i++)for(let j=i;j<opts.length;j++)
        for(let k=j;k<opts.length;k++)for(let l=k;l<opts.length;l++){
          if(b.every((v,t)=>v===opts[i][t]+opts[j][t]+opts[k][t]+opts[l][t]))sexticMatch=true;
        }
    }
    for(const [j,g] of [ab,as,bs,sexticMatch?-1:1].entries())if(g<0)unsupported[j].push(d);

    if(verbose) console.log(d,ab,ab<0?null:[a[ab],b[ab]],as,bs);
    current=tableMap((i,j)=>current[i][j]*sq[i][j]%ell);
  }
  console.log({p,ell,undistinguished:unsupported});
  return unsupported;
}
module.exports={solve};
if(require.main===module) solve(...process.argv.slice(2).map(Number));

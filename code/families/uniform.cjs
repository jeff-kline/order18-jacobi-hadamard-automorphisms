'use strict';
const assert=require('node:assert/strict');
const n=18;
const mod=a=>(a%18+18)%18;
const powers=[[1,0,0,0,0,0]];
for(let k=1;k<=18;k++){
  const [a,b,c,d,e,f]=powers[k-1];
  powers.push([-f,a,b,c+f,d,e].map(x=>x+0));
}
assert.deepEqual(powers[0],powers[18]);
// Powers of (A,B,E) with E^2=AB. C=A²/B, D=B²/A.
const orbit = {
  1:[1,0,0], 7:[1,0,0], 13:[1,0,0],
  5:[0,1,0], 11:[0,1,0], 17:[0,1,0],
  3:[2,-1,0], 15:[-1,2,0], 9:[0,0,1],
};
const second = process.argv[2]==='second';
const words=second ? ['+-+++++++','++++++-+-','+++-+----'] : ['+-------+', '+--+---+-', '+-+++-++-'];
const rows=words.map(w=>[...w].map(x=>x==='+'?1:-1));
function groups(h) {
  const out=new Map();
  for(let u=1;u<n;u+=2) {
    const v=mod(h-u);
    const a=orbit[u], b=orbit[v], c=a.map((z,i)=>z+b[i]);
    if(c[2]===2) { c[0]++; c[1]++; c[2]=0; }
    const key=c.join(',');
    if(!out.has(key)) out.set(key,[]);
    out.get(key).push(u);
  }
  return [...out.values()];
}
function defect(h,us,row) {
  const sum=Array(6).fill(0);
  for(const u of us) for(let i=0;i<9;i++) for(let j=0;j<9;j++) {
    const w=powers[mod(-u*i-(h-u)*j)];
    for(let k=0;k<6;k++) sum[k]+=row[i]*row[j]*w[k];
  }
  return sum;
}
for(let h=2;h<18;h+=2) {
  const parts=groups(h);
  for(const us of parts) {
    const d=rows.map(w=>defect(h,us,w));
    assert(d[0].every((v,k)=>v+d[1][k]+d[2][k]===0));
  }
  console.log('h='+h,JSON.stringify(parts));
}
console.log('All grouped Gram coefficients are zero.');
module.exports={groups,defect};
function normalize(exp) {
  const [a,b,c]=exp; return [a+Math.floor(c/2),b+Math.floor(c/2),c%2];
}
function monomial(h,u) {
  const a=orbit[u],b=orbit[mod(h-u)];
  return normalize(a.map((z,i)=>z+b[i])).join(',');
}
function timesPower(v,k) {
  const out=Array(6).fill(0);
  for(let i=0;i<6;i++)for(let j=0;j<6;j++)out[j]+=v[i]*powers[mod(i+k)][j];
  return out;
}
// For h=2,8,14 the two surviving classes have numerators A² and BE.
// For h=4,10,16 the surviving pair is their conjugate. All h=6,12 groups vanish.
// Delta=(A²-BE)/G_2, and conjugate(Delta)=-tau*Delta with tau=chi(4).
for(const tau of [0,6,12]) {
  const profiles=[];
  for(let c=0;c<18;c++) {
    profiles.push(rows.map(row=>{
      const coeff=Array(6).fill(0);
      for(let h=2;h<18;h+=2) {
        const plus=[2,8,14].includes(h), minus=[4,10,16].includes(h);
        const first=plus?'2,0,0':'0,2,0', second=plus?'0,1,1':'1,0,1';
        let aa,bb;
        for(const group of groups(h)) {
          const mu=monomial(h,group[0]), w=defect(h,group,row);
          if((plus||minus) && mu===first) aa=w;
          else if((plus||minus) && mu===second) bb=w;
          else assert(w.every(x=>!x));
        }
        if(!plus&&!minus) continue;
        assert(aa.every((v,i)=>v+bb[i]===0));
        const piece=timesPower(aa,h*c+(minus?tau+9:0));
        for(let j=0;j<6;j++) coeff[j]+=piece[j];
      }
      return coeff;
    }));
  }
  const nonzero=profiles.flat().find(v=>v.some(Boolean));
  const counts=new Map();
  const values=profiles.map(t=>t.map(v=>{
    if(v.every(x=>!x))return '0';
    if(v.every((x,i)=>x===nonzero[i]))return '+';
    if(v.every((x,i)=>x===-nonzero[i]))return '-';
    throw Error('unexpected fourth value');
  }).join(''));
  for(const profile of values) counts.set(profile,(counts.get(profile)||0)+1);
  // Each shift gives a permutation of (0,+V,-V), and each pattern attains 0, +V and -V.
  for(const profile of values) assert.equal([...profile].sort().join(''),'+-0');
  for(let k=0;k<3;k++) assert.equal(new Set(values.map(v=>v[k])).size,3);
  assert.equal(counts.size,second ? 3 : 6);
  console.log('low-multiplicity indices',values.flatMap((v,i)=>counts.get(v)===2?[i]:[]));
  assert.deepEqual([...counts.values()].sort(),second ? [6,6,6] : [2,2,2,4,4,4]);
  if(!second) assert.deepEqual(values.flatMap((v,i)=>counts.get(v)===2?[i]:[]),[1,4,7,10,13,16]);
  console.log('tau=zeta^'+tau,'representative',nonzero,'profile counts',Object.fromEntries(counts));
}
const paley=[1,-1,1,-1,1,-1,1,-1,1];
const fullRows=rows.concat([paley]).map(r=>r.concat(r.map(x=>-x)));
for(const row of fullRows){
  const coefficients=Array.from({length:n},(_,k)=>{
    const reduced=Array(6).fill(0);
    for(let j=0;j<n;j++)for(let i=0;i<6;i++)reduced[i]+=row[j]*powers[mod(k*j)][i];
    return reduced;
  });
  assert(coefficients.filter(z=>z.some(Boolean)).length<=7);
}
for(let subset=1;subset<16;subset++) {
  const w=Array.from({length:n},(_,j)=>fullRows.reduce((s,f,i)=>(subset&(1<<i))?s*f[j]:s,1));
  if(subset===15)assert(w.every(x=>x===1));
  else assert(Math.abs(w.reduce((a,b)=>a+b,0))<=6);
}
console.log('Every single mask has Fourier support ≤7 and each proper nonempty product has absolute mean ≤1/3.');

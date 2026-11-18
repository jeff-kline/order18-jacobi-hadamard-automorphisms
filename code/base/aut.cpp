// clang++ -O3 -std=c++17 aut.cpp -o /tmp/jacobi-aut && /tmp/jacobi-aut
#include <algorithm>
#include <array>
#include <cassert>
#include <cstdint>
#include <iostream>
#include <map>
#include <numeric>
#include <vector>
using namespace std;
constexpr int q=343, n=1376, v=2*n;
using Vec=vector<int>;
using Graph=vector<vector<uint16_t>>;
int H[n][n], cl[q], lg[q], ex[342];
const int special[8]={0,1,2,3,4,347,690,1033};
int md(int x,int m){return (x%m+m)%m;}
int enc(int a,int b,int c){return md(a,7)+7*md(b,7)+49*md(c,7);}
int add(int a,int b,int s){return enc(a%7+s*(b%7),a/7%7+s*(b/7%7),a/49+s*(b/49));}
int mult(int a,int b){return a&&b?ex[(lg[a]+lg[b])%342]:0;}
void build(){
 int z=1;
 for(int k=0;k<342;k++){ex[k]=z;cl[z]=k%18;lg[z]=k; int a=z%7,b=z/7%7,c=z/49; z=enc(2*a-c,a+2*b,b+c);}
 assert(z==1);
 const int L[4][4]={{1,1,1,1},{-1,1,-1,1},{-1,1,1,-1},{-1,-1,1,1}};
 const int U[4][4]={{-1,-1,-1,-1},{-1,-1,1,1},{-1,1,1,-1},{-1,1,-1,1}};
 const string M[4]={"+-------+","+--+---+-","+-+++-++-","+-+-+-+-+"};
 const int sign[4][4]={{1,1,1,1},{-1,1,-1,1},{-1,1,1,-1},{-1,-1,1,1}};
 for(int r=0;r<n;r++) for(int c=0;c<n;c++){
  int i=(r-4)/q,j=(c-4)/q,x=(r-4)%q,y=(c-4)%q;
  if(r<4){H[r][c]=c<4?L[r][c]:U[r][j];continue;}
  if(c<4){H[r][c]=-U[c][i];continue;}
  int arg=i==j?add(y,x,-1):add(y,x,1);
  if(i!=j&&(i==0||j==0))arg=add(0,arg,-1);
  int a=arg?cl[arg]:0;
  H[r][c]=sign[i][j]*(arg?(M[i^j][a%9]=='+'?1:-1)*(a<9?1:-1):1);
 }
}
Graph normalized(int r,int c){
 Graph g(v);
 for(int i=0;i<n;i++)for(int j=0;j<n;j++)if(H[i][j]*H[r][j]*H[i][c]*H[r][c]<0){
  g[i].push_back(n+j); g[n+j].push_back(i);
 }
 return g;
}
// Each quartet's minority columns form the corresponding column quartet.
Vec initial(int k,int l){
 Vec p(v);
 for(int side=0;side<2;side++){
  int off=side*n,an=side?l:k;
  fill(p.begin()+off,p.begin()+off+n,side*4);
  for(int i=0;i<8;i++)p[off+special[i]]=side*4+1+((i/4)!=(an/4));
  p[off+special[an]]=side*4+3;
 }
 return p;
}
using Key=vector<uint16_t>;
vector<Key> signatures(const Graph&g,const Vec&p,int size){
 vector<Key> keys(v,Key(size+1));
 for(int i=0;i<v;i++){
  keys[i][0]=p[i];
  for(auto j:g[i])keys[i][1+p[j]]++;
 }
 return keys;
}
int refine(const Graph&a,const Graph&b,Vec&p,Vec&t){
 int size=1+*max_element(p.begin(),p.end());
 for(;;){
  auto x=signatures(a,p,size), y=signatures(b,t,size);
  Vec ix(v),iy(v);iota(ix.begin(),ix.end(),0); iy=ix;
  sort(ix.begin(),ix.end(),[&](int i,int j){return x[i]<x[j];});
  sort(iy.begin(),iy.end(),[&](int i,int j){return y[i]<y[j];});
  int count=0;
  for(int i=0;i<v;i++){
   if(x[ix[i]]!=y[iy[i]])return 0;
   if(!i||x[ix[i-1]]!=x[ix[i]])count++;
   p[ix[i]]=t[iy[i]]=count-1;
  }
  if(count==size)return count;
  size=count;
 }
}
map<string,int> types;
long long nodes=0, leaves=0;
bool verified(const Vec& perm){
 int a=perm[0],b=perm[n]-n;
 for(int i=0;i<n;i++)for(int j=0;j<n;j++){
  int r=perm[i],c=perm[n+j]-n;
  if(H[i][j]*H[0][j]*H[i][0]*H[0][0]!=H[r][c]*H[a][c]*H[r][b]*H[a][b])return false;
 }
 return true;
}
// Test every coordinate on all eight field blocks for x -> alpha*x^(7^k)+beta.
string type(const Vec& perm){
 string key;
 for(int side=0;side<2;side++){
  key+=side?" columns":"rows";
  for(int i=0;i<4;i++){
   int offset=side*n, start=offset+4+i*q;
   int y0=perm[start]-offset-4;
   if(y0<0){key+=" *";continue;}
   int block=y0/q, beta=y0%q, alpha=add(perm[start+1]-offset-4-block*q,beta,-1);
   int k=0;
   for(;k<3;k++){
    bool ok=true;for(int x=0;x<q;x++){
     int xp=x?ex[(lg[x]*(k==0?1:k==1?7:49))%342]:0;
     if(perm[start+x]!=offset+4+block*q+add(beta,mult(alpha,xp),1)){ok=false;break;}
    }
    if(ok)break;
   }
   key+=" "+to_string(block)+"/"+(k==3?"?":to_string(k));
  }
 }
 return key;
}
long long search(const Graph&a,const Graph&b,Vec p,Vec t,bool first){
 nodes++;
 int size=refine(a,b,p,t);
 if(!size)return 0;
 if(size==v){
  Vec image(v),rev(v);for(int i=0;i<v;i++)rev[t[i]]=i;
  for(int i=0;i<v;i++)image[i]=rev[p[i]];
  if(!verified(image))return 0;
  leaves++;types[type(image)]++;return 1;
 }
 Vec cnt(size),src(size);for(int i=0;i<v;i++){cnt[p[i]]++;src[p[i]]=i;}
 int best=-1;
 for(int i=0;i<size;i++)if(cnt[i]>1&&(best<0||cnt[i]<cnt[best]))best=i;
 int x=src[best];p[x]=size;
 long long total=0;
 for(int i=0;i<v;i++)if(t[i]==best){
  t[i]=size;total+=search(a,b,p,t,first);t[i]=best;
  if(first&&total)return total;
 }
 return total;
}
int main(int argc,char**argv){
 build();
 auto a=normalized(0,0);Vec p=initial(0,0);
 long long stab=0,orbit=0;
 for(int k=0;k<8;k++)for(int l=4*(k/4);l<4*(k/4)+4;l++){
  if(argc>1 && (k!=atoi(argv[1])||l!=atoi(argv[2])))continue;
  auto b=normalized(special[k],special[l]);bool first=(k||l);
  auto h=search(a,b,p,initial(k,l),first);if(!first)stab=h;if(h)orbit++;
  cout<<"anchors "<<k<<" "<<l<<" maps "<<h<<" cumulative nodes "<<nodes<<endl;
 }
 cout<<"stabilizer "<<stab<<" orbit "<<orbit<<" effective order "<<stab*orbit<<" signed order "<<2*stab*orbit<<"\n";
 for(auto&[k,z]:types)cout<<z<<" "<<k<<"\n";
}

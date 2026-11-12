// Shared helpers for the TNMWorld tools: load every data file into one object.
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const FILES=['world','wcw','wwf','uswa','pp','ajpw','njpw','cmll','asw','twa'];
const ORDER=['wcw','wwf','uswa','pp','ajpw','njpw','cmll','asw','twa'];
function load(){
  const g={P:{},E:[],ARTICLES:{},CONTRACTS:{},FINANCE:{},SITES:{},BANNER_SVG:{}};
  let src='';for(const f of FILES)src+=fs.readFileSync(path.join(ROOT,'data',f+'.js'),'utf8')+'\n';
  if(fs.existsSync(path.join(ROOT,'data','earnings.js')))src+=fs.readFileSync(path.join(ROOT,'data','earnings.js'),'utf8')+'\n';
  src+=';return {WORLD_DATE,TICKER,EARNINGS:typeof EARNINGS==="undefined"?null:EARNINGS};';
  const fn=new Function('P','E','ARTICLES','CONTRACTS','FINANCE','SITES','BANNER_SVG',src);
  return Object.assign(g,fn(g.P,g.E,g.ARTICLES,g.CONTRACTS,g.FINANCE,g.SITES,g.BANNER_SVG));
}
// Same rule as pickTicker() in index.html: newest posted first, max 15, every promotion keeps its newest.
function pickTicker(list,ARTICLES,max=15){
  const promoOf=([t,id])=>(ARTICLES[id]&&ARTICLES[id].p)||'_';
  const keep=new Set();ORDER.forEach(k=>{const i=list.findIndex(x=>promoOf(x)===k);if(i>=0)keep.add(i)});
  for(let i=0;i<list.length&&keep.size<max;i++)keep.add(i);
  return list.filter((_,i)=>keep.has(i));
}
module.exports={ROOT,ORDER,load,pickTicker};

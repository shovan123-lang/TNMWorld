// Loads the site's data files and prints what build.py needs as JSON: contracts, the world date, and for the
// champions' pool the title histories (TITLE_LEDGER), each promotion's current champions, its logged gates and its cards.
const fs=require('fs'),path=require('path');const root=path.join(__dirname,'..','..');
global.P={};global.E=[];global.ARTICLES={};global.CONTRACTS={};global.FINANCE={};global.SITES={};global.BANNER_SVG={};
let src='';for(const f of ['world','wcw','wwf','uswa','pp','ajpw','njpw','cmll','asw','twa','fmw','gwf','titles'])src+=fs.readFileSync(path.join(root,'data',f+'.js'),'utf8')+'\n';
src+='\nglobal.__WD=WORLD_DATE;global.__TL=TITLE_LEDGER;';eval(src);
const fin={};for(const[k,f]of Object.entries(FINANCE))if(f&&f.rows)fin[k]=f.rows.map(r=>({d:r.d,show:r.show,gate:r.gate}));
const cards=E.map(e=>({p:e.p,d:e.d,city:e.city||'',type:e.type||'',gate:e.gate==null?null:String(e.gate),m:(e.m||[]).map(x=>x[0])}));
const champs={};for(const[k,p]of Object.entries(P))champs[k]=(p.titles||[]).map(t=>[t[0],t[1]]);
process.stdout.write(JSON.stringify({world:global.__WD,contracts:CONTRACTS,ledger:global.__TL,finance:fin,cards,champs}));

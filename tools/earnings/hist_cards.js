// node tools/earnings/hist_cards.js YYYY-MM : prints, as JSON, every card dated before that month that has results
// (the show archives in data/history.js and any cards in data/<promotion>.js), with who wrestled on it.
// Who was in each match is worked out by the Talent File engine (tools/talent_engine.js) exactly as the site does,
// so a wrestler's paid cards here are the same cards counted as Matches on their Talent File.
// build.py uses it to pay the cards that ran before the earnings tracker's first month.
const fs=require('fs'),vm=require('vm'),path=require('path');
const ROOT=path.join(__dirname,'..','..');
const ctx={P:{},E:[],ARTICLES:{},CONTRACTS:{},FINANCE:{},SITES:{},BANNER_SVG:{},console};vm.createContext(ctx);
for(const f of fs.readdirSync(path.join(ROOT,'data'))) if(f.endsWith('.js')) vm.runInContext(fs.readFileSync(path.join(ROOT,'data',f),'utf8').replace(/^const (\w+)\s*=/mg,'globalThis.$1 ='),ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'tools','talent_engine.js'),'utf8'),ctx);
// The same promotion order index.html gives the engine (it decides which roster a shared surname belongs to)
const om=/const ORDER\s*=\s*(\[[^\]]*\])/.exec(fs.readFileSync(path.join(ROOT,'index.html'),'utf8'));
const ORDER=om?JSON.parse(om[1].replace(/'/g,'"')):Object.keys(ctx.P);
const W=ctx.WORLD_DATE, P=ctx.P;
const past=e=>e.ran?true:(P[e.p].asOf?e.d<=P[e.p].asOf:e.d<W);
const extra=ctx.TalentEngine.extras(P,ctx.CONTRACTS,ctx.TALENT_EXTRA||[],ORDER);
const ALL=(ctx.HIST||[]).concat(ctx.E);
const files=ctx.TalentEngine.build(P,ALL,{order:ORDER,past,world:W,teams:ctx.TEAMS||{},extra});
const cut=(process.argv[2]||'1991-07')+'-01';
const cards=new Map();
for(const f of files.values())for(const r of f.run){
  if(r.e.d>=cut) continue;
  let c=cards.get(r.e);
  if(!c){const ms=(r.e.m||[]).filter(m=>m&&m[0]);
    c={p:r.e.p,d:r.e.d,type:r.e.type||'',city:r.e.city||'',link:r.e.link||'',hist:!!r.e.hist,gate:r.e.gate==null?'':String(r.e.gate),
       n:ms.length,people:new Set(),byMatch:ms.map(()=>new Set()),_ms:ms};cards.set(r.e,c);}
  c.people.add(f.name);const i=c._ms.indexOf(r.m);if(i>=0)c.byMatch[i].add(f.name);
}
const out=[...cards.values()].map(c=>{
  // main event = the last match that named anyone, semi-main = the one before it (card order, as on the site's July cards)
  const named=c.byMatch.filter(s=>s.size);
  return {p:c.p,d:c.d,type:c.type,city:c.city,link:c.link,hist:c.hist,gate:c.gate,n:c.n,people:[...c.people].sort(),
    main:named.length?[...named[named.length-1]]:[],semi:named.length>1?[...named[named.length-2]]:[]};
}).sort((a,b)=>a.d.localeCompare(b.d)||a.p.localeCompare(b.p)||a.link.localeCompare(b.link));
process.stdout.write(JSON.stringify({world:W,cut,cards:out}));

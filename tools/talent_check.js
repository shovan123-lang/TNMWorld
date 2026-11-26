// node tools/talent_check.js [name] : run the Talent File engine against the site data and report.
// --unres [n] : card sides that matched nobody.  --missing : every name on a card that has no Talent File
// (add a real person to the roster, the departures list or TALENT_EXTRA in data/world.js).
const fs=require('fs'),vm=require('vm'),path=require('path');
const ROOT=path.join(__dirname,'..');const ctx={P:{},E:[],ARTICLES:{},CONTRACTS:{},FINANCE:{},SITES:{},BANNER_SVG:{},console};vm.createContext(ctx);
for(const f of fs.readdirSync(path.join(ROOT,'data'))) if(f.endsWith('.js')) vm.runInContext(fs.readFileSync(path.join(ROOT,'data',f),'utf8').replace(/^const (\w+)\s*=/mg,'globalThis.$1 ='),ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname,'talent_engine.js'),'utf8'),ctx);
const W=ctx.WORLD_DATE;const past=e=>e.ran?true:(ctx.P[e.p].asOf?e.d<=ctx.P[e.p].asOf:e.d<W);
const extra=ctx.TalentEngine.extras(ctx.P,ctx.CONTRACTS,ctx.TALENT_EXTRA||[],Object.keys(ctx.P));
const unres={},miss={};const files=ctx.TalentEngine.build(ctx.P,ctx.E,{past,world:W,teams:ctx.TEAMS||{},unres,extra,piece:(b,k)=>{const x=b.trim();if(/^[A-Z]/.test(x)&&!/\b(title|tba|to establish|team|qf|sf|final|#\d)\b/i.test(x))(miss[x+'  ('+k+')']=(miss[x+'  ('+k+')']||0)+1);}});
if(process.argv[2]==='--missing'){const m=Object.entries(miss).sort((a,b)=>b[1]-a[1]);console.log(m.length?m.map(x=>x[1]+'  '+x[0]).join('\n'):'Every name on the cards has a Talent File.');process.exit(0);}
if(process.argv[2]==='--unres'){console.log(Object.entries(unres).sort((a,b)=>b[1]-a[1]).slice(0,+process.argv[3]||80).map(x=>x[1]+'  '+x[0]).join('\n'));process.exit(0);}
const want=process.argv[2];
if(want){const f=files.get(want);console.log(f.name,f.record,'undecided',f.u,[...f.promos]);for(const r of f.run)console.log(' ',r.res,r.e.d,r.e.p,'|',r.m[0],'|',r.m[1]);process.exit(0);}
let n=0,withM=0,tot=0,und=0;for(const f of files.values()){n++;if(f.run.length)withM++;tot+=f.run.length;und+=f.u;}
console.log('files',n,'with matches',withM,'match rows',tot,'undecided',und);
for(const [nm,rec] of [['Eddie Guerrero','9–0'],['Jushin Liger','11–2–1'],['Rick Rude','5–4'],['Brian Pillman','6–4'],['Stan Hansen','3–3–1'],['Sting','7–3']]){const f=files.get(nm);console.log(nm.padEnd(16),'engine',f.record.padEnd(8),'hand',rec,'undecided',f.u,'matches',f.run.length);}

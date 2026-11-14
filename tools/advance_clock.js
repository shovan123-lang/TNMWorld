#!/usr/bin/env node
/* Move the world clock forward and do everything that goes with it.
   node tools/advance_clock.js 1991-07-20 [--dry]
   1. sets WORLD_DATE in data/world.js
   2. trims the ticker to 15 (every promotion keeps its newest)
   3. rebuilds the Talent Earnings tracker (tools/earnings/build.py)
   4. prints a report: who's behind or ahead of the world, shows run but not in the
      earnings tracker, Japan tour fees now payable, injuries, and double bookings
      in the next 14 days.
   It does not commit or push. */
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const {ROOT,ORDER,load,pickTicker}=require('./lib');
const args=process.argv.slice(2), dry=args.includes('--dry'), nd=args.find(a=>/^\d{4}-\d\d-\d\d$/.test(a));
let D=load(); const old=D.WORLD_DATE;
if(!nd){console.error('Usage: node tools/advance_clock.js YYYY-MM-DD [--dry]   (world date is now '+old+')');process.exit(1);}
if(nd<=old){console.error(`New date ${nd} must be after the current world date ${old}.`);process.exit(1);}
const addDays=(d,n)=>{const t=new Date(d+'T12:00:00Z');t.setUTCDate(t.getUTCDate()+n);return t.toISOString().slice(0,10)};
const out=[];const say=s=>out.push(s);
say(`WORLD CLOCK: ${old} -> ${nd}${dry?'  (dry run, nothing written)':''}`);

// 1 + 2: world.js
const wf=path.join(ROOT,'data','world.js'); let w=fs.readFileSync(wf,'utf8');
w=w.replace(/const WORLD_DATE = "[^"]*"/,`const WORLD_DATE = "${nd}"`);
const tk=pickTicker(D.TICKER,D.ARTICLES);
if(tk.length<D.TICKER.length){
  const a=w.indexOf('const TICKER = ['),b=w.indexOf('];',a)+2;
  w=w.slice(0,a)+'const TICKER = '+JSON.stringify(tk,null,1)+';'+w.slice(b);
}
say(`Ticker: ${D.TICKER.length} -> ${tk.length} headlines`);
if(!dry) fs.writeFileSync(wf,w);

// 3: earnings
let eb='';
try{eb=execFileSync('python3',[path.join(ROOT,'tools','earnings','build.py'),nd],{encoding:'utf8'});execFileSync('python3',[path.join(ROOT,'tools','earnings','doc.py')]);}catch(e){say('!! Earnings rebuild FAILED: '+e.message);}
if(dry){ // put the earnings file back the way it was
  try{execFileSync('git',['checkout','--','data/earnings.js','tools/earnings/earnings.md','tools/earnings/tracker_doc.md','tools/earnings/ledger_summary.md'],{cwd:ROOT});}catch(e){}
}
say('Earnings: '+(eb.split('\n')[0]||'(no output)'));
D=load();

// 4: report
say('\nPROMOTIONS vs the world date');
for(const k of ORDER){const p=D.P[k],a=p.asOf||'(none)';
  const toLog=D.E.filter(e=>e.p===k&&e.d<=nd&&e.d>(p.asOf||'0')&&!e.ran);
  const st=!p.asOf?'no asOf':a<nd?`behind (last run ${a})`:a>nd?`ahead (last run ${a})`:'level';
  say(`  ${p.short.padEnd(10)} ${st}${toLog.length?' · still to run/log: '+toLog.map(e=>e.d.slice(5)+' '+e.city).join('; '):''}`);}

if(D.EARNINGS){
  const inT=new Set(D.EARNINGS.shows.map(s=>s.p+s.d));
  const per=['uswa','cmll','asw','twa','pp','fmw'];
  const miss=D.E.filter(e=>per.includes(e.p)&&e.d.slice(0,7)===D.EARNINGS.world.slice(0,7)&&(e.d<=(D.P[e.p].asOf||'')||e.ran)&&e.m&&e.m.length&&!inT.has(e.p+e.d));
  say('\nEARNINGS TRACKER');
  say(miss.length?'  !! Shows that have run but are NOT in tools/earnings/shows.py (add them, then rebuild):\n'+miss.map(e=>`     ${e.d} ${D.P[e.p].short} ${e.city}`).join('\n'):'  Every per-appearance show that has run is counted.');
  const due=D.EARNINGS.people.filter(x=>x.due>0).reduce((a,x)=>a+x.due,0);
  say(`  Paid so far $${Math.round(D.EARNINGS.people.reduce((a,x)=>a+x.earned,0)).toLocaleString()} · tour fees still due $${Math.round(due).toLocaleString()}`);
  say('  Top 5: '+D.EARNINGS.people.slice(0,5).map(x=>`${x.name} $${Math.round(x.earned).toLocaleString()}`).join(' · '));
}

say('\nINJURED (from rosters)');
for(const k of ORDER){const inj=(D.P[k].roster||[]).filter(r=>/INJ/i.test(r[1]||''));if(inj.length)say(`  ${D.P[k].short}: `+inj.map(r=>`${r[0]} (${r[1].replace(/^INJ:?\s*/i,'')})`).join('; '));}

// double bookings: wrestlers on 2+ promotions' contract lists, cards on the same date
const ALIAS={"Sting 1992":"Sting","The Blue Blazer":"Owen Hart","Mike Rotunda":"Irwin R. Schyster","El Hijo Del Santo":"El Hijo del Santo","Abdullah The Butcher":"Abdullah the Butcher","El Gran Hamada":"Gran Hamada"};
const who={};for(const k of ORDER)for(const r of (D.CONTRACTS[k]||{rows:[]}).rows){if(r[0]==='O')continue;const n=ALIAS[r[1]]||r[1];(who[n]=who[n]||new Set()).add(k);
  if(ALIAS[r[1]])(who[n].alt=who[n].alt||[]).push(r[1]);}
const allLast={};for(const n in who){const l=n.split(' ').pop();allLast[l]=(allLast[l]||0)+1;}
const shared=Object.entries(who).filter(([n,s])=>s.size>1);
const win=addDays(nd,14); const clash=[];
const dates=[...new Set(D.E.filter(e=>e.d>old&&e.d<=win).map(e=>e.d))].sort();
for(const d of dates){const ev=D.E.filter(e=>e.d===d&&e.m);
  for(const [n,s] of shared){const keys=[n,...(s.alt||[])];const last=n.split(' ').pop();
    const hit=ev.filter(e=>s.has(e.p)&&e.m.some(m=>{const t=m.join(' ');return keys.some(x=>t.includes(x))||(allLast[last]===1&&last.length>3&&new RegExp('\\b'+last+'\\b').test(t));}));
    const ps=[...new Set(hit.map(e=>e.p))];
    if(ps.length>1)clash.push(`  ${d} ${n}: `+ps.map(p=>D.P[p].short+' '+hit.find(e=>e.p===p).city).join(' + '));}}
say(`\nDOUBLE BOOKINGS ${old.slice(5)} to ${win.slice(5)} (shared talent on two cards the same night)`);
say(clash.length?clash.join('\n'):'  None found.');
console.log(out.join('\n'));

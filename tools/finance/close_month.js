#!/usr/bin/env node
/* File one month's profit and loss for every promotion into data/fin_archive.js.
   node tools/finance/close_month.js 1991-07 [--dry] [--force]
   Runs the site's own finance code (the FIN-CORE block in index.html) with the world date set to the month's
   last day, so the archive matches what the Finance tab showed at the close. Run it before the Talent Earnings
   tracker is switched to the next month (tools/advance_clock.js does this on its own when it crosses a month end).
   --force replaces a month that's already filed. --world YYYY-MM-DD treats the world date as that day (for dry runs). */
const fs=require('fs'),path=require('path');
const {ROOT,ORDER,load}=require('../lib');
const args=process.argv.slice(2), mo=args.find(a=>/^\d{4}-\d\d$/.test(a)), dry=args.includes('--dry'), force=args.includes('--force');
if(!mo){console.error('Usage: node tools/finance/close_month.js YYYY-MM [--dry] [--force]');process.exit(1);}
const D=load(); const wa=args.indexOf('--world'); if(wa>=0&&args[wa+1])D.WORLD_DATE=args[wa+1];  // --world: the date the clock is moving to (dry runs)
const last=mo+'-'+String(new Date(Date.UTC(+mo.slice(0,4),+mo.slice(5,7),0)).getUTCDate()).padStart(2,'0');
if(D.WORLD_DATE<last){console.error(`The world date is ${D.WORLD_DATE}; ${mo} isn't over until ${last}.`);process.exit(1);}
const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
const a=html.indexOf('/* FIN-CORE:start'), b=html.indexOf('/* FIN-CORE:end */');
if(a<0||b<0){console.error('FIN-CORE block not found in index.html');process.exit(1);}
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const dt=s=>{const [y,m,d]=s.split('-').map(Number);return new Date(Date.UTC(y,m-1,d))};
const fmt=s=>{const x=dt(s);return `${DOW[x.getUTCDay()]} ${MON[x.getUTCMonth()]} ${x.getUTCDate()}`};
// Freeze the books at the month's last day.
const E=D.EARNINGS?JSON.parse(JSON.stringify(D.EARNINGS)):undefined;
const MNAMES=['January','February','March','April','May','June','July','August','September','October','November','December'];
if(E){const label=MNAMES[+mo.slice(5,7)-1]+' '+mo.slice(0,4);
  if(E.month!==label){console.error(`The Talent Earnings tracker is on ${E.month}, not ${label}: talent pay for ${mo} is gone. Run this before switching the tracker to the next month.`);process.exit(1);}
  E.world=last;}
const fn=new Function('FINANCE','CONTRACTS','EARNINGS','WORLD_DATE','fmt','dt',html.slice(a,b)+';return {finMonthRec};');
const {finMonthRec}=fn(D.FINANCE,D.CONTRACTS,E,last,fmt,dt);
const rec={closed:last,p:{}};
for(const k of ORDER){const r=finMonthRec(k,mo);if(r&&(r.rev||r.costs))rec.p[k]=r;}
// Merge into data/fin_archive.js
const af=path.join(ROOT,'data','fin_archive.js'); let src=fs.readFileSync(af,'utf8');
const m=src.match(/const FIN_ARCHIVE = (\{[\s\S]*\});\s*$/); const A=m?JSON.parse(m[1]):{};
if(A[mo]&&!force){console.log(`${mo} is already filed (closed ${A[mo].closed}). Use --force to replace it.`);process.exit(0);}
A[mo]=rec; const out={};Object.keys(A).sort().forEach(x=>out[x]=A[x]);
const money=v=>(v<0?'-$':'$')+Math.abs(v).toLocaleString('en-US');
console.log(`${dry?'(dry run) ':''}Filed ${mo}, closed ${last}:`);
let T={rev:0,costs:0,profit:0};
for(const [k,r] of Object.entries(rec.p)){T.rev+=r.rev;T.costs+=r.costs;T.profit+=r.profit;
  console.log(`  ${k.padEnd(5)} revenue ${money(r.rev).padStart(13)}  costs ${money(r.costs).padStart(13)}  ${r.profit<0?'loss  ':'profit'} ${money(r.profit).padStart(13)}`);}
console.log(`  WORLD revenue ${money(T.rev).padStart(13)}  costs ${money(T.costs).padStart(13)}  ${T.profit<0?'loss  ':'profit'} ${money(T.profit).padStart(13)}`);
if(!dry) fs.writeFileSync(af,src.slice(0,m?m.index:src.length)+'const FIN_ARCHIVE = '+JSON.stringify(out,null,1)+';\n');

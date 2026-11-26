/* Talent File engine: builds a file for every rostered wrestler from the cards.
   Used by index.html (browser) and by tools/talent_check.js (node).
   For each match it works out who was in it (full names, surnames like "Liger",
   and team names from TEAMS) and who won (from the result text).
   Roster names that differ only in case or accents ("Abdullah the Butcher" /
   "Abdullah The Butcher") are one person with one file. A lone surname only
   matches someone on that promotion's roster or named in full on its cards;
   "D. Gilbert" uses the initial.
   Files are also built for people who aren't on a roster (opts.extra, see extras()):
   anyone on a promotion's departures list or pay scale, and the enhancement talent
   named in TALENT_EXTRA. On that promotion's cards their surname is tried after the
   roster's, so a departed wrestler never takes a match from a rostered one. */
(function(root){
const STOP=new Set(['the','el','la','los','las','jr','sr','mr','de','del','big','ii','iii','dr','sgt','king','kid','super','great','dos','mil','el','san','von','van']);
const norm=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9&' ]+/g,' ').replace(/\s+/g,' ').trim();
const toks=s=>norm(s).split(' ').filter(t=>t.length>=3&&!STOP.has(t));
const SKIP=/^(segment|angle|promo|interview|closing|dark match:\s*segment)\b/i;
const DRAW=/\bdraw\b|double (count-?out|dq|disqualification|pin)|no contest|time[- ]limit|both (men|teams) (are )?counted/i;
const LOSE_AFTER=/^[^a-z0-9]{0,3}(passes out|passed out|submits(?= to|\s*$)|taps\b|gives up|is pinned|loses|dq'd|is disqualified|counted out|is counted|falls to)/i;
const LOSE_BEFORE=/(pins|pinned|rolls up|rolled up|beats|beat|submits|counts out|counted out|makes|over|defeats|d\.|powerbombs|chokeslams|on|cradles|catches|traps|stops|finishes|surprises)\s*$/i;

function build(P,E,opts){
  opts=opts||{};
  const ORDER=opts.order||Object.keys(P), TEAMS=opts.teams||{}, past=opts.past, world=opts.world;
  // roster index
  const people=new Map();           // name -> {name,promos:Set,notes:{k:note}}
  const byPromoTok={};              // k -> token -> Set(names)
  const allTok={};                  // token -> Set(names)
  const canon=new Map();             // norm(name) -> the first spelling seen
  for(const k of ORDER){const p=P[k];if(!p||!p.roster)continue;byPromoTok[k]={};
    for(const [n0,note] of p.roster){
      const n=canon.get(norm(n0))||n0;canon.set(norm(n0),n);
      if(!people.has(n))people.set(n,{name:n,promos:new Set(),notes:{}});
      const x=people.get(n);x.promos.add(k);x.notes[k]=note||'';
      for(const t of toks(n)){(byPromoTok[k][t]=byPromoTok[k][t]||new Set()).add(n);(allTok[t]=allTok[t]||new Set()).add(n);}
    }}
  const otherTok={};                 // k -> token -> Set(names): people tied to k who aren't on its roster
  for(const [n0,k,note] of (opts.extra||[])){
    const n=canon.get(norm(n0))||n0;canon.set(norm(n0),n);
    if(!people.has(n))people.set(n,{name:n,promos:new Set([k]),notes:{}});   // on another roster: k shows only if they worked there
    const x=people.get(n);if(!x.notes[k])x.notes[k]=note||'';
    if(byPromoTok[k]&&[...toks(n)].every(t=>byPromoTok[k][t]&&byPromoTok[k][t].has(n)))continue;   // already on k's roster
    otherTok[k]=otherTok[k]||{};
    for(const t of toks(n)){(otherTok[k][t]=otherTok[k][t]||new Set()).add(n);(allTok[t]=allTok[t]||new Set()).add(n);}
  }
  const exact=new Map([...people.keys()].map(n=>[norm(n),n]));
  const teamIdx=new Map(Object.entries(TEAMS).map(([t,m])=>[norm(t),m.map(n=>canon.get(norm(n))||n)]));
  // Who appears by full name on each promotion's cards: a lone surname can also mean one of them
  // (Kevin Sullivan left WCW's roster, but "Sullivan" on a WCW card is still him).
  const seen={},seenTokC={};
  for(const e of E)for(const m of (e.m||[])){if(!m||!m[0])continue;const t=' '+norm(m[0])+' ';
    for(const [nn,n] of exact)if(t.includes(' '+nn+' '))(seen[e.p]=seen[e.p]||new Set()).add(n);}
  function seenTok(k){if(seenTokC[k])return seenTokC[k];const o={};for(const n of (seen[k]||[]))for(const t of toks(n))(o[t]=o[t]||new Set()).add(n);return seenTokC[k]=o;}
  function resolveOne(str,k,wholeOnly){
    const s=norm(str.replace(/\(.*?\)/g,''));if(!s)return [];
    if(exact.has(s))return [exact.get(s)];
    const st=s.replace(/^the /,'');
    if(teamIdx.has(s)||teamIdx.has(st))return (teamIdx.get(s)||teamIdx.get(st)).filter(n=>people.has(n));
    if(wholeOnly)return [];                  // "A & B" as a whole: only a team name, never a token match
    const ts=toks(str);if(!ts.length)return [];
    const ini=(/^([a-z])\.?\s/i.exec(str.trim())||[])[1];   // "D. Gilbert"
    const pools=[byPromoTok[k]||{},otherTok[k]||{},ts.length>1?allTok:seenTok(k)];
    for(const pool of pools){
      let cand=null;for(const t of ts){const c=pool[t];if(!c){cand=null;break}cand=cand?new Set([...cand].filter(x=>c.has(x))):new Set(c);}
      if(cand&&cand.size>1&&ini)cand=new Set([...cand].filter(x=>norm(x)[0]===ini.toLowerCase()));
      if(cand&&cand.size===1)return [...cand];
      if(cand&&cand.size>1)return [];        // ambiguous
    }
    return [];
  }
  const IGNORE_PAREN=/^\s*(w\/|with\b|c\b|c\)|.*ringside|replaced|taped|non-title|debut|.*no-showed)/i;
  function sidesOf(title){
    const ci=title.lastIndexOf(': ');
    if(ci>-1&&/\bvs\.?\s/i.test(title.slice(0,ci)))title=title.slice(ci+2);   // "Hair vs. hair: A vs. B"
    const parts=title.split(/\s+vs\.?\s+/i);if(parts.length<2)return null;
    const c0=parts[0].lastIndexOf(': ');if(c0>-1)parts[0]=parts[0].slice(c0+2);  // drop "IC Title:", "Main:", "Tercias SF:" ...
    return parts.map(p=>p.trim());
  }
  function membersOf(side,k){
    const parens=[];const base=side.replace(/\(([^)]*)\)?/g,(_,x)=>{if(x&&!IGNORE_PAREN.test(x))parens.push(x);return ' ';}).replace(/\s+/g,' ').trim();
    let names=[];const raw=[base];
    const whole=resolveOne(base,k,/\s(?:&|and)\s|,/i.test(base));
    if(whole.length)names=whole;
    else base.split(/\s*(?:,|&|\band\b)\s*/i).filter(Boolean).forEach(b=>{raw.push(b);const r=resolveOne(b,k);if(!r.length&&opts.piece)opts.piece(b,k);names=names.concat(r)});
    parens.forEach(x=>x.split(/\s*(?:,|&|\band\b)\s*/i).filter(Boolean).forEach(b=>{raw.push(b);names=names.concat(resolveOne(b,k))}));
    return {names:[...new Set(names)],raw};
  }
  function outcome(sides,res){
    if(!res)return null;
    if(DRAW.test(res))return {draw:true};
    const r=norm(res);let best=null;
    sides.forEach((sd,i)=>{
      const keys=new Set();sd.names.forEach(n=>{keys.add(norm(n));toks(n).forEach(t=>keys.add(t))});
      sd.raw.forEach(x=>{const nx=norm(x.replace(/\(.*?\)/g,''));if(nx.length>=3)keys.add(nx);toks(x).forEach(t=>keys.add(t));const lw=nx.split(' ').pop();if(lw&&lw.length>=3&&!['the','and','jr','sr','ii'].includes(lw))keys.add(lw)});
      sd.names.forEach(n=>{const lw=norm(n).split(' ').pop();if(lw&&lw.length>=3&&!['jr','sr','ii','iii'].includes(lw))keys.add(lw)});
      for(const key of keys){const re=new RegExp('(^|[^a-z0-9])'+key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?:s|es)?(?=[^a-z0-9]|$)');const m=re.exec(r);
        if(m){const pos=m.index+m[1].length;if(!best||pos<best.pos||(pos===best.pos&&key.length>best.len))best={pos,len:key.length+(m[0].length-m[1].length-key.length),side:i};}}
    });
    if(!best)return null;
    const after=r.slice(best.pos+best.len), before=r.slice(Math.max(0,best.pos-24),best.pos);
    if(LOSE_AFTER.test(after)||LOSE_BEFORE.test(before)){if(sides.length===2)return {win:1-best.side};return null;}
    return {win:best.side};
  }
  const files=new Map();
  for(const n of people.keys())files.set(n,{name:n,promos:new Set(people.get(n).promos),notes:people.get(n).notes,run:[],booked:[],w:0,l:0,d:0,u:0});
  const airLater=(m,e)=>{const x=/^Ep\s*\d+\s*\((\d{1,2})\/(\d{1,2})\)/i.exec(m[0]);if(!x)return false;const d=e.d.slice(0,4)+'-'+String(x[1]).padStart(2,'0')+'-'+String(x[2]).padStart(2,'0');return world&&d>world;};
  for(const e of E){for(const m of (e.m||[])){
    if(!m||!m[0]||SKIP.test(m[0]))continue;
    const sd=sidesOf(m[0]);if(!sd)continue;
    const sides=sd.map(s=>membersOf(s,e.p));
    if(opts.unres)sides.forEach((s,i)=>{if(!s.names.length)opts.unres[sd[i]]=(opts.unres[sd[i]]||0)+1});
    if(!sides.some(s=>s.names.length))continue;
    const isPast=past(e)&&m[1]&&!airLater(m,e);
    const oc=isPast?outcome(sides,m[1]):null;
    sides.forEach((s,i)=>s.names.forEach(n=>{
      const f=files.get(n);if(!f)return;f.promos.add(e.p);
      const row={e,m,side:i};
      if(isPast){row.res=oc?(oc.draw?'D':(oc.win===i?'W':'L')):'?';f.run.push(row);f[{W:'w',L:'l',D:'d','?':'u'}[row.res]]++;}
      else f.booked.push(row);
    }));
  }}
  for(const f of files.values()){f.run.sort((a,b)=>a.e.d.localeCompare(b.e.d));f.booked.sort((a,b)=>a.e.d.localeCompare(b.e.d));
    f.record=f.w+'–'+f.l+(f.d?'–'+f.d:'');}
  return files;
}
// Everyone who should have a file but isn't on a roster: [name, promotion, note].
// Departures first (their note says why they left), then pay-scale rows (not announcers,
// tier O) for names on no roster, then the enhancement talent in TALENT_EXTRA.
function extras(P,CONTRACTS,EXTRA,order){
  const ORDER=order||Object.keys(P), out=[], seen=new Set(), onRoster=new Set();
  for(const k of ORDER)for(const [n] of ((P[k]||{}).roster||[]))onRoster.add(norm(n));
  const add=(n,k,note)=>{const key=norm(n)+'|'+k;if(seen.has(key))return;seen.add(key);out.push([n,k,note]);};
  for(const k of ORDER)for(const [n,note] of ((P[k]||{}).departures||[]))add(n,k,'Left: '+(note||''));
  for(const k of ORDER)for(const r of (((CONTRACTS||{})[k]||{}).rows||[])){
    if(r[0]==='O')continue;const n=String(r[1]);
    if(onRoster.has(norm(n))||onRoster.has(norm(n.replace(/\s+(19|20)\d\d$/,''))))continue;   // "Sting 1992" is Sting
    add(n,k,r[3]||'On the pay scale');}
  for(const [n,k,note] of (EXTRA||[]))add(n,k,note||'Enhancement talent');
  return out;
}
root.TalentEngine={build,extras,norm,toks};
})(typeof window!=='undefined'?window:globalThis);

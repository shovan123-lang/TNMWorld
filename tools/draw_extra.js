// TV exposure and star-power inputs for the Draw Index (tools/tnm_draw.py --extra).
// One row per wrestler with a Talent File:
//   tv      credit for every rated TV appearance (data/ratings.js): national US TV (Nielsen shows) 1.0,
//           Japanese network TV 0.9, regional US TV 0.5, times how the episode did against the show's
//           usual number (v / base). A match counts on the episode it aired on (taped matches included);
//           a part in a TV segment, interview or at ringside counts half (full name, or a surname of 5+
//           letters that nobody else with a Talent File shares).
//   w l d   record from the cards (the Talent File engine)
//   titles  belts held now (P.<key>.titles; a team's belt counts for each member)
//   worked  promotions he has actually worked a card for
//   ppv     trailing PPV credit, 0 to 1 (tools/tnm_draw.py turns it into up to +8 index points):
//           each PPV match = place on the card (main event 1, other title match or semi-main .75, undercard .5,
//           pre-show .25) x the PPV's size (sqrt of buys / 125,000), then it fades: x .6 for every PPV his
//           promotions have run since without him, and halved every 60 days. Capped at 1.
//   ppv_on  the PPV that gives most of it
// Usage: node tools/draw_extra.js > extra.csv
const fs = require('fs'), vm = require('vm'), path = require('path');
const ROOT = path.join(__dirname, '..');
const ctx = {P: {}, E: [], ARTICLES: {}, CONTRACTS: {}, FINANCE: {}, SITES: {}, BANNER_SVG: {}, console}; vm.createContext(ctx);
for (const f of fs.readdirSync(path.join(ROOT, 'data'))) if (f.endsWith('.js'))
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8').replace(/^const (\w+)\s*=/mg, 'globalThis.$1 ='), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'talent_engine.js'), 'utf8'), ctx);
const W = ctx.WORLD_DATE, P = ctx.P, TEAMS = ctx.TEAMS || {};
const past = e => e.ran ? true : (P[e.p] && P[e.p].asOf ? e.d <= P[e.p].asOf : e.d < W);
const extra = ctx.TalentEngine.extras(P, ctx.CONTRACTS, ctx.TALENT_EXTRA || [], Object.keys(P));
const files = ctx.TalentEngine.build(P, (ctx.HIST || []).concat(ctx.E), {past, world: W, teams: TEAMS, extra});
const T = ctx.tvRatings({P, E: ctx.E, CONTRACTS: ctx.CONTRACTS, FINANCE: ctx.FINANCE, TEAMS, WORLD_DATE: W, HIST: [], DRAWS: null});

const REACH = {nielsen: 1.0, vr: 0.9, local: 0.5};
const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const credit = ep => (REACH[ep.show.unit] || 0.5) * ep.v / ep.show.base;
const onMatch = new Map();   // match row object -> credit of the episode it aired on
const segs = [];             // [normalized segment text, credit]
for (const ep of T.eps) {
  if (ep.e.d < '1991-07-01') continue;   // this world's TV only, not the archive replays
  const c = credit(ep);
  for (const m of ep.m || []) {
    if (/^(segment|angle|promo|interview)\b/i.test(m[0]) || /^Ep\s*\d+:\s*(?!.*\bvs\.)/i.test(m[0])) segs.push([' ' + norm(m[0] + ' ' + (m[1] || '')) + ' ', c / 2]);
    else {onMatch.set(m, c); const ring = (m[0].match(/\([^)]*\)/g) || []).join(' '); if (ring) segs.push([' ' + norm(ring) + ' ', c / 2, m]);}
  }
  for (const n of (ep.e.n || []).filter(x => /^Segments:/i.test(x))) segs.push([' ' + norm(n) + ' ', c / 2]);
}
const holders = {};
for (const k in P) for (const t of (P[k].titles || [])) {
  const h = String(t[1] || ''); if (!h || /vacant|to establish/i.test(h)) continue;
  for (const n of (TEAMS[h] || h.split(/\s*&\s*/))) holders[norm(n)] = (holders[norm(n)] || 0) + 1;
}
// surnames nobody else shares
const lastBy = {};
for (const f of files.values()) {const t = norm(f.name).split(' '); const l = t[t.length - 1]; if (l && l.length >= 5) (lastBy[l] = lastBy[l] || []).push(f.name);}
const surname = {}; for (const l in lastBy) if (lastBy[l].length === 1) surname[lastBy[l][0]] = ' ' + l + ' ';
const csv = v => /[",]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
// PPVs that have run, with buys (Finance), and each match's place on the card
const TOP = /World Title|WWF Title|Unified Title|World Heavyweight|Triple Crown|IWGP Heavyweight|World Championship/i;
const ppvs = T.ppvs.filter(p => p.d <= W).map(p => {
  const ms = (p.e.m || []).filter(m => m && /\bvs\.?\s/i.test(m[0]));
  const mainIdx = (() => {const i = ms.findIndex(m => TOP.test(m[0])); return i >= 0 ? i : ms.length - 1;})();
  const place = new Map(ms.map((m, i) => [m, /^Pre-show/i.test(m[0]) ? .25 : i === mainIdx ? 1 :
    (/Title|Championship/i.test(m[0]) || Math.abs(i - mainIdx) === 1) ? .75 : .5]));
  return {p: p.p, d: p.d, name: p.name, size: Math.sqrt(Math.min(1, (p.buys || 0) / 125000)), place};
}).sort((a, b) => a.d.localeCompare(b.d));
const days = (a, b) => (new Date(b) - new Date(a)) / 864e5;
console.log('wrestler,tv,w,l,d,titles,worked,ppv,ppv_on');
for (const f of files.values()) {
  let tv = 0; const key = ' ' + norm(f.name) + ' ';
  for (const r of f.run) if (onMatch.has(r.m)) tv += onMatch.get(r.m);
  const sk = surname[f.name], inMatch = new Set(f.run.map(r => r.m));
  for (const [txt, c, m] of segs) {
    if (m && inMatch.has(m)) continue;                                 // already credited for wrestling it
    if (txt.includes(key) || (sk && (txt.includes(sk) || txt.includes(sk.trimEnd() + 's ')))) tv += c;
  }
  const worked = new Set(f.run.filter(r => r.e.d >= '1991-07-01').map(r => r.e.p)).size;
  // trailing PPV credit
  const mine = new Set(f.run.map(r => r.e.p)); let ppv = 0, best = 0, bestOn = '';
  for (const pv of ppvs) {
    const r = f.run.find(r => r.e === undefined ? false : pv.place.has(r.m)); if (!r) continue;
    const missed = ppvs.filter(x => x.d > pv.d && mine.has(x.p) && !f.run.some(r2 => x.place.has(r2.m))).length;
    const c = pv.place.get(r.m) * pv.size * Math.pow(.6, missed) * Math.pow(.5, days(pv.d, W) / 60);
    ppv += c; if (c > best) {best = c; bestOn = pv.name;}
  }
  console.log([csv(f.name), tv.toFixed(3), f.w, f.l, f.d, holders[norm(f.name)] || 0, worked, Math.min(1, ppv).toFixed(3), csv(bestOn)].join(','));
}

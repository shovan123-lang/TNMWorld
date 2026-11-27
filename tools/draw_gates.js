// Draw figures for the Draw Index (tools/tnm_draw.py --draws): one row per main-event wrestler per card,
// with that card's gate divided by its promotion's average gate (1.0 = an average house), and the gate in dollars.
// The main event is the last match on the card (segments and dark matches don't count); tag teams count
// every member (TEAMS). Only cards that have run (on or before the World Clock) with a $ gate are used.
// The ratio is kept between 0.2 and 3.0, so one PPV or one empty building doesn't swamp a run.
// Usage: node tools/draw_gates.js > draws.csv
//        node tools/draw_gates.js --stars > stars.csv   every rated match: wrestler,stars,date (--stars-csv)
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const FILES = ['world', 'wcw', 'wwf', 'uswa', 'pp', 'ajpw', 'njpw', 'cmll', 'asw', 'twa', 'fmw'];
const g = {P: {}, E: [], ARTICLES: {}, CONTRACTS: {}, FINANCE: {}, SITES: {}, BANNER_SVG: {}};
let src = ''; for (const f of FILES) src += fs.readFileSync(path.join(ROOT, 'data', f + '.js'), 'utf8') + '\n';
src += ';return {WORLD_DATE, TEAMS: typeof TEAMS !== "undefined" ? TEAMS : {}};';
const {WORLD_DATE, TEAMS} = new Function('P', 'E', 'ARTICLES', 'CONTRACTS', 'FINANCE', 'SITES', 'BANNER_SVG', src)(g.P, g.E, g.ARTICLES, g.CONTRACTS, g.FINANCE, g.SITES, g.BANNER_SVG);

const money = s => {const m = String(s || '').match(/\$([\d,]+)/); return m ? +m[1].replace(/,/g, '') : null;};
const isMatch = m => m && m[0] && !/^(Segment|Promo|Interview|Card not set|Dark)\b/i.test(m[0]) && /\bvs\.?\s/i.test(m[0]);
const people = title => {
  const t = title.replace(/^[^:]*:\s*(?=.*\bvs\.)/, '')            // "IWGP Title: A vs. B"
    .replace(/\((w\/|with)[^)]*\)/gi, '').replace(/\([^)]*\)/g, '');
  const out = [];
  for (const side of t.split(/\s+vs\.?\s+/i)) for (let n of side.split(/\s*(?:&|,|\band\b)\s*/)) {
    n = n.replace(/\b(two|three|four) jobbers?\b|\bjobbers?\b/gi, '').trim();
    if (!n) continue;
    if (TEAMS[n]) out.push(...TEAMS[n]); else out.push(n);
  }
  return out;
};

const cards = g.E.filter(e => e.d <= WORLD_DATE && money(e.gate) && (e.m || []).some(isMatch));
const avg = {};
for (const e of cards) {(avg[e.p] = avg[e.p] || []).push(money(e.gate));}
for (const k in avg) avg[k] = avg[k].reduce((a, b) => a + b, 0) / avg[k].length;

const starVal = r => {const s = String(r || '').replace(/\s+/g, '').toUpperCase(); if (!s) return null; if (s === 'DUD') return 0;
  const m = s.match(/^(-?)(\**)(?:(\d)\/(\d))?\**$/); if (!m || (!m[2] && !m[3])) return null; const v = m[2].length + (m[3] ? m[3] / m[4] : 0); return m[1] ? -v : v;};
const csv = v => /[",]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
if (process.argv.includes('--stars')) {
  console.log('wrestler,stars,date');
  for (const e of g.E.filter(e => e.d <= WORLD_DATE)) for (const m of (e.m || []).filter(isMatch)) {
    const v = starVal(m[2]); if (v === null) continue;
    for (const w of new Set(people(m[0]))) console.log([csv(w), v, e.d].join(','));
  }
  process.exit(0);
}
console.log('wrestler,promotion,gate_vs_avg,date,gate');
for (const e of cards) {
  const main = e.m.filter(isMatch).pop();
  const ratio = Math.max(0.2, Math.min(3, money(e.gate) / avg[e.p])).toFixed(3);
  for (const w of new Set(people(main[0]))) console.log([csv(w), e.p, ratio, e.d, money(e.gate)].join(','));
}

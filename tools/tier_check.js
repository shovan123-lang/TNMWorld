// Contract tier guide from the Draw Index.
// For each promotion, ranks the wrestlers on its pay scale (tiers A to F; M, O and S rows are left out) by their
// Draw Index and hands out that promotion's own A, B, C... slots in that order, so the number of A's, B's and so
// on stays as it is. Anyone whose tier is two or more steps away from the one the index suggests is listed
// (one step is within the noise of a few weeks' data).
// Usage: node tools/tier_check.js            every promotion
//        node tools/tier_check.js wwf wcw    only those
//        node tools/tier_check.js --all      list everyone, with the one-step moves too
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const FILES = ['world', 'wcw', 'wwf', 'uswa', 'pp', 'ajpw', 'njpw', 'cmll', 'asw', 'twa', 'fmw'];
const RANKED = ['A', 'B', 'C', 'D', 'E', 'F'];
const NO_INDEX = 20;   // same as an empty slot in the TV ratings model

const g = {P: {}, E: [], ARTICLES: {}, CONTRACTS: {}, FINANCE: {}, SITES: {}, BANNER_SVG: {}};
let src = ''; for (const f of FILES) src += fs.readFileSync(path.join(ROOT, 'data', f + '.js'), 'utf8') + '\n';
const dp = path.join(ROOT, 'data', 'draws.js');
if (!fs.existsSync(dp)) {console.log('No data/draws.js yet: run tools/tnm_draw.py first.'); process.exit(0);}
src += fs.readFileSync(dp, 'utf8') + '\n;return DRAWS;';
const DRAWS = new Function('P', 'E', 'ARTICLES', 'CONTRACTS', 'FINANCE', 'SITES', 'BANNER_SVG', src)(g.P, g.E, g.ARTICLES, g.CONTRACTS, g.FINANCE, g.SITES, g.BANNER_SVG);

const key = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const args = process.argv.slice(2), all = args.includes('--all'), only = args.filter(a => !a.startsWith('--'));
const idxOf = name => {const r = DRAWS.rows[key(String(name).replace(/\s+19\d\d$/, ''))]; return r ? r.idx : null;};

console.log(`Contract tier guide, Draw Index of ${DRAWS.world}\n`);
let flagged = 0;
for (const k of Object.keys(g.CONTRACTS)) {
  if (only.length && !only.includes(k)) continue;
  const rows = (g.CONTRACTS[k].rows || []).filter(r => RANKED.includes(r[0]));
  if (!rows.length) continue;
  const quota = rows.map(r => r[0]).sort();          // the promotion's own slots, best first
  const ranked = rows.map(r => ({name: r[1], tier: r[0], idx: idxOf(r[1])}))
    .sort((a, b) => (b.idx ?? NO_INDEX) - (a.idx ?? NO_INDEX) || RANKED.indexOf(a.tier) - RANKED.indexOf(b.tier));
  ranked.forEach((w, i) => {w.suggest = quota[i]; w.gap = RANKED.indexOf(w.tier) - RANKED.indexOf(w.suggest);});
  const show = ranked.filter(w => all || Math.abs(w.gap) >= 2);
  console.log(`${k.toUpperCase()} (${rows.length} on tiers A-F)`);
  if (!show.length) console.log('  Every tier fits the index.');
  for (const w of show) {
    const move = w.gap > 0 ? `move up to ${w.suggest}` : w.gap < 0 ? `drops to ${w.suggest}` : 'fits';
    console.log(`  ${w.name.padEnd(26)} ${w.tier} -> ${w.suggest}  ${move.padEnd(12)} index ${w.idx ?? 'none'}`);
    if (Math.abs(w.gap) >= 2) flagged++;
  }
  console.log('');
}
console.log(`${flagged} tier${flagged === 1 ? '' : 's'} two or more steps out of line with the index. ` +
  'This only suggests: nothing on the pay scale changes until the office says so.');

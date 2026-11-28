// Prints the TV ratings and PPV buys the site shows (the model is in data/ratings.js).
// Usage: node tools/ratings.js            every rated episode, then shows not rated yet, then PPV buys
//        node tools/ratings.js wwf wcw    only those promotions
//        node tools/ratings.js --why      add what moved each rating (card, draw or headliners, titles, hype, crowd)
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const FILES = ['world', 'wcw', 'wwf', 'uswa', 'pp', 'ajpw', 'njpw', 'cmll', 'asw', 'twa', 'fmw', 'gwf', 'history', 'ratings'];
function load() {
  const g = {P: {}, E: [], ARTICLES: {}, CONTRACTS: {}, FINANCE: {}, SITES: {}, BANNER_SVG: {}};
  let src = ''; for (const f of FILES) src += fs.readFileSync(path.join(ROOT, 'data', f + '.js'), 'utf8') + '\n';
  const dp = path.join(ROOT, 'data', 'draws.js');   // the Draw Index is optional
  src += fs.existsSync(dp) ? fs.readFileSync(dp, 'utf8') + '\n' : 'const DRAWS = null;\n';
  src += ';return {WORLD_DATE, TEAMS, HIST, RATINGS, tvRatings, DRAWS};';
  return Object.assign(g, new Function('P', 'E', 'ARTICLES', 'CONTRACTS', 'FINANCE', 'SITES', 'BANNER_SVG', src)(g.P, g.E, g.ARTICLES, g.CONTRACTS, g.FINANCE, g.SITES, g.BANNER_SVG));
}
const g = load();
const args = process.argv.slice(2), why = args.includes('--why'), only = args.filter(a => !a.startsWith('--'));
const T = g.tvRatings(g);
const keep = p => !only.length || only.includes(p);
const fmtV = (ep) => ep.v.toFixed(1) + (g.RATINGS.units[ep.show.unit].pct ? '%' : '');
console.log(`TV ratings to ${g.WORLD_DATE} (national Nielsen for WWF/WCW, local for USWA, Video Research % for Japan)\n`);
for (const ep of T.eps.filter(x => keep(x.show.p))) {
  let line = `${ep.d}  ${ep.show.p.toUpperCase().padEnd(5)} ${ep.show.name.padEnd(26)} ${fmtV(ep).padStart(5)}${ep.fixed ? ' (fixed)' : ''}`;
  if (why) line += `   card ${ep.q} (${ep.qFrom}); ${ep.draw !== null ? `talent ${ep.draw} (index of ${ep.snap}): ${ep.drawWho.join(', ') || 'none'}` : `headliners ${ep.sp}${ep.who.length ? ': ' + ep.who.join(', ') : ''}`}; titles ${ep.titles}${ep.hype ? '; ' + ep.hype : ''}${ep.crowd != null ? '; crowd ' + ep.crowd : ''}; last week ${ep.prev ?? 'base ' + ep.show.base}`;
  console.log(line);
}
const un = T.unrated.filter(x => keep(x.show.p));
if (un.length) {console.log('\nNot rated yet:'); un.forEach(x => console.log(`${x.e.d}  ${x.show.p.toUpperCase().padEnd(5)} ${x.show.name}: ${x.why}`));}
const pv = T.ppvs.filter(x => keep(x.p));
if (pv.length) {console.log('\nPPV buys:'); pv.forEach(x => console.log(`${x.d}  ${x.p.toUpperCase().padEnd(5)} ${x.name}: ${x.buys != null ? x.buys.toLocaleString('en-US') + ' buys' + (x.take != null ? ', $' + x.take.toLocaleString('en-US') + ' to the promotion' : '') : 'not yet reported'}`));}

/* TNM World Wrestling Report: TV ratings and PPV buys.
   Shown on each promotion's Ratings tab (weekly chart and PPV buys), in the front page's By the numbers,
   and on every rated show in the Show Archive. Also used by tools/ratings.js (prints the table for write-ups).

   TV RATINGS are worked out from the shows themselves (Sean, 2026-11-26). Nothing is typed in: every rating
   is recomputed from the cards each time the page loads, so a new episode is rated as soon as its results are logged.

   Which shows: RATINGS.shows (Sean's list, 2026-11-26): WWF Superstars, Challenge, Prime Time, All American;
   WCW Pro and Saturday Night; USWA Championship TV and Mid-South Showcase (called Worldwide until WCW's cease-and-desist, 7/22/91); and the Japanese tour nights that are on TV
   (an NJPW or AJPW card whose type says TV Asahi, World Pro Wrestling, Nippon TV or TV taping); and CMLL on Televisa
   (Sean, 2026-11-27): the Friday card at Arena México, taped for Sunday. A CMLL card is an airing when its type is
   Viernes Espectacular, Verano de Escándalo or says "Televisa taping" (Arena México Fridays only; every other CMLL
   date is a non-televised house show). Charted on the Friday it was taped, like the Japanese tour nights.
   A card is an airing when its promotion matches and its type matches the show's `match`. US tapings are skipped
   (the episode is its own card on its air date). An airing is rated once it has run (the Show Archive rule) and
   has results: its own match list, or, for an episode with none, the lines of an earlier taping that start "Ep N".
   History: for the promotions in RATINGS.history, the archive-only cards in data/history.js (HIST) are rated too,
   with the same model, so USWA's chart runs from its first Championship TV in September 1990 (Sean, 2026-11-26).
   An episode that only replays matches from earlier cards (USWA Championship TV, March to May 1991) is rated on
   those matches, with the results and ratings they got on the night (HIST's "aired" list; Sean, 2026-11-26). The
   crowd doesn't count for a replay, since it wasn't that week's crowd.

   The model. Each show starts from its slot's usual number (`base`: outlet, time slot and promotion size in
   1991 terms) and moves from there:
     card    +6% for every star the card rating is above **1/2, less below it (no card rating: the average of its
             rated matches, which is within about a third of a star of the card rating on the cards that have both;
             nothing rated: counted as **)
     talent  once the Draw Index is running (data/draws.js, written by tools/tnm_draw.py at each World Clock
             advance). Each name on the show gets a star power from 0 to 1:
                 power = 0.4 x tier + 0.6 x (Draw Index / 100)
             tier is his tier on this promotion's pay scale (A 1, B .75, C .5, D .3, E .15, F .1; not on it or
             M/O/S: 0) and a name with no index counts 20. The show's talent is the average power of its top 3
             names (an empty slot counts 0.6 x .20 = .12), and moves the rating +3% for every 0.1 above 0.5, less
             below it: a show with three A-tier 90s gains about 14%, a show of nobodies loses about 11%.
             Names are found in the matches, results and "Segments:" note (a tag team counts its members; a surname
             alone counts for a wrestler on this promotion's pay scale if nobody else there shares it). Each episode
             uses the snapshot in force on its air date (DRAWS.snaps), so a new snapshot never re-rates old weeks.
     stars   before the Draw Index (or when no snapshot is that old), in place of talent: +4% for every headliner on the show past the
             first: names from the promotion's pay scale (CONTRACTS) found in the matches, results and "Segments:"
             note; tier A counts 1, tier B half; at most 3
     titles  +3% for each title match, at most 2
     hype    +6% for a go-home show (the promotion's next PPV within 7 days) or a special
     crowd   +3% for a crowd of 10,000 or more on camera, -3% for under 1,500 (the card's own gate, or its taping's)
   Ratings are sticky: the result is 60% this week's number and 40% the show's previous rated episode (a first
   episode carries over its base). It's kept inside the slot's min and max and rounded to a tenth.

   Units. WWF and WCW: national Nielsen household ratings. USWA: local household ratings in the markets that carry
   each show (Memphis for Championship TV). NJPW and AJPW: Video Research household ratings (%), charted on the
   tour night taped for TV. CMLL: Mexico City household ratings (the starting point, 9.0, is a 1991-style estimate
   for a Sunday network slot). Don't compare across units: the World ratings page (World menu, TV Ratings) gives each
   unit (`market`) its own panel, and compares shows across markets only against each show's usual number (`base`).

   To set a number by hand (a "real" rating), add it to RATINGS.fixed as "<promo> <date> <show id>": 4.1.
   A fixed number carries over to the next week like any other.

   PPV BUYS come from the Finance tab and are never worked out here: the "Pay-per-view share" line in
   FINANCE.<key>.other for that date (its `buys` field, or "N buys" in its note), else "N buys" in that day's
   Finance row note. A PPV that has run with nothing logged shows as "Not yet reported". A PPV is a card whose type
   matches RATINGS.ppv (put "(PPV)" in the type of a new one). A line with est: 1 is a number made up to fit
   (USWA Star Wars 1991: 15,000 buys, sized against the USWA's regional reach and the WWF's and WCW's July buys;
   Sean, 2026-11-26), and the pages then don't say "nothing here is estimated". */

const RATINGS = {
  units: {
    nielsen: {label: "Nielsen rating", long: "National Nielsen household rating", market: "US national", pct: 0},
    local: {label: "Local rating", long: "Local household rating in the markets that carry each show (Memphis for Championship TV)", market: "USWA local", pct: 0},
    vr: {label: "Rating (%)", long: "Video Research household rating, charted on the tour night taped for TV", market: "Japan", pct: 1},
    mx: {label: "Rating", long: "Mexico City household rating, charted on the Friday night at Arena México taped for Sunday", market: "Mexico", pct: 0}
  },
  shows: [
    {id: "superstars", p: "wwf", name: "WWF Superstars", short: "Superstars", match: /^Superstars\b/i, outlet: "Syndication, Saturday morning", base: 3.6, min: 2.6, max: 4.8, unit: "nielsen"},
    {id: "challenge", p: "wwf", name: "Wrestling Challenge", short: "Challenge", match: /^(Wrestling )?Challenge\b/i, outlet: "Syndication, Sunday", base: 3.1, min: 2.2, max: 4.2, unit: "nielsen"},
    {id: "primetime", p: "wwf", name: "Prime Time Wrestling", short: "Prime Time", match: /^Prime Time\b/i, outlet: "USA Network, Monday night", base: 2.6, min: 1.8, max: 3.6, unit: "nielsen"},
    {id: "aaw", p: "wwf", name: "All American Wrestling", short: "All American", match: /^All American Wrestling\b/i, outlet: "USA Network, Sunday", base: 2.2, min: 1.5, max: 3.0, unit: "nielsen"},
    {id: "saturday", p: "wcw", name: "WCW Saturday Night", short: "Saturday Night", match: /^WCW Saturday Night\b/i, outlet: "TBS, Saturday evening", base: 2.9, min: 2.0, max: 3.8, unit: "nielsen"},
    {id: "pro", p: "wcw", name: "WCW Pro", short: "WCW Pro", match: /^WCW Pro\b/i, outlet: "Syndication, Saturday morning", base: 1.7, min: 1.1, max: 2.5, unit: "nielsen"},
    {id: "championship", p: "uswa", name: "USWA Championship TV", short: "Championship TV", match: /^Championship (Wrestling|TV)\b/i, outlet: "WMC-TV Memphis, Saturday morning, live", base: 9.5, min: 6.0, max: 14.0, unit: "local"},
    {id: "worldwide", p: "uswa", name: "USWA Mid-South Showcase", short: "Mid-South Showcase", match: /^(Worldwide|Mid-South Showcase)\b/i, outlet: "Regional syndication · called Worldwide through 7/17/91", base: 3.5, min: 2.0, max: 5.5, unit: "local"},
    {id: "wpw", p: "njpw", name: "World Pro Wrestling", short: "World Pro Wrestling", match: /TV Asahi|World Pro Wrestling|TV taping/i, tour: 1, outlet: "TV Asahi", base: 6.2, min: 4.0, max: 9.0, unit: "vr"},
    {id: "ntv", p: "ajpw", name: "All Japan on Nippon TV", short: "Nippon TV", match: /Nippon TV|TV taping/i, tour: 1, outlet: "Nippon TV", base: 5.6, min: 3.5, max: 8.5, unit: "vr"},
    {id: "televisa", p: "cmll", name: "CMLL on Televisa", short: "Televisa", match: /^Viernes Espectacular\b|^Verano de Esc[aá]ndalo\b|Televisa taping/i, tour: 1, outlet: "Televisa, Sunday (taped Friday at Arena México)", base: 9.0, min: 6.0, max: 13.0, unit: "mx"}
  ],
  weights: {card: 0.06, cardMid: 2.5, cardNone: 2, draw: 0.03, drawMid: 0.5, drawTop: 3, drawEmpty: 20, tierShare: 0.4, tierScore: {A: 1, B: 0.75, C: 0.5, D: 0.3, E: 0.15, F: 0.1}, stars: 0.04, starsCap: 3, titles: 0.03, titlesCap: 2, hype: 0.06, hypeDays: 7, crowd: 0.03, crowdBig: 10000, crowdSmall: 1500, carry: 0.4},
  ppv: /\(PPV\)|pay-per-view|^The Great American Bash\b/i,
  history: ["uswa"],
  fixed: {}
};

/* Works out every rating. D = {P, E, CONTRACTS, FINANCE, TEAMS, WORLD_DATE, HIST (optional), DRAWS (optional)}.
   Returns {eps (rated episodes, oldest first), byShow, unrated (aired, no results yet), ppvs, byCard (Map card -> label)}. */
function tvRatings(D) {
  const R = RATINGS, Wt = R.weights, W = D.WORLD_DATE;
  const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9&' ]+/g, " ").replace(/\s+/g, " ").trim();
  const STOP = new Set(["the", "mr", "jr", "sr", "big", "el", "la", "de", "del", "von", "van", "dr", "sgt", "ii", "iii"]);
  const star = r => {const s = String(r || "").replace(/\s+/g, "").toUpperCase(); if (!s) return null; if (s === "DUD") return 0;
    const m = s.match(/^(-?)(\**)(?:(\d)\/(\d))?\**$/); if (!m || (!m[2] && !m[3])) return null; const v = m[2].length + (m[3] ? m[3] / m[4] : 0); return m[1] ? -v : v;};
  const ran = e => e.ran ? e.d <= W : e.d < W && (D.P[e.p] && D.P[e.p].asOf ? e.d <= D.P[e.p].asOf : true);   // a card marked ran counts on the world date too, as in the Show Archive
  const starText = v => {const r = Math.round(v * 4) / 4, w = Math.floor(r), f = Math.round((r - w) * 4); return r <= 0 ? "DUD" : "*".repeat(w) + (f ? (f === 2 ? "1/2" : f + "/4") : "");};
  const realM = m => (m || []).filter(x => x && x[0] && x[0] !== "Card not set");
  const crowdOf = g => {const s = String(g || ""); if (/^\$/.test(s)) return null; const a = s.match(/^~?([\d,]+)/); return a ? +a[1].replace(/,/g, "") : null;};
  const addDays = (d, n) => {const x = new Date(d + "T00:00:00Z"); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10);};
  const weekOf = d => {const x = new Date(d + "T00:00:00Z"); x.setUTCDate(x.getUTCDate() - ((x.getUTCDay() + 6) % 7)); return x.toISOString().slice(0, 10);};
  const isPPV = e => R.ppv.test(e.type || "");
  const ALL = (D.HIST || []).filter(e => (R.history || []).includes(e.p)).concat(D.E);

  // Headliners per promotion: tier A = 1, tier B = 0.5. Each matches on the full name, or a surname that only one of them has.
  const stars = {};
  const starsFor = k => {
    if (stars[k]) return stars[k];
    const rows = ((D.CONTRACTS || {})[k] || {}).rows || [];
    const list = rows.filter(r => r[0] === "A" || r[0] === "B").map(r => {const full = norm(r[1]); const t = full.split(" ").filter(x => x.length >= 3 && !STOP.has(x) && !/^\d+$/.test(x)); return {name: r[1], w: r[0] === "A" ? 1 : 0.5, full: full.replace(/\s*\d{4}$/, ""), last: t[t.length - 1] || ""};});
    const count = {}; list.forEach(x => count[x.last] = (count[x.last] || 0) + 1);
    list.forEach(x => {if (x.last.length < 4 || count[x.last] > 1) x.last = "";});
    return (stars[k] = list);
  };
  const teamKeys = Object.keys(D.TEAMS || {}).filter(t => /\s/.test(t) || /^[A-Z]{2,}$/.test(t));
  // Draw Index snapshots, oldest first. dkey matches the site's Talent File key (tfNorm).
  const dkey = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const snaps = ((D.DRAWS || {}).snaps || []).slice().sort((a, b) => a.d.localeCompare(b.d));
  const snapFor = d => {let r = null; for (const x of snaps) if (x.d <= d) r = x; return r;};
  // Pay-scale tier score per promotion, keyed like the Draw Index.
  const tiers = {};
  const tierOf = (k0, key) => {
    if (!tiers[k0]) {tiers[k0] = {}; for (const r of (((D.CONTRACTS || {})[k0] || {}).rows || [])) tiers[k0][dkey(String(r[1]).replace(/\s+19\d\d$/, ""))] = Wt.tierScore[r[0]] || 0;}
    return tiers[k0][key] || 0;
  };
  // Surnames (4+ letters) that only one wrestler on the promotion's pay scale has, so "Hogan" or "Piper's Pit"
  // finds him. Anyone else needs his full name on the card (Jimmy Hart doesn't count as Bret on a WWF show).
  const lastOf = (snap, k0) => {
    snap._last = snap._last || {};
    if (snap._last[k0]) return snap._last[k0];
    const pay = new Set((((D.CONTRACTS || {})[k0] || {}).rows || []).map(r => dkey(String(r[1]).replace(/\s+19\d\d$/, ""))));
    const by = {};
    for (const k in snap.rows) {if (!pay.has(k)) continue;const t = k.split(" ").filter(x => x.length >= 4 && !STOP.has(x) && !/^\d+$/.test(x)); const l = t[t.length - 1]; if (l) (by[l] = by[l] || []).push(k);}
    const out = {}; for (const l in by) if (by[l].length === 1) out[l] = by[l][0];
    return (snap._last[k0] = out);
  };
  const has = (txt, w) => w && new RegExp("(^|[^a-z0-9])" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^a-z0-9])").test(txt);

  // Airings
  const airs = [];
  for (const e of ALL) {
    const s = R.shows.find(s => s.p === e.p && s.match.test(e.type || "") && (s.tour || !/taping|taped for/i.test(e.type || "")));
    if (s && e.d <= W) airs.push([s, e]);
  }
  airs.sort((a, b) => a[1].d.localeCompare(b[1].d));

  const eps = [], unrated = [], last = {}, byCard = new Map();
  for (const [s, e] of airs) {
    let m = realM(e.m), from = "", rerun = null;
    if (!m.length && e.aired && e.aired.length) {m = realM(e.aired); rerun = [...new Set(e.aired.map(x => x[3]))].sort();}
    if (!m.length) {
      const n = (String(e.type).match(/\bEp(?:isode)?s?\.?\s*(\d+)/i) || [])[1];
      const tp = n && ALL.find(t => t.p === e.p && t.d <= e.d && /taping/i.test(t.type || "") && s.match.test(t.type || "") && realM(t.m).some(x => new RegExp("^Ep\\s*" + n + "\\b").test(x[0])));
      if (tp) {m = realM(tp.m).filter(x => new RegExp("^Ep\\s*" + n + "\\b").test(x[0])); from = tp.d;}
    }
    if (!ran(e) || !m.length) {unrated.push({show: s, e, why: !ran(e) ? "Airs " + e.d : "No results logged yet"}); continue;}
    // card quality
    const rated = m.map(x => star(x[2])).filter(v => v !== null);
    let q = star(e.rate), qFrom = "card", qText = e.rate || "";
    if (q === null && rated.length) {q = rated.reduce((a, b) => a + b, 0) / rated.length; qFrom = "match average"; qText = starText(q);}
    if (q === null) {q = Wt.cardNone; qFrom = "nothing rated"; qText = "";}
    // headliners
    const txt = norm(m.map(x => x[0] + " " + (x[1] || "")).join(" ") + " " + (e.n || []).filter(x => /^Segments:/i.test(x)).join(" "));
    const raw = m.map(x => x[0] + " " + (x[1] || "")).join(" ");
    const who = new Map();
    for (const x of starsFor(e.p)) if (has(txt, x.full) || has(txt, x.last)) who.set(x.name, x.w);
    for (const t of teamKeys) if ((/^[A-Z]+$/.test(t) ? new RegExp("\\b" + t + "\\b").test(raw) : has(txt, norm(t)))) for (const mem of D.TEAMS[t]) {const x = starsFor(e.p).find(y => y.name === mem); if (x) who.set(x.name, x.w);}
    const sp = Math.min(Wt.starsCap, [...who.values()].reduce((a, b) => a + b, 0));
    // talent: tier and Draw Index together, from the snapshot in force on the air date
    const snap = snapFor(e.d);
    let draw = null, drawWho = [];
    if (snap) {
      const dt = " " + dkey(m.map(x => x[0] + " " + (x[1] || "")).join(" ") + " " + (e.n || []).filter(x => /^Segments:/i.test(x)).join(" ")) + " ";
      const on = new Set();
      for (const k in snap.rows) if (k && dt.includes(" " + k + " ")) on.add(k);
      const lasts = lastOf(snap, e.p); for (const l in lasts) if (dt.includes(" " + l + " ") || dt.includes(" " + l + "s ")) on.add(lasts[l]);
      for (const t of teamKeys) if ((/^[A-Z]+$/.test(t) ? new RegExp("\\b" + t + "\\b").test(raw) : dt.includes(" " + dkey(t) + " ")))
        for (const mem of D.TEAMS[t]) on.add(dkey(mem));
      for (const n of who.keys()) on.add(dkey(n));   // pay-scale headliners found the old way
      const pw = [...on].map(k => {const ix = snap.rows[k] != null ? snap.rows[k] : Wt.drawEmpty, t = tierOf(e.p, k);
        return [k, Wt.tierShare * t + (1 - Wt.tierShare) * ix / 100, ix, t];}).filter(x => x[2] !== Wt.drawEmpty || x[3] > 0);
      const top = pw.sort((a, b) => b[1] - a[1]).slice(0, Wt.drawTop);
      drawWho = top.map(([k, p, ix, t]) => `${k} ${p.toFixed(2)} (index ${ix}, tier ${t})`);
      const vals = top.map(x => x[1]); while (vals.length < Wt.drawTop) vals.push((1 - Wt.tierShare) * Wt.drawEmpty / 100);
      draw = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 100) / 100;
    }
    const talent = draw !== null ? Wt.draw * (draw - Wt.drawMid) * 10 : Wt.stars * (sp - 1);
    // title matches
    const titles = Math.min(Wt.titlesCap, m.filter(x => /\bTitles?\b|Championship|IWGP|Triple Crown/i.test(x[0])).length);
    // hype: go-home for the promotion's next PPV, or a special
    const ppvNext = ALL.find(p => p.p === e.p && isPPV(p) && p.d > e.d && p.d <= addDays(e.d, Wt.hypeDays));
    const hype = ppvNext ? "go-home for " + String(ppvNext.type).replace(/\s*\(PPV\)/, "") : (/go-home|special|crowned/i.test(e.type || "") ? "special" : "");
    // crowd on camera: the card's own gate, else its taping's
    let crowd = crowdOf(e.gate);
    if (crowd === null) {const tm = String(e.city || "").match(/taped (\d+)\/(\d+)/); const td = tm ? "1991-" + tm[1].padStart(2, "0") + "-" + tm[2].padStart(2, "0") : from;
      const tp = td && ALL.find(t => t.p === e.p && t.d === td && t.gate); if (tp) crowd = crowdOf(tp.gate);}
    const cw = crowd === null ? 0 : crowd >= Wt.crowdBig ? 1 : crowd < Wt.crowdSmall ? -1 : 0;
    const lift = Wt.card * (Math.max(0, Math.min(5, q)) - Wt.cardMid) + talent + Wt.titles * titles + (hype ? Wt.hype : 0) + Wt.crowd * cw;
    const prev = last[s.id];
    let v = s.base * (1 + lift);
    v = (1 - Wt.carry) * v + Wt.carry * (prev ? prev.v : s.base);
    v = Math.round(Math.max(s.min, Math.min(s.max, v)) * 10) / 10;
    const key = e.p + " " + e.d + " " + s.id;
    const fixed = R.fixed[key] != null;
    if (fixed) v = R.fixed[key];
    const ep = {show: s, e, m, d: e.d, week: weekOf(e.d), v, fixed, prev: prev ? prev.v : null, q, qFrom, qText, who: [...who.keys()], sp, draw, drawWho, snap: snap ? snap.d : null, titles, hype, crowd, lift, rerun};
    eps.push(ep); last[s.id] = ep; byCard.set(e, ep);
  }
  const byShow = {}; R.shows.forEach(s => byShow[s.id] = eps.filter(x => x.show === s));

  // PPV buys, from the Finance tab only
  const ppvs = [];
  for (const e of D.E) {
    if (!isPPV(e) || !ran(e)) continue;
    const F = (D.FINANCE || {})[e.p] || {};
    const line = (F.other || []).find(o => o.d === e.d && /pay-per-view/i.test(o.stream || ""));
    const row = (F.rows || []).find(r => r.d === e.d);
    const num = s => {const m = String(s || "").match(/([\d,]{4,})\s*buys/i); return m ? +m[1].replace(/,/g, "") : null;};
    const buys = line && line.buys != null ? line.buys : (num(line && line.note) ?? num(row && row.note));
    const p = {p: e.p, d: e.d, e, name: String(e.type).replace(/\s*\(PPV\)/, ""), buys, take: line && typeof line.amt === "number" ? line.amt : null, est: !!(line && line.est)};
    ppvs.push(p); byCard.set(e, p);
  }
  ppvs.sort((a, b) => b.d.localeCompare(a.d));
  return {eps, byShow, unrated, ppvs, byCard};
}

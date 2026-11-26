/* TNM World Wrestling Report: TV ratings and PPV buys.
   Shown on each promotion's Ratings tab (weekly chart and PPV buys), in the front page's By the numbers,
   and on every rated show in the Show Archive. Also used by tools/ratings.js (prints the table for write-ups).

   TV RATINGS are worked out from the shows themselves (Sean, 2026-11-26). Nothing is typed in: every rating
   is recomputed from the cards each time the page loads, so a new episode is rated as soon as its results are logged.

   Which shows: RATINGS.shows (Sean's list, 2026-11-26): WWF Superstars, Challenge, Prime Time, All American;
   WCW Pro and Saturday Night; USWA Championship TV and Mid-South Showcase (called Worldwide until WCW's cease-and-desist, 7/22/91); and the Japanese tour nights that are on TV
   (an NJPW or AJPW card whose type says TV Asahi, World Pro Wrestling, Nippon TV or TV taping).
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
     stars   +4% for every headliner on the show past the first: names from the promotion's pay scale
             (CONTRACTS) found in the matches, results and "Segments:" note; tier A counts 1, tier B half; at most 3
     titles  +3% for each title match, at most 2
     hype    +6% for a go-home show (the promotion's next PPV within 7 days) or a special
     crowd   +3% for a crowd of 10,000 or more on camera, -3% for under 1,500 (the card's own gate, or its taping's)
   Ratings are sticky: the result is 60% this week's number and 40% the show's previous rated episode (a first
   episode carries over its base). It's kept inside the slot's min and max and rounded to a tenth.

   Units. WWF and WCW: national Nielsen household ratings. USWA: local household ratings in the markets that carry
   each show (Memphis for Championship TV). NJPW and AJPW: Video Research household ratings (%), charted on the
   tour night taped for TV. Don't compare across units: the World ratings page (World menu, TV Ratings) gives each
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
    vr: {label: "Rating (%)", long: "Video Research household rating, charted on the tour night taped for TV", market: "Japan", pct: 1}
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
    {id: "ntv", p: "ajpw", name: "All Japan on Nippon TV", short: "Nippon TV", match: /Nippon TV|TV taping/i, tour: 1, outlet: "Nippon TV", base: 5.6, min: 3.5, max: 8.5, unit: "vr"}
  ],
  weights: {card: 0.06, cardMid: 2.5, cardNone: 2, stars: 0.04, starsCap: 3, titles: 0.03, titlesCap: 2, hype: 0.06, hypeDays: 7, crowd: 0.03, crowdBig: 10000, crowdSmall: 1500, carry: 0.4},
  ppv: /\(PPV\)|pay-per-view|^The Great American Bash\b/i,
  history: ["uswa"],
  fixed: {}
};

/* Works out every rating. D = {P, E, CONTRACTS, FINANCE, TEAMS, WORLD_DATE, HIST (optional)}.
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
    const lift = Wt.card * (Math.max(0, Math.min(5, q)) - Wt.cardMid) + Wt.stars * (sp - 1) + Wt.titles * titles + (hype ? Wt.hype : 0) + Wt.crowd * cw;
    const prev = last[s.id];
    let v = s.base * (1 + lift);
    v = (1 - Wt.carry) * v + Wt.carry * (prev ? prev.v : s.base);
    v = Math.round(Math.max(s.min, Math.min(s.max, v)) * 10) / 10;
    const key = e.p + " " + e.d + " " + s.id;
    const fixed = R.fixed[key] != null;
    if (fixed) v = R.fixed[key];
    const ep = {show: s, e, d: e.d, week: weekOf(e.d), v, fixed, prev: prev ? prev.v : null, q, qFrom, qText, who: [...who.keys()], sp, titles, hype, crowd, lift, rerun};
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

# The TNM World Wrestling Report

Live site: https://shovan123-lang.github.io/TNMWorld/

## What's where

| Path | What it holds |
|---|---|
| `index.html` | The page itself: layout, styles and the code that draws every view. No promotion data lives here. |
| `data/world.js` | World-wide data: the world date, the headline ticker, the talent exchange, the arrivals board (`ARRIVALS`: debuts, arrivals, new gimmicks; each promotion may add its own `arrivals` list for in-world signings) and the departures board (`RETIREMENTS`, `RETIRED_1991`, `DEATHS`, `DEATHS_NEXT`, `DEPARTURES`). The departures page also lists every promotion's own `departures` automatically. |
| `data/<promotion>.js` | Everything for one promotion: overview, champions, roster, cards and results, articles (Observer reports, From the Road diaries, news), contracts, finance, archive links and banner. One file each: `wcw`, `wwf`, `uswa`, `pp` (Power Pro), `ajpw`, `njpw`, `cmll`, `asw`, `twa` (Tri-State). |
| `data/earnings.js` | The Talent Earnings tracker (World → Talent Earnings). **Generated**: don't edit by hand. |
| `tools/earnings/` | Builds the tracker. `shows.py` lists who worked each per-appearance show, plus bonuses and Japan tour dates; `build.py` reads the pay rates from `CONTRACTS` and writes `data/earnings.js` and `earnings.md`. |
| `img/` | Banner images. |
| `USWA/`, `WCW/`, `WWF/`, `AJPW/`, `NJPW/`, `CMLL/`, `ASW/`, `TriState/`, `Powerpro/` | Old copies of the archive sites. **Not used.** Since 2026-11-11 every `SITES.<key>.base` points at the promotion's own repository (`shovan123-lang/WWF`, `USWA`, `AJPW`, `NJPW`, `CMLL`, `ASW`, `TriState`, `Powerpro`, `WCW1`), which Sean uploads to. New show pages there only need a link added to `SITES.<key>.arch` and the card's `link`. |

## Updating

- To move the world forward, change `WORLD_DATE` in `data/world.js` (only when the world week closes).
- To update a promotion, edit only its `data/<promotion>.js` file. Updates to different promotions don't touch the same file, except for the headline ticker (`TICKER` in `data/world.js`), which everyone adds to. The site shows at most 15 headlines: the newest posted (top of the list), always including each promotion's newest. Add new headlines at the top and trim the list back to 15 (Sean, 2026-11-11).
- **`asOf`:** each promotion's `P.<key>.asOf` is the last in-game date it has run. Cards dated on or before `asOf` show as results; later ones show as upcoming. Without `asOf`, the site falls back to `WORLD_DATE`, which hides results run after the world date. Move `asOf` forward with every show.
- Articles go in the promotion's `ARTICLES` block: Observer reports use `series: "observer"`, From the Road diaries use `series: "diary"`, news items use `news: 1`. Body text is a list of `["p", text]` and `["h", heading]` pairs.
- Gates and merchandise go in `FINANCE.<key>.rows` (`gate`, `merch`, `payroll`; use `null` when a number isn't known yet).
- After a show runs, the after-show checklist covers logging results, the write-ups and pushing the site.
- TV ratings update on their own from logged results; PPV buys need logging in Finance (see TV ratings and PPV buys below).

## Moving the world clock

`node tools/advance_clock.js YYYY-MM-DD` (add `--dry` to preview; a dry run also resets `data/earnings.js` to the committed version). It sets `WORLD_DATE`, trims the ticker to 15, rebuilds the Talent Earnings tracker, and prints a report: which promotions are behind or ahead of the world, shows still to run or log, shows missing from the earnings tracker, injuries, and double bookings of shared talent in the next 14 days. It doesn't commit. In Claude Code, `/advance-clock YYYY-MM-DD` runs the whole routine (`.claude/commands/advance-clock.md`).

## Talent Earnings tracker

Rebuild it **every time the world clock moves** (Sean, 2026-11-11), and after logging a show:

1. For each new USWA, CMLL, ASW, Tri-State or Power Pro show, add an entry to `SHOWS` in `tools/earnings/shows.py`: everyone paid (wrestlers and managers, not announcers), the show multiplier, the gate, and who splits the main-event and semi-main cuts. Put the ledger's payroll in `logged` so the two can be compared.
2. Add any bonus (PPV main-event cuts) to `BONUSES`. New tours go in `TOURS`; a new month needs `MONTH` changed.
3. Run `python3 tools/earnings/build.py` (it uses `WORLD_DATE` from `data/world.js`). WWF and WCW salaries accrue day by day to the world date; Japan tour fees move from "due" to paid once the tour's last night is on or before the world date.
4. Copy `tools/earnings/earnings.md` into the project doc `claude/TNM - World Talent Earnings Tracker.md` and refresh the summary in the World Finance Ledger.

**Champions' pool** (Sean, 2026-11-26): every card puts 3% of its gate into a pool that's split evenly among the champions who worked it (each member of a tag team counts as one), on top of all other pay, in every promotion. `tools/earnings/pool.py` does it on every rebuild, with no hand entry per show:

- Who held what comes from `TITLE_LEDGER` (`data/titles.js`). A reign is paid from the first card after the title changes hands, and the outgoing champion is still paid on the card where they lose it. Vacant titles pay nobody.
- The gate comes from the promotion's Finance row for that date, or the card's own gate in `E`. A card with champions but no gate pays nothing yet and is listed on the Talent Earnings page.
- Who worked the card comes from `SHOWS` (per-show promotions) or the card's results (WWF, WCW, AJPW, NJPW). Seconds ("w/") don't count; live segments do.
- Settings are at the end of `shows.py`: `POOL` (the percentage, and `guests`, which would also pay other promotions' champions who work a card; off), `POOL_TEAMS` (tag team → members), `POOL_NAMES`, `POOL_SEEN` (how a champion's name appears in results) and `POOL_FIX` (add or drop a champion on one card, with the reason). A new tag-team champion needs a `POOL_TEAMS` line, and a champion the results call by another name needs a `POOL_SEEN` line; the build prints a "pool check" line when the title ledger and a promotion's champions list disagree.

## TV ratings and PPV buys

Each rated promotion has a **Ratings** tab (WWF, WCW, USWA, NJPW, AJPW): a weekly chart with a line per show, every episode with what moved its number, and the PPV buys. The front page's "By the numbers" shows the week's top Nielsen show and the latest PPV buys, and the Show Archive and each card show their rating or buys.

- **TV ratings are worked out from the shows**, not typed in. `data/ratings.js` holds the model and lists the rated shows (`RATINGS.shows`: Superstars, Challenge, Prime Time, All American, WCW Saturday Night, WCW Pro, USWA Championship TV, USWA Worldwide, and the Japanese tour nights taped for TV). Each show has a base number for its slot; an episode moves off that base with its card quality (match stars), how many headliners appear (tier A and B in `CONTRACTS`), title matches, a PPV within the week, and a big or small crowd, then 40% carries over from the show's last episode. The Ratings tab's "How the ratings work" box lists the weights.
- **World ▸ TV Ratings & PPV Buys** (`#ratings`, Sean, 2026-11-26) compares every rated show in the world: the top show in each market, a weekly chart per market (US national Nielsen, USWA local, Japan Video Research; set by `market` in `RATINGS.units`, because the scales don't compare), one sortable table of every show (latest, change, average, high, low, episodes, trend) and every PPV's buys side by side. It starts at the first month of this world's own shows; `#ratings/all` adds the archive history. Across markets it compares only **Vs usual**, the latest rating against the show's `base`. Lines are coloured by promotion (`WR_COLORS` in `index.html`) with a marker and dash per show.
- **USWA goes back to Fall 1990** (Sean, 2026-11-26): for the promotions in `RATINGS.history`, the archive-only cards in `data/history.js` are rated with the same model, so the USWA chart starts with Championship TV on September 1, 1990. Championship TV from March 9 to May 18, 1991 only replayed matches from earlier cards; each of those episodes is rated on the matches it aired, with their results and ratings from the night (`aired` in `data/history.js`, matched by `tools/history/build.py`). May 25 has no Championship TV on the archive (Slamboree ran that night). A card with no overall rating is rated on the average of its matches.
- An episode is rated once its card has run (on or before `asOf`, and before `WORLD_DATE`) and has results. Log each TV airing as its own card on its air date with a type that names the show (for example "Superstars of Wrestling, Episode 2 (syndication)"); a card whose type says "taping" is the taping, not the airing, and isn't rated; a Japanese tour night is rated when its type names the TV network or says "TV taping". A show that matches nothing simply isn't rated.
- To set a real number instead, add it to `RATINGS.fixed` as `"<promotion> <YYYY-MM-DD> <show id>": 3.4`. The line carries on from it.
- **PPV buys aren't worked out by the site.** A PPV card (type with "(PPV)" or "pay-per-view") shows buys only when they're logged: in `FINANCE.<key>.other` as a "Pay-per-view share" line with `buys:` or "N buys" in its note, or "N buys" in the Finance row's note. Otherwise it says "not yet reported". USWA Star Wars 1991's 15,000 buys ($15 a buy, USWA keeps half: $112,500) is a number made up to fit at Sean's request (2026-11-26), marked `est: 1` on its line.
- `node tools/ratings.js [wwf wcw ...] [--why]` prints every rated episode, what moved it, what wasn't rated and the PPV buys. Run it after logging a show to check the numbers.

## Title histories

Each promotion's archive site has `HTML/TITLES.HTM` (linked at the top of its `WELCOME.HTM`). The pages are built by `tools/titles/build.py` from the TNM7 result tags on the show pages ("X won/retained the Y Title"), plus the hand-entered facts in `tools/titles/overrides.json` (vacancies, belts awarded in segments, tournament wins the tags don't mark, dates a page doesn't carry). To rebuild after new shows are uploaded, clone the archive repos next to this one (`uswa`, `wcw1`, `wwf`, `ajpw`, `njpw`, `cmll`, `asw`, `tristate`, `powerpro`) and run `python3 tools/titles/build.py`. It also puts the link back on `WELCOME.HTM` if a new TNM7 upload replaced that page. Then commit and push each archive repo. The pages use the World Report's newsprint look (fonts, colors, masthead) with each promotion's color, and link back to the World Report front page at the top and bottom; the template is `CSS` and `render_html` in `build.py`.

## Who can push, and how

- A Claude session can update the site only if the repository is attached to it **with push access** and the session has a shell and git. A session that can't push should write everything to the claude.ai project docs and note "website not updated" in the promotion's hub, so a session that can push catches it up.
- Always pull right before editing and again right before pushing (`git fetch` then rebase onto `origin/main`). Never force-push. More than one session may be updating the site.
- Test before pushing: open `index.html` in a browser (Playwright is fine), visit the promotion's tabs and any new articles, and make sure there are no page errors.
- The repository's canonical address is `https://github.com/shovan123-lang/TNMWorld.git` (the lowercase `tnmworld` address redirects).

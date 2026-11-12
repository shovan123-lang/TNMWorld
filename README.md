# The TNM World Wrestling Report

Live site: https://shovan123-lang.github.io/TNMWorld/

## What's where

| Path | What it holds |
|---|---|
| `index.html` | The page itself: layout, styles and the code that draws every view. No promotion data lives here. |
| `data/world.js` | World-wide data: the world date, the headline ticker, the talent exchange and the arrivals board. |
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

## Talent Earnings tracker

Rebuild it **every time the world clock moves** (Sean, 2026-11-11), and after logging a show:

1. For each new USWA, CMLL, ASW, Tri-State or Power Pro show, add an entry to `SHOWS` in `tools/earnings/shows.py`: everyone paid (wrestlers and managers, not announcers), the show multiplier, the gate, and who splits the main-event and semi-main cuts. Put the ledger's payroll in `logged` so the two can be compared.
2. Add any bonus (PPV main-event cuts) to `BONUSES`. New tours go in `TOURS`; a new month needs `MONTH` changed.
3. Run `python3 tools/earnings/build.py` (it uses `WORLD_DATE` from `data/world.js`). WWF and WCW salaries accrue day by day to the world date; Japan tour fees move from "due" to paid once the tour's last night is on or before the world date.
4. Copy `tools/earnings/earnings.md` into the project doc `claude/TNM - World Talent Earnings Tracker.md` and refresh the summary in the World Finance Ledger.

## Who can push, and how

- A Claude session can update the site only if the repository is attached to it **with push access** and the session has a shell and git. A session that can't push should write everything to the claude.ai project docs and note "website not updated" in the promotion's hub, so a session that can push catches it up.
- Always pull right before editing and again right before pushing (`git fetch` then rebase onto `origin/main`). Never force-push. More than one session may be updating the site.
- Test before pushing: open `index.html` in a browser (Playwright is fine), visit the promotion's tabs and any new articles, and make sure there are no page errors.
- The repository's canonical address is `https://github.com/shovan123-lang/TNMWorld.git` (the lowercase `tnmworld` address redirects).

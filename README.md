# The TNM World Wrestling Report

Live site: https://shovan123-lang.github.io/TNMWorld/

## What's where

| Path | What it holds |
|---|---|
| `index.html` | The page itself: layout, styles and the code that draws every view. No promotion data lives here. |
| `data/world.js` | World-wide data: the world date, the headline ticker, the talent exchange and the arrivals board. |
| `data/<promotion>.js` | Everything for one promotion: overview, champions, roster, cards and results, articles (Observer reports, From the Road diaries, news), contracts, finance, archive links and banner. One file each: `wcw`, `wwf`, `uswa`, `pp` (Power Pro), `ajpw`, `njpw`, `cmll`, `asw`, `twa` (Tri-State). |
| `img/` | Banner images. |
| `USWA/`, `WCW/`, `WWF/`, `AJPW/`, `NJPW/`, `CMLL/`, `ASW/`, `TriState/`, `Powerpro/` | Each promotion's official show-archive site (`<folder>/HTML/WELCOME.HTM`). These replace the separate repositories, which are kept as-is but no longer updated. |

## Updating

- To move the world forward, change `WORLD_DATE` in `data/world.js` (only when the world week closes).
- To update a promotion, edit only its `data/<promotion>.js` file. Updates to different promotions don't touch the same file, except for the headline ticker (`TICKER` in `data/world.js`), which everyone adds to.
- **`asOf`:** each promotion's `P.<key>.asOf` is the last in-game date it has run. Cards dated on or before `asOf` show as results; later ones show as upcoming. Without `asOf`, the site falls back to `WORLD_DATE`, which hides results run after the world date. Move `asOf` forward with every show.
- Articles go in the promotion's `ARTICLES` block: Observer reports use `series: "observer"`, From the Road diaries use `series: "diary"`, news items use `news: 1`. Body text is a list of `["p", text]` and `["h", heading]` pairs.
- Gates and merchandise go in `FINANCE.<key>.rows` (`gate`, `merch`, `payroll`; use `null` when a number isn't known yet).
- After a show runs, the after-show checklist covers logging results, the write-ups and pushing the site.

## Who can push, and how

- A Claude session can update the site only if the repository is attached to it **with push access** and the session has a shell and git. A session that can't push should write everything to the claude.ai project docs and note "website not updated" in the promotion's hub, so a session that can push catches it up.
- Always pull right before editing and again right before pushing (`git fetch` then rebase onto `origin/main`). Never force-push. More than one session may be updating the site.
- Test before pushing: open `index.html` in a browser (Playwright is fine), visit the promotion's tabs and any new articles, and make sure there are no page errors.
- The repository's canonical address is `https://github.com/shovan123-lang/TNMWorld.git` (the lowercase `tnmworld` address redirects).

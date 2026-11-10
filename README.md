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

- To move the world forward, change `WORLD_DATE` in `data/world.js`.
- To update a promotion, edit only its `data/<promotion>.js` file. Two updates to different promotions never touch the same file.
- After a show runs, the after-show checklist covers logging results, the write-ups and pushing the site.

---
description: Move the TNM world clock to a new date and do everything that goes with it
argument-hint: YYYY-MM-DD (the new world date)
---
Move the TNM world clock to $ARGUMENTS. Follow these steps in order.

1. `git pull`. Read `World/TNM - Project Map & Workflow.md` and `World/TNM - World Calendar & Week Tracker.md` from the claude.ai Project "TNM Wrestling world booking" if the Projects tool is available.
2. Dry run first: `node tools/advance_clock.js $ARGUMENTS --dry`. Read the report.
   - If it lists shows that have run but aren't in `tools/earnings/shows.py`, add them (everyone paid, multiplier, gate, main-event and semi-main splitters, ledger payroll as `logged`) before going on.
   - If an AJPW/NJPW wrestler is on per-appearance pay (`PER_NIGHT`), add any nights he has worked since.
3. Real run: `node tools/advance_clock.js $ARGUMENTS`. This sets `WORLD_DATE`, trims the ticker to 15 (every promotion keeps its newest) and rebuilds the Talent Earnings tracker.
   - Career earnings: the tracker adds each finished month to `tools/earnings/lifetime.json` the first time it runs with a date past that month's end, and the Talent File pages show the running career total. If the new date crosses into a new month, run that real run first (it files the old month's final totals), then switch `MONTH`/`DAYS_IN_MONTH` in `tools/earnings/shows.py` to the new month, start the new month's shows/bonuses/tours there, and rebuild (`python3 tools/earnings/build.py $ARGUMENTS`). Never delete a month from `lifetime.json`.
   - Talent File: update the `record` and `blurb` of every file in `TALENT_FILES` (data/world.js) whose wrestler worked a show since the last advance.
   - Refresh the cache tags so browsers load the new data: `python3 tools/cache_bust.py`.
4. Test: load `index.html` in Playwright, visit #home, #earnings, #calendar, #money, #file and one #file/<slug>, and confirm there are no page errors.
5. Commit ("World clock to <date>") and push. Pull and retry if rejected; never force-push.
6. Project docs (if the Projects tool is available):
   - World Calendar: close any week that's finished (move it to "Closed weeks", one line per promotion) and open the new one.
   - Replace `claude/TNM - World Talent Earnings Tracker.md` with `tools/earnings/tracker_doc.md` (ready to paste), and replace the summary paragraph and top-15 table in the "Talent earnings" section of `claude/TNM - World Finance Ledger.md` with `tools/earnings/ledger_summary.md`.
   - Check `claude/TNM - Q3 1991 Retirements & Departures.md` for anything within two weeks of the new date.
7. Report back in a few lines: the new date, who is behind or ahead, double bookings, injuries coming back, retirements coming up, the top 5 earners, and that the site is pushed.

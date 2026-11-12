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
4. Test: load `index.html` in Playwright, visit #home, #earnings, #calendar and #money, and confirm there are no page errors.
5. Commit ("World clock to <date>") and push. Pull and retry if rejected; never force-push.
6. Project docs (if the Projects tool is available):
   - World Calendar: close any week that's finished (move it to "Closed weeks", one line per promotion) and open the new one.
   - Copy `tools/earnings/earnings.md` into `claude/TNM - World Talent Earnings Tracker.md` (update the header totals and world date) and refresh the top-15 summary in `claude/TNM - World Finance Ledger.md`.
   - Check `claude/TNM - Q3 1991 Retirements & Departures.md` for anything within two weeks of the new date.
7. Report back in a few lines: the new date, who is behind or ahead, double bookings, injuries coming back, retirements coming up, the top 5 earners, and that the site is pushed.

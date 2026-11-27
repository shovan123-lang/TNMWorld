#!/usr/bin/env python3
"""TNM World Draw Index.

Ranks every wrestler across the TNM World promotions so the office knows
who to push and who is worth a bidding war.

Usage:
  python tnm_draw.py probe <TNM7SE dir>
      Report what each promotion folder holds and how the heat/points
      files are laid out. Run this first on a new install.
  python tnm_draw.py rank <TNM7SE dir> [--dumps <ShowDumps dir>]
                          [--draws draws.csv] [--out draw_index.csv]
                          [--js data/draws.js] [--date 1991-07-23]
                          [--stars-csv stars.csv]
      draws.csv and stars.csv come from the site repo:
        node tools/draw_gates.js > draws.csv
        node tools/draw_gates.js --stars > stars.csv
      Build the index. Writes a CSV and prints the push list per
      promotion and the world free-agent board.

Inputs per promotion folder (all optional except CIRCDB.DAT):
  CIRCDB.DAT   count line, then 18 lines per wrestler:
               1 name, 2 push, 3 contract status, 4 flag, 5-8 managers,
               9 name with nickname.
               Contract: 100 = not hired, 1-99 = cards left,
               <0 = locked out, 200/300 = available one more card.
  CARD.WHT     crowd heat, one value per roster number.
  CARDA.PTS    ratings-screen points, one value per roster number.
  CARD.PTS     singles win-loss (used only if it parses cleanly).
Master DATA\\WRESTLRS.DAT (120 lines each) gives charisma (field 59)
and work rate (field 57).

draws.csv (optional) carries business numbers from the show docs:
  wrestler,promotion,gate_vs_avg
where gate_vs_avg is the headlined card's gate divided by that
promotion's average gate (1.0 = average). Several rows per wrestler
are averaged.

ShowDumps (optional): star ratings are read from lines that carry both
a result ("def.", "beat", "pinned", "submitted", "drew", "vs.") and a
star rating such as ***1/4 or ****.

Weights: draw (box office) 30, TV 25, crowd 20, star power 15, ring 10.
TV and star power need --extra extra.csv (node tools/draw_extra.js).
A missing part scores 20 out of 100 (below average), and the confidence
column shows how many of the four parts had real data.
"""

import csv
import os
import re
import statistics
import sys
import unicodedata
from collections import defaultdict

ENC = "cp1252"
# Being well known is what makes a draw: TV carries a quarter of the index.
WEIGHTS = {"draw": 0.30, "tv": 0.25, "heat": 0.20, "star": 0.15,
           "quality": 0.10}
FREE_AGENT_CARDS = 10
MISSING = 20.0
# Folders that are not promotions.
SKIP = {"DATA", "SHOWDUMPS", "_BACKUPS", "PLUGINS", "NEWPLUGS", "PLUGDOCS"}


def read_lines(path):
    with open(path, "rb") as f:
        raw = f.read().decode(ENC, errors="replace")
    return raw.replace("\r\n", "\n").replace("\r", "\n").split("\n")


def to_num(s):
    try:
        return float(s.strip())
    except (ValueError, AttributeError):
        return None


def find(folder, name):
    """Case-insensitive file lookup (Windows names vary in case)."""
    want = name.lower()
    for f in os.listdir(folder):
        if f.lower() == want:
            return os.path.join(folder, f)
    return None


def norm(name):
    s = unicodedata.normalize("NFD", name)
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]", "", s.lower())


# ---------------------------------------------------------------- readers

def read_circdb(path):
    lines = read_lines(path)
    count = int(to_num(lines[0]) or 0)
    roster = []
    for k in range(count):
        base = 1 + 18 * k
        rec = lines[base:base + 18]
        if len(rec) < 4:
            break
        flag = int(to_num(rec[3]) or 0)
        roster.append({
            "num": k + 1,
            "name": rec[0].strip(),
            "push": to_num(rec[1]),
            "contract": to_num(rec[2]),
            "align": ("face", "heel", "neutral", "?")[flag & 3],
        })
    return roster


def read_per_roster(path, count):
    """Return {roster number: value} for a one-value-per-wrestler file.

    Accepts either a leading count line or not. Returns (values, layout)
    or (None, reason) when the file doesn't fit that shape.
    """
    nums = [to_num(x) for x in read_lines(path) if x.strip() != ""]
    if any(n is None for n in nums):
        return None, "non-numeric lines"
    if len(nums) == count + 1 and nums[0] == count:
        nums = nums[1:]
        layout = "count line + 1 value each"
    elif len(nums) == count:
        layout = "1 value each"
    elif count - 5 <= len(nums) < count:
        # Newest signings not written yet (Tri-State: 680 for 683).
        layout = f"1 value each, last {count - len(nums)} missing"
    else:
        return None, f"{len(nums)} numbers for {count} wrestlers"
    return {i + 1: v for i, v in enumerate(nums)}, layout


def read_pts(path):
    """CARD.PTS / CARDA.PTS: 7-line blocks, no count line:
    name, points, matches, wins, losses, draws, (unknown).
    Returns {name: {"points", "matches", "w", "l", "d"}}."""
    lines = [x for x in read_lines(path)]
    while lines and lines[-1].strip() == "":
        lines.pop()
    out = {}
    for i in range(0, len(lines) - 6, 7):
        name = lines[i].strip()
        nums = [to_num(x) for x in lines[i + 1:i + 6]]
        if not name or any(n is None for n in nums):
            return None
        out[name] = dict(zip(("points", "matches", "w", "l", "d"), nums))
    return out


def read_master(tnm_dir):
    path = None
    data = find(tnm_dir, "DATA")
    if data and os.path.isdir(data):
        path = find(data, "WRESTLRS.DAT")
    if not path:
        return []
    lines = read_lines(path)
    count = int(to_num(lines[0]) or 0)
    out = []   # by position: circuit roster number k = master record k
    for k in range(count):
        base = 1 + 120 * k
        rec = lines[base:base + 120]
        if len(rec) < 59:
            break
        out.append({"name": rec[0].strip(), "workrate": to_num(rec[56]),
                    "charisma": to_num(rec[58])})
    return out


STAR = re.compile(r"(?<![\w*])(-?\*{1,5})(\s*(1/4|1/2|3/4))?(?![\w*])")
RESULT = re.compile(r"\b(def\.|defeated|beat|pinned|submitted|drew|vs\.)",
                    re.I)


def stars_value(m):
    v = len(m.group(1).lstrip("-"))
    frac = {"1/4": .25, "1/2": .5, "3/4": .75}.get(m.group(3) or "", 0)
    v += frac
    return -v if m.group(1).startswith("-") else v


def read_dumps(dumps_dir, names):
    """Map normalized name -> list of star ratings from ShowDumps."""
    ratings = defaultdict(list)
    if not dumps_dir or not os.path.isdir(dumps_dir):
        return ratings
    # Longest names first so "Dory Funk Jr." wins over "Funk".
    keys = sorted(names, key=lambda n: -len(n))
    for root, _, files in os.walk(dumps_dir):
        for f in files:
            if f.lower().endswith((".bak", ".new")):
                continue
            try:
                lines = read_lines(os.path.join(root, f))
            except OSError:
                continue
            for line in lines:
                m = STAR.search(line)
                if not m or not RESULT.search(line):
                    continue
                val = stars_value(m)
                low = line.lower()
                hit = set()
                for full in keys:
                    if full.lower() in low and not any(
                            full.lower() in h.lower() for h in hit):
                        hit.add(full)
                for h in hit:
                    ratings[norm(h)].append(val)
    return ratings


def read_stars_csv(path):
    """stars.csv (wrestler,stars,date) from tools/draw_gates.js --stars.
    Oldest first, so the last 10 are the most recent."""
    ratings = defaultdict(list)
    with open(path, newline="", encoding="utf-8") as f:
        rows = sorted(csv.DictReader(f), key=lambda r: r.get("date", ""))
    for r in rows:
        v = to_num(r.get("stars", ""))
        if v is not None:
            ratings[norm(r["wrestler"])].append(v)
    return ratings


def read_extra(path):
    """extra.csv from tools/draw_extra.js: tv, w, l, d, titles, worked."""
    out = {}
    if not path:
        return out
    with open(path, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            out[norm(r["wrestler"])] = {k: to_num(r.get(k, "")) or 0 for k in
                                        ("tv", "w", "l", "d", "titles",
                                         "worked")}
    return out


def read_draws(path):
    """{wrestler: (mean gate_vs_avg, mean log10 gate)} from draws.csv.
    The ratio says how he draws for his own promotion; the dollars say
    how big that house was, so a sellout in a small hall and a sellout
    at the Budokan aren't the same thing on a world board."""
    import math
    rel, ab = defaultdict(list), defaultdict(list)
    if not path:
        return {}
    with open(path, newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            v = to_num(row.get("gate_vs_avg", ""))
            g = to_num(row.get("gate", ""))
            k = norm(row["wrestler"])
            if v is not None:
                rel[k].append(v)
            if g:
                ab[k].append(math.log10(g))
    return {k: (statistics.mean(rel[k]),
                statistics.mean(ab[k]) if ab.get(k) else None) for k in rel}


# ---------------------------------------------------------------- scoring

def scale(values):
    """Min-max to 0-100 over the values that exist."""
    vals = [v for v in values.values() if v is not None]
    if not vals:
        return {}
    lo, hi = min(vals), max(vals)
    if hi == lo:
        return {k: 50.0 for k, v in values.items() if v is not None}
    return {k: 100 * (v - lo) / (hi - lo)
            for k, v in values.items() if v is not None}


def promotions(tnm_dir):
    for f in sorted(os.listdir(tnm_dir)):
        p = os.path.join(tnm_dir, f)
        if (os.path.isdir(p) and f.upper() not in SKIP
                and find(p, "CIRCDB.DAT")):
            yield f, p


def on_roster(c):
    """Hired: 1-99 cards left, or 200/300 (one more card). 100 = never
    hired; below 0 = locked out, which TNM uses for a wrestler who has
    left that circuit, so he isn't on its roster."""
    return c is not None and (0 < c < 100 or c >= 200)


def contract_label(c):
    if c is None:
        return "?"
    if c == 100:
        return "not hired"
    if c < 0:
        return f"locked out {int(-c)}"
    if c >= 200:
        return "1 card left"
    return f"{int(c)} cards left"


def probe(tnm_dir):
    for promo, p in promotions(tnm_dir):
        roster = read_circdb(find(p, "CIRCDB.DAT"))
        hired = [w for w in roster if on_roster(w["contract"])]
        print(f"{promo}: {len(roster)} in CIRCDB, {len(hired)} on roster")
        for fname in ("CARD.WHT", "CARDA.PTS", "CARD.PTS"):
            fp = find(p, fname)
            if not fp:
                print(f"  {fname}: missing")
                continue
            if fname.endswith(".PTS"):
                pts = read_pts(fp)
                if pts is None:
                    print(f"  {fname}: unknown layout")
                else:
                    on = sum(1 for w in hired if w["name"] in pts)
                    print(f"  {fname}: {len(pts)} blocks, {on} on roster, "
                          f"modified {os.path.getmtime(fp):.0f}")
                continue
            vals, info = read_per_roster(fp, len(roster))
            if vals is None:
                head = [x for x in read_lines(fp)[:6]]
                print(f"  {fname}: unknown layout ({info}); first lines "
                      f"{head}")
            else:
                hv = [vals[w['num']] for w in hired if w['num'] in vals]
                spread = (f"min {min(hv):g} max {max(hv):g}" if hv
                          else "no hired values")
                print(f"  {fname}: {info}; roster {spread}")


def site_key(name):
    """Same as the site's tfNorm(): strip accents, lowercase, runs of
    anything but a-z0-9 become one space, trimmed."""
    s = unicodedata.normalize("NFD", name)
    s = "".join(c for c in s if not unicodedata.combining(c)).lower()
    return re.sub(r"[^a-z0-9]+", " ", s).strip()


# Circuit folder -> the site's promotion key (CARD.LGS order).
SITE_KEY = {"USWA": "uswa", "POWER": "pp", "ALL": "ajpw", "CONSEJO": "cmll",
            "WORLD": "wwf", "WORLD1": "wcw", "NEW": "njpw",
            "EASTERN1": "twa", "ALL1": "asw", "FRONTIER": "fmw"}


def write_js(ranked, path, date):
    """data/draws.js for the TNM World site.

    rows: the latest index, {key: {rank, idx}} (Talent File sort/filter,
    tools/tier_check.js). snaps: one {d, rows: {key: idx}} per World Clock
    advance, kept from the existing file, so the TV ratings model rates
    each episode on the index in force when it aired. Only the rank and
    index go public; contracts and push stay off the site.
    """
    import json
    for r in ranked:
        r["site_promos"] = [SITE_KEY.get(x.upper(), x.lower())
                            for x in r["promos"]]
    snaps = []
    if os.path.exists(path):
        old = open(path, encoding="utf-8").read()
        m = re.search(r"const DRAWS=(\{.*\});", old, re.S)
        if m:
            snaps = json.loads(m.group(1)).get("snaps", [])
    snaps = [x for x in snaps if x.get("d") != date]   # re-run same day
    snaps.append({"d": date, "rows": {site_key(r["name"]): round(
        r["index"], 1) for r in ranked}})
    snaps.sort(key=lambda x: x["d"])
    # Parts for the Draw Index page: b box office, c crowd, r ring work,
    # s star power (0-100, null = no record yet). No push or contracts.
    part = lambda v: None if v is None else round(v)
    rows = {site_key(r["name"]): {
        "rank": r["rank"], "idx": round(r["index"], 1), "n": r["name"],
        "p": r["site_promos"],
        "b": part(r["parts"]["draw"]), "t": part(r["parts"]["tv"]),
        "c": part(r["parts"]["heat"]),
        "r": part(r["parts"]["quality"]), "s": part(r["parts"]["star"])}
        for r in ranked}
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write("/* TNM World Wrestling Report: Draw Index.\n"
                "   Written by tools/tnm_draw.py at each World Clock "
                "advance (--js data/draws.js --date <world date>).\n"
                "   Don't edit by hand. */\n")
        f.write("const DRAWS=" + json.dumps(
            {"world": date, "rows": rows, "snaps": snaps},
            ensure_ascii=False, separators=(",", ":")) + ";\n")
    print(f"Wrote {path} ({len(snaps)} snapshot(s))")


def rank(tnm_dir, dumps=None, draws_csv=None, out="draw_index.csv",
         js=None, date="", stars_csv=None, extra_csv=None):
    master = read_master(tnm_dir)
    draws = read_draws(draws_csv)
    xdata = read_extra(extra_csv)

    # Pass 1: gather per-promotion rows for hired wrestlers.
    rows = []  # one per wrestler per promotion
    for promo, p in promotions(tnm_dir):
        roster = read_circdb(find(p, "CIRCDB.DAT"))
        extra = {}
        fp = find(p, "CARD.WHT")
        vals = read_per_roster(fp, len(roster))[0] if fp else None
        extra["heat"] = vals or {}
        # CARD.PTS (singles ranking points). CARDA.PTS is left alone:
        # TNM stopped updating it in several circuits.
        fp = find(p, "CARD.PTS")
        pts = (read_pts(fp) if fp else None) or {}
        extra["points"] = {w["num"]: pts[w["name"]]["points"]
                           for w in roster if w["name"] in pts}
        hired = [w for w in roster if on_roster(w["contract"])]
        # Heat and points are scaled inside each promotion, since each
        # circuit keeps its own numbers.
        heat_s = scale({w["num"]: extra["heat"].get(w["num"]) for w in hired})
        pts_s = scale({w["num"]: extra["points"].get(w["num"])
                       for w in hired})
        push_s = scale({w["num"]: w["push"] for w in hired})
        for w in hired:
            parts = [x for x in (heat_s.get(w["num"]), pts_s.get(w["num"]))
                     if x is not None]
            mrec = master[w["num"] - 1] if w["num"] <= len(master) else {}
            rows.append({
                "promo": promo, **w,
                "charisma": mrec.get("charisma"),
                "workrate": mrec.get("workrate"),
                "heat_score": statistics.mean(parts) if parts else None,
                "push_score": push_s.get(w["num"]),
            })

    # Pass 2: combine into one world record per wrestler.
    world = {}
    for r in rows:
        key = norm(r["name"])
        rec = world.setdefault(key, {"name": r["name"], "promos": [],
                                     "heat": [], "rows": []})
        rec["promos"].append(r["promo"])
        rec["rows"].append(r)
        if r["heat_score"] is not None:
            rec["heat"].append(r["heat_score"])

    star_data = (read_stars_csv(stars_csv) if stars_csv else
                 read_dumps(dumps, [w["name"] for w in world.values()]))

    raw_quality, raw_draw, raw_star = {}, {}, {}
    for key, rec in world.items():
        recent = star_data.get(key, [])[-10:]
        raw_quality[key] = statistics.mean(recent) if recent else None
        rec["matches"] = len(star_data.get(key, []))
        d = draws.get(key)
        raw_draw[key] = d
        ch = [x["charisma"] for x in rec["rows"] if x.get("charisma") is not None]
        wr = [x["workrate"] for x in rec["rows"] if x.get("workrate") is not None]
        rec["charisma"] = max(ch) if ch else None
        rec["workrate"] = max(wr) if wr else None
        raw_star[key] = rec["charisma"]

    import math
    q_s, c_s = scale(raw_quality), scale(raw_star)
    # TV: log of the exposure credit, so the first appearances count most.
    tv_s = scale({k: math.log1p(xdata[k]["tv"]) for k in world if k in xdata})
    # Momentum: win rate pulled toward .500 by two wins and two losses.
    mo_s = scale({k: (xdata[k]["w"] + 2) / (xdata[k]["w"] + xdata[k]["l"] + 4)
                  for k in world if k in xdata})
    rel_s = scale({k: v[0] for k, v in raw_draw.items() if v})
    abs_s = scale({k: v[1] for k, v in raw_draw.items() if v and v[1]})
    # Mostly the money itself (a wrestler who headlines every big house is
    # that promotion's average, so the ratio alone undersells him), some of
    # how he does against his own promotion's usual house.
    d_s = {k: (0.3 * rel_s[k] + 0.7 * abs_s[k]) if k in abs_s else rel_s[k]
           for k in rel_s}
    max_reach = max((len(r["promos"]) for r in world.values()), default=1)

    for key, rec in world.items():
        x = xdata.get(key, {})
        # Star power: charisma 40, momentum 30, titles 20, reach 10 (the
        # promotions he has actually worked a card for, not just signed with).
        sp = []
        if key in c_s:
            sp.append((0.4, c_s[key]))
        if key in mo_s:
            sp.append((0.3, mo_s[key]))
        if x:
            sp.append((0.2, min(x["titles"], 2) * 50))
            sp.append((0.1, min(max(x["worked"] - 1, 0), 2) * 50))
        star = (sum(w * v for w, v in sp) / sum(w for w, _ in sp)) if sp \
            else None
        parts = {
            "draw": d_s.get(key),
            "tv": tv_s.get(key, 0.0 if xdata else None),
            "heat": statistics.mean(rec["heat"]) if rec["heat"] else None,
            "quality": q_s.get(key),
            "star": star,
        }
        have = {k: v for k, v in parts.items() if v is not None}
        # A missing piece scores MISSING (below average): no headline
        # gates or no rated matches is itself a sign he isn't drawing.
        rec["index"] = sum(WEIGHTS[k] * (v if v is not None else MISSING)
                           for k, v in parts.items())
        rec["parts"] = parts
        rec["confidence"] = f"{len(have)}/{len(parts)}"

    ranked = sorted(world.values(), key=lambda r: -r["index"])
    for i, r in enumerate(ranked, 1):
        r["rank"] = i

    with open(out, "w", newline="", encoding="utf-8") as f:
        wr = csv.writer(f)
        wr.writerow(["rank", "wrestler", "index", "confidence", "draw",
                     "tv", "heat", "quality", "star", "promotions", "contracts",
                     "push", "matches_rated", "charisma", "workrate"])
        for r in ranked:
            p = r["parts"]
            wr.writerow([
                r["rank"], r["name"], round(r["index"], 1), r["confidence"],
                *[("" if p[k] is None else round(p[k], 1))
                  for k in ("draw", "tv", "heat", "quality", "star")],
                "; ".join(r["promos"]),
                "; ".join(f"{x['promo']}: {contract_label(x['contract'])}"
                          for x in r["rows"]),
                "; ".join(f"{x['promo']}: {x['push']:g}" for x in r["rows"]
                          if x["push"] is not None),
                r["matches"], r["charisma"] or "", r["workrate"] or "",
            ])

    report(ranked)
    print(f"\nWrote {out} ({len(ranked)} wrestlers)")
    if js:
        write_js(ranked, js, date)


def report(ranked):
    print("TOP 25, WORLD")
    for r in ranked[:25]:
        print(f"{r['rank']:>3}. {r['name']:<28} {r['index']:5.1f} "
              f"[{r['confidence']}] {', '.join(r['promos'])}")

    # Push list: index rank inside the promotion vs. push rank.
    by_promo = defaultdict(list)
    for r in ranked:
        for x in r["rows"]:
            by_promo[x["promo"]].append((r, x))
    print("\nPUSH LIST (index well above current push)")
    for promo, items in sorted(by_promo.items()):
        pushed = sorted([i for i in items if i[1]["push"] is not None],
                        key=lambda i: -i[1]["push"])
        push_rank = {id(i[1]): n for n, i in enumerate(pushed, 1)}
        gaps = []
        for n, (r, x) in enumerate(items, 1):  # items already index order
            pr = push_rank.get(id(x))
            if pr and pr - n >= 5:
                gaps.append((pr - n, r, n, pr))
        gaps.sort(key=lambda g: -g[0])
        if gaps:
            print(f"  {promo}:")
            for gap, r, n, pr in gaps[:5]:
                print(f"    {r['name']}: #{n} by index, #{pr} by push")

    print(f"\nFREE AGENT BOARD (deal ends within {FREE_AGENT_CARDS} cards)")
    for r in ranked:
        hot = [x for x in r["rows"] if x["contract"] >= 200
               or 0 < x["contract"] <= FREE_AGENT_CARDS]
        if hot:
            print(f"  #{r['rank']} {r['name']} ({r['index']:.1f}): " +
                  "; ".join(f"{x['promo']} {contract_label(x['contract'])}"
                            for x in hot))


def main(argv):
    if len(argv) < 3 or argv[1] not in ("probe", "rank"):
        print(__doc__)
        return 1
    opts = {"--dumps": None, "--draws": None, "--out": "draw_index.csv",
            "--js": None, "--date": "", "--stars-csv": None,
            "--extra": None}
    args = argv[3:]
    for i in range(0, len(args) - 1, 2):
        if args[i] in opts:
            opts[args[i]] = args[i + 1]
    if argv[1] == "probe":
        probe(argv[2])
    else:
        rank(argv[2], opts["--dumps"], opts["--draws"], opts["--out"],
             opts["--js"], opts["--date"], opts["--stars-csv"],
             opts["--extra"])
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))

"""Champions' pool (Sean, 2026-11-26): 3% of every card's gate goes into a pool that is split evenly among the
champions who work that card. Each member of a tag team counts as one champion; someone holding two belts counts once.
It's paid on top of everything else (salaries, tour fees, show pay, main-event cuts), in every promotion.

Who held what on each date comes from the title histories (data/titles.js, TITLE_LEDGER). A champion crowned on a card
is paid from the next card; a champion who loses a title on a card is still paid for that card. A promotion pays the
pool only to its own champions. Who worked a card comes from the SHOWS list in shows.py where the card has one
(per-appearance promotions), and otherwise from the match and segment lines on the card in data/<promotion>.js.
The settings (team members, spellings, how a champion is named on a card, corrections) are POOL_* in shows.py.
Cards with no logged gate pay nothing; they're listed instead."""
import re

LEDGER_KEY = {"powerpro": "pp"}          # TITLE_LEDGER id -> data key
MON = {m: i for i, m in enumerate(["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], 1)}


def _date(s):
    """Ledger dates: '7/14/1991', 'Jan. 1991', or missing (the reign began before the archive)."""
    if not s:
        return "0000-00-00"
    m = re.match(r"(\d+)/(\d+)/(\d{4})$", s.strip())
    if m:
        return "%s-%02d-%02d" % (m[3], int(m[1]), int(m[2]))
    y = re.search(r"\d{4}", s)
    mo = MON.get(s.strip()[:3].lower(), 0)
    return "%s-%02d-00" % (y[0] if y else "0000", mo)


def _gate(s):
    m = re.search(r"\$\s*([\d,]+)", s or "")
    return int(m[1].replace(",", "")) if m else None


def _norm(n):
    return re.sub(r"^the ", "", n.strip().lower())


def reigns(ledger, S):
    """{promo: [dict(title, holder, members, start, end)]}: a reign covers cards dated after start, up to and including end."""
    out = {}
    for p in ledger:
        k = LEDGER_KEY.get(p["id"], p["id"])
        for t in p.get("titles", []):
            L = t.get("L") or []
            for i, r in enumerate(L):
                if r.get("v"):
                    continue
                nxt = next((_date(x.get("w")) for x in L[i + 1:]), "9999-99-99")
                h = r["c"]
                members = [S.POOL_NAMES.get(n, n) for n in S.POOL_TEAMS.get(h, [h])]
                name = t["t"] if t["t"].startswith(p["name"]) else p["name"] + " " + t["t"]
                out.setdefault(k, []).append(dict(title=name, holder=h, members=members, start=_date(r.get("w")), end=nxt))
    return out


def _airing(c):
    """A TV episode taped on an earlier card: not a card of its own (its gate was counted on the taping night)."""
    return not _gate(c["gate"]) and bool(re.search(r"taped|Syndication", c["city"]) or re.search(r"\bEpisode \d", c["type"]))


def _seen(name, lines, S):
    pats = S.POOL_SEEN.get(name, [name])
    return any(re.search(r"(?<!\w)" + re.escape(p) + r"(?!\w)", ln) for ln in lines for p in pats)


def build(dump, WORLD, S, alias):
    """Returns (lines, cards, nogate, warnings). lines: tracker pay lines (kind 'pool'); cards: one per card that paid."""
    pct = S.POOL["pct"]; R = reigns(dump["ledger"], S); A = lambda n: alias.get(n, n)
    fin = dump["finance"]; ecards = [c for c in dump["cards"] if c["d"][:7] == S.MONTH and c["d"] <= WORLD]
    lines, cards, nogate, warn = [], [], [], []
    for k in sorted(set(fin) | {c["p"] for c in ecards}):
        if k.startswith("_"):
            continue
        todo, used = [], set()
        for r in fin.get(k, []):
            if r["d"][:7] != S.MONTH or r["d"] > WORLD or not r.get("gate"):
                continue
            cand = [c for c in ecards if c["p"] == k and c["d"] == r["d"]]
            if len(cand) > 1:   # more than one card that day (a TV airing, a second crew): the one in the same city, with a gate
                cand = sorted(cand, key=lambda c: (c["city"].split(",")[0] not in r["show"], not _gate(c["gate"]), _airing(c)))
            e = cand[0] if cand else None
            if e:
                used.add(id(e))
            todo.append(dict(d=r["d"], show=r["show"], gate=r["gate"], card=e))
        for c in ecards:
            if c["p"] != k or id(c) in used:
                continue
            g = _gate(c["gate"])
            s = next((x for x in S.SHOWS if x["p"] == k and x["d"] == c["d"]), None)
            if (g or s) and not any(t["d"] == c["d"] for t in todo):   # ran and has a gate, but isn't on the Finance tab yet
                todo.append(dict(d=c["d"], show=s["show"] if s else c["city"].split(",")[0] + " · " + c["type"], gate=s["gate"] if s else g, card=c))
            elif not g and not _airing(c):
                todo.append(dict(d=c["d"], show=c["city"].split(",")[0] + " · " + c["type"], gate=None, card=c))
        for t in sorted(todo, key=lambda t: t["d"]):
            d = t["d"]; e = t["card"]
            live = [r for kk in R for r in R[kk] if (kk == k or S.POOL.get("guests")) and r["start"] < d <= r["end"]]
            show = next((x for x in S.SHOWS if x["p"] == k and x["d"] == d), None)
            if show:
                on = {A(n) for n in show["people"]} | {A(n) for n in show.get("extra", {})}
                here = lambda n: A(n) in on
            else:
                txt = [re.sub(r"\([^)]*\)", "", m) for m in (e["m"] if e else [])]
                here = lambda n: _seen(n, txt, S)
            fix = S.POOL_FIX.get((k, d), {})
            who = {}
            for r in live:
                for n in r["members"]:
                    if (here(n) or n in fix.get("in", {})) and n not in fix.get("out", {}):
                        who.setdefault(A(n), []).append(r["title"])
            if not who:
                continue
            if not t["gate"]:
                nogate.append(dict(p=k, d=d, show=t["show"], champs=sorted(who)))
                continue
            pool = t["gate"] * pct; each = pool / len(who)
            row = dict(p=k, d=d, show=t["show"], gate=t["gate"], pool=round(pool, 2), each=round(each, 2),
                       champs=[[n, " & ".join(ts)] for n, ts in sorted(who.items())], src="results" if not show else "paid list")
            cards.append(row)
            for n, ts in who.items():
                lines.append((n, k, dict(p=k, d=d, what="{} · Champions' pool, as {} Champion: 3% of the ${:,} gate (${:,.2f}) split {} way{}".format(
                    t["show"], " and ".join(ts), t["gate"], pool, len(who), "" if len(who) == 1 else "s"), amt=round(each, 2), kind="pool")))
    # Cross-check the title histories against the champions each promotion lists now.
    for k, rs in R.items():
        cur = {_norm(r["holder"]) for r in rs if r["end"] == "9999-99-99"}
        cur |= {_norm(m) for r in rs if r["end"] == "9999-99-99" for m in r["members"]}
        for title, holder in dump["champs"].get(k, []):
            if re.match(r"(?i)vacant|to (establish|confirm|be crowned)|unresolved", holder):
                continue
            if _norm(S.POOL_NAMES.get(holder, holder)) not in cur and _norm(holder) not in cur:
                warn.append("{}: lists {} as {} champion, but the title history doesn't have that reign (not paid)".format(k, holder, title))
    return lines, cards, nogate, warn

"""Build title histories for every promotion archive site.

Reads the show pages listed on each archive's HTML/WELCOME.HTM, picks up the
TNM7 result tags ("(X won the Y Title.)", "(X retained the Y Title.)"), adds
the hand-entered facts in overrides.json, and writes HTML/TITLES.HTM into each
archive clone. It also makes sure WELCOME.HTM links to TITLES.HTM.

Usage (from the TNMWorld repo, with the archive repos cloned next to it):
    python3 tools/titles/build.py [--root /home/claude] [--md OUTDIR]

Dates come from the card dates in data/*.js (matched by the card's `link`),
then from the date in the WELCOME label, then from the page's match
observations, then from overrides.json.
"""
import argparse, datetime as dt, html, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(os.path.dirname(HERE))
REPOS = {  # archive repo dir -> data key, site name, public base
    'uswa': ('uswa', 'USWA', 'USWA'),
    'wcw1': ('wcw', 'WCW', 'WCW1'),
    'wwf': ('wwf', 'WWF', 'WWF'),
    'ajpw': ('ajpw', 'All Japan Pro Wrestling', 'AJPW'),
    'njpw': ('njpw', 'New Japan Pro Wrestling', 'NJPW'),
    'cmll': ('cmll', 'CMLL', 'CMLL'),
    'asw': ('asw', 'All Star Wrestling', 'ASW'),
    'tristate': ('twa', 'Tri-State Wrestling', 'TriState'),
    'powerpro': ('pp', 'Power Pro', 'Powerpro'),
}
LINK_HTML = '<p><a href="TITLES.HTM"><b>Title Histories</b></a></p>'
MONTHS = {m: i + 1 for i, m in enumerate(
    'january february march april may june july august september october november december'.split())}
TAG = re.compile(r'\(([^()]+?) (won|retained) the (vacant )?([^()]+?)\.\)')


def site_data():
    js = r"""
const fs=require('fs'),vm=require('vm'),dir=process.argv[1];
const ctx={P:{},E:[],SITES:{},FINANCE:{},CONTRACTS:{},BANNER_SVG:{},ARTICLES:{},Object,console};
vm.createContext(ctx);
let src=['world','wcw','wwf','uswa','pp','ajpw','njpw','cmll','asw','twa','fmw']
  .map(f=>fs.readFileSync(dir+'/data/'+f+'.js','utf8')).join('\n;\n').replace(/\bconst /g,'var ');
vm.runInContext(src,ctx);
process.stdout.write(JSON.stringify({E:ctx.E.map(c=>({d:c.d,p:c.p,link:c.link})),
  asOf:Object.fromEntries(Object.entries(ctx.P).map(([k,v])=>[k,v.asOf]))}));
"""
    out = subprocess.run(['node', '-e', js, SITE], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def page_text(path):
    t = open(path, encoding='latin-1').read()
    return html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', t))).strip()


def welcome_links(path):
    t = open(path, encoding='latin-1').read()
    return [(h, html.unescape(re.sub(r'\s+', ' ', x)).strip())
            for h, x in re.findall(r'<a href="([^"]+\.HTM)">([^<]*)', t, re.I)
            if h.upper() != 'TITLES.HTM']


def date_in_label(s):
    m = re.search(r'(\d{1,2})\.(\d{1,2})\.(\d{4})', s)
    return f'{int(m[3]):04d}-{int(m[1]):02d}-{int(m[2]):02d}' if m else None


def date_in_page(s):
    obs = s.split('Match observations', 1)[-1][:400]
    m = re.search(r'\b(\d{4})-(\d{2})-(\d{2})\b', obs)
    if m:
        return m[0]
    m = re.search(r'(January|February|March|April|May|June|July|August|September|October|November|December)'
                  r'\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})', obs, re.I)
    if m:
        return f'{int(m[3]):04d}-{MONTHS[m[1].lower()]:02d}-{int(m[2]):02d}'
    return None


def norm_title(t):
    t = re.sub(r'\b(Titles?|Championships?|Champions?)\b', '', t)
    return re.sub(r'\s+', ' ', t).strip()


def clean_match(seg, label=''):
    for mk in ('.) ', '] ', 'highlights. '):
        i = seg.rfind(mk)
        if i >= 0:
            seg = seg[i + len(mk):]
    seg = re.sub(r'^Rating:\s*(DUD|-?[\d/*½¼¾ ]+\*?)\s*', '', seg.strip())
    seg = re.sub(r'^Card rating:[^A-Z]*', '', seg)
    lab = re.sub(r'\s+', ' ', label)
    if lab and lab in seg[:250]:
        seg = seg[seg.index(lab) + len(lab):]
    seg = seg.strip(' :')
    for _ in range(4):
        seg = re.sub(r'^(Interview|Backstage|Backstage Interview|In Ring Promo|Segment|Opening Segmant|Promo)\b[^.]*\.\s*', '', seg)
    seg = seg.strip(' :')
    return seg if len(seg) <= 300 else seg[:297].rsplit(' ', 1)[0] + '...'


def fmt_date(d):
    if not d:
        return '?'
    y, m, dd = map(int, d.split('-'))
    return f'{m}/{dd}/{y}'


def same_holder(a, b):
    def key(x):
        x = re.sub(r'^the ', '', x.lower())
        return set(re.findall(r'[a-z]+', x)) - {'and', 'the'}
    ka, kb = key(a), key(b)
    return bool(ka & kb)


def build_repo(root, repo, data, ov):
    key, name, base = REPOS[repo]
    hdir = os.path.join(root, repo, 'HTML')
    emap = {c['link'].upper(): c['d'] for c in data['E'] if c.get('p') == key and c.get('link')}
    dover = ov['dates'].get(repo, {})
    shows = {}
    for i, (href, label) in enumerate(welcome_links(os.path.join(hdir, 'WELCOME.HTM'))):
        if repo == 'wcw1' and href.upper().startswith('WWF_'):
            continue  # WWF pages that live in the WCW archive belong to the WWF site
        path = os.path.join(hdir, href)
        if not os.path.exists(path):
            continue
        s = page_text(path)
        stem = href.upper().rsplit('.', 1)[0]
        d, shown = None, None
        if href in dover:
            d, shown = dover[href]
        d = d or emap.get(stem) or date_in_label(label) or date_in_page(s)
        shows[href] = dict(i=i, href=href, label=label, date=d, shown=shown or fmt_date(d), text=s)
    # welcome lists may run newest-first or oldest-first; order ties by that direction
    dated = [s for s in shows.values() if s['date']]
    asc = sum(1 for a, b in zip(dated, dated[1:]) if a['date'] <= b['date']) >= len(dated) / 2
    def order(s):
        return (s['date'] or '9999', s['i'] if asc else -s['i'])

    events = []
    for s in shows.values():
        res = s['text'].split('Match observations')[0]
        for n, m in enumerate(TAG.finditer(res)):
            start = res.rfind('Rating:', 0, m.start())
            prev = res.rfind('Rating:', 0, start) if start > 0 else -1
            seg = clean_match(res[(prev if prev >= 0 else 0):start], s['label'])
            rm = re.match(r'Rating:\s*([^(\[]*)', res[start:]) if start >= 0 else None
            events.append(dict(show=s, n=n, kind=m[2], title=norm_title(m[4]), who=m[1].strip(),
                               how=seg, rating=rm[1].strip() if rm else ''))
    for e in ov['events']:
        if e['repo'] != repo:
            continue
        s = shows.get(e['href']) or dict(i=0, href=e['href'], label=e.get('label', e['href']), date=e['date'], shown=fmt_date(e['date']))
        events.append(dict(show=s, n=-1 if e['kind'] in ('vacant', 'note') else 99, kind=e['kind'], title=e['title'],
                           who=e.get('who', ''), how=e.get('how', ''), note=e.get('note', ''), rating=e.get('rating', '')))
    events.sort(key=lambda e: (order(e['show']), e['n']))

    titles = []
    names = ov['titles'].get(repo, [])
    known = [n for n, _ in names] + sorted({e['title'] for e in events} - {n for n, _ in names})
    last_date = data['asOf'].get(key) or max((s['date'] for s in shows.values() if s['date']), default=None)
    last_date = max([d for d in [last_date] + [s['date'] for s in shows.values()] if d])
    for tkey in known:
        disp = dict(names).get(tkey, tkey)
        reigns, cur = [], None
        def close(end):
            if cur and cur.get('type') == 'reign':
                cur['end'] = end
        for e in (x for x in events if x['title'] == tkey):
            s = e['show']
            if e['kind'] in ('won', 'awarded'):
                close(s['date'])
                cur = dict(type='reign', who=e['who'], start=s['date'], shown=s['shown'], show=s, how=e['how'],
                           rating=e['rating'], kind=e['kind'], defenses=[], notes=[])
                reigns.append(cur)
            elif e['kind'] == 'retained':
                if not cur or cur.get('type') != 'reign' or not same_holder(cur['who'], e['who']):
                    close(s['date'])
                    cur = dict(type='reign', who=e['who'], start=None, shown=None, show=None, how='', rating='',
                               kind='begins', defenses=[], notes=[])
                    reigns.append(cur)
                cur['defenses'].append(e)
            elif e['kind'] == 'vacant':
                close(s['date'])
                cur = dict(type='vacant', start=s['date'], shown=s['shown'], show=s, note=e['note'], notes=[])
                reigns.append(cur)
            elif e['kind'] == 'note':
                if cur is not None:
                    cur['notes'].append(e)
                else:
                    cur = dict(type='vacant', start=s['date'], shown=s['shown'], show=s, note=e['note'], notes=[])
                    reigns.append(cur)
        if reigns and reigns[-1].get('type') == 'reign' and 'end' not in reigns[-1]:
            reigns[-1]['end'] = None
        titles.append(dict(name=disp, reigns=reigns))
    for tname, status in ov.get('other_titles', {}).get(repo, []):
        titles.append(dict(name=tname, reigns=[], status=status))
    return dict(repo=repo, name=name, base=base, titles=titles, as_of=last_date, shows=len(shows))


def days(a, b):
    return (dt.date.fromisoformat(b) - dt.date.fromisoformat(a)).days


def esc(s):
    return html.escape(s or '', quote=True)


FRONT = 'https://shovan123-lang.github.io/TNMWorld/'
COLORS = {'uswa': '#1e3a6e', 'wcw': '#33318f', 'wwf': '#13679e', 'ajpw': '#c8151b', 'njpw': '#9d1419', 'cmll': '#1c3d8f', 'asw': '#1b1a17', 'twa': '#a81e2a', 'pp': '#b3261b'}
ACCENTS = {'uswa': '#c8283a', 'wcw': '#d4a62a', 'wwf': '#e3b21c', 'ajpw': '#ef5a5f', 'njpw': '#f0a800', 'cmll': '#e2a80b', 'asw': '#e0202f', 'twa': '#8d939a', 'pp': '#f28c28'}
FONTS = ('<link href="https://fonts.googleapis.com/css2?family=Anton&family=Roboto+Condensed:wght@400;600;700'
         '&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap" rel="stylesheet">')
# Same newsprint look as the World Report front page (index.html in TNMWorld).
CSS = """:root{--paper:#f3eee3;--paper2:#e9e2d2;--ink:#1b1a17;--mute:#6a645a;--soft:#cfc6b3;--red:#b3261e;
--head:'Anton',Impact,sans-serif;--cond:'Roboto Condensed',Arial Narrow,sans-serif;--serif:'Source Serif 4',Georgia,serif}
*{box-sizing:border-box}html,body{margin:0;background:var(--paper);color:var(--ink)}
body{font-family:var(--serif);font-size:16px;line-height:1.5;background-image:radial-gradient(rgba(0,0,0,.035) 1px,transparent 1px);background-size:3px 3px}
a{color:inherit}.wrap{max-width:1180px;margin:0 auto;padding:0 20px}
nav.main{position:sticky;top:0;z-index:20;background:var(--ink);color:var(--paper)}
nav.main .wrap{display:flex;flex-wrap:wrap;align-items:stretch}
nav.main a{font-family:var(--cond);font-weight:700;font-size:13.5px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;padding:11px 12px;border-bottom:4px solid transparent;white-space:nowrap}
nav.main a:hover{background:#2c2a26}nav.main a.on{border-bottom-color:var(--c);background:#2c2a26}nav.main .sp{flex:1}
.mast{border-bottom:4px double var(--ink);padding:18px 0 10px;text-align:center}
.mast .top{display:flex;justify-content:space-between;gap:10px;font-family:var(--cond);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--mute);border-bottom:1px solid var(--ink);padding-bottom:6px}
.mast .top a{text-decoration:none}.mast .top a:hover{color:var(--red)}
.mast .name{font-family:var(--head);font-weight:400;font-size:clamp(30px,5vw,52px);line-height:.95;margin:12px 0 4px;letter-spacing:.01em;text-transform:uppercase}
.mast .name span{color:var(--red)}.mast .tag{font-style:italic;color:var(--mute);font-size:15px}
.phead{border-top:10px solid var(--c);margin-top:22px;padding:14px 0 6px;border-bottom:1px solid var(--ink);display:flex;justify-content:space-between;align-items:end;gap:12px;flex-wrap:wrap}
.phead h1{font-family:var(--head);font-weight:400;font-size:clamp(38px,7vw,72px);line-height:.9;margin:0;text-transform:uppercase;color:var(--c)}
.phead .stat{font-family:var(--cond);text-align:right;text-transform:uppercase;letter-spacing:.08em;font-size:12px;color:var(--mute)}
.phead .stat b{display:block;font-family:var(--head);font-weight:400;font-size:28px;line-height:1;color:var(--ink);letter-spacing:.01em}
.sub{font-style:italic;color:var(--mute);margin:10px 0 0}
.toc{display:flex;flex-wrap:wrap;gap:6px;margin:16px 0 0}
.toc a{font-family:var(--cond);font-weight:700;font-size:12.5px;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;border:1.5px solid var(--ink);padding:4px 10px;background:var(--paper)}
.toc a:hover{background:var(--ink);color:var(--paper)}
h2.sec{font-family:var(--head);font-weight:400;text-transform:uppercase;font-size:28px;letter-spacing:.02em;margin:34px 0 10px;border-bottom:3px solid var(--ink);padding-bottom:4px;scroll-margin-top:60px}
h2.sec::before{content:"";display:inline-block;width:12px;height:12px;background:var(--c);margin:0 10px 5px 0;vertical-align:middle}
.tbl-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-family:var(--cond);font-size:14.5px}
th{text-align:left;font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:12px;border-bottom:2px solid var(--ink);padding:6px 8px}
td{border-bottom:1px solid var(--soft);padding:7px 8px;vertical-align:top}
td a{color:var(--c);text-decoration:none;font-weight:600}td a:hover{text-decoration:underline}
td.n{font-family:var(--head);font-size:20px;color:var(--mute);width:34px;text-align:center}
td.who b{font-family:var(--serif);font-size:16px}
tr.vac td{background:var(--paper2);color:var(--mute);font-style:italic}
tr.now td{background:color-mix(in srgb,var(--c) 9%,transparent)}
.cur{display:inline-block;font-weight:700;font-size:11px;letter-spacing:.1em;text-transform:uppercase;background:var(--c);color:#fff;padding:1px 6px;margin-right:4px}
.muted{color:var(--mute)}.star{font-weight:700;white-space:nowrap}
.status{font-family:var(--cond);border-left:4px solid var(--c);background:var(--paper2);padding:8px 12px}
details{margin:6px 0 4px;border-left:3px solid var(--soft);padding-left:12px}
summary{cursor:pointer;font-family:var(--cond);font-weight:700;font-size:13px;letter-spacing:.05em;text-transform:uppercase;color:var(--c);padding:3px 0}
details ul{margin:4px 0 10px 16px;padding:0}details li{margin:3px 0;font-size:14.5px}
details li a{color:var(--c);font-family:var(--cond);font-weight:700;text-decoration:none}
footer{margin:40px 0 0;border-top:4px double var(--ink);padding:14px 0 30px;font-family:var(--cond);font-size:13px;color:var(--mute);text-align:center}
footer a{font-weight:700;color:var(--ink);text-decoration:none;margin:0 8px}footer a:hover{color:var(--red)}
nav.main a.on{border-bottom-color:var(--c2,var(--c))}nav.main a:hover{box-shadow:inset 0 -4px 0 var(--c2,var(--c))}h2.sec{border-image:linear-gradient(90deg,var(--c) 0 72px,var(--c2,var(--c)) 72px 120px,var(--ink) 120px) 1}h2.sec::before{background:linear-gradient(var(--c) 0 60%,var(--c2,var(--c)) 60%)}td a,details li a{text-decoration:underline;text-decoration-color:transparent;text-decoration-thickness:2px;text-underline-offset:3px;transition:text-decoration-color .15s}td a:hover,details li a:hover{text-decoration-color:var(--c2,var(--c))}.toc a:hover{background:var(--c);border-color:var(--c);color:#fff}
@media(max-width:640px){nav.main .opt{display:none}nav.main a{padding:11px 9px}.mast .top span:not(:first-child){display:none}.mast .top{justify-content:center}.phead .stat{text-align:left}}"""


def render_html(r):
    key = REPOS[r['repo']][0]
    c = COLORS.get(key, '#b3261e')
    reigns = sum(1 for t in r['titles'] for g in t['reigns'] if g['type'] == 'reign')
    out = ['<!DOCTYPE html>', '<html lang="en"><head><meta charset="utf-8">',
           '<meta name="viewport" content="width=device-width, initial-scale=1">',
           f'<title>{esc(r["name"])} Title Histories · The TNM World Wrestling Report</title>',
           '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
           FONTS, f'<style>{CSS}</style></head><body style="--c:{c};--c2:{ACCENTS.get(key, c)}">',
           f'<nav class="main"><div class="wrap"><a href="{FRONT}">&larr; Front Page</a>'
           f'<a href="WELCOME.HTM">{esc(r["name"])} Card List</a><a class="on" href="#">Title Histories</a>'
           f'<span class="sp"></span><a class="opt" href="{FRONT}#calendar">World Calendar</a></div></nav>',
           '<div class="wrap">',
           f'<header class="mast"><div class="top"><span><a href="{FRONT}">The TNM World Wrestling Report</a></span>'
           f'<span>{esc(r["name"])} Archive</span><span>Through {fmt_date(r["as_of"])}</span></div>'
           f'<div class="name"><a href="{FRONT}" style="text-decoration:none">The TNM World <span>Wrestling</span> Report</a></div>'
           '<div class="tag">The Championship Ledger</div></header>',
           f'<div class="phead"><h1>{esc(r["name"])}<br>Title Histories</h1>'
           f'<div class="stat"><b>{len(r["titles"])}</b>titles &middot; {reigns} reigns<br>through {fmt_date(r["as_of"])}</div></div>',
           f'<p class="sub">Built from the show results on this site, through {fmt_date(r["as_of"])}. '
           'Reign lengths run to that date. Lineages start when this site\'s records begin.</p>']
    out.append('<div class="toc">' + ''.join(f'<a href="#t{i}">{esc(t["name"])}</a>' for i, t in enumerate(r['titles'])) + '</div>')
    for i, t in enumerate(r['titles']):
        out.append(f'<h2 class="sec" id="t{i}">{esc(t["name"])}</h2>')
        if not t['reigns']:
            out.append(f'<p class="status">Current status: <b>{esc(t.get("status", "No title matches on record yet"))}</b>. '
                       'No title matches on this site yet.</p>')
            continue
        out.append('<div class="tbl-wrap"><table><tr><th>#</th><th>Champion</th><th>Won</th><th>Event</th><th>How</th><th>Reign</th></tr>')
        n = 0
        for rg in t['reigns']:
            ev = rg.get('show')
            evl = f'<a href="{esc(ev["href"])}">{esc(ev["label"])}</a>' if ev else '<span class="muted">&mdash;</span>'
            if rg['type'] == 'vacant':
                out.append(f'<tr class="vac"><td class="n"></td><td>Vacant</td><td>{esc(rg["shown"])}</td><td>{evl}</td>'
                           f'<td>{esc(rg["note"])}</td><td></td></tr>')
                continue
            n += 1
            now = not rg.get('end')
            if rg['start'] and rg.get('end'):
                length = f'{days(rg["start"], rg["end"])} days'
            elif rg['start']:
                length = f'<span class="cur">Current</span>{days(rg["start"], r["as_of"])}+ days'
            elif rg.get('end'):
                length = f'Lost {fmt_date(rg["end"])}'
            else:
                length = '<span class="cur">Current</span>'
            won = esc(rg['shown']) if rg['start'] else '<span class="muted">Champion when records begin</span>'
            how = esc(rg['how']) + (f' <span class="star">{esc(rg["rating"])}</span>' if rg['rating'] else '')
            nd = len(rg['defenses'])
            length += f'<br><span class="muted">{nd} defense{"s" if nd != 1 else ""}</span>'
            trc = ' class="now"' if now else ''
            out.append(f'<tr{trc}><td class="n">{n}</td><td class="who"><b>{esc(rg["who"])}</b></td>'
                       f'<td>{won}</td><td>{evl}</td><td>{how}</td><td>{length}</td></tr>')
        out.append('</table></div>')
        for rg in t['reigns']:
            items = sorted(rg.get('defenses', []) + rg.get('notes', []), key=lambda e: (e['show']['date'] or '', e['n']))
            if not items:
                continue
            who = rg.get('who', 'Vacancy')
            nd = len(rg.get('defenses', []))
            out.append(f'<details><summary>{esc(who)}: title defenses and notes ({nd} defense{"" if nd == 1 else "s"})</summary><ul>')
            for e in items:
                s = e['show']
                link = f'<a href="{esc(s["href"])}">{esc(s["shown"])} &middot; {esc(s["label"])}</a>'
                if e['kind'] == 'note':
                    out.append(f'<li>{link}: <i>{esc(e["note"])}</i></li>')
                else:
                    rt = f' <span class="star">{esc(e["rating"])}</span>' if e['rating'] else ''
                    out.append(f'<li>{link}: {esc(e["how"])}{rt}</li>')
            out.append('</ul></details>')
    out.append(f'<footer><a href="{FRONT}">&larr; Back to the World Report front page</a> &middot; '
               f'<a href="WELCOME.HTM">{esc(r["name"])} card list</a><br>'
               f'Updated {dt.date.today().strftime("%m-%d-%Y")}</footer></div></body></html>')
    return '\n'.join(out)


def render_md(r):
    out = [f'# {r["name"]} Title Histories (TNM World)', '',
           f'Built from the official site show pages (https://shovan123-lang.github.io/{r["base"]}/HTML/WELCOME.HTM), '
           f'through {fmt_date(r["as_of"])}. Lineages start when the site\'s records begin.', '']
    for t in r['titles']:
        out += [f'## {t["name"]}', '']
        if not t['reigns']:
            out += [f'- Status: {t.get("status", "No title matches on record yet")}. No title matches in the archive yet.', '']
            continue
        out += ['| # | Champion | Won | Event | How | Reign |', '|---|---|---|---|---|---|']
        n = 0
        for rg in t['reigns']:
            ev = rg.get('show')
            evs = ev['label'] if ev else '—'
            if rg['type'] == 'vacant':
                out.append(f'| | *Vacant* | {rg["shown"]} | {evs} | {rg["note"]} | |')
                continue
            n += 1
            if rg['start'] and rg.get('end'):
                ln = f'{days(rg["start"], rg["end"])} days'
            elif rg['start']:
                ln = f'**Current**, {days(rg["start"], r["as_of"])}+ days'
            elif rg.get('end'):
                ln = f'Lost {fmt_date(rg["end"])}'
            else:
                ln = '**Current**'
            ln += f', {len(rg["defenses"])} def.'
            won = rg['shown'] if rg['start'] else 'Champion when records begin'
            how = (rg['how'] + (f' {rg["rating"]}' if rg['rating'] else '')).replace('|', '/')
            out.append(f'| {n} | **{rg["who"]}** | {won} | {evs} | {how} | {ln} |')
        out.append('')
        for rg in t['reigns']:
            if rg['type'] != 'reign' or not rg['defenses']:
                continue
            ds = ' · '.join(f'{e["show"]["shown"]} {e["how"][:90]} {e["rating"]}'.strip() for e in rg['defenses'])
            out.append(f'- **{rg["who"]} defenses:** {ds}')
        out.append('')
    return '\n'.join(out)


def ensure_link(path):
    t = open(path, encoding='latin-1').read()
    if 'TITLES.HTM' in t:
        return False
    new = re.sub(r'(<body[^>]*>)', r'\1\n' + LINK_HTML, t, count=1, flags=re.I)
    if new == t:
        new = LINK_HTML + '\n' + t
    open(path, 'w', encoding='latin-1', newline='').write(new)
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--root', default=os.path.dirname(SITE))
    ap.add_argument('--md', default=None)
    ap.add_argument('--only', nargs='*')
    a = ap.parse_args()
    data = site_data()
    ov = json.load(open(os.path.join(HERE, 'overrides.json')))
    for repo in REPOS:
        if a.only and repo not in a.only:
            continue
        if not os.path.isdir(os.path.join(a.root, repo, 'HTML')):
            print(f'skip {repo}: not cloned at {a.root}/{repo}', file=sys.stderr)
            continue
        r = build_repo(a.root, repo, data, ov)
        open(os.path.join(a.root, repo, 'HTML', 'TITLES.HTM'), 'w', encoding='utf-8').write(render_html(r))
        linked = ensure_link(os.path.join(a.root, repo, 'HTML', 'WELCOME.HTM'))
        if a.md:
            os.makedirs(a.md, exist_ok=True)
            open(os.path.join(a.md, f'{repo}.md'), 'w').write(render_md(r))
        nreigns = sum(1 for t in r['titles'] for g in t['reigns'] if g['type'] == 'reign')
        print(f'{repo}: {r["shows"]} shows, {len(r["titles"])} titles, {nreigns} reigns, through {r["as_of"]}'
              + ('; added WELCOME link' if linked else ''))


if __name__ == '__main__':
    main()

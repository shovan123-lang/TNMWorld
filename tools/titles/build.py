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
        s = shows.get(e['href']) or dict(i=0, href=e['href'], label=e['href'], date=e['date'], shown=fmt_date(e['date']))
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


CSS = """body{font-family:Georgia,'Times New Roman',serif;max-width:980px;margin:24px auto;padding:0 16px;color:#111;line-height:1.4}
h1{margin-bottom:2px}h2{margin-top:34px;border-bottom:2px solid #222;padding-bottom:3px}
.sub{color:#555;margin-top:0}table{border-collapse:collapse;width:100%;margin:8px 0 6px;font-size:15px}
th,td{border:1px solid #bbb;padding:5px 7px;text-align:left;vertical-align:top}th{background:#eee}
tr.vac td{background:#f6f6f6;color:#555;font-style:italic}td.n{text-align:center;width:28px}
details{margin:2px 0 10px}summary{cursor:pointer;color:#036}ul{margin:4px 0 8px 18px;padding:0}
li{margin:2px 0;font-size:14px}.cur{font-weight:bold}.toc a{margin-right:14px}.muted{color:#666}"""


def render_html(r):
    out = [f'<html><head><meta charset="utf-8"><title>{esc(r["name"])} Title Histories</title>',
           f'<style>{CSS}</style></head><body>',
           f'<p><a href="WELCOME.HTM">&larr; Back to the card list</a></p>',
           f'<h1>{esc(r["name"])} Title Histories</h1>',
           f'<p class="sub">Built from the show results on this site, through {fmt_date(r["as_of"])}. '
           'Reign lengths run to that date. Lineages start when this site\'s records begin.</p>']
    out.append('<p class="toc">' + ''.join(f'<a href="#t{i}">{esc(t["name"])}</a>' for i, t in enumerate(r['titles'])) + '</p>')
    for i, t in enumerate(r['titles']):
        out.append(f'<h2 id="t{i}">{esc(t["name"])}</h2>')
        if not t['reigns']:
            out.append(f'<p>Current status: <b>{esc(t.get("status", "No title matches on record yet"))}</b>. '
                       'No title matches on this site yet.</p>')
            continue
        out.append('<table><tr><th>#</th><th>Champion</th><th>Won</th><th>Event</th><th>How</th><th>Reign</th></tr>')
        n = 0
        for rg in t['reigns']:
            ev = rg.get('show')
            evl = f'<a href="{esc(ev["href"])}">{esc(ev["label"])}</a>' if ev else '<span class="muted">&mdash;</span>'
            if rg['type'] == 'vacant':
                out.append(f'<tr class="vac"><td class="n"></td><td>Vacant</td><td>{esc(rg["shown"])}</td><td>{evl}</td>'
                           f'<td>{esc(rg["note"])}</td><td></td></tr>')
                continue
            n += 1
            if rg['start'] and rg.get('end'):
                length = f'{days(rg["start"], rg["end"])} days'
            elif rg['start']:
                length = f'<span class="cur">Current</span>, {days(rg["start"], r["as_of"])}+ days'
            elif rg.get('end'):
                length = f'Lost {fmt_date(rg["end"])}'
            else:
                length = '<span class="cur">Current</span>'
            won = esc(rg['shown']) if rg['start'] else '<span class="muted">Champion when records begin</span>'
            how = esc(rg['how']) + (f' <b>{esc(rg["rating"])}</b>' if rg['rating'] else '')
            nd = len(rg['defenses'])
            length += f'<br><span class="muted">{nd} defense{"s" if nd != 1 else ""}</span>'
            out.append(f'<tr><td class="n">{n}</td><td><b>{esc(rg["who"])}</b></td><td>{won}</td><td>{evl}</td>'
                       f'<td>{how}</td><td>{length}</td></tr>')
        out.append('</table>')
        for rg in t['reigns']:
            items = sorted(rg.get('defenses', []) + rg.get('notes', []), key=lambda e: (e['show']['date'] or '', e['n']))
            if not items:
                continue
            who = rg.get('who', 'Vacancy')
            out.append(f'<details><summary>{esc(who)}: title defenses and notes ({len(rg.get("defenses", []))} defenses)</summary><ul>')
            for e in items:
                s = e['show']
                link = f'<a href="{esc(s["href"])}">{esc(s["shown"])} &middot; {esc(s["label"])}</a>'
                if e['kind'] == 'note':
                    out.append(f'<li>{link}: <i>{esc(e["note"])}</i></li>')
                else:
                    rt = f' <b>{esc(e["rating"])}</b>' if e['rating'] else ''
                    out.append(f'<li>{link}: {esc(e["how"])}{rt}</li>')
            out.append('</ul></details>')
    out.append(f'<p><hr><span class="muted">Updated {dt.date.today().strftime("%m-%d-%Y")}</span></p></body></html>')
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

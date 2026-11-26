#!/usr/bin/env python3
"""Build data/history.js: Talent File results that only the show archives have.

  python3 tools/history/build.py <folder with the archive repos cloned side by side>

The archive repos (USWA, WCW1, WWF, ...) are TNM 7 HTML exports. A show goes into the history when
  - it ran before the promotion's first card on the site (USWA from September 1990, WCW July 1-4),
    and the site has no card on that date, or
  - the site has its card but lists no matches on it (WWF Superstars, Ep 1).
Shows already on the site's cards are left out, so nothing counts twice. index.html passes HIST to the
Talent File engine with E; each match carries its outcome (index of the winning side, or "d").
"""
import re,os,glob,html,json,sys,subprocess
from collections import Counter
ROOT=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BASE=sys.argv[1] if len(sys.argv)>1 else '.'
REPO2P={'uswa':'uswa','ajpw':'ajpw','asw':'asw','cmll':'cmll','fmw':'fmw','njpw':'njpw','powerpro':'pp','tristate':'twa','wcw1':'wcw','wwf':'wwf'}
MON={m:i+1 for i,m in enumerate('January February March April May June July August September October November December'.split())}
# Pages with no date on them; the title histories give these.
FIX={'THANKSGI':('1990-11-22','Memphis, TN','Thanksgiving Thunder 1990'),
     'GAUNTLET':('1991-01-21','Memphis, TN','Gauntlet For The Gold'),
     'THE_GAUN':('1991-01-21','Memphis, TN','Gauntlet For The Gold · The Gauntlet')}
DATE=re.compile(r'\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b')
def clean(s): return re.sub(r'\s+',' ',s).strip()
def top_split(s,seps):
    """split s at top-level (outside parens) on any of seps (list of literal strings)"""
    out=[];depth=0;i=0;cur=''
    while i<len(s):
        c=s[i]
        if c=='(':depth+=1
        elif c==')':depth=max(0,depth-1)
        if depth==0:
            hit=next((x for x in seps if s.startswith(x,i)),None)
            if hit: out.append(cur);cur='';i+=len(hit);continue
        cur+=c;i+=1
    out.append(cur);return [clean(x) for x in out]
def top_find(s,word):
    depth=0
    for i,c in enumerate(s):
        if c=='(':depth+=1
        elif c==')':depth=max(0,depth-1)
        elif depth==0 and s.startswith(word,i):return i
    return -1
VOCAB=set()
def fixwords(s):
    ws=s.split(' ');out=[];i=0
    while i<len(ws):
        a=ws[i];b=ws[i+1] if i+1<len(ws) else None
        if b and a.isalpha() and b.isalpha() and b.islower() and (a+b) in VOCAB and a not in VOCAB and b not in VOCAB:
            out.append(a+b);i+=2;continue
        out.append(a);i+=1
    return ' '.join(out)
def amp(side):
    side=fixwords(side)
    side=re.sub(r'\(([^)]*)\)',lambda m:'('+re.sub(r',?\s+and\s+',' & ',m.group(1))+')',side)
    parts=top_split(side,[' and ',', '])
    return ' & '.join(p for p in parts if p)
def fmt_time(h,m,s):
    h,m,s=int(h),int(m),int(s);mm=h*60+m;return f'{mm}:{s:02d}'
def rating(r):
    r=clean(r).replace(' ','')
    return r
def parse_sentence(s):
    tm=re.search(r'\s+in\s+(\d+):(\d\d):(\d\d)\s*\.?\s*$',s)
    t=fmt_time(*tm.groups()) if tm else ''
    s=s[:tm.start()] if tm else s
    s=clean(s)
    i=top_find(s,' defeated ')
    if i>-1:
        w=s[:i];rest=s[i+10:]
        j=min([x for x in (top_find(rest,' when '),top_find(rest,' by '),top_find(rest,' via ')) if x>-1] or [len(rest)])
        l=rest[:j];how=rest[j:].strip()
        how=re.sub(r'^when ','',how)
        res=(how if how and not how.startswith(('by ','via ')) else (shortname(w)+' '+how if how else shortname(w)))
        return [amp(w),amp(l)],0,res,t
    i=top_find(s,' pinned ')
    if i>-1:
        w=s[:i];rest=s[i+8:]
        j=min([x for x in (rest.find(' after '),rest.find(' with '),rest.find(' using '),rest.find(' via ')) if x>-1] or [len(rest)])
        return [amp(w),amp(rest[:j])],0,s,t
    m=re.match(r'^(.*?) made (.*?) submit\b(.*)$',s)
    if m: return [amp(m.group(1)),amp(m.group(2))],0,s,t
    i=top_find(s,' battled ')
    if i>-1:
        parts=top_split(s[:i],[' and '])
        how=s[i+9:]
        return [amp(p) for p in parts],'d',('Draw: '+how[3:] if how.startswith('to ') else how).replace('Draw: a ','').replace('Draw: an ',''),t
    return None
MULTI=re.compile(r'triangle|three[- ]way|3[- ]way|four[- ]way|4[- ]way|four corners|fatal|elimination ladder',re.I)
def falls(joined,stip):
    # "A beat B 3 falls to 0: x A beat B via ... in 0:07:17 x ..." and "A defeated B and C: x ..." (fall-by-fall matches)
    m=re.match(r'^(.*?) (beat|defeated|drew) (.*?)(?:\s+(\d+) falls? to (\d+))?\s*:\s*x\s(.*)$',joined)
    if not m: return None
    w,l=m.group(1),m.group(3)
    if top_find(w,' when ')>-1 or top_find(l,' when ')>-1: return None
    xs=[clean(re.sub(r'Rating:.*$','',x)) for x in re.split(r'\s+x\s+',' '+m.group(6)) if clean(x)]
    last=xs[-1] if xs else ''
    tm=re.search(r'\s+in\s+(\d+):(\d\d):(\d\d)\.?\s*(.*)$',last)
    t=fmt_time(*tm.groups()[:3]) if tm else ''
    lastx=last[:tm.start()] if tm else last
    sides=[amp(w)]+([amp(x) for x in top_split(l,[' and ',', '])] if MULTI.search(stip) else [amp(l)])
    fl=f"{m.group(4)} falls to {m.group(5)}" if m.group(4) else ''
    res=(fl+': ' if fl else '')+lastx if lastx else (shortname(w)+' won '+fl if fl else shortname(w))
    if m.group(2)=='drew':
        res='Draw: '+lastx if lastx else 'Draw'
        return {'kind':'m','stip':stip,'sides':[amp(w)]+[amp(x) for x in top_split(l,[' and ',', '])] if MULTI.search(stip) or re.search(r'corners|triangle',stip,re.I) else [amp(w),amp(l)],'oc':'d','res':res,'time':t}
    return {'kind':'m','stip':stip,'sides':sides,'oc':0,'res':res,'time':t}
def shortname(x): return re.sub(r'\s*\(.*?\)','',x).strip()
def battle(block_lines,stip):
    head=clean(block_lines[0]);
    m=re.match(r'^(.*?) won an? (.*?):?$',head)
    if not m:return None
    winners=[clean(x) for x in re.split(r'\s+and\s+',m.group(1))]
    what=m.group(2).rstrip(':')
    names=[]
    body=' '.join(block_lines[1:])
    for ln in re.split(r'\s+x\s+',' '+body):
        ln=clean(ln)
        if not ln:continue
        ln=re.sub(r'\s+in\s+\d+:\d\d:\d\d\.?$','',ln)
        mm=re.match(r'^(.*?) and (.*?) started out',ln)
        if mm:names+= [mm.group(1),mm.group(2)];continue
        mm=re.match(r'^(.*?) entered at',ln)
        if mm:names.append(mm.group(1));continue
        mm=re.match(r'^(.*?) threw out (.*?)(?: after .*)?$',ln)
        if mm:names+=[mm.group(1),mm.group(2)];continue
        mm=re.match(r'^(.*?) defeated (.*?) \(partner: (.*?)\)',ln)
        if mm:names+=[mm.group(1),mm.group(2),mm.group(3)];continue
    seen=set();others=[]
    wn={w.lower() for w in winners}
    wlast={(w.split()[-1].lower(),w[0].lower()) for w in winners}
    def is_winner(n):
        ws=n.split()
        if n.lower() in wn:return True
        for w in winners:
            wws=w.lower().split()
            if len(ws)<len(wws) and wws[-len(ws):]==[x.lower() for x in ws]:return True
        last=ws[-1].lower()
        for wl,wi in wlast:
            if last==wl and (len(ws)==1 or re.match(r'^[A-Z]\.$',ws[0]) and ws[0][0].lower()==wi):return True
        return False
    for n in names:
        n=clean(n)
        if is_winner(n) or n.lower() in seen:continue
        seen.add(n.lower());others.append(n)
    return winners,others,what
def page(path):
    t=open(path,encoding='latin-1').read()
    h=re.search(r'<h2>(.*?)</h2>',t,re.I|re.S)
    head=clean(html.unescape(re.sub(r'<[^>]+>','',h.group(1)))) if h else ''
    body=t[h.end():] if h else t
    body=re.split(r'Match observations:',body,maxsplit=1)[0]
    body=re.sub(r'<a [^>]*>.*?</a>','',body,flags=re.S|re.I)
    body=html.unescape(re.sub(r'<[^>]+>','',body))
    blocks=[b for b in re.split(r'\n\s*\n',body) if b.strip()]
    ms=[]
    for b in blocks:
        lines=[l for l in b.split('\n') if l.strip()]
        stips=[]
        while lines and re.match(r'^\s*(\[[^\]]*\]:?\s*)*[^.]{0,130}:\s*$',lines[0]) and not re.search(r' won an? | beat | defeated | drew |\bfalls? to \d',lines[0]):
            stips.append(lines.pop(0).strip())
        # "[X]: 10-Man Battle Royal:" may share the line with stuff; also "[X]:" prefix on the sentence line
        if lines:
            mm=re.match(r'^\s*((?:\[[^\]]*\]:\s*)+)(.*)$',lines[0])
            if mm: stips.append(mm.group(1).strip()); lines[0]=mm.group(2)
        stip=' · '.join(clean(re.sub(r'[\[\]]','',x)).rstrip(':').strip() for x in stips if x.strip())
        if stip.lower().startswith(('interview','segment','main event:')) and stip.lower()!='main event':pass
        if not lines:continue
        joined=clean(' '.join(lines))
        if re.search(r' won an? .*(royal|rumble|elimination|gauntlet|match)',lines[0],re.I) and re.search(r'\bx\s',joined):
            br=battle(lines,stip)
            if br:
                winners,others,what=br
                rate=re.search(r'Rating:\s*([^\n]*)',b)
                ms.append({'kind':'br','stip':stip,'winners':winners,'others':others,'what':what,'rate':rating(rate.group(1)) if rate else ''})
            continue
        fx=falls(joined,stip)
        if fx:
            fx['rate']=(lambda r:rating(r.group(1)) if r else '')(re.search(r'Rating:\s*(.*?)(?:\(|\[|$)',joined));fx['notes']=re.findall(r'\(([^)]*(?:won|retained|retains)[^)]*)\)',joined);ms.append(fx);continue
        m=re.search(r'^(.*?\bin \d+:\d\d:\d\d)(?:\s?\.|\s+Rating:|\s*$)',joined)
        if not m:continue
        if re.match(r'^(Interview|Segment)',stip,re.I):continue
        ps=parse_sentence(m.group(1))
        if not ps:continue
        sides,oc,res,tme=ps
        rest=joined[m.end():]
        rate=re.search(r'Rating:\s*(.*?)(?:\(|\[|$)',rest)
        notes=re.findall(r'\(([^)]*(?:won|retained|retains)[^)]*)\)',rest)
        ms.append({'kind':'m','stip':stip,'sides':sides,'oc':oc,'res':res,'time':tme,'rate':rating(rate.group(1)) if rate else '','notes':notes})
    return head,ms

def build_vocab(files):
    c=Counter()
    for f in files: c.update(re.findall(r'[A-Za-z]+',html.unescape(re.sub(r'<[^>]+>',' ',open(f,encoding='latin-1').read()))))
    VOCAB.update(w for w,n in c.items() if n>=3)
def page_date(v,path):
    m=re.search(r'\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b',v['head'])
    if m: return f"{m.group(3)}-{int(m.group(1)):02d}-{int(m.group(2)):02d}"
    raw=re.sub(r'<[^>]+>',' ',open(path,encoding='latin-1').read())
    m=re.search(r'\b('+'|'.join(MON)+r') (\d{1,2})(?:st|nd|rd|th)?,? (19\d\d)\b',raw)
    if m: return f"{m.group(3)}-{MON[m.group(1)]:02d}-{int(m.group(2)):02d}"
    m=re.search(r'\b(\d{1,2})/(\d{1,2})/(19\d\d)\b',raw)
    if m: return f"{m.group(3)}-{int(m.group(1)):02d}-{int(m.group(2)):02d}"
    m=re.search(r'\b(19\d\d)-(\d\d)-(\d\d)\b',raw)
    return m.group(0) if m else None
def head_meta(h):
    """USWA heads: "Memphis, TN 09.03.1990 Grave Consequences" or "Championship TV 2.16.1991 S2_E7"."""
    m=re.search(r'\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b',h)
    if not m: return None
    a=h[:m.start()].strip(' ,-');b=h[m.end():].strip(' ,-')
    b=re.sub(r'\bS(\d+)_?E(\d+)\b',r'S\1 E\2',b,flags=re.I)
    if re.search(r',\s*[A-Z][a-zA-Z]\b',a):
        city=re.sub(r',\s*',', ',a);city=re.sub(r', (Ky|In)$',lambda x:', '+x.group(1).upper(),city).replace('Lousiville','Louisville')
        return city,b.strip('"') or 'House show'
    return '',(a+(' · '+b if b else '')).replace('Championshop','Championship')
def label_meta(label):
    """Archive index labels on the site: "Macon, GA · Macon Coliseum · 7.1" or "WCW Pro taping · East Rutherford, NJ · Meadowlands · 7.3"."""
    parts=[x for x in label.split(' · ') if not re.fullmatch(r'\d{1,2}\.\d{1,2}(\.\d{4})?',x)]
    if parts and re.search(r',\s*[A-Z]{2}$',parts[0]): return parts[0],'House show'
    # "WCW Pro taping · East Rutherford, NJ · Meadowlands · 7.3": the show, then its city
    if len(parts)>1 and re.search(r',\s*[A-Z]{2}$',parts[1]): return parts[1],parts[0]
    return '',' · '.join(parts)
def title_of(x):
    st=x['stip']
    st=re.sub(r'\s*Match$','',st) if False else st
    if x['kind']=='br':
        body=' & '.join(x['winners'])+' vs. '+', '.join(x['others'])
    else:
        body=' vs. '.join(x['sides'])
    return (st+': ' if st else '')+body
def result_of(x):
    if x['kind']=='br': return ' & '.join(x['winners'])+' won the '+x['what'][0].lower()+x['what'][1:]
    r=x['res'];r=r[0].upper()+r[1:] if r else r
    if x['time']: r+=', '+x['time']
    if x['notes']: r+='. '+' '.join(n.rstrip('.')+'.' for n in x['notes'])
    return r
def main():
  pass

def site():
    js=r"""const fs=require('fs'),vm=require('vm'),path=require('path');const R=process.argv[1];
const ctx={P:{},E:[],ARTICLES:{},CONTRACTS:{},FINANCE:{},SITES:{},BANNER_SVG:{},console};vm.createContext(ctx);
for(const f of fs.readdirSync(path.join(R,'data')))if(f.endsWith('.js')&&f!=='history.js')vm.runInContext(fs.readFileSync(path.join(R,'data',f),'utf8').replace(/^const (\w+)\s*=/mg,'globalThis.$1 ='),ctx);
const lab={};for(const k in ctx.SITES)for(const g of ctx.SITES[k].arch||[])for(const [l,c] of g[1])lab[k+':'+c]=l;
console.log(JSON.stringify({E:ctx.E.map(e=>({p:e.p,d:e.d,link:e.link||'',city:e.city||'',type:e.type||'',n:(e.m||[]).length})),lab}));"""
    return json.loads(subprocess.run(['node','-e',js,ROOT],capture_output=True,text=True,check=True).stdout)
def main():
    S=site();E=S['E']
    first={};[first.__setitem__(e['p'],min(first.get(e['p'],'9'),e['d'])) for e in E]
    linked={(e['p'],e['link']):e for e in E if e['link']}
    dated={(e['p'],e['d']) for e in E}
    files=[]
    for repo in sorted(os.listdir(BASE)):
        if repo not in REPO2P: continue
        for f in sorted(glob.glob(f'{BASE}/{repo}/**/*.HTM',recursive=True)):
            bn=os.path.basename(f)[:-4]
            if re.match(r'(FIN\d|WELCOME|TITLES)',bn,re.I) or bn.startswith('WWF_AAW_'): continue   # highlight pages, indexes, pages the site made
            if bn.startswith('WCW_') and repo!='wcw1': continue                                     # copies of WCW pages in other archives
            files.append((repo,bn,f))
    build_vocab([f for _,_,f in files])
    ev=[];seen=set();why=Counter()
    for repo,bn,f in files:
        p=REPO2P[repo];head,ms=page(f);v={'head':head,'file':bn}
        if not ms: continue
        card=linked.get((p,bn))
        if bn in FIX: d,city,typ=FIX[bn]
        else:
            d=page_date(v,f)
            hm=head_meta(head) if p=='uswa' else None
            city,typ=hm if hm else (label_meta(S['lab'][p+':'+bn]) if p+':'+bn in S['lab'] else ('',head))
        if card and not card['n']:                       # the site has the card but lists no matches on it
            d,city,typ=card['d'],card['city'],card['type']; why['card with no matches']+=1
        elif d and d<first.get(p,'0') and (p,d) not in dated:
            why['before the site cards begin']+=1        # (a card may still link it by mistake: WCW Pro taping, 7/3)
        else:
            if not d and not card: why['no date']+=1
            continue
        rows=[]
        for x in ms:
            k=(p,tuple(sorted(x.get('sides') or x.get('winners')+x.get('others'))),x.get('time'),x.get('rate'))
            if k in seen: continue                       # the same match on two pages (TV replays)
            seen.add(k)
            row=[title_of(x),result_of(x),x['rate'],x['oc'] if x['kind']=='m' else 0]
            if x['kind']=='br': row.append((x['stip'].split(' · ')[0] if x['stip'] else x['what'])+' (won by '+' & '.join(x['winners'])+')')
            rows.append(row)
        if not rows: continue
        e={'d':d,'p':p}
        if city: e['city']=city
        e['type']=typ;e['link']=bn;e['hist']=1;e['m']=rows
        ev.append(e)
    ev.sort(key=lambda e:(e['d'],e['p'],e['link']))
    head=open(os.path.join(ROOT,'data','history.js')).read().split('const HIST = [')[0]
    with open(os.path.join(ROOT,'data','history.js'),'w') as o:
        o.write(head+'const HIST = [\n'+',\n'.join(json.dumps(e,ensure_ascii=False,separators=(', ',': ')) for e in ev)+'\n];\n')
    by=Counter(e['p'] for e in ev)
    print(len(ev),'shows',sum(len(e['m']) for e in ev),'matches',dict(by),dict(why))
if __name__=='__main__': main()

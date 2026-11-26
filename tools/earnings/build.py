#!/usr/bin/env python3
"""Builds the running talent-earnings tracker.
   python3 tools/earnings/build.py [WORLD_DATE]
Writes data/earnings.js (the website) and tools/earnings/earnings.md (for the project ledger).
Show participants, bonuses and tours live in shows.py; pay rates come from CONTRACTS in data/*.js."""
import json,sys,os,subprocess
HERE=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.join(HERE,'..','..')
sys.path.insert(0,HERE); import shows as S
dump=json.loads(subprocess.check_output(['node',os.path.join(HERE,'dump.js')]))
WORLD=sys.argv[1] if len(sys.argv)>1 else dump['world']; C=dump['contracts']
day=int(WORLD[8:10]) if WORLD[:7]==S.MONTH else (S.DAYS_IN_MONTH if WORLD[:7]>S.MONTH else 0)
ALIAS={"El Hijo Del Santo":"El Hijo del Santo","Abdullah The Butcher":"Abdullah the Butcher","Sting 1992":"Sting",
 "The Blue Blazer":"Owen Hart","El Gran Hamada":"Gran Hamada","Mike Rotunda":"Irwin R. Schyster",
 "Rayo De Jalisco Jr":"Rayo de Jalisco Jr.","Brazo De Oro":"Brazo de Oro","Brazo De Plata":"Brazo de Plata",
 "Pierroth Jr":"Pierroth Jr.","Espectro Jr":"Espectro Jr."}
PN={"wcw":"WCW","wwf":"WWF","uswa":"USWA","pp":"Power Pro","ajpw":"AJPW","njpw":"NJPW","cmll":"CMLL","asw":"ASW","twa":"TWA","fmw":"FMW"}
ROLE={"M":"Manager","S":"Staff"}
people={}
def get(n,k,tier="A"):
  n=ALIAS.get(n,n); p=people.setdefault(n,{"name":n,"promos":set(),"role":None,"salary":0.0,"shows":0.0,"bonus":0.0,"due":0.0,"apps":0,"lines":[]})
  p["promos"].add(k); p["role"]=p["role"] or ROLE.get(tier,"Wrestler"); return p
tier={(k,r[1]):r[0] for k,c in C.items() for r in c['rows']}
rate={k:{r[1]:r[2] for r in c['rows']} for k,c in C.items()}
for k in ("wwf","wcw"):
  for t,n,r,note in C[k]['rows']:
    if t=="O": continue
    end=getattr(S,'SALARY_END',{}).get(k,{}).get(n)   # (last day, why) when the salary stopped mid-month
    last=(int(end[0][8:10]) if end[0][:7]==S.MONTH else (S.DAYS_IN_MONTH if end[0][:7]>S.MONTH else 0)) if end else day
    d=max(0,min(day,last)-S.SALARY_START.get(n,1)+1); amt=r*d/S.DAYS_IN_MONTH
    p=get(n,k,t); p["salary"]+=amt
    if end and last<day: what,dd="Salary: ${:,} a month × {} of {} days, to {}/{} ({})".format(r,d,S.DAYS_IN_MONTH,int(end[0][5:7]),last,end[1]),end[0]
    else: what,dd="Salary to date: ${:,} a month × {} of {} days".format(r,d,S.DAYS_IN_MONTH),WORLD
    p["lines"].append(dict(p=k,d=dd,what=what,amt=round(amt,2),kind="salary"))
for k,who in getattr(S,'SALARY_ENDED',{}).items():   # left mid-month: paid to the last day, not past it
  for n,g in who.items():
    last=g['last']; dd=int(last[8:10]) if last[:7]==S.MONTH else 0
    d=max(0,min(day,dd)-S.SALARY_START.get(n,1)+1); amt=g['rate']*d/S.DAYS_IN_MONTH
    if not d: continue
    p=get(n,k,g.get('tier','C')); p["salary"]+=amt
    p["lines"].append(dict(p=k,d=min(WORLD,last),what="Salary: ${:,} a month × {} of {} days, to {}/{} ({})".format(g['rate'],d,S.DAYS_IN_MONTH,int(last[5:7]),dd,g['why']),amt=round(amt,2),kind="salary"))
for k,d,lab,m in S.BONUSES:
  for n,v in m.items():
    p=get(n,k,tier.get((k,n),"A")); p["bonus"]+=v; p["lines"].append(dict(p=k,d=d,what=lab,amt=v,kind="bonus"))
from datetime import date as _D
_dd=lambda s:_D(int(s[:4]),int(s[5:7]),int(s[8:10]))
from datetime import timedelta as _TD0
for k,(st,d,lab) in S.TOURS.items():
  span=(_dd(d)-_dd(st)).days+1; done=max(0,min(span,(_dd(WORLD)-_dd(st)).days+1))
  for t,n,r,note in C[k]['rows']:
    if t=="O" or n in S.PER_NIGHT.get(k,{}): continue
    md=getattr(S,'MONTHLY_DEALS',{}).get(k,{}).get(n); dn=done
    if md:   # on a monthly deal from md['start']: the tour fee counts only up to the day before, and nothing more is owed
      r=md['tour_rate']; dn=min(done,max(0,(_dd(md['start'])-_dd(st)).days))
    p=get(n,k,t); earned=r*dn/span; left=0 if md else r-earned
    if earned:
      p["shows"]+=earned
      lbl=lab+(" to {}/{}, before his monthly deal: ${:,} × {} of {} tour days".format(int(md['start'][5:7]),int(md['start'][8:10])-1,r,dn,span) if md else " earned to date: ${:,} × {} of {} tour days".format(r,dn,span))
      p["lines"].append(dict(p=k,d=min(WORLD,d,(_dd(md['start'])-_TD0(days=1)).isoformat() if md else d),what=lbl,amt=round(earned,2),kind="tour"))
    if left>0.005:
      p["due"]+=left
      p["lines"].append(dict(p=k,d=d,what=lab+" still to earn ({} tour days left)".format(span-dn),amt=round(left,2),kind="due"))
for k,who in getattr(S,'MONTHLY_DEALS',{}).items():
  for n,g in who.items():
    a=_dd(g['start']); m0=_dd(S.MONTH+"-01")
    if a<m0: a=m0
    d=max(0,day-a.day+1) if g['start'][:7]<=S.MONTH else 0
    if not d: continue
    p=get(n,k,tier.get((k,n),"A"))
    for amt,what in ((g['month']*d/S.DAYS_IN_MONTH,"Salary from {}/{}: ${:,} a month × {} of {} days ({})".format(a.month,a.day,g['month'],d,S.DAYS_IN_MONTH,g['why'])),
                     (g['year_fee']/12*d/S.DAYS_IN_MONTH,"Talent fee from {}/{}: ${:,} a year (${:,.2f} a month) × {} of {} days".format(a.month,a.day,g['year_fee'],g['year_fee']/12,d,S.DAYS_IN_MONTH))):
      p["salary"]+=amt; p["lines"].append(dict(p=k,d=WORLD,what=what,amt=round(amt,2),kind="salary"))
for k,who in S.PER_NIGHT.items():
  for n,(r,nights) in who.items():
    p=get(n,k,tier.get((k,n),"A"))
    for d,lab in nights:
      p["shows"]+=r; p["apps"]+=1
      p["lines"].append(dict(p=k,d=d,what=lab+" · per appearance (${:,} a night, in place of the tour fee)".format(r),amt=r,kind="show"))
showlist=[]
for s in S.SHOWS:
  R=rate[s['p']]; RB=getattr(S,'RATE_BEFORE',{}).get(s['p'],{})
  base=lambda n:RB[n][1] if n in RB and s['d']<RB[n][0] else R[n]
  pay={n:base(n)*s['mult'] for n in s['people']}; pay.update(s.get('extra',{}))
  cut={}
  for pct,names in s.get('main',[])+s.get('semi',[]):
    for n in names: cut[n]=cut.get(n,0)+s['gate']*pct/len(names)
  tot=0
  for n,v in pay.items():
    c=cut.get(n,0); amt=v+c; tot+=amt
    p=get(n,s['p'],tier.get((s['p'],n),"F")); p["shows"]+=amt; p["apps"]+=1
    lab=("{}× base (${:,})".format(s['mult'],base(n)) if n in R else s.get("extra_label","enhancement fee"))+(" + ${:,.2f} gate cut".format(c) if c else "")
    p["lines"].append(dict(p=s['p'],d=s['d'],what=s['show']+" · "+lab,amt=round(amt,2),kind="show"))
  showlist.append(dict(p=s['p'],d=s['d'],show=s['show'],n=len(pay),total=round(tot,2),logged=s['logged']))
# ---- Weekly guarantees (S.GUARANTEES): top a week's pay up to the floor once the week is over ----
from datetime import timedelta as _TD
for k,who in getattr(S,'GUARANTEES',{}).items():
  for n,g in who.items():
    p=get(ALIAS.get(n,n),k,tier.get((k,n),"A")); mon=_dd(g['start'])-_TD(days=_dd(g['start']).weekday())
    while True:
      sun=mon+_TD(days=6); a,b=mon.isoformat(),sun.isoformat()
      if b>=WORLD: break                                   # this week isn't over yet
      if b[:7]==S.MONTH and b>=g['start']:
        before=sum(1 for s in S.SHOWS if s['p']==k and g['start']<=s['d']<a and n in s['people'])
        if before>=g['cards']: break                       # the guaranteed cards are used up
        wk=sum(l['amt'] for l in p['lines'] if l['p']==k and l['kind']=='show' and a<=l['d']<=b)+g.get('carry',{}).get(b,0)
        top=round(max(0,g['week']-wk),2)
        if top:
          p["shows"]+=top
          p["lines"].append(dict(p=k,d=b,what="Weekly guarantee, week of {}/{}–{}/{}: ${:,.0f} in show pay, topped up to ${:,}".format(mon.month,mon.day,sun.month,sun.day,wk,g['week']),amt=top,kind="guarantee"))
      mon+=_TD(days=7)
# ---- Lifetime (career) earnings ----
# tools/earnings/lifetime.json keeps each finished month's final totals per person and promotion.
# A month is closed automatically the first time this runs with a world date past the end of it
# (S.MONTH still set to that month), so career totals keep adding up as the clock advances.
LIFE_PATH=os.path.join(HERE,'lifetime.json')
try: LIFE=json.load(open(LIFE_PATH))
except FileNotFoundError: LIFE={"first":S.MONTH,"months":{}}
def by_promo(p):
  b={}
  for l in p["lines"]:
    if l["kind"]!="due": b[l["p"]]=round(b.get(l["p"],0)+l["amt"],2)
  return b
if WORLD[:7]>S.MONTH:   # this month is over: file its final totals
  LIFE["months"][S.MONTH]={p["name"]:by_promo(p) for p in people.values() if by_promo(p)}
  json.dump(LIFE,open(LIFE_PATH,'w'),ensure_ascii=False,indent=1,sort_keys=True)
closed={m:v for m,v in LIFE["months"].items() if m!=S.MONTH}
lifeBy={}
for m,v in closed.items():
  for n,b in v.items():
    d=lifeBy.setdefault(n,{})
    for k,a in b.items(): d[k]=round(d.get(k,0)+a,2)
for n in {n for v in closed.values() for n in v}:   # people paid in earlier months but not this one
  if n not in people: people[n]={"name":n,"promos":set(lifeBy[n]),"role":"Wrestler","salary":0.0,"shows":0.0,"bonus":0.0,"due":0.0,"apps":0,"lines":[]}
out=[]
for p in people.values():
  e=p["salary"]+p["shows"]+p["bonus"]
  lb=dict(lifeBy.get(p["name"],{}))
  for k,a in by_promo(p).items(): lb[k]=round(lb.get(k,0)+a,2)
  life=round(sum(lb.values()),2)
  if e==0 and p["due"]==0 and life==0: continue
  out.append(dict(name=p["name"],role=p["role"],promos=[k for k in PN if k in p["promos"]],salary=round(p["salary"],2),
    shows=round(p["shows"],2),apps=p["apps"],bonus=round(p["bonus"],2),earned=round(e,2),due=round(p["due"],2),
    proj=round(e+p["due"],2),life=life,lifeBy={k:lb[k] for k in PN if k in lb},
    lines=sorted(p["lines"],key=lambda l:(l["d"],l["p"]))))
out.sort(key=lambda x:(-x["earned"],-x["proj"],x["name"]))
import calendar as _cal
_mn=lambda m:_cal.month_name[int(m[5:7])]+" "+m[:4]
data=dict(month=_mn(S.MONTH),lifeFrom=_mn(LIFE.get("first",S.MONTH)),lifeMonths=sorted(set(closed)|{S.MONTH}),world=WORLD,updated=__import__('datetime').date.today().isoformat(),people=out,shows=showlist,notes=S.NOT_ON_SCALE)
open(os.path.join(ROOT,'data','earnings.js'),'w').write("// Generated by tools/earnings/build.py. Don't edit by hand: change tools/earnings/shows.py and rebuild.\nconst EARNINGS = "+json.dumps(data,ensure_ascii=False)+";\n")
m=lambda v:"${:,.0f}".format(v)
L=["| # | Name | Promotions | Salary to date | Show pay | Bonuses | **Earned** | Tour fees due | July projected |","|---|---|---|---|---|---|---|---|---|"]
for i,x in enumerate(out,1):
  L.append("| {} | {}{} | {} | {} | {} | {} | **{}** | {} | {} |".format(i,x["name"],"" if x["role"]=="Wrestler" else " ("+x["role"].lower()+")",", ".join(PN[k] for k in x["promos"]),
    m(x["salary"]) if x["salary"] else "—", (m(x["shows"])+" ({} app.)".format(x["apps"]) if x["apps"] else m(x["shows"])) if x["shows"] else "—",
    m(x["bonus"]) if x["bonus"] else "—", m(x["earned"]), m(x["due"]) if x["due"] else "—", m(x["proj"])))
S2=["| Date | Promotion | Show | Paid | Itemized total | Ledger payroll |","|---|---|---|---|---|---|"]
for s in showlist: S2.append("| {} | {} | {} | {} | {} | {} |".format(s['d'],PN[s['p']],s['show'],s['n'],m(s['total']),m(s['logged'])))
open(os.path.join(HERE,'earnings.md'),'w').write("\n".join(L)+"\n\nSHOWS\n"+"\n".join(S2)+"\n")
tot=sum(x["earned"] for x in out); due=sum(x["due"] for x in out)
print("world",WORLD,"people",len(out),"earned",round(tot),"due",round(due))
for x in out[:12]: print(" ",x["name"],round(x["earned"]))

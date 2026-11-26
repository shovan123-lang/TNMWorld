# Per-show participants for July 1991 per-appearance promotions.
# Each show: promo, date, label, mult, gate, main=(pct, [names]), semi=(pct,[names]) list, people=[names], extra={name: flat $} for off-scale workers
NH=["Nightmare Danny Davis","Nightmare Ken Wayne"]; NK=["Brian Christopher","Tony Williams"]
SHOWS=[
 dict(p="uswa",d="1991-07-01",show="Memphis · Star Wars 1991 (PPV)",mult=3,gate=121020,logged=39424,
  main=[(0.12,["Bret Hart","Kerry Von Erich"])],
  semi=[(0.06,["Terry Funk","Kevin Von Erich","Eddie Gilbert","Jeff Jarrett"])],
  people=["El Hijo Del Santo","Scott Taylor","Mark Canterbury","Honky Tonk Man","Moondog Rex","Moondog Spot",*NH,
   "Dennis Condrey","Doug Gilbert",*NK,"Rob Zakowski","Sam Houston","Jerry Lawler","Jamie Dundee","Andre the Giant",
   "Bill Dundee","Jimmy Valiant","Chris Adams","Eric Embry","Tom Prichard","Dutch Mantell","Dirty White Boy","Rex King",
   "Sweet Daddy Falcone","Steve Austin","Brickhouse Brown","Diamond Studd","Eddie Gilbert","Terry Funk","Kevin Von Erich",
   "Ric Flair","Scott Steiner","Tully Blanchard","Stan Hansen","Dan Spivey","Robert Fuller","Jeff Jarrett","Bret Hart",
   "Kerry Von Erich","Missy Hyatt","Paul Ellering"]),
 dict(p="uswa",d="1991-07-03",show="Jonesboro · Worldwide (S1 E11)",mult=1,gate=3000,logged=2150,
  people=["Sam Houston","Mark Canterbury","Eddie Guerrero","Rob Zakowski","Kevin Von Erich","Terry Funk","Chris Adams",
   "Eric Embry","Tom Prichard","Jim Powers","Kerry Von Erich","Honky Tonk Man","Oliver Peters",*NK,"Scott Taylor",
   "Jimmy Valiant","Bill Dundee","Dirty White Boy","Rex King"],
  extra={"Jan Vang":15,"Jody Burt":15,"Johnny Rich":15}),
 dict(p="uswa",d="1991-07-06",show="Memphis · Championship Wrestling (live TV)",mult=2,gate=54000,logged=14510,
  main=[(0.10,["Kerry Von Erich","Andre the Giant"])],semi=[(0.05,["Diamond Studd","Dennis Condrey"])],
  people=["Sam Houston","Scotty Flamingo","Scott Steiner","Robert Fuller","Tully Blanchard","Diamond Studd","Dennis Condrey",
   "Missy Hyatt","Steve Austin","Paul Ellering","Jamie Dundee","Jimmy Valiant","Scott Taylor",*NK,"El Hijo Del Santo",
   "The Spellbinder","The Masked Avenger","Kerry Von Erich","Andre the Giant","Ric Flair"],
  extra={"Johnny Rich":30}),
 dict(p="uswa",d="1991-07-10",show="Evansville · Worldwide (S1 E12)",mult=1,gate=16000,logged=2320,
  people=["Scotty Flamingo","Sweet Daddy Falcone","Moondog Rex","Moondog Spot","Honky Tonk Man","Mark Canterbury",
   "Jim Powers","Rob Zakowski","Kerry Von Erich","Eddie Gilbert","Missy Hyatt","Steve Austin","Bret Hart","Bill Dundee",
   "Chris Adams","Stan Hansen","Dan Spivey"],
  extra={"Jos LeDuc":15,"Kerry Brown":15}),
 dict(p="uswa",d="1991-07-13",show="Louisville · House show",mult=2,gate=67500,logged=19615,
  main=[(0.10,["Kerry Von Erich","Bret Hart","Andre the Giant","Jamie Dundee"])],semi=[(0.05,["Steve Austin","Diamond Studd"])],
  people=["Jim Powers","Sweet Daddy Falcone","Scotty Flamingo","Scott Taylor","Sam Houston","Jeff Jarrett","Doug Gilbert",
   "Eddie Gilbert","Stan Hansen","Dan Spivey",*NK,"Ric Flair","Terry Funk","Kevin Von Erich","Scott Steiner",
   "Tully Blanchard","Dirty White Boy","Rex King","Robert Fuller",*NH,"Eric Embry","Tom Prichard","Steve Austin",
   "Diamond Studd","Kerry Von Erich","Bret Hart","Andre the Giant","Jamie Dundee","Paul Ellering","Missy Hyatt"]),
 dict(p="uswa",d="1991-07-17",show="Jonesboro · Worldwide (S1 E13)",mult=1,gate=3500,logged=1610,
  people=["Scotty Flamingo","Jim Powers","Sam Houston","Dirty White Boy","Rex King","Jerry Lawler","Eddie Guerrero",
   "The Spellbinder","Jimmy Valiant","Bill Dundee","Brickhouse Brown","Dennis Condrey","Doug Gilbert","Missy Hyatt",
   "Moondog Spot","Moondog Rex","Mark Canterbury","Honky Tonk Man","Robert Fuller"],
  extra={"Les Thornton":15,"Lino Ingram":15}),
]
BRAZOS=["Brazo De Oro","Brazo De Plata","El Brazo"]; INTO=["Jaque Mate","Masakre","Pierroth Jr"]
SHOWS+=[
 dict(p="uswa",d="1991-07-20",show="Dallas · Championship TV Special (Sportatorium)",mult=2,gate=49500,logged=0,  # no ledger payroll yet
  main=[(0.10,["Ric Flair","Terry Funk"])],semi=[(0.05,["Sam Houston","Scotty Flamingo"])],
  people=["Jamie Dundee","Jimmy Valiant","Kevin Von Erich","Eric Embry","Tom Prichard",*NH,"Dennis Condrey",
   "Scott Steiner","Tully Blanchard","Dirty White Boy","Rex King","Dan Spivey","Diamond Studd","Brickhouse Brown",
   "Doug Gilbert","Eddie Gilbert","El Hijo Del Santo","Rob Zakowski","Sam Houston","Scotty Flamingo","Ric Flair",
   "Terry Funk","Chris Adams","Kerry Von Erich","Bret Hart","Paul Ellering","Missy Hyatt"]),  # CMLL guests Volador, Ultimo Dragón, Black Magic, Pierroth Jr.: fees To establish
 dict(p="cmll",d="1991-07-05",show="Mexico City · Viernes Espectacular",mult=2,gate=189000,logged=44780,
  main=[(0.08,["Konnan","Atlantis","Rayo De Jalisco Jr","Vampiro Canadiense","Cien Caras","Universo 2000"])],
  semi=[(0.04,["Blue Panther","Kamala"])],
  people=["Toshiyo Yamada","Ultimo Dragón",*BRAZOS,*INTO,"Volador","El Hijo Del Santo","MS-1","Satánico","Chavo Guerrero",
   "Fuerza Guerrera","Eddie Guerrero","Blue Panther","Kamala","Konnan","Atlantis","Rayo De Jalisco Jr","Vampiro Canadiense",
   "Cien Caras","Universo 2000"]),
 dict(p="cmll",d="1991-07-06",show="Mexico City · Sábado de Lucha Libre",mult=1,gate=41040,logged=9650,
  people=["Toshiyo Yamada","La Diabólica","Konnan","Rayo De Jalisco Jr","Atlantis","Vampiro Canadiense","Kamala","Black Magic",
   "El Dandy","Blue Panther","MS-1","Satánico","Cien Caras","Máscara Año 2000","Eddie Guerrero","Chavo Guerrero",
   "Brazo De Oro","El Brazo","Brazo De Plata"]),
 dict(p="cmll",d="1991-07-08",show="Puebla · Monday in Puebla",mult=1,gate=7515,logged=8850,
  people=["Eddie Guerrero","Chavo Guerrero","Jaque Mate","Brazo De Oro","Brazo De Plata","Rayo De Jalisco Jr","Negro Casas",
   "Black Magic","Art Barr","Ángel Azteca","Ultimo Dragón","Volador","Blue Panther","El Dandy","MS-1","Pierroth Jr",
   "Konnan","Vampiro Canadiense"]),
 dict(p="cmll",d="1991-07-10",show="Naucalpan · Lucha Libre en Naucalpan",mult=1,gate=64800,logged=7050,
  people=["Ángel Azteca","El Hijo Del Santo","Negro Casas","Espectro Jr","Masakre","MS-1","La Diabólica","Lola González",
   "Volador","Rayo De Jalisco Jr","Silver King","Satánico","Atlantis","Black Magic","Konnan","Apolo Dantes"]),
 dict(p="cmll",d="1991-07-12",show="Mexico City · Viernes Espectacular",mult=2,gate=135000,logged=40400,
  main=[(0.08,["Vampiro Canadiense","Kamala","Konnan","Blue Panther"])],semi=[(0.04,["Eddie Guerrero","Brazo De Plata"])],
  people=["Negro Casas","Felino","Jerry Estrada","Javier Cruz","Art Barr","The Lightning Kid","Atlantis","Rayo De Jalisco Jr",
   "Ángel Azteca",*INTO,"Octagón","El Hijo Del Santo","Volador","Ultimo Dragón","Satánico","MS-1","El Dandy",
   "Eddie Guerrero","Brazo De Plata","Chavo Guerrero","Vampiro Canadiense","Kamala","Konnan",
   "Blue Panther"]),  # Cien Caras and Fuerza Guerrera were in angles only and aren't counted (matches the logged $40,400)
 dict(p="cmll",d="1991-07-13",show="Mexico City · Sábado de Lucha Libre",mult=1,gate=43200,logged=9400,
  people=["Octagón","Espectro Jr","Volador","El Hijo Del Santo","Jerry Estrada","Javier Cruz","Satánico","MS-1",
   "Blue Panther","Ultimo Dragón",*BRAZOS,"Cien Caras","Máscara Año 2000","Universo 2000",
   "Chavo Guerrero","Eddie Guerrero","Fuerza Guerrera","Kamala","Black Magic","Art Barr"]),  # El Dandy (run-in) and Masakre (watched) were angles only
 dict(p="cmll",d="1991-07-14",show="Guadalajara · Lucha Libre en Domingo",mult=1,gate=77220,logged=7100,
  people=["Felino","Silver King","Tony Arce","Vulcano","Toshiyo Yamada","Lola González","Apolo Dantes","Pierroth Jr",
   "Sangre Chicana","Blue Panther","Cien Caras","Máscara Año 2000","Universo 2000","Konnan","Atlantis","Rayo De Jalisco Jr"]),
 dict(p="cmll",d="1991-07-17",show="Acapulco · Coliseo Acapulco debut",mult=1,gate=27000,logged=7930,
  people=["Ultimo Dragón","The Lightning Kid","Atlantis","Negro Casas","Felino","Art Barr","Jerry Estrada",
   "La Diabólica","Lola González","Vulcano","Tony Arce","Cien Caras","Konnan"],
  extra={"Jushin Liger":810,"The Blue Blazer":810,"Mike Rotunda":810},extra_label="guest fee, 3% of the $27,000 gate"),
 dict(p="cmll",d="1991-07-19",show="Mexico City · Viernes Espectacular (Tercias semifinals)",mult=2,gate=209250,logged=49060,
  main=[(0.08,["Konnan","Blue Panther","Negro Casas","Vampiro Canadiense","Kamala","Black Magic"])],
  semi=[(0.04,["Sangre Chicana","Apolo Dantes","Silver King","Felino"])],
  people=["El Hijo Del Santo","Volador","Ultimo Dragón",*BRAZOS,"Pantera Sureña","Lola González",
   "Eddie Guerrero","Chavo Guerrero","Fuerza Guerrera","Atlantis","Ángel Azteca","Rayo De Jalisco Jr",
   "Octagón","The Lightning Kid","Vulcano","Masakre","Pierroth Jr","Sangre Chicana","Apolo Dantes","Silver King","Felino",
   "Konnan","Blue Panther","Negro Casas","Vampiro Canadiense","Kamala","Black Magic"],
  extra={"Rob Zakowski":50},extra_label="USWA guest, flat fee"),
 dict(p="cmll",d="1991-07-20",show="Mexico City · Sábado de Lucha Libre (Arena Coliseo)",mult=1,gate=45360,logged=0,  # no ledger payroll yet
  people=["Ángel Azteca","Jerry Estrada","Silver King","Apolo Dantes","Eddie Guerrero","Chavo Guerrero","Fuerza Guerrera",
   *BRAZOS,"La Diabólica","Pantera Sureña","Toshiyo Yamada","Lola González"]),
 dict(p="cmll",d="1991-07-21",show="Puebla · Domingo de Coliseo (Arena Puebla)",mult=1,gate=27216,logged=0,  # payroll To establish
  people=["Jerry Estrada","Javier Cruz","Tony Arce","Vulcano","The Lightning Kid","Pierroth Jr","Art Barr","Ángel Azteca",
   "Toshiyo Yamada","Lola González","Negro Casas","Felino","MS-1","Satánico","Blue Panther","El Dandy","Octagón","Masakre"]),
 dict(p="asw",d="1991-07-03",show="Southport · Holiday camp tour, Show 1",mult=1,gate=5000,logged=2070,
  people=["Tony St. Clair","El Gran Hamada","Iceman King Parsons","Giant Haystacks","Gary Albright","Dory Funk Jr.","Doc Dean",
   "Hector Guerrero","Bob Backlund","Bruce Hart","Robbie Brookside","Iron Mike Sharpe","Fit Finlay","Steve Regal"]),
 dict(p="asw",d="1991-07-06",show="Bognor Regis · Holiday camp tour, Show 2",mult=1,gate=5000,logged=2080,
  people=["Robbie Brookside","Tony St. Clair","Bob Backlund","Doc Dean","Ivan Putski","Danny Boy Collins","Dave Taylor",
   "Fit Finlay","Steve Regal","Iron Mike Sharpe","Bruce Hart","Hector Guerrero","Giant Haystacks","Johnny Saint"]),
 dict(p="asw",d="1991-07-10",show="Camber Sands · Holiday camp tour, Show 3",mult=1,gate=5000,logged=2085,
  people=["Doc Dean","Skull Murphy","Gary Albright","Ivan Putski","Johnny Saint","Steve Regal","Bob Backlund","Fit Finlay",
   "Giant Haystacks","Robbie Brookside","Big Daddy"]),
 dict(p="asw",d="1991-07-17",show="Skegness · Holiday camp tour, Show 4",mult=1,gate=5000,logged=1755,
  people=["Gary Albright","Tony St. Clair","Bruce Hart","Iceman King Parsons","Skull Murphy","Iron Mike Sharpe",
   "Steve Regal","Danny Boy Collins","Big Daddy","Robbie Brookside","Giant Haystacks","Dave Taylor"]),
 dict(p="twa",d="1991-07-19",show="Allentown, PA · Spot show",mult=1,gate=10800,logged=2875,
  people=["Austin Idol","Bob Armstrong","Buddy Landell","Chris Candido","J.T. Smith","The Nightstalker","Bunkhouse Buck",
   "Don Harris","Ron Harris","Bad News Brown","Mr. Sandman","Al Snow","Action Jackson"]),
 dict(p="pp",d="1991-07-02",show="Nashville · Power Hour",mult=1,gate=1000,logged=775,
  people=["The Lightning Kid","Judge Dread","Chris Benoit","Johnny B. Badd","Brad Armstrong","Bobby Duncum Jr.","Devon Hughes",
   "Buzz Sawyer","Mike Awesome","Lance Storm","Marcus Alexander Bagwell","Tatanka","Leatherface","Steven Dunn","Paul Bearer",
   "Chris Jericho","Bart Gunn","Bill Watts","Rocky Johnson"]),
 dict(p="fmw",d="1991-07-19",show="Sagamihara · Summer tour, Night 1",mult=1,gate=15580,logged=9950,
  people=["Eiji Ezaki","Akihito Ichihara","Rie Nakamura","Yukie Nabeno","The Shooter","Grigory Verichev",
   "Boris Gogichashvili","Koba Kurtanidze","Mark Starr","Jimmy Backlund","Combat Toyoda","Megumi Kudo",
   "Svetlana Goundarenko","Debbie Combs","Atsushi Onita","Leon Spinks","Masashi Honda","Kevin Sullivan",
   "Yukihide Ueno","The Sheik","Sabu","Mitsuhiro Matsunaga","Katsuji Ueda","Mr. Pogo","Big Titan",
   "Horace Boulder","Sambo Asako","Ricky Fuji"]),  # Tarzan Goto on tape only (NJPW Sapporo), not paid
 dict(p="fmw",d="1991-07-20",show="Konan · Summer tour, Night 2",mult=1,gate=26540,logged=0,  # no ledger payroll yet
  people=["Masashi Honda","Yukihide Ueno","Eriko Tsuchiya","Rie Nakamura","Keiko Iwami","Yukie Nabeno","The Sheik",
   "Horace Boulder","Sabu","Ricky Fuji","Big Titan","Sambo Asako","Atsushi Onita","Grigory Verichev","Tarzan Goto","Mr. Pogo"]),
]

# ---- Salaried promotions (WWF, WCW): salary accrues day by day through the world date.
MONTH = "1991-07"; DAYS_IN_MONTH = 31
SALARY_START = {"Tom Zenk": 11}   # day of the month a salary starts (signed mid-month)
# On the pay scale but gone mid-month: the salary stops on this day (the row stays in CONTRACTS).
SALARY_END = {
 "wcw": {"Sting": ("1991-07-19", "left for New Japan")},   # Sean, 2026-11-26: stop it at 7/19
}
# Monthly deals at a per-tour promotion: from `start` the wrestler is paid `month` a month plus `year_fee` a year
# (both day by day, like WWF and WCW salaries) in place of his tour fee. Before `start` the tour fee counts at
# `tour_rate` (CONTRACTS now carries the monthly figure), and the rest of that tour isn't owed.
MONTHLY_DEALS = {
 "njpw": {"Sting 1992": dict(month=25000, year_fee=10000, start="1991-07-30", tour_rate=15000,
                             why="full-time; matches his WCW salary")},   # Sean, 2026-11-26; start date 7/30 per Sean
}
# Salaries that ended mid-month (quit or released): no longer on the pay scale, paid day by day to the last day.
SALARY_ENDED = {
 "wcw": {"Kevin Sullivan": dict(rate=5000, tier="C", last="1991-07-08", why="quit after Columbus")},   # Sean, 2026-11-26
}
NOT_ON_SCALE = ["Sting (WCW, NJPW): WCW's $25,000 a month stops at 7/19, when he left. He's on his $15,000 Summer Crush tour fee to 7/29. From 7/30 New Japan pays him the same $25,000 a month plus a $10,000 a year talent fee, in place of the tour fee",
 "Kevin Sullivan (WCW): paid his $5,000 a month salary for 7/1 to 7/8, the day he quit",
 "Rob Zakowski (USWA): re-signed 7/22 at $45 an appearance (was $30) with $300 a week guaranteed for 40 cards; a week his USWA pay comes in under $300 is topped up once the week is over"]

# ---- Rate changes: shows before the date pay the old base rate (CONTRACTS has the new one).
RATE_BEFORE = {
 "uswa": {"Rob Zakowski": ("1991-07-22", 30)},   # re-signed 7/22/91 at $45 (was $30). Sean, 2026-11-26.
}

# ---- Cards that ran before the tracker's first month (lifetime.json "first", July 1991). Sean, 2026-11-26: a wrestler's
# earnings count every show they were on since the promotion's first card on its official site. build.py pays these
# cards into career totals only (this month's pay and the Finance tabs don't change). Who wrestled on each card comes
# from the Talent File engine (hist_cards.js), so the paid cards are the ones counted as Matches on the Talent File.
# Each appearance pays the wrestler's base rate (CONTRACTS, or RATE_BEFORE) × the card's class below; one appearance
# per card, however many matches. Main-event and semi-main gate cuts are paid only where the card's gate is known
# (EARLY_GATES, or a $ figure on the site's card); the main event is the card's last match, the semi-main the one before.
# Managers and announcers aren't named in the old results, so they aren't paid for these cards.
EARLY_SUPERSHOWS = {   # USWA's named specials at the Mid South Coliseum
 "Unified Title Tournament", "Grave Consequences", "Thanksgiving Thunder 1990", "Gauntlet For The Gold", "Fully Loaded",
 "International Incident", "The Three Way Dance", "Slamboree"}
def EARLY_CLASS(c):
  """(class, multiplier, main-event cut, semi-main cut) for a card before the tracker; None if the promotion isn't paid per card."""
  p, t, city, d = c["p"], c["type"], c["city"], c["d"]
  if p == "uswa":   # CONTRACTS.uswa classes
    if any(t == x or t.startswith(x + " ·") for x in EARLY_SUPERSHOWS): return ("Supershow", 3, 0.12, 0.06)
    if "Friday Night Fights" in t or "Friday Night Fights" in city: return ("Arena show", 2, 0.10, 0.05)
    if t.startswith("Championship TV") and d >= "1991-06-01": return ("Arena show", 2, 0.10, 0.05)   # live from the Mid South Coliseum from 6/1/91
    if city.split(",")[0] in ("Memphis", "Louisville") or city.startswith("Dallas"): return ("Arena show", 2, 0.10, 0.05)
    return ("TV taping / spot show", 1, 0, 0)   # studio Championship TV, Worldwide, Evansville, Jonesboro, Galveston, Nashville
  if p == "twa":    # CONTRACTS.twa classes
    if city.startswith("Philadelphia"): return ("Philadelphia home show / supercard", 1.25, 0.05, 0)
    return ("Spot show", 1, 0, 0)
  if p in ("pp", "asw", "cmll", "fmw"): return ("Card", 1, 0, 0)
  return None   # salaried (WWF, WCW) and per-tour (AJPW, NJPW) promotions aren't paid per card
EARLY_GATES = {   # gates printed on the official USWA pages (the other old pages give attendance only)
 ("uswa", "MEMPH-15"): 66573, ("uswa", "CHAMPI-5"): 45000, ("uswa", "CHAMPI-2"): 53250, ("uswa", "CHAMPI-1"): 78000,
 ("uswa", "FRIDAY_N"): 46000, ("uswa", "WORLDW-3"): 3200}

# ---- Weekly guarantees: the promotion tops a wrestler's pay up to `week` for every pay week (Monday to Sunday)
# from `start`, until `cards` appearances are used. A week counts once the world date is past its Sunday,
# and is paid in the month its Sunday falls in. `carry`: {"YYYY-MM-DD" (that Sunday): $} for show pay that
# week already earned in the month before (fill it in when a new month's SHOWS list starts).
GUARANTEES = {
 "uswa": {"Rob Zakowski": dict(week=300, start="1991-07-22", cards=40, carry={})},   # Sean, 2026-11-26
}

# ---- One-off bonuses: (promo, date, label, {name: amount})
BONUSES = [
 ("wwf","1991-07-14","WrestleFest '91 main-event bonus (5% of the $1,027,140 gate, split 2 ways)",
  {"Hulk Hogan":25678.5,"Sgt. Slaughter":25678.5}),
 ("wcw","1991-07-14","Great American Bash main-event bonus (5% of the $126,000 gate, split 2 ways)",
  {"Lex Luger":3150,"Barry Windham":3150}),
]

# ---- Japan: one fee per tour, earned day by day from the first night to the last
# (start, end, label). The part not yet earned shows as "due". Sean, 2026-11-23.
TOURS = {"ajpw":("1991-07-01","1991-07-27","Summer Action Series tour fee"),
         "njpw":("1991-07-04","1991-07-30","Summer Crush '91 tour fee")}

# ---- Tour wrestlers switched to per-appearance pay (taken out of the tour fee).
# rate per night worked; add each night once it has run.
PER_NIGHT = {
 "ajpw": {
  # Kawada gave notice 7/13; last date Okayama 7/15. Sean, 2026-11-11: paid per appearance, not the tour fee.
  # $1,000 a night = his $14,000 tour fee ÷ 14 nights. Okayama 7/15 was his last night (6 total).
  "Toshiaki Kawada": (1000, [("1991-07-03","Chiba · Night 2"),("1991-07-07","Niigata · Night 4"),
     ("1991-07-09","Kanazawa · Night 5"),("1991-07-11","Nagoya · Night 6"),("1991-07-13","Hiroshima · Night 7"),
     ("1991-07-15","Okayama · Night 8")]),
 },
}

# ---- Champions' pool (Sean, 2026-11-26): 3% of every card's gate is split evenly among the champions on that card
# (each member of a tag team counts as one). On top of all other pay, in every promotion. pool.py does the work;
# who held what comes from data/titles.js, who worked the card from SHOWS above or the card's results.
POOL = dict(pct=0.03, guests=False)   # guests=True would also pay other promotions' champions who work the card
POOL_TEAMS = {   # title-history team name -> the members the tracker pays
 "The Steiner Brothers": ["Scott Steiner", "Rick Steiner"], "Scott Steiner & Tully Blanchard": ["Scott Steiner", "Tully Blanchard"],
 "The Nasty Boys": ["Brian Knobbs", "Jerry Sags"], "The Legion of Doom": ["Road Warrior Hawk", "Road Warrior Animal"],
 "The Fabulous Freebirds": ["Michael Hayes", "Jimmy Garvin"],
 "Misawa & Kawada": ["Mitsuharu Misawa", "Toshiaki Kawada"], "Miracle Violence Connection": ["Steve Williams", "Terry Gordy"],
 "The Can-Am Express": ["Doug Furnas", "Dan Kroffat"],
 "Hase & Sasaki": ["Hiroshi Hase", "Kensuke Sasaki"], "Hirata & Hashimoto": ["Junji Hirata", "Shinya Hashimoto"],
 "Volador & El Hijo del Santo": ["Volador", "El Hijo del Santo"],
}
POOL_NAMES = {"Riki Choshu": "Riki Chōshu"}   # title-history spelling -> tracker spelling
# How a champion is named in a card's match and segment lines (promotions with no SHOWS list). Default: the full name.
# Text in brackets, like "(w/ Dan Kroffat)", doesn't count: seconds at ringside aren't working the card.
POOL_SEEN = {
 "Hulk Hogan": ["Hogan"], "Mr. Perfect": ["Perfect"],
 "Brian Knobbs": ["Nasty Boys", "Nastys", "Knobbs"], "Jerry Sags": ["Nasty Boys", "Nastys", "Sags"],
 "Road Warrior Hawk": ["Legion of Doom", "LOD", "Hawk"], "Road Warrior Animal": ["Legion of Doom", "LOD", "Animal"],
 "Sting": ["Sting"], "Lex Luger": ["Luger"], "Nikita Koloff": ["Koloff"], "Rick Rude": ["Rude"],
 "Michael Hayes": ["Freebirds", "Hayes"], "Jimmy Garvin": ["Freebirds", "Garvin"],
 "Jumbo Tsuruta": ["Jumbo", "Tsuruta"], "Mitsuharu Misawa": ["Misawa", "Super Generation"],
 "Toshiaki Kawada": ["Kawada", "Super Generation"], "Steve Williams": ["Miracle Violence", "Williams"],
 "Terry Gordy": ["Miracle Violence", "Gordy"], "Doug Furnas": ["Can-Am", "Furnas"], "Dan Kroffat": ["Can-Am", "Kroffat"],
 "Riki Chōshu": ["Chōshu", "Choshu"], "Hiroshi Hase": ["Hase"], "Kensuke Sasaki": ["Sasaki"],
 "Junji Hirata": ["Hirata"], "Shinya Hashimoto": ["Hashimoto"], "Jushin Liger": ["Liger"],
}
# Corrections to who was on a card: (promo, date): {"out": {name: why}, "in": {name: why}}
POOL_FIX = {
 ("wcw", "1991-07-20"): {"out": {"Rick Rude": "on tape only; he was on his way to All Japan's Sapporo card"}},
}

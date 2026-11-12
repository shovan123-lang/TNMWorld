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
]
BRAZOS=["Brazo De Oro","Brazo De Plata","El Brazo"]; INTO=["Jaque Mate","Masakre","Pierroth Jr"]
SHOWS+=[
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
 dict(p="asw",d="1991-07-03",show="Southport · Holiday camp tour, Show 1",mult=1,gate=5000,logged=2070,
  people=["Tony St. Clair","El Gran Hamada","Iceman King Parsons","Giant Haystacks","Gary Albright","Dory Funk Jr.","Doc Dean",
   "Hector Guerrero","Bob Backlund","Bruce Hart","Robbie Brookside","Iron Mike Sharpe","Fit Finlay","Steve Regal"]),
 dict(p="asw",d="1991-07-06",show="Bognor Regis · Holiday camp tour, Show 2",mult=1,gate=5000,logged=2080,
  people=["Robbie Brookside","Tony St. Clair","Bob Backlund","Doc Dean","Ivan Putski","Danny Boy Collins","Dave Taylor",
   "Fit Finlay","Steve Regal","Iron Mike Sharpe","Bruce Hart","Hector Guerrero","Giant Haystacks","Johnny Saint"]),
 dict(p="asw",d="1991-07-10",show="Camber Sands · Holiday camp tour, Show 3",mult=1,gate=5000,logged=2085,
  people=["Doc Dean","Skull Murphy","Gary Albright","Ivan Putski","Johnny Saint","Steve Regal","Bob Backlund","Fit Finlay",
   "Giant Haystacks","Robbie Brookside","Big Daddy"]),
 dict(p="twa",d="1991-07-19",show="Allentown, PA · Spot show",mult=1,gate=10800,logged=2875,
  people=["Austin Idol","Bob Armstrong","Buddy Landell","Chris Candido","J.T. Smith","The Nightstalker","Bunkhouse Buck",
   "Don Harris","Ron Harris","Bad News Brown","Mr. Sandman","Al Snow","Action Jackson"]),
 dict(p="pp",d="1991-07-28",show="Nashville · Power Hour",mult=1,gate=1000,logged=775,
  people=["The Lightning Kid","Judge Dread","Chris Benoit","Johnny B. Badd","Brad Armstrong","Bobby Duncum Jr.","Devon Hughes",
   "Buzz Sawyer","Mike Awesome","Lance Storm","Marcus Alexander Bagwell","Tatanka","Leatherface","Steven Dunn","Paul Bearer",
   "Chris Jericho","Bart Gunn","Bill Watts","Rocky Johnson"]),
]

# ---- Salaried promotions (WWF, WCW): salary accrues day by day through the world date.
MONTH = "1991-07"; DAYS_IN_MONTH = 31
SALARY_START = {"Tom Zenk": 11}   # day of the month a salary starts (signed mid-month)
NOT_ON_SCALE = ["Kevin Sullivan (WCW): worked 7/5, 7/6 and 7/8 but quit 7/8 and isn't on the pay scale, so he isn't paid here"]

# ---- One-off bonuses: (promo, date, label, {name: amount})
BONUSES = [
 ("wwf","1991-07-14","WrestleFest '91 main-event bonus (5% of the $1,027,140 gate, split 2 ways)",
  {"Hulk Hogan":25678.5,"Sgt. Slaughter":25678.5}),
]

# ---- Japan: one fee per tour, paid on the last night. Listed as "due" until that date has run.
TOURS = {"ajpw":("1991-07-27","Summer Action Series tour fee"),
         "njpw":("1991-07-30","Summer Crush '91 tour fee")}

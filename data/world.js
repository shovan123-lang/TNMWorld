/* TNM World Wrestling Report: world-wide data (world date, ticker, talent exchange, arrivals, departures). */

const WORLD_DATE = "1991-07-22";   // move this forward as the world advances

const SHARED = [["Bruise Brothers (Ron & Don Harris)", "WCW", "TWA", "Working both for now. WCW Dark Circle. Lost to Landell & Armstrong at Super Summer Sizzler '91."], ["Billy Joe Travis", "TWA", "AJPW", "On the AJPW Summer Action Series (7/5–7/27). Out of the TWA for July."], ["Bam Bam Bigelow", "TWA", "NJPW", "TWA main eventer. Signed with NJPW 7/4 and on the Summer Crush tour through 7/30. Back for TWA 8/2."], ["Rick Rude", "WCW", "AJPW", "Works both. AJPW 7/1, 7/5, 7/9, 7/11 so far. Flew back for Richmond 7/7. Greenville 7/13 and the Bash 7/14 next."], ["Abdullah the Butcher", "WCW", "AJPW", "AJPW 7/1, 7/3, 7/5, 7/9, 7/11. ⚠ Conflict: worked WCW Columbus 7/8 and AJPW Kanazawa 7/9. Pulled from the Bash."], ["Stan Hansen", "USWA", "AJPW", "Shuttles between them. Missed AJPW Niigata 7/7 while in USWA."], ["Dan Spivey", "USWA", "AJPW", "Same shuttle as Hansen. Both join Ellering's USWA stable 7/27."], ["Toshiaki Kawada", "AJPW", "USWA", "USWA deal over: wanted to re-sign, but All Japan asked for him back full-time. Turned down Ellering."], ["Eddie Guerrero", "CMLL", "USWA", "4–0 in CMLL. Not on the USWA July plan after 7/3."], ["El Hijo Del Santo", "CMLL", "USWA", "On both rosters."], ["Jushin Liger", "WCW", "NJPW", "Guest in CMLL Acapulco 7/17, so he misses NJPW Fukuoka 7/18. IWGP Junior Champion. ⚠ Worked NJPW 7/5 and 7/6 while booked in WCW Philly and Atlanta. Sumo Hall title defense vs. El Samurai (replacing the injured Pegasus Kid) depends on WCW dates."], ["Brian Pillman", "WCW", "NJPW", "⚠ Worked NJPW 7/4 and 7/6 around WCW Philly 7/5. Kept off NJPW while he has U.S. dates."], ["Mike Rotunda (IRS)", "WWF", "NJPW", "CMLL Acapulco 7/17 vs. Atlantis. ⚠ IRS in the WWF. Worked NJPW Osaka 7/6, the same night as WWF Anaheim."], ["Owen Hart (Blue Blazer)", "WWF", "NJPW", "CMLL Acapulco 7/17 as the Blazer, then WWF Richfield 7/18. ⚠ Blue Blazer in NJPW 7/4, 7/5, 7/10 around WWF Calgary 7/8 and Edmonton 7/9."], ["Sting", "WCW", "Gave notice to WCW 7/18. Going to NJPW full-time at New Japan's request: G1 Climax in August as the top babyface foreigner, building to Wrestle Kingdom (January 4, 1992, Tokyo Dome). WCW agreed. Last WCW date To establish.", "Listed in NJPW as \"Sting 1992.\" No NJPW dates."], ["El Gigante", "WCW", "NJPW", "NJPW 7/4 and 7/5, WCW Atlanta 7/6. Tight but doable."], ["Great Muta", "WCW", "NJPW", "Watch list. No NJPW dates booked."], ["Big Van Vader", "WCW", "NJPW", "On the NJPW roster. No NJPW dates booked."], ["Masanobu Fuchi", "AJPW", "(NJPW, released)", "Worked NJPW 7/4 and 7/5, then released. AJPW only."], ["Toshiyo Yamada", "CMLL", "Joshi", "Touring CMLL. 2–0, beat Ultimo Dragón and La Diabólica."], ["Black Magic", "CMLL", "ASW", "Foreign rudo in CMLL. Unused by ASW so far; keep him off July ASW Wednesdays."], ["The Lightning Kid", "CMLL", "Power Pro", "CMLL debut 7/12. Power Pro's Power Hour is 7/28."], ["Kevin Sullivan", "(free agent)", "CMLL?", "Walked out of WCW 7/8. Rumored for Arena México 7/12 but didn't appear. Negotiations with CMLL ongoing."]];

// Arrivals Board (World → Arrivals), April 1991 to January 1992. [date, where, wrestler, kind, notes, 1 if on a roster in this world, export file if one is built].
// kind: "debut" (career debut: build an export), "arrival" (new promotion: hire or move the export), "gimmick" (new gimmick or return: update the export).
// In-world arrivals come from each promotion's own `arrivals` list, if it has one.
const ARRIVALS = [["4/16/91", "WWF", "Beverly Brothers (Beau & Blake)", "gimmick", "Tryout as the Destruction Crew at a Challenge taping in Cedar Rapids. Repackaged as the Beverlys in May. In this world they're on the WWF roster.", 1, ""], ["April '91", "NJPW", "Osamu Nishimura", "debut", "Career debut out of the NJPW dojo.", 0, ""], ["5/5/91", "FMW", "Eiji Ezaki", "debut", "FMW debut out of the FMW dojo. Future Hayabusa.", 1, "FMW 1991.tnm"], ["5/13/91", "WCW", "Steve Austin", "arrival", "WCW debut vs. Chuck Coates, Fayetteville. In this world he stayed with the USWA.", 1, ""], ["5/19/91", "WCW", "Oz (Kevin Nash)", "gimmick", "Gimmick debut at SuperBrawl, with the Great Wizard. In this world he's on the WCW roster as Ozz.", 1, ""], ["5/19/91", "WCW", "Johnny B. Badd", "arrival", "TV debut at SuperBrawl. In this world he's on USWA's Power Pro roster.", 1, ""], ["5/28/91", "WWF", "Sid Justice", "arrival", "Untelevised debut at a Superstars taping in Tucson. Vignettes from June. In this world he's in the WWF with Harvey Wippleman.", 1, ""], ["6/18/91", "WWF", "Mike Stone (Michael Modest)", "arrival", "WWF TV taping as Mike Stone, in his first year. In this world he's on USWA's Power Pro roster.", 1, ""], ["6/22/91", "FMW", "Masashi Honda", "debut", "FMW debut vs. Akihito Ichihara. Future Mr. Gannosuke.", 1, "FMW 1991.tnm"], ["8/1/91", "Shoot", "Mitsuya Nagai", "debut", "RINGS debut vs. Herman Renting.", 0, ""], ["8/4/91", "Joshi", "Mizuki Endo", "debut", "LLPW debut.", 0, ""], ["9/5/91", "WCW", "Bill Kazmaier", "arrival", "Arrival. \"World's Strongest Man.\"", 0, "Bill Kazmaier.tnm"], ["9/9/91", "WWF", "Scott Taylor", "debut", "Career debut. In this world he's already in the USWA.", 1, ""], ["Sept '91", "WCW", "Van Hammer", "debut", "Career debut. Heavy-metal rocker.", 0, ""], ["9/20/91", "Japan", "Masayoshi Motegi", "debut", "Career debut. W*ING junior.", 0, ""], ["10/4/91", "Joshi", "Kumiko Maekawa", "debut", "AJW debut. Karate background.", 0, ""], ["10/4/91", "Joshi", "Chikako Shiratori", "debut", "AJW debut.", 0, ""], ["10/21/91", "WWF", "Chris Chavis (Tatanka)", "arrival", "Vignettes first. TV in Feb '92. Also on USWA's Power Pro roster.", 1, ""], ["11/5/91", "WCW", "Marcus Alexander Bagwell", "arrival", "Young babyface. Also on USWA's Power Pro roster.", 1, ""], ["11/10/91", "Indies", "Rick Michaels", "debut", "Georgia.", 0, ""], ["11/10/91", "Indies", "Stevie Richards", "debut", "Philadelphia (date disputed).", 0, ""], ["11/11/91", "WWF", "Chris Walker", "arrival", "Jumps from GWF.", 0, ""], ["11/18/91", "CMLL", "Rey Bucanero Jr.", "debut", "Age 17, nephew of Pirata Morgan.", 0, "Rey Bucanero Jr 1991.tnm"], ["11/20/91", "Indies", "Glenn Gilbertti", "debut", "Career debut. Worked a Power Pro card in this world but isn't on the roster now.", 0, ""], ["Late '91", "WWF", "Repo Man", "gimmick", "Gimmick debut for Barry Darsow, after his last match as Demolition Smash (8/24). In this world he's still Smash in Demolition.", 1, ""], ["12/1/91", "WWF", "Owen Hart", "gimmick", "Return to the WWF. In this world he's already in the WWF, and works NJPW and CMLL too.", 1, ""], ["12/2/91", "WWF", "Brian Lee", "arrival", "Arrival.", 0, ""], ["12/7/91", "Shoot", "Volk Han", "debut", "RINGS debut vs. Akira Maeda.", 0, ""], ["12/7/91", "Shoot", "Hans Nijman", "debut", "RINGS, karate bout.", 0, ""], ["12/22/91", "Shoot", "Hiromitsu Kanehara", "debut", "UWF-i, vs. Masakazu Maeda.", 0, ""], ["12/22/91", "Shoot", "Masakazu Maeda", "debut", "UWF-i.", 0, ""], ["1991", "Indies", "Little Guido", "debut", "NJ. Shoot-style base.", 0, ""], ["1991", "Europe", "Alex Wright", "debut", "CWA, age 16. Son of Steve Wright.", 0, ""], ["1991", "Joshi", "Rie Tamada", "debut", "AJW class of '91.", 0, ""], ["1/11/92", "Joshi", "Michiko Omukai", "debut", "AJW. Delayed by injury.", 0, ""]];

// Departures Board (World → Departures). Retirements first (so exports can be retired), then deaths (for tribute shows), then other exits.
// RETIREMENTS: [date, where, wrestler, "Retired" or "Stepped away", notes, 1 if on a roster in this world]. July–December 1991.
const RETIREMENTS = [["Aug '91", "WCW", "Nikita Koloff", "Stepped away", "Left WCW to run his gym in Concord, NC. In this world he's WCW World Champion and has called it his last ride.", 1], ["8/26/91", "WWF", "Mr. Perfect", "Stepped away", "Back injury after losing the IC Title to Bret Hart at SummerSlam. Out of the ring for over a year; a Superstars commentator from November. In this world he's still IC Champion.", 1], ["12/6/91", "AJPW", "Dynamite Kid", "Retired", "Last night of the Real World Tag League at Budokan, announced that day. He and Johnny Smith beat Johnny Ace & Sunny Beach. In this world he's still a British Bulldog in All Japan.", 1], ["12/22/91", "Joshi", "Itsuki Yamazaki", "Retired", "Jumping Bomb Angel. Left JWP over its money troubles and to marry.", 0]];
// RETIRED_1991: retired in 1991, month not found. [where, wrestler, notes, on a roster]. RETIRED_1991_OTHERS: names only.
const RETIRED_1991 = [["PPW", "Rocky Johnson", "Retired from the ring and went on to train his son Dwayne. In this world he's head trainer at the USWA Wrestling Academy and still wrestles.", 1], ["PPW", "Ron Bass", "Retired from regular competition after a run of injuries. In this world he's an Academy trainer who still wrestles.", 1], ["PPW", "Buzz Sawyer", "Left WCW after a few California dates and worked the independents until his death (2/7/92). In this world he's an Academy trainer who still wrestles.", 1], ["WCW", "Harley Race", "Retired from the ring and stayed on as a manager. His last match was on the AWA's final TV taping. He's in the WCW and NJPW files here.", 1], ["UK", "Mark Rocco", "A heart condition ended his career; last match in January. He's in OldSchoolBrits.EXP.tnm.", 0], ["Memphis", "Tojo Yamamoto", "Retired in failing health. Died 2/19/92.", 0]];
const RETIRED_1991_OTHERS = ["Angelo Poffo", "Smith Hart", "Trudy Adams", "S. D. Jones", "Bugsy McGraw", "Bobby Jaggers", "Cody Michaels", "Dennis Stamp", "Donna Christanello", "Lady Blossom", "Joyce Grable", "Mike George", "Hirofumi Miura"];
// DEATHS: [date, name, notes, on a roster]. July–December 1991. DEATHS_NEXT: early 1992, so tributes can be planned ahead.
const DEATHS = [["7/6/91", "Mr. Moto", "Japanese-American heel of the 1950s and '60s.", 0], ["8/15/91", "Tank Morgan", "", 0], ["8/25/91", "Vivian Vachon", "Of the Vachon family, sister of Mad Dog and the Butcher. Former AWA Women's Champion.", 0], ["8/27/91", "Martín Karadagian", "Argentina's biggest wrestling star; created Titanes en el Ring.", 0], ["9/12/91", "Chris Von Erich", "Youngest of the Von Erich brothers, 21. Last match 3/31/91 for the WCWA. A Dallas tribute fits the USWA.", 0], ["9/30/91", "King Levinsky", "Heavyweight boxer who also wrestled.", 0], ["10/27/91", "Rocky Hata", "Japanese wrestler, 43.", 0], ["10/31/91", "Gene Anderson", "Minnesota Wrecking Crew with Ole; later a manager. Arn Anderson's on-screen uncle.", 0], ["11/9/91", "Abe Yourist", "Russian-born, b. 1909.", 0], ["11/10/91", "Dick the Bruiser", "Brawler, and owner and star of the WWA in Indianapolis.", 0], ["11/12/91", "Ripper Collins", "Loudmouth heel, a star in Hawaii.", 0], ["11/20/91", "Frank Sexton", "Boston AWA world champion in the 1940s.", 0], ["12/25/91", "Wilbur Snyder", "Dick the Bruiser's partner in the ring and in the Indianapolis office. Died six weeks after him.", 0]];
const DEATHS_NEXT = [["2/7/92", "Buzz Sawyer", "Died at 32. On Power Pro's roster in this world (Academy trainer).", 1], ["2/19/92", "Tojo Yamamoto", "Tennessee heel since the 1950s.", 0]];
// DEPARTURES: other real-world exits July–December 1991 (firings, walkouts, jumps). [date, where, wrestler, notes].
// In-world departures come from each promotion's own `departures` list, not from here.
const DEPARTURES = [["7/1/91", "WCW", "Ric Flair", "Fired as World Champion over a contract dispute with Jim Herd. Took the Big Gold Belt and went to the WWF. In this world he quit and signed with the USWA."], ["8/24/91", "WWF", "Smash (Barry Darsow)", "Last match as Demolition Smash, a loss to Davey Boy Smith. Repackaged as Repo Man later in the year. In this world he's still in Demolition."], ["Aug '91", "WCW", "Junkyard Dog", "Left WCW for the independents, two months after losing the Six-Man Tag titles. In this world he's still on the WCW roster."], ["8/26/91", "WWF", "The Ultimate Warrior", "Fired after the SummerSlam main event over a pay dispute. Held to his contract and sat out. In this world he's out with a neck injury from WrestleFest 7/14."], ["Oct '91", "WWF", "André the Giant", "Last WWF appearances, on crutches, during the UK tour in September and October. In this world he's in the USWA with Paul Ellering."], ["Oct '91", "WWF", "Paul Roma", "Left after Power & Glory split following SummerSlam. Resurfaced as a WCW Horseman in 1993. In this world Power & Glory are still a team."], ["Oct '91", "WWF", "Ricky Steamboat", "Gave notice, then walked out of the Fort Wayne TV taping when asked to lose to the Undertaker and IRS. Pulled from Survivor Series. In this world he's out with a torn right ACL (7/5)."], ["Late '91", "Mexico", "El Hijo del Santo", "Left the Tijuana WWA and vacated its Welterweight Title. Kept working the UWA. In this world he's with CMLL and the USWA."]];

// Women on any roster. Promotion pages list them in their own section. Add new women here when they join a roster.
const WOMEN = new Set(["Miss Elizabeth", "Missy Hyatt", "La Diabólica", "Lola González", "Pantera Sureña", "Toshiyo Yamada", "Megumi Kudo", "Combat Toyoda", "Svetlana Goundarenko", "Debbie Combs", "Reggie Bennett", "Debbie Malenko", "Eriko Tsuchiya", "Yoshika Maedomari", "Keiko Iwami", "Kumiko Matsuda", "Yuki Morimatsu", "Rie Nakamura", "Yukie Nabeno"]);

// Talent File: the wrestler showcased on the front page and at #file. Change it whenever you want a new spotlight.
// "match" is a pattern that finds this wrestler in match listings (include tag-team and trio names he's part of).
// "record" is kept by hand (wins–losses–draws), because results are written as text.
const SPOTLIGHT = {"name": "Eddie Guerrero", "match": "Eddie(?! Gilbert)|Los Guerreros", "record": "7–0", "since": "1991-07-03",
 "blurb": "Unbeaten in two countries. Eddie has gone 5–0 in CMLL with his family, Chavo and Fuerza, and 2–0 on USWA's Worldwide, where he beat the Spellbinder at ****1/4 in Jonesboro. Next up: the Torneo de Tercias semifinals at Arena México on 7/19."};

// Headline ticker: newest first. The site shows at most 15, keeping every promotion's newest.
const TICKER = [
 [
  "<b>CMLL</b> Puebla: Octagón makes Masakre submit, then demands his mask; Blue Panther taps out El Dandy",
  "cmll-octagon-demands-answer-0721"
 ],
 [
  "<b>AJPW</b> Sapporo: Misawa pins Hansen and calls out MVC for Yokohama; Rude back a champion with a **** win over Furnas",
  "ajpw-misawa-pins-hansen-0721"
 ],
 [
  "<b>WCW</b> Knoxville: Windham goes 19 minutes with Vader in Sting's spot; Freebirds retain over the Killer Bees",
  "wcw-windham-takes-knoxville-0721"
 ],
 [
  "<b>WWF</b> Toronto: Perfect escapes SATO with Heenan's help as LOD retain; Animal hurt",
  "wwf-toronto-perfect-sato-0721"
 ],
 [
  "<b>WWF</b> Challenge: Martel makes Snuka submit, puts SATO on notice",
  "wwf-challenge-ep1-martel-0721"
 ],
 [
  "<b>WCW</b> Johnson City: THE FREEBIRDS are the first WCW World Tag Team Champions; Koloff announces his last ride",
  "wcw-freebirds-crowned-0720"
 ],
 [
  "<b>WWF</b> Philadelphia: LOD win the tag titles from the Nasty Boys in a 56-minute Death Match at the Spectrum",
  "wwf-lod-champions-0720"
 ],
 [
  "<b>USWA</b> Dallas: Flair steals his USWA debut from Funk with a roll-up before a Sportatorium sellout; Houston ends Flamingo's Invitational run",
  "uswa-flair-steals-debut-0720"
 ],
 [
  "<b>CMLL</b> Arena Coliseo: Diabólica cuts Yamada's hair after a five-star main event; the Guerreros patch it up before Verano",
  "cmll-diabolica-takes-trophy-0720"
 ],
 [
  "<b>FMW</b> Konan: Goto's chair hits Pogo and Onita steals the win; the Sheik turns on Sabu",
  "fmw-goto-chair-pogo-0720"
 ],
 [
  "<b>WWF</b> Superstars: Tito tops the Warlord as Heenan opens the IC challenge for SummerSlam",
  "wwf-superstars-ep2-tito-0720"
 ],
 [
  "<b>WCW</b> Pro: Tommy Rich makes Bobby Eaton submit; the TV Title final four is set",
  "wcw-rich-wildfire-pro2"
 ],
 [
  "<b>NJPW</b> Sapporo: Chono jumps Chōshu after the TV main; El Samurai gets Liger at Sumo Hall",
  "njpw-observer-sapporo-0719"
 ],
 [
  "<b>ASW</b> Sonny Beach signs with All Star on a non-exclusive deal",
  "asw-sonny-beach-signs-0719"
 ],
 [
  "<b>TWA</b> Idol wins with his feet on the ropes",
  "twa-feet-on-the-ropes"
 ]
];

FINANCE._streams = ["Merchandise", "TV rights", "Pay-per-view share", "Home video", "900 hotline", "Licensing", "Programs & magazines", "Concessions & parking", "Talent loan fees", "Sponsorships"];
/* Promotion costs: the operating model behind every Finance tab (set 2026-11-23).
   Rates are 1991 US dollars. Per show: rent and ads are a share of the gate with a floor,
   tax is a share of the gate, the rest are flat amounts per show. TV tapings add tv, PPVs add ppv.
   Monthly costs (office, tvMonthly) count day by day to the world date. tvMonthly replaces per-taping TV costs.
   ppvPrice/ppvShare: PPV buy price and the promotion's share of PPV revenue (WWF: $30, 50%, from SummerSlam 91 on). Announcers and office staff
   come from the Contracts tab (tier O). homeRent/home: rent share at the promotion's own building.
   To log a real figure for one show, add costs:{rent:12000,...} to that row in FINANCE.<key>.rows. */
FINANCE._costLabels = {talent:"Talent payroll",staff:"Announcers & office staff",rent:"Building rent",tax:"Admission & entertainment tax",event:"Ushers, security & box office",ring:"Ring crew & ring truck",ads:"Advertising & promotion",travel:"Travel & hotels",tv:"TV production",ppv:"Pay-per-view production",cogs:"Merchandise (cost of goods)",office:"Office & overhead",loan:"Talent loan fees (to the home promotion)"};
FINANCE._costs = {
 wwf:{rent:[0.15,4000],tax:0.05,event:5000,ring:3000,ads:[0.06,3000],travel:6000,tv:0,tvMonthly:300000,ppv:500000,ppvPrice:30,ppvShare:0.5,cogs:0.40,office:1200000},
 wcw:{rent:[0.15,3000],tax:0.05,event:3500,ring:2500,ads:[0.06,2000],travel:8000,tv:40000,ppv:350000,cogs:0.40,office:700000},
 uswa:{rent:[0.12,1500],tax:0.04,event:800,ring:400,ads:[0.05,500],travel:600,tv:3000,ppv:25000,cogs:0.40,office:40000},
 pp:{rent:[0.10,150],tax:0.04,event:100,ring:100,ads:[0,100],travel:0,tv:1500,cogs:0.40,office:2000},
 ajpw:{rent:[0.15,5000],tax:0.10,event:3000,ring:2000,ads:[0.05,2000],travel:12000,tv:0,cogs:0.40,office:250000},
 njpw:{rent:[0.15,5000],tax:0.10,event:3000,ring:2000,ads:[0.05,2000],travel:12000,tv:0,cogs:0.40,office:300000},
 fmw:{rent:[0.15,1500],tax:0.10,event:600,ring:500,ads:[0.05,800],travel:3000,tv:0,cogs:0.40,office:30000},
 cmll:{rent:[0.15,1000],home:"Mexico City",homeRent:[0.03,0],tax:0.08,event:1500,ring:500,ads:[0.03,500],travel:1000,tv:0,cogs:0.40,office:80000},
 asw:{rent:[0,0],tax:0,event:0,ring:300,ads:[0,0],travel:500,tv:0,cogs:0.40,office:3000},
 twa:{rent:[0.15,1000],tax:0.05,event:400,ring:400,ads:[0.05,600],travel:1200,tv:0,cogs:0.40,office:3000}
};
/* TV rights: monthly money each promotion gets from its TV partners (1991 US dollars, estimates).
   Counted day by day through the world date, all month long. */
FINANCE._tv = {
 wcw:{amt:800000,note:"TBS and TNT rights fee from Turner Broadcasting"},
 wwf:{amt:1000000,note:"USA Network rights fee plus syndicated ad sales (Superstars, Challenge)"},
 uswa:{amt:12000,note:"Memphis and regional syndication ad sales"},
 pp:{amt:0,note:"No TV deal"},
 ajpw:{amt:750000,note:"Nippon TV rights fee"},
 njpw:{amt:900000,note:"TV Asahi rights fee (World Pro Wrestling)"},
 fmw:{amt:0,note:"No TV in 1991; video sales only"},
 cmll:{amt:40000,note:"Televisa and regional TV fees"},
 asw:{amt:0,note:"Off ITV since 1988"},
 twa:{amt:0,note:"No TV deal"}
};
/* Recurring monthly revenue other than TV: counted day by day through the world date, like TV rights. */
FINANCE._recurring = [
 {p:"wcw",stream:"900 hotline",amt:12500,note:"WCW Hotline, hosted by Jim Ross ($150,000 a year)"}
];
// Front page: lead, rest of the world, backstage, breaking, booker's desk. Refreshed each time the world clock advances.
const FRONT = {"asOf":"1991-07-22","lead":{"p":"wwf","kicker":"WWF · Maple Leaf Gardens · July 21","id":"wwf-toronto-perfect-sato-0721","title":"Perfect Keeps the Gold, but SATO Steals the Show","dek":"Bobby Heenan's hand on SATO's foot saves the Intercontinental Title in Toronto, and LOD get through their first defense at a cost.","paras":["Mr. Perfect left Maple Leaf Gardens still Intercontinental Champion, and he needed Bobby Heenan to do it. SATO had him beaten until Heenan grabbed his foot on the top rope, and Perfect finished him with the Perfect-Plex at 14:03 (****1/4). The Mountie and Shane Douglas matched it at ****1/4, and the Legion of Doom kept the tag titles in their first defense when Hawk pinned Hercules of Power & Glory. Hulk Hogan pinned the Warlord in the main event after Harvey Wippleman got involved, with Sid Justice watching from the Warlord's corner.","The cost was Road Warrior Animal, who hurt his elbow and is out about a card, six days before Chicago. Sid in Wippleman's corner keeps Hogan-Sid moving toward SummerSlam, even if Hogan-Warlord went -*1/2. Toronto drew 14,200 at $18 for $255,600, plus $56,800 in merchandise, the biggest gate of the weekend, on a card that came in at **."]},"rest":[["wcw","WCW · Knoxville","wcw-windham-takes-knoxville-0721","Vader Takes the Count-Out, Windham Takes Knoxville","Barry Windham went 19 minutes with Big Van Vader on the night Sting was advertised and lost only by count-out. The Freebirds kept the tag titles in their first defense."],["ajpw","AJPW · Sapporo","ajpw-misawa-pins-hansen-0721","Misawa Puts Hansen Down, Then Calls Out the Champions","Misawa pinned Stan Hansen with the Tiger Driver and challenged MVC for Yokohama with Kobashi. Jumbo walked away without a word, and Rick Rude came back a champion."],["cmll","CMLL · Puebla","cmll-octagon-demands-answer-0721","Octagón Demands an Answer","Octagón made Masakre submit and challenged him to a mask match; Masakre left without naming his stakes. Blue Panther made El Dandy tap in a non-title semi-main."],["uswa","USWA · Dallas","uswa-flair-steals-debut-0720","The Nature Boy Steals One in Dallas","Flair rolled up Terry Funk with the tights in his USWA debut before a Sportatorium sellout, and the lucha trios stole the show at ****1/2."]],"backstage":[["wcw","WCW · Backstage","wcw-observer-knoxville-0721","The First Night Without Sting","Knoxville did 3,300 and $33,000 with no World or U.S. title match on the card. The Freebirds' first defense was a step down from Cleveland."],["wwf","WWF · Backstage","wwf-observer-toronto-0721","Two Great Matches and a Bad Main Event","Perfect-SATO and Mountie-Douglas both hit ****1/4 in Toronto. Animal's elbow is the worry with Chicago six days away."],["ajpw","AJPW · Backstage","ajpw-observer-sapporo-0721","Misawa Gets the Fall That Matters","Giving Misawa the pin on Hansen tells you who the office sees as the next man. The tour gate is $993,507 through eleven nights."],["cmll","CMLL · Backstage","cmll-observer-coliseo-0720","Five Stars at the Coliseo","The best women's match in Mexico in years, on the night five CMLL regulars were in Dallas. Yamada answered the haircut in Puebla."],["uswa","USWA · Backstage","uswa-observer-dallas-0720","The Sportatorium Sells Out","4,500 paid $49,500 and spent $3 a head on merchandise, the best per-head number of the summer. Flair has no USWA date booked yet."],["wwf","WWF · Wrestling Challenge","wwf-observer-challenge-ep1","Three Promos and a Good Main","Martel made Snuka submit, but Dino Bravo's first words on his own and Piper's Barber Shop are what the hour will be remembered for."],["fmw","FMW · Backstage","fmw-observer-konan-0720","Five Matches and a Business","Konan drew 1,100 more than Sagamihara on a five-match card. Kochi is next on 7/22."],["asw","All Star · News","asw-sonny-beach-signs-0719","Sonny Beach Signs with All Star","Sonny Beach signed a 32-card deal that leaves him free to work elsewhere. His debut date hasn't been set."]],"breaking":[["wwf-toronto-perfect-sato-0721","Animal hurt in Toronto","Road Warrior Animal hurt his elbow in LOD's first title defense and is out about a card. Chicago is 7/27."],["cmll-octagon-demands-answer-0721","Octagón wants Masakre's mask","Octagón challenged Masakre to a mask match in Puebla. Masakre walked off without saying what he'd put up."]],"desk":["<b>Animal's elbow:</b> LOD kept the tag titles in Toronto, but Animal is out about a card. Chicago 7/27 and the SummerSlam tag plans need checking.","<b>Koloff's last ride:</b> Luger gets his rematch in Nashville 7/22, with the rematch clause every town after that.","<b>Sid</b> watched Hogan beat the Warlord from Wippleman's corner. Hogan vs. Sid at SummerSlam?","<b>PN News</b> is out 50 WCW cards. Smothers covered Knoxville; his Nashville 7/22 match with Orndorff still needs a replacement.","<b>Arn & Zbyszko:</b> Paul E. made his pitch. Arn is listening; Zbyszko wants to know his cut.","<b>Octagón vs. Masakre:</b> the mask match is on the table, but Masakre's stakes are To establish.","<b>Jumbo at ringside:</b> he tripped Eigen in the Abdullah DQ in Sapporo and left Misawa without a word. MVC vs. Misawa & Kobashi in Yokohama 7/23.","<b>Blue Panther</b> made El Dandy submit non-title in Puebla. When does he get the Light Heavyweight title shot?","<b>Ric Flair</b> has no USWA date after his Dallas win, and the Texas Outlaws want him.","<b>Dennis Condrey</b> teamed with the babyface Nightmares in Dallas. Turn or mistake?","<b>Goto and Pogo:</b> Goto's chair hit his partner in Konan, and Goto works New Japan in Sendai 7/22.","<b>Verano 7/26:</b> the first CMLL World Trios title, Konnan's title vs. Vampiro's hair, and Yamada vs. Diabólica, hair vs. hair. <b>Jumbo vs. Williams</b> at Budokan 7/27; <b>Chōshu vs. Chono</b> at Sumo Hall 7/30.","<b>Sonny Beach</b> signed with All Star; debut To establish.","<b>SummerSlam vs. the Omni:</b> WWF and WCW go head to head again on 8/25."]};

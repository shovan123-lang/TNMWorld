/* TNM World Wrestling Report: world-wide data (world date, ticker, talent exchange, arrivals). */

const WORLD_DATE = "1991-07-21";   // move this forward as the world advances

const SHARED = [["Bruise Brothers (Ron & Don Harris)", "WCW", "TWA", "Working both for now. WCW Dark Circle. Lost to Landell & Armstrong at Super Summer Sizzler '91."], ["Billy Joe Travis", "TWA", "AJPW", "On the AJPW Summer Action Series (7/5–7/27). Out of the TWA for July."], ["Bam Bam Bigelow", "TWA", "NJPW", "TWA main eventer. Signed with NJPW 7/4 and on the Summer Crush tour through 7/30. Back for TWA 8/2."], ["Rick Rude", "WCW", "AJPW", "Works both. AJPW 7/1, 7/5, 7/9, 7/11 so far. Flew back for Richmond 7/7. Greenville 7/13 and the Bash 7/14 next."], ["Abdullah the Butcher", "WCW", "AJPW", "AJPW 7/1, 7/3, 7/5, 7/9, 7/11. ⚠ Conflict: worked WCW Columbus 7/8 and AJPW Kanazawa 7/9. Pulled from the Bash."], ["Stan Hansen", "USWA", "AJPW", "Shuttles between them. Missed AJPW Niigata 7/7 while in USWA."], ["Dan Spivey", "USWA", "AJPW", "Same shuttle as Hansen. Both join Ellering's USWA stable 7/27."], ["Toshiaki Kawada", "AJPW", "USWA", "USWA deal over: wanted to re-sign, but All Japan asked for him back full-time. Turned down Ellering."], ["Eddie Guerrero", "CMLL", "USWA", "4–0 in CMLL. Not on the USWA July plan after 7/3."], ["El Hijo Del Santo", "CMLL", "USWA", "On both rosters."], ["Jushin Liger", "WCW", "NJPW", "Guest in CMLL Acapulco 7/17, so he misses NJPW Fukuoka 7/18. IWGP Junior Champion. ⚠ Worked NJPW 7/5 and 7/6 while booked in WCW Philly and Atlanta. Sumo Hall title defense vs. El Samurai (replacing the injured Pegasus Kid) depends on WCW dates."], ["Brian Pillman", "WCW", "NJPW", "⚠ Worked NJPW 7/4 and 7/6 around WCW Philly 7/5. Kept off NJPW while he has U.S. dates."], ["Mike Rotunda (IRS)", "WWF", "NJPW", "CMLL Acapulco 7/17 vs. Atlantis. ⚠ IRS in the WWF. Worked NJPW Osaka 7/6, the same night as WWF Anaheim."], ["Owen Hart (Blue Blazer)", "WWF", "NJPW", "CMLL Acapulco 7/17 as the Blazer, then WWF Richfield 7/18. ⚠ Blue Blazer in NJPW 7/4, 7/5, 7/10 around WWF Calgary 7/8 and Edmonton 7/9."], ["Sting", "WCW", "Gave notice to WCW 7/18. Going to NJPW full-time at New Japan's request: G1 Climax in August as the top babyface foreigner, building to Wrestle Kingdom (January 4, 1992, Tokyo Dome). WCW agreed. Last WCW date To establish.", "Listed in NJPW as \"Sting 1992.\" No NJPW dates."], ["El Gigante", "WCW", "NJPW", "NJPW 7/4 and 7/5, WCW Atlanta 7/6. Tight but doable."], ["Great Muta", "WCW", "NJPW", "Watch list. No NJPW dates booked."], ["Big Van Vader", "WCW", "NJPW", "On the NJPW roster. No NJPW dates booked."], ["Masanobu Fuchi", "AJPW", "(NJPW, released)", "Worked NJPW 7/4 and 7/5, then released. AJPW only."], ["Toshiyo Yamada", "CMLL", "Joshi", "Touring CMLL. 2–0, beat Ultimo Dragón and La Diabólica."], ["Black Magic", "CMLL", "ASW", "Foreign rudo in CMLL. Unused by ASW so far; keep him off July ASW Wednesdays."], ["The Lightning Kid", "CMLL", "Power Pro", "CMLL debut 7/12. Power Pro's Power Hour is 7/28."], ["Kevin Sullivan", "(free agent)", "CMLL?", "Walked out of WCW 7/8. Rumored for Arena México 7/12 but didn't appear. Negotiations with CMLL ongoing."]];

const ARRIVALS = [["4/16/91", "WWF", "Beverly Brothers (Beau & Blake)", "Tryout as the Destruction Crew at a Challenge taping in Cedar Rapids. Repackaged as the Beverlys in May."], ["April '91", "NJPW", "Osamu Nishimura", "Career debut out of the NJPW dojo."], ["5/5/91", "FMW", "Eiji Ezaki", "FMW debut out of the FMW dojo. Future Hayabusa."], ["5/13/91", "WCW", "Steve Austin", "WCW debut vs. Chuck Coates, Fayetteville. In this world he stayed with the USWA."], ["5/19/91", "WCW", "Oz (Kevin Nash)", "Gimmick debut at SuperBrawl, with the Great Wizard."], ["5/19/91", "WCW", "Johnny B. Badd", "TV debut at SuperBrawl. In this world he's on USWA's Power Pro roster."], ["5/28/91", "WWF", "Sid Justice", "Untelevised debut at a Superstars taping in Tucson. Vignettes from June."], ["6/18/91", "WWF", "Mike Stone (Michael Modest)", "WWF TV taping as Mike Stone, in his first year. In this world he's on USWA's Power Pro roster."], ["6/22/91", "FMW", "Masashi Honda", "FMW debut vs. Akihito Ichihara. Future Mr. Gannosuke."], ["8/1/91", "Shoot", "Mitsuya Nagai", "RINGS debut vs. Herman Renting."], ["8/4/91", "Joshi", "Mizuki Endo", "LLPW debut."], ["9/5/91", "WCW", "Bill Kazmaier", "Arrival. \"World's Strongest Man.\""], ["9/9/91", "WWF", "Scott Taylor", "Career debut."], ["Sept '91", "WCW", "Van Hammer", "Career debut. Heavy-metal rocker."], ["9/20/91", "Japan", "Masayoshi Motegi", "Career debut. W*ING junior."], ["10/4/91", "Joshi", "Kumiko Maekawa", "AJW debut. Karate background."], ["10/4/91", "Joshi", "Chikako Shiratori", "AJW debut."], ["10/21/91", "WWF", "Chris Chavis (Tatanka)", "Vignettes first. TV in Feb '92. Also on USWA's Power Pro roster."], ["11/5/91", "WCW", "Marcus Alexander Bagwell", "Young babyface. Also on USWA's Power Pro roster."], ["11/10/91", "Indies", "Rick Michaels", "Georgia."], ["11/10/91", "Indies", "Stevie Richards", "Philadelphia (date disputed)."], ["11/11/91", "WWF", "Chris Walker", "Jumps from GWF."], ["11/18/91", "CMLL", "Rey Bucanero Jr.", "Age 17, nephew of Pirata Morgan."], ["11/20/91", "Indies", "Glenn Gilbertti", "Career debut. Also on USWA's Power Pro roster."], ["Late '91", "WWF", "Repo Man", "Gimmick debut (Barry Darsow)."], ["12/1/91", "WWF", "Owen Hart", "Return."], ["12/2/91", "WWF", "Brian Lee", "Arrival."], ["12/7/91", "Shoot", "Volk Han", "RINGS debut vs. Akira Maeda."], ["12/7/91", "Shoot", "Hans Nijman", "RINGS, karate bout."], ["12/22/91", "Shoot", "Hiromitsu Kanehara", "UWF-i, vs. Masakazu Maeda."], ["12/22/91", "Shoot", "Masakazu Maeda", "UWF-i."], ["1991", "Indies", "Little Guido", "NJ. Shoot-style base."], ["1991", "Europe", "Alex Wright", "CWA, age 16. Son of Steve Wright."], ["1991", "Joshi", "Rie Tamada", "AJW class of '91."], ["1/11/92", "Joshi", "Michiko Omukai", "AJW. Delayed by injury."]];

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
  "<b>WCW</b> Charleston, WV: RICK RUDE beats Sting for the U.S. Title (****3/4) in Sting's WCW farewell; Koloff keeps the World Title by DQ",
  "wcw-observer-charleston-0719"
 ],
 [
  "<b>AJPW</b> Fukuoka: Ogawa pins Dean Malenko (****1/4); Jumbo and MVC keep their gold in unadvertised title defenses",
  "ajpw-observer-fukuoka-0719"
 ],
 [
  "<b>NJPW</b> Sapporo: Chono jumps Chōshu after the TV main; El Samurai gets Liger at Sumo Hall",
  "njpw-observer-sapporo-0719"
 ],
 [
  "<b>WWF</b> Dayton: Martel steals one from SATO (****1/4); Sid powerbombs Boss Man after the DQ",
  "wwf-observer-dayton-0719"
 ],
 [
  "<b>WWF</b> Marty Jannetty re-signs after Dayton",
  "wwf-jannetty-resigns-0719"
 ],
 [
  "<b>ASW</b> Sonny Beach signs with All Star on a non-exclusive deal",
  "asw-sonny-beach-signs-0719"
 ],
 [
  "<b>CMLL</b> Arena México: 15,500 see the Guerreros and Santo, Volador & Dragón reach the trios final; Konnan ends his slide",
  "cmll-observer-arena-mexico-0719"
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
const FRONT = {"asOf": "1991-07-21", "lead": {"p": "wwf", "kicker": "WWF · The Spectrum · July 20", "id": "wwf-lod-champions-0720", "title": "The Legion of Doom Are Your New Tag Team Champions", "dek": "Hawk and Animal beat the Nasty Boys seven falls to four in a 56-minute Death Match in Philadelphia.", "paras": ["The Legion of Doom demanded a Death Match for the WWF Tag Team Titles and got one at the Spectrum on Saturday night. Hawk took all seven of the Legion's falls, two of them by disqualification when Jimmy Hart couldn't keep the megaphone to himself, and Brian Knobbs took all four of the Nastys'. Hawk's flying shoulderblock ended it at 55:59.", "The title switch came on a house show, five weeks before SummerSlam, and the office now has to rebook the tag picture around it, starting with LOD against Power & Glory in Toronto on Sunday. The Spectrum drew 15,800 for $284,400 with $63,200 in merchandise. Underneath, Snuka-Mountie and Tito-Martel both went ****1/4, and Sid never tagged in against Hulk Hogan."]}, "rest": [["wcw", "WCW · Johnson City", "wcw-freebirds-crowned-0720", "Badstreet Gold! Freebirds Are the First WCW Tag Team Champions", "Hayes and Garvin beat the Bruise Brothers and then the Young Pistols, with DDP's trip setting up the final DDT. Nikita Koloff opened the show by announcing his title run is his last."], ["uswa", "USWA · Dallas", "uswa-flair-steals-debut-0720", "The Nature Boy Steals One in Dallas", "Flair rolled up Terry Funk with the tights in his USWA debut before a Sportatorium sellout, and the lucha trios stole the show at ****1/2."], ["cmll", "CMLL · Arena Coliseo", "cmll-diabolica-takes-trophy-0720", "La Diabólica Takes Her Trophy", "A five-star women's main event ended with Diabólica cutting Toshiyo Yamada's hair, six days before hair vs. hair at Verano."], ["fmw", "FMW · Konan", "fmw-goto-chair-pogo-0720", "Goto's Chair, Pogo's Head, Onita's Win", "Tarzan Goto's chair hit his own partner and Onita stole the main event. The Sheik made Sabu submit and threw fire at his nephew."]], "backstage": [["uswa", "USWA · Backstage", "uswa-observer-dallas-0720", "The Sportatorium Sells Out", "4,500 paid $49,500 and spent $3 a head on merchandise, the best per-head number of the summer. Paul Ellering looks like he's building a stable."], ["wwf", "WWF · Backstage", "wwf-observer-spectrum-0720", "Tag Titles Change on a House Show", "The office put the belts on LOD in Philadelphia instead of saving the match for SummerSlam. The Nastys get a rematch, if anyone believes they can win it."], ["cmll", "CMLL · Backstage", "cmll-observer-coliseo-0720", "Five Stars at the Coliseo", "The best women's match in Mexico in years, on the night five CMLL regulars were in Dallas. Lola González is 0-5 in July."], ["wcw", "WCW · Backstage", "wcw-observer-pro-ep2", "Rich and Eaton Carry the Hour", "Pillman and Zenk are at war with Paul E. on TV. Eli the Eliminator's car trouble put JYD on the losing side of a squash."], ["fmw", "FMW · Backstage", "fmw-observer-konan-0720", "Five Matches and a Business", "Konan drew 1,100 more than Sagamihara on a five-match card with 16 wrestlers. Spinks and Sullivan weren't booked."], ["wwf", "WWF · Superstars", "wwf-observer-superstars-ep2", "The Best Superstars in a While", "Tito went twelve minutes with the Warlord right after Heenan's open challenge, and Harvey Wippleman now has the Warlord as well as Sid."], ["ajpw", "AJPW · Backstage", "ajpw-observer-fukuoka-0719", "Two Title Matches Nobody Advertised", "Fukuoka drew $128,250 and both belts were defended unannounced. Sapporo 7/21 is next."], ["asw", "All Star · News", "asw-sonny-beach-signs-0719", "Sonny Beach Signs with All Star", "Sonny Beach signed a 32-card deal that leaves him free to work elsewhere. His debut date hasn't been set."]], "breaking": [["wwf-lod-champions-0720", "LOD win the tag titles", "The Legion of Doom beat the Nasty Boys 7-4 in a Death Match at the Spectrum. First defense: Power & Glory, Toronto."], ["wcw-freebirds-crowned-0720", "Koloff: \"This is my last ride\"", "WCW's World Champion says his neck won't hold up and he'll leave the business as champion. Luger promises to retire him."]], "desk": ["<b>LOD</b> are WWF Tag Team Champions. Toronto, San Francisco, Chicago and the SummerSlam tag plans all need rebooking.", "<b>Koloff's last ride:</b> Luger has the rematch clause every town, every night. How long does the farewell run last?", "<b>The Freebirds</b> defend the WCW tag titles for the first time against the Killer Bees in Knoxville 7/21.", "<b>PN News</b> tore his quad in Johnson City. He's booked in Knoxville 7/21 and Nashville 7/22.", "<b>Arn & Zbyszko:</b> Paul E. made his pitch. Arn is listening; Zbyszko wants to know his cut.", "<b>Ric Flair</b> has no USWA date after his Dallas win, and the Texas Outlaws want him.", "<b>Dennis Condrey</b> teamed with the babyface Nightmares in Dallas. Turn or mistake?", "<b>Goto and Pogo:</b> Goto's chair hit his partner in Konan, and Goto works New Japan in Sendai 7/22.", "<b>Rick Rude</b> is in Japan for AJPW Sapporo 7/21, then back for Inglewood 7/23 against Windham & Steiner.", "<b>Verano 7/26:</b> the first CMLL World Trios title, Konnan's title vs. Vampiro's hair, and Yamada vs. Diabólica, hair vs. hair. <b>Jumbo vs. Williams</b> at Budokan 7/27; <b>Chōshu vs. Chono</b> at Sumo Hall 7/30.", "<b>Sonny Beach</b> signed with All Star; debut To establish.", "<b>SummerSlam vs. the Omni:</b> WWF and WCW go head to head again on 8/25."]};

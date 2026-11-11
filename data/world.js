/* TNM World Wrestling Report: world-wide data (world date, ticker, talent exchange, arrivals). */

const WORLD_DATE = "1991-07-13";   // move this forward as the world advances

const SHARED = [["Bruise Brothers (Ron & Don Harris)", "WCW", "TWA", "Working both for now. WCW Dark Circle. Lost to Landell & Armstrong at Super Summer Sizzler '91."], ["Billy Joe Travis", "TWA", "AJPW", "On the AJPW Summer Action Series (7/5–7/27). Out of the TWA for July."], ["Bam Bam Bigelow", "TWA", "NJPW", "TWA main eventer. Signed with NJPW 7/4 and on the Summer Crush tour through 7/30. Back for TWA 8/2."], ["Rick Rude", "WCW", "AJPW", "Works both. AJPW 7/1, 7/5, 7/9, 7/11 so far. Flew back for Richmond 7/7. Greenville 7/13 and the Bash 7/14 next."], ["Abdullah the Butcher", "WCW", "AJPW", "AJPW 7/1, 7/3, 7/5, 7/9, 7/11. ⚠ Conflict: worked WCW Columbus 7/8 and AJPW Kanazawa 7/9. Pulled from the Bash."], ["Stan Hansen", "USWA", "AJPW", "Shuttles between them. Missed AJPW Niigata 7/7 while in USWA."], ["Dan Spivey", "USWA", "AJPW", "Same shuttle as Hansen. Both join Ellering's USWA stable 7/27."], ["Toshiaki Kawada", "AJPW", "USWA", "USWA deal over: wanted to re-sign, but All Japan asked for him back full-time. Turned down Ellering."], ["Eddie Guerrero", "CMLL", "USWA", "4–0 in CMLL. Not on the USWA July plan after 7/3."], ["El Hijo Del Santo", "CMLL", "USWA", "On both rosters."], ["Jushin Liger", "WCW", "NJPW", "Guest in CMLL Acapulco 7/17, so he misses NJPW Fukuoka 7/18. IWGP Junior Champion. ⚠ Worked NJPW 7/5 and 7/6 while booked in WCW Philly and Atlanta. Sumo Hall vs. Pegasus Kid depends on WCW dates."], ["Brian Pillman", "WCW", "NJPW", "⚠ Worked NJPW 7/4 and 7/6 around WCW Philly 7/5. Kept off NJPW while he has U.S. dates."], ["Mike Rotunda (IRS)", "WWF", "NJPW", "CMLL Acapulco 7/17 vs. Atlantis. ⚠ IRS in the WWF. Worked NJPW Osaka 7/6, the same night as WWF Anaheim."], ["Owen Hart (Blue Blazer)", "WWF", "NJPW", "CMLL Acapulco 7/17 as the Blazer, then WWF Richfield 7/18. ⚠ Blue Blazer in NJPW 7/4, 7/5, 7/10 around WWF Calgary 7/8 and Edmonton 7/9."], ["Sting", "WCW", "NJPW", "Listed in NJPW as \"Sting 1992.\" No NJPW dates."], ["El Gigante", "WCW", "NJPW", "NJPW 7/4 and 7/5, WCW Atlanta 7/6. Tight but doable."], ["Great Muta", "WCW", "NJPW", "Watch list. No NJPW dates booked."], ["Big Van Vader", "WCW", "NJPW", "On the NJPW roster. No NJPW dates booked."], ["Masanobu Fuchi", "AJPW", "(NJPW, released)", "Worked NJPW 7/4 and 7/5, then released. AJPW only."], ["Toshiyo Yamada", "CMLL", "Joshi", "Touring CMLL. 2–0, beat Ultimo Dragón and La Diabólica."], ["Black Magic", "CMLL", "ASW", "Foreign rudo in CMLL. Unused by ASW so far; keep him off July ASW Wednesdays."], ["The Lightning Kid", "CMLL", "Power Pro", "CMLL debut 7/12. Power Pro's Power Hour is 7/28."], ["Kevin Sullivan", "(free agent)", "CMLL?", "Walked out of WCW 7/8. Rumored for Arena México 7/12 but didn't appear. Negotiations with CMLL ongoing."]];

const ARRIVALS = [["9/5/91", "WCW", "Bill Kazmaier", "Arrival. \"World's Strongest Man.\""], ["9/9/91", "WWF", "Scott Taylor", "Career debut."], ["Sept '91", "WCW", "Van Hammer", "Career debut. Heavy-metal rocker."], ["9/20/91", "Japan", "Masayoshi Motegi", "Career debut. W*ING junior."], ["10/4/91", "Joshi", "Kumiko Maekawa", "AJW debut. Karate background."], ["10/4/91", "Joshi", "Chikako Shiratori", "AJW debut."], ["10/21/91", "WWF", "Chris Chavis (Tatanka)", "Vignettes first. TV in Feb '92. Also on USWA's Power Pro roster."], ["11/5/91", "WCW", "Marcus Alexander Bagwell", "Young babyface. Also on USWA's Power Pro roster."], ["11/10/91", "Indies", "Rick Michaels", "Georgia."], ["11/10/91", "Indies", "Stevie Richards", "Philadelphia (date disputed)."], ["11/11/91", "WWF", "Chris Walker", "Jumps from GWF."], ["11/18/91", "CMLL", "Rey Bucanero Jr.", "Age 17, nephew of Pirata Morgan."], ["11/20/91", "Indies", "Glenn Gilbertti", "Career debut. Also on USWA's Power Pro roster."], ["Late '91", "WWF", "Repo Man", "Gimmick debut (Barry Darsow)."], ["12/1/91", "WWF", "Owen Hart", "Return."], ["12/2/91", "WWF", "Brian Lee", "Arrival."], ["12/7/91", "Shoot", "Volk Han", "RINGS debut vs. Akira Maeda."], ["12/7/91", "Shoot", "Hans Nijman", "RINGS, karate bout."], ["12/22/91", "Shoot", "Hiromitsu Kanehara", "UWF-i, vs. Masakazu Maeda."], ["12/22/91", "Shoot", "Masakazu Maeda", "UWF-i."], ["1991", "Indies", "Little Guido", "NJ. Shoot-style base."], ["1991", "Europe", "Alex Wright", "CWA, age 16. Son of Steve Wright."], ["1991", "Joshi", "Rie Tamada", "AJW class of '91."], ["1/11/92", "Joshi", "Michiko Omukai", "AJW. Delayed by injury."]];

const TICKER = [
 [
  "<b>WWF</b> WrestleFest: Hogan retains, Sid strikes, LOD save",
  "wwf-wrestlefest-recap"
 ],
 [
  "<b>WWF</b> Observer: WrestleFest goes *3/4; the Warrior is hurt",
  "wwf-observer-wrestlefest-0714"
 ],
 [
  "<b>WWF</b> From the Road: Marty Jannetty, six feet apart",
  "wwf-diary-jannetty-0714"
 ],
 [
  "<b>WWF</b> Piper's back: Rowdy Roddy returns vs. Sid in Milwaukee",
  "wwf-pipers-back"
 ],
 [
  "<b>WWF</b> Observer: Piper returns, Sid still struggles",
  "wwf-observer-milwaukee-0713"
 ],
 [
  "<b>WWF</b> From the Road: Roddy Piper, three hours in a back room",
  "wwf-diary-piper-0713"
 ],
 [
  "<b>WCW</b> WCW Pro: Steiner and Orndorff advance in the TV Title tournament",
  "wcw-steiner-draws-first-blood"
 ],
 [
  "<b>WCW</b> Observer: Pro Ep. 1 writes Sullivan off and points to Greenville",
  "wcw-observer-pro-ep1"
 ],
 [
  "<b>WCW</b> From the Road: Rick Steiner at the Tallahassee taping",
  "wcw-diary-steiner-0709"
 ],
 [
  "<b>AJPW</b> Breaking: Kawada is leaving All Japan; last date Okayama 7/15",
  "ajpw-kawada-leaving"
 ],
 [
  "<b>AJPW</b> Observer: Hiroshima's young boys steal the show",
  "ajpw-observer-hiroshima-0713"
 ],
 [
  "<b>AJPW</b> From the Road: Masao Inoue, up at seven again",
  "ajpw-diary-inoue-0713"
 ],
 [
  "<b>WCW</b> The Z-Man signs: Tom Zenk joins WCW",
  "wcw-zenk-signs"
 ],
 [
  "<b>WWF</b> Observer: Winnipeg saves the swing with a $202,000 gate",
  "wwf-observer-winnipeg-0712"
 ],
 [
  "<b>AJPW</b> Observer: Nagoya draws $192,000 at $32 a seat",
  "ajpw-observer-nagoya-0711"
 ],
 [
  "<b>WCW</b> Observer: Charleston goes *** but draws just 3,200",
  "wcw-observer-charleston-0712"
 ],
 [
  "<b>WCW</b> Sting makes Arn Anderson pass out",
  "wcw-sting-makes-arn-pass-out"
 ],
 [
  "<b>ASW</b> Observer: three shows in, three sellouts, and Big Daddy arrives",
  "asw-observer-three-shows"
 ],
 [
  "<b>USWA</b> Observer: Evansville does $16,000; Dundee piledrives Adams",
  "uswa-observer-evansville-0710"
 ],
 [
  "<b>USWA</b> Observer: Memphis does $54,000 on an angle show",
  "uswa-observer-memphis-0706"
 ],
 [
  "<b>WORLD</b> Who gets paid: Hogan's $125K a month vs. one night in Memphis",
  "world-who-gets-paid"
 ],
 [
  "<b>POWER PRO</b> Jericho retains with the Lion Tamer",
  "pp-jericho-keeps-the-belt"
 ],
 [
  "<b>CMLL</b> Vampiro puts his hair up against Konnan's title",
  "cmll-hair-on-the-line"
 ],
 [
  "<b>USWA</b> Flair debuts at Star Wars, costs Kevin Von Erich",
  "uswa-flair-signs"
 ],
 [
  "<b>WCW</b> Freebirds fly again in Columbus",
  "wcw-freebirds-return"
 ],
 [
  "<b>NJPW</b> Liger, Pillman, IRS and Blazer in two places at once",
  "njpw-the-commuters"
 ],
 [
  "<b>JULY 14</b> Bash vs. WrestleFest: same night",
  "world-super-sunday"
 ],
 [
  "<b>TWA</b> Idol wins with his feet on the ropes",
  "twa-feet-on-the-ropes"
 ]
];

FINANCE._streams = ["Merchandise", "TV rights", "Pay-per-view share", "Home video", "900 hotline", "Licensing", "Programs & magazines", "Concessions & parking", "Talent loan fees", "Sponsorships"];

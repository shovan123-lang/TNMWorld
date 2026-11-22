/* TNM World Wrestling Report: world-wide data (world date, ticker, talent exchange, arrivals). */

const WORLD_DATE = "1991-07-20";   // move this forward as the world advances

const SHARED = [["Bruise Brothers (Ron & Don Harris)", "WCW", "TWA", "Working both for now. WCW Dark Circle. Lost to Landell & Armstrong at Super Summer Sizzler '91."], ["Billy Joe Travis", "TWA", "AJPW", "On the AJPW Summer Action Series (7/5–7/27). Out of the TWA for July."], ["Bam Bam Bigelow", "TWA", "NJPW", "TWA main eventer. Signed with NJPW 7/4 and on the Summer Crush tour through 7/30. Back for TWA 8/2."], ["Rick Rude", "WCW", "AJPW", "Works both. AJPW 7/1, 7/5, 7/9, 7/11 so far. Flew back for Richmond 7/7. Greenville 7/13 and the Bash 7/14 next."], ["Abdullah the Butcher", "WCW", "AJPW", "AJPW 7/1, 7/3, 7/5, 7/9, 7/11. ⚠ Conflict: worked WCW Columbus 7/8 and AJPW Kanazawa 7/9. Pulled from the Bash."], ["Stan Hansen", "USWA", "AJPW", "Shuttles between them. Missed AJPW Niigata 7/7 while in USWA."], ["Dan Spivey", "USWA", "AJPW", "Same shuttle as Hansen. Both join Ellering's USWA stable 7/27."], ["Toshiaki Kawada", "AJPW", "USWA", "USWA deal over: wanted to re-sign, but All Japan asked for him back full-time. Turned down Ellering."], ["Eddie Guerrero", "CMLL", "USWA", "4–0 in CMLL. Not on the USWA July plan after 7/3."], ["El Hijo Del Santo", "CMLL", "USWA", "On both rosters."], ["Jushin Liger", "WCW", "NJPW", "Guest in CMLL Acapulco 7/17, so he misses NJPW Fukuoka 7/18. IWGP Junior Champion. ⚠ Worked NJPW 7/5 and 7/6 while booked in WCW Philly and Atlanta. Sumo Hall title defense vs. El Samurai (replacing the injured Pegasus Kid) depends on WCW dates."], ["Brian Pillman", "WCW", "NJPW", "⚠ Worked NJPW 7/4 and 7/6 around WCW Philly 7/5. Kept off NJPW while he has U.S. dates."], ["Mike Rotunda (IRS)", "WWF", "NJPW", "CMLL Acapulco 7/17 vs. Atlantis. ⚠ IRS in the WWF. Worked NJPW Osaka 7/6, the same night as WWF Anaheim."], ["Owen Hart (Blue Blazer)", "WWF", "NJPW", "CMLL Acapulco 7/17 as the Blazer, then WWF Richfield 7/18. ⚠ Blue Blazer in NJPW 7/4, 7/5, 7/10 around WWF Calgary 7/8 and Edmonton 7/9."], ["Sting", "WCW", "Gave notice to WCW 7/18. Going to NJPW full-time at New Japan's request: G1 Climax in August as the top babyface foreigner, building to Wrestle Kingdom (January 4, 1992, Tokyo Dome). WCW agreed. Last WCW date To establish.", "Listed in NJPW as \"Sting 1992.\" No NJPW dates."], ["El Gigante", "WCW", "NJPW", "NJPW 7/4 and 7/5, WCW Atlanta 7/6. Tight but doable."], ["Great Muta", "WCW", "NJPW", "Watch list. No NJPW dates booked."], ["Big Van Vader", "WCW", "NJPW", "On the NJPW roster. No NJPW dates booked."], ["Masanobu Fuchi", "AJPW", "(NJPW, released)", "Worked NJPW 7/4 and 7/5, then released. AJPW only."], ["Toshiyo Yamada", "CMLL", "Joshi", "Touring CMLL. 2–0, beat Ultimo Dragón and La Diabólica."], ["Black Magic", "CMLL", "ASW", "Foreign rudo in CMLL. Unused by ASW so far; keep him off July ASW Wednesdays."], ["The Lightning Kid", "CMLL", "Power Pro", "CMLL debut 7/12. Power Pro's Power Hour is 7/28."], ["Kevin Sullivan", "(free agent)", "CMLL?", "Walked out of WCW 7/8. Rumored for Arena México 7/12 but didn't appear. Negotiations with CMLL ongoing."]];

const ARRIVALS = [["8/1/91", "Shoot", "Mitsuya Nagai", "RINGS debut vs. Herman Renting."], ["8/4/91", "Joshi", "Mizuki Endo", "LLPW debut."], ["9/5/91", "WCW", "Bill Kazmaier", "Arrival. \"World's Strongest Man.\""], ["9/9/91", "WWF", "Scott Taylor", "Career debut."], ["Sept '91", "WCW", "Van Hammer", "Career debut. Heavy-metal rocker."], ["9/20/91", "Japan", "Masayoshi Motegi", "Career debut. W*ING junior."], ["10/4/91", "Joshi", "Kumiko Maekawa", "AJW debut. Karate background."], ["10/4/91", "Joshi", "Chikako Shiratori", "AJW debut."], ["10/21/91", "WWF", "Chris Chavis (Tatanka)", "Vignettes first. TV in Feb '92. Also on USWA's Power Pro roster."], ["11/5/91", "WCW", "Marcus Alexander Bagwell", "Young babyface. Also on USWA's Power Pro roster."], ["11/10/91", "Indies", "Rick Michaels", "Georgia."], ["11/10/91", "Indies", "Stevie Richards", "Philadelphia (date disputed)."], ["11/11/91", "WWF", "Chris Walker", "Jumps from GWF."], ["11/18/91", "CMLL", "Rey Bucanero Jr.", "Age 17, nephew of Pirata Morgan."], ["11/20/91", "Indies", "Glenn Gilbertti", "Career debut. Also on USWA's Power Pro roster."], ["Late '91", "WWF", "Repo Man", "Gimmick debut (Barry Darsow)."], ["12/1/91", "WWF", "Owen Hart", "Return."], ["12/2/91", "WWF", "Brian Lee", "Arrival."], ["12/7/91", "Shoot", "Volk Han", "RINGS debut vs. Akira Maeda."], ["12/7/91", "Shoot", "Hans Nijman", "RINGS, karate bout."], ["12/22/91", "Shoot", "Hiromitsu Kanehara", "UWF-i, vs. Masakazu Maeda."], ["12/22/91", "Shoot", "Masakazu Maeda", "UWF-i."], ["1991", "Indies", "Little Guido", "NJ. Shoot-style base."], ["1991", "Europe", "Alex Wright", "CWA, age 16. Son of Steve Wright."], ["1991", "Joshi", "Rie Tamada", "AJW class of '91."], ["1/11/92", "Joshi", "Michiko Omukai", "AJW. Delayed by injury."]];

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
  "<b>FMW</b> Sagamihara: Sullivan shakes Pogo's hand; The Shooter taps Verichev on night one",
  "fmw-observer-sagamihara-0719"
 ],
 [
  "<b>NJPW</b> Fukuoka: Chono makes Kido tap to the STF; Sasaki stands with Chono after Norton no-shows",
  "njpw-observer-fukuoka-0718"
 ],
 [
  "<b>WWF</b> Richfield: Jimmy Hart fires Dino Bravo; Michaels walks out on Jannetty",
  "wwf-observer-richfield-0718"
 ],
 [
  "<b>WCW</b> Observer exclusive: Sting is going to New Japan full-time for the G1 Climax and Wrestle Kingdom (January 4, 1992, Tokyo Dome)",
  "wcw-observer-sting-njpw-0718"
 ],
 [
  "<b>WCW</b> Cleveland: NIKITA KOLOFF chokes out Luger for the World Title; Sting gives notice",
  "wcw-observer-cleveland-0718"
 ],
 [
  "<b>AJPW</b> Kumamoto: Kobashi moonsaults Rude (****1/4), and Misawa names him his new partner",
  "ajpw-observer-kumamoto-0717"
 ],
 [
  "<b>USWA</b> Observer: Jonesboro, Guerrero goes ****1/4 on Worldwide",
  "uswa-observer-jonesboro-0717"
 ],
 [
  "<b>TWA</b> Idol wins with his feet on the ropes",
  "twa-feet-on-the-ropes"
 ]
];

FINANCE._streams = ["Merchandise", "TV rights", "Pay-per-view share", "Home video", "900 hotline", "Licensing", "Programs & magazines", "Concessions & parking", "Talent loan fees", "Sponsorships"];
// Front page: lead, rest of the world, backstage, breaking, booker's desk. Refreshed each time the world clock advances.
const FRONT = {"asOf":"1991-07-20","lead":{"p":"wcw","kicker":"WCW · Charleston Civic Center · July 19","id":"wcw-rude-us-champion-0719","title":"Rude Ends Sting's Reign! Ravishing Rick Is U.S. Champion","dek":"In his last WCW date before leaving for New Japan, Sting dropped the United States Title to Rick Rude in a 27-minute war.","paras":["Rick Rude pinned Sting with a vertical facebuster at 27:07 in Charleston, WV on Friday night, seconds after Paul E. Dangerously got involved behind the referee's back. It was Sting's last WCW date before he leaves for New Japan, and Rude is the new United States Champion. In the main event Nikita Koloff kept the World Title when Harley Race and Mr. Hughes got Lex Luger disqualified.","The title change went ****3/4, one of the two best WCW matches of the summer. Charleston drew 8,250 at $13 for $107,250, double Cleveland's gate the night before, plus $20,265 in merchandise. Rude flies to All Japan for Sapporo on Sunday, and WCW's house shows have to carry on without either of the men who just wrestled for the belt."]},"rest":[["njpw","NJPW · Sapporo","njpw-chono-strikes-0719","Chōshu Beats Mutoh, Then Chono Strikes","Chōshu pinned Mutoh on the TV taping, then Chono came over the rail and locked the STF on the champion. 5,000 sold out the Nakajima Sports Center."],["ajpw","AJPW · Fukuoka","ajpw-mvc-keep-gold-0719","Gordy Powerbombs Rogers, Miracle Violence Keep the Gold","MVC beat the Fantastics and Jumbo beat Dory Funk Jr., both with titles on the line. Ogawa pinned Dean Malenko at ****1/4."],["cmll","CMLL · Arena México","cmll-konnan-stops-slide-0719","Konnan Stops the Slide","15,500 saw the Guerreros and Santo, Volador & Dragón reach the trios final, and Konnan ended his three-match skid a week before Title vs. Hair."],["wwf","WWF · Dayton","wwf-martel-steals-one-0719","Martel Steals One","Martel beat SATO with his feet on the ropes at ****1/4, Bravo won his first match on his own, and Sid powerbombed Boss Man after the main."]],"backstage":[["wcw","WCW · Backstage","wcw-observer-charleston-0719","Sting's Last Night Draws","Sting's farewell drew $107,250 and $20,265 in merchandise. The office now has to rework the house show loop without him."],["wwf","WWF · Backstage","wwf-jannetty-resigns-0719","Jannetty Re-signs","Marty Jannetty, down to the last card of his deal, signed a new contract after Dayton with a raise from Philadelphia."],["wwf","WWF · Dayton","wwf-observer-dayton-0719","WCW Outdraws the WWF in Dayton","WCW did $63,000 at the Nutter Center two nights before the WWF did $48,000 at the Hara Arena. Bravo's babyface debut went -****3/4."],["njpw","NJPW · Backstage","njpw-observer-sapporo-0719","Observer: Sapporo","Hashimoto is back with no word on why he missed Hiroshima, and Sasaki is back beside Hase a night after standing with Chono."],["ajpw","AJPW · Backstage","ajpw-observer-fukuoka-0719","Two Title Matches Nobody Advertised","Fukuoka drew $128,250, the second-best gate of the tour, and the office put both belts on the line on the night."],["asw","All Star · News","asw-sonny-beach-signs-0719","Sonny Beach Signs with All Star","Sonny Beach signed a 32-card deal that leaves him free to work for other promotions. His debut date hasn't been set."],["twa","Tri-State · Allentown","twa-observer-allentown-0719","Match Observations: Allentown","900 in a 1,500-seat hall for a **1/4 card, and the tournament favorite got hurt."],["fmw","FMW · Sagamihara","fmw-observer-sagamihara-0719","Observer: Sagamihara","FMW nearly filled the building on night one, The Shooter tapped Verichev, and Kevin Sullivan shook Mr. Pogo's hand."]],"breaking":[["wcw-rude-us-champion-0719","Rude is U.S. Champion","Rick Rude beat Sting in Charleston, WV, the last night of Sting's WCW run."],["njpw-chono-strikes-0719","Chono puts the STF on Chōshu","Chono jumped the champion after the Sapporo TV main, eleven days before their Sumo Hall title match."]],"desk":["<b>Sting</b> is gone from WCW after losing the U.S. Title to Rude. He's next seen in New Japan.","<b>Rick Rude</b> is U.S. Champion and in Japan for AJPW Sapporo 7/21. His first WCW defense: To establish.","<b>Koloff</b> kept the World Title by DQ, but Luger has his rematch clause every town, every night.","<b>Arn & Zbyszko:</b> Zbyszko ran in for Arn in Charleston. Paul E.'s new team is coming.","<b>Sasaki:</b> stood with Chono in Fukuoka, back with Hase in Sapporo. Fill-in or a turn later?","<b>Hashimoto</b> is back for New Japan with no word on why he missed Hiroshima.","<b>Dory Funk Jr.</b> sided with MVC and lost a Triple Crown match to Jumbo two nights later.","<b>The Rockers:</b> Jannetty re-signed, so there's no rush on the split Michaels keeps hinting at.","<b>Dino Bravo</b> is a babyface on his own, but needs a better opponent than Typhoon.","<b>WCW tag titles</b> are crowned in Johnson City 7/20. Flair vs. Funk is in Dallas the same night.","<b>Hansen</b> is booked for AJPW Sapporo 7/21 after missing Kumamoto. Osaka 7/25 has priority over the USWA.","<b>Tercias final and Title vs. Hair</b> at Verano 7/26; <b>Jumbo vs. Williams</b> at Budokan 7/27; <b>Chōshu vs. Chono</b> at Sumo Hall 7/30.","<b>Sonny Beach</b> signed with All Star; debut To establish.","<b>SummerSlam vs. the Omni:</b> WWF and WCW go head to head again on 8/25."]};

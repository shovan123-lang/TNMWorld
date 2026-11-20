/* TNM World Wrestling Report: world-wide data (world date, ticker, talent exchange, arrivals). */

const WORLD_DATE = "1991-07-19";   // move this forward as the world advances

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
  "<b>ASW</b> Skegness: Albright beats St. Clair 3–0 in a **** death match; Nagasaki a no-show again",
  "asw-observer-skegness-0717"
 ],
 [
  "<b>CMLL</b> Acapulco: Cien Caras counts out Konnan; Atlantis and IRS go ****1/4 on a ladder",
  "cmll-observer-acapulco-0717"
 ],
 [
  "<b>CMLL</b> From the Road: Atlantis, No clock",
  "cmll-diary-atlantis-0717"
 ],
 [
  "<b>WCW</b> Dayton: Windham DQ'd as Luger strikes; Hughes wins, OMG crashes the main",
  "wcw-observer-dayton-0717"
 ],
 [
  "<b>WCW</b> From the Road: Arn Anderson, Alone, you lose",
  "wcw-diary-arn-0717"
 ],
 [
  "<b>WCW</b> Farmland: Paul E.'s phone hands Zenk a 2–0 lead; Bruise Brothers lose",
  "wcw-observer-farmland-0716"
 ],
 [
  "<b>USWA</b> Observer: Jonesboro, Guerrero goes ****1/4 on Worldwide",
  "uswa-observer-jonesboro-0717"
 ],
 [
  "<b>FMW</b> Frontier joins the world: Onita, Pogo, Goto, Sabu and a women's division",
  "fmw-frontier-joins"
 ],
 [
  "<b>NJPW</b> El Samurai replaces Pegasus Kid vs. Liger at Sumo Hall",
  "njpw-samurai-gets-liger"
 ],
 [
  "<b>TWA</b> Idol wins with his feet on the ropes",
  "twa-feet-on-the-ropes"
 ]
];

FINANCE._streams = ["Merchandise", "TV rights", "Pay-per-view share", "Home video", "900 hotline", "Licensing", "Programs & magazines", "Concessions & parking", "Talent loan fees", "Sponsorships"];
// Front page: lead, rest of the world, backstage, breaking, booker's desk. Refreshed each time the world clock advances.
const FRONT = {"asOf":"1991-07-19","lead":{"p":"wcw","kicker":"WCW · Cleveland Convention Center · July 18","id":"wcw-koloff-champion-0718","title":"Koloff Chokes Out Luger! The Russian Nightmare Is World Champion","dek":"Four days into his reign, Lex Luger passed out in Nikita Koloff's front facelock, and WCW has its third World Champion in a week.","paras":["Nikita Koloff made Lex Luger pass out in a front facelock at 23:17 in Cleveland on Thursday night, with Harley Race and Mr. Hughes at ringside unable to stop it. Luger's reign lasted four days. On the same card, Paul Orndorff pinned Sting clean, the night Sting gave WCW notice that he's leaving for New Japan full-time.","The match went ***1/2 in front of 5,200 fans paying $52,000. The WWF ran the Richfield Coliseum twenty miles away that same night and drew 8,500 for $102,000 without Hogan or the Warrior. Every World Title match on the July loop was advertised as a Luger defense, and Luger now goes into Charleston as the challenger."]},"rest":[["wwf","WWF · Richfield","wwf-observer-richfield-0718","Richfield Doubles Cleveland","Jimmy Hart fired Dino Bravo, who press slammed him out of the ring, and Shawn Michaels walked out on Marty Jannetty after a double countout with Demolition. 8,500 paid $102,000."],["njpw","NJPW · Fukuoka","njpw-observer-fukuoka-0718","Observer: Fukuoka","Chono made Kido tap to the STF with Kensuke Sasaki, a fill-in for Scott Norton, at his side. Tony Halme shoved referee Tiger Hattori after his fifth straight loss."],["ajpw","AJPW · Kumamoto","ajpw-kobashi-new-partner-0717","Kobashi Moonsaults Rude","Kobashi pinned Rick Rude at ****1/4, and Misawa named him his new partner. MVC and Dory Funk Jr. beat Jumbo's team."],["cmll","CMLL · Acapulco","cmll-caras-counts-out-konnan","Cien Caras Counts Out the Champion","Konnan kept the title but lost his third straight. Atlantis and IRS went ****1/4 to a ladder-match draw, and Liger pinned Ultimo Dragón."]],"backstage":[["wcw","WCW · Backstage","wcw-observer-sting-njpw-0718","Sting to New Japan","New Japan asked WCW for Sting full-time for the G1 Climax and a Wrestle Kingdom main event at the Tokyo Dome, and WCW said yes."],["wcw","WCW · Backstage","wcw-observer-dayton-0717","One Man Gang Goes Off Script","Dayton drew 7,000 and $63,000 for a *3/4 taping. Windham lost by DQ to Mr. Hughes, and One Man Gang ran in on Hughes unannounced."],["uswa","USWA · Jonesboro","uswa-observer-jonesboro-0717","Guerrero Steals a TV Taping","Eddie Guerrero went ****1/4 on a Wednesday taping. Flamingo cheated to stay unbeaten, and Doug Gilbert shoved Dennis Condrey."],["ajpw","AJPW · Backstage","ajpw-observer-kumamoto-0717","Hansen Misses, Kobashi Delivers","Misawa vs. Hansen never happened, so Kobashi and Rude went on last. Dory Funk Jr. has lined up with MVC."],["asw","All Star · Backstage","asw-observer-skegness-0717","Nagasaki No-Shows Again","Albright and St. Clair went ****, the rest of the card dragged Skegness to DUD, and Kendo Nagasaki missed another date."],["fmw","FMW · News","fmw-frontier-joins","Frontier Joins the World","Atsushi Onita's FMW is the tenth promotion on the board, with Mr. Pogo, Tarzan Goto, Sabu and a full women's division."],["wcw","WCW · Backstage","wcw-observer-salisbury-0715","Big Josh Goes Down","Big Josh tore his quad in Salisbury and is out 70 cards; his July bookings have to be redone."],["pp","Power Pro · Backstage","pp-young-lions-abroad","Young Lions Abroad","The Lightning Kid is the first Power Pro student on excursion in Mexico. Chris Benoit, hurt in New Japan as the Pegasus Kid, could be next."]],"breaking":[["wcw-koloff-champion-0718","Koloff is World Champion","Nikita Koloff made Lex Luger pass out in Cleveland, four days into Luger's reign."],["wwf-observer-richfield-0718","Jimmy Hart fires Dino Bravo","Bravo lost to Tito Santana in Richfield, got fired on the spot, and press slammed Hart out of the ring."]],"desk":["<b>Sting's last WCW date</b> is Charleston, 7/19. He's still the U.S. Champion, and he shows up next in New Japan.","<b>Koloff</b> is World Champion but was booked to leave WCW in August.","<b>Sasaki and Chono:</b> Kensuke Sasaki stood with Chono in Fukuoka, the night before he and Hase challenge for the IWGP Tag titles in Sapporo.","<b>The Rockers:</b> Michaels walked out on Jannetty in Richfield, and Jannetty's deal was down to its last card.","<b>Dino Bravo</b> walks alone after Jimmy Hart fired him. Hart's stable is down to IRS, DiBiase, the Mountie and the injured Earthquake.","<b>Tony Halme</b> is 0–5 in New Japan and just shoved a referee.","<b>WCW tag titles</b> are crowned in Johnson City 7/20. Cactus Jack is out 20 cards.","<b>Flair vs. Funk</b> in Dallas 7/20, and Big Gold vs. the Unified Title still hangs over the USWA.","<b>SummerSlam vs. the Omni:</b> WWF and WCW go head to head again on 8/25.","<b>Kawada's next stop:</b> the rumors say New Japan. All Japan needs a new partner for Misawa.","<b>Hansen/Spivey</b> double-booked between AJPW and USWA.","<b>Autumn Armageddon</b> is name-checked by both WCW and USWA, with no date.","<b>Titles to establish:</b> NJPW, AJPW Triple Crown, CMLL World Trios (Tercias final 7/26).","<b>Davey Boy Smith</b> is out of WWF until about 7/29. <b>Steamboat's return</b>: spring 1992."]};

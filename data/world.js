/* TNM World Wrestling Report: world-wide data (world date, ticker, talent exchange, arrivals). */

const WORLD_DATE = "1991-07-16";   // move this forward as the world advances

const SHARED = [["Bruise Brothers (Ron & Don Harris)", "WCW", "TWA", "Working both for now. WCW Dark Circle. Lost to Landell & Armstrong at Super Summer Sizzler '91."], ["Billy Joe Travis", "TWA", "AJPW", "On the AJPW Summer Action Series (7/5–7/27). Out of the TWA for July."], ["Bam Bam Bigelow", "TWA", "NJPW", "TWA main eventer. Signed with NJPW 7/4 and on the Summer Crush tour through 7/30. Back for TWA 8/2."], ["Rick Rude", "WCW", "AJPW", "Works both. AJPW 7/1, 7/5, 7/9, 7/11 so far. Flew back for Richmond 7/7. Greenville 7/13 and the Bash 7/14 next."], ["Abdullah the Butcher", "WCW", "AJPW", "AJPW 7/1, 7/3, 7/5, 7/9, 7/11. ⚠ Conflict: worked WCW Columbus 7/8 and AJPW Kanazawa 7/9. Pulled from the Bash."], ["Stan Hansen", "USWA", "AJPW", "Shuttles between them. Missed AJPW Niigata 7/7 while in USWA."], ["Dan Spivey", "USWA", "AJPW", "Same shuttle as Hansen. Both join Ellering's USWA stable 7/27."], ["Toshiaki Kawada", "AJPW", "USWA", "USWA deal over: wanted to re-sign, but All Japan asked for him back full-time. Turned down Ellering."], ["Eddie Guerrero", "CMLL", "USWA", "4–0 in CMLL. Not on the USWA July plan after 7/3."], ["El Hijo Del Santo", "CMLL", "USWA", "On both rosters."], ["Jushin Liger", "WCW", "NJPW", "Guest in CMLL Acapulco 7/17, so he misses NJPW Fukuoka 7/18. IWGP Junior Champion. ⚠ Worked NJPW 7/5 and 7/6 while booked in WCW Philly and Atlanta. Sumo Hall title defense vs. El Samurai (replacing the injured Pegasus Kid) depends on WCW dates."], ["Brian Pillman", "WCW", "NJPW", "⚠ Worked NJPW 7/4 and 7/6 around WCW Philly 7/5. Kept off NJPW while he has U.S. dates."], ["Mike Rotunda (IRS)", "WWF", "NJPW", "CMLL Acapulco 7/17 vs. Atlantis. ⚠ IRS in the WWF. Worked NJPW Osaka 7/6, the same night as WWF Anaheim."], ["Owen Hart (Blue Blazer)", "WWF", "NJPW", "CMLL Acapulco 7/17 as the Blazer, then WWF Richfield 7/18. ⚠ Blue Blazer in NJPW 7/4, 7/5, 7/10 around WWF Calgary 7/8 and Edmonton 7/9."], ["Sting", "WCW", "Gave notice to WCW 7/18. Going to NJPW full-time at New Japan's request: G1 Climax in August as the top babyface foreigner, building to Wrestle Kingdom (January 4, 1992). WCW agreed. Last WCW date To establish.", "Listed in NJPW as \"Sting 1992.\" No NJPW dates."], ["El Gigante", "WCW", "NJPW", "NJPW 7/4 and 7/5, WCW Atlanta 7/6. Tight but doable."], ["Great Muta", "WCW", "NJPW", "Watch list. No NJPW dates booked."], ["Big Van Vader", "WCW", "NJPW", "On the NJPW roster. No NJPW dates booked."], ["Masanobu Fuchi", "AJPW", "(NJPW, released)", "Worked NJPW 7/4 and 7/5, then released. AJPW only."], ["Toshiyo Yamada", "CMLL", "Joshi", "Touring CMLL. 2–0, beat Ultimo Dragón and La Diabólica."], ["Black Magic", "CMLL", "ASW", "Foreign rudo in CMLL. Unused by ASW so far; keep him off July ASW Wednesdays."], ["The Lightning Kid", "CMLL", "Power Pro", "CMLL debut 7/12. Power Pro's Power Hour is 7/28."], ["Kevin Sullivan", "(free agent)", "CMLL?", "Walked out of WCW 7/8. Rumored for Arena México 7/12 but didn't appear. Negotiations with CMLL ongoing."]];

const ARRIVALS = [["9/5/91", "WCW", "Bill Kazmaier", "Arrival. \"World's Strongest Man.\""], ["9/9/91", "WWF", "Scott Taylor", "Career debut."], ["Sept '91", "WCW", "Van Hammer", "Career debut. Heavy-metal rocker."], ["9/20/91", "Japan", "Masayoshi Motegi", "Career debut. W*ING junior."], ["10/4/91", "Joshi", "Kumiko Maekawa", "AJW debut. Karate background."], ["10/4/91", "Joshi", "Chikako Shiratori", "AJW debut."], ["10/21/91", "WWF", "Chris Chavis (Tatanka)", "Vignettes first. TV in Feb '92. Also on USWA's Power Pro roster."], ["11/5/91", "WCW", "Marcus Alexander Bagwell", "Young babyface. Also on USWA's Power Pro roster."], ["11/10/91", "Indies", "Rick Michaels", "Georgia."], ["11/10/91", "Indies", "Stevie Richards", "Philadelphia (date disputed)."], ["11/11/91", "WWF", "Chris Walker", "Jumps from GWF."], ["11/18/91", "CMLL", "Rey Bucanero Jr.", "Age 17, nephew of Pirata Morgan."], ["11/20/91", "Indies", "Glenn Gilbertti", "Career debut. Also on USWA's Power Pro roster."], ["Late '91", "WWF", "Repo Man", "Gimmick debut (Barry Darsow)."], ["12/1/91", "WWF", "Owen Hart", "Return."], ["12/2/91", "WWF", "Brian Lee", "Arrival."], ["12/7/91", "Shoot", "Volk Han", "RINGS debut vs. Akira Maeda."], ["12/7/91", "Shoot", "Hans Nijman", "RINGS, karate bout."], ["12/22/91", "Shoot", "Hiromitsu Kanehara", "UWF-i, vs. Masakazu Maeda."], ["12/22/91", "Shoot", "Masakazu Maeda", "UWF-i."], ["1991", "Indies", "Little Guido", "NJ. Shoot-style base."], ["1991", "Europe", "Alex Wright", "CWA, age 16. Son of Steve Wright."], ["1991", "Joshi", "Rie Tamada", "AJW class of '91."], ["1/11/92", "Joshi", "Michiko Omukai", "AJW. Delayed by injury."]];

// Headline ticker: newest first. The site shows at most 15, keeping every promotion's newest (Sean, 2026-11-11).
const TICKER = [
 [
  "<b>WCW</b> Observer exclusive: Sting is going to New Japan full-time for the G1 Climax and Wrestle Kingdom (January 4, 1992)",
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
  "<b>WWF</b> WrestleFest: Hogan retains, Sid strikes, LOD save",
  "wwf-wrestlefest-recap"
 ],
 [
  "<b>POWER PRO</b> Power Hour taped in Nashville, airs 7/28",
  "pp"
 ],
 [
  "<b>TWA</b> Idol wins with his feet on the ropes",
  "twa-feet-on-the-ropes"
 ]
];

FINANCE._streams = ["Merchandise", "TV rights", "Pay-per-view share", "Home video", "900 hotline", "Licensing", "Programs & magazines", "Concessions & parking", "Talent loan fees", "Sponsorships"];
// Front page: lead, rest of the world, backstage, breaking, booker's desk. Refreshed each time the world clock advances.
const FRONT = {"asOf": "1991-07-16", "lead": {"p": "wcw", "kicker": "Wrestling Observer Exclusive · WCW & New Japan", "id": "wcw-observer-sting-njpw-0718", "title": "Exclusive: Sting to New Japan", "dek": "New Japan asked WCW for Sting full-time to headline its first G1 Climax and build to a main event at Wrestle Kingdom on January 4, 1992. It was a big ask, and WCW said yes.", "paras": ["Sting's notice to WCW is no mystery anymore. New Japan went to WCW and asked to bring him in on a permanent basis: not a tour, a full-time commitment. It wants him as the top babyface foreigner in its first ever G1 Climax in August, and it plans to use the G1 and the fall tours to build him toward a huge main event at Wrestle Kingdom on January 4, 1992.", "WCW agreed, even though it means giving up its United States Champion and one of its biggest draws. The office sees a run in Japan as the best thing for Sting's career. The belt has to change hands before he goes, and his last WCW date hasn't been set. He put Paul Orndorff over clean in Cleveland the same night Nikita Koloff won the World Title from Lex Luger."]}, "rest": [["wcw", "WCW · Cleveland", "wcw-koloff-champion-0718", "Koloff Chokes Out Luger!", "Nikita Koloff made Lex Luger pass out in a front facelock and is World Champion, four days into Luger's reign. Orndorff pinned Sting, non-title."], ["ajpw", "AJPW · Kumamoto", "ajpw-kobashi-new-partner-0717", "Kobashi Moonsaults Rude", "Kobashi pinned Rick Rude at ****1/4, and Misawa named him his new partner. MVC and Dory Funk Jr. beat Jumbo's team."], ["asw", "ASW · Skegness", "asw-albright-death-match-0717", "Albright Crushes St. Clair", "Gary Albright took all three falls of a **** death match. Big Daddy let Brookside take the pin, and Nagasaki was a no-show again."], ["wwf", "WWF · WrestleFest", "wwf-wrestlefest-recap", "Sid Sends a Message", "Hogan kept the WWF Title over Sgt. Slaughter, then Sid Justice powerbombed him until the Legion of Doom made the save. The Ultimate Warrior hurt his neck losing to the Undertaker."], ["uswa", "USWA · Louisville", "uswa-kerry-steals-the-pin", "Kerry Steals the Pin", "Kerry Von Erich took the win from his partner Bret Hart. Austin and Studd went **** to a double count-out, and Flair vs. Terry Funk is set for Dallas on 7/20."], ["cmll", "CMLL · Guadalajara", "cmll-dinamitas-stun-guadalajara", "The Dinamitas Silence Guadalajara", "Cien Caras and Universo 2000 pinned Konnan twice after Rayo won the first fall at home. Vampiro's hair against Konnan's title is set for Verano on 7/26."]], "backstage": [["wcw", "WCW · Backstage", "wcw-observer-cleveland-0718", "Two Champions, Two Exits?", "Sting is leaving, and the new World Champion, Koloff, was booked to leave in August. Every World Title match on the July loop was advertised as a Luger defense."], ["wcw", "WCW · Backstage", "wcw-observer-salisbury-0715", "Muta No-Shows, Josh Goes Down", "Muta skipped Salisbury, Big Josh tore his quad and is out 70 cards, and the Luger-Windham rematch advertised for the night never ran."], ["wcw", "WCW · Backstage", "wcw-observer-bash91", "Cactus Wins, Then Goes Down", "Cactus Jack hurt his back beating Vader and is out 20 WCW cards. His taped WCW Pro segments still air. And 7,000 fans is barely half a house in Baltimore."], ["wwf", "WWF · Backstage", "wwf-observer-wrestlefest-0714", "The Warrior Is Out", "The Ultimate Warrior's neck injury will keep him out past SummerSlam. Marty Jannetty's deal is running out just as the Rockers start shoving each other."], ["uswa", "USWA · Business", "uswa-observer-louisville-0713", "$67,500 for a House Show", "Louisville drew $67,500 without TV. Austin and Studd stole it, Steiner and Tully got only 5:38, and Dennis Condrey gave notice."], ["uswa", "USWA · Backstage", "uswa-big-gold", "Whose Belt Is It?", "Flair has Big Gold in Memphis. WCW wants it back, and the argument is about an old deposit. Bret Hart and Flair could end up with two world titles in one ring."], ["pp", "Power Pro · Backstage", "pp-young-lions-abroad", "Young Lions Abroad", "The Lightning Kid is the first Power Pro student on excursion in Mexico. Chris Benoit could be next. Jericho isn't going anywhere with the belt."], ["asw", "All Star · Backstage", "asw-two-passports", "Two Passports", "Black Magic is on the All Star roster but hasn't worked a camp date. He's 0–3 in Mexico, with a ****1/2 match against Casas."]], "breaking": [["wcw-observer-sting-njpw-0718", "Sting to New Japan", "Sting has given notice to WCW. New Japan asked for him full-time for the G1 Climax and Wrestle Kingdom (January 4, 1992), and WCW agreed."], ["wcw-koloff-champion-0718", "Koloff is World Champion", "Nikita Koloff made Lex Luger pass out in Cleveland, four days into Luger's reign."], ["wcw-observer-salisbury-0715", "Big Josh tears his quad", "Big Josh went down against Arn Anderson in Salisbury and is out 70 WCW cards. His eight July bookings, starting in Farmland tonight, have to be redone."]], "desk": ["<b>Sting's last WCW date</b> hasn't been set. The U.S. Title has to change hands before he leaves for New Japan.", "<b>Koloff</b> is World Champion but was booked to leave WCW in August.", "<b>Sting vs. Vader</b> runs back in Knoxville 7/21 after the ***** in Salisbury. Harley Race was at ringside.", "<b>Autumn Armageddon</b> is name-checked by both WCW and USWA, with no date.", "<b>SummerSlam vs. the Omni:</b> WWF and WCW go head to head again on 8/25.", "<b>Kawada's next stop:</b> the rumors say New Japan. All Japan needs a new partner for Misawa.", "<b>WCW tag titles</b> are crowned in Johnson City 7/20. Cactus Jack is out 20 cards.", "<b>Flair vs. Funk</b> in Dallas 7/20, and Big Gold vs. the Unified Title still hangs over the USWA.", "<b>Hansen/Spivey</b> double-booked between AJPW and USWA.", "<b>Titles to establish:</b> NJPW, AJPW Triple Crown, CMLL World Trios (Tercias final 7/26).", "<b>Davey Boy Smith</b> is out of WWF until about 7/29. <b>Steamboat's return</b>: spring 1992."]};

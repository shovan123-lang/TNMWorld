/* TNM World Wrestling Report: world-wide data (world date, ticker, talent exchange, arrivals). */

const WORLD_DATE = "1991-07-14";   // move this forward as the world advances

const SHARED = [["Bruise Brothers (Ron & Don Harris)", "WCW", "TWA", "Working both for now. WCW Dark Circle. Lost to Landell & Armstrong at Super Summer Sizzler '91."], ["Billy Joe Travis", "TWA", "AJPW", "On the AJPW Summer Action Series (7/5–7/27). Out of the TWA for July."], ["Bam Bam Bigelow", "TWA", "NJPW", "TWA main eventer. Signed with NJPW 7/4 and on the Summer Crush tour through 7/30. Back for TWA 8/2."], ["Rick Rude", "WCW", "AJPW", "Works both. AJPW 7/1, 7/5, 7/9, 7/11 so far. Flew back for Richmond 7/7. Greenville 7/13 and the Bash 7/14 next."], ["Abdullah the Butcher", "WCW", "AJPW", "AJPW 7/1, 7/3, 7/5, 7/9, 7/11. ⚠ Conflict: worked WCW Columbus 7/8 and AJPW Kanazawa 7/9. Pulled from the Bash."], ["Stan Hansen", "USWA", "AJPW", "Shuttles between them. Missed AJPW Niigata 7/7 while in USWA."], ["Dan Spivey", "USWA", "AJPW", "Same shuttle as Hansen. Both join Ellering's USWA stable 7/27."], ["Toshiaki Kawada", "AJPW", "USWA", "USWA deal over: wanted to re-sign, but All Japan asked for him back full-time. Turned down Ellering."], ["Eddie Guerrero", "CMLL", "USWA", "4–0 in CMLL. Not on the USWA July plan after 7/3."], ["El Hijo Del Santo", "CMLL", "USWA", "On both rosters."], ["Jushin Liger", "WCW", "NJPW", "Guest in CMLL Acapulco 7/17, so he misses NJPW Fukuoka 7/18. IWGP Junior Champion. ⚠ Worked NJPW 7/5 and 7/6 while booked in WCW Philly and Atlanta. Sumo Hall title defense (challenger TBD after Pegasus Kid's injury) depends on WCW dates."], ["Brian Pillman", "WCW", "NJPW", "⚠ Worked NJPW 7/4 and 7/6 around WCW Philly 7/5. Kept off NJPW while he has U.S. dates."], ["Mike Rotunda (IRS)", "WWF", "NJPW", "CMLL Acapulco 7/17 vs. Atlantis. ⚠ IRS in the WWF. Worked NJPW Osaka 7/6, the same night as WWF Anaheim."], ["Owen Hart (Blue Blazer)", "WWF", "NJPW", "CMLL Acapulco 7/17 as the Blazer, then WWF Richfield 7/18. ⚠ Blue Blazer in NJPW 7/4, 7/5, 7/10 around WWF Calgary 7/8 and Edmonton 7/9."], ["Sting", "WCW", "NJPW", "Listed in NJPW as \"Sting 1992.\" No NJPW dates."], ["El Gigante", "WCW", "NJPW", "NJPW 7/4 and 7/5, WCW Atlanta 7/6. Tight but doable."], ["Great Muta", "WCW", "NJPW", "Watch list. No NJPW dates booked."], ["Big Van Vader", "WCW", "NJPW", "On the NJPW roster. No NJPW dates booked."], ["Masanobu Fuchi", "AJPW", "(NJPW, released)", "Worked NJPW 7/4 and 7/5, then released. AJPW only."], ["Toshiyo Yamada", "CMLL", "Joshi", "Touring CMLL. 2–0, beat Ultimo Dragón and La Diabólica."], ["Black Magic", "CMLL", "ASW", "Foreign rudo in CMLL. Unused by ASW so far; keep him off July ASW Wednesdays."], ["The Lightning Kid", "CMLL", "Power Pro", "CMLL debut 7/12. Power Pro's Power Hour is 7/28."], ["Kevin Sullivan", "(free agent)", "CMLL?", "Walked out of WCW 7/8. Rumored for Arena México 7/12 but didn't appear. Negotiations with CMLL ongoing."]];

const ARRIVALS = [["9/5/91", "WCW", "Bill Kazmaier", "Arrival. \"World's Strongest Man.\""], ["9/9/91", "WWF", "Scott Taylor", "Career debut."], ["Sept '91", "WCW", "Van Hammer", "Career debut. Heavy-metal rocker."], ["9/20/91", "Japan", "Masayoshi Motegi", "Career debut. W*ING junior."], ["10/4/91", "Joshi", "Kumiko Maekawa", "AJW debut. Karate background."], ["10/4/91", "Joshi", "Chikako Shiratori", "AJW debut."], ["10/21/91", "WWF", "Chris Chavis (Tatanka)", "Vignettes first. TV in Feb '92. Also on USWA's Power Pro roster."], ["11/5/91", "WCW", "Marcus Alexander Bagwell", "Young babyface. Also on USWA's Power Pro roster."], ["11/10/91", "Indies", "Rick Michaels", "Georgia."], ["11/10/91", "Indies", "Stevie Richards", "Philadelphia (date disputed)."], ["11/11/91", "WWF", "Chris Walker", "Jumps from GWF."], ["11/18/91", "CMLL", "Rey Bucanero Jr.", "Age 17, nephew of Pirata Morgan."], ["11/20/91", "Indies", "Glenn Gilbertti", "Career debut. Also on USWA's Power Pro roster."], ["Late '91", "WWF", "Repo Man", "Gimmick debut (Barry Darsow)."], ["12/1/91", "WWF", "Owen Hart", "Return."], ["12/2/91", "WWF", "Brian Lee", "Arrival."], ["12/7/91", "Shoot", "Volk Han", "RINGS debut vs. Akira Maeda."], ["12/7/91", "Shoot", "Hans Nijman", "RINGS, karate bout."], ["12/22/91", "Shoot", "Hiromitsu Kanehara", "UWF-i, vs. Masakazu Maeda."], ["12/22/91", "Shoot", "Masakazu Maeda", "UWF-i."], ["1991", "Indies", "Little Guido", "NJ. Shoot-style base."], ["1991", "Europe", "Alex Wright", "CWA, age 16. Son of Steve Wright."], ["1991", "Joshi", "Rie Tamada", "AJW class of '91."], ["1/11/92", "Joshi", "Michiko Omukai", "AJW. Delayed by injury."]];

// Headline ticker: newest first. The site shows at most 15, keeping every promotion's newest (Sean, 2026-11-11).
const TICKER = [
 [
  "<b>NJPW</b> Pegasus Kid is off the tour; Liger needs a Sumo Hall challenger",
  "njpw-pegasus-off-tour"
 ],
 [
  "<b>NJPW</b> Hiroshima: Samoans beat down Hirata; Pegasus Kid hurts his neck",
  "njpw-hirata-stands-up"
 ],
 [
  "<b>NJPW</b> Observer: Hashimoto no-shows, Mutoh & Chono go ****",
  "njpw-observer-hiroshima-0714"
 ],
 [
  "<b>CMLL</b> Guadalajara: the Dinamitas pin Konnan twice",
  "cmll-dinamitas-stun-guadalajara"
 ],
 [
  "<b>CMLL</b> Observer: Octagón vs. Espectro Jr. goes ****1/4",
  "cmll-observer-coliseo-0713"
 ],
 [
  "<b>CMLL</b> Tercias semis set: Chavo shoves Fuerza aside",
  "cmll-chavo-pushes-fuerza"
 ],
 [
  "<b>WCW</b> Bash: Lex Luger wins the World Title in the cage",
  "wcw-bash91-luger-gold"
 ],
 [
  "<b>WCW</b> Observer: Cactus Jack upsets Vader, then goes out hurt",
  "wcw-observer-bash91"
 ],
 [
  "<b>WCW</b> From the Road: Cactus Jack, \"I beat Big Van Vader\"",
  "wcw-diary-cactus-bash91"
 ],
 [
  "<b>USWA</b> Kerry steals the pin from Bret in Louisville",
  "uswa-kerry-steals-the-pin"
 ],
 [
  "<b>WWF</b> WrestleFest: Hogan retains, Sid strikes, LOD save",
  "wwf-wrestlefest-recap"
 ],
 [
  "<b>AJPW</b> Breaking: Kawada is leaving All Japan; last date Okayama 7/15",
  "ajpw-kawada-leaving"
 ],
 [
  "<b>ASW</b> Observer: three shows in, three sellouts, and Big Daddy arrives",
  "asw-observer-three-shows"
 ],
 [
  "<b>POWER PRO</b> Jericho retains with the Lion Tamer",
  "pp-jericho-keeps-the-belt"
 ],
 [
  "<b>TWA</b> Idol wins with his feet on the ropes",
  "twa-feet-on-the-ropes"
 ]
];

FINANCE._streams = ["Merchandise", "TV rights", "Pay-per-view share", "Home video", "900 hotline", "Licensing", "Programs & magazines", "Concessions & parking", "Talent loan fees", "Sponsorships"];
// Front page: lead, rest of the world, backstage, breaking, booker's desk. Refreshed each time the world clock advances.
const FRONT = {"asOf": "1991-07-14", "lead": {"p": "wcw", "kicker": "WCW · The Great American Bash · Baltimore", "id": "wcw-bash91-luger-gold", "title": "Luger Locks In the Gold", "dek": "Lex Luger wins the new World Title in the cage, Cactus Jack shocks Vader, and Rude tells Sting he's next.", "paras": ["Lex Luger is the WCW World Heavyweight Champion. He piledrove Barry Windham inside the cage in Baltimore at 23:07 to win the new belt, in a four-star main event that ended without the Harley Race distraction or Mr. Hughes chair the office had planned. Windham is expected to chase him all August, with Ron Simmons lined up behind him.", "Sting made Nikita Koloff submit to keep the U.S. Title, and Rick Rude, with Paul E. Dangerously's phone doing the dirty work, beat Rick Steiner and told Sting he's next. Cactus Jack upset Big Van Vader with a double-arm DDT, then left with a back injury that will keep him out for weeks. Tom Zenk debuted by tearing up Paul E.'s contract. 7,000 fans paid $126,000, and 120,000 homes bought the show."]}, "rest": [["wwf", "WWF · WrestleFest", "wwf-wrestlefest-recap", "Sid Sends a Message", "Hogan kept the WWF Title over Sgt. Slaughter with Jim Duggan refereeing, then Sid Justice powerbombed him until the Legion of Doom made the save. The Ultimate Warrior hurt his neck losing to the Undertaker, and the Rockers shoved each other after losing to the Nasty Boys."], ["uswa", "USWA · Louisville", "uswa-kerry-steals-the-pin", "Kerry Steals the Pin", "Kerry Von Erich pinned Jamie Dundee, taking the win from his partner Bret Hart. Steve Austin and Diamond Studd went **** to a double count-out, and Flair vs. Terry Funk is set for Dallas on 7/20."], ["ajpw", "AJPW · Hiroshima", "ajpw-super-generation-answers", "Super Generation Answers Jumbo", "Misawa pinned Gordy with the Tiger Driver, and Jumbo Tsuruta finally spoke. Funk and the Malenkos went ****3/4 in the match of the tour."], ["njpw", "NJPW · Hiroshima", "njpw-hirata-stands-up", "The Samoans Leave a Mark", "Afa cost the Samoans the main event, so they beat down Hirata anyway. Mutoh & Chono went **** with Fujinami & Koshinaka, and Pegasus Kid hurt his neck beating Kido."], ["cmll", "CMLL · Guadalajara", "cmll-dinamitas-stun-guadalajara", "The Dinamitas Silence Guadalajara", "Rayo won the first fall at home, then Cien Caras and Universo 2000 pinned Konnan twice. The Tercias semifinals are set after Chavo shoved Fuerza aside for the pin on Saturday."]], "backstage": [["wcw", "WCW · Backstage", "wcw-observer-bash91", "Cactus Wins, Then Goes Down", "Cactus Jack hurt his back beating Vader and is out 20 WCW cards. His taped WCW Pro segments still air. And 7,000 fans is barely half a house in Baltimore."], ["wwf", "WWF · Backstage", "wwf-observer-wrestlefest-0714", "The Warrior Is Out", "The Ultimate Warrior's neck injury will keep him out past SummerSlam. Marty Jannetty's deal is running out just as the Rockers start shoving each other."], ["uswa", "USWA · Business", "uswa-observer-louisville-0713", "$67,500 for a House Show", "Louisville drew $67,500 without TV. Austin and Studd stole it, Steiner and Tully got only 5:38, and Dennis Condrey gave notice."], ["uswa", "USWA · Backstage", "uswa-big-gold", "Whose Belt Is It?", "Flair has Big Gold in Memphis. WCW wants it back, and the argument is about an old deposit. Bret Hart and Flair could end up with two world titles in one ring."], ["ajpw", "AJPW · Backstage", "ajpw-observer-hiroshima-0713", "The Young Boys Steal It", "Masao Inoue had the opener of the tour in Hiroshima, and the biggest news happened in the dressing room: Kawada gave notice."], ["cmll", "CMLL · Business", "cmll-the-ceiling", "The 10,500 Ceiling", "Arena México is 95 percent full on Fridays. A Verano sellout at $16.20 would be $170,100. The only way up is the ticket price."], ["pp", "Power Pro · Backstage", "pp-young-lions-abroad", "Young Lions Abroad", "The Lightning Kid is the first Power Pro student on excursion in Mexico. Chris Benoit could be next. Jericho isn't going anywhere with the belt."], ["asw", "All Star · Backstage", "asw-two-passports", "Two Passports", "Black Magic is on the All Star roster but hasn't worked a camp date. He's 0–3 in Mexico, with a ****1/2 match against Casas."]], "breaking": [["ajpw-kawada-leaving", "Kawada is leaving All Japan", "Toshiaki Kawada gave notice in Hiroshima. His last date is Okayama on Monday, with the World Tag titles on the line, and the dressing room says he's headed to New Japan."], ["wcw-rude-awakening-greenville", "Paul E.'s men take out Dustin", "Rude, Eaton and Paul E. ambushed Dustin Rhodes in Greenville the night before the Bash. Rude Awakening on the injured neck; he's out until the fall."], ["njpw-pegasus-off-tour", "Pegasus Kid is off the tour", "Pegasus Kid's neck injury from Hiroshima ends his Summer Crush. Jushin Liger's IWGP Junior Title defense at Sumo Hall on 7/30 needs a new challenger."]], "desk": ["<b>Autumn Armageddon</b> is name-checked by both WCW and USWA, with no date.", "<b>SummerSlam vs. the Omni:</b> WWF and WCW go head to head again on 8/25.", "<b>Kawada's next stop:</b> the rumors say New Japan. All Japan needs a new partner for Misawa.", "<b>WCW tag titles</b> are crowned in Johnson City 7/20. Cactus Jack is out 20 cards.", "<b>Flair vs. Funk</b> in Dallas 7/20, and Big Gold vs. the Unified Title still hangs over the USWA.", "<b>Hansen/Spivey</b> double-booked between AJPW and USWA.", "<b>Titles to establish:</b> NJPW, AJPW Triple Crown, CMLL World Trios (Tercias final 7/26).", "<b>Davey Boy Smith</b> is out of WWF until about 7/29. <b>Steamboat's return</b>: spring 1992."]};

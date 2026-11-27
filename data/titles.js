/* Title histories for every promotion: the lineages behind the Championship Ledger (titles.html) and the
   Championships section of each Talent File. One entry per reign: c = champion, w = date won, e = event,
   h = how, r = rating, d = days held, cur = current champion, def = defenses [date, how, rating], v = vacancy. */
const TITLE_LEDGER = [
{id:"uswa",name:"USWA",full:"United States Wrestling Association",home:"Memphis, TN",c:"#4f78c4",asof:"7/20/1991",url:"https://shovan123-lang.github.io/USWA/HTML/WELCOME.HTM",titles:[
 {t:"Unified World Heavyweight",L:[
  {v:1,w:"9/1/1990",e:"Championship TV S1E1",h:"Vacant. Eddie Marlin announces a one-night tournament for October 8 at the Mid-South Coliseum."},
  {c:"Jerry Lawler",w:"10/8/1990",e:"Unified Title Tournament, Memphis",h:"Tournament final: Lawler made Terry Funk submit to a sleeperhold in 9:26.",r:"***3/4",d:105,def:[
   ["10/16/1990","Lawler pinned Terry Funk with the piledriver in 12:34.","****"],
   ["10/18/1990","Lawler pinned Terry Funk after a fistdrop in 23:19.","***3/4"],
   ["10/19/1990","Lawler pinned Terry Funk with the piledriver in 35:18.","*****"],
   ["10/29/1990","Cage match: Lawler pinned Terry Funk with the piledriver in 13:38.","***1/2"],
   ["11/5/1990","Lawler pinned Dick Murdoch with the piledriver in 20:41.","****"],
   ["11/12/1990","Lawler pinned Dick Murdoch with the piledriver in 25:49.","****"],
   ["11/22/1990","Barbed wire match: Lawler pinned Terry Funk with the piledriver in 20:25.","****1/4"],
   ["1/19/1991","Lawler beat Robert Fuller by countout in 14:45.","***1/4"]]},
  {c:"Andre the Giant",w:"Jan. 1991",e:"Gauntlet For The Gold",h:"Andre pinned Jerry Lawler with the elbowdrop in 5:23.",r:"**1/2",d:42,def:[
   ["2/23/1991","Andre beat Robert Fuller by disqualification in 7:25.","*3/4"]]},
  {c:"Bret Hart",w:"3/4/1991",e:"Fully Loaded, Memphis",h:"No-countout, no-DQ: Hart pinned Andre the Giant with an inside cradle in 27:50.",r:"**1/4",d:135,cur:1,def:[
   ["4/8/1991","Hart made Jacques Rougeau submit to the Sharpshooter in 21:22.","*****"],
   ["4/13/1991","Hart and Eddie Gilbert went to a draw in 1:00:11.","****1/4"],
   ["4/27/1991","Hart made Toshiaki Kawada submit to a scorpion deathlock in 34:12.","*****3/4"],
   ["7/1/1991","Hart made Kerry Von Erich submit to the Sharpshooter in 30:16.","****1/4"]]}
 ]},
 {t:"Southern Heavyweight",L:[
  {v:1,w:"9/1/1990",e:"Championship TV S1E1",h:"The title is vacant when the USWA archive begins."},
  {c:"Dick Slater",w:"9/1/1990",e:"Championship TV S1E1",h:"For the vacant title: Slater pinned Dustin Rhodes with the piledriver in 8:03.",r:"*1/2",d:47,def:[
   ["9/3/1990","Managers banned from ringside: Dustin Rhodes beat Slater by disqualification.","**1/2"],
   ["9/10/1990","Special referee Robert Fuller: Dustin Rhodes beat Slater by disqualification.","*1/4"],
   ["9/22/1990","Slater pinned Robert Fuller with the piledriver in 11:09.","**1/4"],
   ["10/1/1990","Slater pinned Steven Doll with the piledriver in 2:09.","-3/4*"]]},
  {c:"Robert Fuller",w:"10/18/1990",e:"Louisville, KY",h:"Fuller made Dick Slater submit to the Fuller Leglock in 13:15.",r:"**3/4",d:35,def:[
   ["10/22/1990","Fuller beat Dick Slater, who passed out in the Fuller Leglock.","****1/4"],
   ["10/23/1990","Fuller made Sweet Daddy Falcone submit to the Fuller Leglock in 9:16.","**1/4"],
   ["10/26/1990","Fuller made Sweet Daddy Falcone submit to the Fuller Leglock in 10:55.","**"],
   ["10/27/1990","Fuller beat The Masked Avenger, who passed out in the Fuller Leglock.","***"],
   ["10/30/1990","Fuller pinned Dutch Mantell with a small package in 23:20.","****1/4"],
   ["11/8/1990","Fuller beat Billy Joe Travis, who passed out in the Fuller Leglock.","***3/4"],
   ["11/19/1990","Fuller pinned Billy Joe Travis after a piledriver in 14:01.","**1/2"]]},
  {c:"Eddie Gilbert",w:"11/22/1990",e:"Thanksgiving Thunder 1990",h:"Gilbert pinned Robert Fuller with the piledriver in 17:17.",r:"***1/2",d:60,def:[
   ["12/3/1990","Gilbert pinned Dustin Rhodes with the piledriver in 12:16.","***1/4"]]},
  {c:"Jeff Jarrett",w:"Jan. 1991",e:"Gauntlet For The Gold",h:"Jarrett pinned Eddie Gilbert after a bodypress in 13:14.",r:"***1/4",d:21,def:[
   ["1/28/1991","Jarrett pinned Honky Tonk Man with a second-rope dropkick in 18:51.","***1/2"],
   ["2/1/1991","Jarrett beat Eddie Gilbert by countout in 9:10.","**3/4"],
   ["2/2/1991","Jarrett beat Scotty Flamingo by disqualification in 23:41.","**3/4"],
   ["2/9/1991","Eddie Gilbert beat Jarrett by countout in 14:15.","***1/2"]]},
  {c:"Steve Austin",w:"2/11/1991",e:"Memphis, TN",h:"Austin pinned Jeff Jarrett after hitting him with a fire extinguisher in 8:03.",r:"**3/4",d:156,cur:1,def:[
   ["3/1/1991","Austin pinned Jeff Jarrett with the Stun Gun in 15:33.","***1/4"],
   ["3/4/1991","No-countout, no-DQ: Austin pinned Jeff Jarrett in 13:54.","***1/4"],
   ["3/29/1991","Austin pinned Sweet Daddy Falcone in 6:12.","*1/4"],
   ["3/30/1991","Austin pinned Robert Fuller with the Stun Gun in 21:57.","***1/2"],
   ["4/8/1991","Austin pinned Sam Houston after a headlock takedown in 5:55.","***1/4"],
   ["5/11/1991","Austin pinned Toshiaki Kawada with the Stun Gun in 20:21.","***1/2"],
   ["5/24/1991","Austin pinned Nightmare Danny Davis with the Stun Gun in 10:26.","**3/4"],
   ["6/1/1991","Managers banned from ringside: Austin pinned The Spellbinder with the Stun Gun.","***1/2"],
   ["7/1/1991","Austin pinned Brickhouse Brown with the Stun Gun in 15:05.","***"],
   ["7/13/1991","Austin and Diamond Studd went to a double countout in 21:15.","****"]]}
 ]},
 {t:"World Tag Team",L:[
  {v:1,w:"9/1/1990",e:"Championship TV S1E1",h:"Stripped from Don Harris & Brian Lee after they refused to sign exclusive USWA contracts."},
  {c:"The Dirty White Boys",m:"Dirty White Boy & Tom Burton",w:"10/4/1990",e:"Tag Team Frenzy, Louisville",h:"Won a six-team elimination match for the vacant titles.",r:"**1/4",d:37,def:[
   ["10/9/1990","Beat the Viet Cong Express.","***"],
   ["10/15/1990","Against Jeff Jarrett & Jeff Gaylord — no decision.","****1/4"],
   ["10/16/1990","Beat Jeff Jarrett & Jeff Gaylord.","**1/4"],
   ["10/19/1990","Beat Jeff Jarrett & Jeff Gaylord.","**1/4"],
   ["10/22/1990","Beat Jeff Jarrett & Jeff Gaylord.","**1/2"],
   ["10/26/1990","Beat the Southern Rockers.","***"],
   ["11/1/1990","Beat Scott Taylor & Joey Maggs.","**1/4"]]},
  {c:"The Nightmares",m:"Danny Davis & Ken Wayne",w:"11/10/1990",e:"Championship TV S1E11",h:"Danny Davis pinned Tom Burton with the flying stomp in 8:20.",r:"*1/2",d:72,def:[
   ["1/14/1991","Beat the Hart Foundation.","**1/2"]]},
  {c:"The Steiner Brothers",m:"Rick & Scott Steiner",w:"Jan. 1991",e:"Gauntlet For The Gold",h:"Scott Steiner pinned Nightmare Danny Davis after a powerslam in 17:51.",r:"***3/4",d:49,def:[
   ["1/28/1991","Beat the Nightmares.","**1/2"],
   ["2/25/1991","Beat the Moondogs.","***1/4"],
   ["3/1/1991","Beat the Twilight Zone.","**3/4"],
   ["3/4/1991","No-countout, no-DQ: the Steiners retained.","****3/4"]]},
  {c:"The Von Erich Brothers",m:"Kerry & Kevin Von Erich",w:"3/11/1991",e:"Memphis, TN",h:"Kevin Von Erich made Rick Steiner submit to a wristlock in 34:41.",r:"*****",d:47,def:[
   ["3/30/1991","Title could change on a DQ or countout: the Von Erichs retained.","**1/4"]]},
  {c:"The Steiner Brothers",m:"Rick & Scott Steiner",w:"4/27/1991",e:"The Three Way Dance, Memphis",h:"Three-way over the Von Erichs and Dutch Mantell & Jerry Lawler; Scott Steiner pinned Mantell after a powerslam in 26:53.",r:"****",d:70,def:[
   ["5/24/1991","Beat Honky Tonk Man & Dirty White Boy.","***1/4"]]},
  {c:"Scott Steiner & Tully Blanchard",w:"7/6/1991",e:"Championship TV S2E26",h:"Recognized as champions: Scott Steiner hands Tully Blanchard one of the belts and Eddie Marlin announces them as champions.",d:11,cur:1,def:[]}
 ]},
 {t:"Television",L:[
  {v:1,w:"4/24/1991",e:"Worldwide S1E1",h:"Eddie Marlin announces the new USWA Television Title, to be decided by a tournament."},
  {c:"Bill Dundee",w:"6/21/1991",e:"Friday Night Fights, Nashville",h:"Tournament final: Dundee pinned Brickhouse Brown after a dragon suplex in 3:13.",r:"***",d:26,cur:1,def:[
   ["6/28/1991","Andre the Giant beat Dundee by countout in 12:42.","1/2*"],
   ["7/10/1991","Dundee pinned Chris Adams with the piledriver in 17:10.","**1/2"]]}
 ]}
]},
{id:"wcw",name:"WCW",full:"World Championship Wrestling",home:"Atlanta, GA",c:"#6d6be0",asof:"7/23/1991",url:"https://shovan123-lang.github.io/WCW1/HTML/WELCOME.HTM",titles:[
 {t:"World Heavyweight",L:[
  {v:1,w:"7/6/1991",e:"Saturday Night, Atlanta",h:"Jim Herd announces Ric Flair is gone and the title is vacant. A new belt is unveiled; the champion will be crowned in a cage at the Great American Bash."},
  {c:"Lex Luger",w:"7/14/1991",e:"Great American Bash 1991",h:"Cage match for the vacant title: Luger pinned Barry Windham after a piledriver in 23:07.",r:"****",d:4,def:[]},
  {c:"Nikita Koloff",w:"7/18/1991",e:"House show, Cleveland",h:"Koloff beat Lex Luger, who passed out in a front facelock, in 23:17.",r:"***1/2",d:5,cur:1,def:[
   ["7/19/1991","Koloff beat Lex Luger by disqualification in 15:23 when Harley Race and Mr. Hughes interfered.","**3/4"],
   ["7/22/1991", "House show, Nashville: Koloff beat Lex Luger by count-out in 16:21.", "*1/4"],
   ["7/23/1991", "House show, Inglewood: Koloff and Lex Luger went to a double count-out in 16:56. Koloff kept the title.", "*3/4"]]}
 ]},
 {t:"United States Heavyweight",L:[
  {c:"Sting",w:null,e:null,h:null,x:"Lost 7/19/1991",def:[
   ["7/2/1991","Sting made Kevin Sullivan submit to the Scorpion Deathlock in 10:06.","**1/2"],
   ["7/4/1991","Sting beat Abdullah the Butcher, who passed out in the Scorpion Deathlock.","***"],
   ["7/8/1991","Sting beat Ozz, who passed out in the Scorpion Deathlock, in 12:16.","**3/4"],
   ["7/12/1991","Sting beat Arn Anderson, who passed out in the Scorpion Deathlock.","***3/4"],
   ["7/14/1991","Sting made Nikita Koloff submit to the Scorpion Deathlock in 18:44.","***1/2"],
   ["7/16/1991","Sting pinned Bill Irwin after a diving crossbody.","*1/4"]]},
  {c:"Rick Rude",w:"7/19/1991",e:"House show, Charleston, WV",h:"Rude pinned Sting with a vertical facebuster in 27:07 after Paul E. Dangerously interfered. It was Sting's last WCW date.",r:"****3/4",d:4,cur:1,def:[]}
 ]},
 {t:"World Tag Team",L:[
  {v:1,w:"7/2/1991",e:"Ritz-Epps Center, Ft. Bragg, NC",h:"The tag titles are vacant. A one-night tournament is advertised for Johnson City on 7/20."},
  {c:"The Fabulous Freebirds",m:"Michael Hayes & Jimmy Garvin",w:"7/20/1991",e:"Saturday Night, Johnson City",h:"Won the one-night tournament: beat the Bruise Brothers (Hayes victory roll on Don Harris, 10:49), then the Young Pistols in the final when Hayes pinned Tracy Smothers with a DDT after Diamond Dallas Page tripped him, 12:44.",r:"***",d:3,cur:1,def:[
   ["7/21/1991","House show, Knoxville: Michael Hayes pinned Jim Brunzell of the Killer Bees with the DDT in 10:07.","**1/2"],
   ["7/22/1991", "House show, Nashville: the Young Pistols won by disqualification in 18:51 when Paul E. Dangerously interfered against Tracy Smothers. The Freebirds kept the titles.", "**1/2"],
   ["7/23/1991", "House show, Inglewood: Michael Hayes pinned the Junk Yard Dog with the DDT in 12:42 to beat Tracy Smothers & JYD.", "*"]]}
 ]},
 {t:"World Television",L:[
  {v:1,w:"7/9/1991",e:"WCW Pro TV taping",h:"The title is vacant. A tournament on WCW Pro will crown the new champion; it is under way."}
 ]}
]},
{id:"wwf",name:"WWF",full:"World Wrestling Federation",home:"Stamford, CT",c:"#3b9be0",asof:"7/21/1991",url:"https://shovan123-lang.github.io/WWF/HTML/WELCOME.HTM",titles:[
 {t:"World Heavyweight",L:[{c:"Hulk Hogan",cur:1,def:[
   ["7/14/1991","Special referee Jim Duggan: Hogan pinned Sgt. Slaughter with the big leg drop.","**3/4"],
   ["7/21/1991","Hogan pinned the Warlord with the big leg drop in 13:44. Harvey Wippleman interfered; Sid Justice in the Warlord's corner. Maple Leaf Gardens, Toronto.","-*1/2"]]}]},
 {t:"Intercontinental Heavyweight",L:[{c:"Mr. Perfect",cur:1,def:[
   ["7/5/1991","Perfect pinned Davey Boy Smith with the Perfect-Plex in 17:35.","***1/2"],
   ["7/8/1991","Perfect pinned Tito Santana after outside interference in 24:16.","**1/4"],
   ["7/14/1991","Perfect pinned Owen Hart with a roll-up in 15:14.","***"],
   ["7/20/1991","Perfect pinned Dino Bravo with the Perfect-Plex in 12:09 after Bobby Heenan tripped Bravo.","**"],
   ["7/21/1991","Perfect pinned SATO with the Perfect-Plex in 14:03 after Bobby Heenan grabbed SATO's foot on the top rope. Maple Leaf Gardens, Toronto.","****1/4"]]}]},
 {t:"World Tag Team",L:[{c:"The Nasty Boys",m:"Brian Knobbs & Jerry Sags",x:"Lost 7/20/1991",def:[
   ["7/1/1991","Beat the Rockers.","**1/4"],
   ["7/10/1991","Beat the Legion of Doom.","*1/2"],
   ["7/14/1991","Beat the Rockers.","***"]]},
  {c:"The Legion of Doom",m:"Road Warrior Hawk & Road Warrior Animal",w:"7/20/1991",e:"Broadcast house show, the Spectrum, Philadelphia",h:"Death Match, first to seven falls: LOD beat the Nasty Boys 7 falls to 4 in 55:59. Hawk took all seven, two by disqualification for Jimmy Hart's interference.",r:"**1/2",d:1,cur:1,def:[["7/21/1991","Hawk pinned Hercules with a flying clothesline in 11:40 to beat Power & Glory. Animal hurt his elbow. Maple Leaf Gardens, Toronto.","**3/4"]]}]},
 {t:"Million Dollar Championship",holder:"Ted DiBiase",note:"No title matches in the archive yet."}
]},
{id:"ajpw",name:"AJPW",full:"All Japan Pro Wrestling",home:"Tokyo",c:"#e8252d",asof:"7/23/1991",url:"https://shovan123-lang.github.io/AJPW/HTML/WELCOME.HTM",titles:[
 {t:"Triple Crown Heavyweight",L:[{c:"Jumbo Tsuruta",cur:1,def:[
   ["7/3/1991","Jumbo pinned Toshiaki Kawada with the Jumbo knee in 9:13.","***"],
   ["7/15/1991","Jumbo pinned Kenta Kobashi with a backdrop driver in 18:55.","****1/4"],
   ["7/19/1991","Jumbo pinned Dory Funk Jr. with a backdrop driver in 16:40.","***3/4"]]}]},
 {t:"World Tag Team",L:[
  {c:"Misawa & Kawada",m:"Mitsuharu Misawa & Toshiaki Kawada",x:"Lost 7/15/1991",def:[
   ["7/11/1991","Beat Rick Rude & Abdullah the Butcher.","***1/2"]]},
  {c:"Miracle Violence Connection",m:"Steve Williams & Terry Gordy",w:"7/15/1991",e:"Okayama Budokan (Night 8)",h:"Terry Gordy pinned Kawada after a powerbomb in 20:21.",r:"****",d:8,cur:1,def:[
   ["7/19/1991","Gordy pinned Tommy Rogers with a powerbomb in 18:28 to beat the Fantastics.","***3/4"],
   ["7/23/1991", "Yokohama Cultural Gymnasium (Night 12): Steve Williams pinned Kenta Kobashi with the Doctor Bomb in 23:25 to beat Misawa & Kobashi.", "***1/2"]]}
 ]},
 {t:"All Asia Tag Team",L:[{c:"The Can-Am Express",m:"Doug Furnas & Dan Kroffat",cur:1,def:[
   ["7/1/1991","Beat the Fantastics.","**3/4"],
   ["7/5/1991","Retained in a match alongside the Miracle Violence Connection.","**3/4"],
   ["7/9/1991","Beat Kenta Kobashi & Akira Taue.","****1/4"],
   ["7/11/1991","Beat Yoshinari Ogawa & Masao Inoue.","***1/4"],
   ["7/17/1991","Kroffat pinned Davey Boy Smith with a tiger driver to beat the British Bulldogs in 15:06.","***1/4"]]}]},
 {t:"World Junior Heavyweight",note:"To confirm. No title matches in the archive yet."}
]},
{id:"njpw",name:"NJPW",full:"New Japan Pro Wrestling",home:"Tokyo",c:"#f0a800",asof:"7/22/1991",url:"https://shovan123-lang.github.io/NJPW/HTML/WELCOME.HTM",titles:[
 {t:"IWGP Heavyweight",L:[{c:"Riki Choshu",cur:1,def:[
   ["7/4/1991","Choshu pinned Bam Bam Bigelow with the Riki lariat in 25:55.","*****"],
   ["7/6/1991","Choshu pinned Mike Rotunda with the Riki lariat in 15:08.","**1/2"]]}]},
 {t:"IWGP Tag Team",L:[
  {c:"Hase & Sasaki",m:"Hiroshi Hase & Kensuke Sasaki",x:"Lost 7/5/1991",def:[
   ["7/4/1991","Beat Junji Hirata & Shinya Hashimoto.","***"]]},
  {c:"Hirata & Hashimoto",m:"Junji Hirata & Shinya Hashimoto",w:"7/5/1991",e:"Summer Crush '91, Niigata City Gym",h:"Hirata pinned Hase with the Machine Suplex in 15:37.",r:"**",d:17,cur:1,def:[
   ["7/19/1991","Hashimoto pinned Hiroshi Hase with an ax kick in 18:21 to beat Hase & Sasaki.","**1/4"]]}
 ]},
 {t:"IWGP Junior Heavyweight",L:[{c:"Jushin Liger",cur:1,def:[
   ["7/5/1991","Liger pinned El Samurai with a moonsault in 10:55.","***3/4"]]}]}
]},
{id:"cmll",name:"CMLL",full:"Consejo Mundial de Lucha Libre",home:"Arena México",c:"#3f6fd8",asof:"7/21/1991",url:"https://shovan123-lang.github.io/CMLL/HTML/WELCOME.HTM",titles:[
 {t:"Mexican National Heavyweight",L:[{c:"Konnan",cur:1,def:[
   ["7/8/1991","Konnan beat Vampiro Canadiense by disqualification in 14:30.","*1/4"],
   ["7/17/1991","Cien Caras beat Konnan by countout in 15:54 in Acapulco; the title can't change on a countout.","*3/4"]]}]},
 {t:"Mexican National Light Heavyweight",L:[{c:"El Dandy",cur:1,def:[
   ["7/6/1991","El Dandy pinned Blue Panther with the Dandina cradle in 13:03.","****1/4"]]}]},
 {t:"Mexican National Tag Team",L:[
  {c:"Volador & El Hijo del Santo",w:"7/5/1991",e:"Viernes Espectacular",h:"Two out of three falls for the vacant titles, captain's rules: beat Los Infernales (MS-1 & Satánico) 3 falls to 0.",r:"***1/2",d:16,cur:1,def:[
   ["7/13/1991","Beat Jerry Estrada & Javier Cruz.","****"]]}
 ]},
 {t:"CMLL World Trios",note:"To be crowned. No title matches in the archive yet."}
]},
{id:"asw",name:"ASW",full:"All Star Wrestling",home:"Great Britain",c:"#e0202f",asof:"7/17/1991",url:"https://shovan123-lang.github.io/ASW/HTML/WELCOME.HTM",titles:[
 {t:"British Heavyweight",L:[{c:"Giant Haystacks",cur:1,def:[
   ["7/6/1991","Haystacks beat Johnny Saint by countout in 16:00.","1/2*"],
   ["7/10/1991","Haystacks beat Robbie Brookside by disqualification when Big Daddy interfered.","*1/2"]]}]},
 {t:"British Heavy-Middleweight",note:"To establish. No title matches in the archive yet."},
 {t:"British Tag Team",note:"To establish. No title matches in the archive yet."}
]},
{id:"twa",name:"TWA",full:"Tri-State Wrestling Alliance",home:"Philadelphia, PA",c:"#c93a46",asof:"7/19/1991",url:"https://shovan123-lang.github.io/TriState/HTML/WELCOME.HTM",titles:[
 {t:"TWA Heavyweight",note:"Vacant. A tournament is under way."},
 {t:"TWA Tag Team",note:"To establish. No title matches in the archive yet."},
 {t:"TWA Television",note:"To establish. No title matches in the archive yet."}
]},
{id:"powerpro",name:"Power Pro",full:"Power Pro Wrestling",home:"Memphis, TN",c:"#f28c28",asof:"7/28/1991",url:"https://shovan123-lang.github.io/Powerpro/HTML/WELCOME.HTM",titles:[
 {t:"Power Pro Heavyweight",L:[
  {c:"Chris Jericho",w:"6/30/1991",e:"First Strike",h:"For the vacant title: Jericho pinned Marcus Alexander Bagwell with a German suplex in 13:03.",r:"**1/2",d:28,cur:1,def:[
   ["7/28/1991","Jericho beat Bart Gunn, who passed out in the Lion Tamer, in 10:02.","***1/2"]]}
 ]},
 {t:"Power Pro Tag Team",note:"To establish. No title matches in the archive yet."}
]}
];

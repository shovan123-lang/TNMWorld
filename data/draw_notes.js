/* TNM World Wrestling Report: Draw Index write-ups, one edition per World Clock advance.
   Shown on the Draw Index page (#draws): the newest edition dated on or before the world date.
   Written by hand in the Report's voice, kayfabe only. Each item: n (the wrestler's name as on his Talent File),
   title, text. Sections: rise (on the rise), cool (cooling off / lower than the name), watch (ones to watch).
   The numbers on the page (ranks, parts, risers and fallers) come from data/draws.js on their own. */
const DRAW_NOTES = {
  "1991-07-24": {
    title: "TV Makes the Star",
    dek: "The first Draw Index says what promoters have known for years: the wrestlers on television every week are the ones who draw. The Freebirds top the list; Hogan is right behind them.",
    paras: [
      "The Report's first Draw Index runs every working wrestler in ten promotions through the same questions: does he sell tickets, is he on television, does the building come alive for him, is he a star, and are his matches any good? Put that way, the list belongs to the men fans see every Saturday night. Seventeen of the top 25 work for WCW or the WWF, and the top four are all regulars on national TV in America or Japan.",
      "Jimmy Garvin and Michael Hayes are first and third: the Freebirds won the tag titles on TBS and have been the loudest act in WCW since. Hulk Hogan, who drew the biggest house in the world at WrestleFest, is second. The other side of it is Mexico: the Consejo is doing the best business per wrestler anywhere, but none of it has been on television yet, and its stars rank lower for it. The Index moves every week."
    ],
    rise: [
      {n: "Jimmy Garvin", title: "The Freebirds own Saturday night", text: "The Freebirds won the tag tournament final on WCW Saturday Night in Johnson City on July 20, Hayes pinning Smothers after a DDP trip, and they've been on TBS every week since the Bash. Then they took the belts on the road: Knoxville, Nashville, and $156,000 in Inglewood. Nobody in WCW gets a louder reaction than Garvin, and that's how he ends up first in the world."},
      {n: "Riki Chōshu", title: "The champion on TV Asahi", text: "Chōshu is the IWGP champion and the face of World Pro Wrestling: the title defense against Mike Rotunda in Osaka went out on TV Asahi, and so did the Sapporo main event, where he beat Keiji Mutoh and then had Chono's STF locked on him. With the Sumo Hall title match coming, no wrestler in Japan is seen by more people every week."},
      {n: "Rick Steiner", title: "The tournament made him", text: "Steiner beat Arn Anderson in the TV Title quarterfinals on WCW Pro, went ***3/4 with Rick Rude at the Bash, and has beaten the Great Muta clean in their series. Teaming with Barry Windham to beat Rude & Eaton in Inglewood didn't hurt either. Fifth in the world."},
      {n: "Jake Roberts", title: "Everyone knows the DDT", text: "Jake hasn't had a great match all month, but he's been on USA Network's Prime Time, and night after night he's in front of 10,000 or more in Edmonton, Winnipeg, Philadelphia and Toronto. He wins with the DDT, the fans know exactly what's coming, and they buy tickets to see it. Seventh in the world."}
    ],
    cool: [
      {n: "Negro Casas", title: "Mexico's biggest draw, but not on TV", text: "Casas headlined the biggest Arena México house of the year (15,500 and $209,250 on July 19), beat Black Magic at ****1/2 in Puebla, and his box-office number is among the best in the Index. He's 19th because none of it has been on television: the Consejo has no TV on the air yet. When the Televisa tapings start airing, watch him climb."},
      {n: "The Mountie", title: "The best matches nobody saw", text: "Match of the night at WrestleFest, ****1/4 with Snuka in Philadelphia, ****1/4 over Shane Douglas in Toronto. The Mountie is the best worker in the WWF right now, but he hasn't been on one of its TV shows all month, and that keeps him 50th. One week on Superstars would change that."},
      {n: "Black Magic", title: "Great matches, no wins, no TV", text: "Black Magic has had two ****1/2 matches this month, including the loss to Casas in Puebla, and was in the $209,250 main event at Arena México. But he's 0 for 6, and he hasn't been on television anywhere. Fans can't get behind a man who never wins and never gets seen. 91st."},
      {n: "Hulk Hogan", title: "Second in the world, and his matches are holding him back", text: "Nobody touches Hogan at the box office, WrestleFest above all, and he's on Superstars every week. What keeps him from first is the Warlord series: a DUD in Saskatoon and -*1/2 for the title defense in Toronto. Fans still bought the tickets. How many more times will they?"},
      {n: "Sting", title: "Starting over in New Japan", text: "Sting's last month in WCW was as good as anyone's: ***** with Vader in Salisbury and ****3/4 losing the U.S. Title to Rick Rude on his way out. But the Index counts where a wrestler is working now, and Japanese fans haven't seen him on TV Asahi yet. He's 53rd until New Japan puts him on in August."},
      {n: "Ric Flair", title: "One night isn't a month", text: "Flair has worked one match in the USWA, a roll-up over Terry Funk in Dallas (***1/4). That puts him 83rd. He came to the USWA to headline, so expect the climb to start once he's on Championship TV every week."},
      {n: "Giant Baba", title: "Out hurt since Chiba", text: "Baba was stretchered out after the Abdullah match in Chiba on July 3 and hasn't wrestled since; he's back after Budokan. The Index only counts what happens in the ring, and his two matches in July were the two lowest-rated in All Japan."},
      {n: "Randy Savage", title: "Not on a card all month", text: "Savage hasn't wrestled on a WWF card or a WWF TV show in July, and a star who isn't working can't draw. He's 293rd, which says more about the calendar than about the Macho Man."}
    ],
    watch: [
      {n: "Stan Hansen", title: "Eleventh in the world, and his Memphis dates are running out", text: "Hansen works both sides of the Pacific, All Japan and Memphis, and he's one of only three men in the top 25 who do. His USWA deal has five dates left. Expect offers."},
      {n: "Terry Funk", title: "Two dates left in Memphis", text: "Funk is 71st and has two dates left on his USWA deal. He lost to Flair in Dallas, but on a roll-up with the tights, and Funk vs. Kevin Von Erich on July 1 was one of the best-rated matches in the world this month."},
      {n: "Bobby Fulton", title: "The other half of the Fantastics", text: "Three dates left with All Japan. Tommy Rogers is the hotter half at 17th, Fulton is 41st, but they draw as a team; if Fulton goes home, the most surprising act on the tour goes with him."}
    ]
  }
};

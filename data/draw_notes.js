/* TNM World Wrestling Report: Draw Index write-ups, one edition per World Clock advance.
   Shown on the Draw Index page (#draws): the newest edition dated on or before the world date.
   Written by hand in the Report's voice, kayfabe only. Each item: n (the wrestler's name as on his Talent File),
   title, text. Sections: rise (on the rise), cool (cooling off / lower than the name), watch (ones to watch).
   The numbers on the page (ranks, parts, risers and fallers) come from data/draws.js on their own. */
const DRAW_NOTES = {
  "1991-07-24": {
    title: "Mexico City Leads the World",
    dek: "The first Draw Index puts Arena México's Negro Casas on top, and two of the biggest names in the business a long way down.",
    paras: [
      "The Report's first Draw Index runs every working wrestler in ten promotions through the same four questions: does he sell tickets, does the building come alive for him, are his matches any good, and is he a star anywhere else? Rank them together and the July list looks nothing like a pay scale. Three of the top eight work for the Consejo, where 15,500 packed Arena México on July 19 for a $209,250 house, and the man who was in that main event and also had one of the best matches of the month is Negro Casas.",
      "Hulk Hogan still drew the biggest house in the world, 51,357 for WrestleFest in St. Louis, and sits fifth. Sting, Ric Flair and Randy Savage are nowhere near the top 25, for three different reasons below. The Index moves every week."
    ],
    rise: [
      {n: "Negro Casas", title: "The best-drawing worker in the world", text: "Casas was in the main event of the biggest Arena México house of the year (15,500 and $209,250 on July 19) and in between beat Black Magic at ****1/2 in Puebla, one of the best singles matches in Mexico all month. Add the tag wins with Felino and nobody in the world scores as high in both the box office and the ring. The Consejo has its franchise and knows it."},
      {n: "The Mountie", title: "Paid like a midcarder, working like a main eventer", text: "Match of the night at WrestleFest against Tito Santana, ****1/4 with Jimmy Snuka in Philadelphia, ****1/4 over Shane Douglas in Toronto. Jimmy Hart's man is the best worker in the WWF right now, and he's been in main events in Winnipeg and Richfield. Sixth in the world, and the office still pays him like a midcard act."},
      {n: "Tommy Rogers", title: "The Fantastics are a draw in Japan", text: "The upset roll-up on Dan Spivey in Kanazawa got them noticed; the tag title challenge to the Miracle Violence Connection in Fukuoka on July 19 drew $128,250, the second-best gate of the All Japan tour. Rogers is the one the crowds react to, and he's seventh in the world. Bobby Fulton is 43rd, and how long they stay a team (see below) is the question."},
      {n: "Jimmy Garvin", title: "The loudest reaction in WCW", text: "No one in Atlanta gets the building going like Garvin. The Freebirds are wearing the tag belts and Paul E. is already talking about taking them. His houses are WCW houses, not WrestleFest, but the crowd number alone puts him fourth."},
      {n: "Atsushi Onita", title: "FMW's crowds are the most loyal anywhere", text: "Nobody in the world gets a bigger reaction for his size of building than Onita, and the Kochi Bunkhouse Brawl, 35 minutes at *****1/4, is one of the three best-rated matches anywhere in July. FMW's halls hold two and three thousand, so the box office keeps him at twelfth. Put him in a bigger room and see."}
    ],
    cool: [
      {n: "Hulk Hogan", title: "The biggest draw, the worst nights", text: "Nobody touches Hogan at the box office: WrestleFest, $284,400 in Philadelphia, $260,000 in Calgary. What keeps him out of the top spot is the Warlord series: a DUD in Saskatoon and -*1/2 for the title defense in Toronto. Fans still bought tickets. The question is how many more times they buy that one."},
      {n: "Lex Luger", title: "The rematch clause is wearing thin", text: "Luger vs. Koloff went ***1/2 in Cleveland, then **3/4, *1/4 in Nashville and *3/4 in Inglewood, with a DQ, a count-out and a double count-out. Inglewood still drew $156,000, so the business is there, but the matches are going the wrong way and the Index has him 13th. Race and Hughes at ringside every night isn't helping."},
      {n: "Sting", title: "Starting over in New Japan", text: "Sting's last month in WCW was one of the best anyone had: ***** with Vader in Salisbury and ****3/4 losing the U.S. Title to Rick Rude in Charleston on his way out. But the Index counts where a wrestler is working now, and the Japanese crowds haven't seen him yet. He's 58th until New Japan puts him in front of them in August."},
      {n: "Ric Flair", title: "One night isn't a month", text: "Flair has worked exactly one match in the USWA, a roll-up over Terry Funk in Dallas (***1/4) in front of 4,500. That alone puts him 52nd. He came to the USWA to headline, so expect the climb to start as soon as he's working every week."},
      {n: "Giant Baba", title: "Out hurt since Chiba", text: "Baba was stretchered out after the Abdullah match in Chiba on July 3 and hasn't wrestled since; he's back after Budokan. The Index only counts what happens in the ring, and his two matches in July were the two worst-rated in All Japan."},
      {n: "Randy Savage", title: "Not on a card all month", text: "Savage hasn't wrestled on a WWF card in July, and a star who isn't working can't draw. He's 273rd, which says more about the calendar than about the Macho Man."}
    ],
    watch: [
      {n: "Stan Hansen", title: "Tenth in the world, and his Memphis dates are running out", text: "Hansen works both sides of the Pacific, All Japan and Memphis, and he's the only wrestler in the top ten who does. His USWA deal has five dates left. Expect offers."},
      {n: "Terry Funk", title: "Two dates left in Memphis", text: "Funk is 31st and has two dates left on his USWA deal. He lost to Flair in Dallas, but on a roll-up with the tights, and Funk vs. Kevin Von Erich on July 1 was one of the best-rated matches in the world this month."},
      {n: "Bobby Fulton", title: "The other half of the Fantastics", text: "Three dates left with All Japan. Rogers is the hotter half, but they draw as a team; if Fulton goes home, the most surprising draw on the tour goes with him."}
    ]
  }
};

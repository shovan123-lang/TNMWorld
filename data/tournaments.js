/* TNM World Wrestling Report: round-robin tournaments (G1 Climax and friends).
   Each promotion can hold one tournament here; it gets its own tab on the promotion page.
   Results are booked plans until the night airs: the page hides them (and the field,
   until it is announced) unless "Show booked finishes" is on.
   m rows: [block, wrestler A, wrestler B, result, finish, time]
   result: the winner's name, or "draw" (time-limit draw or double count-out; 1 point each). */
var TOURNAMENTS = {
  "njpw": {
    "tab": "g1",
    "label": "G1 Climax",
    "title": "G1 Climax 1991",
    "edition": "The first G1 Climax",
    "announce": "1991-07-30",
    "announceNote": "Riki Choshu announces the field and dates at Sumo Hall on July 30.",
    "blurb": "New Japan's first summer heavyweight tournament. Eight men in two blocks of four, every man in a block facing the other three. The two block winners meet in the final at Ryogoku Kokugikan.",
    "rules": "2 points for a win, 1 for a draw (time-limit draw or double count-out). 30-minute time limit. IWGP Heavyweight Champion Riki Choshu's block matches are non-title.",
    "blocks": [
      {"name": "A Block", "field": ["Masahiro Chono", "Sting", "Riki Choshu", "Bam Bam Bigelow"]},
      {"name": "B Block", "field": ["Keiji Mutoh", "Big Van Vader", "Scott Norton", "Tatsumi Fujinami"]}
    ],
    "nights": [
      {"n": "Night 1", "d": "1991-08-07", "city": "Nagoya", "venue": "Aichi Prefectural Gymnasium", "tv": "TV Asahi taping",
       "m": [["B", "Big Van Vader", "Scott Norton", "Big Van Vader", "Vader Bomb", "12:00"],
             ["B", "Keiji Mutoh", "Tatsumi Fujinami", "Keiji Mutoh", "Moonsault", "18:00"],
             ["A", "Masahiro Chono", "Bam Bam Bigelow", "Masahiro Chono", "STF", "16:00"],
             ["A", "Riki Choshu", "Sting", "draw", "Double count-out", "15:00"]]},
      {"n": "Night 2", "d": "1991-08-09", "city": "Tokyo", "venue": "Ryogoku Kokugikan", "tv": "TV taping",
       "m": [["B", "Tatsumi Fujinami", "Big Van Vader", "Tatsumi Fujinami", "Disqualification", "11:00"],
             ["B", "Keiji Mutoh", "Scott Norton", "Keiji Mutoh", "Moonsault", "14:00"],
             ["A", "Sting", "Bam Bam Bigelow", "Sting", "Scorpion Deathlock", "15:00"],
             ["A", "Masahiro Chono", "Riki Choshu", "Masahiro Chono", "STF", "22:00"]]},
      {"n": "Night 3", "d": "1991-08-10", "city": "Tokyo", "venue": "Ryogoku Kokugikan", "tv": "",
       "m": [["B", "Scott Norton", "Tatsumi Fujinami", "Scott Norton", "Powerbomb", "12:00"],
             ["A", "Riki Choshu", "Bam Bam Bigelow", "Riki Choshu", "Riki lariato", "16:00"],
             ["B", "Keiji Mutoh", "Big Van Vader", "draw", "Time-limit draw", "30:00"],
             ["A", "Masahiro Chono", "Sting", "draw", "Time-limit draw", "30:00"]]}
    ],
    "final": {"d": "1991-08-11", "city": "Tokyo", "venue": "Ryogoku Kokugikan", "tv": "TV taping",
              "a": "Masahiro Chono", "b": "Keiji Mutoh", "winner": "Masahiro Chono", "finish": "STF", "time": "24:00",
              "prize": "The winner earns a shot at the IWGP Heavyweight Championship."}
  }
};

/* TNM World Wrestling Report: birth dates for the Talent Files.
   The page works out each wrestler's age from WORLD_DATE (data/world.js), so ages
   move on their own every time the world clock moves. Nothing to update by hand.
   Format: "YYYY-MM-DD", or "YYYY" when only the year is on record (the page then
   shows both possible ages, e.g. "29 or 30").
   Real-world birth dates from public sources; the comment on each line names the
   person and the source. Where sources disagree, the date most of them give is used.
   A wrestler who isn't listed here has no birth date on record yet, and the page
   shows "—" for the age. Add a line to fill one in. */
const BIRTHS = {
  "Abdullah the Butcher": "1941-01-11",   // Lawrence Robert "Larry" Shreve · https://en.wikipedia.org/wiki/Abdullah_the_Butcher
  "Abdullah The Butcher": "1941-01-11",   // Lawrence Robert "Larry" Shreve · https://en.wikipedia.org/wiki/Abdullah_the_Butcher
  "Ace Steel": "1973-01-25",   // Christopher Guy · https://en.wikipedia.org/wiki/Ace_Steel
  "Akihito Ichihara": "1969-01-24",   // real name not given · https://www.luchawiki.org/index.php/Onita_Jr.
  "Akira Nogami": "1966-03-13",   // Akira Nogami · https://en.wikipedia.org/wiki/Akira_Nogami
  "Akira Taue": "1961-05-08",   // Akira Taue · https://en.wikipedia.org/wiki/Akira_Taue
  "Al Snow": "1963-07-18",   // Allen Ray Sarven · https://en.wikipedia.org/wiki/Al_Snow
  "Andre the Giant": "1946-05-19",   // André René Roussimoff · https://en.wikipedia.org/wiki/Andr%C3%A9_the_Giant
  "Ángel Azteca": "1963-06-24",   // Juan Manuel Zúñiga · https://en.wikipedia.org/wiki/%C3%81ngel_Azteca
  "Antonio Inoki": "1943-02-20",   // Kanji Inoki · https://en.wikipedia.org/wiki/Antonio_Inoki
  "Apolo Dantes": "1968-09-28",   // José Luis Amezcua Muñoz · https://en.wikipedia.org/wiki/Apolo_Dant%C3%A9s
  "Arn Anderson": "1958-09-20",   // Martin Anthony Lunde · https://en.wikipedia.org/wiki/Arn_Anderson
  "Art Barr": "1966-10-08",   // Arthur Leon Barr · https://en.wikipedia.org/wiki/Art_Barr
  "Atlantis": "1962-09-28",   // real name not given · https://en.wikipedia.org/wiki/Atlantis_(wrestler)
  "Atsushi Onita": "1957-10-25",   // Atsushi Onita · https://en.wikipedia.org/wiki/Atsushi_Onita
  "Austin Idol": "1949-10-26",   // Michael McCord · https://en.wikipedia.org/wiki/Austin_Idol
  "Ax": "1947-12-27",   // William Reid Eadie · https://en.wikipedia.org/wiki/Ax_(wrestler)
  "B. Brian Blair": "1957-01-12",   // Brian Leslie Blair · https://en.wikipedia.org/wiki/B._Brian_Blair
  "Bad News Brown": "1943-10-22",   // Allen James Coage · https://en.wikipedia.org/wiki/Allen_Coage
  "Bam Bam Bigelow": "1961-09-01",   // Scott Charles Bigelow · https://en.wikipedia.org/wiki/Bam_Bam_Bigelow
  "Barry Windham": "1960-07-04",   // Barry Clinton Windham · https://en.wikipedia.org/wiki/Barry_Windham
  "Bart Gunn": "1965-12-27",   // Michael Polchlopek · https://en.wikipedia.org/wiki/Bart_Gunn
  "Beau Beverly": "1958-03-22",   // Wayne Bloom · https://en.wikipedia.org/wiki/Wayne_Bloom
  "Big Boss Man": "1963-05-02",   // Ray Traylor · https://en.wikipedia.org/wiki/Big_Boss_Man
  "Big Daddy": "1930-11-14",   // Shirley Crabtree Jr. · https://en.wikipedia.org/wiki/Big_Daddy_(wrestler)
  "Big Josh": "1957-07-27",   // Matthew Wade Osborne (Matt Borne) · https://en.wikipedia.org/wiki/Matt_Borne
  "Big Titan": "1970-01-16",   // Rick (Richard) Bognar · https://en.wikipedia.org/wiki/Rick_Bognar
  "Big Van Vader": "1955-05-14",   // Leon Allen White · https://en.wikipedia.org/wiki/Big_Van_Vader
  "Bill Dundee": "1943-10-24",   // William Cruickshanks · https://en.wikipedia.org/wiki/Bill_Dundee
  "Bill Irwin": "1954-09-17",   // Barney William Irwin · https://en.wikipedia.org/wiki/Bill_Irwin_(wrestler)
  "Bill Watts": "1939-05-05",   // William F. Watts Jr. · https://en.wikipedia.org/wiki/Bill_Watts
  "Billy Joe Travis": "1961-04-28",   // Gary Keith Mize · https://en.wikipedia.org/wiki/Billy_Travis
  "Black Bart": "1948-01-30",   // Richard Harris · https://en.wikipedia.org/wiki/Black_Bart_(wrestler)
  "Black Magic": "1965-02-28",   // Norman Anthony Smiley · https://en.wikipedia.org/wiki/Norman_Smiley
  "Blake Beverly": "1963-06-11",   // Michael Enos · https://en.wikipedia.org/wiki/Mike_Enos
  "Blue Panther": "1960-09-18",   // Genaro Vázquez Nevarez · https://www.luchawiki.org/index.php/Blue_Panther
  "Bob Armstrong": "1939-10-03",   // Joseph Melton James · https://en.wikipedia.org/wiki/Bob_Armstrong
  "Bob Backlund": "1949-08-14",   // Robert Louis Backlund · https://en.wikipedia.org/wiki/Bob_Backlund
  "Bobby Duncum Jr.": "1965-08-26",   // Bobby Duncum Jr. · https://en.wikipedia.org/wiki/Bobby_Duncum_Jr.
  "Bobby Eaton": "1958-08-14",   // Bobby Lee Eaton · https://en.wikipedia.org/wiki/Bobby_Eaton
  "Bobby Fulton": "1960-10-04",   // James Franklin Hines · https://en.wikipedia.org/wiki/Bobby_Fulton
  "Bobby Heenan": "1944-11-01",   // Raymond Louis Heenan · https://en.wikipedia.org/wiki/Bobby_Heenan
  "Brad Armstrong": "1962-06-15",   // Robert Bradley James · https://en.wikipedia.org/wiki/Brad_Armstrong_(wrestler)
  "Brazo De Oro": "1959-10-07",   // Jesús Alvarado Nieves · https://en.wikipedia.org/wiki/Brazo_de_Oro_(wrestler)
  "Brazo De Plata": "1963-03-19",   // José Luis Alvarado Nieves · https://en.wikipedia.org/wiki/Brazo_de_Plata
  "Bret Hart": "1957-07-02",   // Bret Sergeant Hart · https://en.wikipedia.org/wiki/Bret_Hart
  "Brian Armstrong": "1969-05-20",   // Brian Girard James · https://en.wikipedia.org/wiki/Road_Dogg
  "Brian Christopher": "1972-01-10",   // Brian Christopher Lawler · https://en.wikipedia.org/wiki/Brian_Christopher
  "Brian Knobbs": "1964-05-06",   // Brian Yandrisovitz · https://en.wikipedia.org/wiki/Brian_Knobbs
  "Brian Pillman": "1962-05-22",   // Brian Pillman · https://en.wikipedia.org/wiki/Brian_Pillman
  "Brickhouse Brown": "1960-08-11",   // Frederick Seawright · https://en.wikipedia.org/wiki/Brickhouse_Brown
  "Brooklyn Brawler": "1961-04-18",   // Steven Kenneth Lombardi · https://en.wikipedia.org/wiki/Steve_Lombardi
  "Bruce Hart": "1950-01-13",   // Bruce Hart · https://en.wikipedia.org/wiki/Bruce_Hart_(wrestler)
  "Brutus Beefcake": "1957-04-21",   // Edward Harrison Leslie · https://en.wikipedia.org/wiki/Brutus_Beefcake
  "Buddy Landell": "1961-08-14",   // William Fritz Ensor · https://en.wikipedia.org/wiki/Buddy_Landel
  "Bunkhouse Buck": "1950-08-01",   // James "Jimmy" Golden · https://en.wikipedia.org/wiki/Bunkhouse_Buck
  "Bushwhacker Butch": "1944-10-21",   // Robert Miller · https://en.wikipedia.org/wiki/Bushwhacker_Butch
  "Bushwhacker Luke": "1947-01-08",   // Brian Wickens · https://en.wikipedia.org/wiki/Bushwhacker_Luke
  "Butch Reed": "1954-07-11",   // Bruce Franklin Reed · https://en.wikipedia.org/wiki/Butch_Reed
  "Buzz Sawyer": "1959-06-14",   // Bruce Alan Woyan · https://en.wikipedia.org/wiki/Buzz_Sawyer
  "Cactus Jack": "1965-06-07",   // Michael Francis Foley · https://en.wikipedia.org/wiki/Mick_Foley
  "Chavo Guerrero": "1949-01-07",   // Salvador Guerrero (Chavo Guerrero Sr.) · https://en.wikipedia.org/wiki/Chavo_Guerrero_Sr.
  "Chris Adams": "1955-02-10",   // Christopher Adams · https://en.wikipedia.org/wiki/Chris_Adams_(wrestler)
  "Chris Benoit": "1967-05-21",   // Christopher Michael Benoit · https://en.wikipedia.org/wiki/Chris_Benoit
  "Chris Candido": "1972-03-21",   // Christopher Barrett Candito · https://en.wikipedia.org/wiki/Chris_Candido
  "Chris Jericho": "1970-11-09",   // Christopher Keith Irvine · https://en.wikipedia.org/wiki/Chris_Jericho
  "Cien Caras": "1949-05-11",   // J. Carmelo Reyes González · https://en.wikipedia.org/wiki/Cien_Caras
  "Coach": "1931-04-05",   // John Tolos · https://en.wikipedia.org/wiki/John_Tolos
  "Colonel Mustafa": "1942-03-15",   // Hossein Khosrow Ali Vaziri (The Iron Sheik) · https://en.wikipedia.org/wiki/The_Iron_Sheik
  "Combat Toyoda": "1967-10-26",   // Noriyo Toyoda · https://en.wikipedia.org/wiki/Noriyo_Toyoda
  "Corporal Kirchner": "1957-09-07",   // Michael James Penzel · https://en.wikipedia.org/wiki/Corporal_Kirchner
  "Crush": "1964-04-14",   // Brian Keith Adams · https://en.wikipedia.org/wiki/Brian_Adams_(wrestler)
  "Dan Kroffat": "1961-09-16",   // Philippe (Phil) Lafon · https://en.wikipedia.org/wiki/Phil_Lafon
  "Dan Spivey": "1952-10-14",   // Daniel Eugene Spivey · https://en.wikipedia.org/wiki/Dan_Spivey
  "Danny Boy Collins": "1967-02-21",   // Daniel Collins · https://en.wikipedia.org/wiki/Danny_Boy_Collins
  "Dave Taylor": "1957-05-01",   // David Taylor · https://en.wikipedia.org/wiki/Dave_Taylor_(wrestler)
  "Davey Boy Smith": "1962-11-27",   // David Smith · https://en.wikipedia.org/wiki/Davey_Boy_Smith
  "Dean Malenko": "1960-08-04",   // Dean Shelly Simon · https://en.wikipedia.org/wiki/Dean_Malenko
  "Debbie Combs": "1959-04-18",   // Deborah Szostecki · https://en.wikipedia.org/wiki/Debbie_Combs
  "Debbie Malenko": "1971-03-10",   // Deborah Killian · https://en.wikipedia.org/wiki/Debbie_Malenko
  "Dennis Condrey": "1952-02-01",   // Dennis Condrey · https://www.thesmackdownhotel.com/wrestlers/dennis-condrey
  "Devon Hughes": "1972-08-01",   // Devon Hughes · https://en.wikipedia.org/wiki/D-Von_Dudley
  "Diamond Dallas Page": "1956-04-05",   // Page Joseph Falkinburg Jr. · https://en.wikipedia.org/wiki/Diamond_Dallas_Page
  "Diamond Studd": "1958-10-20",   // Scott Oliver Hall · https://en.wikipedia.org/wiki/Scott_Hall
  "Dick Murdoch": "1946-08-16",   // Hoyt Richard Murdoch · https://en.wikipedia.org/wiki/Dick_Murdoch
  "Dick Slater": "1951-05-19",   // Richard Van Slater · https://en.wikipedia.org/wiki/Dick_Slater
  "Dino Bravo": "1948-08-06",   // Adolfo Bresciano · https://en.wikipedia.org/wiki/Dino_Bravo
  "Dirty White Boy": "1960-04-12",   // Darrell W. Anthony · https://en.wikipedia.org/wiki/Tony_Anthony
  "Doc Dean": "1970-07-03",   // Ian Dean · https://en.wikipedia.org/wiki/Ian_Dean
  "Don Harris": "1960-10-23",   // Donald Harris · https://prowrestling.fandom.com/wiki/Harris_Brothers
  "Dory Funk Jr.": "1941-02-03",   // Dorrance Earnest Funk · https://en.wikipedia.org/wiki/Dory_Funk_Jr.
  "Dos Caras": "1951-02-21",   // José Luis Rodríguez Arellano · https://en.wikipedia.org/wiki/Dos_Caras
  "Doug Furnas": "1959-12-11",   // Dwight Douglas Furnas · https://en.wikipedia.org/wiki/Doug_Furnas
  "Doug Gilbert": "1969-01-05",   // Douglas Gilbert · https://www.cagematch.net/?id=2&nr=68
  "Dustin Rhodes": "1969-04-11",   // Dustin Patrick Runnels · https://en.wikipedia.org/wiki/Dustin_Rhodes
  "Dynamite Kid": "1958-12-05",   // Tom Billington · https://en.wikipedia.org/wiki/Dynamite_Kid
  "Earthquake": "1963-06-22",   // John Anthony Tenta Jr. · https://en.wikipedia.org/wiki/John_Tenta
  "Eddie Gilbert": "1961-08-14",   // Eddie Gilbert · https://en.wikipedia.org/wiki/Eddie_Gilbert_(wrestler)
  "Eddie Guerrero": "1967-10-09",   // Eduardo Gory Guerrero Llanes · https://en.wikipedia.org/wiki/Eddie_Guerrero
  "Eiji Ezaki": "1968-11-29",   // Eiji Ezaki · https://en.wikipedia.org/wiki/Hayabusa_(wrestler)
  "El Brazo": "1961-07-30",   // Juan Alvarado Nieves · https://en.wikipedia.org/wiki/El_Brazo
  "El Dandy": "1962-10-02",   // Roberto Gutiérrez Frías · https://en.wikipedia.org/wiki/El_Dandy
  "El Gigante": "1966-01-31",   // Jorge González · https://en.wikipedia.org/wiki/Jorge_Gonz%C3%A1lez_(wrestler)
  "El Gran Hamada": "1950-11-27",   // Hiroaki Hamada · https://en.wikipedia.org/wiki/Gran_Hamada
  "El Hijo Del Santo": "1963-08-02",   // Jorge Ernesto Guzman Rodriguez · https://en.wikipedia.org/wiki/El_Hijo_del_Santo
  "El Samurai": "1966-04-19",   // Osamu Matsuda · https://en.wikipedia.org/wiki/El_Samurai
  "Eric Embry": "1959-07-10",   // Eric Embry · https://en.wikipedia.org/wiki/Eric_Embry
  "Eriko Tsuchiya": "1970-02-19",   // Eriko Tsuchiya · https://en.wikipedia.org/wiki/Shark_Tsuchiya
  "Felino": "1964-03-22",   // Jorge Luis Casas Ruiz · https://en.wikipedia.org/wiki/El_Felino
  "Fit Finlay": "1958-01-31",   // David Finlay · https://en.wikipedia.org/wiki/Fit_Finlay
  "Fuerza Guerrera": "1953-12-13",   // real name not given · https://en.wikipedia.org/wiki/Fuerza_Guerrera
  "Gary Albright": "1963-05-18",   // Gary Mitchell Albright · https://en.wikipedia.org/wiki/Gary_Albright
  "Gen. Adnan": "1939-03-01",   // Adnan Al-Kaissie · https://en.wikipedia.org/wiki/Adnan_Al-Kaissie
  "Genichiro Tenryu": "1950-02-02",   // Genichiro Shimada · https://en.wikipedia.org/wiki/Genichiro_Tenryu
  "Giant Baba": "1938-01-23",   // Shohei Baba · https://en.wikipedia.org/wiki/Giant_Baba
  "Giant Haystacks": "1946-10-10",   // Martin Austin Ruane · https://en.wikipedia.org/wiki/Giant_Haystacks
  "Giant Kimala II": "1964-02-19",   // Benjamin Peacock · https://en.wikipedia.org/wiki/Botswana_Beast
  "Gran Hamada": "1950-11-27",   // Hiroaki Hamada · https://en.wikipedia.org/wiki/Gran_Hamada
  "Great Muta": "1962-12-23",   // Keiji Mutoh · https://en.wikipedia.org/wiki/Keiji_Muto
  "Greg Valentine": "1951-09-20",   // Jonathan Anthony Wisniski · https://en.wikipedia.org/wiki/Greg_Valentine
  "Grigory Verichev": "1957-04-04",   // Grigory Verichev · https://www.olympedia.org/athletes/34502
  "Haku": "1959-02-10",   // Tonga Uliuli Fifita · https://en.wikipedia.org/wiki/Haku_(wrestler)
  "Harley Race": "1943-04-11",   // Harley Leland Race · https://en.wikipedia.org/wiki/Harley_Race
  "Haruka Eigen": "1946-01-11",   // Haruka Eigen · https://en.wikipedia.org/wiki/Haruka_Eigen
  "Harvey Wippleman": "1965-10-27",   // Bruno Lauer · https://en.wikipedia.org/wiki/Harvey_Wippleman
  "Hector Guerrero": "1954-10-01",   // Hector Guerrero · https://en.wikipedia.org/wiki/H%C3%A9ctor_Guerrero
  "Hercules": "1956-05-07",   // Raymond Constantine Fernandez Jr. · https://en.wikipedia.org/wiki/Hercules_(wrestler)
  "Hiro Saito": "1961-05-25",   // Hiroyuki Saito · https://en.wikipedia.org/wiki/Hiro_Saito
  "Hiroshi Hase": "1961-05-05",   // Hiroshi Hase · https://www.olympedia.org/athletes/59001
  "Hiroyoshi Tenzan": "1971-03-23",   // Hiroyoshi Yamamoto · https://en.wikipedia.org/wiki/Hiroyoshi_Tenzan
  "Honky Tonk Man": "1953-01-25",   // Roy Wayne Farris · https://en.wikipedia.org/wiki/The_Honky_Tonk_Man
  "Horace Boulder": "1965-10-21",   // Michael Allan Bollea · https://en.wikipedia.org/wiki/Horace_Hogan
  "Hulk Hogan": "1953-08-11",   // Terry Gene Bollea · https://en.wikipedia.org/wiki/Hulk_Hogan
  "Iceman King Parsons": "1950-06-11",   // King Bailey Parsons Jr. · https://en.wikipedia.org/wiki/King_Parsons
  "Iron Mike Sharpe": "1951-10-28",   // Michael Sharpe · https://en.wikipedia.org/wiki/Mike_Sharpe
  "Irwin R. Schyster": "1958-03-30",   // Mike Rotunda · https://en.wikipedia.org/wiki/Mike_Rotunda
  "Ivan Putski": "1941-01-21",   // Józef Bednarski · https://en.wikipedia.org/wiki/Ivan_Putski
  "J.T. Smith": "1967-04-25",   // John T. Smith · https://en.wikipedia.org/wiki/J._T._Smith_(wrestler)
  "Jake Roberts": "1955-05-30",   // Aurelian Smith Jr. · https://en.wikipedia.org/wiki/Jake_Roberts
  "Jamie Dundee": "1971-07-05",   // James Cruickshanks · https://www.thesmackdownhotel.com/wrestlers/j-c-ice-jamie-dundee
  "Jaque Mate": "1948-09-29",   // Jaime Álvarez Mendoza · https://en.wikipedia.org/wiki/Jaque_Mate_(wrestler)
  "Javier Cruz": "1958-12-05",   // Pedro Javier Cervantes Santacruz · https://www.luchawiki.org/index.php?title=Javier_Cruz
  "Jeff Gaylord": "1958-10-15",   // Jeff Gaylord · https://en.wikipedia.org/wiki/Jeff_Gaylord
  "Jeff Jarrett": "1967-07-14",   // Jeffrey Leonard Jarrett · https://en.wikipedia.org/wiki/Jeff_Jarrett
  "Jerry Estrada": "1958-01-10",   // Gerardo Hernández Estrada · https://en.wikipedia.org/wiki/Jerry_Estrada
  "Jerry Lawler": "1949-11-29",   // Jerry O'Neil Lawler · https://en.wikipedia.org/wiki/Jerry_Lawler
  "Jerry Sags": "1964-07-05",   // Jerome Saganowich · https://en.wikipedia.org/wiki/Jerry_Sags
  "Jim Brunzell": "1949-08-13",   // James Brunzell · https://en.wikipedia.org/wiki/Jim_Brunzell
  "Jim Duggan": "1954-01-14",   // James Edward Duggan Jr. · https://en.wikipedia.org/wiki/Jim_Duggan
  "Jim Neidhart": "1955-02-08",   // Jim Neidhart · https://en.wikipedia.org/wiki/Jim_Neidhart
  "Jim Powers": "1958-01-04",   // James Manley · https://en.wikipedia.org/wiki/Jim_Powers
  "Jimmy Backlund": "1962-11-30",   // David Everett Ferrier · https://www.thesmackdownhotel.com/wrestlers/jimmy-del-ray
  "Jimmy Garvin": "1952-09-25",   // James Williams · https://en.wikipedia.org/wiki/Jimmy_Garvin
  "Jimmy Hart": "1944-01-01",   // James Ray Hart · https://en.wikipedia.org/wiki/Jimmy_Hart
  "Jimmy Snuka": "1943-05-18",   // James Wiley Smith · https://en.wikipedia.org/wiki/Jimmy_Snuka
  "Jimmy Valiant": "1942-08-06",   // James Harold Fanning · https://en.wikipedia.org/wiki/Jimmy_Valiant
  "Joe Malenko": "1956-06-04",   // Jody Simon · https://en.wikipedia.org/wiki/Joe_Malenko
  "Johnny Ace": "1962-07-31",   // John Laurinaitis · https://en.wikipedia.org/wiki/John_Laurinaitis
  "Johnny B. Badd": "1960-07-09",   // Marc Mero · https://en.wikipedia.org/wiki/Marc_Mero
  "Johnny Saint": "1941-06-29",   // John Miller · https://en.wikipedia.org/wiki/Johnny_Saint
  "Jumbo Tsuruta": "1951-03-25",   // Tomomi Tsuruta · https://en.wikipedia.org/wiki/Jumbo_Tsuruta
  "Junji Hirata": "1956-12-20",   // Junji Hirata · https://en.wikipedia.org/wiki/Junji_Hirata
  "Junk Yard Dog": "1952-12-13",   // Sylvester Ritter · https://en.wikipedia.org/wiki/Junkyard_Dog
  "Jushin Liger": "1964-11-10",   // Keiichi Yamada · https://en.wikipedia.org/wiki/Jushin_Liger
  "Kamala": "1950-05-28",   // James Arthur Harris · https://en.wikipedia.org/wiki/Kamala_(wrestler)
  "Kato": "1961-05-11",   // Thomas Boric (Paul Diamond) · https://en.wikipedia.org/wiki/Paul_Diamond
  "Katsuji Ueda": "1945-12-15",   // Katsuji Ueda · https://en.wikipedia.org/wiki/Katsuji_Ueda
  "Keiji Mutoh": "1962-12-23",   // Keiji Mutoh · https://www.wikiwand.com/simple/Keiji_Mutoh
  "Keith Hart": "1951-08-21",   // Keith William Hart · https://en.wikipedia.org/wiki/Keith_Hart_(wrestler)
  "Ken Patera": "1942-11-06",   // Ken Patera · https://www.imdb.com/name/nm1054047/
  "Kendo Nagasaki": "1941-10-19",   // Peter William Thornley · https://en.wikipedia.org/wiki/Peter_Thornley
  "Kengo Kimura": "1953-09-04",   // Seiei Kimura · https://en.wikipedia.org/wiki/Kengo_Kimura
  "Kensuke Sasaki": "1966-08-04",   // Kensuke Sasaki · https://en.wikipedia.org/wiki/Kensuke_Sasaki
  "Kenta Kobashi": "1967-03-27",   // Kenta Kobashi · https://en.wikipedia.org/wiki/Kenta_Kobashi
  "Kerry Brown": "1958-02-03",   // Kerry Brown · https://en.wikipedia.org/wiki/Kerry_Brown_(wrestler)
  "Kerry Von Erich": "1960-02-03",   // Kerry Gene Adkisson · https://en.wikipedia.org/wiki/Kerry_Von_Erich
  "Kevin Sullivan": "1949-10-26",   // Kevin Sullivan · https://en.wikipedia.org/wiki/Kevin_Sullivan_(wrestler)
  "Kevin Von Erich": "1957-05-15",   // Kevin Ross Adkisson · https://en.wikipedia.org/wiki/Kevin_Von_Erich
  "Kim Duk": "1948-02-07",   // Pyo Jeong-deok (Masanori Toguchi; also Tiger Toguchi / Tiger Chung Lee) · https://en.wikipedia.org/wiki/Kim_Duk
  "Koba Kurtanidze": "1964-10-13",   // Koba Kurtanidze · https://en.wikipedia.org/wiki/Koba_Kurtanidze
  "Koji Kitao": "1963-08-12",   // Kōji Kitao (yokozuna Futahaguro) · https://en.wikipedia.org/wiki/K%C5%8Dji_Kitao
  "Kokina": "1966-10-02",   // Rodney Agatupu Anoaʻi (later Yokozuna) · https://en.wikipedia.org/wiki/Great_Kokina
  "Koko B. Ware": "1957-06-20",   // James W. Ware Jr. · https://en.wikipedia.org/wiki/Koko_B._Ware
  "Konnan": "1964-01-06",   // Charles Ashenoff (born Carlos Santiago Espada Moisés) · https://en.wikipedia.org/wiki/Konnan
  "Kuniaki Kobayashi": "1956-01-11",   // Kuniaki Kobayashi · https://en.wikipedia.org/wiki/Kuniaki_Kobayashi
  "La Diabólica": "1965-09-28",   // real name not given · https://en.wikipedia.org/wiki/La_Diab%C3%B3lica
  "Lance Storm": "1969-04-03",   // Lance Timothy Evers · https://en.wikipedia.org/wiki/Lance_Storm
  "Larry Zbyszko": "1951-12-05",   // Lawrence Whistler · https://en.wikipedia.org/wiki/Larry_Zbyszko
  "Leon Spinks": "1953-07-11",   // Leon Spinks · https://en.wikipedia.org/wiki/Leon_Spinks
  "Lex Luger": "1958-06-02",   // Lawrence Wendell Pfohl · https://en.wikipedia.org/wiki/Lex_Luger
  "Lola González": "1959-03-02",   // María Dolores González · https://www.luchawiki.org/index.php/Lola_Gonzalez
  "Mando Guerrero": "1950-06-09",   // Armando Guerrero Llanes · https://en.wikipedia.org/wiki/Mando_Guerrero
  "Marcus Alexander Bagwell": "1970-01-10",   // Marcus Alexander Bagwell · https://en.wikipedia.org/wiki/Buff_Bagwell
  "Mark Canterbury": "1964-03-16",   // Mark Canterbury · https://en.wikipedia.org/wiki/Henry_O._Godwinn
  "Mark Starr": "1962-12-26",   // Mark Ashford-Smith · https://en.wikipedia.org/wiki/Mark_Starr
  "Marty Jannetty": "1960-02-03",   // Fredrick Martin Jannetty · https://en.wikipedia.org/wiki/Marty_Jannetty
  "Masahiro Chono": "1963-09-17",   // Masahiro Chono · https://en.wikipedia.org/wiki/Masahiro_Chono
  "Masakre": "1954-05-13",   // Aristoteles Radames Cocco Flores · https://en.wikipedia.org/wiki/Masakre
  "Masanobu Fuchi": "1954-01-14",   // Masanobu Fuchi · https://en.wikipedia.org/wiki/Masanobu_Fuchi
  "Masao Inoue": "1970-03-06",   // Masao Inoue · https://en.wikipedia.org/wiki/Masao_Inoue_(wrestler)
  "Masashi Aoyagi": "1956-12-27",   // Masashi Aoyagi · https://en.wikipedia.org/wiki/Masashi_Aoyagi
  "Masashi Honda": "1968-06-20",   // Masashi Honda · https://en.wikipedia.org/wiki/Mr._Gannosuke
  "Máscara Año 2000": "1958-03-10",   // Jesús Reyes González · https://en.wikipedia.org/wiki/M%C3%A1scara_A%C3%B1o_2000
  "Megumi Kudo": "1969-09-20",   // Megumi Kudo · https://en.wikipedia.org/wiki/Megumi_Kudo
  "Michael Hayes": "1959-03-29",   // Michael Seitz · https://en.wikipedia.org/wiki/Michael_Hayes_(wrestler)
  "Michael Modest": "1971-07-19",   // Michael K. Cariglio · https://en.wikipedia.org/wiki/Michael_Modest
  "Mike Awesome": "1965-01-24",   // Michael Lee Alfonso · https://en.wikipedia.org/wiki/Mike_Awesome
  "Mike Rotunda": "1958-03-30",   // Lawrence Michael Rotunda Jr. · https://en.wikipedia.org/wiki/Mike_Rotunda
  "Mil Mascaras": "1942-07-15",   // Aarón Rodríguez Arellano · https://www.wrestlinginc.com/profiles/863/mil-mascaras/
  "Miss Elizabeth": "1960-11-19",   // Elizabeth Ann Hulette · https://en.wikipedia.org/wiki/Miss_Elizabeth
  "Missy Hyatt": "1963-10-16",   // Melissa Ann Hiatt · https://en.wikipedia.org/wiki/Missy_Hyatt
  "Mitsuharu Misawa": "1962-06-18",   // Mitsuharu Misawa (born Kotake) · https://en.wikipedia.org/wiki/Mitsuharu_Misawa
  "Mitsuhiro Matsunaga": "1966-03-24",   // Mitsuhiro Matsunaga · https://en.wikipedia.org/wiki/Mitsuhiro_Matsunaga
  "Moondog Rex": "1950-05-02",   // Randy Adrian Colley · https://en.wikipedia.org/wiki/Moondog_Rex
  "Moondog Spot": "1952-01-06",   // Larry Wayne Booker · https://www.gerweck.net/2021/01/18/moondog-spot
  "Mr. Fuji": "1934-05-04",   // Harry Masayoshi Fujiwara · https://en.wikipedia.org/wiki/Mr._Fuji
  "Mr. Hughes": "1964-12-07",   // Curtis Hughes · https://en.wikipedia.org/wiki/Curtis_Hughes
  "Mr. Perfect": "1958-03-28",   // Curtis Michael Hennig · https://en.wikipedia.org/wiki/Curt_Hennig
  "Mr. Pogo": "1951-02-05",   // Tetsuo Sekigawa · https://en.wikipedia.org/wiki/Mr._Pogo
  "Mr. Sandman": "1963-06-16",   // James Fullington · https://en.wikipedia.org/wiki/The_Sandman_(wrestler)
  "MS-1": "1956-12-31",   // Pablo Fuentes Reyna · https://en.wikipedia.org/wiki/MS-1_(wrestler)
  "Negro Casas": "1960-01-10",   // José Casas Ruiz · https://en.wikipedia.org/wiki/Negro_Casas
  "Nightmare Danny Davis": "1952-06-30",   // Daniel Briley · https://en.wikipedia.org/wiki/Nightmare_Danny_Davis
  "Nightmare Ken Wayne": "1959-01-15",   // Kenneth Dewayne Peale · https://en.wikipedia.org/wiki/Ken_Wayne_(wrestler)
  "Nikita Koloff": "1959-03-09",   // Nelson Scott Simpson · https://en.wikipedia.org/wiki/Nikita_Koloff
  "Norio Honaga": "1955-08-11",   // Norio Honaga · https://en.wikipedia.org/wiki/Norio_Honaga
  "Octagón": "1961-03-27",   // Juan Carlos López Escalera Samaniego · https://en.wikipedia.org/wiki/Octag%C3%B3n
  "Octagoncito": "1974-04-25",   // real name not given · https://en.wikipedia.org/wiki/Octagoncito
  "One Man Gang": "1960-02-12",   // George Gray · https://en.wikipedia.org/wiki/One_Man_Gang
  "Osamu Kido": "1950-02-02",   // Osamu Kido · https://en.wikipedia.org/wiki/Osamu_Kido
  "Owen Hart": "1965-05-07",   // Owen Hart · https://en.wikipedia.org/wiki/Owen_Hart
  "Ozz": "1959-07-09",   // Kevin Scott Nash · https://en.wikipedia.org/wiki/Kevin_Nash
  "Pantera Sureña": "1955-12-29",   // Lidia Hortencia Rangel Ávalos · https://en.wikipedia.org/wiki/Pantera_Sure%C3%B1a
  "Paul Bearer": "1954-04-10",   // William Alvin Moody · https://en.wikipedia.org/wiki/Paul_Bearer
  "Paul E. Dangerously": "1965-09-11",   // Paul Heyman · https://en.wikipedia.org/wiki/Paul_Heyman
  "Paul Ellering": "1953-08-22",   // Paul Ellering · https://en.wikipedia.org/wiki/Paul_Ellering
  "Paul Orndorff": "1949-10-29",   // Paul Parlette Orndorff Jr. · https://en.wikipedia.org/wiki/Paul_Orndorff
  "Paul Roma": "1960-04-29",   // Paul Centopani · https://en.wikipedia.org/wiki/Paul_Roma
  "Pegasus Kid": "1967-05-21",   // Chris Benoit · https://en.wikipedia.org/wiki/Chris_Benoit
  "Pierroth Jr": "1958-03-10",   // Norberto Salgado Salcedo · https://en.wikipedia.org/wiki/Pierroth_Jr.
  "PN News": "1966-07-09",   // Paul Neu · https://en.wikipedia.org/wiki/P._N._News
  "Randy Savage": "1952-11-15",   // Randy Mario Poffo · https://en.wikipedia.org/wiki/Randy_Savage
  "Rayo De Jalisco Jr": "1960-01-01",   // real name not given · https://en.wikipedia.org/wiki/Rayo_de_Jalisco_Jr.
  "Reggie Bennett": "1961-01-24",   // Reggie Bennett · https://en.wikipedia.org/wiki/Reggie_Bennett
  "Rex King": "1961-09-08",   // Timothy Alan Smith · https://onlineworldofwrestling.com/profile/rex-king
  "Ric Flair": "1949-02-25",   // Richard Morgan Fliehr · https://en.wikipedia.org/wiki/Ric_Flair
  "Richard Morton": "1956-09-21",   // Richard Wendell Morton · https://en.wikipedia.org/wiki/Ricky_Morton
  "Richard Slinger": "1971-09-16",   // Richard Aslinger · https://en.wikipedia.org/wiki/Richard_Slinger
  "Rick Martel": "1956-03-18",   // Richard Vigneault · https://en.wikipedia.org/wiki/Rick_Martel
  "Rick Rude": "1958-12-07",   // Richard Erwin Rood · https://en.wikipedia.org/wiki/Rick_Rude
  "Rick Steiner": "1961-03-09",   // Robert Rechsteiner · https://en.wikipedia.org/wiki/Rick_Steiner
  "Ricky Fuji": "1965-09-27",   // Masanori Morimura · https://en.wikipedia.org/wiki/Ricky_Fuji
  "Ricky Steamboat": "1953-02-28",   // Richard Henry Blood · https://en.wikipedia.org/wiki/Ricky_Steamboat
  "Rie Nakamura": "1974-02-01",   // Rie Nakamura · https://joshicity.com/joshi-wrestler-profiles/bad-nurse-nakamura
  "Riki Chōshu": "1951-12-03",   // Kwak Gwang-ung (now Mitsuo Yoshida) · https://en.wikipedia.org/wiki/Riki_Choshu
  "Road Warrior Animal": "1960-09-12",   // Joseph Michael Laurinaitis · https://en.wikipedia.org/wiki/Road_Warrior_Animal
  "Road Warrior Hawk": "1957-01-26",   // Michael James Hegstrand · https://en.wikipedia.org/wiki/Road_Warrior_Hawk
  "Robbie Brookside": "1966-03-11",   // Robert Edward Brooks · https://en.wikipedia.org/wiki/Robbie_Brookside
  "Robert Fuller": "1949-05-14",   // Robert Welch · https://en.wikipedia.org/wiki/Robert_Fuller_(wrestler)
  "Robert Gibson": "1958-07-19",   // Reuben Cain · https://en.wikipedia.org/wiki/Robert_Gibson_(wrestler)
  "Rocky Johnson": "1944-08-24",   // Wayde Douglas Bowles · https://en.wikipedia.org/wiki/Rocky_Johnson
  "Roddy Piper": "1954-04-17",   // Roderick George Toombs · https://en.wikipedia.org/wiki/Roddy_Piper
  "Ron Bass": "1948-12-21",   // Ronald Heard · https://en.wikipedia.org/wiki/Ron_Bass_(wrestler)
  "Ron Harris": "1961-10-23",   // Ronald Harris · https://en.wikipedia.org/wiki/Harris_Brothers
  "Ron Simmons": "1958-05-15",   // Ronald Kyle Simmons · https://en.wikipedia.org/wiki/Ron_Simmons
  "Rusher Kimura": "1941-06-30",   // Masao Kimura · https://en.wikipedia.org/wiki/Rusher_Kimura
  "Sabu": "1964-12-12",   // Terrance Michael (Terry) Brunk · https://en.wikipedia.org/wiki/Sabu_(wrestler)
  "Sam Houston": "1963-10-11",   // Michael Maurice Smith · https://en.wikipedia.org/wiki/Sam_Houston_(wrestler)
  "Samu": "1963-05-29",   // Samuel Fred Anoa'i · https://en.wikipedia.org/wiki/Samu_(wrestler)
  "Sangre Chicana": "1951-11-30",   // Andrés Durán Reyes · https://en.wikipedia.org/wiki/Sangre_Chicana
  "Satánico": "1949-10-26",   // Daniel López López · https://en.wikipedia.org/wiki/El_Sat%C3%A1nico
  "Satoshi Kojima": "1970-09-14",   // Satoshi Kojima · https://en.wikipedia.org/wiki/Satoshi_Kojima
  "Savio Vega": "1964-08-10",   // Juan Rivera · https://en.wikipedia.org/wiki/Savio_Vega
  "Scott Norton": "1961-06-15",   // Scott Norton · https://en.wikipedia.org/wiki/Scott_Norton
  "Scott Steiner": "1962-07-29",   // Scott Rechsteiner · https://en.wikipedia.org/wiki/Scott_Steiner
  "Scotty Flamingo": "1964-09-08",   // Scott Anthony Levy · https://en.wikipedia.org/wiki/Raven_(wrestler)
  "Sgt. Slaughter": "1948-08-27",   // Robert Rudolph Remus · https://en.wikipedia.org/wiki/Sgt._Slaughter
  "Shane Douglas": "1964-11-21",   // Troy Allan Martin · https://en.wikipedia.org/wiki/Shane_Douglas
  "Shawn Michaels": "1965-07-22",   // Michael Shawn Hickenbottom · https://en.wikipedia.org/wiki/Shawn_Michaels
  "Shinya Hashimoto": "1965-07-03",   // Shinya Hashimoto · https://en.wikipedia.org/wiki/Shinya_Hashimoto
  "Shiro Koshinaka": "1958-09-03",   // Shiro Koshinaka · https://en.wikipedia.org/wiki/Shiro_Koshinaka
  "Sid Justice": "1960-12-16",   // Sidney Raymond Eudy · https://en.wikipedia.org/wiki/Sid_Eudy
  "Silver King": "1968-01-09",   // César Cuauhtémoc González Barrón · https://en.wikipedia.org/wiki/Silver_King_(wrestler)
  "Simon Diamond": "1968-05-26",   // Patrick Joseph Michael Kenney · https://en.wikipedia.org/wiki/Simon_Diamond
  "Skinner": "1951-09-10",   // Stephen Paul Keirn · https://en.wikipedia.org/wiki/Steve_Keirn
  "Smash": "1959-10-06",   // Barry Allen Darsow · https://en.wikipedia.org/wiki/Smash_(wrestler)
  "Stan Hansen": "1949-08-29",   // John Stanley Hansen II · https://en.wikipedia.org/wiki/Stan_Hansen
  "Steve Armstrong": "1965-03-16",   // Steven James · https://en.wikipedia.org/wiki/Steve_Armstrong
  "Steve Austin": "1964-12-18",   // Steven James Anderson · https://www.wikipedia.org/wiki/Steve Austin
  "Steve Regal": "1968-05-10",   // Darren Kenneth Matthews · https://en.wikipedia.org/wiki/William_Regal
  "Steve Williams": "1960-05-14",   // Steven Franklin Williams · https://en.wikipedia.org/wiki/Steve_Williams_(wrestler)
  "Steven Dunn": "1960-12-09",   // Steven Lyle Doll · https://en.wikipedia.org/wiki/Steve_Doll
  "Sting": "1959-03-20",   // Steve Borden · https://en.wikipedia.org/wiki/Sting_(wrestler)
  "Svetlana Goundarenko": "1969-06-23",   // Svetlana Aronovna Goundarenko · https://en.wikipedia.org/wiki/Svetlana_Goundarenko
  "Tanaka": "1961-08-05",   // Patrick Tanaka · https://en.wikipedia.org/wiki/Pat_Tanaka
  "Tarzan Goto": "1963-08-16",   // Seiji (or Masaji) Goto · https://en.wikipedia.org/wiki/Tarzan_Goto
  "Tatanka": "1961-06-08",   // Chris Chavis · https://en.wikipedia.org/wiki/Tatanka_(wrestler)
  "Tatsumi Fujinami": "1953-12-28",   // Tatsumi Fujinami · https://en.wikipedia.org/wiki/Tatsumi_Fujinami
  "Ted DiBiase": "1954-01-18",   // Theodore Marvin Wills (or Willis) · https://en.wikipedia.org/wiki/Ted_DiBiase
  "Terry Funk": "1944-06-30",   // Terry Funk · https://en.wikipedia.org/wiki/Terry_Funk
  "Terry Gordy": "1961-04-23",   // Terry Gordy · https://en.wikipedia.org/wiki/Terry_Gordy
  "Terry Taylor": "1955-08-12",   // Paul Worden Taylor III · https://en.wikipedia.org/wiki/Terry_Taylor
  "The Barbarian": "1958-09-06",   // Sione Havea Vailahi · https://en.wikipedia.org/wiki/The_Barbarian_(wrestler)
  "The Berzerker": "1959-10-18",   // John Eric Nord · https://en.wikipedia.org/wiki/John_Nord
  "The Blue Blazer": "1965-05-07",   // Owen Hart · https://en.wikipedia.org/wiki/Owen_Hart
  "The Gladiator": "1965-01-24",   // Michael Lee Alfonso (Mike Awesome) · https://en.wikipedia.org/wiki/Mike_Awesome
  "The Lightning Kid": "1972-07-13",   // Sean Waltman · https://en.wikipedia.org/wiki/Sean_Waltman
  "The Mountie": "1960-06-13",   // Jacques Rougeau Jr. · https://en.wikipedia.org/wiki/Jacques_Rougeau
  "The Sheik": "1926-06-07",   // Edward George Farhat · https://en.wikipedia.org/wiki/The_Sheik_(wrestler)
  "The Ultimate Warrior": "1959-06-16",   // James Brian Hellwig (legally Warrior) · https://en.wikipedia.org/wiki/Ultimate_Warrior
  "The Undertaker": "1965-03-24",   // Mark William Calaway · https://en.wikipedia.org/wiki/The_Undertaker
  "Tiger Jeet Singh": "1944-04-03",   // Jagjeet Singh Hans · https://en.wikipedia.org/wiki/Tiger_Jeet_Singh
  "Tito Santana": "1953-05-10",   // Merced Solis · https://en.wikipedia.org/wiki/Tito_Santana
  "Tom Prichard": "1959-08-18",   // Thomas Prichard · https://en.wikipedia.org/wiki/Tom_Prichard
  "Tom Zenk": "1958-11-30",   // Thomas Erwin Zenk · https://en.wikipedia.org/wiki/Tom_Zenk
  "Tommy Rich": "1956-07-26",   // Thomas Richardson · https://en.wikipedia.org/wiki/Tommy_Rich
  "Tommy Rogers": "1961-05-14",   // Thomas R. Couch · https://en.wikipedia.org/wiki/Tommy_Rogers_(wrestler)
  "Tony Arce": "1955-04-15",   // real name not given · https://www.cagematch.net/en?id=2&nr=5037
  "Tony Halme": "1963-01-06",   // Tony Christian Halme · https://en.wikipedia.org/wiki/Tony_Halme
  "Tony St. Clair": "1948-03-28",   // Anthony St. Clair-Gregory · https://en.wikipedia.org/wiki/Tony_St._Clair
  "Too Cold Scorpio": "1965-10-25",   // Charles Bernard Scaggs · https://en.wikipedia.com/wiki/2_Cold_Scorpio
  "Toshiyo Yamada": "1970-02-27",   // Toshiyo Yamada · https://en.wikipedia.org/wiki/Toshiyo_Yamada
  "Tracy Smothers": "1962-09-02",   // Tracy Stanton Smothers · https://en.wikipedia.org/wiki/Tracy_Smothers
  "Tsuyoshi Kikuchi": "1964-11-21",   // Tsuyoshi Kikuchi · https://en.wikipedia.org/wiki/Tsuyoshi_Kikuchi
  "Tully Blanchard": "1954-01-22",   // Tully Blanchard · https://en.wikipedia.org/wiki/Tully_Blanchard
  "Typhoon": "1956-08-10",   // Fred Ottman · https://en.wikipedia.org/wiki/Fred_Ottman
  "Ultimo Dragón": "1966-12-12",   // Yoshihiro Asai · https://en.wikipedia.org/wiki/%C3%9Altimo_Drag%C3%B3n
  "Universo 2000": "1963-04-18",   // Andrés Reyes González · https://en.wikipedia.org/wiki/Universo_2000
  "Vampiro Canadiense": "1967-05-31",   // Ian Richard Hodgkinson · https://m.imdb.com/es/name/nm0388249/bio
  "Virgil": "1951-04-07",   // Michael Charles Jones · https://en.wikipedia.org/wiki/Virgil_(wrestler)
  "Volador": "1956-05-24",   // Ramón Ibarra Banda · https://en.wikipedia.org/wiki/Super_Parka
  "Warlord": "1962-03-28",   // Terry Scott Szopinski · https://en.wikipedia.org/wiki/The_Warlord_(wrestler)
  "Yoshika Maedomari": "1972-12-19",   // Yoshika Maedomari · https://www.imdb.com/name/nm1122811/
  "Yoshinari Ogawa": "1966-11-02",   // Yoshinari Ogawa · https://en.wikipedia.org/wiki/Yoshinari_Ogawa
  "Yuki Morimatsu": "1970-08-21",   // Yuki Morimatsu · https://joshicity.com/joshi-wrestler-profiles/drake-morimatsu
  "Yukihide Ueno": "1970-07-19"   // Yukihide Ueno · https://www.luchawiki.org/index.php/Yukihide_Ueno
};

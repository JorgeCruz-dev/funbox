// 🎮 Funbox Retro Main Logic (N64, SNES & GBA) 🎮
import './style.css';

// 1. Interfaces
interface Game {
  id: string;
  title: string;
  publisher: string;
  year: number;
  genre: string;
  romUrl: string;
  description: string;
  gradientClass: string;
  icon: string;
  coverImage?: string;
  system: 'n64' | 'snes' | 'gba';
}

// 2. Focused Games Catalog (Matching user ROM filenames)
const FEATURED_GAMES: Game[] = [
  // --- NINTENDO 64 GAMES ---
  {
    id: 'super_mario_64',
    title: 'Super Mario 64',
    publisher: 'Nintendo',
    year: 1996,
    genre: '3D Platformer',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Super%20Mario%2064%20%28USA%29.z64',
    description: "The definitive blueprint for 3D platformers. Explore Princess Peach's castle, jump into magical paintings, collect Power Stars, and save Peach from Bowser.",
    gradientClass: 'cover-gradient-2',
    icon: 'fa-crown',
    coverImage: 'covers/super-mario-64-logo.png',
    system: 'n64'
  },
  {
    id: 'zelda_oot',
    title: 'The Legend of Zelda: Ocarina of Time',
    publisher: 'Nintendo',
    year: 1998,
    genre: 'Action-Adventure',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Legend%20of%20Zelda%2C%20The%20-%20Ocarina%20of%20Time%20%28USA%29.z64',
    description: 'An epic fantasy masterpiece. Journey through time, traverse sprawling Hyrule landscape, and solve ancient temples to stop Ganondorf.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-shield-halved',
    system: 'n64'
  },
  {
    id: 'goldeneye_007',
    title: 'GoldenEye 007',
    publisher: 'Nintendo / Rare',
    year: 1997,
    genre: 'First-Person Shooter',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/007%20-%20GoldenEye%20%28USA%29.z64',
    description: 'The legendary first-person shooter that revolutionized console multiplayer. Play as James Bond, navigate through action-packed missions, and engage in split-screen multiplayer matches.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-user-secret',
    coverImage: 'covers/goldeneye007.jpg',
    system: 'n64'
  },
  {
    id: 'mario_kart_64',
    title: 'Mario Kart 64',
    publisher: 'Nintendo',
    year: 1996,
    genre: 'Kart Racing',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Mario%20Kart%2064%20%28USA%29.z64',
    description: 'Race past competitor players using special items to cross the finish line in a series of colorful tracks like Rainbow Road.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-flag-checkered',
    system: 'n64'
  },
  {
    id: 'super_smash_bros',
    title: 'Super Smash Bros.',
    publisher: 'Nintendo / HAL Laboratory',
    year: 1999,
    genre: 'Fighting / Brawler',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Super%20Smash%20Bros.%20%28USA%29.z64',
    description: 'The classic crossover fighting game. Select iconic Nintendo characters like Mario, Link, Samus, and Pikachu and fight to knock opponents off the stage.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-hand-fist',
    coverImage: 'covers/super-smash-bros-64.webp',
    system: 'n64'
  },
  {
    id: 'zelda_mm',
    title: "The Legend of Zelda: Majora's Mask",
    publisher: 'Nintendo',
    year: 2000,
    genre: 'Action-Adventure',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Legend%20of%20Zelda%2C%20The%20-%20Majora%27s%20Mask%20%28USA%29.z64',
    description: 'Solve the mysteries of Termina and halt a looming catastrophe within 3 days using various masks that offer unique abilities.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-mask',
    system: 'n64'
  },
  {
    id: 'banjo_kazooie',
    title: 'Banjo-Kazooie',
    publisher: 'Rare / Nintendo',
    year: 1998,
    genre: '3D Platformer',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Banjo-Kazooie%20%28USA%29.z64',
    description: 'Join a bear and a bird duo as they collect puzzles and musical notes to defeat the witch Gruntilda and save Banjo\'s sister.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-feather',
    system: 'n64'
  },
  {
    id: 'donkey_kong_64',
    title: 'Donkey Kong 64',
    publisher: 'Rare / Nintendo',
    year: 1999,
    genre: '3D Platformer',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Donkey%20Kong%2064%20%28USA%29.z64',
    description: 'Take control of the DK crew and explore King K. Rool\'s islands to retrieve his legendary banana hoard in this collect-a-thon platformer.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-egg',
    system: 'n64'
  },
  {
    id: 'perfect_dark',
    title: 'Perfect Dark',
    publisher: 'Rare / Nintendo',
    year: 2000,
    genre: 'First-Person Shooter',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Perfect%20Dark%20%28USA%29.z64',
    description: 'Control secret agent Joanna Dark as she uncovers a vast conspiracy between astronomical alien factions and private corporations.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-crosshairs',
    system: 'n64'
  },
  {
    id: 'mario_party_1',
    title: 'Mario Party',
    publisher: 'Nintendo / Hudson',
    year: 1998,
    genre: 'Party / Board Game',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Mario%20Party%20%28USA%29.z64',
    description: 'The star-collecting digital board game that launched a legacy of hilarious friendship-testing multiplayer mini-game tournaments.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-chess-board',
    system: 'n64'
  },
  {
    id: 'mario_party_2',
    title: 'Mario Party 2',
    publisher: 'Nintendo / Hudson',
    year: 1999,
    genre: 'Party / Board Game',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Mario%20Party%202%20%28USA%29.z64',
    description: 'The fan-favorite successor featuring themed costume maps and refined item additions to elevate board-game sabotage to new heights.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-hat-wizard',
    system: 'n64'
  },
  {
    id: 'mario_party_3',
    title: 'Mario Party 3',
    publisher: 'Nintendo / Hudson',
    year: 2000,
    genre: 'Party / Board Game',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Mario%20Party%203%20%28USA%29.z64',
    description: 'Collect Milennial Stars and duel in intense arena encounters as you challenge friends to the third board game installment of the series.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-star',
    system: 'n64'
  },
  {
    id: 'paper_mario',
    title: 'Paper Mario',
    publisher: 'Nintendo / Intelligent Systems',
    year: 2000,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Paper%20Mario%20%28USA%29.z64',
    description: 'A charming RPG set in a colorful papercraft-inspired Mushroom Kingdom, blending classic turn-based battles with reflex-driven execution.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-book-open',
    system: 'n64'
  },
  {
    id: 'pokemon_stadium',
    title: 'Pokémon Stadium',
    publisher: 'Nintendo',
    year: 1999,
    genre: 'Strategy / Battler',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Pokemon%20Stadium%20%28USA%29.z64',
    description: 'Immerse yourself in spectacular 3D Pokémon battles, strategy championships, and a delightful sandbox pool of retro mini-games.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-gamepad',
    system: 'n64'
  },
  {
    id: 'pokemon_stadium_2',
    title: 'Pokémon Stadium 2',
    publisher: 'Nintendo',
    year: 2000,
    genre: 'Strategy / Battler',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Pokemon%20Stadium%202%20%28USA%29.z64',
    description: 'Elevate tactics to Generation II with Gold and Silver companions, advanced technical challenges, and brand new additions.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-bolt',
    system: 'n64'
  },
  {
    id: 'pokemon_snap',
    title: 'Pokémon Snap',
    publisher: 'Nintendo',
    year: 1999,
    genre: 'Simulation',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Pokemon%20Snap%20%28USA%29.z64',
    description: 'Go on a wild on-rails photographic safari excursion to map, entice, and capture premium pictures of Pokémon in wild environments.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-camera',
    system: 'n64'
  },
  {
    id: 'star_fox_64',
    title: 'Star Fox 64',
    publisher: 'Nintendo',
    year: 1997,
    genre: 'On-Rails Shooter',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Star%20Fox%2064%20%28USA%29.z64',
    description: 'Pilot the Arwing with Fox, Falco, Peppy, and Slippy to defend the Lylat System from Andross forces in this cinematic sci-fi adventure.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-jet-fighter',
    system: 'n64'
  },
  {
    id: 'diddy_kong_racing',
    title: 'Diddy Kong Racing',
    publisher: 'Rare / Nintendo',
    year: 1997,
    genre: 'Kart Racing',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Diddy%20Kong%20Racing%20%28USA%29%20%28En%2CFr%29.z64',
    description: "An adventure-style racing game. Drive cars, planes, and hovercrafts to defeat the intergalactic sorcerer Wizpig and save Timber's island.",
    gradientClass: 'cover-gradient-4',
    icon: 'fa-car',
    coverImage: 'covers/diddy-kong-racing.jpg',
    system: 'n64'
  },
  {
    id: 'conkers_bad_fur_day',
    title: "Conker's Bad Fur Day",
    publisher: 'Rare / THQ',
    year: 2001,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Conker%27s%20Bad%20Fur%20Day%20%28USA%29.z64',
    description: 'Interact with quirky characters, solve puzzles, and engage in crude humor in this mature, action-packed story of a red squirrel named Conker.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-paw',
    coverImage: 'covers/Conkers-bad-fur-day.jpg',
    system: 'n64'
  },
  {
    id: 'rayman_2',
    title: 'Rayman 2: The Great Escape',
    publisher: 'Ubisoft',
    year: 1999,
    genre: '3D Platformer',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Rayman%202%20-%20The%20Great%20Escape%20%28USA%29%20%28En%2CFr%2CDe%2CEs%2CIt%29.z64',
    description: 'Restore peace to Glade of Dreams and free captured slaves by fighting back Robo-Pirates led by Admiral Razorbeard.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-hand',
    system: 'n64'
  },
  {
    id: 'resident_evil_2',
    title: 'Resident Evil 2',
    publisher: 'Capcom',
    year: 1999,
    genre: 'Survival Horror',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Resident%20Evil%202%20%28USA%29.z64',
    description: 'Survive the viral zombie outbreak in Raccoon City as rookie cop Leon Kennedy or college student Claire Redfield.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-skull',
    system: 'n64'
  },
  {
    id: 'turok_dh',
    title: 'Turok: Dinosaur Hunter',
    publisher: 'Acclaim',
    year: 1997,
    genre: 'First-Person Shooter',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Turok%20-%20Dinosaur%20Hunter%20%28USA%29.z64',
    description: 'Battle dinosaurs, cyborgs, and prehistoric beasts to protect the barrier separating Earth from the Lost Land as the warrior Turok.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-dragon',
    system: 'n64'
  },
  {
    id: 'star_wars_shadows',
    title: 'Star Wars: Shadows of the Empire',
    publisher: 'LucasArts',
    year: 1996,
    genre: 'Action Shooter',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Star%20Wars%20-%20Shadows%20of%20the%20Empire%20%28USA%29.z64',
    description: 'Control mercenary Dash Rendar following the events of The Empire Strikes Back, participating in space and planetary vehicular battles.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-jedi',
    system: 'n64'
  },
  {
    id: 'wave_race_64',
    title: 'Wave Race 64',
    publisher: 'Nintendo',
    year: 1996,
    genre: 'Water Racing',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Wave%20Race%2064%20%28USA%29.z64',
    description: 'Race jet skis in dynamic water physics, slalom boundaries, and executing tricky maneuvers across wavy shores.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-water',
    system: 'n64'
  },
  {
    id: 'f_zero_x',
    title: 'F-Zero X',
    publisher: 'Nintendo',
    year: 1998,
    genre: 'Futuristic Racing',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/F-Zero%20X%20%28USA%29.z64',
    description: 'Experience supersonic speeds running on 3D looping cylinder tunnels with 30 pilots combating to declare futuristic championship victories.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-rocket',
    system: 'n64'
  },
  {
    id: 'jet_force_gemini',
    title: 'Jet Force Gemini',
    publisher: 'Rare / Nintendo',
    year: 1999,
    genre: 'Action Shooter',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Jet%20Force%20Gemini%20%28USA%29.z64',
    description: 'Join space agents Juno, Vela, and their mascot dog Lupus to eliminate tyrannical insectoid army threats ruling the cosmos.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-bug',
    system: 'snes'
  },
  {
    id: 'kirby_64',
    title: 'Kirby 64: The Crystal Shards',
    publisher: 'Nintendo / HAL Laboratory',
    year: 2000,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Kirby%2064%20-%20The%20Crystal%20Shards%20%28USA%29.z64',
    description: 'Traverse 2.5D landscapes, swallow enemies, and combine differing power capabilities to unlock premium ability combinations during search journeys.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-circle',
    system: 'n64'
  },
  {
    id: 'tony_hawk_ps',
    title: "Tony Hawk's Pro Skater",
    publisher: 'Neversoft / Activision',
    year: 1999,
    genre: 'Extreme Sports',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Tony%20Hawk%27s%20Pro%20Skater%20%28USA%29.z64',
    description: 'Execute kickflips, grinds, and signature combos with skate legend professionals set to iconic soundtracks.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-person-biking',
    system: 'n64'
  },
  {
    id: 'mario_tennis',
    title: 'Mario Tennis',
    publisher: 'Nintendo / Camelot',
    year: 2000,
    genre: 'Sports',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Mario%20Tennis%20%28USA%29.z64',
    description: 'Face off in premium Mushroom Kingdom tennis matches equipped with slice, lobby, and standard shot actions.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-baseball',
    system: 'n64'
  },
  {
    id: 'harvest_moon_64',
    title: 'Harvest Moon 64',
    publisher: 'Natsume / Toy Box',
    year: 1999,
    genre: 'Farming Simulation',
    romUrl: 'https://archive.org/download/pack-roms-nintendo-64-eu-us-jap/Harvest%20Moon%2064%20%28USA%29.z64',
    description: 'Restore your grandfather\'s farm, grow crops, raise livestock, and bond with local villagers in this historic sandbox classic.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-cow',
    system: 'n64'
  },

  // --- SUPER NINTENDO (SNES) GAMES ---
  {
    id: 'super_mario_world',
    title: 'Super Mario World',
    publisher: 'Nintendo',
    year: 1990,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Super%20Mario%20World%20%28USA%29.zip',
    description: 'Help Mario and Luigi rescue Princess Toadstool and defeat the evil Bowser in Dinosaur Land, featuring the debut of Yoshi!',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-egg',
    system: 'snes'
  },
  {
    id: 'super_mario_kart',
    title: 'Super Mario Kart',
    publisher: 'Nintendo',
    year: 1992,
    genre: 'Kart Racing',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Super%20Mario%20Kart%20%28USA%29.zip',
    description: 'The grandfather of kart racing! Race against iconic Mushroom Kingdom characters in challenging circuits and weapon-filled battles.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-flag-checkered',
    system: 'snes'
  },
  {
    id: 'super_metroid',
    title: 'Super Metroid',
    publisher: 'Nintendo',
    year: 1994,
    genre: 'Metroidvania',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Super%20Metroid%20%28Japan%2C%20USA%29%20%28En%2CJa%29.zip',
    description: 'Control bounty hunter Samus Aran as she explores planet Zebes to retrieve a stolen Metroid hatchling from Ridley and the Space Pirates.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-jet-fighter',
    system: 'snes'
  },
  {
    id: 'zelda_alttp',
    title: 'The Legend of Zelda: A Link to the Past',
    publisher: 'Nintendo',
    year: 1991,
    genre: 'Action-Adventure',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Legend%20of%20Zelda%2C%20The%20-%20A%20Link%20to%20the%20Past%20%28USA%29.zip',
    description: 'Embark on an epic journey through Hyrule, traversing between the Light and Dark Worlds to defeat Ganon and save the maidens.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-shield-halved',
    system: 'snes'
  },
  {
    id: 'super_mario_rpg',
    title: 'Super Mario RPG: Legend of the Seven Stars',
    publisher: 'Nintendo / Squaresoft',
    year: 1996,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Super%20Mario%20RPG%20-%20Legend%20of%20the%20Seven%20Stars%20%28USA%29.zip',
    description: 'Join forces with Bowser, Peach, and new friends Mallow and Geno to retrieve the seven Star Pieces and mend the Star Road.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-star-of-david',
    system: 'snes'
  },
  {
    id: 'yoshis_island',
    title: "Super Mario World 2: Yoshi's Island",
    publisher: 'Nintendo',
    year: 1995,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Super%20Mario%20World%202%20-%20Yoshi%27s%20Island%20%28USA%29.zip',
    description: 'Guaranteed to pull at your heartstrings. Guide Baby Mario safely across Yoshi\'s Island and defeat Baby Bowser.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-dinosaur',
    system: 'snes'
  },
  {
    id: 'super_castlevania_iv',
    title: 'Super Castlevania IV',
    publisher: 'Konami',
    year: 1991,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Super%20Castlevania%20IV%20%28USA%29.zip',
    description: 'Control Simon Belmont with his multi-directional whip as he climbs and fights through Dracula\'s daunting gothic castle.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-wand-magic-sparkles',
    system: 'snes'
  },
  {
    id: 'super_ghouls_n_ghosts',
    title: "Super Ghouls'n Ghosts",
    publisher: 'Capcom',
    year: 1991,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Super%20Ghouls%27n%20Ghosts%20%28USA%29.zip',
    description: 'Guide Arthur on a grueling adventure through hordes of ghouls and monsters to rescue Princess Guinevere.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-ghost',
    system: 'snes'
  },
  {
    id: 'donkey_kong_country',
    title: 'Donkey Kong Country',
    publisher: 'Nintendo / Rare',
    year: 1994,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Donkey%20Kong%20Country%20%28USA%29.zip',
    description: 'Navigate the jungle, mine carts, and treetops with Donkey Kong and Diddy Kong to retrieve their stolen banana hoard from King K. Rool.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-shrimp',
    system: 'snes'
  },
  {
    id: 'donkey_kong_country_2',
    title: "Donkey Kong Country 2: Diddy's Kong Quest",
    publisher: 'Nintendo / Rare',
    year: 1995,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Donkey%20Kong%20Country%202%20-%20Diddy%27s%20Kong%20Quest%20%28USA%29%20%28En%2CFr%29.zip',
    description: 'Help Diddy and Dixie Kong search for the captured Donkey Kong on Crocodile Isle in of the highest rated 2D platformers ever generated.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-paw',
    system: 'snes'
  },
  {
    id: 'donkey_kong_country_3',
    title: "Donkey Kong Country 3: Dixie Kong's Double Trouble!",
    publisher: 'Nintendo / Rare',
    year: 1996,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Donkey%20Kong%20Country%203%20-%20Dixie%20Kong%27s%20Double%20Trouble%21%20%28USA%29%20%28En%2CFr%29.zip',
    description: 'Join Dixie and Kiddy Kong as they explore the Northern Kremisphere to find both Donkey Kong and Diddy Kong after their disappearance.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-baby',
    system: 'snes'
  },
  {
    id: 'chrono_trigger',
    title: 'Chrono Trigger',
    publisher: 'Squaresoft',
    year: 1995,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Chrono%20Trigger%20%28USA%29.zip',
    description: 'A masterpiece RPG featuring a revolutionary battle system and a gripping time-travel story spanning from prehistory to the end of time.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-hourglass-half',
    system: 'snes'
  },
  {
    id: 'final_fantasy_ii',
    title: 'Final Fantasy II (IV)',
    publisher: 'Squaresoft',
    year: 1991,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Final%20Fantasy%20II%20%28USA%29.zip',
    description: 'Follow the dark knight Cecil as he rebels against his kingdom and gathers allies to save the world from an ancient evil.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-fire-flame-curved',
    system: 'snes'
  },
  {
    id: 'final_fantasy_iii',
    title: 'Final Fantasy III (VI)',
    publisher: 'Squaresoft',
    year: 1994,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Final%20Fantasy%20III%20%28USA%29.zip',
    description: 'A breathtaking epic revolving around rebellion, magic, steampunk machinery, and an unforgettable jester villain named Kefka.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-mask-face',
    system: 'snes'
  },
  {
    id: 'secret_of_mana',
    title: 'Secret of Mana',
    publisher: 'Squaresoft',
    year: 1993,
    genre: 'Action-RPG',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Secret%20of%20Mana%20%28USA%29.zip',
    description: 'Embark on a colorful real-time combat action-RPG journey following three heroes trying to stop an empire using the power of Mana.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-leaf',
    system: 'snes'
  },
  {
    id: 'earthbound',
    title: 'EarthBound',
    publisher: 'Nintendo',
    year: 1994,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/EarthBound%20%28USA%29.zip',
    description: 'Set in a satirical take on modern Americana. Guide Ness and friends to gather melodies and stop the cosmic destroyer Giygas.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-baseball-bat-ball',
    system: 'snes'
  },
  {
    id: 'street_fighter_ii_turbo',
    title: 'Street Fighter II Turbo',
    publisher: 'Capcom',
    year: 1993,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Street%20Fighter%20II%20Turbo%20%28USA%29.zip',
    description: 'The gold standard arcade fighting experience. Speed-boosted, introducing refined combos, and playable with eight unique combatants.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-hand-fist',
    system: 'snes'
  },
  {
    id: 'super_street_fighter_ii',
    title: 'Super Street Fighter II',
    publisher: 'Capcom',
    year: 1994,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Super%20Street%20Fighter%20II%20%28USA%29.zip',
    description: 'Introducing four brand new challengers: Cammy, Dee Jay, Fei Long, and T. Hawk for extreme final round tournaments.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-users',
    system: 'snes'
  },
  {
    id: 'mortal_kombat_ii',
    title: 'Mortal Kombat II',
    publisher: 'Acclaim / Midway',
    year: 1993,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Mortal%20Kombat%20II%20%28USA%29.zip',
    description: 'Wreak havoc in Outworld with refined Fatalities, Babilities, and stage hazards in this brutal competitive fighter.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-skull-crossbones',
    system: 'snes'
  },
  {
    id: 'ultimate_mortal_kombat_3',
    title: 'Ultimate Mortal Kombat 3',
    publisher: 'Acclaim / Midway',
    year: 1995,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Ultimate%20Mortal%20Kombat%203%20%28USA%29.zip',
    description: 'The final, expanded iteration of MK3 with returning favorites, secret warriors, and intense tournament-style competitive brackets.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-crown',
    system: 'snes'
  },
  {
    id: 'tmnt_iv_turtles_in_time',
    title: 'Teenage Mutant Ninja Turtles IV: Turtles in Time',
    publisher: 'Konami',
    year: 1992,
    genre: 'Beat \'Em Up',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Teenage%20Mutant%20Ninja%20Turtles%20IV%20-%20Turtles%20in%20Time%20%28USA%29.zip',
    description: 'Fight back Shredder\'s forces across various periods of history in the premier cooperative side-scrolling TMNT brawler.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-pizza-slice',
    system: 'snes'
  },
  {
    id: 'contra_iii_alien_wars',
    title: 'Contra III: The Alien Wars',
    publisher: 'Konami',
    year: 1992,
    genre: 'Run & Gun',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Contra%20III%20-%20The%20Alien%20Wars%20%28USA%29.zip',
    description: 'Arm yourself to fight off an alien invasion in intense, side-scrolling, high-difficulty run-and-gun combat levels.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-shield-heart',
    system: 'snes'
  },
  {
    id: 'super_punch_out',
    title: 'Super Punch-Out!!',
    publisher: 'Nintendo',
    year: 1994,
    genre: 'Sports / Boxing',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Super%20Punch-Out%21%21%20%28USA%29.zip',
    description: 'Climb the World Video Boxing Association ladder, executing precise dodging, counterattacks, and rapid-fire punches.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-square-plus',
    system: 'snes'
  },
  {
    id: 'star_fox',
    title: 'Star Fox',
    publisher: 'Nintendo',
    year: 1993,
    genre: 'Shoot \'Em Up',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Star%20Fox%20%28USA%29.zip',
    description: 'The pioneering 3D polygonal shooter utilizing the Super FX chip. Fly alongside McCloud and crew to defeat Andross.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-rocket',
    system: 'snes'
  },
  {
    id: 'f_zero',
    title: 'F-Zero',
    publisher: 'Nintendo',
    year: 1990,
    genre: 'Futuristic Racing',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/F-Zero%20%28USA%29.zip',
    description: 'Navigate treacherous futuristic loops and speed zones in high-speed Mode 7 physics racing tournaments.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-gauge-high',
    system: 'snes'
  },
  {
    id: 'illusion_of_gaia',
    title: 'Illusion of Gaia',
    publisher: 'Nintendo / Quintet',
    year: 1993,
    genre: 'Action-RPG',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Illusion%20of%20Gaia%20%28USA%29.zip',
    description: 'Control Will as he transforms into different legendary warriors on a globetrotting quest to save Earth from a dark comet.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-earth-americas',
    system: 'snes'
  },
  {
    id: 'secret_of_evermore',
    title: 'Secret of Evermore',
    publisher: 'Squaresoft',
    year: 1995,
    genre: 'Action-RPG',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Secret%20of%20Evermore%20%28USA%29.zip',
    description: 'Follow a boy and his shape-shifting dog companion as they are transported through different prehistoric, antiquarian, and gothic periods.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-paw',
    system: 'snes'
  },
  {
    id: 'breath_of_fire_ii',
    title: 'Breath of Fire II',
    publisher: 'Capcom',
    year: 1994,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Breath%20of%20Fire%20II%20%28USA%29.zip',
    description: 'Follow Ryu, who belongs to the dragon clan, on an expansive classic JRPG adventure to solve his family\'s mysterious past.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-dragon',
    system: 'snes'
  },
  {
    id: 'kirby_super_star',
    title: 'Kirby Super Star',
    publisher: 'Nintendo / HAL Laboratory',
    year: 1996,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Kirby%20Super%20Star%20%28USA%29.zip',
    description: 'Eight unique sub-games in one package! Swallowing copying capabilities, calling cooperators, and taking down King Dedede.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-face-laugh',
    system: 'snes'
  },
  {
    id: 'super_bomberman',
    title: 'Super Bomberman',
    publisher: 'Hudson Soft',
    year: 1993,
    genre: 'Action / Strategy',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Super%20Bomberman%20%28USA%29.zip',
    description: 'Place bombs, explode destructible grids, collect power-ups, and square off against friends in intense arena showdown battles.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-bomb',
    system: 'snes'
  },
  {
    id: 'actraiser',
    title: 'ActRaiser',
    publisher: 'Enix / Quintet',
    year: 1990,
    genre: 'Action / Simulation',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/ActRaiser%20%28USA%29.zip',
    description: 'Breathtakingly unique. Toggle between high-stakes action platforming battles and a peaceful colony management simulator perspective.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-cloud-sun',
    system: 'snes'
  },
  {
    id: 'soul_blazer',
    title: 'Soul Blazer',
    publisher: 'Enix / Quintet',
    year: 1992,
    genre: 'Action-RPG',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Soul%20Blazer%20%28USA%29.zip',
    description: 'Play as a celestial messenger of the Deity to defeat Deathtoll forces and liberate trapped creature souls across ancient shrines.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-sun',
    system: 'snes'
  },
  {
    id: 'ogre_battle',
    title: 'Ogre Battle: The March of the Black Queen',
    publisher: 'Enix / Quest',
    year: 1993,
    genre: 'Tactical RPG',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Ogre%20Battle%20-%20The%20March%20of%20the%20Black%20Queen%20%28USA%29.zip',
    description: 'Lead a liberation army with tactical planning, recruiting units, and managing alignment across a complex tarot-card driven storyline.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-layer-group',
    system: 'snes'
  },
  {
    id: 'lufia_ii',
    title: 'Lufia II: Rise of the Sinistrals',
    publisher: 'Natsume / Neverland',
    year: 1995,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Lufia%20II%20-%20Rise%20of%20the%20Sinistrals%20%28USA%29.zip',
    description: 'Explore dungeon puzzles, seek out magical equipment, and challenge the almighty Sinistrals to save humanity.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-gem',
    system: 'snes'
  },
  {
    id: 'demons_crest',
    title: "Demon's Crest",
    publisher: 'Capcom',
    year: 1994,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Demon%27s%20Crest%20%28USA%29.zip',
    description: 'Guide the gargoyle Firebrand as he searches for magical elemental crests to seek vengeance against his nemesis Phalanx.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-fire',
    system: 'snes'
  },
  {
    id: 'wild_guns',
    title: 'Wild Guns',
    publisher: 'Natsume',
    year: 1994,
    genre: 'Sci-Fi Shooter',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Wild%20Guns%20%28USA%29.zip',
    description: 'Enjoy a wild steampunk-western gallery shooter! Dodge crossfire, swing lasso tools, and gun down giant biomechanical bosses.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-gun',
    system: 'snes'
  },
  {
    id: 'sunset_riders',
    title: 'Sunset Riders',
    publisher: 'Konami',
    year: 1993,
    genre: 'Run & Gun',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Sunset%20Riders%20%28USA%29.zip',
    description: 'Hunt down outlaws for bounty rewards in a fast-paced, colorful, bullet-filled cooperative run-and-gun wild-western arcade classic.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-dollar-sign',
    system: 'snes'
  },
  {
    id: 'zombies_ate_my_neighbors',
    title: 'Zombies Ate My Neighbors',
    publisher: 'Konami / LucasArts',
    year: 1993,
    genre: 'Action Shooter',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Zombies%20Ate%20My%20Neighbors%20%28USA%29.zip',
    description: 'Run through neighborhoods, malls, and castles saving innocent civilians from various cult classic horror movie monsters.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-biohazard',
    system: 'snes'
  },
  {
    id: 'earthworm_jim',
    title: 'Earthworm Jim',
    publisher: 'Playmates / Shiny',
    year: 1994,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Earthworm%20Jim%20%28USA%29.zip',
    description: 'Pilot an ultra-high-tech suit in this wacky surrealist platformer as a worm blasting through bizarre intergalactic planets.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-worm',
    system: 'snes'
  },
  {
    id: 'blackthorne',
    title: 'Blackthorne',
    publisher: 'Interplay / Blizzard',
    year: 1994,
    genre: 'Cinematic Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Blackthorne%20%28USA%29.zip',
    description: 'Control Kyle Vlaros using tactical cover, shotgun back-blasts, and athletic leaps to liberate planet Tuul from monsters.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-user-ninja',
    system: 'snes'
  },
  {
    id: 'flashback',
    title: 'Flashback: The Quest for Identity',
    publisher: "U.S. Gold / Delphine Entertainment",
    year: 1993,
    genre: 'Cinematic Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Flashback%20-%20The%20Quest%20for%20Identity%20%28USA%29%20%28En%2CFr%2CDe%29.zip',
    description: 'Explore immersive platforms as Conrad while trying to regain vanished memories and reveal hidden alien impostors.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-mask',
    system: 'snes'
  },
  {
    id: 'another_world',
    title: 'Out of this World (Another World)',
    publisher: 'Interplay',
    year: 1992,
    genre: 'Cinematic Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Out%20of%20this%20World%20%28USA%29.zip',
    description: 'Escape traps, befriend aliens, and solve puzzles across a mysterious planet after a nuclear lab experiment goes wrong.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-meteor',
    system: 'snes'
  },
  {
    id: 'prince_of_persia',
    title: 'Prince of Persia',
    publisher: 'Konami',
    year: 1992,
    genre: 'Cinematic Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Prince%20of%20Persia%20%28USA%29.zip',
    description: 'Escape castle dungeons, defeat guard patrols, avoid blade traps, and save the princess within 120 minutes.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-hourglass-start',
    system: 'snes'
  },
  {
    id: 'simcity',
    title: 'SimCity',
    publisher: 'Nintendo / Maxis',
    year: 1991,
    genre: 'City Simulator',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/SimCity%20%28USA%29.zip',
    description: 'Build power plants, layout roads, organize zoning, and direct disaster plans to build an organized retro metropolitan city.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-city',
    system: 'snes'
  },
  {
    id: 'pilotwings',
    title: 'Pilotwings',
    publisher: 'Nintendo',
    year: 1990,
    genre: 'Flight Simulation',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Pilotwings%20%28USA%29.zip',
    description: 'Earn aviation licenses by pilot training skydiving, hang gliders, light aircrafts, and rocket belts.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-wind',
    system: 'snes'
  },
  {
    id: 'uniracers',
    title: 'Uniracers (Unirally)',
    publisher: 'Nintendo / DMA Design',
    year: 1994,
    genre: 'Racing / Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Uniracers%20%28USA%29.zip',
    description: 'Guide unmanned unicycles down tricky tracks, executing twists and loops to boost and accelerate to victory.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-wheelchair',
    system: 'snes'
  },
  {
    id: 'rock_n_roll_racing',
    title: "Rock n' Roll Racing",
    publisher: 'Interplay / Blizzard',
    year: 1993,
    genre: 'Combat Racing',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Rock%20n%27%20Roll%20Racing%20%28USA%29.zip',
    description: 'Inundate racetracks with heavy metal music, lasers, and custom armed space karts in this top-down classic fighter-racer.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-guitar',
    system: 'snes'
  },
  {
    id: 'killer_instinct',
    title: 'Killer Instinct',
    publisher: 'Nintendo / Rare / Midway',
    year: 1995,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Killer%20Instinct%20%28USA%29.zip',
    description: 'Deliver record breaking continuous combos, countermoves, and Ultra Finishers in this iconic dark fantasy fighter.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-bolt',
    system: 'snes'
  },
  {
    id: 'mega_man_x',
    title: 'Mega Man X',
    publisher: 'Capcom',
    year: 1993,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Mega%20Man%20X%20%28USA%29.zip',
    description: 'Jump, slide down walls, and gather armor modifications to defeat the rebellious Reploid Mavericks led by Sigma.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-biohazard',
    system: 'snes'
  },
  {
    id: 'final_fight',
    title: 'Final Fight',
    publisher: 'Capcom',
    year: 1990,
    genre: 'Beat \'Em Up',
    romUrl: 'https://archive.org/download/super-nintendo-snes-rom-collection-usa/Final%20Fight%20%28USA%29.zip',
    description: 'Clean up Metro City streets alongside Haggar and Cody to locate and save Haggar\'s daughter from the Mad Gear gang.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-hand-fist',
    system: 'snes'
  },

  // --- GAME BOY ADVANCE (GBA) GAMES ---
  {
    id: 'pokemon_ruby_sapphire',
    title: 'Pokémon - Ruby Version & Sapphire Version',
    publisher: 'Nintendo / Game Freak',
    year: 2002,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Pokemon%20-%20Ruby%20Version%20%26%20Sapphire%20Version.zip/Pokemon%20-%20Saphir-Edition%20%28G%29%20%28V1.0%29.gba',
    description: 'Explore the vast, water-filled Hoenn region, meet the third generation of Pokémon, and fight back Team Magma or Team Aqua.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-water',
    system: 'gba'
  },
  {
    id: 'pokemon_emerald',
    title: 'Pokémon - Emerald Version',
    publisher: 'Nintendo / Game Freak',
    year: 2004,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Pokemon%20-%20Emerald%20Version.zip/Pokemon%20-%20Emerald%20%28J%29.gba',
    description: 'The definitive Hoenn adventure. Command premium battle strategies inside Battle Frontier to stop Groudon and Kyogre clash using Rayquaza.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-gem',
    system: 'gba'
  },
  {
    id: 'pokemon_leafgreen_firered',
    title: 'Pokémon - Leaf Green Version & Fire Red Version',
    publisher: 'Nintendo / Game Freak',
    year: 2004,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Pokemon%20-%20Leaf%20Green%20Version%20%26%20Fire%20Red%20Version.zip/Pokemon%20-%20Fire%20Red%20%28J%29%20%28V1.0%29.gba',
    description: 'Re-explore Kanto in a gorgeous expanded layout. Journey to complete the Pokédex and conquer elite league championships.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-fire',
    system: 'gba'
  },
  {
    id: 'pokemon_mystery_dungeon',
    title: 'Pokémon Mystery Dungeon - Red Rescue Team',
    publisher: 'Nintendo / Chunsoft',
    year: 2005,
    genre: 'Dungeon Crawler',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Pokemon%20Mystery%20Dungeon%20-%20Red%20Rescue%20Team.zip/Pokemon%20Mystery%20Dungeon%20-%20Red%20Rescue%20Team%20%28E%29%20%28M5%29.gba',
    description: 'Wake up directly as a Pokémon! Cooperate with companions inside mystery dungeons to execute heroic rescues and discover your identity.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-compass',
    system: 'gba'
  },
  {
    id: 'pokemon_pinball_rs',
    title: 'Pokémon Pinball - Ruby & Sapphire',
    publisher: 'Nintendo / Jupiter',
    year: 2003,
    genre: 'Pinball',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Pokemon%20Pinball%20-%20Ruby%20%26%20Sapphire.zip/Pokemon%20Pinball%20-%20Ruby%20%26%20Sapphire%20%28E%29%20%28M5%29.gba',
    description: 'Launch Pokéball pinballs across vibrant boards, catch and hatch Pokémon, and record high score combinations.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-circle-dot',
    system: 'gba'
  },
  {
    id: 'zelda_alttp_fourswords',
    title: 'The Legend of Zelda: A Link To The Past / Four Swords',
    publisher: 'Nintendo / Capcom',
    year: 2002,
    genre: 'Action-Adventure',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Legend%20of%20Zelda%2C%20The%20-%20A%20Link%20To%20The%20Past%20Four%20Swords.zip/Legend%20of%20Zelda%2C%20The%20-%20A%20Link%20To%20The%20Past%20Four%20Swords%20%28E%29%20%28M5%29%20%5B%21%5D.gba',
    description: 'Experience the SNES classic Link to the Past enhanced on GBA, paired with the cooperative multi-player Four Swords.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-shield-halved',
    system: 'gba'
  },
  {
    id: 'zelda_minish_cap',
    title: 'The Legend of Zelda: The Minish Cap',
    publisher: 'Nintendo / Capcom',
    year: 2004,
    genre: 'Action-Adventure',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Legend%20of%20Zelda%2C%20The%20-%20The%20Minish%20Cap.zip/Legend%20of%20Zelda%2C%20The%20-%20The%20Minish%20Cap%20%28E%29%20%28M5%29.gba',
    description: 'Shrink Link down to microscopic proportions with Ezlo the magic hat to explore the hidden Minish world.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-hat-wizard',
    system: 'gba'
  },
  {
    id: 'metroid_fusion',
    title: 'Metroid Fusion',
    publisher: 'Nintendo',
    year: 2002,
    genre: 'Metroidvania',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Metroid%20Fusion.zip/Metroid%20Fusion%20%28U%29%20%5B%21%5D.gba',
    description: 'Survive on a space biological research station haunted by the deadly X parasite mimicking Samus\'s peak capabilities.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-radiation',
    system: 'gba'
  },
  {
    id: 'metroid_zero_mission',
    title: 'Metroid - Zero Mission',
    publisher: 'Nintendo',
    year: 2004,
    genre: 'Metroidvania',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Metroid%20-%20Zero%20Mission.zip/Metroid%20-%20Zero%20Mission%20%28U%29%20%5B%21%5D.gba',
    description: 'Re-live bounty hunter Samus Aran\'s original mission on Planet Zebes in of the finest action platform revisions ever made.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-jet-fighter',
    system: 'gba'
  },
  {
    id: 'castlevania_aria',
    title: 'Castlevania - Aria of Sorrow',
    publisher: 'Konami',
    year: 2003,
    genre: 'Metroidvania',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Castlevania%20-%20Aria%20of%20Sorrow.zip/Castlevania%20-%20Aria%20of%20Sorrow%20%28U%29%20%5B%21%5D.gba',
    description: 'Play as Soma Cruz inside Dracula\'s eclipse-entombed castle. Command monsters\' souls to unleash magic.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-ghost',
    system: 'gba'
  },
  {
    id: 'castlevania_circle',
    title: 'Castlevania - Circle of the Moon',
    publisher: 'Konami',
    year: 2001,
    genre: 'Metroidvania',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Castlevania%20-%20Circle%20of%20the%20Moon.zip/Castlevania%20-%20Circle%20of%20the%20Moon%20%28U%29%20%5B%21%5D.gba',
    description: 'Confront Carmilla and Dracula inside dark chambers using customizable card combinations.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-skull',
    system: 'gba'
  },
  {
    id: 'castlevania_harmony',
    title: 'Castlevania - Harmony of Dissonance',
    publisher: 'Konami',
    year: 2002,
    genre: 'Metroidvania',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Castlevania%20-%20Harmony%20of%20Dissonance.zip/Castlevania%20-%20Harmony%20of%20Dissonance%20%28E%29%20%5B%21%5D.gba',
    description: 'Direct Juste Belmont through parallel castle dimensions to retrieve a lost childhood companion.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-wand-magic',
    system: 'gba'
  },
  {
    id: 'castlevania_double_pack',
    title: '2-in-1 - Castlevania Double Pack - Harmony of Dissonance & Aria of Sorrow',
    publisher: 'Konami',
    year: 2005,
    genre: 'Metroidvania',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/2-in-1%20-%20Castlevania%20Double%20Pack%20-%20Harmony%20of%20Dissonance%20%26%20Aria%20of%20Sorrow.zip/2-in-1%20-%20Castlevania%20Double%20Pack%20-%20Harmony%20of%20Dissonance%20%26%20Aria%20of%20Sorrow%20%28U%29.gba',
    description: 'Get two of the best GBA Metroidvania games of all time in a single, gorgeous emulator cartridge package.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-skull-crossbones',
    system: 'gba'
  },
  {
    id: 'golden_sun',
    title: 'Golden Sun',
    publisher: 'Nintendo / Camelot',
    year: 2001,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Golden%20Sun.zip/Golden%20Sun%20%28UE%29%20%5B%21%5D.gba',
    description: 'Unleash direct elemental psynergy magic onto enemies and direct fantasy party alignments in this visually stunning RPG.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-sun',
    system: 'gba'
  },
  {
    id: 'golden_sun_lost_age',
    title: 'Golden Sun - The Lost Age',
    publisher: 'Nintendo / Camelot',
    year: 2002,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Golden%20Sun%20-%20The%20Lost%20Age.zip/Golden%20Sun%20-%20The%20Lost%20Age%20%28UE%29%20%5B%21%5D.gba',
    description: 'Confront alchemy dilemmas from the opposing side\'s perspective in the breathtaking, direct epic sequel to Golden Sun.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-hourglass-start',
    system: 'gba'
  },
  {
    id: 'mario_luigi_superstar',
    title: 'Mario & Luigi - Superstar Saga',
    publisher: 'Nintendo / AlphaDream',
    year: 2003,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Mario%20%26%20Luigi%20-%20Superstar%20Saga.zip/Mario%20%26%20Luigi%20-%20Superstar%20Saga%20%28U%29.gba',
    description: 'Command both Mario and Luigi simultaneously using action commands inside the bizarre, hilarity-filled Beanbean Kingdom.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-users',
    system: 'gba'
  },
  {
    id: 'super_mario_advance_1',
    title: 'Super Mario Advance (Super Mario Bros. 2)',
    publisher: 'Nintendo',
    year: 2001,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Super%20Mario%20Advance.zip/Super%20Mario%20Advance%20%28U%29%20%5B%21%5D.gba',
    description: 'Throw radishes, ride carpets, and battle Wart in this gorgeous classic GBA launch titles platformer adaptation.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-circle-plus',
    system: 'gba'
  },
  {
    id: 'super_mario_advance_2',
    title: 'Super Mario Advance 2 - Super Mario World',
    publisher: 'Nintendo',
    year: 2001,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Super%20Mario%20Advance%202%20-%20Super%20Mario%20World.zip/Super%20Mario%20Advance%202%20-%20Super%20Mario%20World%20%28U%29%20%5B%21%5D.gba',
    description: 'Super Mario World, meticulously adapted to hand-held controls. Collect stars, ride Yoshi, and defeat Bowser.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-egg',
    system: 'gba'
  },
  {
    id: 'super_mario_advance_3',
    title: "Super Mario Advance 3 - Yoshi's Island",
    publisher: 'Nintendo',
    year: 2002,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Super%20Mario%20Advance%203%20-%20Yoshi%27s%20Island.zip/Super%20Mario%20Advance%203%20-%20Yoshi%27s%20Island%20%28U%29%20%5B%21%5D.gba',
    description: 'Yoshi\'s Island platforming perfection on the go. Protect Baby Mario, throw eggs, and destroy Kamek\'s spells.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-clover',
    system: 'gba'
  },
  {
    id: 'super_mario_advance_4',
    title: 'Super Mario Advance 4 - Super Mario Bros. 3',
    publisher: 'Nintendo',
    year: 2003,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Super%20Mario%20Advance%204%20-%20Super%20Mario%20Bros.%203.zip/Super%20Mario%20Advance%204%20-%20Super%20Mario%20Bros.%203%20%28U%29%20%28V1.0%29.gba',
    description: 'The golden NES classic Super Mario Bros 3 enhanced on GBA, complete with dynamic colors and vocal prompts.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-feather',
    system: 'gba'
  },
  {
    id: 'mario_kart_super_circuit',
    title: 'Mario Kart Super Circuit',
    publisher: 'Nintendo / Intelligent Systems',
    year: 2001,
    genre: 'Kart Racing',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Mario%20Kart%20Super%20Circuit.zip/Mario%20Kart%20Super%20Circuit%20%28U%29%20%5B%21%5D.gba',
    description: 'Enjoy 40 unique hand-held kart racing tracks, drift curves, and launch shells across GBA and retro circuits.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-flag-checkered',
    system: 'gba'
  },
  {
    id: 'mario_golf_advance_tour',
    title: 'Mario Golf - Advance Tour',
    publisher: 'Nintendo / Camelot',
    year: 2004,
    genre: 'Sports / RPG',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Mario%20Golf%20-%20Advance%20Tour.zip/Mario%20Golf%20-%20Advance%20Tour%20%28U%29.gba',
    description: 'Embark on a charming role-playing athletic adventure! Level up stats, challenge club maps, and meet Mario.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-arrow-trend-up',
    system: 'gba'
  },
  {
    id: 'mario_tennis_advance',
    title: 'Mario Tennis Advance - Power Tour',
    publisher: 'Nintendo / Camelot',
    year: 2005,
    genre: 'Sports / RPG',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Mario%20Tennis%20Advance%20-%20Power%20Tour.zip/Mario%20Tennis%20Advance%20-%20Power%20Tour%20%28U%29.gba',
    description: 'Train to execute mystical physical super shots inside academy brackets to gain tennis championship ranks.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-baseball',
    system: 'gba'
  },
  {
    id: 'mario_party_advance',
    title: 'Mario Party Advance',
    publisher: 'Nintendo / Hudson',
    year: 2005,
    genre: 'Party / Board',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Mario%20Party%20Advance.zip/Mario%20Party%20Advance%20%28U%29.gba',
    description: 'Solve whimsical Shroom City resident quests in a digital Board game suited for handheld singleplay.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-dice',
    system: 'gba'
  },
  {
    id: 'mario_pinball_land',
    title: 'Mario Pinball Land',
    publisher: 'Nintendo / Fuse Games',
    year: 2004,
    genre: 'Pinball',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Mario%20Pinball%20Land.zip/Mario%20Pinball%20Land%20%28U%29.gba',
    description: 'Roll Mario directly as a pinball across five themed worlds to gather stars and rescue Peach from Bowser.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-circle-nodes',
    system: 'gba'
  },
  {
    id: 'mario_vs_donkey_kong',
    title: 'Mario vs. Donkey Kong',
    publisher: 'Nintendo',
    year: 2004,
    genre: 'Puzzle-Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Mario%20vs.%20Donkey%20Kong.zip/Mario%20vs.%20Donkey%20Kong%20%28U%29%20%5B%21%5D.gba',
    description: 'Recover stolen Mini-Mario toys from Donkey Kong by maneuvering keys and switches across puzzling worlds.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-key',
    system: 'gba'
  },
  {
    id: 'kirby_nightmare_dreamland',
    title: 'Kirby - Nightmare in Dreamland',
    publisher: 'Nintendo / HAL Laboratory',
    year: 2002,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Kirby%20-%20Nightmare%20in%20Dreamland.zip/Kirby%20-%20Nightmare%20in%20Dreamland%20%28U%29%20%5B%21%5D.gba',
    description: 'Help Kirby retrieve the magical Star Rod from King Dedede to restore dreams to the residents of Dream Land.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-circle',
    system: 'gba'
  },
  {
    id: 'kirby_amazing_mirror',
    title: 'Kirby & The Amazing Mirror',
    publisher: 'Nintendo / HAL Laboratory',
    year: 2004,
    genre: 'Metroidvania',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Kirby%20%26%20The%20Amazing%20Mirror.zip/Kirby%20%26%20The%20Amazing%20Mirror%20%28U%29%20%5Bt1%5D.gba',
    description: 'Explore the Mirror World inside a gorgeous open-ended Metroidvania labyrinth, calling on multi-colored clone Kirbys for assistance.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-wand-magic-sparkles',
    system: 'gba'
  },
  {
    id: 'wario_land_4',
    title: 'Wario Land 4',
    publisher: 'Nintendo',
    year: 2001,
    genre: '2D Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Wario%20Land%204.zip/Wario%20Land%204%20%28UE%29%20%5B%21%5D.gba',
    description: 'Dash, stomp, and grab treasure from a golden pyramid before the escape timer counts to zero.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-sack-dollar',
    system: 'gba'
  },
  {
    id: 'warioware_inc',
    title: 'WarioWare Inc.',
    publisher: 'Nintendo',
    year: 2003,
    genre: 'Party / Minigames',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/WarioWare%20Inc..zip/WarioWare%20Inc.%20%28U%29.gba',
    description: 'Execute hundreds of fast-paced, 5-second microgames inside of a chaotic split-second tournament barrage.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-cubes',
    system: 'gba'
  },
  {
    id: 'warioware_twisted',
    title: 'WarioWare - Twisted!',
    publisher: 'Nintendo',
    year: 2004,
    genre: 'Party / Minigames',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/WarioWare%20-%20Twisted%21.zip/WarioWare%20-%20Twisted%21%20%28U%29.gba',
    description: 'Spin and tilt your hand-held screen to complete unique action puzzles in of the best physical game ideas ever crafted.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-rotate-right',
    system: 'gba'
  },
  {
    id: 'ff_tactics_advance',
    title: 'Final Fantasy Tactics Advance',
    publisher: 'Squaresoft / Nintendo',
    year: 2003,
    genre: 'Tactical RPG',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Final%20Fantasy%20Tactics%20Advance.zip/Final%20Fantasy%20Tactics%20Advance%20%28U%29%20%5B%21%5D.gba',
    description: 'Direct specialized clan divisions through battlefield maps while abiding by magical law rules outlined by judges.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-chess-board',
    system: 'gba'
  },
  {
    id: 'ff4_advance',
    title: 'Final Fantasy IV Advance',
    publisher: 'Squaresoft / Nintendo',
    year: 2005,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Final%20Fantasy%20IV%20Advance.zip/Final%20Fantasy%20IV%20Advance%20%28U%29.gba',
    description: 'The golden JRPG masterpiece complete with added post-game dungeon trials and customizable characters.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-fire',
    system: 'gba'
  },
  {
    id: 'ff5_advance',
    title: 'Final Fantasy V Advance',
    publisher: 'Squaresoft / Nintendo',
    year: 2006,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Final%20Fantasy%20V%20Advance.zip/Final%20Fantasy%20V%20Advance%20%28U%29.gba',
    description: 'Explore highly technical, deep JRPG job classification custom combinations inside of a marvelous fantasy layout.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-shield-halved',
    system: 'gba'
  },
  {
    id: 'ff6_advance',
    title: 'Final Fantasy VI Advance',
    publisher: 'Squaresoft / Nintendo',
    year: 2006,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Final%20Fantasy%20VI%20Advance.zip/Final%20Fantasy%20VI%20Advance%20%28U%29.gba',
    description: 'The definitive edition of the beloved 16-bit JRPG. Gather 14 heroes to destroy Kefka\'s apocalyptic world rule.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-crown',
    system: 'gba'
  },
  {
    id: 'ff_dawn_souls',
    title: 'Final Fantasy I & II - Dawn of Souls',
    publisher: 'Squaresoft / Nintendo',
    year: 2004,
    genre: 'Role-Playing Game',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Final%20Fantasy%20I%20%26%20II%20-%20Dawn%20of%20Souls.zip/Final%20Fantasy%20I%20%26%20II%20-%20Dawn%20of%20Souls%20%28U%29.gba',
    description: 'Play both classic NES blockbusters completely redrawn with convenient balance settings and extra dungeons.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-book-open',
    system: 'gba'
  },
  {
    id: 'fire_emblem_7',
    title: 'Fire Emblem',
    publisher: 'Nintendo / Intelligent Systems',
    year: 2003,
    genre: 'Tactical RPG',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Fire%20Emblem.zip/Fire%20Emblem%20%28U%29%20%5B%21%5D.gba',
    description: 'Command soldiers inside dangerous permadeath turn-based combat battle zones to liberate Elibe territory with Eliwood and Lyn.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-shield-heart',
    system: 'gba'
  },
  {
    id: 'fire_emblem_sacred',
    title: 'Fire Emblem - The Sacred Stones',
    publisher: 'Nintendo / Intelligent Systems',
    year: 2004,
    genre: 'Tactical RPG',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Fire%20Emblem%20-%20The%20Sacred%20Stones.zip/Fire%20Emblem%20-%20The%20Sacred%20Stones%20%28U%29.gba',
    description: 'Guide twin royalty heirs Ephraim and Eirika to push back demonic invasions across Magvel lands.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-gem',
    system: 'gba'
  },
  {
    id: 'fire_emblem_binding',
    title: 'Fire Emblem - Fuuin no Tsurugi (The Binding Blade)',
    publisher: 'Nintendo / Intelligent Systems',
    year: 2002,
    genre: 'Tactical RPG',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Fire%20Emblem%20-%20Fuuin%20no%20Tsurugi.zip/Fire%20Emblem%20-%20Fuuin%20no%20Tsurugi%20%28J%29%20%5B%21%5D.gba',
    description: 'Play Roy\'s legendary Japanese exclusive fantasy adventure, translating beautiful sprite mechanics straight onto your screen.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-flag',
    system: 'gba'
  },
  {
    id: 'sonic_advance_1',
    title: 'Sonic Advance',
    publisher: 'Sega / Dimps',
    year: 2001,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Sonic%20Advance.zip/Sonic%20Advance%20%28U%29%20%5B%21%5D.gba',
    description: 'Dash past loops and loops of mechanical obstacle hazards as Sonic, Tails, Knuckles, or Amy Rose.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-gauge-high',
    system: 'gba'
  },
  {
    id: 'sonic_advance_2',
    title: 'Sonic Advance 2',
    publisher: 'Sega / Dimps',
    year: 2002,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Sonic%20Advance%202.zip/Sonic%20Advance%202%20%28U%29%20%28M6%29%20%5B%21%5D.gba',
    description: 'Speed actions scaled to the extreme! Accelerate and jump seamlessly through vast platforms with Cream the Rabbit.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-bolt',
    system: 'gba'
  },
  {
    id: 'sonic_advance_3',
    title: 'Sonic Advance 3',
    publisher: 'Sega / Dimps',
    year: 2004,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Sonic%20Advance%203.zip/Sonic%20Advance%203%20%28U%29%20%28M6%29.gba',
    description: 'Combine character couples to unlock special movement speed tags and double combat capabilities.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-people-group',
    system: 'gba'
  },
  {
    id: 'sonic_battle',
    title: 'Sonic Battle',
    publisher: 'Sega',
    year: 2003,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Sonic%20Battle.zip/Sonic%20Battle%20%28U%29%20%28M6%29.gba',
    description: 'Engage in 3D arena battles with Sonic characters, customizing Emerl\'s skills to unleash custom combo attacks.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-hand-fist',
    system: 'gba'
  },
  {
    id: 'sonic_pinball_party',
    title: 'Sonic Pinball Party',
    publisher: 'Sega',
    year: 2003,
    genre: 'Pinball',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Sonic%20Pinball%20Party.zip/Sonic%20Pinball%20Party%20%28U%29%20%28M6%29.gba',
    description: 'Battle Dr. Eggman across vibrant pinball boards referencing beloved Sonic, Nights, and Samba de Amigo universes.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-circle-dot',
    system: 'gba'
  },
  {
    id: 'megaman_bn_1',
    title: 'Mega Man Battle Network',
    publisher: 'Capcom',
    year: 2001,
    genre: 'Action-RPG',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Megaman%20Battle%20Network.zip/Megaman%20Battle%20Network%20%28U%29%20%5B%21%5D.gba',
    description: 'Plug Lan into digital cyberspace to guide MegaMan.EXE in action-card micro tactical battle zones.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-network-wired',
    system: 'gba'
  },
  {
    id: 'megaman_bn_2',
    title: 'Mega Man Battle Network 2',
    publisher: 'Capcom',
    year: 2001,
    genre: 'Action-RPG',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Megaman%20Battle%20Network%202.zip/Megaman%20Battle%20Network%202%20%28U%29%20%5B%21%5D.gba',
    description: 'Confront net-terrorism with advanced customization slots and elements-based physical transformations.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-layer-group',
    system: 'gba'
  },
  {
    id: 'megaman_bn_3',
    title: 'Mega Man Battle Network 3',
    publisher: 'Capcom',
    year: 2002,
    genre: 'Action-RPG',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Megaman%20Battle%20Network%203.zip/Megaman%20Battle%20Network%203%20-%20Blue%20Version%20%28U%29%20%5B%21%5D.gba',
    description: 'Uncover the final technical secrets of the WWW net alliance in this highly-rated strategic network RPG installment.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-star',
    system: 'gba'
  },
  {
    id: 'megaman_zero',
    title: 'Mega Man Zero',
    publisher: 'Capcom / Inti Creates',
    year: 2002,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Megaman%20Zero.zip/Megaman%20Zero%20%28U%29.gba',
    description: 'Guide Zero through high-stakes, fast-paced action-platformer battles with gun and saber configurations.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-biohazard',
    system: 'gba'
  },
  {
    id: 'megaman_zero2',
    title: 'Mega Man Zero 2',
    publisher: 'Capcom / Inti Creates',
    year: 2003,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Megaman%20Zero%202.zip/Megaman%20Zero%202%20%28U%29.gba',
    description: 'Upgrade your resistance weapons arsenal and execute technical platforming counter combos to secure ranking points.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-shield-heart',
    system: 'gba'
  },
  {
    id: 'king_hearts_chain',
    title: 'Kingdom Hearts - Chain of Memories',
    publisher: 'Squaresoft / Disney',
    year: 2004,
    genre: 'Action-RPG',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Kingdom%20Hearts%20-%20Chain%20of%20Memories.zip/Kingdom%20Hearts%20-%20Chain%20of%20Memories%20%28U%29.gba',
    description: 'Ascend Castle Oblivion using an innovative card combat system. Discover hidden memories alongside Sora, Donald, and Goofy.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-heart',
    system: 'gba'
  },
  {
    id: 'yugioh_eternal_duelist',
    title: 'Yu-Gi-Oh! - The Eternal Duelist Soul',
    publisher: 'Konami',
    year: 2002,
    genre: 'Card Battle',
    romUrl: 'https://archive.org/download/GameboyAdvanceRomCollectionByGhostware/Yu-Gi-Oh%21%20-%20The%20Eternal%20Duelist%20Soul.zip/Yu-Gi-Oh%21%20-%20The%20Eternal%20Duelist%20Soul%20%28U%29%20%5B%21%5D.gba',
    description: 'Duel against classic Yu-Gi-Oh! characters, construct your deck with over 800 cards, and conquer tournament matches to prove you are the ultimate Duelist.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-clone',
    system: 'gba'
  }
];

// 3. Global State
let currentSystem: 'n64' | 'snes' | 'gba' = 'n64';

// 4. Main Initialization
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  renderGamesGrid();
});

// Update Controls Guide Card Content Dynamically
function updateControlsGuide() {
  const title = document.getElementById('controls-title');
  const body = document.getElementById('controls-body');
  if (!title || !body) return;

  if (currentSystem === 'n64') {
    title.textContent = 'N64 Controller Map';
    body.innerHTML = `
      <div class="control-grid">
        <div class="control-row"><span>Analog Stick</span><kbd><i class="fa-solid fa-arrows-up-down-left-right"></i> Arrows</kbd></div>
        <div class="control-row"><span>Start Button</span><kbd>Enter</kbd></div>
        <div class="control-row"><span>Button A</span><kbd>Z</kbd></div>
        <div class="control-row"><span>Button B</span><kbd>X</kbd></div>
        <div class="control-row"><span>Z Trigger</span><kbd>Shift</kbd></div>
        <div class="control-row"><span>C-Buttons</span><kbd>W, A, S, D</kbd></div>
        <div class="control-row"><span>L / R Shoulder</span><kbd>Q / E</kbd></div>
      </div>
      <p class="controllers-tip"><i class="fa-solid fa-circle-info"></i> Plug in any standard USB/Bluetooth controller (PS5, Xbox, Switch) and it will map automatically!</p>
    `;
  } else if (currentSystem === 'gba') {
    title.textContent = 'GBA Controller Map';
    body.innerHTML = `
      <div class="control-grid">
        <div class="control-row"><span>D-Pad</span><kbd><i class="fa-solid fa-arrows-up-down-left-right"></i> Arrows</kbd></div>
        <div class="control-row"><span>Start Button</span><kbd>Enter</kbd></div>
        <div class="control-row"><span>Select Button</span><kbd>Shift</kbd></div>
        <div class="control-row"><span>Button A</span><kbd>X</kbd></div>
        <div class="control-row"><span>Button B</span><kbd>Z</kbd></div>
        <div class="control-row"><span>L / R Shoulder</span><kbd>Q / E</kbd></div>
      </div>
      <p class="controllers-tip"><i class="fa-solid fa-circle-info"></i> Plug in any standard USB/Bluetooth controller (PS5, Xbox, Switch) and it will map automatically!</p>
    `;
  } else {
    title.textContent = 'SNES Controller Map';
    body.innerHTML = `
      <div class="control-grid">
        <div class="control-row"><span>D-Pad</span><kbd><i class="fa-solid fa-arrows-up-down-left-right"></i> Arrows</kbd></div>
        <div class="control-row"><span>Start Button</span><kbd>Enter</kbd></div>
        <div class="control-row"><span>Select Button</span><kbd>Shift</kbd></div>
        <div class="control-row"><span>Button A</span><kbd>X</kbd></div>
        <div class="control-row"><span>Button B</span><kbd>Z</kbd></div>
        <div class="control-row"><span>Button X</span><kbd>S</kbd></div>
        <div class="control-row"><span>Button Y</span><kbd>A</kbd></div>
        <div class="control-row"><span>L / R Shoulder</span><kbd>Q / E</kbd></div>
      </div>
      <p class="controllers-tip"><i class="fa-solid fa-circle-info"></i> Plug in any standard USB/Bluetooth controller (PS5, Xbox, Switch) and it will map automatically!</p>
    `;
  }
}

// Render library grid with filter & search
function renderGamesGrid(filterText = '') {
  const container = document.getElementById('games-container');
  const libraryTitle = document.getElementById('library-title');
  if (!container) return;
  
  // Update section title
  if (libraryTitle) {
    if (currentSystem === 'n64') {
      libraryTitle.textContent = 'N64 Games Library';
    } else if (currentSystem === 'gba') {
      libraryTitle.textContent = 'GBA Games Library';
    } else {
      libraryTitle.textContent = 'SNES Games Library';
    }
  }

  container.innerHTML = '';
  const query = filterText.toLowerCase().trim();

  // First filter by selected platform
  const systemGames = FEATURED_GAMES.filter(game => game.system === currentSystem);

  // Then filter by search query
  const filtered = systemGames.filter(game => {
    return game.title.toLowerCase().includes(query) || 
           game.publisher.toLowerCase().includes(query) || 
           game.genre.toLowerCase().includes(query);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="glass-card" style="grid-column: 1/-1; padding: 3rem; text-align: center; color: var(--color-text-muted);">
        <i class="fa-solid fa-ghost" style="font-size: 3rem; color: rgba(255,255,255,0.05); margin-bottom: 1rem; display: block;"></i>
        No games found matching your search.
      </div>
    `;
    return;
  }

  filtered.forEach(game => {
    const isPlayable = !!game.romUrl;
    
    const card = document.createElement('div');
    card.className = `glass-card game-card`;
    card.innerHTML = `
      <div class="game-cover-wrapper ${game.gradientClass}">
        ${game.coverImage 
          ? `<img src="${game.coverImage}" class="game-cover-art" alt="${game.title}" />`
          : `<i class="fa-solid ${game.icon} game-cover-placeholder"></i>`
        }
        <div class="game-status-indicator">
          ${isPlayable 
            ? '<span class="status-badge success"><i class="fa-solid fa-cloud"></i> Online Stream</span>'
            : '<span class="status-badge warning"><i class="fa-solid fa-circle-plus"></i> Setup Needed</span>'
          }
        </div>
        <div class="play-hover-overlay">
          <div class="play-hover-btn">
            <i class="fa-solid ${isPlayable ? 'fa-play' : 'fa-gear'}"></i>
          </div>
        </div>
      </div>
      <div class="game-info-box">
        <span class="game-genre-tag">${game.genre}</span>
        <h3 class="game-title" title="${game.title}">${game.title}</h3>
        <p class="game-publisher">${game.publisher}</p>
        <div class="game-meta-row">
          <span><i class="fa-solid fa-calendar"></i> ${game.year}</span>
          <span><i class="fa-solid fa-globe"></i> NTSC-U</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      if (isPlayable) {
        launchGame(game.romUrl, game.title);
      } else {
        openSetupModal(game);
      }
    });

    container.appendChild(card);
  });
}

// 5. Launch Emulator Player
function launchGame(gameUrl: string, gameTitle: string) {
  const modal = document.getElementById('emulator-modal');
  const iframe = document.getElementById('emulator-iframe') as HTMLIFrameElement;
  const titleSpan = document.getElementById('modal-game-title');
  
  if (!modal || !iframe || !titleSpan) return;

  titleSpan.textContent = gameTitle;
  
  // Set core explicitly to current system core (n64 or snes)
  const core = currentSystem;

  // Note: Served directly since archive.org allows CORS download requests
  const finalGameUrl = gameUrl;
  
  const playerUrl = `player.html?gameUrl=${encodeURIComponent(finalGameUrl)}&gameName=${encodeURIComponent(gameTitle)}&core=${core}`;
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  iframe.src = playerUrl;
}

function closeEmulator() {
  const modal = document.getElementById('emulator-modal');
  const iframe = document.getElementById('emulator-iframe') as HTMLIFrameElement;
  if (!modal || !iframe) return;

  iframe.src = 'about:blank';
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Setup Modal
function openSetupModal(game: Game) {
  const modal = document.getElementById('details-modal');
  if (!modal) return;
  
  const title = document.getElementById('detail-game-title');
  const pub = document.getElementById('detail-game-publisher');
  const year = document.getElementById('detail-game-year');
  const desc = document.getElementById('detail-game-desc');
  const path = document.getElementById('detail-expected-path');

  if (title) title.textContent = game.title;
  if (pub) pub.textContent = game.publisher;
  if (year) year.textContent = String(game.year);
  if (desc) desc.textContent = game.description;
  
  // Correctly show instructions path for ROM streaming url
  if (path) {
    path.textContent = game.romUrl || 'Online URL is not configured yet.';
  }
  
  modal.style.display = 'flex';
}

function closeSetupModal() {
  const modal = document.getElementById('details-modal');
  if (modal) modal.style.display = 'none';
}

// 6. Event Binding
function setupEventListeners() {
  // System selector buttons interaction
  const n64Btn = document.getElementById('system-btn-n64');
  const snesBtn = document.getElementById('system-btn-snes');
  const gbaBtn = document.getElementById('system-btn-gba');

  const selectSystem = (system: 'n64' | 'snes' | 'gba') => {
    currentSystem = system;
    
    // Update active class on buttons
    if (system === 'n64') {
      n64Btn?.classList.add('active');
      snesBtn?.classList.remove('active');
      gbaBtn?.classList.remove('active');
      
      // Update library subtitle border color with N64 gold
      const headerTitle = document.getElementById('library-title');
      if (headerTitle) {
        headerTitle.style.borderLeftColor = 'var(--color-gold)';
      }
    } else if (system === 'gba') {
      n64Btn?.classList.remove('active');
      snesBtn?.classList.remove('active');
      gbaBtn?.classList.add('active');
      
      // Update library subtitle border color with GBA green
      const headerTitle = document.getElementById('library-title');
      if (headerTitle) {
        headerTitle.style.borderLeftColor = 'var(--color-green)';
      }
    } else {
      n64Btn?.classList.remove('active');
      snesBtn?.classList.add('active');
      gbaBtn?.classList.remove('active');
      
      // Update library subtitle border color with SNES blue
      const headerTitle = document.getElementById('library-title');
      if (headerTitle) {
        headerTitle.style.borderLeftColor = 'var(--color-blue)';
      }
    }

    updateControlsGuide();
    renderGamesGrid();
  };

  n64Btn?.addEventListener('click', () => selectSystem('n64'));
  snesBtn?.addEventListener('click', () => selectSystem('snes'));
  gbaBtn?.addEventListener('click', () => selectSystem('gba'));

  // Search input
  document.getElementById('search-input')?.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value;
    renderGamesGrid(val);
  });

  // Close emulator
  document.getElementById('close-emulator-btn')?.addEventListener('click', closeEmulator);

  // Close setup details
  document.getElementById('close-details-btn')?.addEventListener('click', closeSetupModal);
  document.getElementById('details-modal')?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).id === 'details-modal') closeSetupModal();
  });
}

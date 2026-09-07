import { Game } from "./types";

// NEO GEO runs on the FinalBurn Neo (fbneo) core in EmulatorJS.
// ROMs are arcade-style .zip sets and REQUIRE the Neo Geo BIOS file
// `neogeo.zip` to sit alongside the game zip (EmulatorJS looks for it
// via EJS_biosUrl / the same folder as the ROM).
export const NEOGEO_GAMES: Game[] = [
  // --- SNK NEO GEO (MVS/AES) GAMES ---
  {
    id: 'metal_slug_x',
    title: 'Metal Slug X',
    publisher: 'SNK',
    year: 1999,
    genre: 'Run & Gun',
    romUrl: 'games/mslugx.zip',
    description: 'An enhanced remix of Metal Slug 2 — rebalanced enemy waves, new weapons, and the slowdown finally gone. The definitive way to play the second entry.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-person-rifle',
    system: 'neogeo'
  },
  {
    id: 'metal_slug_3',
    title: 'Metal Slug 3',
    publisher: 'SNK',
    year: 2000,
    genre: 'Run & Gun',
    romUrl: 'games/mslug3.zip',
    description: 'Widely hailed as the peak of the series. Branching paths, mutant crabs, zombies, a Mars finale, and the iconic vehicle roster.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-person-rifle',
    system: 'neogeo'
  },
  {
    id: 'metal_slug_4',
    title: 'Metal Slug 4',
    publisher: 'SNK Playmore / Mega Enterprise',
    year: 2002,
    genre: 'Run & Gun',
    romUrl: 'games/mslug4.zip',
    description: 'A combo-score system and new recruits Nadia and Trevor join the fight against the Amadeus hacker syndicate.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-person-rifle',
    system: 'neogeo'
  },
  {
    id: 'metal_slug_5',
    title: 'Metal Slug 5',
    publisher: 'SNK Playmore',
    year: 2003,
    genre: 'Run & Gun',
    romUrl: 'games/mslug5x.zip',
    description: 'The frantic hand-drawn run-and-gun returns with sliding dodges and a darker paramilitary campaign. Blast through enemy lines, free POWs, and commandeer the iconic SV-001 tank.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-person-rifle',
    system: 'neogeo'
  },
  {
    id: 'kof_2002',
    title: "The King of Fighters 2002",
    publisher: 'SNK Playmore / Eolith',
    year: 2002,
    genre: 'Fighting Game',
    romUrl: 'games/kof2002.zip',
    description: '"Challenge to Ultimate Battle" — a back-to-basics dream match with a 44-strong roster and the return of straight 3-on-3 team play.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-hand-fist',
    system: 'neogeo'
  },

  // NOTE: every title below streams its ROM from archive.org, so these entries
  // are commented out until local ROM sets (+ neogeo.zip BIOS) are added under
  // public/games/.
  /*
  {
    id: 'metal_slug',
    title: 'Metal Slug',
    publisher: 'SNK / Nazca',
    year: 1996,
    genre: 'Run & Gun',
    romUrl: 'https://archive.org/download/mslug_neogeo/mslug.zip',
    description: 'The debut of the frantic, hand-drawn run-and-gun classic. Blast through enemy lines, free POWs, and hijack the iconic SV-001 tank.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-person-rifle',
    system: 'neogeo'
  },
  {
    id: 'kof_98',
    title: "The King of Fighters '98",
    publisher: 'SNK',
    year: 1998,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/kof98_neogeo/kof98.zip',
    description: '"The Slugfest" — the dream-match entry with the largest roster and the most balanced system of the classic KOF era.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-hand-fist',
    system: 'neogeo'
  },
  {
    id: 'garou_motw',
    title: 'Garou: Mark of the Wolves',
    publisher: 'SNK',
    year: 1999,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/garou_neogeo/garou.zip',
    description: 'The stunning final Fatal Fury. Gorgeous sprite work and the T.O.P. / Just Defend systems make it a cult favorite.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-wolf-pack-battalion',
    system: 'neogeo'
  },
  {
    id: 'samurai_shodown_2',
    title: 'Samurai Shodown II',
    publisher: 'SNK',
    year: 1994,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/samsho2_neogeo/samsho2.zip',
    description: 'Weapon-based dueling at its finest. Deliberate spacing, deep parries, and brutal one-hit slashes.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-khanda',
    system: 'neogeo'
  },
  {
    id: 'last_blade_2',
    title: 'The Last Blade 2',
    publisher: 'SNK',
    year: 1998,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/lastbld2_neogeo/lastbld2.zip',
    description: 'Bakumatsu-era swordplay with Speed and Power styles, deflects, and some of the most atmospheric pixel art on the hardware.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-khanda',
    system: 'neogeo'
  },
  {
    id: 'blazing_star',
    title: 'Blazing Star',
    publisher: 'SNK / Yumekobo',
    year: 1998,
    genre: 'Shoot \'Em Up',
    romUrl: 'https://archive.org/download/blazstar_neogeo/blazstar.zip',
    description: 'A vivid pre-rendered horizontal shooter with a charge-shot combo system. "You fail it! Your skill is not enough!"',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-meteor',
    system: 'neogeo'
  },
  {
    id: 'pulstar',
    title: 'Pulstar',
    publisher: 'Aicom',
    year: 1995,
    genre: 'Shoot \'Em Up',
    romUrl: 'https://archive.org/download/pulstar_neogeo/pulstar.zip',
    description: 'The R-Type-inspired shooter with a detachable Force pod, chargeable shots, and huge organic bosses.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-rocket',
    system: 'neogeo'
  },
  {
    id: 'neo_turf_masters',
    title: 'Neo Turf Masters',
    publisher: 'Nazca',
    year: 1996,
    genre: 'Sports / Golf',
    romUrl: 'https://archive.org/download/turfmast_neogeo/turfmast.zip',
    description: 'The definitive arcade golf game. Snappy three-click swings, six international courses, and instantly readable shot shaping.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-golf-ball-tee',
    system: 'neogeo'
  },
  {
    id: 'windjammers',
    title: 'Windjammers',
    publisher: 'Data East',
    year: 1994,
    genre: 'Sports / Arcade',
    romUrl: 'https://archive.org/download/wjammers_neogeo/wjammers.zip',
    description: 'Frisbee air-hockey turned competitive fighting game. Lobs, smashes, and slick corner throws.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-compact-disc',
    system: 'neogeo'
  },
  {
    id: 'shock_troopers',
    title: 'Shock Troopers',
    publisher: 'Saurus',
    year: 1997,
    genre: 'Run & Gun',
    romUrl: 'https://archive.org/download/shocktro_neogeo/shocktro.zip',
    description: 'A top-down rotational run-and-gun with pickable squads and branching routes. A hidden Neo Geo gem.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-crosshairs',
    system: 'neogeo'
  },
  {
    id: 'magician_lord',
    title: 'Magician Lord',
    publisher: 'SNK / ADK',
    year: 1990,
    genre: 'Action-Platformer',
    romUrl: 'https://archive.org/download/maglord_neogeo/maglord.zip',
    description: 'A brutally hard launch-window platformer. Collect orbs to transform Elta into six elemental forms.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-hat-wizard',
    system: 'neogeo'
  },
  {
    id: 'puzzle_bobble',
    title: 'Puzzle Bobble',
    publisher: 'Taito',
    year: 1994,
    genre: 'Puzzle',
    romUrl: 'https://archive.org/download/pbobble_neogeo/pbobble.zip',
    description: 'Bub and Bob aim and fire colored bubbles to clear the board. Endlessly replayable head-to-head.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-circle',
    system: 'neogeo'
  },
  {
    id: 'real_bout_ff_special',
    title: 'Real Bout Fatal Fury Special',
    publisher: 'SNK',
    year: 1997,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/rbffspec_neogeo/rbffspec.zip',
    description: 'Line-shifting plane battles, ring-outs, and a big roster — the fan-favorite Real Bout entry.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-hand-fist',
    system: 'neogeo'
  },
  {
    id: 'art_of_fighting',
    title: 'Art of Fighting',
    publisher: 'SNK',
    year: 1992,
    genre: 'Fighting Game',
    romUrl: 'https://archive.org/download/aof_neogeo/aof.zip',
    description: 'Huge scaling sprites and a spirit gauge for special moves. Ryo and Robert hunt for Yuri in Southtown.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-hand-back-fist',
    system: 'neogeo'
  },
  */
]

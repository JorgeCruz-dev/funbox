# 🎮 Funbox Retro Emulator Dashboard

A modern, high-performance, glassmorphic multi-system retro emulator dashboard (N64, SNES, GBA & Neo Geo) powered by EmulatorJS, Vite, and TypeScript.

---

## 🚀 Setup & Installation Instructions

Follow these steps to install and start playing instantly.

### Step 1: Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed, then install the required dependencies:
```bash
pnpm install
```

### Step 2: Run the Development Server
Launch the Vite development server:
```bash
pnpm dev
```

### Step 3: Open in Your Browser
Once the dev server is up and running, open your web browser and navigate to:
```
http://localhost:5173
```

### Step 4: Choose a System and Play
Use the system selector on the landing page to switch between the Nintendo 64, Super Nintendo, Game Boy Advance, and Neo Geo libraries.

---

## 🕹️ Games Library

| System | Games |
| :--- | :--- |
| **Nintendo 64** | Super Mario 64, The Legend of Zelda: Ocarina of Time, GoldenEye 007, Mario Kart 64, Super Smash Bros., Super Smash Bros. Remix |
| **Super Nintendo** | Super Mario World, Super Mario Kart, Doom, Sunset Riders, The Legend of Zelda: A Link to the Past |
| **Game Boy Advance** | Pokémon Ruby / Sapphire / Emerald / FireRed / LeafGreen, Pokémon Mystery Dungeon: Red Rescue Team, Pokémon Pinball: Ruby & Sapphire, Castlevania: Circle of the Moon / Harmony of Dissonance / Aria of Sorrow, Crash Nitro Kart, Doom, Doom II, International Superstar Soccer, International Superstar Soccer Advance, Mario Kart Super Circuit |
| **Neo Geo** | Metal Slug X, Metal Slug 3, Metal Slug 4, Metal Slug 5 |

> The King of Fighters 2002 is disabled for now: its romset (124 MB) is over GitHub's 100 MB file limit.

ROMs live in `public/games/` and covers in `public/covers/`, both using matching short names (e.g. `games/oot.z64.gz` ↔ `covers/oot.jpg`).

---

## 🛠️ Controller Map

Any standard USB/Bluetooth controller (PS5, Xbox, Switch) is mapped automatically. Keyboard layouts:

### N64 (WASD Config)

N64 C-Buttons are remapped to keep inputs natural on physical keyboards:

| N64 Control | Keyboard Key |
| :--- | :--- |
| **Analog Stick** | `↑` `↓` `←` `→` (Arrow Keys) |
| **Start Button** | `Enter` |
| **Button A** | `Z` |
| **Button B** | `X` |
| **Z Trigger** | `Shift` |
| **C-Buttons (Up / Down / Left / Right)** | `W` `S` `A` `D` |
| **L / R Shoulders** | `Q` / `E` |

### SNES / GBA

| Control | Keyboard Key |
| :--- | :--- |
| **D-Pad** | `↑` `↓` `←` `→` (Arrow Keys) |
| **Start** | `Enter` |
| **Select** | `Shift` |
| **Button A** | `X` |
| **Button B** | `Z` |
| **L / R Shoulders** | `Q` / `E` |

### Neo Geo

| Control | Keyboard Key |
| :--- | :--- |
| **Joystick** | `↑` `↓` `←` `→` (Arrow Keys) |
| **Start** | `Enter` |
| **Select / Coin** | `Shift` |
| **Button A** | `Z` |
| **Button B** | `X` |
| **Button C** | `C` |
| **Button D** | `V` |

---

## ⚡ Loading Performance

- **Gzipped ROMs:** cartridge ROMs (`.z64`, `.sfc`, `.gba`) are stored as `.gz` so GitHub Pages serves them smaller. The browser decompresses them with the native `DecompressionStream` API. Neo Geo `.zip` romsets are left as-is, since the FBNeo core needs them that way.
- **Prefetching:** the EmulatorJS loader and the selected system's core are prefetched when you pick a system, and a game's ROM starts downloading after the pointer rests on its card for a moment, so clicking it picks up where the prefetch left off.

### Adding a New ROM

1. Drop the ROM into `public/games/` with a short name, and its cover into `public/covers/` with the same name.
2. Add an entry to the matching system file in `src/emulators/` (`n64.ts`, `snes.ts`, `gba.ts`, or `neogeo.ts`).
3. Optionally obfuscate, then compress (obfuscation must come first, because the browser gunzips and then deobfuscates):
   ```bash
   pnpm obfuscate
   pnpm compress-roms
   ```

---

## 📦 Production Builds (Optional)

If you want to package the codebase for self-hosting:

1. Compile the build:
   ```bash
   pnpm build
   ```
2. Preview the production build locally:
   ```bash
   pnpm start
   ```
3. Visit the preview URL at `http://localhost:4173`.

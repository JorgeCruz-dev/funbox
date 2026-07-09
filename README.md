# 🎮 N64 Funbox Emulator Dashboard

A modern, high-performance, glassmorphic Nintendo 64 (N64) retro emulator dashboard powered by EmulatorJS, Vite, and Express (TypeScript).

---

## 🚀 Setup & Installation Instructions

Follow these five steps to install, set up, and start playing your games locally.

### Step 1: Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed, then run the command to install the required dependencies:
```bash
npm install
```

### Step 2: Unzip Your Game ROMs [DEPRECATED]
A migration of .zip files it's in progress. For now this step is removed and repo is UNDER MAINTENANCE

### Step 3: Run the Development Server
Launch both the Vite compiler and the server backend simultaneously in development mode:
```bash
npm run dev
```

### Step 4: Open in Your Browser
Once the dev server is up and running, open your web browser and navigate to:
```
http://localhost:5173
```

---

## 🛠️ N64 Controller Map (WASD Config)

N64 C-Buttons have been remapped to keep inputs natural on physical keyboards:

| N64 Control | Keyboard Key |
| :--- | :--- |
| **Analog Stick** | `↑` `↓` `←` `→` (Arrow Keys) |
| **Start Button** | `Enter` |
| **Button A** | `Z` |
| **Button B** | `X` |
| **Z Trigger** | `Shift` |
| **C-Buttons (Up / Down / Left / Right)** | `W` `S` `A` `D` |
| **L / R Shoulders** | `Q` / `E` |

---

## 📦 Production Builds (Optional)

If you want to package the codebase for offline single-file execution or self-hosting production servers:

1. Compile the build:
   ```bash
   npm run build
   ```
2. Start the optimized standalone distribution server:
   ```bash
   npm run start
   ```
3. Visit the standalone production URL at `http://localhost:3000`.

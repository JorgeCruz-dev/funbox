# 🎮 Funbox Retro Emulator Dashboard

A modern, high-performance, glassmorphic multi-system retro emulator dashboard powered by EmulatorJS, Vite, and Express (TypeScript).

---

## 🚀 Setup & Installation Instructions

Follow these steps to install and start playing instantly.

### Step 1: Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed, then run the command to install the required dependencies:
```bash
npm install
```

### Step 2: Run the Development Server
Launch both the Vite compiler and the server backend simultaneously in development mode:
```bash
npm run dev
```

### Step 3: Open in Your Browser
Once the dev server is up and running, open your web browser and navigate to:
```
http://localhost:5173
```

### Step 4: Choose a System and Play
Use the system selector on the landing page to switch between Nintendo 64, Super Nintendo, and Game Boy Advance libraries.

---

## 🛠️ Controller Map

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

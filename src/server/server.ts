import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Security and CORS middleware for WebAssembly SharedArrayBuffer requirements
app.use((req, res, next) => {
  // Required for multi-threaded EmulatorJS cores (e.g. N64 mupen64plus_next)
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  // Allow resource requests from other origins if necessary
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Determine static file directories
const rootDir = process.cwd();
const distPath = path.join(rootDir, 'dist');
const publicPath = path.join(rootDir, 'public');

// Serve static assets from 'dist' if it exists (production built output), fallback to 'public'
const staticDir = fs.existsSync(distPath) ? distPath : publicPath;
app.use(express.static(staticDir));

// Endpoint to inspect files under games/
app.get('/api/status', (req, res) => {
  // Check public folder first (dev), then fallback to dist folder (prod copy)
  const devGamesDir = path.join(publicPath, 'games');
  const prodGamesDir = path.join(distPath, 'games');
  const gamesDir = fs.existsSync(devGamesDir) ? devGamesDir : prodGamesDir;

  interface ServerStatus {
    games: string[];
  }

  const result: ServerStatus = {
    games: []
  };

  // Read games directory
  if (fs.existsSync(gamesDir)) {
    try {
      const files = fs.readdirSync(gamesDir);
      // Filter out instructions and keep ROM formats for Nintendo 64
      result.games = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.z64', '.n64', '.v64'].includes(ext);
      });
    } catch (err) {
      console.error('Error reading games directory:', err);
    }
  }

  res.json(result);
});

// Fallback to serve index.html (useful in production SPA setups)
app.get('*', (req, res) => {
  const indexHtmlFile = fs.existsSync(path.join(distPath, 'index.html')) 
    ? path.join(distPath, 'index.html') 
    : path.join(rootDir, 'index.html');
  res.sendFile(indexHtmlFile);
});

app.listen(PORT, () => {
  console.log(`=============================================================`);
  console.log(`   🎮  Funbox Retro Emulator Server is running! 🎮`);
  console.log(`   🌐  Local URL: http://localhost:${PORT}`);
  console.log(`=============================================================`);
  console.log(`Ensure game files are placed in: ./public/games/`);
  console.log(`Press Ctrl+C to stop.`);
});

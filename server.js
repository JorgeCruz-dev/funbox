const express = require('express');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const app = express();
const PORT = process.env.PORT || 3000;

// Security and CORS middleware for WebAssembly SharedArrayBuffer requirements
app.use((req, res, next) => {
  // Required for multi-threaded EmulatorJS cores (e.g. PSX pcsx_rearmed)
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  // Allow resource requests from other origins if necessary
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static assets from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint to bypass CORS when streaming ROMs from the internet
app.get('/api/rom-proxy', async (req, res) => {
  const romUrl = req.query.url;
  if (!romUrl) {
    return res.status(400).send('Missing url parameter');
  }

  try {
    const response = await fetch(romUrl);
    if (!response.ok) {
      return res.status(response.status).send(`Failed to fetch ROM: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentLength = response.headers.get('content-length');

    res.setHeader('Content-Type', contentType);
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }
    
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (response.body) {
      const nodeStream = Readable.fromWeb(response.body);
      nodeStream.pipe(res);
    } else {
      res.status(500).send('No response body available from source');
    }
  } catch (error) {
    console.error('Error proxying ROM:', error);
    res.status(500).send(`Error proxying ROM: ${error.message}`);
  }
});

// Endpoint to inspect files under games/ and bios/
app.get('/api/status', (req, res) => {
  const gamesDir = path.join(__dirname, 'public', 'games');
  const biosDir = path.join(__dirname, 'public', 'bios');
  
  const result = {
    games: [],
    bios: {
      scph5501: false,
      scph5500: false,
      scph5502: false,
      scph1001: false,
      any: false
    }
  };

  // Read games directory
  if (fs.existsSync(gamesDir)) {
    try {
      const files = fs.readdirSync(gamesDir);
      // Filter out instructions and keep ROM formats for PSX, N64, SNES, and GBA
      result.games = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return [
          '.chd', '.bin', '.cue', '.pbp', '.iso', '.img', '.m3u', // PSX
          '.z64', '.n64', '.v64',                                  // N64
          '.sfc', '.smc',                                          // SNES
          '.gba'                                                   // GBA
        ].includes(ext);
      });
    } catch (err) {
      console.error('Error reading games directory:', err);
    }
  }

  // Read bios directory
  if (fs.existsSync(biosDir)) {
    try {
      const files = fs.readdirSync(biosDir);
      files.forEach(file => {
        const name = file.toLowerCase();
        if (name.includes('scph5501')) result.bios.scph5501 = true;
        if (name.includes('scph5500')) result.bios.scph5500 = true;
        if (name.includes('scph5502')) result.bios.scph5502 = true;
        if (name.includes('scph1001')) result.bios.scph1001 = true;
        
        if (name.endsWith('.bin')) {
          result.bios.any = true;
        }
      });
    } catch (err) {
      console.error('Error reading bios directory:', err);
    }
  }

  res.json(result);
});

// Fallback to serve index.html for single-page style navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=============================================================`);
  console.log(`   🎮  Funbox Emulator Server is running! 🎮`);
  console.log(`   🌐  Local URL: http://localhost:${PORT}`);
  console.log(`=============================================================`);
  console.log(`Ensure game files are placed in: ./public/games/`);
  console.log(`Ensure BIOS files are placed in: ./public/bios/`);
  console.log(`Press Ctrl+C to stop.`);
});

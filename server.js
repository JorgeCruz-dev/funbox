const http = require('http');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const PORT = process.env.PORT || 3000;

// Security and CORS headers for EmulatorJS multi-threaded cores
const HEADERS = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Accept-Ranges': 'bytes'
};

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.z64': 'application/octet-stream',
  '.n64': 'application/octet-stream',
  '.v64': 'application/octet-stream',
  '.sfc': 'application/octet-stream',
  '.smc': 'application/octet-stream',
  '.gba': 'application/octet-stream',
  '.bin': 'application/octet-stream',
  '.chd': 'application/octet-stream',
  '.cue': 'application/octet-stream',
  '.pbp': 'application/octet-stream',
  '.iso': 'application/octet-stream',
  '.img': 'application/octet-stream',
};

// Determine static file directories (dist is preferred for production built output)
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');
const staticDir = fs.existsSync(distPath) ? distPath : publicPath;

const server = http.createServer(async (req, res) => {
  // Apply standard security & CORS headers to all responses
  for (const [key, value] of Object.entries(HEADERS)) {
    res.setHeader(key, value);
  }

  // Parse URL
  const reqUrl = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const pathname = reqUrl.pathname;

  // 1. API: /api/status - returns files inside games/ and bios/
  if (pathname === '/api/status' && req.method === 'GET') {
    const devGamesDir = path.join(publicPath, 'games');
    const prodGamesDir = path.join(distPath, 'games');
    const gamesDir = fs.existsSync(devGamesDir) ? devGamesDir : prodGamesDir;

    const devBiosDir = path.join(publicPath, 'bios');
    const prodBiosDir = path.join(distPath, 'bios');
    const biosDir = fs.existsSync(devBiosDir) ? devBiosDir : prodBiosDir;
    
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

    if (fs.existsSync(gamesDir)) {
      try {
        const files = fs.readdirSync(gamesDir);
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

    if (fs.existsSync(biosDir)) {
      try {
        const files = fs.readdirSync(biosDir);
        files.forEach(file => {
          const name = file.toLowerCase();
          if (name.includes('scph5501')) result.bios.scph5501 = true;
          if (name.includes('scph5500')) result.bios.scph5500 = true;
          if (name.includes('scph5502')) result.bios.scph5502 = true;
          if (name.includes('scph1001')) result.bios.scph1001 = true;
          if (name.endsWith('.bin')) result.bios.any = true;
        });
      } catch (err) {
        console.error('Error reading bios directory:', err);
      }
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
    return;
  }

  // 2. API: /api/rom-proxy - fetches ROM files from external URL bypassing CORS
  if (pathname === '/api/rom-proxy' && req.method === 'GET') {
    const romUrl = reqUrl.searchParams.get('url');
    if (!romUrl) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Missing url parameter');
      return;
    }

    try {
      const response = await fetch(romUrl);
      if (!response.ok) {
        res.writeHead(response.status, { 'Content-Type': 'text/plain' });
        res.end(`Failed to fetch ROM: ${response.statusText}`);
        return;
      }

      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const contentLength = response.headers.get('content-length');

      const headers = { 'Content-Type': contentType };
      if (contentLength) {
        headers['Content-Length'] = contentLength;
      }

      res.writeHead(200, headers);

      if (response.body) {
        const nodeStream = Readable.fromWeb(response.body);
        nodeStream.pipe(res);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('No response body available from source');
      }
    } catch (error) {
      console.error('Error proxying ROM:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Error proxying ROM: ${error.message}`);
    }
    return;
  }

  // 3. Serve Static Files
  // Resolve safe path
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(staticDir, safePath);

  // Check if file exists, is not a directory. Otherwise direct to index.html
  let stat;
  try {
    stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(staticDir, 'index.html');
      stat = fs.statSync(filePath);
    }
  } catch (err) {
    // Fallback to index.html for SPA router styles
    filePath = path.join(staticDir, 'index.html');
    try {
      stat = fs.statSync(filePath);
    } catch (_) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }
  }

  // Set Content-Type based on extension
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

server.listen(PORT, () => {
  console.log(`=============================================================`);
  console.log(`   🎮  Funbox Emulator Server is running (No Express)! 🎮`);
  console.log(`   🌐  Local URL: http://localhost:${PORT}`);
  console.log(`=============================================================`);
  console.log(`Ensure game files are placed in: ./public/games/`);
  console.log(`Ensure BIOS files are placed in: ./public/bios/`);
  console.log(`Press Ctrl+C to stop.`);
});

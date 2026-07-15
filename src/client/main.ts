// 🎮 Funbox Retro Main Logic (N64, SNES & GBA) 🎮
import { GBA_GAMES } from './gba';
import { N64_GAMES } from './n64';
import { SNES_GAMES } from './snes';
import { Game } from './types';

// 2. Focused Games Catalog (Matching user ROM filenames)
const FEATURED_GAMES: Game[] = [...N64_GAMES, ...SNES_GAMES, ...GBA_GAMES];
// 3. Global State
let currentSystem: 'n64' | 'snes' | 'gba' = 'n64';
let currentBlobUrl: string | null = null;
let downloadAbortController: AbortController | null = null;

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
    const isOnline = isPlayable && game.romUrl.includes("https");
    
    const card = document.createElement('div');
    card.className = `glass-card game-card`;
    card.innerHTML = `
      <div class="game-cover-wrapper ${game.gradientClass}">
        ${game.coverImage 
          ? `<img src="${game.coverImage}" class="game-cover-art" alt="${game.title}" />`
          : `<i class="fa-solid ${game.icon} game-cover-placeholder"></i>`
        }
        <div class="game-status-indicator">
          ${isOnline 
            ? '<span class="status-badge success"><i class="fa-solid fa-cloud"></i> Online Stream</span>'
            : '<span class="status-badge warning"><i class="fa-solid fa-hard-drive"></i> Stored locally</span>'
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

async function fetchWithProgress(
  url: string, 
  onProgress: (loaded: number, total: number) => void,
  signal: AbortSignal
): Promise<ArrayBuffer> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch game: ${response.statusText}`);
  }
  const contentLength = response.headers.get('content-length');
  const total = contentLength ? parseInt(contentLength, 10) : 0;
  
  if (!response.body) {
    return response.arrayBuffer();
  }
  
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    onProgress(loaded, total);
  }
  
  const allChunks = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    allChunks.set(chunk, offset);
    offset += chunk.length;
  }
  
  return allChunks.buffer;
}

function deobfuscateROM(buffer: ArrayBuffer): Uint8Array {
  const view = new Uint8Array(buffer);
  const SIGNATURE = 'OBFS';
  
  const hasSignature = view.length >= 4 &&
    view[0] === 0x4F && // 'O'
    view[1] === 0x42 && // 'B'
    view[2] === 0x46 && // 'F'
    view[3] === 0x53;   // 'S'
    
  if (!hasSignature) {
    return view;
  }
  
  const KEY = 0x5F;
  const decrypted = new Uint8Array(view.length - 4);
  for (let i = 4; i < view.length; i++) {
    decrypted[i - 4] = view[i] ^ KEY;
  }
  return decrypted;
}

// 5. Launch Emulator Player
async function launchGame(gameUrl: string, gameTitle: string) {
  const modal = document.getElementById('emulator-modal');
  const iframe = document.getElementById('emulator-iframe') as HTMLIFrameElement;
  const titleSpan = document.getElementById('modal-game-title');
  const loader = document.getElementById('emulator-loader');
  const progressText = document.getElementById('emulator-loader-progress');
  
  if (!modal || !iframe || !titleSpan) return;

  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl);
    currentBlobUrl = null;
  }

  if (downloadAbortController) {
    downloadAbortController.abort();
  }
  downloadAbortController = new AbortController();

  titleSpan.textContent = gameTitle;
  const core = currentSystem;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  let finalGameUrl = gameUrl;

  if (gameUrl.startsWith('games/')) {
    if (loader) {
      loader.style.display = 'flex';
    }
    if (progressText) {
      progressText.textContent = 'Initializing download...';
    }

    try {
      const buffer = await fetchWithProgress(
        gameUrl, 
        (loaded, total) => {
          if (progressText) {
            if (total > 0) {
              const pct = Math.round((loaded / total) * 100);
              progressText.textContent = `Downloading ROM... ${pct}% (${(loaded / (1024 * 1024)).toFixed(1)}MB of ${(total / (1024 * 1024)).toFixed(1)}MB)`;
            } else {
              progressText.textContent = `Downloading ROM... ${(loaded / (1024 * 1024)).toFixed(1)}MB`;
            }
          }
        },
        downloadAbortController.signal
      );

      if (progressText) {
        progressText.textContent = 'Deobfuscating game files...';
      }
      
      const romBytes = deobfuscateROM(buffer);
      const blob = new Blob([romBytes as any], { type: 'application/octet-stream' });
      currentBlobUrl = URL.createObjectURL(blob);
      finalGameUrl = currentBlobUrl;

      if (loader) {
        loader.style.display = 'none';
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('ROM download aborted.');
        return;
      }
      console.error('Error loading game:', err);
      if (progressText) {
        progressText.innerHTML = `<span style="color: var(--color-red);">Error: Failed to load game ROM</span>`;
      }
      return;
    } finally {
      downloadAbortController = null;
    }
  } else {
    if (loader) {
      loader.style.display = 'none';
    }
  }

  const playerUrl = `player.html?gameUrl=${encodeURIComponent(finalGameUrl)}&gameName=${encodeURIComponent(gameTitle)}&core=${core}`;
  iframe.src = playerUrl;
}

function closeEmulator() {
  if (downloadAbortController) {
    downloadAbortController.abort();
    downloadAbortController = null;
  }

  const modal = document.getElementById('emulator-modal');
  const iframe = document.getElementById('emulator-iframe') as HTMLIFrameElement;
  const loader = document.getElementById('emulator-loader');
  if (!modal || !iframe) return;

  iframe.src = 'about:blank';
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';

  if (loader) {
    loader.style.display = 'none';
  }

  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl);
    currentBlobUrl = null;
  }
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

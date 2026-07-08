// 🎮 Funbox Main Logic 🎮

// 1. Featured Games Catalog
const FEATURED_GAMES = [
  {
    id: 'castlevania_sotn',
    title: 'Castlevania: Symphony of the Night',
    publisher: 'Konami',
    year: 1997,
    genre: 'Action-RPG',
    expectedFile: 'castlevania_sotn.chd',
    description: 'A masterpiece of side-scrolling action-RPG design. Play as Alucard, Dracula\'s half-vampire son, as you explore a shape-shifting castle filled with mythical beasts, discover weapons and magic, and uncover the castle\'s dark secrets.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-skull-crossbones'
  },
  {
    id: 'metal_gear_solid',
    title: 'Metal Gear Solid',
    publisher: 'Konami',
    year: 1998,
    genre: 'Tactical Stealth',
    expectedFile: 'metal_gear_solid.chd',
    description: 'The game that redefined cinematic storytelling in gaming. Guide Solid Snake as he infiltrates a nuclear weapons facility in Alaska to neutralize a terrorist threat by FOXHOUND, utilizing stealth, wits, and high-tech gear.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-user-ninja'
  },
  {
    id: 'final_fantasy_vii',
    title: 'Final Fantasy VII',
    publisher: 'Squaresoft',
    year: 1997,
    genre: 'RPG',
    expectedFile: 'final_fantasy_vii.chd',
    description: 'An epic adventure that captured the hearts of millions. Join Cloud Strife, a mercenary fighting the eco-terrorist group AVALANCHE against the ruthless Shinra corporation, and eventually confronting the legendary Sephiroth.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-fire-flame-curved'
  },
  {
    id: 'crash_bandicoot',
    title: 'Crash Bandicoot',
    publisher: 'Sony / Naughty Dog',
    year: 1996,
    genre: 'Platformer',
    expectedFile: 'crash_bandicoot.chd',
    description: 'The iconic PlayStation mascot\'s debut adventure. Guide Crash as he runs, jumps, and spins through Wumpa Islands to defeat the evil Doctor Neo Cortex and rescue his girlfriend Tawna.',
    gradientClass: 'cover-gradient-4',
    icon: 'fa-apple-whole'
  },
  {
    id: 'resident_evil_2',
    title: 'Resident Evil 2',
    publisher: 'Capcom',
    year: 1998,
    genre: 'Survival Horror',
    expectedFile: 'resident_evil_2.chd',
    description: 'A benchmark in survival horror. Play as rookie cop Leon S. Kennedy and college student Claire Redfield as they attempt to escape a zombie-infested Raccoon City, solving puzzles and battling mutated horrors.',
    gradientClass: 'cover-gradient-5',
    icon: 'fa-biohazard'
  },
  {
    id: 'tekken_3',
    title: 'Tekken 3',
    publisher: 'Namco',
    year: 1998,
    genre: 'Fighting',
    expectedFile: 'tekken_3.chd',
    description: 'Widely considered one of the greatest fighting games of all time. Experience lightning-fast 3D combat, fluid animations, and a legendary roster of fighters competing in the King of Iron Fist Tournament.',
    gradientClass: 'cover-gradient-6',
    icon: 'fa-hand-fist'
  }
];

// 2. Global State
let serverStatus = { games: [], bios: {} };
let cachedBiosFile = null;  // Stores Blob URL for IndexedDB cached BIOS
let activeBiosUrl = '';     // Current active BIOS URL (server or IndexedDB Blob)
let activeBiosName = '';    // Display name of BIOS
let selectedGameForSetup = null;

// 3. Database Manager (IndexedDB)
const DB_NAME = 'psx_funbox_db';
const DB_VERSION = 1;
const STORE_NAME = 'system';

function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

async function saveBiosToDB(blob, filename) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ blob, filename }, 'bios');
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function getBiosFromDB() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get('bios');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function deleteBiosFromDB() {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete('bios');
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// 4. Initialization and UI Updates
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  await loadBiosFromCache();
  await fetchServerStatus();
  renderGamesGrid();
});

// Load BIOS from IndexedDB cache
async function loadBiosFromCache() {
  try {
    const cached = await getBiosFromDB();
    if (cached) {
      if (cachedBiosFile) URL.revokeObjectURL(cachedBiosFile);
      cachedBiosFile = URL.createObjectURL(cached.blob);
      activeBiosUrl = cachedBiosFile;
      activeBiosName = cached.filename + ' (Cached)';
      updateBiosUI(true, activeBiosName);
    }
  } catch (err) {
    console.error('Error loading BIOS from cache:', err);
  }
}

// Fetch status of files on the Express server
async function fetchServerStatus() {
  try {
    const response = await fetch('/api/status');
    serverStatus = await response.json();
    
    // Server BIOS takes precedence over browser cache
    if (serverStatus.bios.any) {
      let serverBiosName = 'scph5501.bin';
      if (serverStatus.bios.scph5500) serverBiosName = 'scph5500.bin';
      else if (serverStatus.bios.scph5502) serverBiosName = 'scph5502.bin';
      else if (serverStatus.bios.scph1001) serverBiosName = 'scph1001.bin';
      
      activeBiosUrl = `bios/${serverBiosName}`;
      activeBiosName = `${serverBiosName} (Server)`;
      updateBiosUI(true, activeBiosName);
    } else if (!cachedBiosFile) {
      activeBiosUrl = '';
      activeBiosName = '';
      updateBiosUI(false);
    }
  } catch (err) {
    console.error('Error fetching server status:', err);
    // If server API fails, fall back to cached BIOS if present
    if (!cachedBiosFile) {
      updateBiosUI(false);
    }
  }
}

// Update the BIOS Status Panel in the UI
function updateBiosUI(installed, filename = '') {
  const badge = document.getElementById('bios-status-badge');
  const details = document.getElementById('bios-info-details');
  const activeNameSpan = document.getElementById('bios-active-name');
  const clearBtn = document.getElementById('clear-bios-btn');

  if (installed) {
    badge.className = 'status-badge success';
    badge.innerHTML = '<i class="fa-solid fa-circle-check"></i> BIOS Configured';
    details.style.display = 'flex';
    activeNameSpan.textContent = filename;
    
    // Show clear button only if BIOS is cached in browser
    if (filename.includes('(Cached)')) {
      clearBtn.style.display = 'flex';
    } else {
      clearBtn.style.display = 'none';
    }
  } else {
    badge.className = 'status-badge error';
    badge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Missing BIOS';
    details.style.display = 'none';
    clearBtn.style.display = 'none';
  }
}

// Render the grid of games
function renderGamesGrid(filterText = '') {
  const container = document.getElementById('games-container');
  container.innerHTML = '';
  
  const query = filterText.toLowerCase().trim();
  const filtered = FEATURED_GAMES.filter(game => {
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
    // Check if game is placed on server
    const isInstalledOnServer = serverStatus.games.some(f => f.toLowerCase() === game.expectedFile.toLowerCase());
    
    const card = document.createElement('div');
    card.className = 'glass-card game-card';
    card.innerHTML = `
      <div class="game-cover-wrapper ${game.gradientClass}">
        <i class="fa-solid ${game.icon} game-cover-placeholder"></i>
        <div class="game-status-indicator">
          ${isInstalledOnServer 
            ? '<span class="status-badge success"><i class="fa-solid fa-circle-check"></i> Playable</span>'
            : '<span class="status-badge warning"><i class="fa-solid fa-circle-plus"></i> Setup Needed</span>'
          }
        </div>
        <div class="play-hover-overlay">
          <div class="play-hover-btn">
            <i class="fa-solid ${isInstalledOnServer ? 'fa-play' : 'fa-gear'}"></i>
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
      if (isInstalledOnServer) {
        launchGame(`games/${game.expectedFile}`, game.title);
      } else {
        openSetupModal(game);
      }
    });

    container.appendChild(card);
  });
}

// 5. Emulator Launching
function launchGame(gameUrl, gameTitle) {
  const modal = document.getElementById('emulator-modal');
  const iframe = document.getElementById('emulator-iframe');
  const titleSpan = document.getElementById('modal-game-title');
  
  titleSpan.textContent = gameTitle;
  
  // Construct the target player.html url with parameters
  // Ensure we encode parameters correctly
  let playerUrl = `player.html?gameUrl=${encodeURIComponent(gameUrl)}&gameName=${encodeURIComponent(gameTitle)}`;
  if (activeBiosUrl) {
    playerUrl += `&biosUrl=${encodeURIComponent(activeBiosUrl)}`;
  }
  
  // Display modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Disable background scrolling
  
  // Load player in iframe
  iframe.src = playerUrl;
}

function closeEmulator() {
  const modal = document.getElementById('emulator-modal');
  const iframe = document.getElementById('emulator-iframe');
  
  // Stop emulator and clear memory by loading empty page
  iframe.src = 'about:blank';
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Enable background scrolling
}

// 6. Setup Modal details (for games not yet placed on server)
function openSetupModal(game) {
  selectedGameForSetup = game;
  const modal = document.getElementById('details-modal');
  
  document.getElementById('detail-game-title').textContent = game.title;
  document.getElementById('detail-game-publisher').textContent = game.publisher;
  document.getElementById('detail-game-year').textContent = game.year;
  document.getElementById('detail-game-desc').textContent = game.description;
  
  // Show expected absolute path suggestion
  const pathCode = document.getElementById('detail-expected-path');
  pathCode.textContent = `C:\\Users\\jorge\\watchdogs\\funbox\\public\\games\\${game.expectedFile}`;
  
  // Set background highlight on modal hero
  const hero = document.getElementById('modal-hero-bg');
  hero.className = `modal-game-hero ${game.gradientClass}`;
  
  modal.style.display = 'flex';
}

function closeSetupModal() {
  document.getElementById('details-modal').style.display = 'none';
  selectedGameForSetup = null;
}

// 7. Event Listeners Setup
function setupEventListeners() {
  // Search filter
  document.getElementById('search-input').addEventListener('input', (e) => {
    renderGamesGrid(e.target.value);
  });

  // Close emulator button
  document.getElementById('close-emulator-btn').addEventListener('click', closeEmulator);

  // Close setup details button
  document.getElementById('close-details-btn').addEventListener('click', closeSetupModal);
  document.getElementById('details-modal').addEventListener('click', (e) => {
    if (e.target.id === 'details-modal') closeSetupModal();
  });

  // Modal direct ROM upload
  document.getElementById('rom-direct-upload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && selectedGameForSetup) {
      const fileUrl = URL.createObjectURL(file);
      closeSetupModal();
      launchGame(fileUrl, selectedGameForSetup.title);
    }
  });

  // Main ROM file browse input
  document.getElementById('rom-upload-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      handleRomFile(file);
    }
  });

  // BIOS file upload input
  document.getElementById('bios-upload-input').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      await handleBiosFile(file);
    }
  });

  // Clear Cached BIOS
  document.getElementById('clear-bios-btn').addEventListener('click', async () => {
    if (confirm('Are you sure you want to remove the cached BIOS from your browser memory?')) {
      await deleteBiosFromDB();
      if (cachedBiosFile) {
        URL.revokeObjectURL(cachedBiosFile);
        cachedBiosFile = null;
      }
      await fetchServerStatus();
    }
  });

  // Drag and drop setup for drop zone
  const dropZone = document.getElementById('drop-zone');

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('dragover');
    }, false);
  });

  dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (file.name.toLowerCase().includes('scph') && ext === 'bin') {
        handleBiosFile(file);
      } else {
        handleRomFile(file);
      }
    }
  });
}

// Handle BIOS file upload (save to DB)
async function handleBiosFile(file) {
  try {
    updateBiosUI(true, 'Saving BIOS to browser cache...');
    await saveBiosToDB(file, file.name);
    await loadBiosFromCache();
    alert(`Success! "${file.name}" has been securely cached in your browser. You can now run games with high BIOS compatibility.`);
  } catch (err) {
    console.error('Error saving BIOS:', err);
    alert('Failed to save BIOS file to browser database: ' + err.message);
    await fetchServerStatus();
  }
}

// Handle ROM file selection (generate Object URL and play immediately)
function handleRomFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  const validExtensions = ['chd', 'bin', 'cue', 'pbp', 'iso', 'img'];
  
  if (!validExtensions.includes(ext)) {
    alert(`Unsupported file format (.${ext}). Please select a PlayStation ROM (.chd, .bin, .cue, .pbp, .iso, .img).`);
    return;
  }

  // Generate clean name from file name
  let name = file.name.replace(/\.[^/.]+$/, ""); // Strip extension
  name = name.replace(/[-_]/g, ' '); // Replace dashes/underscores with spaces
  
  // Capitalize words
  name = name.split(' ').map(word => {
    if (word.length === 0) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');

  const fileUrl = URL.createObjectURL(file);
  launchGame(fileUrl, name);
}

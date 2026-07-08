// 🎮 Funbox Retro Main Logic (N64 Only) 🎮
import './style.css';

// 1. Interfaces
interface Game {
  id: string;
  title: string;
  publisher: string;
  year: number;
  genre: string;
  expectedFile: string;
  description: string;
  gradientClass: string;
  icon: string;
  coverImage?: string;
}

interface ServerStatus {
  games: string[];
}

// 2. Focused N64 Games Catalog (Matching user ROM filenames)
const FEATURED_GAMES: Game[] = [
  {
    id: 'goldeneye_007',
    title: 'GoldenEye 007',
    publisher: 'Nintendo / Rare',
    year: 1997,
    genre: 'First-Person Shooter',
    expectedFile: 'GoldenEye 007 (USA).z64',
    description: 'The legendary first-person shooter that revolutionized console multiplayer. Play as James Bond, navigate through action-packed missions, and engage in split-screen multiplayer matches.',
    gradientClass: 'cover-gradient-1',
    icon: 'fa-user-secret',
    coverImage: 'covers/goldeneye007.jpg'
  },
  {
    id: 'super_smash_bros',
    title: 'Super Smash Bros.',
    publisher: 'Nintendo / HAL Laboratory',
    year: 1999,
    genre: 'Fighting / Brawler',
    expectedFile: 'Super Smash Bros. (USA).z64',
    description: 'The classic crossover fighting game. Select iconic Nintendo characters like Mario, Link, Samus, and Pikachu and fight to knock opponents off the stage.',
    gradientClass: 'cover-gradient-2',
    icon: 'fa-hand-fist',
    coverImage: 'covers/super-smash-bros-64.webp'
  },
  {
    id: 'conkers_bad_fur_day',
    title: "Conker's Bad Fur Day",
    publisher: 'Rare / THQ',
    year: 2001,
    genre: 'Action-Platformer',
    expectedFile: "Conker's Bad Fur Day (Uncensored).z64",
    description: 'Interact with quirky characters, solve puzzles, and engage in crude humor in this mature, action-packed story of a red squirrel named Conker.',
    gradientClass: 'cover-gradient-3',
    icon: 'fa-paw',
    coverImage: 'covers/Conkers-bad-fur-day.jpg'
  },
  {
    id: 'diddy_kong_racing',
    title: 'Diddy Kong Racing',
    publisher: 'Rare / Nintendo',
    year: 1997,
    genre: 'Kart Racing',
    expectedFile: 'Diddy Kong Racing (EU) (1997) (Rev 1) (Kart Racing) (Nintendo 64).z64',
    description: "An adventure-style racing game. Drive cars, planes, and hovercrafts to defeat the intergalactic sorcerer Wizpig and save Timber's island.",
    gradientClass: 'cover-gradient-4',
    icon: 'fa-car',
    coverImage: 'covers/diddy-kong-racing.jpg'
  },
  {
    id: 'smash_remix',
    title: 'Smash Remix',
    publisher: 'Smash Remix Team',
    year: 2020,
    genre: 'Fighting / Hack',
    expectedFile: 'Smash Remix 2.0.1.z64',
    description: "The massive fan-made expansion of original Super Smash Bros. 64, introducing a multitude of new characters, characters' moves, stages, and game modes!",
    gradientClass: 'cover-gradient-1',
    icon: 'fa-clapperboard',
    coverImage: 'covers/smash-remix-logo.webp'
  },
  {
    id: 'super_mario_64',
    title: 'Super Mario 64',
    publisher: 'Nintendo',
    year: 1996,
    genre: '3D Platformer',
    expectedFile: 'Super Mario 64 (USA).n64',
    description: "The definitive blueprint for 3D platformers. Explore Princess Peach's castle, jump into magical paintings, collect Power Stars, and save Peach from Bowser.",
    gradientClass: 'cover-gradient-2',
    icon: 'fa-crown',
    coverImage: 'covers/super-mario-64-logo.png'
  }
];

// 3. Global State
let serverStatus: ServerStatus = { games: [] };

// 4. Main Initialization
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  await fetchServerStatus();
  renderGamesGrid();
});

async function fetchServerStatus() {
  try {
    const response = await fetch('/api/status');
    serverStatus = await response.json();
  } catch (err) {
    console.error('Error fetching server status:', err);
  }
}

// Render library grid with filter & search
function renderGamesGrid(filterText = '') {
  const container = document.getElementById('games-container');
  if (!container) return;
  
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
    // Check if user has game in public/games folder
    const isInstalledOnServer = serverStatus.games.some(f => f === game.expectedFile);
    
    const card = document.createElement('div');
    card.className = `glass-card game-card`;
    card.innerHTML = `
      <div class="game-cover-wrapper ${game.gradientClass}">
        ${game.coverImage 
          ? `<img src="${game.coverImage}" class="game-cover-art" alt="${game.title}" />`
          : `<i class="fa-solid ${game.icon} game-cover-placeholder"></i>`
        }
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

// 5. Launch Emulator Player
function launchGame(gameUrl: string, gameTitle: string) {
  const modal = document.getElementById('emulator-modal');
  const iframe = document.getElementById('emulator-iframe') as HTMLIFrameElement;
  const titleSpan = document.getElementById('modal-game-title');
  
  if (!modal || !iframe || !titleSpan) return;

  titleSpan.textContent = gameTitle;
  
  // Set core explicitly to mupen64plus_next (n64)
  const core = 'n64';
  const playerUrl = `player.html?gameUrl=${encodeURIComponent(gameUrl)}&gameName=${encodeURIComponent(gameTitle)}&core=${core}`;
  
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
  if (path) path.textContent = `C:\\Users\\jorge\\watchdogs\\funbox\\public\\games\\${game.expectedFile}`;
  
  modal.style.display = 'flex';
}

function closeSetupModal() {
  const modal = document.getElementById('details-modal');
  if (modal) modal.style.display = 'none';
}

// 6. Event Binding
function setupEventListeners() {
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

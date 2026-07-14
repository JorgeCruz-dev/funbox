const fs = require('fs');
const path = require('path');

const GAMES_DIR = path.join(__dirname, '../public/games');
const KEY = 0x5F;
const SIGNATURE = 'OBFS';

function obfuscateDirectory() {
  if (!fs.existsSync(GAMES_DIR)) {
    console.error(`Games directory not found at: ${GAMES_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(GAMES_DIR);
  let processedCount = 0;
  let skippedCount = 0;

  console.log(`Starting ROM obfuscation in: ${GAMES_DIR}`);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext !== '.z64' && ext !== '.sfc') {
      continue;
    }

    const filePath = path.join(GAMES_DIR, file);
    const data = fs.readFileSync(filePath);

    // Check if already obfuscated
    const isObfuscated = data.length >= 4 && data.toString('utf-8', 0, 4) === SIGNATURE;
    if (isObfuscated) {
      console.log(`[SKIP] Already obfuscated: ${file}`);
      skippedCount++;
      continue;
    }

    console.log(`[PROCESS] Obfuscating: ${file} (${(data.length / (1024 * 1024)).toFixed(2)} MB)`);

    // Create a new buffer with SIGNATURE prepended
    const sigBuf = Buffer.from(SIGNATURE, 'utf-8');
    const obfuscated = Buffer.alloc(data.length + sigBuf.length);
    
    // Copy signature
    sigBuf.copy(obfuscated, 0);

    // XOR data bytes and write into obfuscated buffer
    for (let i = 0; i < data.length; i++) {
      obfuscated[i + sigBuf.length] = data[i] ^ KEY;
    }

    fs.writeFileSync(filePath, obfuscated);
    console.log(`[SUCCESS] Saved obfuscated file: ${file}`);
    processedCount++;
  }

  console.log(`\nObfuscation summary:`);
  console.log(`- Obfuscated ${processedCount} files`);
  console.log(`- Skipped ${skippedCount} already-obfuscated files`);
}

obfuscateDirectory();

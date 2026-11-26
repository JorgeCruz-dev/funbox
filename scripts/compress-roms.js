// Gzips cartridge ROMs (.z64 / .sfc / .gba) in public/games so GitHub Pages serves
// them smaller (Pages only compresses text files). The browser decompresses
// them in src/main.ts with the native DecompressionStream API.
//
// Run `pnpm obfuscate` first if the ROM should be obfuscated: obfuscation must
// happen before compression, because the browser gunzips and then deobfuscates.
//
// Each ROM is replaced by <name>.gz after verifying the archive round-trips.
// Neo Geo .zip romsets are left alone: FBNeo needs them as-is.
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const GAMES_DIR = path.join(__dirname, '../public/games');
const ROM_EXTENSIONS = new Set(['.z64', '.sfc', '.gba']);

function compressRoms() {
  if (!fs.existsSync(GAMES_DIR)) {
    console.error(`Games directory not found at: ${GAMES_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(GAMES_DIR).filter((file) => ROM_EXTENSIONS.has(path.extname(file).toLowerCase()));
  if (files.length === 0) {
    console.log('No .z64 / .sfc / .gba ROMs to compress.');
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const filePath = path.join(GAMES_DIR, file);
    const data = fs.readFileSync(filePath);
    const isObfuscated = data.length >= 4 && data.toString('latin1', 0, 4) === 'OBFS';

    const compressed = zlib.gzipSync(data, { level: zlib.constants.Z_BEST_COMPRESSION });
    if (!zlib.gunzipSync(compressed).equals(data)) {
      console.error(`  [ERROR] ${file}: gzip round-trip mismatch, original kept.`);
      process.exitCode = 1;
      continue;
    }

    fs.writeFileSync(`${filePath}.gz`, compressed);
    fs.unlinkSync(filePath);

    totalBefore += data.length;
    totalAfter += compressed.length;
    const mb = (n) => (n / 1048576).toFixed(1);
    console.log(
      `  [OK] ${file} ${mb(data.length)} MB -> ${file}.gz ${mb(compressed.length)} MB` +
        (isObfuscated ? '' : '  (warning: not obfuscated)')
    );
  }

  console.log(`\nDone. ${(totalBefore / 1048576).toFixed(1)} MB -> ${(totalAfter / 1048576).toFixed(1)} MB`);
}

compressRoms();

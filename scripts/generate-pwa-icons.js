import sharp from 'sharp';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sizes = [192, 512];

async function generateIcons() {
  const svgBuffer = readFileSync(join(__dirname, '../client/src/assets/logo.svg'));
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .toFile(join(__dirname, `../client/public/icons/icon-${size}x${size}.png`));
    
    console.log(`Generated ${size}x${size} icon`);
  }
}

generateIcons().catch(console.error); 
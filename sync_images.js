import fs from 'fs';
import path from 'path';

const assetsDir = 'C:\\Users\\Paz\\.gemini\\antigravity\\scratch\\invitacion-cumple\\assets';

const files = fs.readdirSync(assetsDir);
console.log('Current files in assets:', files);

for (let i = 1; i <= 5; i++) {
  const jpegFile = path.join(assetsDir, `foto_${i}.jpeg`);
  const jpgFile = path.join(assetsDir, `foto_${i}.jpg`);

  if (fs.existsSync(jpegFile)) {
    fs.copyFileSync(jpegFile, jpgFile);
    console.log(`Copied foto_${i}.jpeg -> foto_${i}.jpg`);
  }
}

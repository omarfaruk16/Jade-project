import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const IMAGES_DIR = join(__dirname, '..', 'public', 'images');
const MIN_SIZE_KB = 200;
const WEBP_QUALITY = 78;
const AVIF_QUALITY = 65;

const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png']);

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getFiles(fullPath));
    } else if (SUPPORTED_EXTS.has(extname(entry.name).toLowerCase())) {
      const s = await stat(fullPath);
      if (s.size > MIN_SIZE_KB * 1024) {
        files.push({ path: fullPath, size: s.size, name: entry.name });
      }
    }
  }
  return files;
}

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const dir = join(filePath, '..');
  const name = basename(filePath, ext);

  const webpPath = join(dir, `${name}.webp`);
  const avifPath = join(dir, `${name}.avif`);

  try {
    const inputStat = await stat(filePath);
    const inputSizeMB = (inputStat.size / (1024 * 1024)).toFixed(2);

    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Convert to WebP
    await image
      .resize({ width: Math.min(metadata.width, 1920), withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath);

    // Convert to AVIF
    await sharp(filePath)
      .resize({ width: Math.min(metadata.width, 1920), withoutEnlargement: true })
      .avif({ quality: AVIF_QUALITY })
      .toFile(avifPath);

    const webpStat = await stat(webpPath);
    const avifStat = await stat(avifPath);

    const webpSizeMB = (webpStat.size / (1024 * 1024)).toFixed(2);
    const avifSizeMB = (avifStat.size / (1024 * 1024)).toFixed(2);

    console.log(
      `${name}${ext}: ${inputSizeMB}MB → WebP: ${webpSizeMB}MB, AVIF: ${avifSizeMB}MB`
    );
  } catch (err) {
    console.error(`Failed to process ${filePath}:`, err.message);
  }
}

async function main() {
  console.log(`Scanning ${IMAGES_DIR} for images > ${MIN_SIZE_KB}KB...\n`);

  const files = await getFiles(IMAGES_DIR);
  console.log(`Found ${files.length} images to compress\n`);

  // Process sequentially to avoid memory issues
  for (const file of files) {
    await compressImage(file.path);
  }

  console.log('\nDone!');
}

main().catch(console.error);

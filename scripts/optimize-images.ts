/**
 * Script per ottimizzazione immagini con Sharp
 * Converte immagini in WebP, genera thumbnail e medium, crea manifest.json
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import os from "os";

interface ImageMetadata {
  original: string;
  webp: string;
  thumbnail: string;
  medium: string;
  width: number;
  height: number;
  size: number;
  alt: string;
  category: "rooms" | "services" | "territory" | "logo";
}

const SOURCE_DIR = path.join(os.homedir(), "Desktop", " Residence Le Farfalle ");
const OUTPUT_DIR = path.join(process.cwd(), "public", "images");
const ROOMS_DIR = path.join(OUTPUT_DIR, "rooms");
const SERVICES_DIR = path.join(OUTPUT_DIR, "services");
const TERRITORY_DIR = path.join(OUTPUT_DIR, "territory");

// Mappatura nomi file originali -> nomi semantici e categoria
const imageMapping: Record<string, { name: string; category: "rooms" | "services" | "territory"; alt: string }> = {
  "Camera Matrimoniale 2 Le Farfalle.jpg": {
    name: "camera-2-letto",
    category: "rooms",
    alt: "Camera Matrimoniale 2 - Letto",
  },
  "Camera Matrimoniale 2 Residence Le Farfalle 1.jpg": {
    name: "camera-2-interno",
    category: "rooms",
    alt: "Camera Matrimoniale 2 - Interno",
  },
  "Camera Matrimoniale 2 Residence Le Farfalle 3.jpg": {
    name: "camera-2-dettaglio",
    category: "rooms",
    alt: "Camera Matrimoniale 2 - Dettaglio",
  },
  "Camera Matrimoniale 2 dettagli Le farfalle .jpg": {
    name: "camera-2-arredi",
    category: "rooms",
    alt: "Camera Matrimoniale 2 - Arredi",
  },
  "Camera matrimoniale 3 Le farfalle .jpg": {
    name: "camera-3-letto",
    category: "rooms",
    alt: "Camera Matrimoniale 3 - Letto",
  },
  "Camera matrimoniale 3 Residence Le Farfalle.jpg": {
    name: "camera-3-interno",
    category: "rooms",
    alt: "Camera Matrimoniale 3 - Interno",
  },
  "Camera matrimoniale 4 Residence le farfalle.jpg": {
    name: "camera-4-interno",
    category: "rooms",
    alt: "Camera Matrimoniale 4 - Interno",
  },
  "Camera matrimoniale Le Farfalle .jpg": {
    name: "camera-generale",
    category: "rooms",
    alt: "Camera Matrimoniale - Vista generale",
  },
  "Camera Matrimoniale 5 Residence Le Farfalle.jpg": {
    name: "camera-5-interno",
    category: "rooms",
    alt: "Camera Matrimoniale 5 - Interno",
  },
  "Bagno standard camera matrimoniale 2 Le farfalle.jpg": {
    name: "camera-2-bagno",
    category: "rooms",
    alt: "Camera Matrimoniale 2 - Bagno",
  },
  "Dettagli interni Residence Le Farfalle .jpg": {
    name: "dettagli-interni",
    category: "rooms",
    alt: "Dettagli interni del residence",
  },
  "Breakfast Residence Le Farfalle.jpg": {
    name: "colazione-breakfast",
    category: "services",
    alt: "Colazione servita al residence",
  },
  "Colazione Residence Le Farfalle.jpg": {
    name: "colazione-interno",
    category: "services",
    alt: "Area colazione del residence",
  },
};

interface OptimizationResult {
  original: string;
  originalSize: number;
  webp: string;
  webpSize: number;
  thumbnail: string;
  thumbnailSize: number;
  medium: string;
  mediumSize: number;
  width: number;
  height: number;
  category: "rooms" | "services" | "territory";
  alt: string;
}

async function optimizeImage(
  sourcePath: string,
  outputName: string,
  category: "rooms" | "services" | "territory",
  alt: string
): Promise<OptimizationResult> {
  const stats = fs.statSync(sourcePath);
  const originalSize = stats.size;

  // Determina directory di output
  const categoryDir = category === "rooms" ? ROOMS_DIR : category === "services" ? SERVICES_DIR : TERRITORY_DIR;

  // Leggi immagine e ottieni metadata
  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  const width = metadata.width || 1920;
  const height = metadata.height || 1080;

  // Genera percorsi output
  const webpPath = path.join(categoryDir, `${outputName}.webp`);
  const thumbnailPath = path.join(categoryDir, `${outputName}-thumb.webp`);
  const mediumPath = path.join(categoryDir, `${outputName}-medium.webp`);

  // Ottimizza immagine principale (max 1920px, qualità 85%)
  const optimizedWidth = Math.min(width, 1920);
  await image
    .resize(optimizedWidth, null, {
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: 85 })
    .toFile(webpPath);

  const webpStats = fs.statSync(webpPath);
  const webpSize = webpStats.size;

  // Genera thumbnail (400px)
  await image
    .resize(400, null, {
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: 85 })
    .toFile(thumbnailPath);

  const thumbStats = fs.statSync(thumbnailPath);
  const thumbnailSize = thumbStats.size;

  // Genera medium (800px)
  await image
    .resize(800, null, {
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: 85 })
    .toFile(mediumPath);

  const mediumStats = fs.statSync(mediumPath);
  const mediumSize = mediumStats.size;

  return {
    original: path.basename(sourcePath),
    originalSize,
    webp: `/images/${category}/${outputName}.webp`,
    webpSize,
    thumbnail: `/images/${category}/${outputName}-thumb.webp`,
    thumbnailSize,
    medium: `/images/${category}/${outputName}-medium.webp`,
    mediumSize,
    width,
    height,
    category,
    alt,
  };
}

async function main() {
  console.log("🚀 Inizio ottimizzazione immagini...\n");

  // Crea directory se non esistono
  [ROOMS_DIR, SERVICES_DIR, TERRITORY_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Leggi file dalla directory sorgente
  const files = fs.readdirSync(SOURCE_DIR).filter((f) => /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(f));

  console.log(`📸 Trovate ${files.length} immagini da ottimizzare\n`);

  const results: OptimizationResult[] = [];
  const manifest: ImageMetadata[] = [];

  // Processa ogni immagine
  for (const file of files) {
    const sourcePath = path.join(SOURCE_DIR, file);
    const mapping = imageMapping[file];

    if (!mapping) {
      console.log(`⚠️  File non mappato: ${file} - saltato`);
      continue;
    }

    try {
      console.log(`🔄 Processando: ${file} -> ${mapping.name}`);
      const result = await optimizeImage(sourcePath, mapping.name, mapping.category, mapping.alt);
      results.push(result);

      // Aggiungi al manifest
      manifest.push({
        original: result.original,
        webp: result.webp,
        thumbnail: result.thumbnail,
        medium: result.medium,
        width: result.width,
        height: result.height,
        size: result.webpSize,
        alt: result.alt,
        category: result.category,
      });

      const savings = ((1 - result.webpSize / result.originalSize) * 100).toFixed(1);
      console.log(`   ✅ Completato: ${(result.originalSize / 1024 / 1024).toFixed(2)}MB -> ${(result.webpSize / 1024 / 1024).toFixed(2)}MB (${savings}% risparmio)\n`);
    } catch (error) {
      console.error(`❌ Errore processando ${file}:`, error);
    }
  }

  // Genera manifest.json
  const manifestPath = path.join(OUTPUT_DIR, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Report finale
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalWebp = results.reduce((sum, r) => sum + r.webpSize, 0);
  const totalThumb = results.reduce((sum, r) => sum + r.thumbnailSize, 0);
  const totalMedium = results.reduce((sum, r) => sum + r.mediumSize, 0);
  const totalSavings = ((1 - totalWebp / totalOriginal) * 100).toFixed(1);

  console.log("\n" + "=".repeat(60));
  console.log("📊 REPORT OTTIMIZZAZIONE");
  console.log("=".repeat(60));
  console.log(`Immagini processate: ${results.length}`);
  console.log(`Dimensione originale totale: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Dimensione WebP totale: ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Dimensione Thumbnail totale: ${(totalThumb / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Dimensione Medium totale: ${(totalMedium / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Risparmio totale: ${totalSavings}%`);
  console.log(`Manifest generato: ${manifestPath}`);
  console.log("=".repeat(60) + "\n");
}

main().catch(console.error);

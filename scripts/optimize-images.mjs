#!/usr/bin/env node
/**
 * Converte le immagini raster in WebP + AVIF con varianti responsive.
 *
 * Gli originali restano al loro posto: Next li usa come sorgente e `next/image`
 * serve la variante migliore. Idempotente — rilanciarlo non rifà il lavoro già fatto.
 *
 *   node scripts/optimize-images.mjs           # solo report
 *   node scripts/optimize-images.mjs --apply
 */
import { readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, dirname, basename } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..", "public", "images");
const APPLY = process.argv.includes("--apply");
const WIDTHS = [640, 1024, 1600];
const SOURCE_EXT = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (SOURCE_EXT.has(extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const mb = (bytes) => (bytes / 1048576).toFixed(2);

const files = await walk(ROOT);
let before = 0;
let after = 0;
let written = 0;
const report = [];

for (const file of files) {
  const original = (await stat(file)).size;
  before += original;

  const image = sharp(file);
  const meta = await image.metadata();
  const stem = join(dirname(file), basename(file, extname(file)));

  let smallest = original;

  for (const width of WIDTHS) {
    // Non ingrandire mai: una foto da 1024px non guadagna nulla a 1600.
    if (meta.width && width > meta.width) continue;

    for (const [format, options] of [
      ["webp", { quality: 82 }],
      ["avif", { quality: 58 }],
    ]) {
      const target = `${stem}-${width}.${format}`;
      if (existsSync(target)) continue;
      if (!APPLY) {
        report.push(`  genererebbe ${basename(target)}`);
        continue;
      }
      const buffer = await sharp(file).resize({ width }).toFormat(format, options).toBuffer();
      await writeFile(target, buffer);
      written += 1;
      if (width === Math.min(...WIDTHS.filter((w) => !meta.width || w <= meta.width))) {
        smallest = Math.min(smallest, buffer.length);
      }
    }
  }

  // Peso di riferimento: variante più larga in AVIF, quella che serve un desktop.
  const widest = WIDTHS.filter((w) => !meta.width || w <= meta.width).pop();
  const probe = `${stem}-${widest}.avif`;
  if (existsSync(probe)) after += (await stat(probe)).size;
  else after += smallest;
}

console.log(`Sorgenti analizzate: ${files.length}`);
if (!APPLY) {
  console.log(report.slice(0, 20).join("\n"));
  console.log(`\nDRY-RUN. ${report.length} varianti da generare. Rilancia con --apply.`);
} else {
  console.log(`Varianti scritte: ${written}`);
  console.log(`Peso originali:  ${mb(before)} MB`);
  console.log(`Peso ottimizzati: ${mb(after)} MB  (${(100 - (after / before) * 100).toFixed(0)}% in meno)`);
}

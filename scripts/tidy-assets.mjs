// Renames files/folders in /public that contain spaces ("main circle.webp" -> "main-circle.webp").
// Safe to re-run. Preview first:  node scripts/tidy-assets.mjs --dry
import { readdirSync, renameSync, existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const dry = process.argv.includes("--dry");
const root = resolve("public");
if (!existsSync(root)) {
  console.error("No ./public folder here. Run this from the project root.");
  process.exit(1);
}

let count = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full); // children first, then the folder itself
    if (!name.includes(" ")) continue;
    const next = join(dir, name.replace(/\s+/g, "-"));
    if (existsSync(next)) {
      console.warn(`SKIP (target exists): ${full}`);
      continue;
    }
    console.log(`${dry ? "[dry] " : ""}${full.replace(root, "public")}  ->  ${next.replace(root, "public")}`);
    if (!dry) renameSync(full, next);
    count++;
  }
}
walk(root);
console.log(count ? `${dry ? "Would rename" : "Renamed"} ${count} item(s).` : "Nothing to rename.");

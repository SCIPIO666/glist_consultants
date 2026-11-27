/**
 * Moves the client's REAL articles (src/data/insights.ts + src/data/insightBodies.ts) into
 * Sanity so the client can edit them, and removes the placeholder articles that
 * scripts/seed-sanity.ts put there earlier.
 *
 *   npx tsx --env-file=.env.local scripts/sync-sanity-articles.ts --dry   (shows what it would do)
 *   npx tsx --env-file=.env.local scripts/sync-sanity-articles.ts         (does it)
 *
 * Safe to re-run: the real articles are written with fixed ids (insight-<slug>), so running it
 * again just refreshes them (it would overwrite edits made in the Studio to those four, so run it
 * once, then edit in the Studio).
 *
 * It deletes ONLY articles whose id starts with "insight-" (the seeded ones) and whose slug is
 * not one of the real four, plus their unpublished drafts. Articles written by hand in the
 * Studio have random ids and are never touched: it lists them so you can delete them yourself.
 *
 * Add --delete-others to ALSO delete every other article (test articles made by hand in the
 * Studio), so only the real four remain.
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (Editor token) in .env.local.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { insights } from "../src/data/insights";
import { articleBodies } from "../src/data/insightBodies";

const dry = process.argv.includes("--dry");
const deleteOthers = process.argv.includes("--delete-others");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  token,
  useCdn: false,
});

async function main() {
  const keep = insights.map((i) => i.slug);

  // 1. Write the real articles
  for (const item of insights) {
    const body = articleBodies[item.slug];
    if (!body) {
      console.warn(`SKIPPED ${item.slug}: no text found in insightBodies.ts`);
      continue;
    }
    const file = path.join(process.cwd(), "public", item.image.src);
    if (!fs.existsSync(file)) {
      console.warn(`SKIPPED ${item.slug}: cover image not found at public${item.image.src}`);
      continue;
    }
    if (dry) {
      console.log(`[dry] would write: ${item.slug}`);
      continue;
    }
    const asset = await client.assets.upload("image", fs.createReadStream(file), { filename: path.basename(file) });
    await client.createOrReplace({
      _id: `insight-${item.slug}`,
      _type: "insight",
      title: item.title,
      slug: { _type: "slug", current: item.slug },
      excerpt: item.excerpt,
      date: item.date,
      category: item.category,
      service: item.service,
      readMinutes: item.readMinutes,
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: item.image.alt },
      body,
    });
    console.log(`written: ${item.slug}`);
  }

  // 2. Remove the old seeded placeholders (published and draft copies)
  const old = await client.fetch<{ _id: string; title: string }[]>(
    `*[_type == "insight" && (_id match "insight-*" || _id match "drafts.insight-*") && !(slug.current in $keep)]{ _id, title }`,
    { keep },
  );
  for (const doc of old) {
    if (dry) {
      console.log(`[dry] would delete: ${doc.title}`);
    } else {
      await client.delete(doc._id);
      console.log(`deleted: ${doc.title}`);
    }
  }

  // 3. Anything else is hand-made in the Studio (tests): leave it, or delete it with --delete-others
  const others = await client.fetch<{ _id: string; title: string }[]>(
    `*[_type == "insight" && !(_id match "insight-*") && !(_id match "drafts.insight-*")]{ _id, title }`,
  );
  if (others.length && !deleteOthers) {
    console.log("\nArticles made by hand in the Studio (left alone). Add --delete-others to remove them:");
    others.forEach((d) => console.log(`  - ${d.title}`));
  }
  if (others.length && deleteOthers) {
    for (const doc of others) {
      if (dry) {
        console.log(`[dry] would delete: ${doc.title}`);
        continue;
      }
      await client.delete(doc._id);
      await client.delete(`drafts.${doc._id}`).catch(() => {}); // unpublished copy, if any
      console.log(`deleted: ${doc.title}`);
    }
  }
  console.log(dry ? "\nDry run only, nothing changed." : "\nDone. Reload /insights.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

/**
 * One-off: copies the current static placeholder content into Sanity so the Studio starts
 * with something to edit. Safe to re-run (stable ids, createOrReplace).
 *
 *   npx tsx --env-file=.env.local scripts/seed-sanity.ts
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (an Editor token).
 * The article bodies and reviews are PLACEHOLDERS (see the notes in src/data): replace them.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { insights } from "../src/data/insights";
import { reviewsSection } from "../src/data/reviews";

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

const key = () => Math.random().toString(36).slice(2, 10);
const para = (text: string) => ({ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] });

async function main() {
  for (const item of insights) {
    const file = path.join(process.cwd(), "public", item.image.src);
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
      body: [para(item.excerpt), para("PLACEHOLDER: replace this with the full article text before launch.")],
    });
    console.log("insight:", item.slug);
  }

  for (const [i, r] of reviewsSection.items.entries()) {
    await client.createOrReplace({
      _id: `review-${i + 1}`,
      _type: "review",
      quote: r.quote,
      name: r.name,
      role: r.role,
      location: r.location,
      service: r.service,
      stars: r.stars,
      order: (i + 1) * 10,
    });
    console.log("review:", r.name);
  }
  console.log("Done. Open /studio to edit.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

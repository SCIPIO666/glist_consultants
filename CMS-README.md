# Sanity CMS, phase 1

## What is wired
- **Insights**: list page (`/insights`), a NEW article page (`/insights/<slug>`, with rich text, SEO tags and Article JSON-LD), filters still work.
- **Home reviews**: the stacked review cards (needs at least 2; with fewer, the static samples show).
- **Studio** at `/studio` (editors log in with their Sanity account).
- **Safe fallback**: until `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, the site runs on the static files in `src/data` exactly as before.

## Not wired yet (still static in src/data): next phases
Services (used in 8 places), site settings (phone, email, socials), hero/about/property/stats copy, property reviews.

## Setup (once)
1. Install: `npm i next-sanity sanity @sanity/vision @sanity/client styled-components` and `npm i -D tsx`
   (check the versions it picks support Next 16 and React 19; if npm complains about peers, tell me the message).
2. Create the project: `npx sanity@latest init --env` (or sanity.io/manage). Copy `.env.example` to `.env.local` and fill it in.
3. In sanity.io/manage > API > CORS origins, add `http://localhost:3000` and the live site URL, both with credentials allowed.
4. Seed the sample content: `npx tsx --env-file=.env.local scripts/seed-sanity.ts` (needs an Editor token in `SANITY_API_WRITE_TOKEN`).
5. `npm run dev`, open `/studio`, edit, publish. The seeded articles and reviews are PLACEHOLDERS: replace them.
6. Live refresh: sanity.io/manage > API > Webhooks > new: URL `https://YOUR-SITE/api/revalidate`, secret = `SANITY_REVALIDATE_SECRET`,
   filter `_type in ["insight","review"]`, projection `{_type, "slug": slug.current}`, trigger on create/update/delete.
   Without it, changes still appear within an hour.

## Notes
- AGENTS.md says this Next.js version differs from what I know and tells me to read `node_modules/next/dist/docs/`. I could not (no node_modules here),
  so please check two things in dev: `revalidateTag(tag, "max")` in `src/app/api/revalidate/route.ts` and the `next` fetch options in `src/sanity/fetch.ts`.
- `AppChrome` stops the site header, footer and smooth-scroll from wrapping the Studio. The site's global CSS still touches Studio headings slightly; a separate route group fixes that if it bothers you.
- Image hotspot in the Studio becomes the card's `object-position` automatically.

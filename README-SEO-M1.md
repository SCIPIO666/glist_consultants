# Milestone 1: SEO

Extract into the project root and overwrite. No new packages.

NEW
- src/lib/seo.ts                     absolute URLs + JSON-LD builders (business, services, breadcrumbs)
- src/components/seo/JsonLd.tsx
- src/app/robots.ts                  blocks /studio, /api, test pages; points to the sitemap
- src/app/sitemap.ts                 pages + every article (Sanity and static), refreshed hourly
- src/app/opengraph-image.tsx        default 1200x630 share card (WhatsApp, Facebook, LinkedIn, X)
- src/app/twitter-image.tsx

OVERWRITTEN (small edits only)
- src/app/layout.tsx                 keywords, twitter text, optional Google verification, sitewide business JSON-LD
- src/app/services/page.tsx          seven-service list + breadcrumb JSON-LD
- src/app/property-management/page.tsx   Service + breadcrumb JSON-LD
- src/app/insights/[slug]/page.tsx   fuller Article JSON-LD (absolute image, dates, breadcrumb), article share image

BEFORE GOING LIVE (important)
1. Set NEXT_PUBLIC_SITE_URL=https://your-real-domain in the host's environment variables. Canonicals, sitemap and
   share links all use it; without it they point at localhost.
2. Optional: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<token from Google Search Console>.
3. After deploy, open /sitemap.xml and /robots.txt to confirm, then submit /sitemap.xml in Search Console.
4. Test a link in https://www.opengraph.xyz or by pasting it into WhatsApp.
5. Add the client's street address / Google Business Profile later; it would let us add a precise LocalBusiness entry.
   Nothing here invents an address, reviews or ratings.

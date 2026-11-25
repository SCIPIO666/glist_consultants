GC13 HOMEPAGE BUILD FIX
======================

Purpose
-------
Fix the four TypeScript errors reported after applying the GC11 homepage
restoration patch, without replacing shared project configuration or changing
other pages.

Files in this patch
-------------------
1. src/components/home/insights/InsightTeaser.tsx
   Aligns the restored homepage teaser with the GC11 insightsLink data shape:
   - copy.featured
   - copy.linkHref / copy.linkLabel
   - featured.image.src / featured.image.alt
   - featured.cta

2. src/components/home/why/WhyReasons.tsx
   Removes the unsupported optional `tone` prop from ScatterDots. The component
   continues to render using its existing default palette and className.

Install
-------
Extract this ZIP into the GC13 project root and overwrite the two matching
files. Do not replace package files, configuration, global styles, or other
pages.

Then run:
  npm run build

This patch addresses the TypeScript errors shown in the supplied build log.
A successful production build should still be verified in the target project.

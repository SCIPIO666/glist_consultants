HOMEPAGE RESTORE PATCH — GC11 → GC13

Purpose
Restore the original homepage implementation and its homepage-only content/data
from gc (11). This patch does not replace the project configuration, package files,
global CSS, layout, shared components, services data used by other pages, or any
GC13-only routes/features.

Apply
1. Make a backup or commit your current project.
2. Extract this ZIP into the project root (the folder that contains the `src` folder).
   If your project has a `gc/` folder at its root, extract one level above that folder.
3. Allow files to overwrite when prompted.
4. Restart the development server and check `/`.

Included paths
- src/app/page.tsx
- src/components/home/**
- src/data/finalCta.ts
- src/data/hero.ts
- src/data/insightsLink.ts
- src/data/intro.ts
- src/data/reviews.ts
- src/data/servicesSection.ts
- src/data/stats.ts
- src/data/whyUs.ts

Intentionally not included
- src/data/services.ts (shared with GC13 services/property/contact pages)
- src/lib/gsap.ts (GC13's additive mobile-resize fix is preserved)
- src/app/globals.css, src/app/layout.tsx, package files, and all non-homepage routes.

The patch restores homepage source files and data, not the rest of GC11.

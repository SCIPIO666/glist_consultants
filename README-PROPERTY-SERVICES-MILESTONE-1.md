# Glist Consultants — Property page services section (Milestone 1)

## Apply
Extract this ZIP into the root of your existing project (the folder containing `src/`). Allow the file to overwrite:

- `src/components/property/PropertyServices.tsx`

No other project files are changed. The section continues to use the existing `src/data/propertyServices.ts`, `DashField`, `Button`, GSAP setup, Tailwind theme tokens and existing contact route.

## What changed
- Replaced the horizontal glass strips with circular glassmorphism service panels.
- Kept the left editorial column sticky on desktop while the service circles flow/scroll on the right.
- Added the brief's top-right and bottom-left diagonal corner dash patterns.
- Added staggered, reversible ScrollTrigger reveals and active service progress count.
- Added restrained hover lift, gold ring treatment and arrow affordance.
- Preserved reduced-motion handling and responsive single/two-column layouts.

## Scope
This patch changes the Property Management **services listing section only**. It does not modify the value proposition section or any other page section.

## After extraction
Run:

```bash
npm run build
```

Then inspect `/property-management` at desktop and mobile widths. No new dependency is required.

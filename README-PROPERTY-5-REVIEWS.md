# Property page, step 5: circular reviews

Extract into the project root (the folder containing `src`). Needs steps 2 to 4 already in place. No new dependencies.

New:
- src/components/property/PropertyReviews.tsx
- src/data/propertyReviews.ts   (4 SAMPLE reviews; replace with real ones, then set propertyReviewsAreSamples = false)

Overwrites:
- src/app/property-management/page.tsx   (adds <PropertyReviews /> after the value section)

Images used (already in your project): public/pages/property/reviews/*  (4 files)
Old PropertyTestimonials.tsx is unused and can be deleted.

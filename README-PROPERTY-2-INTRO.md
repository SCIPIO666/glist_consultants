# Property page, step 2: mask-gradient intro

Extract into the project root (the folder containing `src`). Overwrites 2 files, adds 2.

New:
- src/components/property/PropertyIntro.tsx  (circle band edge + scroll-masked paragraph + circle row)
- src/data/propertyIntro.ts                  (copy)

Overwritten:
- src/app/property-management/page.tsx       (hero, intro, news, final CTA; old unused sections dropped from the page)
- src/data/propertyManagement.ts             (only change: hero CTA href "#enquire" -> "/contact?service=property-management",
                                              since the enquiry section no longer exists on the page)

Old components (PropertyEnquiry/Focus/About/Why/Tasks/Testimonials) are left on disk, unused. Delete when happy.
No new dependencies.

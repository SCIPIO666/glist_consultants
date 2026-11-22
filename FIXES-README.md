# Fixes pack

Extract into the project root (overwrites the listed files; contact page files are in the earlier zip).

1. Why us reasons: each reason now has its own GSAP ScrollTrigger (ScrollTrigger.batch), reversible, staggered when several arrive together. (WhyReasons.tsx)
2. Quotes: new SVG QuoteMark (src/components/ui/QuoteMark.tsx). Top-right is the CLOSING pair, bottom-left is the OPENING pair, mint-to-blue gradient. (WhyReviews.tsx)
3. Fonts: headings use Poppins (layout.tsx + globals.css --font-display). Heading scale raised ~10%. To try another family, change only the `heading` block in layout.tsx.
4. Mobile reviews lag: ScrollTrigger.config({ ignoreMobileResize: true }) in lib/gsap.ts, blur filter removed from the glow, lighter shadows, will-change on cards, header backdrop-blur desktop-only.
5. Insights teaser: flat brand blue replaced with a deep teal-to-navy gradient, soft facets and a fine dot grid. (InsightsLinks.tsx)
6. Intro graph on phones: tagline is centred in the plot and narrower, so it no longer touches the y axis. (IntroGraph.tsx)

"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { QuoteMark } from "@/components/ui/QuoteMark";
import { reviewsAreSamples, reviewsSection as copy, type Review } from "@/data/reviews";
import { ReviewCard } from "./ReviewCard";

const SCROLL_PER_CARD = 60; // svh of scrolling per card
const HOLD = 50; // svh of rest at the end
const LEAD = 0.2; // timeline units of rest before the first card moves

/**
 * Why us, part 3 of 3: reviews (dark redesign). The section is tall and its content is pinned
 * (CSS sticky) while scrolling plays a scrubbed timeline: each review rises from
 * the bottom and settles one strip lower than the last, so every card's stars
 * stay visible. Fully reversible. Title and CTA stay on the left.
 */
export function WhyReviews({ items }: { items: Review[] }) {
  const root = useRef<HTMLElement>(null);
  const n = items.length;

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-review-card]", el);
      const mm = gsap.matchMedia();

      mm.add(mq.pin, () => {
        const fromBelow = () => window.innerHeight;

        // Card 1 rises on its own as the section scrolls into view (reversible).
        gsap.fromTo(
          cards[0],
          { y: fromBelow, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none reverse", invalidateOnRefresh: true },
          },
        );

        // The rest rise one at a time while the section is pinned, each settling
        // one strip lower than the last so every card's stars row stays visible.
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true, fastScrollEnd: true },
        });
        for (let i = 1; i < n; i++) {
          tl.fromTo(cards[i], { y: fromBelow }, { y: 0, duration: 1 }, LEAD + (i - 1));
        }
        tl.to({}, { duration: 0.5 }, LEAD + (n - 1)); // rest on the last card
      });
      // Reduced motion: no pinning; cards list one under another (see motion-reduce classes).
    },
    { scope: root, dependencies: [n] },
  );

  const style = {
    "--stack-h": `calc(100svh + ${SCROLL_PER_CARD * (n - 1) + HOLD}svh)`,
    "--card-h": "16.5rem",
    "--n": n,
  } as CSSProperties;

  return (
    <section
      ref={root}
      aria-labelledby="reviews-title"
      style={style}
      className="relative h-[var(--stack-h)] bg-night text-white [--offset:2.25rem] sm:[--offset:3.25rem] flat:h-auto"
    >
      <div className="sticky top-0 h-svh overflow-hidden flat:static flat:h-auto flat:overflow-visible">
        {/* faint bright glow behind the stack */}
        <div aria-hidden className="pointer-events-none absolute -right-1/4 top-1/4 size-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(31_111_214/0.26),transparent)]" />

        <div className="wrap-wide relative flex h-full flex-col gap-4 pt-[calc(var(--header-h)+0.25rem)] pb-4 sm:gap-6 sm:pb-6 lg:pb-8 flat:py-24">
          {/* Top rule: label, line, big quote mark */}
          <div className="flex items-center gap-4 sm:gap-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">{copy.label}</p>
            <span aria-hidden className="h-px flex-1 bg-linear-to-r from-[#7ff0d6] to-[#7ff0d6]/10" />
            <QuoteMark kind="close" className="h-8 sm:h-12" />
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6 lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
            {/* Left: fixed */}
            <div className="relative lg:h-full lg:max-w-[34rem] lg:self-stretch lg:pt-4">
              <Reveal y={40}>
                <h2
                  id="reviews-title"
                  className="text-[clamp(1.65rem,0.9rem+3.7vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.025em]"
                >
                  {copy.heading}{" "}
                  <span className="bg-linear-to-r from-gold via-[#f1d27a] to-brand-soft bg-clip-text text-transparent">
                    {copy.headingAccent}
                  </span>
                </h2>
              </Reveal>
              <div className="mt-6 hidden lg:mt-8 lg:block">
                <CtaLink />
              </div>
              <QuoteMark kind="open" className="absolute bottom-0 left-0 hidden h-24 lg:block" />
            </div>

            {/* Right: the stack. Height = one card + one strip per extra card. */}
            <div className="relative max-h-[28rem] min-h-[17rem] w-full flex-1 lg:ml-auto lg:h-[min(74svh,52rem)] lg:max-h-none lg:max-w-[38rem] lg:flex-none flat:h-auto flat:max-h-none flat:min-h-0 flat:flex-none">
              {items.map((r, i) => (
                <ReviewCard key={r.name} review={r} index={i} />
              ))}
            </div>

            <div className="lg:hidden">
              <CtaLink />
            </div>
          </div>

          {process.env.NODE_ENV !== "production" && reviewsAreSamples && items === copy.items && (
            <p className="absolute right-[var(--gutter)] top-[calc(var(--header-h)-1rem)] rounded-pill bg-alert-bg px-3 py-1 text-xs font-semibold text-alert">
              Dev note: sample reviews. Replace in src/data/reviews.ts before launch.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function CtaLink() {
  return (
    <Link
      href={copy.cta.href}
      className="group inline-flex h-14 items-center gap-2.5 rounded-pill bg-linear-to-r from-gold to-[#f3d98b] px-7 font-semibold text-night-deep transition-[filter,transform] duration-300 hover:brightness-105 active:scale-[0.98]"
    >
      {copy.cta.label}
      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

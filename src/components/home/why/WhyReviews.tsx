"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Circled } from "@/components/motion/Circled";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { reviewsAreSamples, reviewsSection as copy } from "@/data/reviews";
import { ReviewCard } from "./ReviewCard";

const n = copy.items.length;
const SCROLL_PER_CARD = 60; // svh of scrolling per card
const HOLD = 50; // svh of rest at the end
const LEAD = 0.3; // timeline units of rest before the first card moves

/**
 * Why us, part 3 of 3: reviews. The section is tall and its content is pinned
 * (CSS sticky) while scrolling plays a scrubbed timeline: each review rises from
 * the bottom and settles one strip lower than the last, so every card's stars
 * stay visible. Fully reversible. Title and CTA stay on the left.
 */
export function WhyReviews() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-review-card]", el);
      const mm = gsap.matchMedia();

      mm.add(mq.motionOk, () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: true },
        });
        for (let i = 1; i < n; i++) {
          tl.fromTo(cards[i], { yPercent: 400 }, { yPercent: 0, duration: 1 }, LEAD + (i - 1));
        }
        tl.to({}, { duration: 0.5 }, LEAD + (n - 1)); // rest on the last card
      });
      // Reduced motion: no pinning; cards list one under another (see motion-reduce classes).
    },
    { scope: root },
  );

  const style = {
    "--stack-h": `calc(100svh + ${SCROLL_PER_CARD * (n - 1) + HOLD}svh)`,
    "--card-h": "16.5rem",
    "--offset": "3.5rem",
    "--n": n,
  } as CSSProperties;

  return (
    <section
      ref={root}
      aria-labelledby="reviews-title"
      style={style}
      className="relative h-[var(--stack-h)] bg-sand text-ink motion-reduce:h-auto"
    >
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:overflow-visible">
        <div className="wrap-wide relative flex h-full flex-col justify-center gap-6 pt-[calc(var(--header-h)+0.5rem)] pb-6 lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16 lg:pb-0 lg:pt-[var(--header-h)] motion-reduce:py-24">
          {/* Left: fixed */}
          <div className="lg:max-w-[34rem]">
            <Reveal y={20}>
              <Eyebrow className="text-brand">{copy.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal y={40} delay={0.1} className="mt-3 lg:mt-5">
              <h2
                id="reviews-title"
                className="text-[clamp(1.9rem,0.9rem+3.7vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.025em]"
              >
                {copy.titleBefore}{" "}
                <Circled shape="circle" colorClass="text-cta">
                  {copy.titleMark}
                </Circled>
                {copy.titleAfter}
              </h2>
            </Reveal>
            <p className="mt-5 hidden max-w-md text-lead text-ink-muted sm:block">{copy.lead}</p>
            <div className="mt-6 hidden lg:mt-8 lg:block">
              <Button href={copy.cta.href} size="lg" arrow>
                {copy.cta.label}
              </Button>
            </div>
          </div>

          {/* Right: the stack. Height = one card + one strip per extra card. */}
          <div className="relative h-[calc(var(--card-h)+var(--offset)*(var(--n)-1))] w-full lg:ml-auto lg:max-w-[36rem] motion-reduce:h-auto">
            {copy.items.map((r, i) => (
              <ReviewCard key={r.name} review={r} index={i} />
            ))}
          </div>

          <div className="lg:hidden">
            <Button href={copy.cta.href} arrow>
              {copy.cta.label}
            </Button>
          </div>

          {process.env.NODE_ENV !== "production" && reviewsAreSamples && (
            <p className="absolute right-[var(--gutter)] top-[calc(var(--header-h)-1rem)] rounded-pill bg-alert-bg px-3 py-1 text-xs font-semibold text-alert">
              Dev note: sample reviews. Replace in src/data/reviews.ts before launch.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

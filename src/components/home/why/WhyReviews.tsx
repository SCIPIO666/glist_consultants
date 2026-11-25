"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { reviewsAreSamples, reviewsSection as copy } from "@/data/reviews";
import { ReviewCard } from "./ReviewCard";

const n = copy.items.length;
const SCROLL_PER_CARD = 60; // svh of scrolling per card
const HOLD = 50; // svh of rest at the end
const LEAD = 0.3; // timeline units of rest before the first card moves

/** Big quote mark with a gold-to-blue gradient fill. */
function QuoteMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={
        "block select-none bg-gradient-to-br from-gold via-brand-soft to-brand bg-clip-text font-display font-bold leading-[0.8] text-transparent " +
        (className ?? "")
      }
    >
      &ldquo;
    </span>
  );
}

/**
 * Why us, part 3 of 3: reviews, on a night screen with soft gradients. Top: the TESTIMONIALS
 * label, a hairline and a quote mark. Left: a fixed heading, a quote mark and the CTA.
 * Right: bright cards that rise from the bottom one by one (scrubbed, reversible), each
 * settling one strip lower than the last so every card's stars stay visible.
 */
export function WhyReviews() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-review-card]", el);
      const mm = gsap.matchMedia();

      mm.add(mq.pin, () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: true },
        });
        for (let i = 1; i < n; i++) {
          tl.fromTo(cards[i], { yPercent: 400 }, { yPercent: 0, duration: 1 }, LEAD + (i - 1));
        }
        tl.to({}, { duration: 0.5 }, LEAD + (n - 1)); // rest on the last card
      });
      // Reduced motion: no pinning; cards list one under another (see the flat: classes).
    },
    { scope: root },
  );

  const style = {
    "--stack-h": `calc(100svh + ${SCROLL_PER_CARD * (n - 1) + HOLD}svh)`,
    "--card-h": "17.5rem",
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
        {/* gradients of the night family plus a bright blue companion */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_15%,rgba(31,111,214,0.45),transparent_60%),radial-gradient(ellipse_60%_50%_at_10%_95%,rgba(11,58,65,0.9),transparent_65%),linear-gradient(160deg,#0B3A41_0%,#002025_45%,#001519_100%)]"
        />

        <div className="wrap-wide relative flex h-full flex-col gap-3 pt-[calc(var(--header-h)+0.25rem)] pb-4 sm:gap-6 sm:pb-6 lg:grid lg:grid-cols-[1fr_1.05fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-6 lg:pb-8 lg:pt-[calc(var(--header-h)+2rem)] flat:py-24">
          {/* Top bar: label, hairline, quote mark */}
          <div className="flex items-center gap-4 lg:col-span-2">
            <p className="text-sm font-bold uppercase tracking-[0.14em]">{copy.label}</p>
            <span aria-hidden className="h-px flex-1 bg-white/30" />
            <QuoteMark className="text-[3.25rem] sm:text-[4.5rem]" />
          </div>

          {/* Left: fixed heading + CTA, quote mark at the bottom */}
          <div className="flex flex-col lg:justify-between lg:pb-2">
            <div>
              <Reveal y={40}>
                <h2
                  id="reviews-title"
                  className="max-w-[16ch] text-[clamp(1.6rem,0.8rem+3.4vw,4.1rem)] font-medium leading-[1.08] tracking-[-0.025em] lg:max-w-[14ch]"
                >
                  {copy.title}
                </h2>
              </Reveal>
              <div className="mt-8 hidden lg:block">
                <Button href={copy.cta.href} size="lg" arrow>
                  {copy.cta.label}
                </Button>
              </div>
            </div>
            <QuoteMark className="hidden text-[7rem] lg:block" />
          </div>

          {/* Right: the stack. Height = one card + one strip per extra card. */}
          <div className="relative max-h-[28rem] min-h-[17rem] w-full flex-1 lg:ml-auto lg:h-[calc(var(--card-h)+var(--offset)*(var(--n)-1))] lg:max-h-none lg:max-w-[36rem] lg:flex-none lg:self-center flat:h-auto flat:max-h-none flat:min-h-0 flat:flex-none">
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

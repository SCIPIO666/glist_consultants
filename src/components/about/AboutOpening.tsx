"use client";

import { useRef, type RefObject } from "react";
import { gsap, mq, SplitText, useGSAP } from "@/lib/gsap";
import { aboutOpening as copy } from "@/data/aboutOpening";

/**
 * Mask-reveal text: each line slides up out of its own clipping box when the
 * element scrolls into view, and slides back down when you scroll up. Re-splits
 * automatically on resize so lines never break wrongly.
 */
function useMaskReveal(ref: RefObject<HTMLElement | null>, stagger: number, duration: number) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.set(el, { opacity: 1 });
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration,
              stagger,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" },
            }),
        });
      });
      mm.add(mq.reduced, () => {
        gsap.set(el, { opacity: 1 });
      });
    },
    { scope: ref },
  );
}

/** About, section 2: a big title and an introduction that reveals line by line. */
export function AboutOpening() {
  const title = useRef<HTMLHeadingElement>(null);
  const para = useRef<HTMLParagraphElement>(null);
  useMaskReveal(title, 0.12, 1.3);
  useMaskReveal(para, 0.1, 1.1);

  return (
    <section aria-labelledby="about-opening" className="relative bg-night-deep text-brand-soft">
      <div className="wrap-wide flex min-h-svh flex-col justify-center gap-[clamp(2.5rem,7svh,5rem)] py-[clamp(5rem,14svh,10rem)]">
        <h2
          id="about-opening"
          ref={title}
          className="max-w-[16ch] text-[clamp(2.75rem,1.2rem+6.2vw,7.25rem)] font-normal leading-[1.02] tracking-[-0.025em] opacity-0"
        >
          {copy.titleLight} <span className="text-white">{copy.titleWhite}</span>
        </h2>

        <p
          ref={para}
          className="max-w-[36rem] text-[clamp(1.1rem,0.95rem+0.6vw,1.5rem)] leading-[1.5] opacity-0 lg:ml-[30%]"
        >
          {copy.paragraph}
        </p>
      </div>
    </section>
  );
}

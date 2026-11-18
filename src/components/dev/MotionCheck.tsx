"use client";

/**
 * TEMPORARY: proves GSAP + ScrollTrigger + Lenis are wired together.
 * Delete this file (and its use in app/page.tsx) when the Home page is built.
 * It also shows the standard pattern every section will follow.
 */
import { useRef } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";

export function MotionCheck() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.from("[data-reveal]", {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse", // reversible on scroll
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid gap-4 sm:grid-cols-3">
      {["Lenis smooth scroll", "GSAP ScrollTrigger", "Reversible reveal"].map((t) => (
        <div
          key={t}
          data-reveal
          className="rounded-card bg-night-card p-6 text-white shadow-lift"
        >
          <p className="font-display text-h3">{t}</p>
          <p className="mt-2 text-white/70">Scroll up and down: this should replay.</p>
        </div>
      ))}
    </div>
  );
}

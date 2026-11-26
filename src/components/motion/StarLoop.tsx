"use client";

import { useRef, type ReactNode } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const STAR = "12 2 15.1 8.6 22 9.3 16.8 14 18.2 21 12 17.5 5.8 21 7.2 14 2 9.3 8.9 8.6";

/** Fixed pattern (no randomness, so server and client markup match). */
const COLUMNS = [
  { sizes: [34, 20, 44, 26, 38, 22, 30], tones: [0, 1, 0, 0, 1, 0, 0], seconds: 26 },
  { sizes: [24, 40, 28, 46, 22, 36, 26], tones: [0, 0, 1, 0, 0, 1, 0], seconds: 34 },
  { sizes: [42, 26, 32, 20, 44, 28, 34], tones: [1, 0, 0, 0, 1, 0, 0], seconds: 30 },
];
const TONE = ["text-kra-light", "text-brand-soft"];

function Star({ size, tone }: { size: number; tone: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className={cn("shrink-0", TONE[tone])}>
      <polygon points={STAR} fill="currentColor" stroke="currentColor" strokeWidth={1.2} strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Inset panel where columns of stars scroll upward forever.
 * Background: faint dot grid + blue glow + deep inset shadow. Anything passed as
 * children is centred on top (keep it short).
 *
 *   <StarLoop className="h-[28rem]"><p>Tagline</p></StarLoop>
 *
 * Each column holds its stars twice and slides up by exactly half its height,
 * so the loop has no visible seam.
 */
export function StarLoop({ children, className }: { children?: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.utils.toArray<HTMLElement>("[data-star-track]", root.current).forEach((track, i) => {
          gsap.to(track, {
            yPercent: -50,
            duration: COLUMNS[i].seconds,
            ease: "none",
            repeat: -1,
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={cn(
        "relative isolate overflow-hidden rounded-card border border-white/10",
        "bg-[radial-gradient(120%_90%_at_50%_0%,#0b3a41_0%,#00262c_55%,#001519_100%)]",
        "shadow-[inset_0_28px_60px_-12px_rgb(0_0_0/0.75),inset_0_-28px_60px_-12px_rgb(0_0_0/0.65),inset_0_0_0_1px_rgb(255_255_255/0.04)]",
        className,
      )}
    >
      {/* Dot grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(rgb(255_255_255/0.14)_1px,transparent_1.4px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_85%)]"
      />
      {/* Blue glow */}
      <div
        aria-hidden
        className="absolute -bottom-1/3 left-1/2 -z-10 size-[28rem] -translate-x-1/2 rounded-full bg-brand/25 blur-3xl"
      />

      {/* Star columns, faded at top and bottom */}
      <div
        aria-hidden
        className="absolute inset-0 flex justify-around px-4 [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_78%,transparent)]"
      >
        {COLUMNS.map((col, c) => (
          <div key={c} className="h-full w-1/4 overflow-hidden">
            <div data-star-track className="flex flex-col items-center gap-9">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex flex-col items-center gap-9">
                  {col.sizes.map((s, i) => (
                    <Star key={i} size={s} tone={col.tones[i]} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {children && (
        <div className="relative z-10 grid h-full place-items-center p-6 text-center [text-shadow:0_2px_24px_rgb(0_21_25/0.9)]">
          {children}
        </div>
      )}
    </div>
  );
}

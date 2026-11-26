"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ChevronRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Cta = { label: string; href: string };

type Props = {
  /** Last crumb, e.g. "About Us". "Home" is added automatically. */
  breadcrumb: string;
  eyebrow: string;
  /** One string per line; the last line is italic gold. */
  titleLines: readonly string[];
  lead: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  /** Right-hand visual (coins, image, graphic). Hidden above the copy on small screens. */
  visual?: ReactNode;
  id?: string;
};

/**
 * Dark hero used at the top of every inner page (About, Services, ...).
 * Breadcrumb + eyebrow + title + lead + CTAs on the left, a visual on the right.
 * Plays a short stagger on load. Pass the page's <h1> words via titleLines.
 */
export function PageHero({ breadcrumb, eyebrow, titleLines, lead, primaryCta, secondaryCta, visual, id = "page-title" }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
        tl.fromTo("[data-ph='item']", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 });
        tl.fromTo("[data-ph='visual']", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.4 }, 0.2);
      });
      mm.add(mq.reduced, () => {
        gsap.set("[data-ph]", { opacity: 1 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby={id} className="relative overflow-hidden bg-night text-white">
      {/* soft glow */}
      <div aria-hidden className="absolute -right-1/4 top-0 size-[46rem] rounded-full bg-brand/20 blur-3xl" />

      <div className="wrap-wide relative grid min-h-[92svh] items-center gap-12 pb-20 pt-[calc(var(--header-h)+3.5rem)] lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div className="flex flex-col items-start">
          <nav data-ph="item" aria-label="Breadcrumb" className="opacity-0">
            <ol className="flex items-center gap-1.5 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-4" />
              </li>
              <li aria-current="page" className="text-white">
                {breadcrumb}
              </li>
            </ol>
          </nav>

          <div data-ph="item" className="mt-8 opacity-0">
            <Eyebrow className="text-kra-light">{eyebrow}</Eyebrow>
          </div>

          <h1 id={id} className="mt-5 text-h1 font-medium">
            {titleLines.map((line, i) => (
              <span
                key={line}
                data-ph="item"
                className={cn("block opacity-0", i === titleLines.length - 1 && "italic text-kra-light")}
              >
                {line}
              </span>
            ))}
          </h1>

          <p data-ph="item" className="mt-6 max-w-xl text-lead text-white/75 opacity-0">
            {lead}
          </p>

          {(primaryCta || secondaryCta) && (
            <div data-ph="item" className="mt-9 flex flex-wrap gap-3 opacity-0">
              {primaryCta && (
                <Button href={primaryCta.href} size="lg" arrow>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="ghost-light" size="lg">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>

        {visual && (
          <div data-ph="visual" className="relative opacity-0">
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}

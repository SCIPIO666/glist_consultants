import Image from "next/image";
import { CircleBand } from "@/components/motion/CircleBand";
import { Circled } from "@/components/motion/Circled";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PixelCorner } from "@/components/ui/PixelCorner";
import { aboutBackground as copy } from "@/data/about";

/**
 * About, section 2: company background. White circles rise over the dark hero,
 * then text and a "who we work with" checklist on the left and a photo with an
 * eaten pixel corner on the right.
 */
export function AboutBackground() {
  return (
    <>
      <CircleBand colorClass="text-paper" className="bg-night" reveal />
      <section aria-labelledby="about-background" className="relative bg-paper text-ink">
        <div className="wrap-wide grid items-center gap-12 py-[clamp(4.5rem,10vw,9rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <Reveal y={20}>
              <Eyebrow className="text-brand">{copy.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal y={40} delay={0.1} className="mt-4">
              <h2 id="about-background" className="text-h2 font-medium">
                {copy.titleBefore}{" "}
                <Circled shape="squiggle" colorClass="text-kra-light">
                  {copy.titleMark}
                </Circled>
              </h2>
            </Reveal>

            <Reveal target="children" y={24} stagger={0.12} className="mt-6 max-w-xl space-y-4 text-lead text-ink-muted">
              {copy.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <Reveal y={24} className="mt-10">
              <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-ink">{copy.clientsHeading}</h3>
            </Reveal>
            <Reveal as="ul" target="children" y={20} stagger={0.08} className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {copy.clients.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gold/20 text-gold"
                  >
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5 9-10" />
                    </svg>
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </Reveal>

            <Reveal y={24} className="mt-10">
              <Button href={copy.cta.href} variant="outline-dark" arrow>
                {copy.cta.label}
              </Button>
            </Reveal>
          </div>

          <Reveal x={50} y={0} duration={1.2}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-night-card shadow-card">
              <Image
                src={copy.image.src}
                alt={copy.image.alt}
                fill
                sizes="(min-width: 1024px) 34rem, 92vw"
                quality={70}
                className="object-cover"
                style={{ objectPosition: copy.image.position }}
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-night-deep/70 via-transparent to-transparent" />
              <PixelCorner corner="tr" cells={6} colorClass="text-paper" />
              <p className="absolute inset-x-5 bottom-5 rounded-card border border-white/20 bg-night/60 px-5 py-4 font-display text-lg text-white backdrop-blur-md sm:inset-x-7 sm:bottom-7">
                <span className="mr-2 inline-block size-2 rounded-full bg-gold align-middle" />
                {copy.badge}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

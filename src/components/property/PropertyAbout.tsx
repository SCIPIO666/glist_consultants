import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { propertyAbout as about, propertyMission as mission } from "@/data/propertyManagement";

/** Sections 5 and 6: the about block (photo + text), then the mission statement over a photo. */
export function PropertyAbout() {
  return (
    <>
      <section aria-labelledby="pm-about-title" className="bg-paper py-[clamp(4rem,10svh,7rem)] text-ink">
        <div className="wrap-wide grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal x={-80} y={0} className="relative aspect-[4/3] overflow-hidden bg-night">
            <Image src={about.image} alt={about.imageAlt} fill sizes="(min-width: 1024px) 50vw, 92vw" quality={70} className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-night/40 to-transparent" />
          </Reveal>
          <Reveal x={80} y={0} delay={0.1}>
            <h2 id="pm-about-title" className="text-h2 font-medium">{about.title}</h2>
            <p className="mt-6 max-w-xl text-lead text-ink-muted">{about.text}</p>
            <Button href={about.cta.href} variant="outline-dark" size="lg" arrow className="mt-8">{about.cta.label}</Button>
          </Reveal>
        </div>
      </section>

      <section aria-label={mission.label} className="relative isolate overflow-hidden bg-night py-[clamp(5rem,14svh,10rem)] text-white">
        <Image src={mission.image} alt="" fill sizes="100vw" quality={60} className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-night/80" />
        <Reveal y={40} className="wrap-wide text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-kra-light">{mission.label}</p>
          <p className="mx-auto mt-6 max-w-[34ch] font-display text-[clamp(1.6rem,1rem+2.4vw,3rem)] leading-snug">{mission.text}</p>
        </Reveal>
      </section>
    </>
  );
}

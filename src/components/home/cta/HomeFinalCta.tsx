import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { finalCta as copy } from "@/data/finalCta";

/**
 * Last section of the home page, just above the pinned footer. Minimal on purpose:
 * a photo, one headline, one button that opens the contact form.
 */
export function HomeFinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-night text-white">
      <Image src={copy.bgImage} alt={copy.bgAlt} fill sizes="100vw" quality={70} className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-night-deep/75 via-night/70 to-night-deep/80" />

      <div className="wrap-wide flex min-h-[min(34rem,70svh)] flex-col items-center justify-center gap-9 py-[clamp(5rem,12svh,9rem)] text-center">
        <Reveal y={40}>
          <h2 id="final-cta-title" className="max-w-[20ch] text-[clamp(2.2rem,1.2rem+4.2vw,4.8rem)] font-medium leading-[1.05] tracking-[-0.025em]">
            {copy.title}
          </h2>
        </Reveal>
        <Reveal y={24} delay={0.15}>
          <Button href={copy.primary.href} size="lg" arrow>
            {copy.primary.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

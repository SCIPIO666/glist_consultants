import { Reveal } from "@/components/motion/Reveal";
import { ScrollArrow } from "@/components/motion/ScrollArrow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { introOpening } from "@/data/intro";

/** Intro screen 1: centred kicker, one huge word, a hand-drawn arrow leading down. */
export function IntroOpening() {
  return (
    <section
      aria-labelledby="intro-word"
      className="relative flex min-h-[82svh] flex-col items-center justify-center px-[var(--gutter)] pb-6 pt-28 text-center sm:min-h-svh sm:pb-16"
    >
      <Reveal y={24}>
        <Eyebrow className="text-gold">{introOpening.eyebrow}</Eyebrow>
      </Reveal>

      <Reveal y={70} delay={0.15} duration={1.3} className="mt-5">
        <h2
          id="intro-word"
          className="font-display text-[clamp(4.25rem,1rem+17vw,16rem)] font-medium leading-[0.95] tracking-[-0.035em]"
        >
          {introOpening.word}
          <span aria-hidden className="ml-[0.04em] inline-block size-[0.14em] rounded-full bg-gold" />
        </h2>
      </Reveal>

      <ScrollArrow variant="curl" className="mt-8 h-28 w-20 sm:mt-10 sm:h-40 sm:w-28" />
    </section>
  );
}

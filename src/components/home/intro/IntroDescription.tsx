import { ScrollReadText } from "@/components/motion/ScrollReadText";
import { introDescription } from "@/data/intro";

/** Intro screen 2: the official description. Words brighten as you read, key words get circled. */
export function IntroDescription() {
  return (
    <section
      aria-label="About Glist Consultants"
      className="relative flex min-h-svh items-center justify-center py-[20svh]"
    >
      <div className="wrap">
        <ScrollReadText
          text={introDescription}
          className="mx-auto max-w-[24ch] text-center font-display text-[clamp(1.75rem,0.9rem+2.9vw,3.6rem)] font-normal leading-[1.22] tracking-[-0.01em] sm:max-w-[34ch] lg:max-w-[40ch]"
        />
      </div>
    </section>
  );
}

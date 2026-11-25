import { ScrollReadText } from "@/components/motion/ScrollReadText";
import { propertyIntro as copy } from "@/data/propertyIntro";

/**
 * PROPERTY INTRO (section 2). Same treatment as the home page's description screen:
 * centred, full height, words brighten one after another as you scroll (reversible),
 * and the *starred* words get hand-drawn marks. Wording lives in data/propertyIntro.ts.
 */
export function PropertyIntro() {
  return (
    <section
      aria-label={copy.label}
      className="relative flex items-center justify-center bg-sand py-[12svh] text-ink sm:min-h-svh sm:py-[20svh]"
    >
      <div className="wrap">
        <ScrollReadText
          text={copy.text}
          className="mx-auto max-w-[24ch] text-center font-display text-[clamp(1.75rem,0.9rem+2.9vw,3.6rem)] font-normal leading-[1.22] tracking-[-0.01em] sm:max-w-[34ch] lg:max-w-[40ch]"
        />
      </div>
    </section>
  );
}

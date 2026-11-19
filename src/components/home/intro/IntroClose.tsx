import { Reveal } from "@/components/motion/Reveal";
import { CircleGridLoop } from "@/components/motion/CircleGridLoop";
import { Button } from "@/components/ui/Button";
import { introClose } from "@/data/intro";

/**
 * Intro screen 4 (the last): big title, a paragraph on the right and the
 * looping 8-circle grid on the left. No eyebrow, by design.
 */
export function IntroClose() {
  return (
    <section aria-labelledby="intro-close" className="relative bg-sand text-ink">
      <div className="wrap-wide flex min-h-svh flex-col justify-center gap-12 py-[clamp(5rem,12svh,8rem)]">
        <Reveal>
          <h2 id="intro-close" className="max-w-[16ch] text-display font-medium">
            {introClose.title}
          </h2>
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal x={-30} y={0} className="max-w-[30rem]">
            <CircleGridLoop circleClass="bg-gold" />
          </Reveal>

          <Reveal target="children" stagger={0.15} className="max-w-xl space-y-6">
            {introClose.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-lead" : "text-lead font-semibold"}>
                {p}
              </p>
            ))}
            <div>
              <Button href={introClose.cta.href} variant="outline-dark" arrow>
                {introClose.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

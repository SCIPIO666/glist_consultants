/**
 * TEMPORARY test bench for Milestone 3. Visit /motion-lab.
 * Delete this folder once the Home page is built.
 */
import { Circled } from "@/components/motion/Circled";
import { CircleBand } from "@/components/motion/CircleBand";
import { CircleGridLoop } from "@/components/motion/CircleGridLoop";
import { Marquee } from "@/components/motion/Marquee";
import { ProgressRail } from "@/components/motion/ProgressRail";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollArrow } from "@/components/motion/ScrollArrow";
import { ScrollReadText } from "@/components/motion/ScrollReadText";
import { Eyebrow } from "@/components/ui/Eyebrow";

const dot = <span className="mx-8 inline-block size-3 rounded-full bg-gold" />;

export default function MotionLab() {
  return (
    <main className="bg-night text-white">
      <section className="wrap flex min-h-svh flex-col justify-center pt-32">
        <Reveal>
          <Eyebrow className="text-gold">Motion lab</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 text-display">
            Numbers that <Circled>make sense</Circled>
          </h1>
        </Reveal>
        <Reveal delay={0.2} className="mt-8 max-w-xl text-lead text-white/70">
          Scroll down. Everything below draws, reveals or loops, and reverses when you scroll back up.
        </Reveal>
      </section>

      <div className="relative">
        <ProgressRail />

        <section className="wrap flex min-h-svh flex-col items-center justify-center text-center">
          <Reveal target="children" as="div" className="max-w-4xl">
            <Eyebrow className="mx-auto text-gold">Intro</Eyebrow>
            <h2 className="mt-6 text-h1">Your finances, in capable hands.</h2>
          </Reveal>
          <ScrollArrow className="mt-10 h-44 w-32" />
        </section>

        <section className="wrap flex min-h-svh items-center justify-center">
          <ScrollReadText
            as="p"
            className="max-w-4xl text-center font-display text-h2"
            text="Glist Consultants is a business, financial and property consultancy that *empowers* individuals and companies to stay compliant, keep clean books and *grow with confidence*."
          />
        </section>

        <section className="wrap grid min-h-svh items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-h1">
              Underlines <Circled shape="underline">too</Circled> and <Circled shape="squiggle">squiggles</Circled>.
            </h2>
          </div>
          <CircleGridLoop className="max-w-md" />
        </section>
      </div>

      <CircleBand colorClass="text-night-card" reveal />
      <section className="grid min-h-[70svh] place-items-center bg-night-card">
        <p className="font-display text-h2">Next section starts here</p>
      </section>

      <div className="space-y-6 bg-night-deep py-16">
        <Marquee speed={90} direction="left" className="font-display text-h1 text-white/90">
          <span className="whitespace-nowrap">Tax compliance{dot}Payroll{dot}Bookkeeping{dot}Registrations{dot}</span>
        </Marquee>
        <Marquee speed={90} direction="right" className="font-display text-h1 italic text-gold">
          <span className="whitespace-nowrap">Guiding success{dot}Illuminating paths{dot}</span>
        </Marquee>
      </div>
      <div className="h-[60svh] bg-night-deep" />
    </main>
  );
}

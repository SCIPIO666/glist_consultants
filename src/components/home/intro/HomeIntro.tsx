import { CircleBand } from "@/components/motion/CircleBand";
import { ProgressRail } from "@/components/motion/ProgressRail";
import { IntroOpening } from "./IntroOpening";
import { IntroDescription } from "./IntroDescription";
import { IntroGraph } from "./IntroGraph";
import { IntroClose } from "./IntroClose";

/**
 * Home intro: four screens with a thin progress rail on the left.
 *   1 opening word -> 2 description -> 3 graph -> 4 closing screen
 *
 * The rail needs a `relative` parent and no `overflow-hidden` anywhere above it.
 */
export function HomeIntro() {
  return (
    <>
      {/* Night circles rise over the hero ticker, then the intro begins */}
      <CircleBand colorClass="text-night" reveal />

      <div className="relative bg-night text-white">
        <ProgressRail />
        <IntroOpening />
        <IntroDescription />
        <IntroGraph />

        {/* Sand circles rise over the dark graph into the light closing screen */}
        <CircleBand colorClass="text-sand" className="bg-night" reveal />
        <IntroClose />
      </div>
    </>
  );
}

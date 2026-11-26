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

      <div className="relative bg-night bg-[radial-gradient(50rem_40rem_at_100%_0%,rgb(228_32_43/0.16),transparent_65%),radial-gradient(45rem_35rem_at_0%_100%,rgb(228_32_43/0.10),transparent_65%)] text-white">
        <ProgressRail />
        <IntroOpening />
        <IntroDescription />
        <IntroGraph />

        {/* Sand circles rise over the dark graph into the light closing screen */}
        <IntroClose />
      </div>
    </>
  );
}

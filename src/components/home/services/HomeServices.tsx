import { CircleBand } from "@/components/motion/CircleBand";
import { ServicesStack } from "./ServicesStack";

/** Home services intro: a band of night circles rising over the sand intro, then the stack. */
export function HomeServices() {
  return (
    <>
      <CircleBand colorClass="text-night" className="bg-sand" reveal />
      <ServicesStack />
    </>
  );
}

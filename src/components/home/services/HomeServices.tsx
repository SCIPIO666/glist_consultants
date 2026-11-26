import { CircleBand } from "@/components/motion/CircleBand";
import { ServicesWheel } from "./ServicesWheel";

/** Home services: three rows of night circles rising over the sand intro, then the wheel. */
export function HomeServices() {
  return (
    <>
      {/* <CircleBand rows={3} colorClass="text-night" className="bg-sand" reveal /> */}
      <ServicesWheel />
    </>
  );
}

import { CircleBand } from "@/components/motion/CircleBand";
import { WhyReasons } from "./WhyReasons";
import { WhyStats } from "./WhyStats";

/**
 * Home "why choose us" block. Built in three milestones:
 *   M7 numbered reasons  ->  M8 stats + star loop (this)  ->  M9 reviews stack
 */
export function HomeWhyUs() {
  return (
    <>
      {/* Mist circles rise over the dark services stack into the light reasons screen */}
      <CircleBand colorClass="text-mist" className="bg-night" reveal />
      <WhyReasons />

      {/* Night circles rise over the mist reasons screen into the dark stats screen */}
      <CircleBand colorClass="text-night" className="bg-mist" reveal />
      <WhyStats />
    </>
  );
}

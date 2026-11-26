import { WhyReasons } from "./WhyReasons";
import { WhyStats } from "./WhyStats";
import { WhyReviews } from "./WhyReviews";
import { getReviews } from "@/lib/content";

/**
 * Home "why choose us" block. Built in three milestones:
 *   M7 numbered reasons  ->  M8 stats + star loop  ->  M9 reviews stack (this)
 */
export async function HomeWhyUs() {
  const reviews = await getReviews();
  return (
    <>
      {/* Mist circles rise over the dark services stack into the light reasons screen */}
      <WhyReasons />

      {/* Night circles rise over the mist reasons screen into the dark stats screen */}
      <WhyStats />

      {/* Sand circles rise over the dark stats screen into the light reviews stack */}
      <WhyReviews items={reviews} />
    </>
  );
}

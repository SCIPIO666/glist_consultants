import { HeroAlt1 } from "./HeroAlt1";
import { HeroAlt2 } from "./HeroAlt2";

/**
 * Home hero. "alt1" is the default (semicircle + coin loop).
 * "alt2" (big circle + satellites) is kept for comparison; see /hero-alt2.
 * Once the client picks, delete the one you do not need.
 */
export function HomeHero({ variant = "alt1" }: { variant?: "alt1" | "alt2" }) {
  return variant === "alt2" ? <HeroAlt2 /> : <HeroAlt1 />;
}

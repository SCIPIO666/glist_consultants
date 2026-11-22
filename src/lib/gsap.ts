"use client";

/**
 * Single place GSAP is imported and its plugins registered.
 * Always import from here, never from "gsap" directly:
 *
 *   import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, SplitText, MotionPathPlugin);

// Phones: the URL bar showing/hiding resizes the viewport mid-scroll. Without this,
// every pinned/scrubbed scene recalculates on each resize and the page stutters.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Shared easing + duration so every section feels like the same site. */
export const motion = {
  ease: "expo.out",
  easeInOut: "power3.inOut",
  fast: 0.5,
  base: 0.9,
  slow: 1.4,
} as const;

/** Media queries for gsap.matchMedia(); wrap animations so reduced-motion users get none. */
export const mq = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  /** Pinned scroll scenes: motion allowed AND tall enough. Keep in sync with the `flat` variant in globals.css. */
  pin: "(prefers-reduced-motion: no-preference) and (min-height: 560px)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
} as const;

export { gsap, ScrollTrigger, DrawSVGPlugin, SplitText, MotionPathPlugin, useGSAP };

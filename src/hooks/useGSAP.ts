"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to use GSAP with proper cleanup.
 * Returns a ref to attach to the container element.
 */
export function useGSAP() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {}, containerRef);
    return () => ctx.revert();
  }, []);

  return { containerRef, gsap, ScrollTrigger };
}

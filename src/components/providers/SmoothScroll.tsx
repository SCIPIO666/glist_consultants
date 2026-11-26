"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollApi = {
  /** Freeze page scroll (e.g. while the full-screen menu is open). */
  stop: () => void;
  start: () => void;
  /** Smooth-scroll to a selector, element or pixel offset. */
  scrollTo: (target: string | HTMLElement | number, offset?: number, options?: { immediate?: boolean }) => void;
};

const noop = () => {};
const ScrollContext = createContext<ScrollApi>({
  stop: noop,
  start: noop,
  scrollTo: noop,
});

export const useSmoothScroll = () => useContext(ScrollContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Users who ask for reduced motion keep native scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: false, // GSAP's ticker drives Lenis, so both stay in lockstep
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New page = start at the top.
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);
  const scrollTo = useCallback<ScrollApi["scrollTo"]>((target, offset = 0, options) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, immediate: options?.immediate });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target + offset });
    } else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      el?.scrollIntoView();
    }
  }, []);

  const api = useMemo(() => ({ stop, start, scrollTo }), [stop, start, scrollTo]);

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>;
}

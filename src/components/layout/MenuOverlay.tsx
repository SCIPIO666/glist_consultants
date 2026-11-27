"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ChevronRight, Close, WhatsApp } from "@/components/ui/icons";
import { Logo } from "./Logo";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { gsap, useGSAP } from "@/lib/gsap";
import { nav, site, whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Full-screen menu. Expands as a circle from the top-right (where the menu
 * button sits), links stagger in. Locks page scroll while open.
 */
export function MenuOverlay({
  open,
  onClose,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusTo: RefObject<HTMLButtonElement | null>;
}) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { stop, start } = useSmoothScroll();

  // Build the timeline once, paused.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motionOk: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };
          const d = reduced ? 0.01 : 1;
          const t = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
          t.set(root.current, { visibility: "visible" }, 0)
            .fromTo(
              root.current,
              { clipPath: "circle(0px at calc(100% - var(--gutter) - 1.375rem) 2.5rem)" },
              { clipPath: "circle(150vmax at calc(100% - var(--gutter) - 1.375rem) 2.5rem)", duration: 1.1 * d, ease: "power3.inOut" },
              0,
            )
            .from("[data-menu-logo]", { y: -40, opacity: 0, duration: 0.8 * d }, 0.45)
            .from("[data-menu-row]", { y: 50, opacity: 0, duration: 0.9 * d, stagger: 0.07 }, 0.45)
            .from("[data-menu-line]", { scaleX: 0, transformOrigin: "left", duration: 0.9 * d, stagger: 0.07 }, 0.45)
            .from("[data-menu-foot]", { y: 24, opacity: 0, duration: 0.7 * d, stagger: 0.08 }, 0.8)
            .eventCallback("onReverseComplete", () => {
              gsap.set(root.current, { visibility: "hidden" });
            });
          tl.current = t;
        },
      );
      return () => mm.revert();
    },
    { scope: root },
  );

  // Open / close
  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      stop();
      t.timeScale(1).play();
      closeBtn.current?.focus({ preventScroll: true });
    } else {
      start();
      t.timeScale(1.4).reverse();
    }
  }, [open, stop, start]);

  // Close on route change, Escape; restore focus
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        returnFocusTo.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, returnFocusTo]);

  return (
    <div
      ref={root}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
      data-lenis-prevent
      className="invisible fixed inset-0 z-[60] overflow-y-auto bg-night text-white"
    >
      {/* Chevron pattern, echoes the logo tick */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(135deg, transparent 49%, #fff 49%, #fff 51%, transparent 51%), linear-gradient(45deg, transparent 49%, #fff 49%, #fff 51%, transparent 51%)",
          backgroundSize: "120px 120px",
        }}
      />
      <div className="relative mx-auto flex min-h-full max-w-5xl flex-col px-[var(--gutter)] pb-10 pt-6">
        <div className="flex items-start justify-between">
          <span className="invisible hidden w-14 sm:block" />
          <div data-menu-logo className="mx-auto w-24 sm:w-28">
            <Logo variant="full" sizes="112px" className="h-auto w-full" />
          </div>
          <button
            ref={closeBtn}
            type="button"
            onClick={() => {
              onClose();
              returnFocusTo.current?.focus({ preventScroll: true });
            }}
            aria-label="Close menu"
            className="grid size-14 shrink-0 place-items-center rounded-full bg-white/10 text-2xl text-white transition-[background-color,transform] duration-300 hover:bg-kra-light hover:text-night-deep hover:rotate-90"
          >
            <Close />
          </button>
        </div>

        <nav aria-label="Primary" className="mt-6 flex-1">
          <ul>
            <li data-menu-line className="h-px bg-white/25" />
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-menu-row
                    aria-current={active ? "page" : undefined}
                    className="group flex items-center justify-between py-3 font-display text-[clamp(1.625rem,1.1rem+2vw,2.75rem)] leading-tight transition-colors hover:text-kra-light sm:py-4"
                  >
                    <span className={cn("transition-transform duration-500 ease-out-expo group-hover:translate-x-3", active && "text-kra-light")}>
                      {item.label}
                    </span>
                    <ChevronRight className="text-xl text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-kra-light" />
                  </Link>
                  <div data-menu-line className="h-px bg-white/25" />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col items-center gap-5">
          <div data-menu-foot className="flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="cta" size="lg" arrow>
              Book a consultation
            </Button>
            <Button href={whatsappUrl()} variant="whatsapp" size="lg" icon={<WhatsApp className="text-xl" />}>
              WhatsApp us
            </Button>
          </div>
          <p data-menu-foot className="text-sm text-white/70">
            <a href={`tel:${site.phone.tel}`} className="hover:text-kra-light">{site.phone.display}</a>
            <span className="mx-3 text-white/30">|</span>
            <a href={`mailto:${site.email}`} className="hover:text-kra-light">{site.email}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

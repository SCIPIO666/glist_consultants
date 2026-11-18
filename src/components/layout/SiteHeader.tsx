"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MenuOverlay } from "./MenuOverlay";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Fixed header:
 *  - hanging logo tab on the left (stays put, shrinks a little after scrolling)
 *  - bar behind it fades to dark teal once you scroll
 *  - right: CTA + circular menu button
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 40,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });
    // If the page loads already scrolled, ScrollTrigger fires onToggle once on refresh.
    return () => st.kill();
  });

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Bar */}
        <div
          className={cn(
            "transition-[background-color,backdrop-filter,box-shadow] duration-500",
            scrolled ? "bg-night/85 shadow-lift backdrop-blur-md" : "bg-transparent",
          )}
        >
          <div className="wrap-wide flex h-[var(--header-h)] items-center justify-end gap-3">
            <div className="hidden sm:block">
              <Button href="/contact" variant="cta" arrow>
                Book a consultation
              </Button>
            </div>

            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-menu"
              className="group relative grid size-14 place-items-center rounded-full bg-gold text-night-deep transition-transform duration-300 ease-out-expo hover:scale-105 active:scale-95"
            >
              <span className="relative block h-3 w-6">
                <span className="absolute inset-x-0 top-0 h-0.5 rounded bg-current transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-current transition-transform duration-300 group-hover:-translate-x-1" />
              </span>
            </button>
          </div>
        </div>

        {/* Hanging logo tab, positioned over the bar's left gutter */}
        <div className="pointer-events-none absolute inset-x-0 top-0">
          <div className="wrap-wide">
            <Link
              href="/"
              aria-label="Glist Consultants, home"
              className={cn(
                "pointer-events-auto relative block origin-top rounded-b-2xl bg-night-deep px-3 pb-3 pt-4",
                "border-x border-b border-gold/40 shadow-lift transition-[width,padding] duration-500 ease-out-expo",
                scrolled ? "w-24 sm:w-28" : "w-28 sm:w-36 lg:w-40",
              )}
            >
              <Logo priority sizes="160px" className="h-auto w-full" />
              <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
            </Link>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} returnFocusTo={menuBtn} />
    </>
  );
}

"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LogoLockup } from "./Logo";
import { NavIcon } from "./NavIcons";
import { MenuOverlay } from "./MenuOverlay";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Fixed top bar, conventional layout:
 *  - left: compact logo (GC mark + name)
 *  - centre/right (from 1100px): the page links with icon + text, one line each, never wrapping.
 *    1100-1279px uses a slightly tighter size so it also fits a laptop at 110-125% browser zoom.
 *  - right: the circular menu button (always available). "Book a consultation" shows only below 1100px, where the
 *    links give way to the menu and there is room. On desktop that space belongs to the links
 *    ("Contact Us" is one of them, and the footer and every page carry their own enquiry buttons).
 * The bar is solid dark teal at all times and gets a little translucent once you scroll.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 40,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => st.kill();
  });

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  // "Home" is the logo's job in the bar; the menu overlay still lists it.
  const links = nav; // Home is listed too, so wide screens get a Home link

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "transition-[background-color,backdrop-filter,box-shadow] duration-500",
            scrolled ? "bg-night/95 shadow-lift md:bg-night/90 md:backdrop-blur-md" : "bg-night",
          )}
        >
          <div className="wrap-wide flex h-[var(--header-h)] items-center justify-between gap-6">
            <Link href="/" aria-label="Glist Consultants, home" className="shrink-0">
              <LogoLockup priority />
            </Link>

            <nav aria-label="Main" className="ml-auto hidden min-[1100px]:block">
              <ul className="flex items-center gap-4 xl:gap-6 min-[1440px]:gap-8">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isCurrent(l.href) ? "page" : undefined}
                      className={cn(
                        "group relative inline-flex items-center gap-1.5 whitespace-nowrap py-2 text-[0.8rem] font-semibold xl:gap-2 xl:text-sm text-white/85 transition-colors hover:text-white",
                        isCurrent(l.href) && "text-white",
                      )}
                    >
                      <NavIcon href={l.href} className={cn("shrink-0 text-base transition-colors xl:text-[1.05rem] duration-300 group-hover:text-gold", isCurrent(l.href) ? "text-gold" : "text-white/60")} />
                      {l.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-gold transition-transform duration-300 ease-out-expo",
                          isCurrent(l.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-3 max-[1099px]:ml-auto">
              <div className="hidden sm:block min-[1100px]:hidden">
                <Button href="/contact" variant="cta" size="md" arrow className="whitespace-nowrap">
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
                className="group relative grid size-11 place-items-center rounded-full bg-gold text-night-deep transition-transform duration-300 ease-out-expo hover:scale-105 active:scale-95"
              >
                <span className="relative block h-2.5 w-5">
                  <span className="absolute inset-x-0 top-0 h-0.5 rounded bg-current transition-transform duration-300 group-hover:translate-x-0.5" />
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-current transition-transform duration-300 group-hover:-translate-x-0.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} returnFocusTo={menuBtn} />
    </>
  );
}

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

/**
 * Wraps every page. The opaque z-10 layer is what slides up to reveal the
 * pinned footer, so page content must sit inside it.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-pill focus:bg-gold focus:px-5 focus:py-3 focus:font-semibold focus:text-night-deep"
      >
        Skip to content
      </a>
      <SiteHeader />
      <div id="main" className="relative z-10 bg-paper">
        {children}
      </div>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}

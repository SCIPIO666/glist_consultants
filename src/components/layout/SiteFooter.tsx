import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, WhatsApp } from "@/components/ui/icons";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { services } from "@/data/services";
import { nav, site, whatsappUrl } from "@/lib/site";

/**
 * "Awards style" reveal footer.
 * On large, tall screens the footer is pinned behind the page (position: fixed
 * inside a clipped wrapper) so scrolling to the bottom slides the page up to
 * uncover it. On small or short screens it is a normal footer so nothing is
 * ever cut off.
 */
export function SiteFooter() {
  return (
    <footer
      className="relative bg-night-deep text-white reveal:h-svh reveal:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
      aria-label="Site footer"
    >
      <div className="relative flex min-h-full flex-col overflow-hidden reveal:fixed reveal:bottom-0 reveal:left-0 reveal:h-svh reveal:w-full">
        {/* Background photo under a heavy teal wash */}
        <Image
          src="/footer/footer.webp"
          alt=""
          fill
          sizes="100vw"
          quality={55}
          className="object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-b from-night-deep/90 via-night-deep/85 to-night-deep" />

        <div className="wrap-wide relative flex flex-1 flex-col justify-between gap-10 pb-24 sm:pb-5 pt-28 sm:pt-32 reveal:gap-6 reveal:pt-[9.5rem]">
          {/* Top: statement + CTAs */}
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-kra-light">Let&apos;s talk</p>
              <h2 className="mt-4 text-h2">
                Let us handle the numbers.
                <span className="block w-fit pr-[0.12em] font-display italic bg-linear-to-r from-kra-light via-kra to-[#ff8a5c] bg-clip-text text-transparent">You focus on growth.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start xl:flex-row">
              <Button href="/contact" size="lg" arrow>Book a consultation</Button>
              <Button href={whatsappUrl()} variant="whatsapp" size="lg" icon={<WhatsApp className="text-xl" />}>
                WhatsApp us
              </Button>
            </div>
          </div>

          {/* Middle: link columns */}
          <div className="grid gap-10 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.3fr_1.2fr]">
            <div className="max-w-xs">
              <Logo variant="full" sizes="96px" className="h-auto w-20" />
              <p className="mt-3 text-sm text-white/70">{site.tagline}</p>
              <SocialLinks className="mt-5" />
            </div>

            <FooterCol title="Explore">
              {nav.map((n) => (
                <li key={n.href}>
                  <FooterLink href={n.href}>{n.label}</FooterLink>
                </li>
              ))}
            </FooterCol>

            <FooterCol title="Services">
              {services.map((s) => (
                <li key={s.slug}>
                  <FooterLink href={`/services#${s.slug}`}>{s.title}</FooterLink>
                </li>
              ))}
            </FooterCol>

            <FooterCol title="Get in touch">
              <li>
                <a href={`tel:${site.phone.tel}`} className="inline-flex items-center gap-2.5 text-white/80 transition-colors hover:text-gold">
                  <Phone className="text-gold" /> {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 break-all text-white/80 transition-colors hover:text-gold">
                  <Mail className="shrink-0 text-gold" /> {site.email}
                </a>
              </li>
            </FooterCol>
          </div>

          {/* Bottom: giant outlined wordmark + legal */}
          <div>
            <p
              aria-hidden
              className="select-none text-center font-display font-semibold leading-[0.75] tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.28)] text-[clamp(3.5rem,11vw,10rem)]"
            >
              GLIST
            </p>
            <div className="mt-5 flex flex-col items-center justify-between gap-2 text-xs text-white/60 sm:flex-row">
              <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
              {/* Plain <a>, not <Link>: it should not preload the whole editing app for every visitor */}
              <a href="/studio" rel="nofollow" className="transition-colors hover:text-gold">Editor login</a>
              <p>Website by <span className="text-white/80">Zama Systems</span></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-kra-light">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white/80 transition-colors hover:text-gold">
      {children}
    </Link>
  );
}

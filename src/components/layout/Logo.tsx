import Image from "next/image";
import { site } from "@/lib/site";

/** Full logo (GC mark + wordmark). Transparent PNG, built for dark backgrounds. */
export function Logo({ variant = "full", className, priority = false, sizes }: { variant?: "full" | "mark"; className?: string; priority?: boolean; sizes?: string }) {
  const full = variant === "full";
  return (
    <Image
      src={full ? "/logo/logo-full.png" : "/logo/logo-mark.png"}
      alt={`${site.name} logo`}
      width={full ? 610 : 512}
      height={full ? 549 : 361}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}

/**
 * Compact horizontal logo for the top bar: the GC mark plus the name set in type.
 * Short enough to sit inside a normal header (about 2.5rem tall).
 */
export function LogoLockup({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src="/logo/logo-mark.png"
        alt=""
        width={512}
        height={361}
        priority={priority}
        sizes="64px"
        className="h-9 w-auto sm:h-10"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-[-0.01em] text-white sm:text-[1.4rem]">Glist</span>
        <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-gold sm:text-[0.65rem]">Consultants</span>
      </span>
    </span>
  );
}

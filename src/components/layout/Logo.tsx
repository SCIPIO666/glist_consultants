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

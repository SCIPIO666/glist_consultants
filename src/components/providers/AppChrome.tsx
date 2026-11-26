"use client";

import { usePathname } from "next/navigation";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SiteShell } from "@/components/layout/SiteShell";

/** Site pages get smooth scroll + header/footer. The Sanity Studio (/studio) gets neither. */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return <>{children}</>;
  return (
    <SmoothScroll>
      <SiteShell>{children}</SiteShell>
    </SmoothScroll>
  );
}

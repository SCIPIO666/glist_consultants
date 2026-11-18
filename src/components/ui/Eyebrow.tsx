import { cn } from "@/lib/cn";

/** The small gold-dot kicker above headings. Pass a colour class: text-gold on dark, text-brand on light. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

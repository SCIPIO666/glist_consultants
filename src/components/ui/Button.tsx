import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight } from "./icons";

type Variant = "cta" | "whatsapp" | "outline-light" | "outline-dark" | "ghost-light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  cta: "bg-cta text-white hover:bg-cta-hover",
  whatsapp: "bg-whatsapp text-night-deep hover:brightness-95",
  "outline-light": "border border-brand-soft text-brand-soft hover:bg-brand-soft hover:text-night-deep",
  "outline-dark": "border border-ink text-ink hover:bg-ink hover:text-white",
  "ghost-light": "border border-white/30 text-white hover:bg-white hover:text-night-deep",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

type Own = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type AsLink = Own & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Own & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

/**
 * <Button href="/contact">Book a consultation</Button>   (renders a Link / <a>)
 * <Button onClick={...} variant="outline-dark">...</Button> (renders a <button>)
 * External + tel: + mailto: links get a plain <a>.
 */
export function Button(props: AsLink | AsButton) {
  const { variant = "cta", size = "md", arrow = false, icon, className, children, ...rest } = props;
  const cls = cn(
    "group inline-flex items-center justify-center gap-2.5 rounded-pill font-semibold whitespace-nowrap",
    "transition-[background-color,color,filter,transform] duration-300 ease-out-expo active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  );
  const inner = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as Omit<AsLink, keyof Own>;
    const external = /^(https?:|tel:|mailto:)/.test(href);
    if (external) {
      return (
        <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...linkRest}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as Omit<AsButton, keyof Own>)}>
      {inner}
    </button>
  );
}

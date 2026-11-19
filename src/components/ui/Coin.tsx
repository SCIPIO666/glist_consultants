import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  /** Size comes from here, e.g. "w-64". Height follows from `shape`. */
  className?: string;
  /** "ellipse" = a coin lying flat, seen at an angle. "circle" = facing you. */
  shape?: "ellipse" | "circle";
  /** Thickness of the coin's edge in px. */
  depth?: number;
  /** CSS object-position for the photo, e.g. "50% 20%" to keep a face in frame. */
  position?: string;
  sizes?: string;
  priority?: boolean;
};

/** Mix two #rrggbb colours. t = 0 gives a, t = 1 gives b. */
function mix(a: string, b: string, t: number) {
  const p = (h: string, i: number) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  const c = (i: number) => Math.round(p(a, i) + (p(b, i) - p(a, i)) * t);
  return `rgb(${c(0)} ${c(1)} ${c(2)})`;
}

/**
 * A photo cut into a coin with real-looking thickness.
 * The edge is a stack of 1px offset shadows (light gold on top, dark at the bottom);
 * the union of those offset copies is exactly the silhouette of a thick disc.
 * Pure CSS, no extra images.
 */
export function Coin({ src, alt, className, shape = "ellipse", depth = 14, position = "50% 50%", sizes, priority }: Props) {
  const layers = Array.from({ length: depth }, (_, i) => `0 ${i + 1}px 0 ${mix("#e9c25a", "#7a5a0c", (i + 1) / depth)}`);
  const edge = [...layers, `0 ${depth + 26}px 34px -10px rgb(0 21 25 / 0.45)`].join(", ");

  return (
    <div className={cn("group/coin relative", className)} style={{ paddingBottom: depth }}>
      <div className={cn("relative w-full", shape === "ellipse" ? "aspect-[1.6/1]" : "aspect-square")}>
        {/* Edge */}
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: edge }} />
        {/* Face */}
        <div className="absolute inset-0 overflow-hidden rounded-full bg-night-card">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? "(min-width: 1024px) 26rem, 60vw"}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out-expo group-hover/coin:scale-110"
            style={{ objectPosition: position }}
          />
          {/* Rim light + soft shading so the face reads as raised metal */}
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "inset 0 0 0 4px rgb(241 210 122 / 0.95), inset 0 0 0 5px rgb(122 90 12 / 0.55), inset 0 -18px 28px rgb(0 21 25 / 0.28), inset 0 10px 18px rgb(255 255 255 / 0.12)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

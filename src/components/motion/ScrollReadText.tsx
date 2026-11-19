"use client";

import { Fragment, useRef, type ElementType } from "react";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { Circled } from "./Circled";

type Props = {
  /** Plain text. Wrap keywords in *asterisks* to have them hand-circled: "We *guide* you." */
  text: string;
  as?: ElementType;
  className?: string;
  /** Lowest opacity of unread words. */
  dim?: number;
  circleShape?: "circle" | "underline" | "squiggle";
  circleColorClass?: string;
};

/**
 * Words brighten one after another as you scroll ("reading" reveal),
 * then the *starred* words get hand-drawn marks. Fully reversible.
 */
export function ScrollReadText({
  text,
  as: Tag = "p",
  className,
  dim = 0.18,
  circleShape = "circle",
  circleColorClass = "text-gold",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const Component = Tag as ElementType;

  // Split into words; "*a phrase*" stays one marked token. `space` = whitespace follows in the source,
  // so punctuation right after a marked phrase ("*growth*.") stays attached.
  const tokens: { w: string; mark: boolean; space: boolean }[] = [];
  const parts = text.split(/(\*[^*]+\*)/).filter(Boolean);
  parts.forEach((part, pi) => {
    const mark = part.startsWith("*") && part.endsWith("*");
    if (mark) {
      const next = parts[pi + 1];
      tokens.push({ w: part.slice(1, -1), mark: true, space: next ? /^\s/.test(next) : true });
      return;
    }
    const words = part.split(/\s+/).filter(Boolean);
    words.forEach((w, wi) =>
      tokens.push({ w, mark: false, space: wi < words.length - 1 || /\s$/.test(part) || pi === parts.length - 1 }),
    );
  });

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>("[data-word]", ref.current);
      const mm = gsap.matchMedia();
      mm.add(mq.motionOk, () => {
        gsap.fromTo(
          words,
          { opacity: dim },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 50%", scrub: true },
          },
        );
      });
      mm.add(mq.reduced, () => {
        gsap.set(words, { opacity: 1 });
      });
    },
    { scope: ref, dependencies: [text, dim] },
  );

  return (
    <Component ref={ref} className={className}>
      {tokens.map((t, i) => (
        <Fragment key={i}>
          <span data-word className="inline-block opacity-[0.18]">
            {t.mark ? (
              <Circled shape={circleShape} colorClass={circleColorClass} delay={0.15}>
                {t.w}
              </Circled>
            ) : (
              t.w
            )}
          </span>
          {t.space ? " " : null}
        </Fragment>
      ))}
    </Component>
  );
}

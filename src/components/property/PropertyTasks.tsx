import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { propertyTasks as copy } from "@/data/propertyManagement";

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
/** One small line icon per task, in the same order as the data. */
const icons = [
  <g key="a" {...P}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M17 11l1.8 1.8L22 9.5" /></g>,
  <g key="b" {...P}><rect x="3" y="6" width="18" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /></g>,
  <g key="c" {...P}><path d="M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h5" /></g>,
  <g key="d" {...P}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></g>,
  <g key="e" {...P}><path d="M14.5 6.5a4 4 0 0 0 4.9 4.9L10 20.8a2.1 2.1 0 0 1-3-3Z" /><path d="m14.5 6.5 3-3" /></g>,
  <g key="f" {...P}><path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15zM10 21h4" /></g>,
  <g key="g" {...P}><path d="M2 12l5-3 5 2 5-2 5 3-5 5-5-1-5 1zM12 11v5" /></g>,
  <g key="h" {...P}><path d="M4 19V9M10 19V5M16 19v-7M22 19H2" /></g>,
];

/** Section 8: the eight rental tasks as cards (icon, title, one line). */
export function PropertyTasks() {
  return (
    <section aria-labelledby="pm-tasks-title" className="relative isolate overflow-hidden bg-night py-[clamp(4rem,10svh,7rem)] text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_90%_10%,rgba(31,111,214,0.35),transparent_60%),linear-gradient(160deg,#0B3A41,#002025_55%,#001519)]" />
      <div className="wrap-wide">
        <Reveal y={40}>
          <h2 id="pm-tasks-title" className="mx-auto max-w-[22ch] text-center text-h2 font-medium">{copy.title}</h2>
        </Reveal>
        <Reveal target="children" stagger={0.08} y={50} as="ul" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((it, i) => (
            <li key={it.title} className="group border border-white/10 bg-night-card/70 p-6 transition-[translate,border-color,background-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-kra-light/50 hover:bg-night-card">
              <svg viewBox="0 0 24 24" aria-hidden className="size-9 text-kra-light transition-transform duration-500 ease-out-expo group-hover:scale-110">{icons[i]}</svg>
              <h3 className="mt-5 text-lg font-semibold leading-snug">{it.title}</h3>
              <p className="mt-2 text-sm text-white/70">{it.text}</p>
            </li>
          ))}
        </Reveal>
        <Reveal y={20} className="mt-10 flex justify-center">
          <Button href={copy.cta.href} variant="ghost-light" size="lg" arrow>{copy.cta.label}</Button>
        </Reveal>
      </div>
    </section>
  );
}

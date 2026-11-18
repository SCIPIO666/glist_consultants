/**
 * TEMPORARY style-check page for Milestone 1.
 * It gets replaced by the real Home page in Milestone 5.
 */
import { MotionCheck } from "@/components/dev/MotionCheck";
import { site } from "@/lib/site";

const swatches = [
  { name: "night", cls: "bg-night text-white", hex: "#002025" },
  { name: "night-card", cls: "bg-night-card text-white", hex: "#0B3A41" },
  { name: "night-deep", cls: "bg-night-deep text-white", hex: "#001519" },
  { name: "brand", cls: "bg-brand text-white", hex: "#1F6FD6" },
  { name: "brand-soft", cls: "bg-brand-soft text-night-deep", hex: "#4A90E2" },
  { name: "gold", cls: "bg-gold text-night-deep", hex: "#D9A62E" },
  { name: "cta", cls: "bg-cta text-white", hex: "#D62828" },
  { name: "cta-hover", cls: "bg-cta-hover text-white", hex: "#B01E1E" },
  { name: "whatsapp", cls: "bg-whatsapp text-night-deep", hex: "#25D366" },
  { name: "sand", cls: "bg-sand text-ink border border-ink/10", hex: "#F5F3EE" },
  { name: "mist", cls: "bg-mist text-ink border border-ink/10", hex: "#F2F5FA" },
  { name: "ink", cls: "bg-ink text-white", hex: "#0F2A52" },
  { name: "ink-muted", cls: "bg-ink-muted text-white", hex: "#4A5A72" },
  { name: "alert-bg", cls: "bg-alert-bg text-alert border border-alert/20", hex: "#FEF2F2" },
];

export default function Home() {
  return (
    <main>
      <section className="bg-night text-white">
        <div className="wrap section-y">
          <p className="eyebrow text-gold">Milestone 1 · Foundation</p>
          <h1 className="mt-6 text-display">
            {site.name}
            <span className="block font-display italic text-brand-soft">{site.tagline}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lead text-white/70">
            If you can read this in Fraunces and Plus Jakarta Sans, on the dark teal base, with the
            gold dot above, Tailwind tokens and fonts are working.
          </p>
          <p className="mt-6 font-hand text-3xl text-gold">handwritten label (Caveat)</p>
        </div>
      </section>

      <section className="bg-sand">
        <div className="wrap section-y">
          <p className="eyebrow text-brand">Colour tokens</p>
          <h2 className="mt-4 text-h2">The palette</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {swatches.map((s) => (
              <div key={s.name} className={`rounded-card p-4 ${s.cls}`}>
                <div className="h-12" />
                <p className="text-sm font-semibold">{s.name}</p>
                <p className="text-xs opacity-80">{s.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="wrap section-y">
          <p className="eyebrow text-brand">Motion</p>
          <h2 className="mb-10 mt-4 text-h2">Scroll animation check</h2>
          <MotionCheck />
        </div>
      </section>

      <section className="bg-night-deep text-white/70">
        <div className="wrap py-16">
          <p>
            {site.phone.display} · {site.email}
          </p>
        </div>
      </section>
    </main>
  );
}

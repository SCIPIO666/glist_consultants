"use client";

import { useEffect, useMemo, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { Reveal } from "@/components/motion/Reveal";
import {
  categories,
  insights,
  insightsAreSamples,
  insightsPage as copy,
  readingBucketOf,
  readingBuckets,
  type Insight,
} from "@/data/insights";
import { services } from "@/data/services";
import { FilterGroup } from "./InsightsFilters";
import { InsightCard } from "./InsightCard";

type Key = "service" | "category" | "reading";
type Sel = Record<Key, string[]>;
const EMPTY: Sel = { service: [], category: [], reading: [] };

/** Does the article pass every group's filter? (OR inside a group, AND between groups.) `skip` leaves one group out, for per-option counts. */
function passes(item: Insight, sel: Sel, skip?: Key) {
  const ok = (key: Key, value: string) => key === skip || sel[key].length === 0 || sel[key].includes(value);
  return (
    ok("service", item.service) &&
    ok("category", item.category) &&
    ok("reading", readingBucketOf(item.readMinutes))
  );
}

/**
 * The Insights page: a long list of wide article cards on the right and a
 * sticky checklist of filters on the left (a collapsible panel on phones).
 * Cards are the minimal teaser-style card (photo, date, title, Read more).
 */
export function InsightsExplorer() {
  const [sel, setSel] = useState<Sel>(EMPTY);
  const [open, setOpen] = useState(false);

  const active = sel.service.length + sel.category.length + sel.reading.length;
  const filtered = useMemo(() => insights.filter((i) => passes(i, sel)), [sel]);

  const toggle = (key: Key) => (value: string) =>
    setSel((s) => ({ ...s, [key]: s[key].includes(value) ? s[key].filter((v) => v !== value) : [...s[key], value] }));

  // Options with live counts: how many articles each option would show given the OTHER groups.
  const count = (key: Key, test: (i: Insight) => boolean) => insights.filter((i) => passes(i, sel, key) && test(i)).length;
  const serviceOptions = services.map((s) => ({ value: s.slug, label: s.title, count: count("service", (i) => i.service === s.slug) }));
  const categoryOptions = categories.map((c) => ({ value: c.value, label: c.label, count: count("category", (i) => i.category === c.value) }));
  const readingOptions = readingBuckets.map((b) => ({ value: b.value, label: b.label, count: count("reading", (i) => readingBucketOf(i.readMinutes) === b.value) }));

  // The page height changes with the filters, so scroll triggers need to re-measure.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [filtered.length]);

  return (
    <section className="bg-mist text-ink">
      <div className="wrap-wide grid min-h-svh gap-8 pb-[clamp(4rem,8vw,7rem)] pt-[calc(var(--header-h)+clamp(1.5rem,4vw,3rem))] lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[19rem_minmax(0,1fr)]">
        {/* Filters: sticky column on desktop, collapsible panel on phones */}
        <aside
          aria-label={copy.filterTitle}
          data-lenis-prevent
          className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:max-h-[calc(100svh-var(--header-h)-3rem)] lg:self-start lg:overflow-y-auto lg:pr-1"
        >
          <button
            type="button"
            aria-expanded={open}
            aria-controls="insight-filters"
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-card bg-white px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] shadow-card lg:hidden"
          >
            <span className="flex items-center gap-3">
              {copy.filterTitle}
              {active > 0 && (
                <span className="grid min-w-5 place-items-center rounded-pill bg-brand px-1.5 text-[0.7rem] leading-5 text-white">
                  {active}
                </span>
              )}
            </span>
            <svg viewBox="0 0 12 12" aria-hidden className={`size-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
              <path d="M2 4.2 6 8l4-3.8" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div id="insight-filters" className={`${open ? "mt-3 block" : "hidden"} space-y-4 lg:mt-0 lg:block`}>
            <FilterGroup id="f-service" label={copy.groups.service} options={serviceOptions} selected={sel.service} onToggle={toggle("service")} />
            <FilterGroup id="f-category" label={copy.groups.category} options={categoryOptions} selected={sel.category} onToggle={toggle("category")} />
            <FilterGroup id="f-reading" label={copy.groups.reading} options={readingOptions} selected={sel.reading} onToggle={toggle("reading")} />
            {active > 0 && (
              <button
                type="button"
                onClick={() => setSel(EMPTY)}
                className="w-full rounded-pill border border-ink/20 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-white"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* The list */}
        <div className="min-w-0">
          <header className="mb-8 lg:mb-10">
            <Reveal y={40}>
              <h1 className="text-h1 font-medium">{copy.title}</h1>
            </Reveal>
            <p className="mt-4 max-w-2xl text-lead text-ink-muted">{copy.lead}</p>
            <p role="status" aria-live="polite" className="mt-5 text-sm font-medium text-ink-muted">
              Showing {filtered.length} of {insights.length} articles
            </p>
          </header>

          {filtered.length > 0 ? (
            <ul role="list" className="space-y-5 lg:space-y-6">
              {filtered.map((item, i) => (
                <li key={item.slug}>
                  <Reveal y={50} duration={1.1}>
                    <InsightCard item={item} priority={i === 0} />
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-card bg-white p-10 text-center shadow-card">
              <p className="font-display text-2xl font-medium">{copy.emptyTitle}</p>
              <p className="mt-2 text-ink-muted">{copy.emptyHint}</p>
              <button
                type="button"
                onClick={() => setSel(EMPTY)}
                className="mt-6 rounded-pill bg-cta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cta-hover"
              >
                Clear all filters
              </button>
            </div>
          )}

          <p className="mt-10 text-sm text-ink-muted">{copy.disclaimer}</p>

          {process.env.NODE_ENV !== "production" && insightsAreSamples && (
            <p className="mt-4 w-fit rounded-pill bg-alert-bg px-3 py-1 text-xs font-semibold text-alert">
              Dev note: sample articles. Replace in src/data/insights.ts before launch.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

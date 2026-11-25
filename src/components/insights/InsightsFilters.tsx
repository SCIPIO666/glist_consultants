type Option = { value: string; label: string; count: number };

/** One white box of checkboxes (a checklist). Native inputs, styled; fully keyboard and screen-reader friendly. */
export function FilterGroup({
  id,
  label,
  options,
  selected,
  onToggle,
}: {
  id: string;
  label: string;
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div role="group" aria-labelledby={id} className="rounded-card bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 id={id} className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink">
          {label}
        </h3>
        {selected.length > 0 && (
          <span className="grid min-w-5 place-items-center rounded-pill bg-brand px-1.5 text-[0.7rem] font-semibold leading-5 text-white">
            {selected.length}
          </span>
        )}
      </div>

      <ul role="list" className="mt-3 space-y-0.5">
        {options.map((o) => {
          const checked = selected.includes(o.value);
          return (
            <li key={o.value}>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5 text-sm transition-colors hover:bg-mist">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked}
                  onChange={() => onToggle(o.value)}
                />
                <span
                  aria-hidden
                  className="grid size-5 shrink-0 place-items-center rounded-md border border-ink/30 bg-white transition-colors peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100"
                >
                  <svg viewBox="0 0 12 12" className="size-3 text-white">
                    <path
                      d="M2.5 6.2 5 8.6l4.5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className={checked ? "flex-1 font-medium text-ink" : "flex-1 text-ink"}>{o.label}</span>
                <span className="text-xs tabular-nums text-ink-muted">{o.count}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

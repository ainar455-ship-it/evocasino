interface Fact {
  label: string;
  value: string;
}

export function FactsGrid({ facts }: { facts: Fact[] }) {
  return (
    <aside className="rounded-lg border border-border/70 bg-card shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border/60">
        <p className="text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground font-body font-semibold m-0">
          At a glance
        </p>
      </div>

      <dl className="m-0 divide-y divide-border/60">
        {facts.map((fact) => (
          <div key={fact.label} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 px-5 py-3.5 items-center">
            <dt className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground/85 font-body leading-tight">
              {fact.label}
            </dt>
            <dd className="text-sm font-semibold text-foreground font-body text-right m-0 tabular-nums">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

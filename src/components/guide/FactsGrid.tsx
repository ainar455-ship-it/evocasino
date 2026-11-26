import { Info } from "lucide-react";

interface Fact {
  label: string;
  value: string;
}

export function FactsGrid({ facts }: { facts: Fact[] }) {
  return (
    <aside className="bg-card border border-border/70 rounded-lg p-6 md:p-7">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10.5px] font-body font-semibold tracking-[0.18em] uppercase text-muted-foreground m-0">
          At a glance
        </p>
        <Info aria-hidden="true" className="h-4 w-4 text-muted-foreground/60" />
      </div>

      <dl className="divide-y divide-border/60 list-none p-0 m-0">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <dt className="text-[12px] font-body uppercase tracking-[0.14em] text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="text-[14px] font-body font-semibold text-foreground tabular-nums text-right m-0">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

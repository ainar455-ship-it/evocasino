interface Fact {
  label: string;
  value: string;
}

export function FactsGrid({ facts }: { facts: Fact[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border">
      {facts.map((fact, i) => (
        <div key={i} className="bg-card p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-body mb-1">
            {fact.label}
          </p>
          <p className="text-sm font-semibold text-foreground font-body">{fact.value}</p>
        </div>
      ))}
    </div>
  );
}

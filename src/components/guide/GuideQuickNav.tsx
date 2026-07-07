"use client";

interface QuickNavItem {
  id: string;
  label: string;
}

interface GuideQuickNavProps {
  items: QuickNavItem[];
}

export function GuideQuickNav({ items }: GuideQuickNavProps) {
  return (
    <aside className="md:sticky md:top-24">
      <p className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground/90 font-body font-semibold mb-4">
        In this guide
      </p>

      <nav className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 md:flex-col md:gap-3 md:border-l md:border-border/70 md:pl-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-body text-muted-foreground transition-colors hover:border-border hover:text-foreground md:border-0 md:bg-transparent md:rounded-none md:p-0 md:text-[13px] md:leading-snug"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

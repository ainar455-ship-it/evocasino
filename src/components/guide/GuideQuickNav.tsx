"use client";

import { cn } from "@/lib/utils";

interface QuickNavItem {
  id: string;
  label: string;
}

interface GuideQuickNavProps {
  items: QuickNavItem[];
}

export function GuideQuickNav({ items }: GuideQuickNavProps) {
  return (
    <>
      <div className="md:hidden -mx-4 px-4 border-y border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-[56px] z-30">
        <nav className="flex gap-1 overflow-x-auto py-2 no-scrollbar" aria-label="Guide sections">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={index === 0 ? "true" : undefined}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-body transition-colors",
                index === 0
                  ? "border-border bg-card text-foreground"
                  : "border-border/70 bg-card text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <aside className="hidden md:block sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 -mr-2 no-scrollbar">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 font-body font-medium mb-4">
          In this guide
        </p>

        <nav className="space-y-px relative" aria-label="Guide sections">
          <span aria-hidden="true" className="absolute left-0 top-1.5 bottom-1.5 w-px bg-border/70" />
          {items.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={index === 0 ? "true" : undefined}
              className={cn(
                "relative block py-1.5 pl-4 text-[13px] leading-snug font-body transition-colors",
                index === 0 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {index === 0 && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-px bg-foreground"
                />
              )}
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}

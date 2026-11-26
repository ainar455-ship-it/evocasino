import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MythItem {
  myth: string;
  reality: string;
}

interface GuideMythBoxProps {
  items: MythItem[];
  title?: string;
  className?: string;
}

export function GuideMythBox({ items, title = "Common Myths", className }: GuideMythBoxProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <h4 className="text-sm uppercase tracking-[0.14em] text-muted-foreground font-body font-semibold mb-2">
          {title}
        </h4>
      )}

      <ul className="space-y-3 list-none p-0 m-0">
        {items.map((item) => (
          <li key={item.myth} className="border border-border/70 rounded-lg bg-card p-4 md:p-5 shadow-sm">
            <div className="flex items-start gap-2.5 mb-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 shrink-0">
                <X className="h-3.5 w-3.5 text-destructive" />
              </span>
              <p className="text-sm font-body font-semibold text-foreground m-0 leading-relaxed">
                {item.myth}
              </p>
            </div>

            <div className="flex items-start gap-2.5 pl-8 pt-3 border-t border-border/60">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-primary" />
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed m-0">
                {item.reality}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

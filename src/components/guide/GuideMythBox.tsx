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
      {title && <h4 className="text-sm uppercase tracking-[0.14em] text-muted-foreground font-body font-semibold mb-2">{title}</h4>}
      <ul className="space-y-3 list-none p-0 m-0">
        {items.map((item, i) => (
          <li
            key={i}
            className="border border-border rounded-lg bg-card p-4 md:p-5"
          >
            <div className="flex items-start gap-2.5 mb-2">
              <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
              <p className="text-sm font-body font-semibold text-foreground m-0">
                {item.myth}
              </p>
            </div>
            <div className="flex items-start gap-2.5 pl-6 border-l-2 border-border ml-1.5">
              <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
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

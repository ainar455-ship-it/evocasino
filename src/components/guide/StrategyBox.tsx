import { Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface StrategyBoxProps {
  title: string;
  points: string[];
  caveat?: string;
  className?: string;
}

export function StrategyBox({ title, points, caveat, className }: StrategyBoxProps) {
  return (
    <div className={cn("border border-border/70 rounded-lg bg-card p-5 md:p-6 shadow-sm", className)}>
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gold-muted border border-gold/30 shrink-0">
          <Target className="h-4 w-4 text-gold" />
        </span>
        <h4 className="text-base font-heading font-semibold text-foreground m-0 leading-tight">
          {title}
        </h4>
      </div>

      <ul className="space-y-2.5 list-none m-0 p-0">
        {points.map((p) => (
          <li key={p} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
            <span className="mt-2 h-1 w-1 rounded-full bg-primary shrink-0" />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      {caveat && (
        <p className="text-xs text-muted-foreground/85 italic mt-4 pt-4 border-t border-border/60 mb-0">
          {caveat}
        </p>
      )}
    </div>
  );
}

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
    <div
      className={cn(
        "border border-border rounded-lg bg-surface-raised p-5 md:p-6",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <Target className="h-4 w-4 text-primary" />
        <h4 className="text-base font-heading font-semibold text-foreground m-0">
          {title}
        </h4>
      </div>
      <ul className="space-y-2 list-none m-0 p-0">
        {points.map((p, i) => (
          <li
            key={i}
            className="flex gap-2 text-sm text-muted-foreground leading-relaxed"
          >
            <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      {caveat && (
        <p className="text-xs text-muted-foreground/80 italic mt-4 pt-3 border-t border-border/60">
          {caveat}
        </p>
      )}
    </div>
  );
}

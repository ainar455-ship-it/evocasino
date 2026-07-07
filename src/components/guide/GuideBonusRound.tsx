import { Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BonusRound {
  name: string;
  icon: LucideIcon;
  shortDesc: string;
  mechanic: string;
  maxMultiplier: string;
  hitFrequency?: string;
}

interface GuideBonusRoundProps {
  rounds: BonusRound[];
  className?: string;
}

export function GuideBonusRound({ rounds, className }: GuideBonusRoundProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch", className)}>
      {rounds.map((round) => {
        const Icon = round.icon || Sparkles;

        return (
          <article
            key={round.name}
            className="border border-border/70 rounded-lg bg-card p-5 md:p-6 flex flex-col h-full shadow-sm transition-colors hover:border-border"
          >
            <div className="flex items-center gap-3 mb-3.5">
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-gold-muted border border-gold/30 shrink-0">
                <Icon className="h-4 w-4 text-gold" />
              </span>
              <h4 className="text-[15px] font-heading font-semibold text-foreground m-0 leading-tight">
                {round.name}
              </h4>
            </div>

            <p className="text-sm text-muted-foreground leading-[1.7] mb-5">
              {round.shortDesc}
            </p>

            <div className="mt-auto pt-4 border-t border-border/60 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80 font-body mb-1">
                  Mechanic
                </p>
                <p className="text-[13px] font-medium text-foreground font-body leading-snug">
                  {round.mechanic}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80 font-body mb-1">
                  Max Multiplier
                </p>
                <p className="text-[13px] font-medium text-foreground font-body leading-snug tabular-nums">
                  {round.maxMultiplier}
                </p>
              </div>
            </div>

            {round.hitFrequency && (
              <p className="text-[11px] text-muted-foreground/80 mt-3 mb-0">
                Avg. hit frequency: <span className="text-foreground font-medium">{round.hitFrequency}</span>
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Check } from "lucide-react";

export interface GuideCasino {
  rank: number;
  name: string;
  logo?: string;
  rating: number;
  bonus: string;
  pros: string[];
  payments: string[];
  mobile: boolean;
  ctaLabel?: string;
  href?: string;
}

interface GuideCasinoCardsProps {
  casinos: GuideCasino[];
  title?: string;
  description?: string;
}

function CasinoCta({ casino }: { casino: GuideCasino }) {
  const label = casino.ctaLabel ?? "Read Review";

  if (casino.href) {
    return (
      <Button asChild variant="outline" size="sm" className="min-w-[128px] font-medium">
        <Link href={casino.href}>{label}</Link>
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" className="min-w-[128px] font-medium">
      {label}
    </Button>
  );
}

export function GuideCasinoCards({
  casinos,
  title,
  description,
}: GuideCasinoCardsProps) {
  return (
    <div>
      {title && <h3 className="mb-1">{title}</h3>}
      {description && (
        <p className="text-sm text-muted-foreground mb-5 max-w-[44rem]">{description}</p>
      )}
      <ul className="space-y-3 list-none p-0 m-0">
        {casinos.map((c) => (
          <li
            key={c.name}
            className="group bg-card border border-border/60 rounded-lg transition-colors hover:border-border"
          >
            <div className="hidden md:grid md:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1.6fr)_auto] md:items-center gap-x-6 px-6 py-5">
              <span className="text-base font-heading font-medium text-muted-foreground/60 tabular-nums">
                {String(c.rank).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h4 className="text-[15px] font-heading font-semibold text-foreground m-0 leading-tight truncate">
                  {c.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(c.rating) ? "text-gold fill-gold" : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground font-body tabular-nums">
                    {c.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-[13px] text-foreground font-body font-medium m-0 mb-2 leading-snug">
                  {c.bonus}
                </p>
                <ul className="flex flex-wrap gap-x-5 gap-y-1 list-none p-0 m-0">
                  {c.pros.slice(0, 2).map((p, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-1.5 text-[12px] text-muted-foreground leading-snug"
                    >
                      <Check className="h-3 w-3 text-primary/70 shrink-0" />
                      <span className="truncate">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="shrink-0">
                <CasinoCta casino={c} />
              </div>
            </div>

            <div className="md:hidden p-5 space-y-3.5">
              <div className="flex items-start gap-3">
                <span className="text-sm font-heading font-medium text-muted-foreground/70 tabular-nums pt-0.5">
                  {String(c.rank).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[15px] font-heading font-semibold text-foreground m-0 leading-tight">
                    {c.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(c.rating) ? "text-gold fill-gold" : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground font-body tabular-nums">
                      {c.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[13px] text-foreground font-body font-medium m-0">
                {c.bonus}
              </p>

              <ul className="grid grid-cols-1 gap-1.5 list-none p-0 m-0">
                {c.pros.slice(0, 3).map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                  >
                    <Check className="h-3 w-3 text-primary/80 mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="[&>a]:w-full [&>button]:w-full">
                <CasinoCta casino={c} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

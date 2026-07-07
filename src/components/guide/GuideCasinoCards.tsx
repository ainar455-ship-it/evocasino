import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export interface GuideCasino {
  rank: number;
  name: string;
  scoreLabel?: string;
  bonus: string;
  facts: string[];
  payments: string[];
  ctaLabel?: string;
  href?: string;
}

interface GuideCasinoCardsProps {
  casinos: GuideCasino[];
  title?: string;
  description?: string;
}

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function CasinoCta({ casino, className }: { casino: GuideCasino; className?: string }) {
  const label = casino.ctaLabel ?? "Read Review";

  if (casino.href) {
    return (
      <Button asChild variant="default" size="default" className={className}>
        <Link href={casino.href}>{label}</Link>
      </Button>
    );
  }

  return (
    <Button variant="default" size="default" className={className}>
      {label}
    </Button>
  );
}

export function GuideCasinoCards({ casinos, title, description }: GuideCasinoCardsProps) {
  const [featured, ...rest] = casinos;

  return (
    <div>
      {title && <h3 className="mb-1">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground mb-5 max-w-[44rem]">{description}</p>}

      {featured && (
        <div className="relative mb-4 rounded-lg overflow-hidden bg-gold-muted/60 border border-gold/30">
          <div className="absolute inset-y-0 left-0 w-1 bg-gold" aria-hidden="true" />
          <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-6 p-5 md:p-7 pl-6 md:pl-8">
            <div
              className="h-14 w-14 md:h-16 md:w-16 rounded-md bg-primary text-primary-foreground font-heading font-semibold text-lg md:text-xl flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              {initialsFor(featured.name)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10.5px] uppercase tracking-[0.18em] text-gold font-body font-semibold mb-1.5">
                Top ranked for Crazy Time
              </p>
              <h4 className="text-[20px] md:text-[22px] font-heading font-semibold text-foreground leading-tight m-0">
                {featured.name}
              </h4>
              {featured.scoreLabel && (
                <p className="text-[12.5px] text-muted-foreground leading-snug mt-1 m-0">
                  {featured.scoreLabel}
                </p>
              )}
              <p className="text-[15px] md:text-[15.5px] font-body font-semibold text-foreground leading-snug mt-1.5 m-0">
                {featured.bonus}
              </p>
              {featured.facts.length > 0 && (
                <p className="text-[13.5px] text-muted-foreground leading-[1.65] mt-2 max-w-[42rem] m-0">
                  {featured.facts.slice(0, 3).join(" · ")}
                </p>
              )}
            </div>

            <div className="flex md:flex-col items-start md:items-end gap-3 md:gap-2.5 shrink-0">
              <CasinoCta casino={featured} className="min-w-[128px] font-bold" />
            </div>
          </div>
        </div>
      )}

      <ul className="space-y-3 list-none p-0 m-0">
        {rest.map((c) => {
          const highlights = c.facts.slice(0, 2);

          return (
            <li key={c.name}>
              <div className="hidden md:flex group relative items-center gap-5 p-5 bg-card border border-border/60 rounded-lg transition-colors duration-200 hover:border-gold/40">
                <div className="flex items-center gap-4 shrink-0 w-[240px]">
                  <span className="text-[22px] font-heading font-semibold text-foreground/30 tabular-nums leading-none w-6 text-center">
                    {c.rank}
                  </span>
                  <div
                    className="h-11 w-11 rounded-md bg-muted text-foreground/90 font-heading font-semibold text-[15px] flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    {initialsFor(c.name)}
                  </div>
                  <h4 className="text-[16px] font-heading font-semibold text-foreground leading-tight truncate m-0">
                    {c.name}
                  </h4>
                </div>

                <div className="h-12 w-px bg-gold/60 shrink-0" aria-hidden="true" />

                <div className="flex-1 min-w-0">
                  <p className="text-[14.5px] font-body font-semibold text-foreground leading-snug m-0">
                    {c.bonus}
                  </p>
                  {(c.scoreLabel || highlights.length > 0) && (
                    <p className="text-[12.5px] text-muted-foreground leading-snug mt-1 m-0">
                      {c.scoreLabel}
                      {c.scoreLabel && highlights.length > 0 && <span className="mx-2 text-border">|</span>}
                      {highlights.map((fact, index) => (
                        <span key={fact}>
                          {index > 0 && <span className="text-gold mr-1">/ </span>}
                          {fact}
                        </span>
                      ))}
                    </p>
                  )}
                </div>

                <CasinoCta casino={c} className="shrink-0 min-w-[128px] font-bold" />
              </div>

              <div className="md:hidden bg-card border border-border/60 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[20px] font-heading font-semibold text-foreground/30 tabular-nums leading-none w-5 text-center">
                    {c.rank}
                  </span>
                  <div
                    className="h-10 w-10 rounded-md bg-muted text-foreground/90 font-heading font-semibold text-[14px] flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    {initialsFor(c.name)}
                  </div>
                  <h4 className="text-[15px] font-heading font-semibold text-foreground leading-tight m-0 flex-1 min-w-0 truncate">
                    {c.name}
                  </h4>
                </div>

                <div className="border-l-2 border-gold/60 pl-3 mb-3">
                  <p className="text-[13.5px] font-body font-semibold text-foreground leading-snug m-0">
                    {c.bonus}
                  </p>
                  {c.scoreLabel && (
                    <p className="text-[12.5px] text-muted-foreground leading-snug mt-1 m-0">
                      {c.scoreLabel}
                    </p>
                  )}
                </div>

                {c.facts.length > 0 && (
                  <ul className="mt-2 space-y-1 list-none p-0 m-0">
                    {c.facts.slice(0, 3).map((fact) => (
                      <li key={fact} className="flex items-start gap-1.5 text-[12.5px] text-muted-foreground leading-snug">
                        <Check className="h-3 w-3 text-gold mt-[3px] shrink-0" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 [&>a]:w-full [&>button]:w-full">
                  <CasinoCta casino={c} className="w-full font-bold" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

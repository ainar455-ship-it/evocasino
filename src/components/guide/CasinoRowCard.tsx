import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface CasinoRowCardProps {
  rank: number;
  name: string;
  logo?: string;
  rating: number;
  bonus: string;
  features: string[];
  ctaLabel?: string;
  style?: React.CSSProperties;
}

export function CasinoRowCard({ rank, name, logo, rating, bonus, features, ctaLabel = "Visit Casino", style }: CasinoRowCardProps) {
  return (
    <div style={style} className="bg-card border border-border/60 rounded-lg p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 transition-colors duration-150 hover:border-border hover:bg-muted/30 animate-fade-in group active:bg-muted/40 active:border-border active:transition-colors active:duration-100 md:active:bg-muted/30">
      {/* Rank */}
      <div className="flex items-center gap-3 md:w-12">
        <span className="text-base md:text-2xl font-heading font-semibold md:font-bold text-muted-foreground md:text-primary">#{rank}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-1">
          {logo && (
            <img
              src={logo}
              alt={`${name} logo`}
              className="hidden md:block h-7 w-auto max-w-[80px] object-contain grayscale opacity-60"
            />
          )}
          <h3 className="text-base font-heading font-semibold text-foreground group-hover:text-foreground/80 transition-colors">{name}</h3>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "text-gold fill-gold" : "text-border"}`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-body">{rating}/5</span>
        </div>
        <p className="text-sm text-muted-foreground font-body mb-2">{bonus}</p>
        <div className="flex flex-wrap gap-1.5">
          {features.map((f, i) => (
            <Badge key={i} variant="secondary" className="text-[11px] md:text-xs px-2 md:px-2.5 bg-muted/60 md:bg-secondary">
              {f}
            </Badge>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="md:w-auto">
        <Button variant="default" size="default" className="w-full md:w-auto active:scale-[0.98] active:brightness-[0.92] transition-transform duration-100 md:active:scale-100 md:active:brightness-100">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import {
  Info,
  AlertTriangle,
  TrendingUp,
  Activity,
  Cog,
  Lightbulb,
  Building2,
  ImageIcon,
  type LucideIcon,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
 * Reusable editorial utility blocks for guides.
 * Keep these subtle: editorial first, decorative never.
 * ──────────────────────────────────────────────────────────── */

interface BaseBlockProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

function EditorialBlock({
  icon: Icon,
  tone,
  label,
  title,
  children,
  className,
}: BaseBlockProps & {
  icon: LucideIcon;
  tone: "neutral" | "warning" | "info" | "accent";
  label: string;
}) {
  const toneClasses = {
    neutral: "border-border bg-surface-raised",
    info: "border-border bg-secondary/60",
    warning: "border-gold/40 bg-gold-muted",
    accent: "border-primary/20 bg-primary/5",
  }[tone];

  const iconClasses = {
    neutral: "text-muted-foreground",
    info: "text-primary",
    warning: "text-gold",
    accent: "text-primary",
  }[tone];

  return (
    <aside className={cn("rounded-lg border p-5 md:p-6 my-6", toneClasses, className)}>
      <div className="flex items-start gap-3">
        <Icon className={cn("h-4 w-4 mt-1 shrink-0", iconClasses)} />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground font-body font-semibold mb-1">
            {label}
          </p>
          {title && (
            <h4 className="text-base font-heading font-semibold text-foreground m-0 mb-1.5 leading-tight">
              {title}
            </h4>
          )}
          <div className="text-sm text-muted-foreground leading-relaxed [&_p]:m-0 [&_p+p]:mt-2">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

export function InfoNote(props: BaseBlockProps) {
  return <EditorialBlock {...props} icon={Info} tone="info" label="Note" />;
}

export function WarningBox(props: BaseBlockProps) {
  return <EditorialBlock {...props} icon={AlertTriangle} tone="warning" label="Important" />;
}

export function StrategyTip(props: BaseBlockProps) {
  return <EditorialBlock {...props} icon={Lightbulb} tone="accent" label="Strategy tip" />;
}

export function VarianceCallout(props: BaseBlockProps) {
  return <EditorialBlock {...props} icon={Activity} tone="neutral" label="Variance" />;
}

export function ProviderFact(props: BaseBlockProps) {
  return <EditorialBlock {...props} icon={Building2} tone="neutral" label="Provider fact" />;
}

/* ── Highlight & badge primitives ───────────────────────── */

interface RTPHighlightProps {
  rtp: string;
  label?: string;
  note?: string;
  className?: string;
}

export function RTPHighlight({
  rtp,
  label = "Theoretical RTP",
  note,
  className,
}: RTPHighlightProps) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-4 border-l-2 border-primary pl-5 py-2 my-6",
        className
      )}
    >
      <div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground font-body font-semibold mb-1">
          {label}
        </p>
        <p className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-none tabular-nums">
          {rtp}
        </p>
        {note && (
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{note}</p>
        )}
      </div>
    </div>
  );
}

interface MechanicBadgeProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function MechanicBadge({ children, icon: Icon = Cog, className }: MechanicBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-body font-medium text-muted-foreground",
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {children}
    </span>
  );
}

/* ── Visual module placeholder ──────────────────────────────
 * Reserved space for future charts/illustrations.
 * Renders nothing decorative when hidden in production.
 * ─────────────────────────────────────────────────────────── */
interface VisualPlaceholderProps {
  label: string;
  caption?: string;
  ratio?: "16/9" | "4/3" | "21/9";
  className?: string;
  /** Hide entirely until a real visual exists. */
  hidden?: boolean;
}

export function VisualPlaceholder({
  label,
  caption,
  ratio = "16/9",
  className,
  hidden = false,
}: VisualPlaceholderProps) {
  if (hidden) return null;
  const ratioClass =
    ratio === "21/9" ? "aspect-[21/9]" : ratio === "4/3" ? "aspect-[4/3]" : "aspect-video";
  return (
    <figure className={cn("my-8", className)}>
      <div
        className={cn(
          "w-full rounded-lg border border-dashed border-border bg-muted/30 flex flex-col items-center justify-center text-center px-6",
          ratioClass
        )}
      >
        <ImageIcon className="h-5 w-5 text-muted-foreground/60 mb-2" />
        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground/80 font-body font-semibold">
          Visual module
        </p>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">{label}</p>
      </div>
      {caption && (
        <figcaption className="text-xs text-muted-foreground mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* Convenience pre-set visual placeholders for future Evolution guide visuals. */
export const VisualModules = {
  WheelDistribution: (p?: Partial<VisualPlaceholderProps>) => (
    <VisualPlaceholder label="Wheel segment distribution graphic" {...p} />
  ),
  RTPComparison: (p?: Partial<VisualPlaceholderProps>) => (
    <VisualPlaceholder label="RTP comparison chart vs. other Evolution titles" {...p} />
  ),
  BonusFlow: (p?: Partial<VisualPlaceholderProps>) => (
    <VisualPlaceholder label="Bonus round flow diagram" {...p} />
  ),
  VolatilitySpectrum: (p?: Partial<VisualPlaceholderProps>) => (
    <VisualPlaceholder label="Volatility spectrum positioning" ratio="21/9" {...p} />
  ),
  MechanicsIllustration: (p?: Partial<VisualPlaceholderProps>) => (
    <VisualPlaceholder label="Game mechanics illustration" {...p} />
  ),
};

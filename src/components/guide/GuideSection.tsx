import { cn } from "@/lib/utils";

interface GuideSectionProps {
  id: string;
  title: string;
  eyebrow?: string;
  lead?: string;
  children: React.ReactNode;
  tone?: "default" | "muted";
  divider?: boolean;
  wide?: boolean;
  className?: string;
}

export function GuideSection({
  id,
  title,
  eyebrow,
  lead,
  children,
  tone = "default",
  divider = false,
  wide = false,
  className,
}: GuideSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 -mx-4 px-4 md:mx-0 md:px-0 py-9 md:py-11",
        tone === "muted" && "bg-muted/30 md:rounded-xl md:px-8",
        divider && tone !== "muted" && "border-t border-border/60",
        className
      )}
    >
      {eyebrow && (
        <p className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground/90 font-body font-medium mb-3">
          {eyebrow}
        </p>
      )}

      <h2 className="mb-3 scroll-mt-28">{title}</h2>

      {lead && (
        <p className="text-[15.5px] md:text-[17px] text-muted-foreground leading-[1.75] max-w-[42rem] mb-7">
          {lead}
        </p>
      )}

      <div className={cn(!wide && "max-w-[42rem]")}>{children}</div>
    </section>
  );
}

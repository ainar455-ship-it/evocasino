import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Guide {
  title: string;
  href: string;
  description?: string;
}

export function RelatedGuides({ guides, title = "Related Guides" }: { guides: Guide[]; title?: string }) {
  return (
    <div>
      <h3 className="mb-4">{title}</h3>
      <div className="space-y-3">
        {guides.map((guide, i) => (
          <Link
            key={i}
            href={guide.href}
            className="group flex items-center justify-between bg-card border border-border/60 rounded-lg p-4 transition-colors duration-150 hover:border-border hover:bg-muted/30 active:bg-muted/40 active:border-border active:transition-colors active:duration-100 md:active:bg-muted/30"
          >
            <div>
              <p className="text-sm font-body font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                {guide.title}
              </p>
              {guide.description && (
                <p className="text-xs text-muted-foreground mt-1">{guide.description}</p>
              )}
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}

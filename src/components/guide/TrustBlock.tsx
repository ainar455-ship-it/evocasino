import { Shield, CheckCircle } from "lucide-react";

interface TrustBlockProps {
  title?: string;
  items: string[];
}

export function TrustBlock({ title = "How We Rank", items }: TrustBlockProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-heading font-semibold text-foreground">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
            <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

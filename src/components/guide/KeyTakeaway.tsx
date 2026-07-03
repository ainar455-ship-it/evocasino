import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface KeyTakeawayProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

export function KeyTakeaway({ children, label = "Key takeaway", className }: KeyTakeawayProps) {
  return (
    <aside
      className={cn(
        "my-7 border-l-2 border-gold pl-5 md:pl-6 py-1",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <Quote className="h-3 w-3 text-gold" />
        <span className="text-[10.5px] uppercase tracking-[0.18em] text-gold font-body font-semibold">
          {label}
        </span>
      </div>
      <p className="font-heading text-[19px] md:text-[21px] leading-[1.45] text-foreground m-0">
        {children}
      </p>
    </aside>
  );
}

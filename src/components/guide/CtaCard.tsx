import { cn } from "@/lib/utils";
import React from "react";

interface CtaCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function CtaCard({ title, description, children, className }: CtaCardProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-5 md:p-6", className)}>
      <h3 className="text-lg mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground font-body mb-4">{description}</p>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

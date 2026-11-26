import { cn } from "@/lib/utils";
import React from "react";

export function Page({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={cn("min-h-screen bg-card", className)}>
      {children}
    </main>
  );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("container max-w-content mx-auto", className)}>
      {children}
    </div>
  );
}

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-prose", className)}>
      {children}
    </div>
  );
}

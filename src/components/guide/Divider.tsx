import { cn } from "@/lib/utils";

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("border-t border-border my-8 md:my-12", className)} />;
}

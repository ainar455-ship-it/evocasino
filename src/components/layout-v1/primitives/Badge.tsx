import clsx from "clsx";

type BadgeVariant = "success" | "warning" | "neutral";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    success: "bg-green-50 text-green-700 border border-green-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    neutral: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

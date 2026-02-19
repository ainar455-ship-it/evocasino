import Link from "next/link";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  href?: string;
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
};

export function Button({
  href,
  variant = "primary",
  children,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[#FF6B00] text-white hover:bg-[#e65c00] shadow-md hover:shadow-lg",
    secondary:
      "bg-white text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
    ghost: "text-[var(--color-primary)] hover:underline hover:text-[var(--color-primary-light)]",
  };

  const classes = clsx(base, variants[variant], className);

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="nofollow noopener">
        {children}
      </a>
    );
  }

  return <button className={classes}>{children}</button>;
}
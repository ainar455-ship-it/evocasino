import clsx from "clsx";

type TextProps = {
  as?: "p" | "span" | "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
};

export function Text({ as = "p", children, className }: TextProps) {
  const Comp = as;

  const styles: Record<string, string> = {
    p: "text-sm text-gray-700",
    span: "text-sm text-gray-700",
    h1: "text-2xl font-extrabold tracking-tight text-gray-900",
    h2: "text-xl font-bold tracking-tight text-gray-900",
    h3: "text-lg font-semibold text-gray-900",
  };

  return <Comp className={clsx(styles[as], className)}>{children}</Comp>;
}

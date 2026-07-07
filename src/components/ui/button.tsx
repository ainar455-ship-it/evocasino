import React from "react";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  className?: string;
  asChild?: boolean;
}

export function Button({ children, asChild = false, ...props }: ButtonProps) {
  const Component: any = asChild ? Slot : "button";

  return (
    <Component
      {...props}
      style={{
        padding: "10px 16px",
        borderRadius: 10,
        border: "1px solid #111827",
        background: "#111827",
        color: "#ffffff",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {children}
    </Component>
  );
}

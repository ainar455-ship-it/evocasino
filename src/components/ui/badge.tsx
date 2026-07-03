import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: string;
  className?: string;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "999px",
        border: "1px solid #e5e7eb",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

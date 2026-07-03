import React from "react";

export function Accordion({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function AccordionItem({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );
}

export function AccordionTrigger({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontWeight: 700,
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

export function AccordionContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

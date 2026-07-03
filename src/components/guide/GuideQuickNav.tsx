"use client";

interface QuickNavItem {
  id: string;
  label: string;
}

interface GuideQuickNavProps {
  items: QuickNavItem[];
}

export function GuideQuickNav({ items }: GuideQuickNavProps) {
  return (
    <aside
      style={{
        position: "sticky",
        top: 120,
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#9ca3af",
          marginBottom: 20,
          fontWeight: 700,
        }}
      >
        In this guide
      </div>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          borderLeft: "1px solid #e5e7eb",
          paddingLeft: 18,
        }}
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            style={{
              color: "#374151",
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

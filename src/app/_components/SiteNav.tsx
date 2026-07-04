"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { label: "Evolution Casinos", to: "/evolution-casinos" },
  { label: "Evolution Games", to: "/evolution-games" },
  { label: "Evolution Bonuses", to: "/evolution-bonuses" },
];

const gameLinks = [
  { label: "Crazy Time", to: "/games/crazy-time" },
  { label: "Lightning Roulette", to: "/games/lightning-roulette" },
  { label: "Monopoly Live", to: "/games/monopoly-live" },
];

const allLinks = [...primaryLinks, ...gameLinks];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--card)/0.95)] backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--card)/0.8)]">
      <div className="mx-auto flex h-14 max-w-[1060px] items-center justify-between px-4">
        <Link
          href="/"
          className="[font-family:var(--font-heading),Georgia,serif] text-xl font-bold tracking-tight text-[hsl(var(--primary))] no-underline"
          onClick={() => setOpen(false)}
        >
          EvoCasino
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {allLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className="[font-family:var(--font-body)] text-sm font-medium text-[hsl(var(--muted-foreground))] no-underline transition-colors hover:text-[hsl(var(--foreground))]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-md p-2 text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--secondary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] transition-all duration-200 ease-in-out md:hidden",
          open ? "max-h-[480px] opacity-100" : "max-h-0 border-t-0 opacity-0",
        )}
      >
        <nav className="mx-auto max-w-[1060px] space-y-1 px-4 py-4">
          {primaryLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 [font-family:var(--font-body)] text-sm font-medium text-[hsl(var(--foreground))] no-underline transition-colors hover:bg-[hsl(var(--secondary))]"
            >
              {link.label}
            </Link>
          ))}

          {gameLinks.map((link) => (
            <Link
              key={link.label}
              href={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 [font-family:var(--font-body)] text-sm font-medium text-[hsl(var(--muted-foreground))] no-underline transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

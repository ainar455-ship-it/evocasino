"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const primaryLinks = [
  { label: "Casinos", href: "/evolution-casinos" },
  { label: "Games", href: "/evolution-games" },
  { label: "Bonuses", href: "/evolution-bonuses" },
  { label: "How we rank", href: "/how-we-rank" },
];

const gameLinks = [
  { label: "Crazy Time", href: "/games/crazy-time" },
  { label: "Lightning Roulette", href: "/games/lightning-roulette" },
  { label: "Monopoly Live", href: "/games/monopoly-live" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--card)/0.95)] backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--card)/0.8)]">
      <div className="container mx-auto flex h-14 max-w-[1060px] items-center justify-between px-4">
        <Link
          href="/"
          className="font-[var(--font-heading)] text-xl font-bold tracking-tight text-[hsl(var(--primary))]"
          onClick={() => setOpen(false)}
        >
          EvoCasino
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[var(--font-body)] text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex items-center justify-center rounded-md p-2 text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--secondary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] md:hidden"
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] transition-all duration-200 ease-in-out md:hidden ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto max-w-[1060px] space-y-1 px-4 py-4" aria-label="Mobile navigation">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 font-[var(--font-body)] text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--secondary))]"
            >
              {link.label}
            </Link>
          ))}

          <div className="px-3 pb-1 pt-3">
            <span className="font-[var(--font-body)] text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
              Game guides
            </span>
          </div>
          {gameLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 font-[var(--font-body)] text-sm font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

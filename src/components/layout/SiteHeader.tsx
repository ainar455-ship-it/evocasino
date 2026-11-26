import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { label: "Home", to: "/" },
  { label: "Guides", to: "/guide/crazy-time" },
  { label: "Best Casinos", to: "/best/crazy-time-casinos" },
];

const gameLinks = [
  { label: "Crazy Time", to: "/guide/crazy-time" },
  { label: "Lightning Roulette", to: "#" },
  { label: "Monopoly Live", to: "#" },
  { label: "Dream Catcher", to: "#" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      <div className="container max-w-content mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight text-primary" onClick={() => setOpen(false)}>
          EvoCasino
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {primaryLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-border bg-background transition-all duration-200 ease-in-out",
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 border-t-0"
        )}
      >
        <nav className="container max-w-content mx-auto px-4 py-4 space-y-1">
          {primaryLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-body font-medium text-foreground hover:bg-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 pb-1 px-3">
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground">
              Top Games
            </span>
          </div>
          {gameLinks.map((link) => (
            <Link
              key={link.label}
              href={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

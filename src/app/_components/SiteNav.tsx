"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const primaryLinks = [
  { href: "/evolution-casinos", label: "Casinos" },
  { href: "/evolution-games", label: "Games" },
  { href: "/evolution-bonuses", label: "Bonuses" },
  { href: "/how-we-rank", label: "How we rank" },
];

const guideLinks = [
  { href: "/guides/crazy-time", label: "Crazy Time" },
  { href: "/guides/lightning-roulette", label: "Lightning Roulette" },
  { href: "/guides/monopoly-live", label: "Monopoly Live" },
  { href: "/guides/dream-catcher", label: "Dream Catcher" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-shell">
        <Link href="/" className="site-brand" onClick={() => setOpen(false)}>
          EvoCasino
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="site-menu-button"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div className={open ? "site-mobile-menu site-mobile-menu-open" : "site-mobile-menu"}>
        <nav className="site-mobile-nav" aria-label="Mobile navigation">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}

          <div className="site-mobile-kicker">Game guides</div>
          {guideLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

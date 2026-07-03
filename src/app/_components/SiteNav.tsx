import Link from "next/link";

const navLinks = [
  { href: "/evolution-casinos", label: "Casinos" },
  { href: "/evolution-games", label: "Games" },
  { href: "/evolution-bonuses", label: "Bonuses" },
  { href: "/games/crazy-time", label: "Crazy Time" },
  { href: "/games/lightning-roulette", label: "Lightning Roulette" },
  { href: "/games/monopoly-live", label: "Monopoly Live" },
];

export default function SiteNav() {
  return (
    <header className="site-header">
      <div className="site-header-shell">
        <Link href="/" className="site-brand">
          EvoCasino
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

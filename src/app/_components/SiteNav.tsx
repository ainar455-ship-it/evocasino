import Link from "next/link";

export default function SiteNav() {
  return (
    <nav style={{ borderBottom: "1px solid #e5e7eb" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "14px 24px", display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Link href="/" style={{ fontWeight: 800, textDecoration: "none" }}>EvoCasino</Link>
        <span style={{ opacity: 0.4 }}>·</span>
        <Link href="/evolution-casinos" style={{ textDecoration: "underline" }}>Evolution Casinos</Link>
        <Link href="/evolution-bonuses" style={{ textDecoration: "underline" }}>Evolution Bonuses</Link>
        <Link href="/games/crazy-time" style={{ textDecoration: "underline" }}>Crazy Time</Link>
        <Link href="/games/lightning-roulette" style={{ textDecoration: "underline" }}>Lightning Roulette</Link>
        <Link href="/games/monopoly-live" style={{ textDecoration: "underline" }}>Monopoly Live</Link>
      </div>
    </nav>
  );
}

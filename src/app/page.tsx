import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { filterAndRank, getAllCasinos } from "@/lib/evo/load";
import { computeBonusQualityScore } from "@/lib/evo/bonus";
import { guideRegistry } from "@/lib/guides/guideRegistry";

const principles = [
  { label: "Facts-only rankings" },
  { label: "No paid placements" },
  { label: "Evolution-only focus" },
  { label: "RTP & game analysis" },
  { label: "Transparent methodology" },
];

const featuredGuide = {
  category: "Game Show",
  title: "Crazy Time",
  description:
    "A complete editorial breakdown of Evolution's flagship money-wheel game show — bonus mechanics, RTP per segment, and bankroll discipline.",
  rtp: "96.08%",
  volatility: "Very High",
  href: "/guides/crazy-time",
};

export default function HomePage() {
  const topCasinos = filterAndRank(getAllCasinos(), {}).slice(0, 5);

  const bonusRows = getAllCasinos()
    .filter((c) => !!c.bonuses?.headline)
    .map((c) => ({
      casino: c,
      bonusScore: computeBonusQualityScore(c),
    }))
    .sort(
      (a, b) =>
        (b.bonusScore - a.bonusScore) ||
        (b.casino.evolutionScore - a.casino.evolutionScore) ||
        a.casino.name.localeCompare(b.casino.name)
    )
    .slice(0, 5);

  const topGuides = guideRegistry.slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section className="border-b border-[hsl(var(--border))]">
        <div className="mx-auto max-w-[1060px] px-4">
          <div className="pt-16 pb-14 md:pt-24 md:pb-20">
            <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-14 lg:gap-20">
              <div className="max-w-[40rem]">
                <p className="mb-6 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                  Independent Editorial · Evolution Gaming
                </p>
                <h1 className="mb-6">
                  The authority guide to{" "}
                  <span className="text-[hsl(var(--primary))]">
                    Evolution Live Casino
                  </span>
                  .
                </h1>
                <p className="mb-9 max-w-[34rem] text-[17px] leading-[1.7] text-[hsl(var(--muted-foreground))] md:text-[18px]">
                  Deep game breakdowns, transparent casino rankings, and editorial
                  analysis of the world's most-played live dealer studio — built on
                  real testing, not marketing copy.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/guides/crazy-time"
                    className="inline-flex h-[3.1rem] items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[hsl(var(--primary))] px-8 py-2 font-body text-base font-bold text-[hsl(var(--primary-foreground))] ring-offset-[hsl(var(--background))] transition-colors hover:bg-[hsl(var(--primary)/0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                  >
                    Read the Crazy Time guide
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="/evolution-casinos"
                    className="inline-flex h-[3.1rem] items-center justify-center gap-2 whitespace-nowrap rounded-md border border-[hsl(var(--border))] bg-transparent px-8 py-2 font-body text-base font-bold text-[hsl(var(--primary))] ring-offset-[hsl(var(--background))] transition-colors hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2"
                  >
                    Evolution casinos
                  </Link>
                </div>
              </div>

              <Link
                href={featuredGuide.href}
                className="group block rounded-lg border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--card))] p-6 transition-colors hover:border-[hsl(var(--border))] md:p-7"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-body text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                    Featured Guide
                  </span>
                  <FileText className="h-4 w-4 text-[hsl(var(--muted-foreground)/0.7)]" />
                </div>
                <p className="mb-2 font-body text-[11px] font-medium uppercase tracking-widest text-gold">
                  {featuredGuide.category}
                </p>
                <h3 className="mb-3 font-heading font-semibold leading-tight text-[hsl(var(--foreground))]">
                  {featuredGuide.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {featuredGuide.description}
                </p>
                <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--border))]">
                  <div className="bg-[hsl(var(--card))] px-4 py-3">
                    <p className="mb-0.5 font-body text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      RTP
                    </p>
                    <p className="font-body text-sm font-semibold tabular-nums text-[hsl(var(--foreground))]">
                      {featuredGuide.rtp}
                    </p>
                  </div>
                  <div className="bg-[hsl(var(--card))] px-4 py-3">
                    <p className="mb-0.5 font-body text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      Volatility
                    </p>
                    <p className="font-body text-sm font-semibold text-[hsl(var(--foreground))]">
                      {featuredGuide.volatility}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-[hsl(var(--primary))] transition-all group-hover:gap-2">
                  Read the full guide
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / METHODOLOGY STRIP */}
      <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
        <div className="mx-auto max-w-[1060px] px-4">
          <ul className="m-0 flex list-none flex-wrap items-center gap-x-8 gap-y-3 p-0 py-5 md:py-6">
            {principles.map((p) => (
              <li
                key={p.label}
                className="flex items-center gap-2 font-body text-[12.5px] text-[hsl(var(--muted-foreground))]"
              >
                <span className="h-1 w-1 rounded-full bg-gold" />
                <span>{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      {/* GUIDES */}
      <section style={{ marginTop: 18, padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
          Popular Evolution Guides
        </h2>

        <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
          {topGuides.map((g) => (
            <div key={g.slug}>
              <a
                href={`/guides/${g.slug}`}
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                {g.title}
              </a>

              <div style={{ marginTop: 4, opacity: 0.8, lineHeight: 1.5 }}>
                Learn how the game works, including RTP, rules, payouts, and simple strategies.
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <a href="/evolution-games" style={{ textDecoration: "underline" }}>
            Explore all Evolution games →
          </a>
        </div>
      </section>

      {/* TOP CASINOS */}
      <section style={{ marginTop: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "baseline",
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
            Top Evolution casinos
          </h2>

          <a href="/evolution-casinos" style={{ textDecoration: "underline" }}>
            See full ranked list + filters →
          </a>
        </div>

        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {topCasinos.map((c, idx) => (
            <div
              key={c.id}
              style={{
                padding: 14,
                border: "1px solid #e5e7eb",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    #{idx + 1} — {c.name}
                  </div>

                  <div style={{ marginTop: 6, opacity: 0.85 }}>
                    Shows: {c.evolution.shows.join(", ")} · Mobile:{" "}
                    {c.mobile.experience}/5
                  </div>

                  <div style={{ marginTop: 4, opacity: 0.75 }}>
                    Payments: {c.payments.methods.join(", ")}
                  </div>
                </div>

                <div style={{ alignSelf: "center" }}>
                  <a
                    href={`/casinos/${c.slug}`}
                    style={{
                      textDecoration: "underline",
                      fontWeight: 700,
                    }}
                  >
                    View review →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BONUSES */}
      <section style={{ marginTop: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "baseline",
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
            Top Evolution bonuses
          </h2>

          <a href="/evolution-bonuses" style={{ textDecoration: "underline" }}>
            See all bonuses →
          </a>
        </div>

        <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.5 }}>
          Bonuses are surfaced from SSOT facts and the existing bonus scoring logic.
        </p>

        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {bonusRows.map((r, idx) => {
            const c = r.casino;

            return (
              <div
                key={c.id}
                style={{
                  padding: 14,
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800 }}>
                  #{idx + 1} — {c.name}
                </div>

                <div style={{ marginTop: 6, opacity: 0.85 }}>
                  Bonus Quality Score: <strong>{r.bonusScore}</strong> · Evolution
                  Score: {c.evolutionScore}
                </div>

                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 700 }}>Bonus</div>

                  <div style={{ marginTop: 4 }}>
                    {c.bonuses?.headline}
                  </div>

                  <div style={{ marginTop: 4, opacity: 0.75 }}>
                    Last verified: {c.bonuses?.lastVerified}
                  </div>
                </div>

                <div style={{ marginTop: 10 }}>
                  <a
                    href={`/casinos/${c.slug}`}
                    style={{
                      textDecoration: "underline",
                      fontWeight: 700,
                    }}
                  >
                    View full review →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRUST */}
      <section
        style={{
          marginTop: 18,
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
        }}
      >
        <strong>Trust & transparency</strong>

        <ul
          style={{
            marginTop: 10,
            marginBottom: 0,
            paddingLeft: 18,
            lineHeight: 1.6,
          }}
        >
          <li>Facts-only SSOT data; if schemas drift, the build fails.</li>
          <li>Rankings are computed deterministically in code.</li>
          <li>Unknowns stay unknown.</li>
          <li>No payout testing or fake performance claims.</li>
        </ul>

        <div style={{ marginTop: 10 }}>
          <a href="/how-we-rank" style={{ textDecoration: "underline" }}>
            Read methodology →
          </a>
        </div>
      </section>
      </div>
    </main>
  );
}

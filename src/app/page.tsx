import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  FileText,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { filterAndRank, getAllCasinos, type CasinoRow } from "@/lib/evo/load";
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

type FeaturedGuideCard = {
  category: string;
  title: string;
  description: string;
  rtp: string;
  volatility: string;
  href: string;
  available: boolean;
};

const featuredGuides: FeaturedGuideCard[] = [
  {
    category: "Game Show",
    title: "Crazy Time",
    description:
      "A complete editorial breakdown of Evolution's flagship money-wheel game show — bonus mechanics, RTP per segment, and bankroll discipline.",
    rtp: "96.08%",
    volatility: "Very High",
    href: "/guides/crazy-time",
    available: true,
  },
  {
    category: "Live Roulette",
    title: "Lightning Roulette",
    description:
      "How Lightning multipliers reshape the maths of European roulette, and where the trade-off between volatility and RTP actually sits.",
    rtp: "97.30%",
    volatility: "High",
    href: "/guides/lightning-roulette",
    available: false,
  },
  {
    category: "Game Show",
    title: "Monopoly Live",
    description:
      "A clear-eyed look at the 2 Rolls and 4 Rolls bonus boards, hit frequencies, and how the game compares to other Evolution wheels.",
    rtp: "96.23%",
    volatility: "High",
    href: "/guides/monopoly-live",
    available: false,
  },
];

type EvolutionGameCard = {
  name: string;
  type: string;
  href?: string;
  available: boolean;
};

const designEvolutionGames = [
  { name: "Crazy Time", type: "Game Show" },
  { name: "Monopoly Live", type: "Game Show" },
  { name: "Dream Catcher", type: "Money Wheel" },
  { name: "Lightning Roulette", type: "Live Roulette" },
  { name: "Lightning Dice", type: "Game Show" },
  { name: "Live Baccarat", type: "Live Tables" },
  { name: "Live Blackjack", type: "Live Tables" },
  { name: "Crazy Coin Flip", type: "Game Show" },
];

const evolutionGames: EvolutionGameCard[] = designEvolutionGames.map((game) => {
  const guide = guideRegistry.find(
    (entry) => getEvolutionGuideName(entry.title) === game.name
  );

  return {
    ...game,
    href: guide ? `/guides/${guide.slug}` : undefined,
    available: Boolean(guide),
  };
});

const editorialPrinciples = [
  {
    icon: BarChart3,
    title: "Deterministic rankings",
    body: "Every casino score is computed from a fixed rubric — licensing, payout speed, Evolution table coverage, and verified player feedback. No manual overrides.",
  },
  {
    icon: ScrollText,
    title: "Single source of truth",
    body: "Game stats — RTP, volatility, max win — are stored once and rendered everywhere. Numbers cannot drift between a guide, a hub, and a ranking.",
  },
  {
    icon: ShieldCheck,
    title: "Facts-only editorial",
    body: "We do not write copy designed to push deposits. Guides explain mechanics, maths, and trade-offs. Bonuses are listed, not celebrated.",
  },
  {
    icon: Sparkles,
    title: "Evolution-only scope",
    body: "We cover one provider, deeply. That focus is the entire reason this site exists — and the reason our analysis goes further than generic affiliates.",
  },
];

export default function HomePage() {
  const topCasinos = filterAndRank(getAllCasinos(), {}).slice(0, 3);

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

  return (
    <main className="bg-[hsl(var(--card))]">
      {/* HERO */}
      <section className="border-b border-[hsl(var(--border))]">
        <div className="mx-auto max-w-[1060px] px-4">
          <div className="pt-16 pb-14 md:pt-24 md:pb-20">
            <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-14 lg:gap-20">
              <div className="max-w-[40rem]">
                <p className="mb-6 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
                  Independent Editorial · Evolution Gaming
                </p>
                <h1 className="mb-6 text-[2.5rem] font-bold leading-[1.08] tracking-[-0.02em] md:text-[3rem] lg:text-[3.75rem]">
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

      {/* FEATURED GUIDES */}
      <section className="border-b border-[hsl(var(--border))]">
        <div className="mx-auto max-w-[1060px] px-4">
          <div className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Featured Guides"
              title="Editorial breakdowns of Evolution's biggest games"
              lead="Each guide unpacks the mechanics, maths and trade-offs — written for players who want to understand the game, not the marketing."
            />

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-3">
              {featuredGuides.map((guide) => (
                <GuideCard key={guide.title} guide={guide} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVOLUTION GAMES */}
      <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
        <div className="mx-auto max-w-[1060px] px-4">
          <div className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Evolution Games"
              title="One studio. Covered in full."
              lead="We focus exclusively on Evolution Gaming. Below is the working catalogue of games we cover — guides ship on a regular editorial schedule."
            />

            <ul className="m-0 grid list-none grid-cols-2 gap-px overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--border))] p-0 md:grid-cols-3 lg:grid-cols-4">
              {evolutionGames.map((game) => (
                <li key={game.name}>
                  {game.available && game.href ? (
                    <Link
                      href={game.href}
                      className="group block h-full bg-[hsl(var(--card))] px-5 py-5 transition-colors hover:bg-[hsl(var(--muted)/0.4)]"
                    >
                      <GameCell name={game.name} type={game.type} available />
                    </Link>
                  ) : (
                    <div className="h-full bg-[hsl(var(--card))] px-5 py-5">
                      <GameCell name={game.name} type={game.type} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CASINO RESEARCH */}
      <section className="border-b border-[hsl(var(--border))]">
        <div className="mx-auto max-w-[1060px] px-4">
          <div className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Casino Research"
              title="Where to play Evolution live tables"
              lead="A short, deliberately small ranking. We test payouts with real withdrawals and re-evaluate every quarter — see methodology below."
              action={{ label: "Full ranking", href: "/evolution-casinos" }}
            />

            <CasinoResearchCards casinos={topCasinos} />

            <p className="mt-6 max-w-[42rem] font-body text-xs text-[hsl(var(--muted-foreground))]">
              Rankings reflect overall Evolution experience — licensing, payout
              speed, table coverage, and verified player feedback. They are not
              influenced by commercial relationships.
            </p>
          </div>
        </div>
      </section>

      {/* EDITORIAL PRINCIPLES */}
      <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
        <div className="mx-auto max-w-[1060px] px-4">
          <div className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Editorial Principles"
              title="How EvoCasino is built"
              lead="The architecture of the site is the integrity of the site. These are the rules our rankings, guides and data follow — without exception."
            />

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--border))] md:grid-cols-2">
              {editorialPrinciples.map((principle) => {
                const Icon = principle.icon;

                return (
                  <div
                    key={principle.title}
                    className="bg-[hsl(var(--card))] p-6 md:p-7"
                  >
                    <Icon className="mb-4 h-4 w-4 text-[hsl(var(--primary))]" />
                    <h4 className="mb-2 font-heading !text-base !font-semibold text-[hsl(var(--foreground))]">
                      {principle.title}
                    </h4>
                    <p className="m-0 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                      {principle.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
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
                  border: "1px solid hsl(var(--border))",
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
          border: "1px solid hsl(var(--border))",
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

function getEvolutionGuideName(title: string) {
  return title.replace(/ on Evolution Live$/, "");
}

function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-[36rem]">
        <p className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
          {eyebrow}
        </p>
        <h2 className="mb-3 text-2xl font-semibold leading-snug tracking-[-0.02em] text-[hsl(var(--foreground))] md:text-3xl">
          {title}
        </h2>
        {lead && (
          <p className="m-0 text-[15px] leading-[1.75] text-[hsl(var(--muted-foreground))]">
            {lead}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-1.5 font-body text-sm font-medium text-[hsl(var(--primary))] transition-all hover:gap-2"
        >
          {action.label}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

function GuideCard({ guide }: { guide: FeaturedGuideCard }) {
  const inner = (
    <div className="flex h-full flex-col p-6 md:p-7">
      <p className="mb-3 font-body text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gold">
        {guide.category}
      </p>
      <h3 className="mb-3 font-heading text-xl font-semibold leading-tight tracking-[-0.02em] text-[hsl(var(--foreground))] md:text-2xl">
        {guide.title}
      </h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
        {guide.description}
      </p>
      <div className="flex items-center justify-between border-t border-[hsl(var(--border)/0.7)] pt-5">
        <div className="flex items-center gap-5">
          <div>
            <p className="mb-0.5 font-body text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              RTP
            </p>
            <p className="font-body text-[13px] font-semibold tabular-nums text-[hsl(var(--foreground))]">
              {guide.rtp}
            </p>
          </div>
          <div>
            <p className="mb-0.5 font-body text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Volatility
            </p>
            <p className="font-body text-[13px] font-semibold text-[hsl(var(--foreground))]">
              {guide.volatility}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 font-body text-[12.5px] font-medium text-[hsl(var(--primary))]">
          {guide.available ? "Read" : "Soon"}
          {guide.available && <ArrowUpRight className="h-3 w-3" />}
        </span>
      </div>
    </div>
  );

  if (!guide.available) {
    return <div className="bg-[hsl(var(--card))] opacity-75">{inner}</div>;
  }

  return (
    <Link
      href={guide.href}
      className="group block bg-[hsl(var(--card))] transition-colors hover:bg-[hsl(var(--muted)/0.4)]"
    >
      {inner}
    </Link>
  );
}

function CasinoResearchCards({ casinos }: { casinos: CasinoRow[] }) {
  return (
    <div>
      <ul className="m-0 list-none space-y-3 p-0">
        {casinos.map((casino, index) => {
          const rank = index + 1;
          const highlights = getCasinoHighlights(casino);

          return (
            <li
              key={casino.id}
              className="group rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--border))]"
            >
              <div className="hidden gap-x-6 px-6 py-5 md:grid md:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1.6fr)_auto] md:items-center">
                <span className="font-heading text-base font-medium tabular-nums text-[hsl(var(--muted-foreground)/0.6)]">
                  {rank}
                </span>

                <div className="min-w-0">
                  <h4 className="m-0 truncate font-heading text-[15px] font-semibold leading-tight text-[hsl(var(--foreground))]">
                    {casino.name}
                  </h4>
                </div>

                <div
                  className="min-w-0 border-l-2 pl-3"
                  style={{ borderLeftColor: "#D4A843" }}
                >
                  <p className="m-0 mb-2 font-body text-[13px] font-medium leading-snug text-[hsl(var(--foreground))]">
                    {getCasinoBonusSummary(casino)}
                  </p>
                  <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-1 p-0">
                    {highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-center gap-1.5 text-[12px] leading-snug text-[hsl(var(--muted-foreground))]"
                      >
                        <Check className="h-3 w-3 shrink-0 text-[hsl(var(--primary)/0.7)]" />
                        <span className="truncate">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="shrink-0">
                  <Link
                    href={`/casinos/${casino.slug}`}
                    className="inline-flex h-9 min-w-[128px] items-center justify-center gap-2 whitespace-nowrap rounded-md border border-[hsl(var(--border))] bg-transparent px-3 font-body text-xs font-medium text-[hsl(var(--primary))] ring-offset-[hsl(var(--background))] transition-colors hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2"
                  >
                    Visit Casino
                  </Link>
                </div>
              </div>

              <div className="space-y-3.5 p-5 md:hidden">
                <div className="flex items-start gap-3">
                  <span className="pt-0.5 font-heading text-sm font-medium tabular-nums text-[hsl(var(--muted-foreground)/0.7)]">
                    {rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="m-0 font-heading text-[15px] font-semibold leading-tight text-[hsl(var(--foreground))]">
                      {casino.name}
                    </h4>
                  </div>
                </div>

                <div
                  className="border-l-2 pl-3"
                  style={{ borderLeftColor: "#D4A843" }}
                >
                  <p className="m-0 font-body text-[13px] font-medium leading-snug text-[hsl(var(--foreground))]">
                    {getCasinoBonusSummary(casino)}
                  </p>

                  <ul className="m-0 mt-2 grid list-none grid-cols-1 gap-1.5 p-0">
                    {highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]"
                      >
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-[hsl(var(--primary)/0.8)]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/casinos/${casino.slug}`}
                  className="inline-flex h-9 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-[hsl(var(--border))] bg-transparent px-3 font-body text-xs font-medium text-[hsl(var(--primary))] ring-offset-[hsl(var(--background))] transition-colors hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2"
                >
                  Visit Casino
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function getCasinoBonusSummary(casino: CasinoRow) {
  return casino.bonuses?.headline ?? "Bonus details unavailable";
}

function getCasinoHighlights(casino: CasinoRow) {
  return [
    `${casino.evolution.shows.length} Evolution shows`,
    `${formatPayoutSpeed(casino.payouts.speed)} payouts`,
  ];
}

function formatPayoutSpeed(speed: CasinoRow["payouts"]["speed"]) {
  if (speed === "fast") {
    return "Fast";
  }

  if (speed === "avg") {
    return "Average";
  }

  return "Slower";
}

function GameCell({
  name,
  type,
  available,
}: {
  name: string;
  type: string;
  available?: boolean;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h4 className="font-heading text-[15px] font-semibold leading-tight tracking-[-0.02em] text-[hsl(var(--foreground))]">
          {name}
        </h4>
        {available && (
          <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--muted-foreground))] transition-colors group-hover:text-[hsl(var(--primary))]" />
        )}
      </div>
      <p className="mb-3 font-body text-[11.5px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
        {type}
      </p>
      <span
        className={`mt-auto font-body text-[10.5px] font-semibold uppercase tracking-widest ${
          available
            ? "text-[hsl(var(--primary))]"
            : "text-[hsl(var(--muted-foreground)/0.6)]"
        }`}
      >
        {available ? "Guide live" : "Coming soon"}
      </span>
    </div>
  );
}

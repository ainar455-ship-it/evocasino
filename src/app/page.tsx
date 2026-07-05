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

type BonusRow = { casino: CasinoRow; bonusScore: number };

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

  const bonusRows: BonusRow[] = getAllCasinos()
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
  const [featuredBonusRow, ...secondaryBonusRows] = bonusRows;

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

      {/* TOP EVOLUTION BONUSES */}
      <section className="border-b border-[hsl(var(--border))]">
        <div className="mx-auto max-w-[1060px] px-4">
          <div className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Evolution Bonuses"
              title="Current bonus offers"
              lead="Independent editorial summaries of the strongest Evolution casino bonus offers. Full bonus analysis and operator reviews are available on the dedicated bonuses page."
              action={{ label: "See all bonuses", href: "/evolution-bonuses" }}
            />

            {!featuredBonusRow ? (
              <p className="m-0 text-sm text-[hsl(var(--muted-foreground))]">
                No bonuses found in SSOT.
              </p>
            ) : (
              <div className="pt-1 md:pt-2">
                <FeaturedBonusCard row={featuredBonusRow} />

                {secondaryBonusRows.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {secondaryBonusRows.map((row, index) => (
                      <BonusRecommendationCard
                        key={row.casino.id}
                        row={row}
                        rank={index + 2}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
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

function FeaturedBonusCard({ row }: { row: BonusRow }) {
  const { casino, bonusScore } = row;
  const href = `/casinos/${casino.slug}`;
  const headline = getBonusHeadline(casino);

  return (
    <article className="relative mb-5 overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(45_40%_98%)] md:mb-6">
      <div className="absolute left-0 top-0 h-full w-[3px] bg-gold" aria-hidden="true" />
      <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8 md:px-8 md:py-8">
        <div className="flex min-w-0 gap-4 md:gap-6">
          <BonusLogoMark casino={casino} featured />
          <div className="min-w-0 flex-1">
            <p className="mb-2 font-body text-[10.5px] font-bold uppercase tracking-[0.18em] text-gold">
              Editor&apos;s Choice
            </p>
            <h3 className="mb-2 font-heading text-[17px] font-semibold leading-tight text-[hsl(var(--foreground))] md:text-[18.5px]">
              {casino.name}
            </h3>
            <p className="mb-3 max-w-[24ch] font-heading text-[22px] font-semibold leading-[1.12] tracking-tight text-[hsl(var(--foreground))] md:text-[26px]">
              {headline}
            </p>
            <p className="m-0 max-w-[36rem] text-[14px] leading-[1.65] text-[hsl(var(--muted-foreground))]">
              {getFeaturedBonusEditorialSummary(row)}
            </p>
            <p className="m-0 mt-3 font-body text-[11.5px] leading-snug text-[hsl(var(--muted-foreground)/0.72)]">
              {getFeaturedBonusMetadata(row, bonusScore)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:flex-col md:items-end md:justify-center md:border-l md:border-[hsl(var(--border)/0.7)] md:pl-7">
          <Link
            href={href}
            className="group/cta inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[hsl(var(--primary))] px-5 font-body text-sm font-bold text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--primary)/0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 md:min-w-[148px]"
          >
            View full review
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
          </Link>
          <Link
            href={href}
            className="inline-flex items-center gap-1 font-body text-[12.5px] font-medium text-[hsl(var(--primary))] transition-all hover:gap-1.5"
          >
            Read review
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function BonusRecommendationCard({
  row,
  rank,
}: {
  row: BonusRow;
  rank: number;
}) {
  const { casino } = row;
  const href = `/casinos/${casino.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex items-center gap-3 overflow-hidden rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card))] p-4 transition-colors duration-200 hover:border-[hsl(var(--gold)/0.3)] hover:bg-[hsl(var(--muted)/0.1)] md:gap-4 md:px-5 md:py-[1.125rem]"
    >
      <span
        className="absolute left-0 top-0 h-full w-[3px] bg-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      />

      <span className="w-5 shrink-0 font-heading text-[20px] font-semibold leading-none tabular-nums text-[hsl(var(--foreground)/0.3)] md:w-7 md:text-[22px]">
        {rank}
      </span>

      <BonusLogoMark casino={casino} />

      <div className="min-w-0 flex-1">
        <h4 className="font-heading text-[15.5px] font-semibold leading-tight text-[hsl(var(--foreground))] md:text-[16.5px]">
          {casino.name}
        </h4>
        <p className="mt-1 font-body text-[12px] font-semibold leading-snug text-[hsl(var(--gold)/0.86)] md:text-[12.5px]">
          {getBonusHeadline(casino)}
        </p>
        <p className="mt-1.5 text-[13px] leading-[1.45] text-[hsl(var(--muted-foreground))] md:text-[13.5px]">
          {getCompactBonusSummary(row)}
        </p>
      </div>

      <span className="hidden shrink-0 items-center gap-1.5 font-body text-[13.5px] font-semibold text-[hsl(var(--primary))] transition-all group-hover:gap-2 md:inline-flex">
        View review
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
      <ArrowRight className="h-5 w-5 shrink-0 text-[hsl(var(--primary))] transition-transform group-hover:translate-x-0.5 md:hidden" />
    </Link>
  );
}

function BonusLogoMark({
  casino,
  featured = false,
}: {
  casino: CasinoRow;
  featured?: boolean;
}) {
  const sizeClass = featured
    ? "h-12 w-12 text-base md:h-14 md:w-14 md:text-lg"
    : "h-10 w-10 text-[14px] md:h-11 md:w-11 md:text-[15px]";

  return (
    <span
      aria-hidden="true"
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-md bg-[hsl(var(--primary))] font-heading font-semibold text-[hsl(var(--primary-foreground))]`}
    >
      {getCasinoInitials(casino.name)}
    </span>
  );
}

function getCasinoInitials(name: string) {
  return name
    .split(/[^a-z0-9]+/i)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getBonusHeadline(casino: CasinoRow) {
  return casino.bonuses?.headline ?? "Bonus details unavailable";
}

function getFeaturedBonusEditorialSummary(row: BonusRow) {
  const { casino } = row;
  return `Highest-ranked current bonus entry from the production scoring model, balanced against ${casino.name}'s Evolution coverage and payout profile.`;
}

function getFeaturedBonusMetadata(row: BonusRow, bonusScore: number) {
  const { casino } = row;
  const lastVerified = casino.bonuses?.lastVerified;
  const verified = lastVerified ? ` · Last verified ${lastVerified}` : "";

  return `Bonus Quality Score ${bonusScore}/100 · Evolution Score ${casino.evolutionScore}${verified}`;
}

function getCompactBonusSummary(row: BonusRow) {
  const { casino, bonusScore } = row;
  return `Bonus score ${bonusScore}/100. ${formatPayoutSpeed(casino.payouts.speed)} payouts.`;
}

function BonusOfferCard({
  row,
}: {
  row: { casino: CasinoRow; bonusScore: number };
}) {
  const { casino, bonusScore } = row;
  const bonus = casino.bonuses;
  const href = `/casinos/${casino.slug}`;
  const headline = bonus?.headline ?? "Bonus details unavailable";
  const wagering =
    typeof bonus?.wageringX === "number"
      ? `${bonus.wageringX}x`
      : "Not listed in SSOT";
  const termsStatus = bonus?.termsUrl ? "Terms link available" : "Not listed in SSOT";
  const lastVerified = bonus?.lastVerified ?? "Not verified";
  const verdict = `Bonus Quality Score: ${bonusScore} · Evolution Score: ${casino.evolutionScore}.`;

  return (
    <article className="group rounded-lg border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--card))] transition-colors hover:border-[hsl(var(--border))]">
      <div className="hidden md:grid md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.15fr)_minmax(0,0.78fr)] md:items-stretch">
        <div className="min-w-0 px-7 py-7">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              {casino.name}
            </span>
            <span className="h-px w-4 bg-[hsl(var(--border))]" />
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground)/0.7)]">
              Welcome offer
            </span>
          </div>

          <h3 className="m-0 max-w-[20ch] font-heading !text-[26px] font-semibold !leading-[1.12] tracking-tight text-[hsl(var(--foreground))] lg:!text-[30px]">
            {headline}
          </h3>

          <div
            className="mt-5 border-l-2 pl-4"
            style={{ borderLeftColor: "hsl(var(--gold) / 0.7)" }}
          >
            <span className="mb-1.5 block font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              Editorial verdict
            </span>
            <p className="m-0 max-w-[34rem] text-[14px] font-medium leading-[1.55] text-[hsl(var(--foreground)/0.9)]">
              {verdict}
            </p>
          </div>

          <p className="m-0 mt-3 max-w-[34rem] text-[12.5px] leading-[1.6] text-[hsl(var(--muted-foreground))]">
            Last verified: {lastVerified}
          </p>
        </div>

        <div className="min-w-0 border-l border-[hsl(var(--border)/0.6)] px-7 py-7">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground)/0.7)]">
            Conditions
          </span>
          <dl className="m-0 mt-4 divide-y divide-[hsl(var(--border)/0.5)]">
            <BonusTermRow label="Offer detail" value={headline} emphasis />
            <BonusTermRow label="Bonus quality" value={`${bonusScore}/100`} />
            <BonusTermRow label="Wagering" value={wagering} />
            <BonusTermRow label="Terms" value={termsStatus} />
          </dl>
        </div>

        <aside className="flex flex-col rounded-r-lg border-l border-[hsl(var(--border)/0.6)] bg-[hsl(var(--muted)/0.22)] px-5 py-7">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--muted-foreground))]">
            Take action
          </span>
          <div className="mt-4 space-y-3">
            <Link
              href={href}
              className="group/cta inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[hsl(var(--primary))] px-4 py-2 font-body text-sm font-bold text-[hsl(var(--primary-foreground))] ring-offset-[hsl(var(--background))] transition-colors hover:bg-[hsl(var(--primary)/0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2"
            >
              View full review
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
            </Link>
            <Link
              href="/evolution-bonuses"
              className="inline-flex items-center gap-1.5 font-body text-[12.5px] font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
            >
              See all bonuses
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <p className="mt-auto border-t border-[hsl(var(--border)/0.5)] pt-6 font-body text-[12.5px] leading-[1.6] text-[hsl(var(--muted-foreground)/0.8)]">
            Ranked from production bonus facts and Evolution scoring.
          </p>
          <p className="mt-3 font-body text-[11px] tabular-nums text-[hsl(var(--muted-foreground)/0.6)]">
            18+ · T&Cs apply · Play responsibly
          </p>
        </aside>
      </div>

      <div className="space-y-4 px-4 py-4 md:hidden">
        <div>
          <div className="mb-2.5 flex items-center gap-2">
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              {casino.name}
            </span>
            <span className="h-px w-3 bg-[hsl(var(--border))]" />
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground)/0.7)]">
              Welcome offer
            </span>
          </div>
          <h3 className="m-0 max-w-[20ch] font-heading !text-[22px] font-semibold !leading-[1.15] tracking-tight text-[hsl(var(--foreground))]">
            {headline}
          </h3>

          <div
            className="mt-4 border-l-2 pl-3"
            style={{ borderLeftColor: "hsl(var(--gold) / 0.7)" }}
          >
            <span className="mb-1 block font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
              Editorial verdict
            </span>
            <p className="m-0 text-[13px] font-medium leading-[1.55] text-[hsl(var(--foreground)/0.9)]">
              {verdict}
            </p>
          </div>
        </div>

        <dl className="m-0 divide-y divide-[hsl(var(--border)/0.5)] border-t border-[hsl(var(--border)/0.6)] pt-1">
          <BonusTermRow label="Offer detail" value={headline} emphasis />
          <BonusTermRow label="Bonus quality" value={`${bonusScore}/100`} />
          <BonusTermRow label="Wagering" value={wagering} />
          <BonusTermRow label="Terms" value={termsStatus} />
        </dl>

        <p className="m-0 border-t border-[hsl(var(--border)/0.6)] pt-3 font-body text-[11.5px] leading-[1.55] text-[hsl(var(--muted-foreground)/0.85)]">
          Last verified: {lastVerified}
        </p>

        <div className="flex items-center gap-3 pt-1">
          <Link
            href={href}
            className="inline-flex h-9 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-[hsl(var(--primary))] px-3 font-body text-xs font-bold text-[hsl(var(--primary-foreground))] ring-offset-[hsl(var(--background))] transition-colors hover:bg-[hsl(var(--primary)/0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2"
          >
            View full review
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/evolution-bonuses"
            className="inline-flex shrink-0 items-center gap-1 font-body text-[12px] font-medium text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
          >
            Bonuses
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <p className="m-0 font-body text-[10px] tabular-nums text-[hsl(var(--muted-foreground)/0.6)]">
          18+ · T&Cs apply · Play responsibly
        </p>
      </div>
    </article>
  );
}

function BonusTermRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="py-2.5 first:pt-0 last:pb-0">
      <dt className="m-0 mb-1 font-body text-[9.5px] uppercase tracking-[0.16em] text-[hsl(var(--muted-foreground)/0.7)]">
        {label}
      </dt>
      <dd
        className={`m-0 font-body leading-[1.4] ${
          emphasis
            ? "text-[15.5px] font-semibold tracking-tight text-[hsl(var(--foreground))]"
            : "text-[13.5px] text-[hsl(var(--foreground)/0.9)]"
        }`}
      >
        {value}
      </dd>
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

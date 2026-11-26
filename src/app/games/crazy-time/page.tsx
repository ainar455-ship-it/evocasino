import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle } from "lucide-react";

import { canonicalMetadata } from "@/app/seo";
import { Page, Container } from "@/components/layout/PageContainer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import type { PaymentMethod } from "@/data/evocasino/schema";
import { filterAndRank, getAllCasinos, type CasinoRow } from "@/lib/evo/load";

export const metadata: Metadata = canonicalMetadata("/games/crazy-time");

const game = {
  name: "Crazy Time",
  provider: "Evolution",
  type: "Game Show",
  rtp: "96.08%",
  volatility: "Very High",
  released: "2020",
  blurb:
    "Evolution's flagship money-wheel game show - four bonus rounds, top multipliers in the tens of thousands, and one of the most recognisable live casino titles in the catalogue.",
  guideHref: "/guides/crazy-time",
};

const glance: Array<[string, string]> = [
  ["Provider", game.provider],
  ["Type", game.type],
  ["RTP", game.rtp],
  ["Volatility", game.volatility],
  ["Released", game.released],
];

const paymentLabels: Record<PaymentMethod, string> = {
  ozow: "Ozow",
  sid: "SiD",
  eft: "EFT",
  visa: "Visa",
  mastercard: "Mastercard",
  bitcoin: "Bitcoin",
  usdt: "USDT",
};

type RelatedGame = {
  name: string;
  type: string;
  description: string;
  href: string;
  cta: "Open hub" | "Open guide";
};

const relatedGames: RelatedGame[] = [
  {
    name: "Lightning Roulette",
    type: "Live Roulette",
    href: "/games/lightning-roulette",
    cta: "Open hub",
    description: "Lightning multipliers and Evolution roulette pacing in a short game hub.",
  },
  {
    name: "Monopoly Live",
    type: "Game Show",
    href: "/games/monopoly-live",
    cta: "Open hub",
    description: "Bonus boards, 4 Rolls and Evolution's board-game inspired live show.",
  },
  {
    name: "Crazy Coin Flip",
    type: "Game Show",
    href: "/guides/crazy-coin-flip",
    cta: "Open guide",
    description: "Guide coverage for Evolution's coin-flip game show and bonus mechanics.",
  },
  {
    name: "Dream Catcher",
    type: "Money Wheel",
    href: "/guides/dream-catcher",
    cta: "Open guide",
    description: "Guide coverage for Evolution's classic live money wheel format.",
  },
];

const editorialContainer = "max-w-[1060px] px-4";

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ScoreRing({ score, size = 64 }: { score: number; size?: number }) {
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.max(0, Math.min(1, score / 100));
  const dash = circumference * percent;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--gold))"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${dash} ${circumference - dash}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-[16px] font-semibold text-foreground tabular-nums leading-none">
          {score}
        </span>
        <span className="mt-0.5 text-[8px] font-body uppercase tracking-[0.16em] text-muted-foreground tabular-nums">
          / 100
        </span>
      </div>
    </div>
  );
}

function factsFor(casino: CasinoRow): string[] {
  const facts = [
    "Crazy Time listed in Evolution coverage",
    "Evolution live games available",
    `${casino.payments.methods.length} payment methods listed`,
    `Mobile experience ${casino.mobile.experience}/5`,
  ];

  if (casino.evolution.tablesApprox) {
    facts.push(`Approx. ${casino.evolution.tablesApprox} Evolution tables listed`);
  }

  return facts;
}

function OperatorCard({ casino, rank }: { casino: CasinoRow; rank: number }) {
  const href = `/casinos/${casino.slug}`;
  const facts = factsFor(casino);
  const paymentSummary = casino.payments.methods
    .slice(0, 3)
    .map((method) => paymentLabels[method] ?? method.toUpperCase())
    .join(", ");

  return (
    <article className="group relative bg-card border border-border/60 rounded-lg transition-all duration-200 hover:border-primary/40 hover:shadow-[0_8px_24px_-20px_hsl(var(--primary)/0.35)]">
      <div className="hidden md:grid md:grid-cols-[minmax(0,2.4fr)_minmax(0,0.8fr)] md:items-stretch">
        <div className="pl-5 pr-5 py-3.5 min-w-0 relative">
          <span className="absolute top-3.5 left-5 font-heading text-[20px] font-semibold text-foreground/85 tabular-nums leading-none">
            {rank}
          </span>
          <div className="pl-8">
            <div className="text-[10px] font-body font-semibold uppercase tracking-[0.18em] text-gold mb-1">
              SSOT ranked for Crazy Time
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-white border-[3px] border-gold flex items-center justify-center shadow-sm">
                <span className="font-heading text-[13px] font-semibold tracking-wide text-primary">
                  {initialsFor(casino.name)}
                </span>
              </div>
              <h3 className="text-[18px] font-heading font-semibold text-foreground m-0 leading-[1.15] tracking-tight">
                <Link href={href} className="hover:text-primary transition-colors">
                  {casino.name}
                </Link>
              </h3>
            </div>

            <div className="mt-2.5 text-[10px] font-body font-semibold uppercase tracking-[0.18em] text-gold">
              Why for {game.name}
            </div>
            <ul className="mt-1 m-0 p-0 list-none max-w-[34rem] space-y-0.5">
              {facts.slice(0, 2).map((fact, index) => (
                <li
                  key={fact}
                  className={`flex items-baseline gap-2.5 font-body leading-snug ${
                    index === 0 ? "text-[12.5px] text-foreground" : "text-[12px] text-foreground/70"
                  }`}
                >
                  <span
                    className={`font-heading tabular-nums shrink-0 text-[10px] ${
                      index === 0 ? "text-gold" : "text-muted-foreground/60"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] font-body text-foreground/65">
              <span>
                Score <span className="text-foreground/80">{casino.evolutionScore}/100</span>
              </span>
              <span aria-hidden="true" className="text-muted-foreground/30">
                -
              </span>
              <span>
                Mobile <span className="text-foreground/80">{casino.mobile.experience}/5</span>
              </span>
              <span aria-hidden="true" className="text-muted-foreground/30">
                -
              </span>
              <span>
                Payments <span className="text-foreground/80">{paymentSummary}</span>
              </span>
            </div>
          </div>
        </div>

        <aside className="relative border-l border-border/60 bg-muted/[0.22] rounded-r-lg">
          <div className="px-4 py-3.5 flex flex-col h-full justify-center items-center gap-3">
            <ScoreRing score={casino.evolutionScore} />
            <div className="space-y-1.5 w-full">
              <Button asChild className="group/cta h-9 w-full text-xs">
                <Link href={href}>
                  Read Review
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </Link>
              </Button>
              <Link
                href={href}
                className="block text-center text-[11.5px] font-body font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Review details
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <div className="md:hidden px-4 py-3 space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[9.5px] font-body font-semibold uppercase tracking-[0.16em] text-gold mb-1 truncate">
              SSOT ranked for Crazy Time
            </div>
            <div className="flex items-center gap-2.5">
              <span className="font-heading text-[18px] font-semibold text-foreground/85 tabular-nums leading-none">
                {rank}
              </span>
              <div className="h-9 w-9 shrink-0 rounded-lg bg-white border-[3px] border-gold flex items-center justify-center shadow-sm">
                <span className="font-heading text-[12px] font-semibold tracking-wide text-primary">
                  {initialsFor(casino.name)}
                </span>
              </div>
              <h3 className="text-[16px] font-heading font-semibold text-foreground m-0 leading-tight">
                {casino.name}
              </h3>
            </div>
          </div>
          <ScoreRing score={casino.evolutionScore} size={56} />
        </div>

        <div>
          <p className="text-[9.5px] font-body font-semibold uppercase tracking-[0.16em] text-gold mb-1">
            Why for {game.name}
          </p>
          <ul className="m-0 p-0 list-none space-y-0.5">
            {facts.slice(0, 3).map((fact) => (
              <li key={fact} className="flex items-start gap-1.5 text-[12px] text-foreground/75 leading-snug">
                <CheckCircle className="h-3 w-3 text-gold mt-[3px] shrink-0" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 pt-0.5">
          <Button asChild className="flex-1 h-9 text-xs">
            <Link href={href}>Read Review</Link>
          </Button>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-[12px] font-body font-medium text-muted-foreground hover:text-primary transition-colors shrink-0"
          >
            Review details <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CrazyTimePage() {
  const rows = filterAndRank(getAllCasinos(), { show: "crazy-time" });
  const topCasinos = rows.slice(0, 3);

  return (
    <Page>
      <section className="border-b border-border">
        <Container className={editorialContainer}>
          <div className="pt-10 md:pt-14 pb-10 md:pb-12">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Evolution Games", href: "/evolution-games" },
                { label: game.name },
              ]}
            />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] gap-8 md:gap-12 items-start">
              <div className="min-w-0 max-w-[42rem]">
                <p className="text-[11px] font-body font-semibold tracking-[0.18em] uppercase text-gold mb-4">
                  Game Overview - {game.type}
                </p>
                <h1 className="mb-5">
                  <span className="text-foreground">{game.name}</span>
                </h1>
                <p className="text-[16px] md:text-[17px] text-muted-foreground leading-[1.7] m-0 max-w-[38rem]">
                  {game.blurb}
                </p>

                <div className="mt-7">
                  <Link
                    href={game.guideHref}
                    className="inline-flex items-center gap-2 text-[13.5px] font-body font-semibold text-primary hover:gap-3 transition-all"
                  >
                    <BookOpen className="h-4 w-4" />
                    Read the full {game.name} guide
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <aside className="bg-card border border-border/70 rounded-lg p-6 md:sticky md:top-24">
                <p className="text-[10.5px] font-body font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  At a glance
                </p>
                <dl className="m-0 space-y-2.5">
                  {glance.map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
                      <dt className="text-[12px] font-body text-muted-foreground">{label}</dt>
                      <dd className="text-[13.5px] font-body font-semibold text-foreground tabular-nums m-0 text-right">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-muted/20">
        <Container className={editorialContainer}>
          <div className="py-12 md:py-14">
            <div className="mb-7 flex items-end justify-between gap-6 flex-wrap">
              <div className="max-w-[36rem]">
                <p className="text-[11px] font-body font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-2">
                  Where to play
                </p>
                <h2 className="mb-2 text-[22px] md:text-[24px]">Top operators carrying {game.name}</h2>
                <p className="text-[14px] text-muted-foreground leading-[1.7] m-0">
                  Ranked from EvoCasino's production casino data using Evolution coverage, mobile experience, payment information and published operator facts.
                </p>
              </div>
              <Link
                href="/how-we-rank"
                className="text-[13px] font-body font-medium text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
              >
                Full methodology <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {topCasinos.length === 0 ? (
              <p className="text-sm text-muted-foreground">No casinos found for Crazy Time.</p>
            ) : (
              <div className="space-y-4">
                {topCasinos.map((casino, index) => (
                  <OperatorCard key={casino.slug} casino={casino} rank={index + 1} />
                ))}
              </div>
            )}

            <p className="mt-5 text-[11.5px] text-muted-foreground">
              Operator cards are generated from EvoCasino's production SSOT ranking data. Full evaluation criteria are on{" "}
              <Link href="/how-we-rank" className="text-primary hover:underline underline-offset-4">
                How we rank
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className={editorialContainer}>
          <div className="py-12 md:py-14">
            <p className="text-[11px] font-body font-semibold tracking-[0.18em] uppercase text-muted-foreground mb-2">
              Related games
            </p>
            <h2 className="mb-6 text-[22px] md:text-[24px]">More from the Evolution catalogue</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border list-none p-0 m-0">
              {relatedGames.map((related) => (
                <li key={related.name}>
                  <Link href={related.href} className="group flex h-full flex-col bg-card p-5 transition-colors hover:bg-muted/40">
                    <p className="text-[10px] font-body font-semibold tracking-[0.18em] uppercase text-gold mb-1.5">
                      {related.type}
                    </p>
                    <h3 className="text-[15px] font-heading font-semibold text-foreground mb-2 leading-tight">
                      {related.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed m-0 flex-1">
                      {related.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-body font-medium text-primary">
                      {related.cta} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </Page>
  );
}

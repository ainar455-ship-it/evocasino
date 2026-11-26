import type { Metadata } from "next";
import Link from "next/link";
import CrazyTimeCalculator from "@/components/tools/CrazyTimeCalculator";
import { SPOTS, SOURCE_URL, WHEEL_SEGMENTS } from "@/lib/tools/crazyTimeMath";
import { canonicalMetadata, SITE_URL } from "@/app/seo";

const PATH = "/tools/crazy-time-calculator";

export const metadata: Metadata = {
  title: "Crazy Time Calculator – Odds, RTP & Expected Cost per Bet | EvoCasino",
  description:
    "Enter your Crazy Time bets and see the chance of a hit, the RTP of your bet pattern, the expected cost per spin and the odds of each bonus round over a session. Based on Evolution's official figures.",
  ...canonicalMetadata(PATH),
};

const pct = (x: number) => `${(x * 100).toFixed(2)}%`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Crazy Time Calculator",
  url: `${SITE_URL}${PATH}`,
  applicationCategory: "CalculatorApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description:
    "Calculates hit chance, stake-weighted RTP, expected cost and bonus-round odds for Evolution's Crazy Time from official wheel and RTP figures.",
};

export default function CrazyTimeCalculatorPage() {
  return (
    <main className="mx-auto w-full max-w-[1060px] px-4 py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-[12px] text-muted-foreground mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link> ›{" "}
        <Link href="/guides/crazy-time" className="hover:underline">Crazy Time guide</Link> › Calculator
      </nav>

      <div className="text-[11px] font-body font-semibold tracking-[0.18em] uppercase text-gold mb-3">Free tool</div>
      <h1 className="text-[34px] md:text-[42px] font-heading font-semibold leading-[1.1] tracking-tight m-0 mb-4">
        Crazy Time calculator
      </h1>
      <p className="text-[16px] md:text-[17px] text-muted-foreground leading-[1.7] m-0 mb-8 max-w-[44rem]">
        Every Crazy Time bet spot has its own odds and its own return to player. Enter the bets you would place and
        see what they mean in numbers: how often one of your spots lands, the theoretical RTP of your whole bet
        pattern, what a session costs on average, and how likely you are to see each bonus round. The figures come
        from Evolution&apos;s official game rules.
      </p>

      <CrazyTimeCalculator />

      <section className="mt-10" aria-labelledby="ct-table">
        <h2 id="ct-table" className="text-[24px] font-heading font-semibold m-0 mb-2">
          Crazy Time odds and RTP by bet spot
        </h2>
        <p className="text-[14px] text-muted-foreground m-0 mb-4 max-w-[44rem]">
          The main wheel has {WHEEL_SEGMENTS} segments. The chance of each result is simply its number of segments
          divided by {WHEEL_SEGMENTS}. RTP figures are Evolution&apos;s theoretical values and already include Top
          Slot multipliers and bonus-round outcomes.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--card))]">
          <table className="w-full text-[14px] border-collapse">
            <thead>
              <tr className="text-left text-muted-foreground text-[12px]">
                <th className="py-3 px-4 font-semibold">Bet spot</th>
                <th className="py-3 px-4 font-semibold">Segments</th>
                <th className="py-3 px-4 font-semibold">Chance per spin</th>
                <th className="py-3 px-4 font-semibold">Base payout</th>
                <th className="py-3 px-4 font-semibold">RTP</th>
                <th className="py-3 px-4 font-semibold">House edge</th>
              </tr>
            </thead>
            <tbody>
              {SPOTS.map((s) => (
                <tr key={s.id} className="border-t border-[hsl(var(--border)/0.6)]">
                  <td className="py-2.5 px-4 font-semibold">{s.label}</td>
                  <td className="py-2.5 px-4 tabular-nums">{s.segments}</td>
                  <td className="py-2.5 px-4 tabular-nums">{pct(s.segments / WHEEL_SEGMENTS)}</td>
                  <td className="py-2.5 px-4">{s.payout !== null ? `${s.payout} to 1` : "Bonus game"}</td>
                  <td className="py-2.5 px-4 tabular-nums">{pct(s.rtp)}</td>
                  <td className="py-2.5 px-4 tabular-nums">{pct(1 - s.rtp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[12px] text-muted-foreground mt-3 mb-0">
          Source:{" "}
          <a href={SOURCE_URL} className="underline" rel="noopener">
            Evolution, Crazy Time game rules
          </a>{" "}
          (published by Loto-Québec). Last checked 26 November 2026. Operators can only offer Evolution&apos;s
          published configuration, but always check the help screen inside the game at your casino.
        </p>
      </section>

      <section className="mt-10 max-w-[44rem]" aria-labelledby="ct-read">
        <h2 id="ct-read" className="text-[24px] font-heading font-semibold m-0 mb-3">How to read the numbers</h2>
        <div className="space-y-4 text-[15px] leading-[1.7]">
          <p className="m-0">
            <strong>Number 1 has the best RTP, the Pachinko spot the worst.</strong> The gap is 1.75 percentage points:
            over 1,000 units wagered, that is about 17.50 units of extra expected cost for choosing Pachinko over
            Number 1. You pay for the chance of large bonus multipliers with a lower long-run return.
          </p>
          <p className="m-0">
            <strong>Covering more spots does not reduce the house edge.</strong> Betting on every spot makes it
            certain that one of your spots lands, but your stake-weighted RTP stays between 94.33% and 96.08%, so the
            expected cost simply rises with the total stake.
          </p>
          <p className="m-0">
            <strong>Bonus rounds come rarely and unevenly.</strong> Any bonus lands on about one spin in six, but the
            Crazy Time bonus itself is one segment out of 54. Even over 100 spins there is about a 15% chance of
            not seeing it at all.
          </p>
          <p className="m-0">
            <strong>No strategy changes these numbers.</strong> Patterns, &ldquo;due&rdquo; bonuses and tracker
            statistics do not affect the next spin. Treat Crazy Time as paid entertainment and set a budget before
            you play. 18+ only.
          </p>
        </div>
        <p className="text-[15px] mt-6 mb-0">
          New to the game? Read the{" "}
          <Link href="/guides/crazy-time" className="text-primary underline underline-offset-4">
            full Crazy Time guide
          </Link>{" "}
          for rules and bonus rounds, or see{" "}
          <Link href="/games/crazy-time" className="text-primary underline underline-offset-4">
            where to play Crazy Time
          </Link>
          .
        </p>
      </section>
    </main>
  );
}

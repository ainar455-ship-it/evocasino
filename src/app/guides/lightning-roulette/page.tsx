import type { Metadata } from "next";
import { guideRegistry, GUIDE_H1_SUFFIX } from "@/lib/guides/guideRegistry";
import { evoBreadcrumbsGuide, webPageJsonLd } from "@/lib/seo/jsonld";
import { filterAndRank, getAllCasinos, type CasinoRow } from "@/lib/evo/load";
import type { EvoCasinosFilters } from "@/lib/evo/load";
import type { EvolutionShow, PaymentMethod, PayoutSpeed } from "@/data/evocasino/schema";
import { canonicalMetadata } from "@/app/seo";
import GuidePage from "@/components/guide/GuidePage";
import type { GuideCasino } from "@/components/guide/GuideCasinoCards";
import { lightningRouletteGuide } from "@/data/guides/lightningRoulette";

export const metadata: Metadata = {
  title: "Lightning Roulette (Evolution) - Rules, Multipliers & RTP Guide",
  description:
    "Learn how Lightning Roulette works, including Lightning Numbers, RTP, roulette rules and SSOT-ranked Evolution casinos that support Lightning Roulette.",
  ...canonicalMetadata("/guides/lightning-roulette"),
};

function getGuide(slug: string) {
  const g = guideRegistry.find((x) => x.slug === slug);
  if (!g) throw new Error(`Guide registry missing entry for slug: ${slug}`);
  return g;
}

const paymentLabels: Record<PaymentMethod, string> = {
  ozow: "Ozow",
  sid: "SiD",
  eft: "EFT",
  visa: "Visa",
  mastercard: "Mastercard",
  bitcoin: "Bitcoin",
  usdt: "USDT",
};

const payoutLabels: Record<PayoutSpeed, string> = {
  fast: "Fast payout-policy field",
  avg: "Average payout-policy field",
  slow: "Slower payout-policy field",
};

function toGuideCasino(casino: CasinoRow, index: number): GuideCasino {
  const payments = casino.payments.methods.map((method) => paymentLabels[method] ?? method.toUpperCase());
  const licensing = casino.license ? `${casino.license} licensing signal` : "Licensing signals reviewed";
  const tableCoverage = casino.evolution.tablesApprox
    ? `Approx. ${casino.evolution.tablesApprox} Evolution tables listed`
    : "Evolution live casino coverage listed";

  return {
    rank: index + 1,
    name: casino.name,
    scoreLabel: `Evolution Score ${casino.evolutionScore}/100`,
    bonus: casino.bonuses?.headline ?? "Offer details depend on current operator terms",
    facts: [
      "Lightning Roulette listed in Evolution coverage",
      licensing,
      tableCoverage,
      `Mobile experience ${casino.mobile.experience}/5`,
      payoutLabels[casino.payouts.speed],
      `${payments.length} payment methods listed`,
    ],
    payments,
    ctaLabel: "Read Review",
    href: `/casinos/${casino.slug}`,
  };
}

const guide = getGuide("lightning-roulette");

export default function LightningRouletteGuidePage() {
  const h1 = `${guide.title}${GUIDE_H1_SUFFIX}`;

  const show = guide.intent.startsWith("show:")
    ? (guide.intent.slice("show:".length) as EvolutionShow)
    : undefined;

  const filters: EvoCasinosFilters = { show };
  const rows = filterAndRank(getAllCasinos(), filters);
  const casinoCards = rows.slice(0, 3).map(toGuideCasino);

  const pageGuide = {
    ...lightningRouletteGuide,
    title: h1,
    sections: lightningRouletteGuide.sections.map((section) =>
      section.id === "best-casinos"
        ? {
            ...section,
            casinos: casinoCards,
          }
        : section
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd({
              path: `/guides/${guide.slug}`,
              name: h1,
              description:
                "How to play Lightning Roulette on Evolution Live, including Lightning Numbers, RTP, mobile play and SSOT-derived casino review links.",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(evoBreadcrumbsGuide(guide.title, guide.slug)) }}
      />

      <GuidePage guide={pageGuide} />
    </>
  );
}

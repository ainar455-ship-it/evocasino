import { ClaimSource, CasinoPageVM } from "@/data/types/casino";
import { casinosBySlug } from "@/data/content/casinos";

export function getCasinoPageData(slug: string): CasinoPageVM {
  // Check if we have a valid casino object
  const casino = casinosBySlug[slug];

  if (!casino) {
    throw new Error(`Casino with slug "${slug}" not found`);
  }

  const sourceTag: ClaimSource | undefined = casino.sources?.bonusTerms;

  return {
    seo: {
      title: `${casino.name} Review 2026 | Free Spins, Bonuses & Casino Ratings`,
      description: `Complete ${casino.name} review with free spins, bonuses, payment methods, and real player experiences. ${casino.quickTake.substring(0, 150)}...`,
      canonical: `/casinos/${casino.slug}`,
    },
    // New locked component view models
    reviewHero: {
      name: casino.name,
      logo: casino.logo,
      bonusHeadline: casino.offer.title,
      trustBadges: [
        "Curacao Licensed",
        "Secure SSL",
        "NRGP Certified",
        "Verified",
      ],
      primaryCta: casino.cta,
      metaLine: `Established ${casino.year} • ZAR Supported`,
    },
    blueCTACard: {
      logo: casino.logo,
      casinoName: casino.name,
      bonusTitle: casino.offer.title,
      bonusSummary: casino.offer.summary,
      promoCode: casino.offer.promoCode,
      verifiedDate: casino.verifiedDate,
      primaryCta: casino.cta,
    },
    starRating: casino.rating
      ? {
          rating: casino.rating.overall,
          reviewCount: casino.rating.reviewCount,
          breakdown: casino.rating.breakdown,
        }
      : undefined,
    keyFacts: {
      facts: {
        license: casino.facts.license || "Curacao eGaming",
        minDeposit: casino.facts.minDeposit || "R10",
        wagering: casino.offer.wagering || "35x",
        verifiedDate: casino.verifiedDate,
      },
    },
    bonusCard: {
      title: casino.offer.title,
      summary: casino.offer.summary,
      promoCode: casino.offer.promoCode,
      wagering: casino.offer.wagering || "35x",
      verifiedOn: casino.verifiedDate,
      primaryCta: casino.cta,
      sourceTag,
    },
    prosAndCons: {
      pros: casino.pros,
      cons: casino.cons,
    },
    payments: {
      methods: casino.paymentMethods,
      note: "All transactions in ZAR. Instant EFT and Ozow are fastest for SA players.",
    },
    safety: {
      title: "Is Jabulabets Casino Safe?",
      summary: casino.safety.summary,
      bullets: casino.safety.bullets,
      collapsed: true,
    },
    // Legacy view models (for backward compatibility during transition)
    paymentMethods: {
      methods: casino.paymentMethods,
      note: "All transactions in ZAR. Instant EFT and Ozow are fastest for SA players.",
    },
    hero: {
      name: casino.name,
      logo: casino.logo,
      offerTitle: casino.offer.title,
      lastUpdated: casino.lastUpdated,
      primaryCta: casino.cta,
      secondaryCta: {
        label: "Read Full Review",
        href: "#review-content",
      },
      trustBadges: [
        { label: "Curacao Licensed" },
        { label: "Secure SSL" },
        { label: "NRGP Certified" },
        { label: "Verified" },
      ],
      metaLine: `Established ${casino.year} • ZAR Supported`,
    },
    topBonusCard: {
      id: `${casino.slug}-welcome`,
      logo: casino.logo,
      title: casino.offer.title,
      summary: casino.offer.summary,
      promoCode: casino.offer.promoCode,
      wagering: casino.offer.wagering,
      verifiedOn: casino.lastUpdated,
      primaryCta: casino.cta,
      noCodeNeeded: !casino.offer.promoCode,
    },
    quickTake: {
      title: "Quick Take",
      text: casino.quickTake,
      readMoreAnchor: "read-more-details",
    },
    keyInfoChips: {
      chips: [
        { label: "License", value: casino.facts.license || "Curacao eGaming" },
        { label: "Min Deposit", value: casino.facts.minDeposit || "R10" },
        { label: "Payout Speed", value: casino.facts.payoutSpeed || "24 hours" },
        { label: "Available In", value: casino.facts.availableIn || "ZA Region" },
      ],
      paymentIcons: casino.paymentMethods.map((m: { name: string }) => ({ name: m.name })),
    },
    gamesAndProviders: {
      providers: casino.providers,
      games: casino.games,
    },
    safetyLegacy: {
      title: "Is Jabulabets Casino Safe?",
      summary: casino.safety.summary,
      bullets: casino.safety.bullets,
    },
    howToClaimBonus: {
      title: "How to Claim Your Jabulabets Bonus",
      intro:
        "Follow these simple steps to claim your 200% first deposit bonus and 200 free spins at Jabulabets Casino. The entire process takes less than 5 minutes.",
      steps: casino.howToClaim,
    },
    reviewContent: {
      id: `${casino.slug}-review`,
      sections: casino.reviewContent.sections,
    },
    finalCta: {
      title: `Ready to Play at ${casino.name}?`,
      primaryCta: casino.cta,
      secondaryLink: {
        label: "Browse Free Spins",
        href: "/bonuses/free-spins",
      },
      disclaimer:
        "18+ only. Play responsibly. T&Cs apply. This site contains affiliate links.",
    },
    relatedCasinos: {
      items: casino.relatedSlugs
        ? casino.relatedSlugs.map((relatedSlug: string) => ({
            slug: relatedSlug,
            name: casinosBySlug[relatedSlug]?.name || relatedSlug,
            href: `/casinos/${relatedSlug}`,
            offerTitle: casinosBySlug[relatedSlug]?.offer.title,
            logo: casinosBySlug[relatedSlug]?.logo,
          }))
        : [],
    },
  };
}
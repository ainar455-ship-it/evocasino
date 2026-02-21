// Casino data model - Phase 2 casino review template

export type ClaimSource = 'operator' | 'affiliate_feed' | 'verified_manual';

export type Casino = {
  slug: string;
  name: string;
  year?: number;
  affiliateLink?: string;
  logo: { src: string; alt: string };
  offer: {
    title: string;
    summary: string;
    wagering?: string;
    promoCode?: string;
  };
  cta: { label: string; href: string };
  quickTake: string;
  facts: {
    minDeposit?: string;
    payoutSpeed?: string;
    license?: string;
    availableIn?: string;
  };
  paymentMethods: { name: string; icon?: string }[];
  pros: string[];
  cons: string[];
  providers: string[];
  games: string[];
  safety: {
    summary: string;
    bullets?: string[];
  };
  howToClaim: {
    step: number;
    title: string;
    text: string;
  }[];
  reviewContent: {
    sections: {
      heading: string;
      body: string;
    }[];
  };
  relatedSlugs?: string[];
  lastUpdated: string;

  // Source tracking for claims (required for data integrity, but can be set with defaults)
  verifiedDate: string; // ISO date (for when the review was verified)
  sources: {
    license?: ClaimSource;
    payoutSpeed?: ClaimSource;
    bonusTerms?: ClaimSource;
    supportLocation?: ClaimSource;
    gameCount?: ClaimSource;
  };
  unverified?: string[]; // List of claim keys that need verification

  // Rating fields
  rating?: {
    overall: number; // 0-5
    reviewCount?: number;
    breakdown?: {
      label: string;
      score: number;
    }[];
  };
};

// CasinoPageVM - What UI components consume
export type CasinoPageVM = {
  seo: { title: string; description: string; canonical: string };

  // New locked components (Phase 2)
  reviewHero: {
    name: string;
    logo: { src: string; alt: string };
    bonusHeadline: string;
    trustBadges: string[];
    primaryCta: { label: string; href: string };
    metaLine?: string;
  };
  blueCTACard: {
    logo: { src: string; alt: string };
    casinoName: string;
    bonusTitle: string;
    bonusSummary: string;
    promoCode?: string;
    verifiedDate: string;
    primaryCta: { label: string; href: string };
  };
  starRating?: {
    rating: number;
    reviewCount?: number;
    breakdown?: {
      label: string;
      score: number;
    }[];
  };
  keyFacts: {
    facts: {
      license: string;
      minDeposit: string;
      wagering: string;
      verifiedDate: string;
    };
  };
  bonusCard: {
    title: string;
    summary: string;
    promoCode?: string;
    wagering: string;
    verifiedOn: string;
    primaryCta: { label: string; href: string };
    sourceTag?: 'operator' | 'affiliate_feed' | 'verified_manual';
  };
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  payments: {
    methods: { name: string; icon?: string }[];
    note?: string;
  };
  safety: {
    title: string;
    summary: string;
    bullets?: string[];
    collapsed?: boolean;
  };

  // Legacy view models (for backward compatibility during transition)
  hero: {
    name: string;
    logo: { src: string; alt: string };
    offerTitle: string;
    lastUpdated: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    trustBadges: { label: string }[];
    metaLine?: string;
  };
  topBonusCard: {
    id: string;
    logo: { src: string; alt: string };
    title: string;
    summary: string;
    promoCode?: string;
    wagering?: string;
    verifiedOn: string;
    primaryCta: { label: string; href: string };
    noCodeNeeded: boolean;
  };
  quickTake: {
    title: string;
    text: string;
    readMoreAnchor: string;
  };
  keyInfoChips: {
    chips: { label: string; value: string }[];
    paymentIcons?: { name: string; icon?: string }[];
  };
  paymentMethods: {
    methods: { name: string; icon?: string }[];
    note?: string;
  };
  gamesAndProviders: {
    providers: string[];
    games: string[];
  };
  safetyLegacy: {
    title: string;
    summary: string;
    bullets?: string[];
  };
  howToClaimBonus: {
    title: string;
    intro?: string;
    steps: { step: number; title: string; text: string }[];
  };
  reviewContent: {
    id: string;
    sections: { heading: string; body: string }[];
  };
  finalCta: {
    title: string;
    primaryCta: { label: string; href: string };
    secondaryLink: { label: string; href: string };
    disclaimer?: string;
  };
  relatedCasinos: {
    items: {
      slug: string;
      name: string;
      href: string;
      offerTitle?: string;
      logo?: { src: string; alt: string };
    }[];
  };
};

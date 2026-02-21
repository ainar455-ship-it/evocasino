// Shared JSON-LD helpers (Phase 1 hardening; no UI)
// Canonical base URL is locked to https://evocasino.com

export const CANONICAL_BASE_URL = "https://evocasino.com" as const;

function absUrl(path: string): string {
  if (!path.startsWith("/")) path = "/" + path;
  return `${CANONICAL_BASE_URL}${path}`;
}

export function breadcrumbList(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

export function evoBreadcrumbsEvolutionCasinos() {
  return breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Evolution Casinos", path: "/evolution-casinos" },
  ]);
}

export function evoBreadcrumbsHowWeRank() {
  return breadcrumbList([
    { name: "Home", path: "/" },
    { name: "How We Rank", path: "/how-we-rank" },
  ]);
}

export function evoBreadcrumbsCasino(casinoName: string, casinoSlug: string) {
  return breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Evolution Casinos", path: "/evolution-casinos" },
    { name: casinoName, path: `/casinos/${casinoSlug}` },
  ]);
}

export function howWeRankFaqJsonLd() {
  // Must be strictly derived from existing methodology/architecture text (no new claims).
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does EvoCasino rank?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "EvoCasino ranks casinos based on fit for Evolution Live Casino games only. We do not rank the best casino overall.",
        },
      },
      {
        "@type": "Question",
        name: "How are rankings calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All scores and rankings are derived deterministically in code from facts-only data. No scores or ranking order are stored in the dataset.",
        },
      },
      {
        "@type": "Question",
        name: "Do you use manual overrides?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We do not store manual overrides or editorial ranking order in the data. If the schema drifts, the build fails.",
        },
      },
      {
        "@type": "Question",
        name: "Can casinos pay to rank higher?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Ranking is derived deterministically from facts in the SSOT dataset and is not manually manipulated.",
        },
      },
      {
        "@type": "Question",
        name: "How often is the data verified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We store and display verification or testing dates in the SSOT dataset (for example last verified or last tested fields where applicable).",
        },
      },
    ],
  };
}

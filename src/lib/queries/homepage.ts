import { loadContent } from "@/lib/content/load";

export function getHomepageData() {
  const { casinos, offers, casinosById, metadata } = loadContent();

  const topCasinos = [...casinos]
    .filter((c) => c.status === "active")
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  const latestOffers = offers
    .filter((o) => o.status === "active")
    .map((o) => {
      const casino = casinosById.get(o.casinoId);
      return {
        ...o,
        casinoName: casino?.name ?? o.casinoId,
        casinoSlug: casino?.slug ?? o.casinoId,
        affiliateLink: casino?.affiliateLink ?? "#",
      };
    })
    .sort((a, b) => {
      const da = a.lastVerifiedAt ? Date.parse(a.lastVerifiedAt) : 0;
      const db = b.lastVerifiedAt ? Date.parse(b.lastVerifiedAt) : 0;
      return db - da;
    });

  return {
    topCasinos,
    latestOffers,
    updatedAt: {
      casinos: metadata.casinosLastUpdated,
      offers: metadata.offersLastUpdated,
    },
  };
}

import { loadContent } from "@/lib/content/load";

export function getAllCasinoSlugs() {
  const { casinos } = loadContent();
  return casinos.filter((c) => c.status === "active").map((c) => c.slug);
}

export function getCasinoBySlug(slug: string) {
  const { casinosBySlug } = loadContent();
  return casinosBySlug.get(slug) ?? null;
}

export function getOffersForCasinoId(casinoId: string) {
  const { offersByCasinoId } = loadContent();
  return offersByCasinoId.get(casinoId) ?? [];
}

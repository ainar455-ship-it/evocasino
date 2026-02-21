import { casinos } from "@/data/content/casinos";

export function getRelatedCasinos(casinoSlug: string): { slug: string; name: string }[] {
  return casinos
    .filter((c) => c.slug !== casinoSlug)
    .map((c) => ({ slug: c.slug, name: c.name }));
}

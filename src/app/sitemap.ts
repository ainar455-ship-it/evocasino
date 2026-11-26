import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/seo";

export const dynamic = "force-static";

/**
 * Only pages that are meant to be indexed belong here.
 * Pages marked with NOINDEX (see src/app/seo.ts) must NOT be listed.
 *
 * lastmod is deliberately omitted: a date that is not tied to a real content
 * change is worse than no date. Add `lastModified` per page only when it is
 * maintained by hand alongside meaningful content updates.
 */
const INDEXABLE_PATHS = [
  "/",
  "/evolution-casinos",
  "/games/crazy-time",
  "/guides/crazy-time",
  "/guides/lightning-roulette",
  "/how-we-rank",
  "/tools/crazy-time-calculator",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.map((path) => ({
    url: path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`,
  }));
}

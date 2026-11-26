import type { Metadata } from "next";

export const SITE_URL = "https://evocasino.com";
export const SITE_METADATA_BASE = new URL(SITE_URL);

/** Keep a page out of Google's index (still crawlable, links followed) until it has substantial content. */
export const NOINDEX: Pick<Metadata, "robots"> = {
  robots: { index: false, follow: true },
};

export function canonicalMetadata(path: `/${string}`): Pick<Metadata, "alternates"> {
  return {
    alternates: {
      canonical: path,
    },
  };
}

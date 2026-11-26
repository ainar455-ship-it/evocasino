import type { Metadata } from "next";

export const SITE_URL = "https://evocasino.com";
export const SITE_METADATA_BASE = new URL(SITE_URL);

export function canonicalMetadata(path: `/${string}`): Pick<Metadata, "alternates"> {
  return {
    alternates: {
      canonical: path,
    },
  };
}

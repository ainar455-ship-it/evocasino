import fs from "node:fs";
import path from "node:path";
import { CasinosFileSchema, OffersFileSchema, type Casino, type Offer } from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "content", "data");

let cache:
  | {
      casinos: Casino[];
      offers: Offer[];
      casinosById: Map<string, Casino>;
      casinosBySlug: Map<string, Casino>;
      offersByCasinoId: Map<string, Offer[]>;
      metadata: {
        casinosLastUpdated: string;
        offersLastUpdated: string;
      };
    }
  | null = null;

function readJson(absPath: string) {
  return JSON.parse(fs.readFileSync(absPath, "utf8"));
}

export function loadContent() {
  if (cache) return cache;

  const casinosPath = path.join(CONTENT_DIR, "casinos.json");
  const offersPath = path.join(CONTENT_DIR, "offers.json");

  const casinosParsed = CasinosFileSchema.parse(readJson(casinosPath));
  const offersParsed = OffersFileSchema.parse(readJson(offersPath));

  const casinos = casinosParsed.casinos;
  const offers = offersParsed.offers;

  const casinoIds = new Set(casinos.map((c) => c.id));
  const invalidOffers = offers.filter((o) => !casinoIds.has(o.casinoId));
  if (invalidOffers.length) {
    throw new Error(
      `Invalid offers referencing missing casinoId: ${invalidOffers.map((o) => o.id).join(", ")}`
    );
  }

  const casinosById = new Map(casinos.map((c) => [c.id, c]));
  const casinosBySlug = new Map(casinos.map((c) => [c.slug, c]));

  const offersByCasinoId = new Map<string, Offer[]>();
  for (const o of offers) {
    const list = offersByCasinoId.get(o.casinoId) ?? [];
    list.push(o);
    offersByCasinoId.set(o.casinoId, list);
  }

  cache = {
    casinos,
    offers,
    casinosById,
    casinosBySlug,
    offersByCasinoId,
    metadata: {
      casinosLastUpdated: casinosParsed.metadata.lastUpdated,
      offersLastUpdated: offersParsed.metadata.lastUpdated,
    },
  };

  return cache;
}

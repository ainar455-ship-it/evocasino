import { z } from "zod";

export const CasinoSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  affiliateLink: z.string().url(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().nonnegative().optional(),
  license: z.string().optional(),
  established: z.number().int().min(1900).max(2100).optional(),
  status: z.enum(["active", "inactive", "under_review"]).default("active"),
  lastReviewed: z.string().datetime().optional(),
});

export const CasinosFileSchema = z.object({
  casinos: z.array(CasinoSchema),
  metadata: z.object({
    lastUpdated: z.string().datetime(),
    totalCount: z.number().int().nonnegative(),
    version: z.string(),
  }),
});

export const OfferSchema = z.object({
  id: z.string().min(1),
  casinoId: z.string().min(1),
  type: z.enum(["free_spins", "deposit_bonus"]),
  title: z.string().min(1),
  spins: z.number().int().nonnegative().nullable().optional(),
  bonusText: z.string().nullable().optional(),
  wagering: z.string().min(1),
  minDepositZar: z.number().int().nonnegative(),
  maxCashoutZar: z.number().int().nonnegative(),
  ctaLabel: z.string().min(1),
  sourceUrl: z.string().url().optional(),
  lastVerifiedAt: z.string().datetime().optional(),
  status: z.enum(["active", "inactive", "under_review"]).default("active"),
});

export const OffersFileSchema = z.object({
  offers: z.array(OfferSchema),
  metadata: z.object({
    lastUpdated: z.string().datetime(),
    totalCount: z.number().int().nonnegative(),
    version: z.string(),
  }),
});

export type Casino = z.infer<typeof CasinoSchema>;
export type Offer = z.infer<typeof OfferSchema>;

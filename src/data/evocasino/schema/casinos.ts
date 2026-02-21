import { z } from "zod";

/**
 * Phase 1 guardrails:
 * - SSOT = facts only
 * - No computed fields stored in JSON (no scores, rank, overrides)
 */

const PayoutSpeedSchema = z.enum(["fast", "avg", "slow"]);

const EvolutionShowSchema = z.enum([
  "crazy-time",
  "monopoly-live",
  "lightning-roulette",
  "lightning-dice",
  "dream-catcher",
  "crazy-coin-flip",
]);

const PaymentMethodSchema = z.enum([
  "ozow",
  "sid",
  "eft",
  "visa",
  "mastercard",
  "bitcoin",
  "usdt",
]);

export const CasinoSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().min(1),
    name: z.string().min(1),
    brandUrl: z.string().min(1),

    license: z.string().optional(),
    markets: z.array(z.string()).min(1),

    evolution: z.object({
      provider: z.literal("evolution"),
      liveCasino: z.boolean(),
      shows: z.array(EvolutionShowSchema).min(1),
      tablesApprox: z.number().optional(),
      lastVerified: z.string().min(1),
    }),

    payouts: z.object({
      speed: PayoutSpeedSchema,
      lastTested: z.string().min(1),
      notes: z.string().optional(),
    }),

    payments: z.object({
      methods: z.array(PaymentMethodSchema).min(1),
      lastVerified: z.string().min(1),
    }),

    mobile: z.object({
      experience: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
      lastVerified: z.string().min(1),
    }),

    bonuses: z
      .object({
        headline: z.string().optional(),
        termsUrl: z.string().optional(),
        wageringX: z.number().optional(),
        lastVerified: z.string().min(1),
      })
      .optional(),
  })
  .superRefine((obj, ctx) => {
    const forbidden = ["evoScore", "bonusScore", "rank", "position", "manualOverride", "score"];
    for (const key of forbidden) {
      if (Object.prototype.hasOwnProperty.call(obj as any, key)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `SSOT must not contain computed field "${key}". Remove it from JSON.`,
          path: [key],
        });
      }
    }
  });

export const CasinosSchema = z.array(CasinoSchema);

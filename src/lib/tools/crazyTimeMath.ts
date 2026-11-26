/**
 * Crazy Time wheel facts from Evolution's official game rules
 * (as published by Loto-Québec, a licensed operator):
 * https://assets.lotoquebec.com/ressources/assets/v3/assets/blt8296e79a7001648c/blta83347c0701d4ab1/6470f496f6df4f865bb5009e/Crazy-Time_rules_en.pdf
 *
 * RTP values are Evolution's theoretical figures per bet spot and already
 * include the effect of Top Slot multipliers and bonus-game outcomes.
 * Last checked: 2026-11-26.
 */

export type SpotId = "1" | "2" | "5" | "10" | "coin-flip" | "cash-hunt" | "pachinko" | "crazy-time";

export type Spot = {
  id: SpotId;
  label: string;
  kind: "number" | "bonus";
  segments: number;
  /** Base payout "x to 1" for number spots; null for bonus spots (multiplier decided in the bonus game). */
  payout: number | null;
  /** Theoretical return to player, as a fraction (0.9608 = 96.08%). */
  rtp: number;
};

export const WHEEL_SEGMENTS = 54;

export const SPOTS: Spot[] = [
  { id: "1", label: "1", kind: "number", segments: 21, payout: 1, rtp: 0.9608 },
  { id: "2", label: "2", kind: "number", segments: 13, payout: 2, rtp: 0.9595 },
  { id: "5", label: "5", kind: "number", segments: 7, payout: 5, rtp: 0.9578 },
  { id: "10", label: "10", kind: "number", segments: 4, payout: 10, rtp: 0.9573 },
  { id: "coin-flip", label: "Coin Flip", kind: "bonus", segments: 4, payout: null, rtp: 0.957 },
  { id: "cash-hunt", label: "Cash Hunt", kind: "bonus", segments: 2, payout: null, rtp: 0.9527 },
  { id: "pachinko", label: "Pachinko", kind: "bonus", segments: 2, payout: null, rtp: 0.9433 },
  { id: "crazy-time", label: "Crazy Time", kind: "bonus", segments: 1, payout: null, rtp: 0.9441 },
];

export const SOURCE_URL =
  "https://assets.lotoquebec.com/ressources/assets/v3/assets/blt8296e79a7001648c/blta83347c0701d4ab1/6470f496f6df4f865bb5009e/Crazy-Time_rules_en.pdf";

/** Probability that one spin lands on any of the given segments count. */
export function hitChance(segments: number): number {
  return segments / WHEEL_SEGMENTS;
}

/** Probability of seeing at least one hit in `spins` independent spins. */
export function chanceWithin(segments: number, spins: number): number {
  return 1 - Math.pow(1 - hitChance(segments), Math.max(0, spins));
}

export type Stakes = Partial<Record<SpotId, number>>;

export type SpinSummary = {
  totalStake: number;
  coveredSegments: number;
  /** Chance that the wheel lands on at least one spot you bet on. */
  coverage: number;
  expectedReturn: number;
  expectedLoss: number;
  /** Stake-weighted RTP of the whole bet pattern (NaN if no stake). */
  blendedRtp: number;
};

export function summarise(stakes: Stakes): SpinSummary {
  let totalStake = 0;
  let coveredSegments = 0;
  let expectedReturn = 0;
  for (const s of SPOTS) {
    const stake = Math.max(0, stakes[s.id] ?? 0);
    if (stake > 0) {
      totalStake += stake;
      coveredSegments += s.segments;
      expectedReturn += stake * s.rtp;
    }
  }
  return {
    totalStake,
    coveredSegments,
    coverage: coveredSegments / WHEEL_SEGMENTS,
    expectedReturn,
    expectedLoss: totalStake - expectedReturn,
    blendedRtp: totalStake > 0 ? expectedReturn / totalStake : NaN,
  };
}

import type { Casino, EvolutionShow } from "@/data/evocasino/schema";

const SHOW_WEIGHTS: Record<EvolutionShow, number> = {
  "crazy-time": 22,
  "monopoly-live": 18,
  "lightning-roulette": 20,
  "lightning-dice": 10,
  "dream-catcher": 8,
  "crazy-coin-flip": 6,
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Evolution Score (0–100), derived ONLY from facts
export function computeEvolutionScore(casino: Casino): number {
  if (!casino.evolution.liveCasino) return 0;

  // 1) Evolution show coverage (max ~60)
  const coverageRaw = casino.evolution.shows.reduce((sum, s) => sum + (SHOW_WEIGHTS[s] ?? 0), 0);
  const coverage = clamp(coverageRaw, 0, 60);

  // 2) Payout speed (max 15)
  const payout = casino.payouts.speed === "fast" ? 15 : casino.payouts.speed === "avg" ? 9 : 3;

  // 3) Payments relevance (max 10)
  const methods = new Set(casino.payments.methods);
  let payments = 0;
  if (methods.has("ozow")) payments += 4;
  if (methods.has("eft")) payments += 2;
  if (methods.has("sid")) payments += 1;
  if (methods.has("visa")) payments += 1;
  if (methods.has("mastercard")) payments += 1;
  if (methods.has("bitcoin") || methods.has("usdt")) payments += 1;
  payments = clamp(payments, 0, 10);

  // 4) Mobile experience (max 15)
  const mobile = clamp(casino.mobile.experience * 3, 3, 15);

  const total = coverage + payout + payments + mobile;
  return clamp(Math.round(total), 0, 100);
}

import casinosRaw from "@/data/evocasino/casinos.json";
import type { Casino, PaymentMethod, PayoutSpeed, EvolutionShow } from "@/data/evocasino/schema";
import { computeEvolutionScore } from "@/lib/evo/score";

export type CasinoRow = Casino & { evolutionScore: number };

export function getAllCasinos(): CasinoRow[] {
  const casinos = casinosRaw as Casino[];
  return casinos.map((c) => ({ ...c, evolutionScore: computeEvolutionScore(c) }));
}

export type EvoCasinosFilters = {
  show?: EvolutionShow;
  payout?: PayoutSpeed;
  payment?: PaymentMethod;
  mobileMin?: 1 | 2 | 3 | 4 | 5;
};

export function filterAndRank(casinos: CasinoRow[], f: EvoCasinosFilters): CasinoRow[] {
  let out = casinos.slice();

  if (f.show) out = out.filter((c) => c.evolution.shows.includes(f.show!));
  if (f.payout) out = out.filter((c) => c.payouts.speed === f.payout);
  if (f.payment) out = out.filter((c) => c.payments.methods.includes(f.payment!));
  if (f.mobileMin) out = out.filter((c) => c.mobile.experience >= f.mobileMin!);

  // Default ranking = Evolution Score (desc), tie-breaker by name
  out.sort((a, b) => (b.evolutionScore - a.evolutionScore) || a.name.localeCompare(b.name));
  return out;
}

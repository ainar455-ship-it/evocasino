import { loadCasinos } from "@/data/evocasino/loaders/casinos";
import type { Casino, PaymentMethod, PayoutSpeed, EvolutionShow } from "@/data/evocasino/schema";
import { computeEvolutionScore } from "@/lib/evo/score";
import { logScoreDistribution } from "@/lib/evo/scoreLogging";

export type CasinoRow = Casino & { evolutionScore: number };

export function getAllCasinos(): CasinoRow[] {
  const casinos = loadCasinos();
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

export function getRelatedCasinos(currentSlug: string, limit = 6): CasinoRow[] {
  const ranked = filterAndRank(getAllCasinos(), {});
  // Build-time sanity check (console only). No SSOT writes. No UI.
  if (process.env.EVO_BUILD_LOG_SCORES === "1") {
    try {
      const scores = (ranked ?? []).map((c: any) => c?.evolutionScore).filter((v: any) => typeof v === "number");
      logScoreDistribution("EvolutionScore", scores as number[]);
    } catch (e) {
      console.log("[EvolutionScore] logging skipped (could not read scores)");
    }
  }


  return ranked.filter((c) => c.slug !== currentSlug).slice(0, limit);
}

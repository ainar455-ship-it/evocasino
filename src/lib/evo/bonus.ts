import type { Casino } from "@/data/evocasino/schema";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function daysSince(isoDate: string): number {
  const d = new Date(isoDate);
  const now = new Date();
  const ms = now.getTime() - d.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

// Bonus Quality Score (0–100), derived ONLY from SSOT facts
// Uses: wageringX (lower is better), presence of termsUrl, and recency (lastVerified)
export function computeBonusQualityScore(casino: Casino): number {
  const b = casino.bonuses;
  if (!b?.headline) return 0;

  let score = 50;

  // If wageringX known: reward lower wagering
  if (typeof b.wageringX === "number") {
    // e.g. x30 -> 70, x35 -> 65, x50 -> 50, x60 -> 40
    score = 100 - b.wageringX;
  } else {
    // Unknown wagering = neutral/low confidence
    score -= 10;
  }

  // Terms URL improves trust
  if (b.termsUrl) score += 10;

  // Recency: older verification reduces confidence
  const age = daysSince(b.lastVerified);
  if (age > 90) score -= 20;
  else if (age > 60) score -= 12;
  else if (age > 30) score -= 6;

  return clamp(Math.round(score), 0, 100);
}

// Build-time score distribution logging (console only).
// No SSOT writes. No UI. Does not affect ranking. Build fails only on schema/Zod failures.

export function logScoreDistribution(label: string, scores: number[]) {
  if (!scores.length) {
    console.log(`[${label}] score distribution: (no scores)`);
    return;
  }

  const sorted = [...scores].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const mean = sorted.reduce((s, v) => s + v, 0) / sorted.length;
  const median =
    sorted.length % 2 === 1
      ? sorted[(sorted.length - 1) / 2]
      : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;

  const buckets = [
    { name: "0-20", lo: 0, hi: 20 },
    { name: "21-40", lo: 21, hi: 40 },
    { name: "41-60", lo: 41, hi: 60 },
    { name: "61-80", lo: 61, hi: 80 },
    { name: "81-100", lo: 81, hi: 100 },
  ].map((b) => ({
    bucket: b.name,
    count: sorted.filter((v) => v >= b.lo && v <= b.hi).length,
  }));

  console.log(
    `[${label}] score distribution: n=${sorted.length} min=${min} max=${max} mean=${mean.toFixed(
      2
    )} median=${median.toFixed(2)}`
  );
  console.log(`[${label}] buckets:`, buckets);
}

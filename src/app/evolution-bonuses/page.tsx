import { getAllCasinos } from "@/lib/evo/load";
import { computeBonusQualityScore } from "@/lib/evo/bonus";

export default function EvolutionBonusesPage() {
  const all = getAllCasinos();

  const rows = all
    .filter((c) => !!c.bonuses?.headline)
    .map((c) => ({
      ...c,
      bonusScore: computeBonusQualityScore(c),
    }))
    .sort((a, b) => (b.bonusScore - a.bonusScore) || (b.evolutionScore - a.evolutionScore) || a.name.localeCompare(b.name));

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>Best Evolution Bonuses</h1>
      <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.5 }}>
        Bonuses are ranked by a derived <strong>Bonus Quality Score</strong> (0–100) computed from SSOT facts
        (wagering when known, terms link, and last verified date). Evolution Score remains the tie-breaker.
      </p>

      <section style={{ marginTop: 20 }}>
        {rows.length === 0 && <p>No bonuses found in SSOT.</p>}

        <div style={{ display: "grid", gap: 12 }}>
          {rows.map((c, idx) => (
            <div
              key={c.id}
              style={{
                padding: 16,
                border: "1px solid #e5e7eb",
                borderRadius: 12,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 800 }}>
                #{idx + 1} — {c.name}
              </div>

              <div style={{ marginTop: 6, opacity: 0.85 }}>
                Bonus Quality Score: <strong>{c.bonusScore}</strong> · Evolution Score: {c.evolutionScore}
              </div>

              <div style={{ marginTop: 10 }}>
                <div style={{ fontWeight: 700 }}>Bonus</div>
                <div style={{ marginTop: 4 }}>{c.bonuses?.headline}</div>
                {typeof c.bonuses?.wageringX === "number" && (
                  <div style={{ marginTop: 4, opacity: 0.85 }}>Wagering: x{c.bonuses.wageringX}</div>
                )}
                <div style={{ marginTop: 4, opacity: 0.75 }}>
                  Last verified: {c.bonuses?.lastVerified}
                </div>
                {c.bonuses?.termsUrl && (
                  <div style={{ marginTop: 6 }}>
                    <a href={c.bonuses.termsUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
                      Bonus terms
                    </a>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 10 }}>
                <a href={`/casinos/${c.slug}`} style={{ textDecoration: "underline" }}>
                  View full review
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

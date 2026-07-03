import { filterAndRank, getAllCasinos } from "@/lib/evo/load";
import { computeBonusQualityScore } from "@/lib/evo/bonus";
import { guideRegistry } from "@/lib/guides/guideRegistry";

export default function HomePage() {
  const topCasinos = filterAndRank(getAllCasinos(), {}).slice(0, 5);

  const bonusRows = getAllCasinos()
    .filter((c) => !!c.bonuses?.headline)
    .map((c) => ({
      casino: c,
      bonusScore: computeBonusQualityScore(c),
    }))
    .sort(
      (a, b) =>
        (b.bonusScore - a.bonusScore) ||
        (b.casino.evolutionScore - a.casino.evolutionScore) ||
        a.casino.name.localeCompare(b.casino.name)
    )
    .slice(0, 5);

  const topGuides = guideRegistry.slice(0, 3);

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      {/* HERO */}
      <header style={{ padding: 18, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>EvoCasino</h1>

        <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.5 }}>
          Evolution Live Casino specialist site. Rankings are computed deterministically
          from facts-only SSOT data — no manual ranking overrides.
        </p>

        <div
          style={{
            marginTop: 14,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <a
            href="/evolution-casinos"
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #111827",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            View ranked Evolution casinos →
          </a>

          <a href="/evolution-games" style={{ textDecoration: "underline" }}>
            Evolution games
          </a>

          <a href="/how-we-rank" style={{ textDecoration: "underline" }}>
            How we rank
          </a>
        </div>
      </header>

      {/* GUIDES */}
      <section style={{ marginTop: 18, padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
          Popular Evolution Guides
        </h2>

        <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
          {topGuides.map((g) => (
            <div key={g.slug}>
              <a
                href={`/guides/${g.slug}`}
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                {g.title}
              </a>

              <div style={{ marginTop: 4, opacity: 0.8, lineHeight: 1.5 }}>
                Learn how the game works, including RTP, rules, payouts, and simple strategies.
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <a href="/evolution-games" style={{ textDecoration: "underline" }}>
            Explore all Evolution games →
          </a>
        </div>
      </section>

      {/* TOP CASINOS */}
      <section style={{ marginTop: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "baseline",
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
            Top Evolution casinos
          </h2>

          <a href="/evolution-casinos" style={{ textDecoration: "underline" }}>
            See full ranked list + filters →
          </a>
        </div>

        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {topCasinos.map((c, idx) => (
            <div
              key={c.id}
              style={{
                padding: 14,
                border: "1px solid #e5e7eb",
                borderRadius: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    #{idx + 1} — {c.name}
                  </div>

                  <div style={{ marginTop: 6, opacity: 0.85 }}>
                    Shows: {c.evolution.shows.join(", ")} · Mobile:{" "}
                    {c.mobile.experience}/5
                  </div>

                  <div style={{ marginTop: 4, opacity: 0.75 }}>
                    Payments: {c.payments.methods.join(", ")}
                  </div>
                </div>

                <div style={{ alignSelf: "center" }}>
                  <a
                    href={`/casinos/${c.slug}`}
                    style={{
                      textDecoration: "underline",
                      fontWeight: 700,
                    }}
                  >
                    View review →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BONUSES */}
      <section style={{ marginTop: 18 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "baseline",
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
            Top Evolution bonuses
          </h2>

          <a href="/evolution-bonuses" style={{ textDecoration: "underline" }}>
            See all bonuses →
          </a>
        </div>

        <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.5 }}>
          Bonuses are surfaced from SSOT facts and the existing bonus scoring logic.
        </p>

        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {bonusRows.map((r, idx) => {
            const c = r.casino;

            return (
              <div
                key={c.id}
                style={{
                  padding: 14,
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800 }}>
                  #{idx + 1} — {c.name}
                </div>

                <div style={{ marginTop: 6, opacity: 0.85 }}>
                  Bonus Quality Score: <strong>{r.bonusScore}</strong> · Evolution
                  Score: {c.evolutionScore}
                </div>

                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 700 }}>Bonus</div>

                  <div style={{ marginTop: 4 }}>
                    {c.bonuses?.headline}
                  </div>

                  <div style={{ marginTop: 4, opacity: 0.75 }}>
                    Last verified: {c.bonuses?.lastVerified}
                  </div>
                </div>

                <div style={{ marginTop: 10 }}>
                  <a
                    href={`/casinos/${c.slug}`}
                    style={{
                      textDecoration: "underline",
                      fontWeight: 700,
                    }}
                  >
                    View full review →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRUST */}
      <section
        style={{
          marginTop: 18,
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
        }}
      >
        <strong>Trust & transparency</strong>

        <ul
          style={{
            marginTop: 10,
            marginBottom: 0,
            paddingLeft: 18,
            lineHeight: 1.6,
          }}
        >
          <li>Facts-only SSOT data; if schemas drift, the build fails.</li>
          <li>Rankings are computed deterministically in code.</li>
          <li>Unknowns stay unknown.</li>
          <li>No payout testing or fake performance claims.</li>
        </ul>

        <div style={{ marginTop: 10 }}>
          <a href="/how-we-rank" style={{ textDecoration: "underline" }}>
            Read methodology →
          </a>
        </div>
      </section>
    </main>
  );
}

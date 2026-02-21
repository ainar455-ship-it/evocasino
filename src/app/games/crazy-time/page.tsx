import { filterAndRank, getAllCasinos } from "@/lib/evo/load";

export default function CrazyTimePage() {
  const all = getAllCasinos();
  const rows = filterAndRank(all, { show: "crazy-time" });

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>Best Crazy Time Casinos</h1>
      <p style={{ marginTop: 10, fontSize: 16 }}>
        Ranked by derived Evolution Score. Only casinos offering Evolution Crazy Time are included.
      </p>

      <section style={{ marginTop: 20 }}>
        {rows.length === 0 && <p>No casinos found.</p>}

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

              <div style={{ marginTop: 6, opacity: 0.8 }}>
                Evolution Score: {c.evolutionScore}
              </div>

              <div style={{ marginTop: 6 }}>
                Payout: {c.payouts.speed} · Mobile: {c.mobile.experience}/5
              </div>

              <div style={{ marginTop: 6 }}>
                Payments: {c.payments.methods.join(", ")}
              </div>

              <div style={{ marginTop: 6 }}>
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

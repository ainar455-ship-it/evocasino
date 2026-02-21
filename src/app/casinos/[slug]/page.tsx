import { notFound } from "next/navigation";
import { getAllCasinos } from "@/lib/evo/load";
import { computeEvolutionScore } from "@/lib/evo/score";

export default function CasinoPage({
  params,
}: {
  params: { slug: string };
}) {
  const casinos = getAllCasinos();
  const casino = casinos.find((c) => c.slug === params.slug);

  if (!casino) {
    notFound();
  }

  const evolutionScore = computeEvolutionScore(casino);

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>
        {casino.name} — Evolution Live Casino Review
      </h1>

      <section style={{ marginTop: 16 }}>
        <h2>Evolution Score</h2>
        <p style={{ fontSize: 22, fontWeight: 900 }}>
          {evolutionScore} / 100
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Evolution Coverage</h2>
        <p>Shows available:</p>
        <ul>
          {casino.evolution.shows.map((show) => (
            <li key={show}>{show}</li>
          ))}
        </ul>
        <p>Approx tables: {casino.evolution.tablesApprox ?? "N/A"}</p>
        <p>Last verified: {casino.evolution.lastVerified}</p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Payouts</h2>
        <p>Speed: {casino.payouts.speed}</p>
        <p>Last tested: {casino.payouts.lastTested}</p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Payments</h2>
        <ul>
          {casino.payments.methods.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p>Last verified: {casino.payments.lastVerified}</p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Mobile Experience</h2>
        <p>Rating: {casino.mobile.experience} / 5</p>
        <p>Last verified: {casino.mobile.lastVerified}</p>
      </section>

      {casino.bonuses && (
        <section style={{ marginTop: 24 }}>
          <h2>Bonus</h2>
          <p>{casino.bonuses.headline}</p>
          {casino.bonuses.wageringX && (
            <p>Wagering: x{casino.bonuses.wageringX}</p>
          )}
          <p>Last verified: {casino.bonuses.lastVerified}</p>
        </section>
      )}
    </main>
  );
}

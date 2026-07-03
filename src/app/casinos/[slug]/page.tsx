import RelatedCasinos from "@/components/evocasino/RelatedCasinos";
import RankingExplainer from "@/components/evocasino/RankingExplainer";
import { getAllCasinos, getRelatedCasinos } from "@/lib/evo/load";
import { computeEvolutionScore } from "@/lib/evo/score";

export async function generateStaticParams() {
  const casinos = getAllCasinos();
  return casinos.map((c) => ({ slug: c.slug }));
}

export default async function CasinoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const casinos = getAllCasinos();
  const casino = casinos.find((c) => c.slug === slug);

  if (!casino) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Casino not found</h1>
      </main>
    );
  }

  const evolutionScore = computeEvolutionScore(casino);
  const related = getRelatedCasinos(slug, 6);

  // helpers
  const formatName = (text: string) =>
    text
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const formatPayment = (m: string) =>
    m.toUpperCase() === "USDT"
      ? "USDT"
      : m.charAt(0).toUpperCase() + m.slice(1);

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      
      {/* TITLE */}
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>
        {casino.name} — Evolution Live Casino Review
      </h1>

      {/* INTRO */}
      <p style={{ marginTop: 10, lineHeight: 1.5 }}>
        {casino.name} offers Evolution live dealer games such as{" "}
        {casino.evolution.shows
          .slice(0, 3)
          .map((s) => formatName(s))
          .join(", ")}
        . This page shows verified information about its Evolution coverage,
        payments, and overall setup.
      </p>

      {/* SCORE */}
      <section style={{ marginTop: 16 }}>
        <h2>Evolution Score</h2>
        <p style={{ fontSize: 22, fontWeight: 900 }}>
          {evolutionScore} / 100
        </p>
      </section>

      {/* EVOLUTION COVERAGE */}
      <section style={{ marginTop: 24 }}>
        <h2>Evolution Coverage</h2>
        <p>Shows available:</p>
        <ul>
          {casino.evolution.shows.map((show) => (
            <li key={show}>{formatName(show)}</li>
          ))}
        </ul>
        <p>Approx tables: {casino.evolution.tablesApprox ?? "N/A"}</p>
        <p>Last verified: {casino.evolution.lastVerified}</p>
      </section>

      {/* PAYOUTS */}
      <section style={{ marginTop: 24 }}>
        <h2>Payouts</h2>
        <p>Reported speed: {casino.payouts.speed}</p>
        <p>Last tested: {casino.payouts.lastTested}</p>
      </section>

      {/* PAYMENTS */}
      <section style={{ marginTop: 24 }}>
        <h2>Payments</h2>
        <ul>
          {casino.payments.methods.map((m) => (
            <li key={m}>{formatPayment(m)}</li>
          ))}
        </ul>
        <p>Last verified: {casino.payments.lastVerified}</p>
      </section>

      {/* MOBILE */}
      <section style={{ marginTop: 24 }}>
        <h2>Mobile Experience</h2>
        <p>Rating: {casino.mobile.experience} / 5</p>
        <p>Last verified: {casino.mobile.lastVerified}</p>
      </section>

      {/* BONUS */}
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

      {/* EXPLAINER */}
      <RankingExplainer variant="casino" />

      {/* RELATED */}
      <RelatedCasinos
        title="Alternatives for Evolution players"
        items={related}
      />
    </main>
  );
}

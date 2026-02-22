import { notFound } from "next/navigation";
import RelatedCasinos from "@/components/evocasino/RelatedCasinos";
import RankingExplainer from "@/components/evocasino/RankingExplainer";
import { getAllCasinos, getRelatedCasinos } from "@/lib/evo/load";
import { computeEvolutionScore } from "@/lib/evo/score";
import { evoBreadcrumbsCasino } from "@/lib/seo/jsonld";
import { guideRegistry, GUIDE_H1_SUFFIX } from "@/lib/guides/guideRegistry";

export const dynamicParams = false;

export function generateStaticParams() {
  const casinos = getAllCasinos();
  return casinos.map((c) => ({ slug: c.slug }));
}

export default function CasinoPage({
  params,
}: {
  params: { slug: string };
}) {
  const casinos = getAllCasinos();
  const casino = casinos.find((c) => c.slug === params.slug);

  if (!casino) notFound();

  const evolutionScore = computeEvolutionScore(casino);
  const related = getRelatedCasinos(params.slug, 6);

  // Deterministic: show-guides relevant to this casino’s SSOT evolution.shows
  const showKeys = new Set(casino.evolution.shows);
  const relevantGuides = guideRegistry.filter((g) => {
    if (!g.intent.startsWith("show:")) return false;
    const key = g.intent.slice("show:".length);
    return showKeys.has(key as any);
  });

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(evoBreadcrumbsCasino(casino.name, params.slug)),
        }}
      />

      <h1 style={{ fontSize: 34, fontWeight: 800 }}>
        {casino.name} — Evolution Live Casino Review
      </h1>

      {/* Internal links: guides (Phase 4 authority graph; no curation) */}
      <section style={{ marginTop: 18, padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <strong>Relevant Evolution guides</strong>
        <div style={{ marginTop: 8, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {relevantGuides.length ? (
            relevantGuides.map((g) => (
              <a key={g.slug} href={`/guides/${g.slug}`} style={{ textDecoration: "underline" }}>
                {`${g.title}${GUIDE_H1_SUFFIX}`}
              </a>
            ))
          ) : (
            <a href="/evolution-casinos" style={{ textDecoration: "underline" }}>
              Explore Evolution casinos
            </a>
          )}
        </div>
      </section>

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
          {casino.bonuses.wageringX && <p>Wagering: x{casino.bonuses.wageringX}</p>}
          <p>Last verified: {casino.bonuses.lastVerified}</p>
        </section>
      )}

      <RankingExplainer variant="casino" />
      <RelatedCasinos title="Alternatives for Evolution players" items={related} />
    </main>
  );
}

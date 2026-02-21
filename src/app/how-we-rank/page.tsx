import RankingExplainer from "@/components/evocasino/RankingExplainer";
import { evoBreadcrumbsHowWeRank, howWeRankFaqJsonLd } from "@/lib/seo/jsonld";

export const metadata = {
  title: "How we rank Evolution casinos (Phase 1) | EvoCasino",
  description:
    "Transparent methodology for EvoCasino rankings: Evolution Score is derived from facts in our SSOT dataset. No manual ranking or score overrides.",
};

export default function HowWeRankPage() {
  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      {/* JSON-LD: HowWeRank breadcrumbs+FAQ (no UI) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(evoBreadcrumbsHowWeRank()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howWeRankFaqJsonLd()) }}
      />

      <h1 style={{ fontSize: 34, fontWeight: 800 }}>How we rank Evolution casinos</h1>

      <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6 }}>
        EvoCasino is an <strong>Evolution Live Casino authority</strong> site. Our rankings are designed to answer one
        question: <strong>which casinos are the best fit for Evolution Live Games</strong>.
      </p>

      <RankingExplainer variant="hub" />

      <section style={{ marginTop: 26 }}>
        <h2>Phase 1 rules</h2>
        <ul style={{ marginTop: 10, paddingLeft: 18 }}>
          <li>
            <strong>SSOT facts-only:</strong> our dataset stores verifiable facts (e.g. Evolution shows offered, payout
            speed, payment methods, mobile experience, and verification dates).
          </li>
          <li>
            <strong>Derived scoring only in code:</strong> Evolution Score (0–100) is computed from SSOT facts. We do not
            store scores or ranking order in JSON.
          </li>
          <li>
            <strong>No manual overrides:</strong> no editorial ranking weights, no forced positions.
          </li>
          <li>
            <strong>No scope expansion:</strong> Phase 1 does not cover generic casino “best overall”, crypto pillars, or
            “highest bonus” rankings.
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2>What we do not rank</h2>
        <ul style={{ marginTop: 10, paddingLeft: 18 }}>
          <li>Best casino overall</li>
          <li>Best crypto casino</li>
          <li>Highest bonus casino</li>
          <li>Non-Evolution provider “top lists”</li>
        </ul>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2>Data freshness</h2>
        <p style={{ marginTop: 10, lineHeight: 1.6 }}>
          Each casino includes dates like <strong>last verified</strong> and <strong>last tested</strong> for Evolution
          coverage, payments, mobile, and payouts. This is intentional: it keeps the dataset auditable and prevents
          “opinion-only” ranking drift.
        </p>
      </section>

      <section style={{ marginTop: 26 }}>
        <h2>Links</h2>
        <ul style={{ marginTop: 10, paddingLeft: 18 }}>
          <li>
            <a href="/evolution-casinos" style={{ textDecoration: "underline" }}>
              Evolution casinos (ranked + filters)
            </a>
          </li>
          <li>
            <a href="/evolution-bonuses" style={{ textDecoration: "underline" }}>
              Evolution bonuses
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}

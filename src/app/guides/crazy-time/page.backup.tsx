import { guideRegistry, GUIDE_H1_SUFFIX } from "@/lib/guides/guideRegistry";
import { evoBreadcrumbsGuide, webPageJsonLd } from "@/lib/seo/jsonld";
import { filterAndRank, getAllCasinos } from "@/lib/evo/load";
import type { EvoCasinosFilters } from "@/lib/evo/load";
import type { EvolutionShow } from "@/data/evocasino/schema";

export const metadata = {
  title: "Crazy Time (Evolution) – How It Works, Bonus Rounds & Strategy",
  description: "Complete Crazy Time guide: how to play, bonus rounds, multipliers, and strategy tips. Understand Evolution’s most popular game show."
};

function getGuide(slug: string) {
  const g = guideRegistry.find((x) => x.slug === slug);
  if (!g) throw new Error(`Guide registry missing entry for slug: ${slug}`);
  return g;
}

const guide = getGuide("crazy-time");

export default function CrazyTimeGuidePage() {
  const h1 = `${guide.title}${GUIDE_H1_SUFFIX}`;

  // Deterministic top-2 (SSOT-derived)
  const show = guide.intent.startsWith("show:")
    ? (guide.intent.slice("show:".length) as EvolutionShow)
    : undefined;

  const filters: EvoCasinosFilters = { show };
  const rows = filterAndRank(getAllCasinos(), filters);
  const top2 = rows.slice(0, 2);

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      {/* JSON-LD: WebPage + Breadcrumb (Phase 4 Step 3; no UI) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageJsonLd({
              path: `/guides/${guide.slug}`,
              name: h1,
              description: "How to play Crazy Time on Evolution Live, plus SSOT-derived links to relevant casino reviews.",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(evoBreadcrumbsGuide(guide.title, guide.slug)) }}
      />

      <h1 style={{ fontSize: 34, fontWeight: 800 }}>{h1}</h1>

      <section style={{ marginTop: 14, padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <strong>Required links</strong>
        <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
          <div>
            Hub:{" "}
            <a href="/evolution-casinos" style={{ textDecoration: "underline" }}>
              Evolution Casinos
            </a>
          </div>
          <div>
            Methodology:{" "}
            <a href="/how-we-rank" style={{ textDecoration: "underline" }}>
              How we rank
            </a>
          </div>
          <div>
            Casino reviews (top 2, SSOT-derived):
            <div style={{ marginTop: 6, display: "flex", gap: 12, flexWrap: "wrap" }}>
              {top2.length >= 1 ? (
                <a href={`/casinos/${top2[0].slug}`} style={{ textDecoration: "underline" }}>
                  {top2[0].name}
                </a>
              ) : (
                <a href="/evolution-casinos" style={{ textDecoration: "underline" }}>
                  See all Evolution casinos
                </a>
              )}

              {top2.length >= 2 ? (
                <a href={`/casinos/${top2[1].slug}`} style={{ textDecoration: "underline" }}>
                  {top2[1].name}
                </a>
              ) : (
                <a href="/evolution-casinos" style={{ textDecoration: "underline" }}>
                  See all Evolution casinos
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

<section style={{ marginTop: 28 }}>
  <h2 style={{ fontSize: 22, fontWeight: 700 }}>RTP & Volatility</h2>

  <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>
    Crazy Time has a base RTP of around 96.08%, although the actual return depends heavily on bonus round frequency and volatility. The game is designed with high variance, meaning wins can be infrequent but potentially very large during bonus features.
  </p>
</section>

<section style={{ marginTop: 28 }}>
  <h2 style={{ fontSize: 22, fontWeight: 700 }}>Bonus Rounds</h2>

  <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>
    Crazy Time includes four bonus games:
  </p>

  <ul style={{ marginTop: 10, paddingLeft: 22, lineHeight: 1.8 }}>
    <li>Coin Flip</li>
    <li>Cash Hunt</li>
    <li>Pachinko</li>
    <li>Crazy Time bonus</li>
  </ul>

  <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>
    Each bonus round uses multipliers and random mechanics which can significantly increase payouts compared to the base wheel game.
  </p>
</section>

<section style={{ marginTop: 28, marginBottom: 24 }}>
  <h2 style={{ fontSize: 22, fontWeight: 700 }}>Simple Strategy Tips</h2>

  <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>
    Many players spread bets across multiple segments to reduce volatility. Lower-risk betting strategies often focus on numbers like 1 and 2, while higher-risk players target bonus segments for bigger potential multipliers.
  </p>
</section>
    </main>
  );
}

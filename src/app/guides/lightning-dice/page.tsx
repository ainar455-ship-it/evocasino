import { guideRegistry, GUIDE_H1_SUFFIX } from "@/lib/guides/guideRegistry";
import { evoBreadcrumbsGuide, webPageJsonLd } from "@/lib/seo/jsonld";
import { filterAndRank, getAllCasinos } from "@/lib/evo/load";
import type { EvoCasinosFilters } from "@/lib/evo/load";
import type { EvolutionShow } from "@/data/evocasino/schema";

function getGuide(slug: string) {
  const g = guideRegistry.find((x) => x.slug === slug);
  if (!g) throw new Error(`Guide registry missing entry for slug: ${slug}`);
  return g;
}

const guide = getGuide("lightning-dice");

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

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>How to play</h2>
        <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.5, opacity: 0.85 }}>
          (Scaffold) This guide explains Crazy Time gameplay at a high level without outbound links.
        </p>
      </section>
    </main>
  );
}

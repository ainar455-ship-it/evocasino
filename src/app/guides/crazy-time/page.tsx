import { guideRegistry, GUIDE_H1_SUFFIX } from "@/lib/guides/guideRegistry";
import { evoBreadcrumbsGuide, webPageJsonLd } from "@/lib/seo/jsonld";

function getGuide(slug: string) {
  const g = guideRegistry.find((x) => x.slug === slug);
  if (!g) throw new Error(`Guide registry missing entry for slug: ${slug}`);
  return g;
}

const guide = getGuide("crazy-time");

export default function CrazyTimeGuidePage() {
  const h1 = `${guide.title}${GUIDE_H1_SUFFIX}`;

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
            Casino reviews (top 2, SSOT-derived):{" "}
            <span style={{ opacity: 0.75 }}>pending deterministic wiring in Step 3.3</span>
            <div style={{ marginTop: 6, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="/casinos/stake" style={{ textDecoration: "underline" }}>
                Stake (placeholder)
              </a>
              <a href="/casinos/coincasino" style={{ textDecoration: "underline" }}>
                CoinCasino (placeholder)
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>How to play</h2>
        <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.5, opacity: 0.85 }}>
          (Scaffold) This guide will explain Crazy Time gameplay at a high level without outbound links.
          Next step wires the top-2 casino review links deterministically from existing ranking + filters.
        </p>
      </section>
    </main>
  );
}

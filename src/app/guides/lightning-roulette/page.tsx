import { guideRegistry, GUIDE_H1_SUFFIX } from "@/lib/guides/guideRegistry";
import { evoBreadcrumbsGuide, webPageJsonLd } from "@/lib/seo/jsonld";
import { filterAndRank, getAllCasinos } from "@/lib/evo/load";
import type { EvoCasinosFilters } from "@/lib/evo/load";
import type { EvolutionShow } from "@/data/evocasino/schema";

export const metadata = {
  title: "Lightning Roulette (Evolution) – Rules, Multipliers & RTP Guide",
  description: "Learn how Lightning Roulette works, including lightning multipliers, RTP, rules, and simple strategies for better play."
};
function getGuide(slug: string) {
  const g = guideRegistry.find((x) => x.slug === slug);
  if (!g) throw new Error(`Guide registry missing entry for slug: ${slug}`);
  return g;
}

const guide = getGuide("lightning-roulette");

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
  <h2 style={{ fontSize: 28, fontWeight: 800 }}>Introduction</h2>

  <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
    Lightning Roulette is one of Evolution’s most popular live casino games. It follows the same core rules as European roulette, but adds random lightning multipliers that can increase straight-up payouts up to 500x.
  </p>

  <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
    Before each spin, between one and five Lucky Numbers receive random multipliers ranging from 50x to 500x. If the winning number matches one of those Lucky Numbers and you placed a straight-up bet on it, the multiplier payout applies automatically.
  </p>

  <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
    The game was developed by Evolution and combines traditional roulette mechanics with a higher-volatility multiplier system. Outside bets such as red/black and odd/even work exactly like standard European roulette, while straight-up bets trade a reduced base payout for the chance to hit boosted multipliers.
  </p>

  <section style={{ marginTop: 28 }}>
    <h2 style={{ fontSize: 24, fontWeight: 700 }}>How Lightning Roulette Works</h2>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Each round begins with a betting phase where players place roulette bets on the table. After betting closes, the game randomly selects Lucky Numbers and assigns lightning multipliers before the wheel spins.
    </p>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Multipliers only apply to straight-up bets placed on individual numbers. Standard roulette bets like splits, corners, dozens, and outside bets continue using normal European roulette payouts.
    </p>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Lightning Roulette uses a single-zero European wheel with 37 pockets. The base straight-up payout is reduced from 35:1 to 29:1 to fund the multiplier system.
    </p>
  </section>

  <section style={{ marginTop: 28 }}>
    <h2 style={{ fontSize: 24, fontWeight: 700 }}>Lightning Roulette RTP</h2>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Outside bets in Lightning Roulette use the same RTP as standard European roulette at 97.30%. Straight-up bets use Evolution’s published RTP of 97.10% when multiplier wins are included over the long run.
    </p>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      The game is designed around higher volatility. Sessions without multiplier hits may feel less forgiving because straight-up payouts are reduced to 29:1 unless a lightning multiplier activates.
    </p>
  </section>

  <section style={{ marginTop: 28 }}>
    <h2 style={{ fontSize: 24, fontWeight: 700 }}>Where to Play Lightning Roulette</h2>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Lightning Roulette is available at many Evolution casinos. Stream quality, mobile compatibility, table limits, and regional availability can vary between operators.
    </p>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      You can compare Evolution casino reviews and live casino availability through our{" "}
      <a href="/evolution-casinos" style={{ textDecoration: "underline" }}>
        Evolution Casinos
      </a>{" "}
      hub.
    </p>
  </section>
</section>
    </main>
  );
}

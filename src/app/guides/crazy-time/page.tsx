import type { Metadata } from "next";
import { guideRegistry, GUIDE_H1_SUFFIX } from "@/lib/guides/guideRegistry";
import { evoBreadcrumbsGuide, webPageJsonLd } from "@/lib/seo/jsonld";
import { filterAndRank, getAllCasinos } from "@/lib/evo/load";
import type { EvoCasinosFilters } from "@/lib/evo/load";
import type { EvolutionShow } from "@/data/evocasino/schema";
import { canonicalMetadata } from "@/app/seo";

export const metadata: Metadata = {
  title: "Crazy Time (Evolution) – How It Works, Bonus Rounds & Strategy",
  description: "Complete Crazy Time guide: how to play, bonus rounds, multipliers, and strategy tips. Understand Evolution’s most popular game show.",
  ...canonicalMetadata("/guides/crazy-time"),
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

<section style={{ marginTop: 18 }}>
  <h2 style={{ fontSize: 28, fontWeight: 800 }}>Introduction</h2>

  <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
    Crazy Time is Evolution’s flagship live casino game show and one of the most popular live games in the industry. The game combines a large money wheel, four separate bonus rounds, and the Top Slot multiplier system into a highly volatile live experience.
  </p>

  <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
    Players bet on number segments or bonus segments before the wheel spins. When the wheel lands on a bonus game, qualifying players enter a separate feature round with its own mechanics and multiplier potential.
  </p>

  <section style={{ marginTop: 28 }}>
    <h2 style={{ fontSize: 24, fontWeight: 700 }}>How Crazy Time Works</h2>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      The Crazy Time wheel contains 54 segments made up of number payouts and four bonus rounds: Coin Flip, Cash Hunt, Pachinko, and Crazy Time.
    </p>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Each round begins with a betting phase followed by a wheel spin. Above the wheel, the Top Slot system can apply random multipliers to winning segments, increasing potential payouts significantly.
    </p>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Bonus rounds are triggered when the wheel lands on one of the dedicated bonus segments. Each bonus uses completely different mechanics and payout structures.
    </p>
  </section>

  <section style={{ marginTop: 28 }}>
    <h2 style={{ fontSize: 24, fontWeight: 700 }}>The Four Bonus Rounds</h2>

    <h3 style={{ marginTop: 18, fontSize: 20, fontWeight: 700 }}>Coin Flip</h3>

    <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Coin Flip is the most common bonus round and uses a two-sided coin with randomly generated multiplier values. The winning side determines the payout multiplier for all participating players.
    </p>

    <h3 style={{ marginTop: 18, fontSize: 20, fontWeight: 700 }}>Cash Hunt</h3>

    <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Cash Hunt presents a large wall of hidden multipliers where players choose a target symbol. Each player can receive a different payout result depending on their selected target.
    </p>

    <h3 style={{ marginTop: 18, fontSize: 20, fontWeight: 700 }}>Pachinko</h3>

    <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Pachinko uses a vertical peg board where a puck bounces toward multiplier slots at the bottom. Double slots can increase all multipliers and trigger additional drops.
    </p>

    <h3 style={{ marginTop: 18, fontSize: 20, fontWeight: 700 }}>Crazy Time Bonus</h3>

    <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      The Crazy Time bonus is the rarest and highest-volatility feature in the game. Players choose coloured flappers on a secondary wheel with multipliers, Double, and Triple segments capable of dramatically increasing payouts.
    </p>
  </section>

  <section style={{ marginTop: 28 }}>
    <h2 style={{ fontSize: 24, fontWeight: 700 }}>Crazy Time RTP & Volatility</h2>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      RTP varies depending on which segment players bet on. Number 1 offers the highest published RTP at around 96.08%, while bonus rounds and higher-volatility segments operate with larger variance and lower theoretical return percentages.
    </p>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Crazy Time is designed as a high-volatility live casino game. Long stretches of standard wheel outcomes can be interrupted by bonus rounds with significantly larger payout potential.
    </p>
  </section>

  <section style={{ marginTop: 28 }}>
    <h2 style={{ fontSize: 24, fontWeight: 700 }}>Basic Strategy</h2>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Many players use a blended betting approach that combines number segments with bonus segments. Number bets can create more stable session pacing, while bonus bets provide access to the game’s largest multipliers.
    </p>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      No betting strategy can overcome the house edge or predict bonus outcomes. Crazy Time is fundamentally a random game built around variance and multiplier-driven volatility.
    </p>
  </section>

  <section style={{ marginTop: 28, marginBottom: 24 }}>
    <h2 style={{ fontSize: 24, fontWeight: 700 }}>Where to Play Crazy Time</h2>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      Crazy Time is available at many Evolution casinos, although table availability, limits, and regional access can vary depending on operator and jurisdiction.
    </p>

    <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.7, opacity: 0.9 }}>
      You can compare live casino operators and Evolution availability through our{" "}
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

import { filterAndRank, getAllCasinos } from "@/lib/evo/load";
import { computeBonusQualityScore } from "@/lib/evo/bonus";
import { guideRegistry } from "@/lib/guides/guideRegistry";

const trustItems = [
  "Facts-only rankings",
  "No paid placements",
  "Evolution-only focus",
  "RTP & game analysis",
  "Transparent methodology",
];

export default function HomePage() {
  const allCasinos = getAllCasinos();
  const topCasinos = filterAndRank(allCasinos, {}).slice(0, 5);

  const bonusRows = allCasinos
    .filter((c) => !!c.bonuses?.headline)
    .map((c) => ({
      casino: c,
      bonusScore: computeBonusQualityScore(c),
    }))
    .sort(
      (a, b) =>
        (b.bonusScore - a.bonusScore) ||
        (b.casino.evolutionScore - a.casino.evolutionScore) ||
        a.casino.name.localeCompare(b.casino.name)
    )
    .slice(0, 5);

  const topGuides = guideRegistry.slice(0, 3);
  const featuredGuide = topGuides[0];

  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-heading">
        <div className="home-shell home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-eyebrow">Independent editorial · Evolution gaming</p>

            <h1 id="home-heading" className="home-hero-title">
              The authority guide to <span>Evolution Live Casino.</span>
            </h1>

            <p className="home-hero-lede">
              Deep game breakdowns, transparent casino rankings, and editorial analysis
              of the world's most-played live dealer studio — built on real facts, not
              marketing copy.
            </p>

            <div className="home-actions" aria-label="Primary homepage links">
              <a className="home-button home-button-primary" href="/evolution-casinos">
                View ranked Evolution casinos →
              </a>
              <a className="home-button home-button-secondary" href="/evolution-games">
                Evolution games
              </a>
              <a className="home-text-link" href="/how-we-rank">
                How we rank
              </a>
            </div>
          </div>

          {featuredGuide && (
            <article className="home-feature-card" aria-label="Featured guide">
              <div className="home-card-kicker">Featured guide</div>
              <div className="home-card-type">Game show</div>
              <h2>{featuredGuide.title.replace(" on Evolution Live", "")}</h2>
              <p>
                A complete editorial breakdown of Evolution's flagship live game,
                including rules, RTP, payout structure, and bankroll discipline.
              </p>
              <div className="home-stat-grid" aria-label="Guide highlights">
                <div>
                  <span>Focus</span>
                  <strong>Rules</strong>
                </div>
                <div>
                  <span>Includes</span>
                  <strong>Strategy</strong>
                </div>
              </div>
              <a href={`/guides/${featuredGuide.slug}`}>Read the full guide ↗</a>
            </article>
          )}
        </div>
      </section>

      <section className="home-trust-strip" aria-label="EvoCasino principles">
        <div className="home-shell home-trust-list">
          {trustItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="home-section home-shell" aria-labelledby="featured-guides-heading">
        <div className="home-section-heading">
          <p className="home-eyebrow">Featured guides</p>
          <h2 id="featured-guides-heading">Editorial breakdowns of Evolution's biggest games</h2>
          <a href="/evolution-games">Explore all Evolution games →</a>
        </div>

        <div className="home-guide-grid">
          {topGuides.map((g) => (
            <article className="home-content-card" key={g.slug}>
              <p className="home-card-type">Evolution guide</p>
              <h3>
                <a href={`/guides/${g.slug}`}>{g.title}</a>
              </h3>
              <p>
                Learn how the game works, including RTP, rules, payouts, and simple strategies.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-shell" aria-labelledby="games-heading">
        <div className="home-section-heading home-section-heading-wide">
          <p className="home-eyebrow">Evolution games</p>
          <h2 id="games-heading">Game pages built for rules, odds, and casino context</h2>
          <a href="/evolution-games">Evolution games →</a>
        </div>

        <div className="home-games-grid">
          {guideRegistry.map((g) => (
            <a className="home-game-tile" href={`/guides/${g.slug}`} key={g.slug}>
              <span>{g.title.replace(" on Evolution Live", "")}</span>
              <small>Guide and casino context</small>
            </a>
          ))}
        </div>
      </section>

      <section className="home-section home-shell" aria-labelledby="top-casinos-heading">
        <div className="home-section-heading home-section-heading-row">
          <div>
            <p className="home-eyebrow">Ranked casinos</p>
            <h2 id="top-casinos-heading">Top Evolution casinos</h2>
          </div>
          <a href="/evolution-casinos">See full ranked list + filters →</a>
        </div>

        <div className="home-ranked-list">
          {topCasinos.map((c, idx) => (
            <article className="home-ranked-card" key={c.id}>
              <div className="home-rank-number">#{idx + 1}</div>
              <div className="home-ranked-main">
                <h3>{c.name}</h3>
                <p>
                  Shows: {c.evolution.shows.join(", ")} · Mobile: {c.mobile.experience}/5
                </p>
                <p>Payments: {c.payments.methods.join(", ")}</p>
              </div>
              <a href={`/casinos/${c.slug}`}>View review →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-shell" aria-labelledby="bonuses-heading">
        <div className="home-section-heading home-section-heading-row">
          <div>
            <p className="home-eyebrow">Bonuses</p>
            <h2 id="bonuses-heading">Top Evolution bonuses</h2>
            <p>
              Bonuses are surfaced from SSOT facts and the existing bonus scoring logic.
            </p>
          </div>
          <a href="/evolution-bonuses">See all bonuses →</a>
        </div>

        <div className="home-bonus-grid">
          {bonusRows.map((r, idx) => {
            const c = r.casino;

            return (
              <article className="home-content-card home-bonus-card" key={c.id}>
                <p className="home-card-type">#{idx + 1} · {c.name}</p>
                <h3>{c.bonuses?.headline}</h3>
                <p>
                  Bonus Quality Score: <strong>{r.bonusScore}</strong> · Evolution Score: {c.evolutionScore}
                </p>
                <p>Last verified: {c.bonuses?.lastVerified}</p>
                <a href={`/casinos/${c.slug}`}>View full review →</a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="home-section home-shell home-principles" aria-labelledby="principles-heading">
        <div>
          <p className="home-eyebrow">How EvoCasino is built</p>
          <h2 id="principles-heading">Editorial standards without ranking shortcuts</h2>
        </div>

        <div className="home-principles-grid">
          <article>
            <h3>Facts-only SSOT data</h3>
            <p>If schemas drift, the build fails. Unknowns stay unknown.</p>
          </article>
          <article>
            <h3>Deterministic rankings</h3>
            <p>Casino order is computed in code from the existing production scoring system.</p>
          </article>
          <article>
            <h3>No fake performance claims</h3>
            <p>Editorial analysis avoids payout testing claims that are not supported by data.</p>
          </article>
        </div>

        <a className="home-text-link" href="/how-we-rank">
          Read methodology →
        </a>
      </section>
    </main>
  );
}

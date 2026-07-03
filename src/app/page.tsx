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

const guideDescriptions = [
  "A complete editorial breakdown of Evolution's flagship live game show - bonus mechanics, RTP context, and bankroll discipline.",
  "How Lightning multipliers reshape the maths, volatility, and real trade-offs behind the table.",
  "A clear-eyed look at the bonus boards, hit frequency, and how the game compares to other Evolution wheels.",
];

const principles = [
  {
    title: "Deterministic rankings",
    body: "Every casino score is computed from the existing production scoring system. No manual ranking overrides.",
  },
  {
    title: "Single source of truth",
    body: "Guide, casino, bonus, payment, and score data come from production registries and loaders.",
  },
  {
    title: "Facts-only editorial",
    body: "Guides explain mechanics, maths, and trade-offs. Bonuses are documented, not exaggerated.",
  },
  {
    title: "Evolution-only scope",
    body: "The site focuses on Evolution Live Casino coverage so analysis can stay deep and consistent.",
  },
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
    <>
      <main className="home-page">
        <section className="home-hero" aria-labelledby="home-heading">
          <div className="home-container">
            <div className="home-hero-grid">
              <div className="home-hero-copy">
                <p className="home-eyebrow">Independent Editorial · Evolution Gaming</p>
                <h1 id="home-heading" className="home-hero-title">
                  The authority guide to <span>Evolution Live Casino</span>.
                </h1>
                <p className="home-hero-lede">
                  Deep game breakdowns, transparent casino rankings, and editorial analysis
                  of the world's most-played live dealer studio - built on real testing,
                  not marketing copy.
                </p>

                <div className="home-actions">
                  <a className="home-button home-button-primary" href={`/guides/${featuredGuide?.slug ?? "crazy-time"}`}>
                    Read the Crazy Time guide →
                  </a>
                  <a className="home-button home-button-secondary" href="/evolution-casinos">
                    Evolution casinos
                  </a>
                </div>
              </div>

              {featuredGuide && (
                <a className="home-feature-card" href={`/guides/${featuredGuide.slug}`}>
                  <span className="home-card-kicker">Featured Guide</span>
                  <span className="home-card-type">Game Show</span>
                  <strong className="home-card-title">
                    {featuredGuide.title.replace(" on Evolution Live", "")}
                  </strong>
                  <span className="home-card-copy">
                    A complete editorial breakdown of Evolution's flagship money-wheel game show - bonus mechanics,
                    RTP per segment, and bankroll discipline.
                  </span>
                  <span className="home-stat-grid" aria-label="Guide highlights">
                    <span>
                      <small>Focus</small>
                      <strong>Rules</strong>
                    </span>
                    <span>
                      <small>Includes</small>
                      <strong>Strategy</strong>
                    </span>
                  </span>
                  <span className="home-card-link">Read the full guide ↗</span>
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="home-trust-strip" aria-label="EvoCasino trust principles">
          <div className="home-container home-trust-list">
            {trustItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="featured-guides-heading">
          <div className="home-container">
            <div className="home-section-intro">
              <p className="home-eyebrow">Featured Guides</p>
              <h2 id="featured-guides-heading">Editorial breakdowns of Evolution's biggest games</h2>
              <p>
                Each guide unpacks the mechanics, maths and trade-offs - written for players who want to understand the game, not the marketing.
              </p>
            </div>

            <div className="home-guide-grid">
              {topGuides.map((guide, index) => (
                <a
                  className={index === 0 ? "home-guide-card" : "home-guide-card home-guide-card-muted"}
                  href={`/guides/${guide.slug}`}
                  key={guide.slug}
                >
                  <span className="home-card-type">{index === 1 ? "Live Roulette" : "Game Show"}</span>
                  <strong>{guide.title.replace(" on Evolution Live", "")}</strong>
                  <span>{guideDescriptions[index] ?? "A focused Evolution guide powered by production editorial data."}</span>
                  <span className="home-stat-grid" aria-label="Guide highlights">
                    <span>
                      <small>Source</small>
                      <strong>Guide</strong>
                    </span>
                    <span>
                      <small>Status</small>
                      <strong>{index === 0 ? "Live" : "Ready"}</strong>
                    </span>
                  </span>
                  <span className="home-card-link">{index === 0 ? "Read" : "Open"}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section-muted" aria-labelledby="games-heading">
          <div className="home-container">
            <div className="home-section-intro home-section-intro-row">
              <div>
                <p className="home-eyebrow">Evolution Games</p>
                <h2 id="games-heading">One studio. Covered in full.</h2>
              </div>
              <p>
                We focus exclusively on Evolution Gaming. Below is the working catalogue of games we cover - guides ship from the production guide registry.
              </p>
            </div>

            <div className="home-games-grid">
              {guideRegistry.map((guide, index) => (
                <a className="home-game-tile" href={`/guides/${guide.slug}`} key={guide.slug}>
                  <strong>{guide.title.replace(" on Evolution Live", "")}</strong>
                  <span>{index === 0 ? "Guide live" : "Guide"}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="casinos-heading">
          <div className="home-container">
            <div className="home-section-intro home-section-intro-row">
              <div>
                <p className="home-eyebrow">Casino Research</p>
                <h2 id="casinos-heading">Where to play Evolution live tables</h2>
              </div>
              <a className="home-text-link" href="/evolution-casinos">Full ranking</a>
            </div>

            <div className="home-casino-list">
              {topCasinos.map((casino, index) => (
                <article className="home-casino-card" key={casino.id}>
                  <div className="home-casino-rank">{index + 1}</div>
                  <div>
                    <h3>{casino.name}</h3>
                    <p>{casino.evolution.shows.join(", ")}</p>
                    <ul>
                      <li>Mobile: {casino.mobile.experience}/5</li>
                      <li>Payments: {casino.payments.methods.join(", ")}</li>
                    </ul>
                  </div>
                  <a href={`/casinos/${casino.slug}`}>Visit review</a>
                </article>
              ))}
            </div>

            <p className="home-research-note">
              Rankings reflect the existing Evolution experience score, production casino registry, and deterministic ranking logic.
            </p>
          </div>
        </section>

        <section className="home-section home-section-muted" aria-labelledby="principles-heading">
          <div className="home-container">
            <div className="home-section-intro home-section-intro-row">
              <div>
                <p className="home-eyebrow">Editorial Principles</p>
                <h2 id="principles-heading">How EvoCasino is built</h2>
              </div>
              <p>
                The architecture of the site is the integrity of the site. These are the rules our rankings, guides and data follow.
              </p>
            </div>

            <div className="home-principles-grid">
              {principles.map((principle) => (
                <article className="home-principle-card" key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="bonuses-heading">
          <div className="home-container home-bonus-panel">
            <div>
              <p className="home-eyebrow">On bonuses</p>
              <h2 id="bonuses-heading">Bonuses are listed, not sold.</h2>
              <p>
                Welcome offers and reload bonuses are documented from production facts. The game, the maths and the operator's track record come first.
              </p>
              <a className="home-button home-button-primary" href="/evolution-bonuses">See all bonuses →</a>
            </div>

            <div className="home-bonus-list">
              {bonusRows.slice(0, 3).map((row, index) => (
                <article className="home-bonus-card" key={row.casino.id}>
                  <span>#{index + 1}</span>
                  <h3>{row.casino.name}</h3>
                  <p>{row.casino.bonuses?.headline}</p>
                  <small>Bonus Quality Score: {row.bonusScore}</small>
                  <a href={`/casinos/${row.casino.slug}`}>View full review →</a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer-shell">
          <div>
            <div className="site-footer-brand">EvoCasino</div>
            <p>Independent authority on Evolution Live casinos.</p>
          </div>

          <nav aria-label="Footer guides">
            <h2>Guides</h2>
            {guideRegistry.slice(0, 4).map((guide) => (
              <a href={`/guides/${guide.slug}`} key={guide.slug}>{guide.title.replace(" on Evolution Live", "")}</a>
            ))}
          </nav>

          <nav aria-label="Footer casino research">
            <h2>Casino Research</h2>
            <a href="/evolution-casinos">Evolution Casinos</a>
            <a href="/evolution-games">Evolution Games</a>
            <a href="/evolution-bonuses">Evolution Bonuses</a>
            <a href="/how-we-rank">How We Rank</a>
          </nav>

          <nav aria-label="Footer company links">
            <h2>Company</h2>
            <a href="/how-we-rank">Disclosure</a>
          </nav>
        </div>

        <div className="site-footer-bottom">
          <div className="home-container">© 2026 EvoCasino. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}

import RankingExplainer from "@/components/evocasino/RankingExplainer";
import { filterAndRank, getAllCasinos } from "@/lib/evo/load";
import type { EvoCasinosFilters } from "@/lib/evo/load";
import type { EvolutionShow, PayoutSpeed, PaymentMethod } from "@/data/evocasino/schema";
import { evoBreadcrumbsEvolutionCasinos } from "@/lib/seo/jsonld";

function pick<T extends string>(v: string | undefined, allowed: readonly T[]): T | undefined {
  if (!v) return undefined;
  return (allowed as readonly string[]).includes(v) ? (v as T) : undefined;
}

export default function EvolutionCasinosPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {

  const sp = searchParams ?? {};

  const show = pick(sp.show as string | undefined, [
    "crazy-time",
    "monopoly-live",
    "lightning-roulette",
    "lightning-dice",
    "dream-catcher",
    "crazy-coin-flip",
  ] as const) as EvolutionShow | undefined;

  const payout = pick(sp.payout as string | undefined, ["fast", "avg", "slow"] as const) as PayoutSpeed | undefined;

  const payment = pick(sp.payment as string | undefined, [
    "ozow",
    "sid",
    "eft",
    "visa",
    "mastercard",
    "bitcoin",
    "usdt",
  ] as const) as PaymentMethod | undefined;

  const mobileMinRaw = sp.mobileMin as string | undefined;
  const mobileMin =
    mobileMinRaw && ["1", "2", "3", "4", "5"].includes(mobileMinRaw)
      ? (Number(mobileMinRaw) as 1 | 2 | 3 | 4 | 5)
      : undefined;

  const filters: EvoCasinosFilters = { show, payout, payment, mobileMin };

  const all = getAllCasinos();
  const rows = filterAndRank(all, filters);

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      {/* JSON-LD: Evo breadcrumbs (Evolution Casinos) (no UI) */}
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(evoBreadcrumbsEvolutionCasinos()) }}
      />
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>Best Evolution Live Casinos</h1>
      <p style={{ marginTop: 10, fontSize: 16, lineHeight: 1.5 }}>
        Ranked by a derived <strong>Evolution Score</strong> (0–100) computed from SSOT facts.
        Use filters to find the best casinos for specific Evolution games and features.
      </p>

      <section style={{ marginTop: 18, padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <strong>Quick links</strong>
        <div style={{ marginTop: 8, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="/games/crazy-time" style={{ textDecoration: "underline" }}>Crazy Time</a>
          <a href="/games/lightning-roulette" style={{ textDecoration: "underline" }}>Lightning Roulette</a>
          <a href="/games/monopoly-live" style={{ textDecoration: "underline" }}>Monopoly Live</a>
          <a href="/evolution-bonuses" style={{ textDecoration: "underline" }}>Evolution Bonuses</a>
          <a href="/how-we-rank" style={{ textDecoration: "underline" }}>How we rank</a>
        </div>
      </section>

      <section style={{ marginTop: 18, padding: 16, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <strong>Filters</strong>
          <a href="/evolution-casinos" style={{ textDecoration: "underline" }}>Clear</a>
        </div>

        <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
          <div>
            <span style={{ opacity: 0.75 }}>Show:</span>{" "}
            <a href="/evolution-casinos?show=crazy-time" style={{ textDecoration: "underline" }}>Crazy Time</a>{" · "}
            <a href="/evolution-casinos?show=lightning-roulette" style={{ textDecoration: "underline" }}>Lightning Roulette</a>{" · "}
            <a href="/evolution-casinos?show=monopoly-live" style={{ textDecoration: "underline" }}>Monopoly Live</a>
          </div>

          <div>
            <span style={{ opacity: 0.75 }}>Payout:</span>{" "}
            <a href="/evolution-casinos?payout=fast" style={{ textDecoration: "underline" }}>Fast</a>{" · "}
            <a href="/evolution-casinos?payout=avg" style={{ textDecoration: "underline" }}>Avg</a>{" · "}
            <a href="/evolution-casinos?payout=slow" style={{ textDecoration: "underline" }}>Slow</a>
          </div>

          <div>
            <span style={{ opacity: 0.75 }}>Mobile min:</span>{" "}
            <a href="/evolution-casinos?mobileMin=4" style={{ textDecoration: "underline" }}>4+</a>{" · "}
            <a href="/evolution-casinos?mobileMin=5" style={{ textDecoration: "underline" }}>5</a>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Ranked list</h2>

        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          {rows.map((c, idx) => (
            <div key={c.id} style={{ padding: 14, border: "1px solid #e5e7eb", borderRadius: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>
                    #{idx + 1} — {c.name}
                  </div>
                  <div style={{ marginTop: 6, opacity: 0.8 }}>
                    Shows: {c.evolution.shows.join(", ")} · Payout: {c.payouts.speed} · Mobile: {c.mobile.experience}/5
                  </div>
                  <div style={{ marginTop: 4, opacity: 0.75 }}>
                    Payments: {c.payments.methods.join(", ")}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>Score: {c.evolutionScore}</div>
                  <div style={{ marginTop: 8, display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
                    <a href={c.brandUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>Visit</a>
                    <a href={`/casinos/${c.slug}`} style={{ textDecoration: "underline" }}>Review</a>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 10, fontSize: 13, opacity: 0.7 }}>
                Verified: Evo {c.evolution.lastVerified} · Payments {c.payments.lastVerified} · Mobile {c.mobile.lastVerified} · Payout tested {c.payouts.lastTested}
              </div>
            </div>
          ))}
        </div>
      </section>

      <RankingExplainer variant="hub" />
    </main>
  );
}

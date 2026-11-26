"use client";

import { useMemo, useState } from "react";
import { SPOTS, chanceWithin, summarise, type SpotId, type Stakes } from "@/lib/tools/crazyTimeMath";

const pct = (x: number, d = 2) => (Number.isFinite(x) ? `${(x * 100).toFixed(d)}%` : "–");
const money = (x: number) => (Number.isFinite(x) ? x.toFixed(2) : "–");

const PRESETS: { label: string; stakes: Stakes }[] = [
  { label: "Number 1 only", stakes: { "1": 1 } },
  { label: "All four bonuses", stakes: { "coin-flip": 1, "cash-hunt": 1, pachinko: 1, "crazy-time": 1 } },
  { label: "Every spot, equal", stakes: { "1": 1, "2": 1, "5": 1, "10": 1, "coin-flip": 1, "cash-hunt": 1, pachinko: 1, "crazy-time": 1 } },
  { label: "Crazy Time only", stakes: { "crazy-time": 1 } },
];

const card = "rounded-lg border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--card))] p-5";
const eyebrow = "text-[10.5px] font-body font-semibold tracking-[0.18em] uppercase text-gold mb-2";

export default function CrazyTimeCalculator() {
  const [stakes, setStakes] = useState<Stakes>({ "1": 1, "coin-flip": 0.5, "cash-hunt": 0.5, pachinko: 0.5, "crazy-time": 0.5 });
  const [spins, setSpins] = useState(100);

  const s = useMemo(() => summarise(stakes), [stakes]);
  const n = Math.max(0, Math.min(100000, Math.floor(spins || 0)));

  const setStake = (id: SpotId, v: string) => {
    const num = parseFloat(v.replace(",", "."));
    setStakes((prev) => ({ ...prev, [id]: Number.isFinite(num) && num > 0 ? num : 0 }));
  };

  const bonuses = SPOTS.filter((x) => x.kind === "bonus");
  const anyBonusSegments = bonuses.reduce((a, b) => a + b.segments, 0);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <section className={card} aria-labelledby="ct-bets">
        <div className={eyebrow}>Step 1</div>
        <h2 id="ct-bets" className="text-[20px] font-heading font-semibold m-0 mb-1">Your bet per spin</h2>
        <p className="text-[14px] text-muted-foreground m-0 mb-4">
          Enter a stake for each spot you would cover. Any currency works — results use the same unit.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setStakes(p.stakes)}
              className="rounded-md border border-[hsl(var(--border))] px-3 py-1.5 text-[13px] font-body hover:bg-[hsl(var(--muted))]"
            >
              {p.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setStakes({})}
            className="rounded-md px-3 py-1.5 text-[13px] font-body text-muted-foreground hover:underline"
          >
            Clear
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SPOTS.map((spot) => (
            <label key={spot.id} className="block">
              <span className="block text-[12px] font-body font-semibold text-foreground mb-1">
                {spot.label}{" "}
                <span className="font-normal text-muted-foreground">({spot.segments}/54)</span>
              </span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step="0.1"
                value={stakes[spot.id] ? String(stakes[spot.id]) : ""}
                placeholder="0"
                onChange={(e) => setStake(spot.id, e.target.value)}
                className="w-full rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-2 text-[15px] tabular-nums"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Per-spin result */}
      <section className={card} aria-labelledby="ct-result">
        <div className={eyebrow}>Step 2</div>
        <h2 id="ct-result" className="text-[20px] font-heading font-semibold m-0 mb-4">What this bet means per spin</h2>
        {s.totalStake === 0 ? (
          <p className="text-[14px] text-muted-foreground m-0">Enter a stake on at least one spot.</p>
        ) : (
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 m-0">
            {[
              ["Total stake", money(s.totalStake)],
              ["Chance one of your spots lands", pct(s.coverage, 1)],
              ["Theoretical RTP of this pattern", pct(s.blendedRtp)],
              ["Expected cost per spin", money(s.expectedLoss)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[12px] text-muted-foreground mb-1">{k}</dt>
                <dd className="m-0 text-[22px] font-heading font-semibold tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        )}
        <p className="text-[13px] text-muted-foreground mt-4 mb-0">
          Covering more spots raises the chance that <em>something</em> lands, but every spot keeps its own house
          edge — so the expected cost grows with your total stake. A spot landing is not the same as a profit: if you
          cover several spots, a hit on 1 or 2 often pays back less than your total stake.
        </p>
      </section>

      {/* Session */}
      <section className={card} aria-labelledby="ct-session">
        <div className={eyebrow}>Step 3</div>
        <h2 id="ct-session" className="text-[20px] font-heading font-semibold m-0 mb-1">Over a session</h2>
        <label className="flex items-center gap-3 text-[14px] mb-4">
          Number of spins
          <input
            type="number"
            min={1}
            max={100000}
            value={spins}
            onChange={(e) => setSpins(parseInt(e.target.value, 10))}
            className="w-28 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-1.5 tabular-nums"
          />
        </label>

        {s.totalStake > 0 && (
          <p className="text-[15px] m-0 mb-4">
            Total wagered: <strong className="tabular-nums">{money(s.totalStake * n)}</strong> · long-run expected
            cost: <strong className="tabular-nums">{money(s.expectedLoss * n)}</strong>
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-[14px] border-collapse">
            <thead>
              <tr className="text-left text-muted-foreground text-[12px]">
                <th className="py-2 pr-4 font-semibold">Bonus round</th>
                <th className="py-2 pr-4 font-semibold">Chance per spin</th>
                <th className="py-2 pr-4 font-semibold">Average gap</th>
                <th className="py-2 font-semibold">Chance to see it at least once in {n} spins</th>
              </tr>
            </thead>
            <tbody>
              {bonuses.map((b) => (
                <tr key={b.id} className="border-t border-[hsl(var(--border)/0.6)]">
                  <td className="py-2 pr-4">{b.label}</td>
                  <td className="py-2 pr-4 tabular-nums">{pct(b.segments / 54)}</td>
                  <td className="py-2 pr-4 tabular-nums">1 in {(54 / b.segments).toFixed(1)}</td>
                  <td className="py-2 tabular-nums">{pct(chanceWithin(b.segments, n), 1)}</td>
                </tr>
              ))}
              <tr className="border-t border-[hsl(var(--border)/0.6)] font-semibold">
                <td className="py-2 pr-4">Any bonus</td>
                <td className="py-2 pr-4 tabular-nums">{pct(anyBonusSegments / 54)}</td>
                <td className="py-2 pr-4 tabular-nums">1 in {(54 / anyBonusSegments).toFixed(1)}</td>
                <td className="py-2 tabular-nums">{pct(chanceWithin(anyBonusSegments, n), 1)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[13px] text-muted-foreground mt-4 mb-0">
          The wheel has no memory. A bonus that has not landed for 200 spins is exactly as likely on the next spin as
          on any other — it is never &ldquo;due&rdquo;. The expected cost is a long-run average; real sessions swing far
          above and below it, because most of Crazy Time&apos;s return comes from rare, large bonus results.
        </p>
      </section>
    </div>
  );
}

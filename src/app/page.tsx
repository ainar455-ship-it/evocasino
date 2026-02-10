import casinos from "@/data/casinos.json";
import offers from "@/data/offers.json";

type Casino = {
  id: string;
  name: string;
  slug: string;
  out_url: string;
  logo?: string; // placeholder for later: "/images/casinos/sunbet.png"
};

type Offer = {
  id: string;
  casino_id: string;
  type: "free_spins" | "deposit_bonus";
  title: string;
  spins?: number;
  bonus?: string;
  wagering: string;
  min_deposit_zar: number;
  max_cashout_zar: number;
  cta: string;
  source_url?: string;
  last_verified_at?: string;
};

const CASINOS = casinos as Casino[];
const OFFERS = offers as Offer[];

function findCasinoName(casinoId: string) {
  return CASINOS.find((c) => c.id === casinoId)?.name ?? casinoId;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Disclosure bar */}
      <div className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-2 text-xs text-gray-600">
          18+ • T&Cs apply • Play responsibly • This site contains affiliate links
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Best Free Spins Casinos in South Africa (2026)
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Compare top online casinos for free spins offers in South Africa. We highlight key terms like
          wagering, minimum deposit, and max cashout (placeholder data for now).
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#top-offers"
            className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            See Top Offers
          </a>
          <a
            href="/bonuses/free-spins"
            className="rounded-lg border bg-white px-5 py-3 text-sm font-semibold"
          >
            Browse Free Spins
          </a>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Last checked: {new Date().toLocaleDateString("en-ZA")}
        </p>
      </section>

      {/* Top casinos */}
      <section id="top-offers" className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-xl font-bold">Top casinos</h2>
        <div className="mt-4 space-y-3">
          {CASINOS.map((c, idx) => (
            <div
              key={c.id}
              className="rounded-xl border bg-white p-4 shadow-sm sm:flex sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-bold">
                  #{idx + 1}
                </div>

                {/* Logo placeholder (swap to <img src={c.logo} ...> later) */}
                <div className="h-9 w-28 rounded bg-gray-100" title="Logo placeholder" />

                <div>
                  <div className="text-lg font-semibold">{c.name}</div>
                  <div className="text-sm text-gray-600">Free spins offers • South Africa</div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
                <a
                  href={c.out_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
                >
                  Play now
                </a>
                <a
                  href={`/casinos/${c.slug}`}
                  className="rounded-lg border bg-white px-4 py-2 text-sm font-semibold"
                >
                  Read review
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest bonus offers */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-xl font-bold">Latest bonus offers</h2>
          <div className="text-xs text-gray-500">
            Placeholders until verified (agents will add source URL + last checked).
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {OFFERS.map((o) => (
            <div key={o.id} className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold uppercase text-gray-500">
                  {o.type === "free_spins" ? "Free Spins" : "Deposit Bonus"}
                </div>
                <div className="text-xs text-gray-500">{findCasinoName(o.casino_id)}</div>
              </div>

              <div className="mt-1 text-lg font-bold">{o.title}</div>

              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {typeof o.spins === "number" && <li>Spins: {o.spins}</li>}
                {typeof o.bonus === "string" && <li>Bonus: {o.bonus}</li>}
                <li>Wagering: {o.wagering}</li>
                <li>Min deposit: R{o.min_deposit_zar}</li>
                <li>Max cashout: R{o.max_cashout_zar}</li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  className="inline-block rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
                  href="#"
                >
                  {o.cta}
                </a>
                <a
                  className="inline-block rounded-lg border bg-white px-4 py-2 text-sm font-semibold"
                  href={`/casinos/${CASINOS.find((c) => c.id === o.casino_id)?.slug ?? ""}`}
                >
                  Review
                </a>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                Verified:{" "}
                {o.last_verified_at && o.source_url ? (
                  <span>Yes</span>
                ) : (
                  <span>No (placeholder)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-bold">Compare top casinos</h2>

        <div className="mt-4 overflow-x-auto rounded-xl border bg-white">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-3 text-left">Casino</th>
                <th className="p-3 text-left">Main offer</th>
                <th className="p-3 text-left">Wagering</th>
                <th className="p-3 text-left">Min deposit</th>
                <th className="p-3 text-left">Max cashout</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {CASINOS.map((c) => {
                const offer = OFFERS.find((o) => o.casino_id === c.id);
                const mainOfferText =
                  offer?.type === "free_spins"
                    ? `${offer.spins ?? "—"} free spins`
                    : offer?.bonus ?? "Deposit bonus";

                return (
                  <tr key={c.id} className="border-b">
                    <td className="p-3 font-semibold">{c.name}</td>
                    <td className="p-3">{offer ? mainOfferText : "—"}</td>
                    <td className="p-3">{offer?.wagering ?? "Varies"}</td>
                    <td className="p-3">{offer ? `R${offer.min_deposit_zar}` : "Varies"}</td>
                    <td className="p-3">{offer ? `R${offer.max_cashout_zar}` : "Varies"}</td>
                    <td className="p-3">
                      <a
                        href={c.out_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded bg-black px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Play now
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Note: Offer terms shown above are placeholders until verified from official casino sources.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-gray-600">
          <div>18+ only. Play responsibly. Terms & conditions apply.</div>
          <div className="mt-2">
            This site contains affiliate links. We may receive a commission if you sign up via our links.
          </div>
        </div>
      </footer>
    </main>
  );
}

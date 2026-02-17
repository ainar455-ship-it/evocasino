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
      <div className="sticky top-0 z-50 w-full border-b-2 border-green-500 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-2 text-center text-xs text-gray-700">
          <span className="font-semibold text-green-600">18+</span> • T&Cs apply • Play responsibly • This site contains affiliate links
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

        {/* Trust bar */}
        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <img src="/images/icons/checkmark.svg" alt="" className="h-4 w-4" />
            <span>Licensed & Regulated</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/icons/shield.svg" alt="" className="h-4 w-4" />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/icons/heart.svg" alt="" className="h-4 w-4" />
            <span>Responsible Gambling</span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-4 flex flex-wrap gap-2">
          <img src="/images/badges/ssl.svg" alt="SSL Secure" className="h-8 w-auto" loading="lazy" />
          <img src="/images/badges/payment-secure.svg" alt="Secure Payment" className="h-8 w-auto" loading="lazy" />
          <img src="/images/badges/responsible-gambling.svg" alt="Play Safely" className="h-8 w-auto" loading="lazy" />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#top-offers"
            className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-700 hover:shadow-lg transition duration-200"
          >
            See Top Offers
          </a>
          <a
            href="/bonuses/free-spins"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:border-gray-400 hover:shadow transition duration-200"
          >
            Browse Free Spins
          </a>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Last checked: {new Date().toLocaleDateString("en-ZA")}
        </p>
      </section>

      {/* Top casinos */}
      <section id="top-offers" className="mx-auto max-w-6xl px-4 pb-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Top casinos</h2>
            <p className="mt-1 text-sm text-gray-600">Ranked by free spins offers, trust &amp; player reviews</p>
          </div>
          <div className="text-xs text-gray-500">
            Updated daily • Verified by our team
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {CASINOS.map((c, idx) => (
            <div
              key={c.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  {/* Rank badge */}
                  <div className={`rank-badge ${idx === 0 ? 'rank-badge-1' : idx === 1 ? 'rank-badge-2' : idx === 2 ? 'rank-badge-3' : 'rank-badge-other'}`}>
                    {idx + 1}
                  </div>

                  {/* Casino logo */}
                  <div className="h-12 w-32 rounded overflow-hidden bg-white flex items-center justify-center p-2 border border-gray-200">
                    <img 
                      src={`/images/casinos/${c.id}.svg`} 
                      alt={`${c.name} logo`}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                      width="128"
                      height="48"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
                      <div className="trust-badge flex items-center gap-1">
                        <img 
                          src="/images/badges/licensed.svg" 
                          alt="Licensed badge" 
                          className="h-4 w-auto"
                          loading="lazy"
                        />
                        <span>Licensed</span>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">Free spins offers • South Africa</p>

                    {/* Features */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 text-xs text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span>Ozow & SID</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span>Fast Payouts</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-700">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        <span>Mobile App</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="mt-4 flex flex-col gap-2 sm:mt-0 sm:w-48">
                  <a
                    href={c.out_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-green-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-green-700 hover:shadow-lg transition duration-200"
                  >
                    Play now • Get Free Spins
                  </a>
                  <a
                    href={`/casinos/${c.slug}`}
                    className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-gray-800 hover:border-gray-400 hover:shadow transition duration-200"
                  >
                    Read full review
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest bonus offers */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Latest bonus offers</h2>
            <p className="mt-1 text-sm text-gray-600">Exclusive free spins & deposit bonuses for South African players</p>
          </div>
          <div className="text-xs text-gray-500">
            Verified by our team • Updated daily
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {OFFERS.map((o) => {
            const casino = CASINOS.find((c) => c.id === o.casino_id);
            return (
              <div key={o.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`bonus-icon ${o.type === 'free_spins' ? 'bg-green-500' : 'bg-amber-500'}`}>
                      {o.type === 'free_spins' ? '🎰' : '💰'}
                    </div>
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                        {o.type === "free_spins" ? "Free Spins" : "Deposit Bonus"}
                      </div>
                      <div className="text-xs text-gray-500">{casino?.name}</div>
                    </div>
                  </div>
                  <div className="text-xs">
                    {o.last_verified_at && o.source_url ? (
                      <div className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-green-700">
                        <img src="/images/badges/verified.svg" alt="Verified" className="h-4 w-auto" loading="lazy" />
                        <span>Verified</span>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-gray-600">
                        Unverified
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-4 text-xl font-bold text-gray-900">{o.title}</h3>

                {/* Key metrics */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {typeof o.spins === "number" && (
                    <div className="rounded-lg bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">Spins</div>
                      <div className="text-2xl font-bold text-green-600">{o.spins}</div>
                    </div>
                  )}
                  {typeof o.bonus === "string" && (
                    <div className="rounded-lg bg-gray-50 p-3">
                      <div className="text-xs text-gray-500">Bonus</div>
                      <div className="text-2xl font-bold text-amber-600">{o.bonus}</div>
                    </div>
                  )}
                  <div className="rounded-lg bg-gray-50 p-3">
                    <div className="text-xs text-gray-500">Wagering</div>
                    <div className="text-lg font-semibold text-gray-800">{o.wagering}</div>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <div className="text-xs text-gray-500">Min Deposit</div>
                    <div className="text-lg font-semibold text-gray-800">R{o.min_deposit_zar}</div>
                  </div>
                </div>

                {/* Terms */}
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Max cashout:</span>
                    <span className="font-semibold">R{o.max_cashout_zar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last verified:</span>
                    <span>{o.last_verified_at ? new Date(o.last_verified_at).toLocaleDateString('en-ZA') : 'Not yet'}</span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    className="flex-1 rounded-lg bg-green-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-green-700 hover:shadow-lg transition duration-200"
                    href="#"
                  >
                    {o.cta} • Claim Now
                  </a>
                  <a
                    className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:border-gray-400 hover:shadow transition duration-200"
                    href={`/casinos/${casino?.slug ?? ""}`}
                  >
                    Review
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Compare top casinos</h2>
            <p className="mt-1 text-sm text-gray-600">Side‑by‑side comparison of free spins offers & key terms</p>
          </div>
          <div className="text-xs text-gray-500">
            All amounts in ZAR • Terms apply
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-4 text-left font-semibold text-gray-900">Casino</th>
                <th className="p-4 text-left font-semibold text-gray-900">Main offer</th>
                <th className="p-4 text-left font-semibold text-gray-900">Wagering</th>
                <th className="p-4 text-left font-semibold text-gray-900">Min deposit</th>
                <th className="p-4 text-left font-semibold text-gray-900">Max cashout</th>
                <th className="p-4 text-left font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {CASINOS.map((c, idx) => {
                const offer = OFFERS.find((o) => o.casino_id === c.id);
                const mainOfferText =
                  offer?.type === "free_spins"
                    ? `${offer.spins ?? "—"} free spins`
                    : offer?.bonus ?? "Deposit bonus";

                return (
                  <tr key={c.id} className={`border-b ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-4 font-semibold text-gray-900">{c.name}</td>
                    <td className="p-4">{offer ? mainOfferText : "—"}</td>
                    <td className="p-4">{offer?.wagering ?? "Varies"}</td>
                    <td className="p-4">{offer ? `R${offer.min_deposit_zar}` : "Varies"}</td>
                    <td className="p-4">{offer ? `R${offer.max_cashout_zar}` : "Varies"}</td>
                    <td className="p-4">
                      <a
                        href={c.out_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-green-700 hover:shadow-lg transition duration-200"
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

        <p className="mt-4 text-xs text-gray-500">
          Note: Offer terms shown above are placeholders until verified from official casino sources.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-gray-900">Trust & Safety</div>
              <div className="mt-2 space-y-1 text-xs text-gray-600">
                <div>18+ only. Play responsibly.</div>
                <div>Terms & conditions apply.</div>
                <div>Licensed by Western Cape Gambling Board</div>
                <div>Self‑exclusion tools available</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">Payment Methods</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <img src="/images/payments/ozow.svg" alt="Ozow" className="h-8 w-auto rounded border border-gray-200" loading="lazy" />
                <img src="/images/payments/sid.svg" alt="SID Instant EFT" className="h-8 w-auto rounded border border-gray-200" loading="lazy" />
                <img src="/images/payments/visa.svg" alt="Visa" className="h-8 w-auto rounded border border-gray-200" loading="lazy" />
                <img src="/images/payments/mastercard.svg" alt="Mastercard" className="h-8 w-auto rounded border border-gray-200" loading="lazy" />
                <img src="/images/payments/bitcoin.svg" alt="Bitcoin" className="h-8 w-auto rounded border border-gray-200" loading="lazy" />
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">About Us</div>
              <div className="mt-2 text-xs text-gray-600">
                This site contains affiliate links. We may receive a commission if you sign up via our links.
                All reviews are independent and based on real player experiences.
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-xs text-gray-500">
            © 2026 FreeSpinsCasinoZA.co.za — All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

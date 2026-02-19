import casinos from "@/data/casinos.json";
import offers from "@/data/offers.json";

type Casino = {
  id: string;
  name: string;
  slug: string;
  out_url: string;
  logo?: string;
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

export default function FreeSpinsPage() {
  const freeSpinsOffers = OFFERS.filter((o) => o.type === "free_spins");

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
          Free Spins Bonuses in South Africa (2026)
        </h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Discover the best free spins offers from top South African casinos. All offers are verified and updated daily. 
          No deposit required on many offers. 18+ only. T&Cs apply.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/#top-offers"
            className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-700 hover:shadow-lg transition duration-200"
          >
            Back to Top Casinos
          </a>
          <a
            href="/"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:border-gray-400 hover:shadow transition duration-200"
          >
            Browse All Offers
          </a>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Last updated: {new Date().toLocaleDateString("en-ZA")}
        </p>
      </section>

      {/* Free Spins Offers Grid */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Available Free Spins Offers</h2>
          <p className="mt-2 text-sm text-gray-600">
            {freeSpinsOffers.length} verified offers from top casinos
          </p>
        </div>

        {freeSpinsOffers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {freeSpinsOffers.map((offer) => {
              const casino = CASINOS.find((c) => c.id === offer.casino_id);
              return (
                <div
                  key={offer.id}
                  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{offer.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{casino?.name}</p>
                    </div>
                    {offer.last_verified_at ? (
                      <div className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-green-700">
                        <img src="/images/badges/verified.svg" alt="Verified" className="h-3 w-auto" loading="lazy" />
                        <span className="text-xs font-semibold">Verified</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Spins highlight */}
                  <div className="mb-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 border border-green-200">
                    {typeof offer.spins === "number" && (
                      <div>
                        <div className="text-sm text-gray-600">Free Spins</div>
                        <div className="text-3xl font-bold text-green-600 mt-1">{offer.spins}</div>
                      </div>
                    )}
                  </div>

                  {/* Key terms */}
                  <div className="space-y-2 mb-4 text-sm flex-grow">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wagering:</span>
                      <span className="font-semibold text-gray-900">{offer.wagering}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Deposit:</span>
                      <span className="font-semibold text-gray-900">R{offer.min_deposit_zar}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Cashout:</span>
                      <span className="font-semibold text-gray-900">R{offer.max_cashout_zar}</span>
                    </div>
                    {offer.last_verified_at && (
                      <div className="flex justify-between text-xs text-gray-500 mt-3 pt-3 border-t">
                        <span>Last verified:</span>
                        <span>{new Date(offer.last_verified_at).toLocaleDateString("en-ZA")}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2 mt-auto">
                    <a
                      href={casino?.out_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-green-700 hover:shadow-lg transition duration-200"
                    >
                      Claim Now
                    </a>
                    {casino && (
                      <a
                        href={`/casinos/${casino.slug}`}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-gray-800 hover:border-gray-400 hover:shadow transition duration-200"
                      >
                        Review
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-600">No free spins offers available at the moment.</p>
          </div>
        )}
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

import { Button } from "@/components/layout-v1/primitives/Button";
import { Container } from "@/components/layout-v1/primitives/Container";
import type { Casino } from "@/lib/content/schemas";

type TopCasino = Casino & {
  id: string;
  name: string;
  slug: string;
  affiliateLink: string;
};

type Props = {
  topCasinos: TopCasino[];
};

export function TopCasinosList({ topCasinos }: Props) {
  return (
    <section id="top-offers" className="py-16 bg-gray-50">
      <Container className="max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Best Free Spins Casinos in South Africa
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our top-ranked casinos based on free spins offers, trustworthiness, and player reviews.
          </p>
        </div>

        <div className="space-y-4">
          {topCasinos.map((c, idx) => {
            const rank = idx + 1;
            const isTop3 = rank <= 3;

            return (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-5">
                  {/* Top 3 badges */}
                  {isTop3 && (
                    <div className="absolute top-4 right-4">
                      {rank === 1 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                          #1 BEST
                        </span>
                      )}
                      {rank === 2 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gray-400 to-gray-600 text-white">
                          #2 RUNNER UP
                        </span>
                      )}
                      {rank === 3 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-700 to-orange-900 text-white">
                          #3 VALUE
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                    {/* Rank badge */}
                    <div className="flex-shrink-0">
                      <div className={`rank-badge rank-badge-${isTop3 ? rank : 'other'}`}>
                        {rank}
                      </div>
                    </div>

                    {/* Casino logo block */}
                    <div className="flex-shrink-0">
                      <div className="h-16 w-40 rounded-lg overflow-hidden bg-white flex items-center justify-center p-3 border border-gray-200">
                        <img
                          src={`/images/casinos/${c.id}.svg`}
                          alt={`${c.name} logo`}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Bonus details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{c.name}</h3>

                      {/* Bonus headline */}
                      <div className="mb-3">
                        <p className="text-base font-semibold text-gray-900">
                          {c.name} offers up to 100% Match + 50 Free Spins
                        </p>
                      </div>

                      {/* Green check bullets (Bonus.com style) */}
                      <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                        <span className="check-bullet">Ozow & SID Payments</span>
                        <span className="check-bullet">Fast Payouts</span>
                        <span className="check-bullet">Mobile App Available</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Licensed & Regulated
                        </span>
                      </div>

                      {c.rating && (
                        <div className="text-sm text-gray-500">
                          {c.reviewCount && <span className="mr-2">({c.reviewCount} reviews)</span>}
                          <span className="text-amber-500 font-semibold">{c.rating} ★</span>
                        </div>
                      )}
                    </div>

                    {/* CTA button */}
                    <div className="flex-shrink-0 w-full lg:w-auto">
                      <Button href={c.affiliateLink} variant="primary" className="button-cta w-full lg:w-auto">
                        Play Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

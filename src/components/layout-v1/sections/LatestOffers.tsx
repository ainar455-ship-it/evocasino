import { Button } from "@/components/layout-v1/primitives/Button";
import { Container } from "@/components/layout-v1/primitives/Container";
import type { Offer as BaseOffer } from "@/lib/content/schemas";

type Offer = BaseOffer & {
  casinoName: string;
  casinoSlug: string;
  affiliateLink: string;
};

type Props = {
  offers: Offer[];
  variant?: "compact" | "detailed";
};

function formatVerified(date?: string | null) {
  if (!date) return null;
  const ts = Date.parse(date);
  if (Number.isNaN(ts)) return null;
  return new Date(ts).toLocaleDateString("en-ZA", { year: "numeric", month: "short", day: "numeric" });
}

export function LatestOffers({ offers, variant = "compact" }: Props) {
  if (!offers?.length) return null;

  // Detailed variant (for free-spins page)
  if (variant === "detailed") {
    return (
      <section id="latest-offers" className="py-16 bg-white">
        <Container className="max-w-4xl">
          <div className="space-y-4">
            {offers.map((o, idx) => {
              const verified = formatVerified(o.lastVerifiedAt);
              const rank = idx + 1;

              return (
                <div
                  key={o.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                      {/* Rank badge */}
                      <div className="flex-shrink-0">
                        <div className={`rank-badge rank-badge-${rank <= 3 ? rank : 'other'}`}>
                          {rank}
                        </div>
                      </div>

                      {/* Logo and basic info */}
                      <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
                        <div className="flex h-16 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-2 flex-shrink-0">
                          <img
                            src={`/images/casinos/${o.casinoId}.svg`}
                            alt={`${o.casinoName} logo`}
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-bold text-gray-900">{o.casinoName}</h3>
                            {verified && (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Verified: {verified}
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-lg font-semibold text-gray-900">{o.title}</p>
                          
                          {/* Spins highlight */}
                          {o.spins && (
                            <div className="mt-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 border border-green-200">
                              <div className="text-sm text-gray-600">Free Spins</div>
                              <div className="text-3xl font-bold text-green-600">{o.spins}</div>
                            </div>
                          )}

                          {/* Green check bullets */}
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                            <span className="check-bullet">
                              {o.spins ? `${o.spins} Free Spins` : "Deposit Bonus"}
                            </span>
                            <span className="check-bullet">
                              Wagering: {o.wagering}
                            </span>
                            <span className="check-bullet">
                              Min Deposit: R{o.minDepositZar}
                            </span>
                          </div>

                          {/* Promo box */}
                          {o.bonusText && (
                            <div className="mt-3 promo-box">
                              <p className="text-sm text-gray-600 mb-1">Promo Code:</p>
                              <code className="bg-white px-2 py-1 rounded border border-gray-300 inline-block">
                                {o.bonusText}
                              </code>
                            </div>
                          )}

                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button href={o.affiliateLink} variant="primary" className="w-full sm:w-auto">
                              Claim Now
                            </Button>
                            <Button href={`/casinos/${o.casinoSlug}`} variant="secondary" className="w-full sm:w-auto">
                              Read Full Review
                            </Button>
                          </div>
                        </div>
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

  // Compact variant (default)
  return (
    <section id="latest-offers" className="py-16 bg-white">
      <Container className="max-w-4xl">
        <div className="space-y-4">
          {offers.map((o, idx) => {
            const verified = formatVerified(o.lastVerifiedAt);
            const rank = idx + 1;

            return (
              <div
                key={o.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                    {/* Rank badge */}
                    <div className="flex-shrink-0">
                      <div className={`rank-badge rank-badge-${rank <= 3 ? rank : 'other'}`}>
                        {rank}
                      </div>
                    </div>

                    {/* Casino logo */}
                    <div className="flex-shrink-0">
                      <div className="h-14 w-32 rounded-lg overflow-hidden bg-white flex items-center justify-center p-2 border border-gray-200">
                        <img
                          src={`/images/casinos/${o.casinoId}.svg`}
                          alt={`${o.casinoName} logo`}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Offer details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{o.casinoName}</h3>

                      {/* Bonus headline */}
                      <div className="mb-2">
                        <p className="text-base font-semibold text-gray-900">
                          {o.title}
                        </p>
                      </div>

                      {/* Green check bullets */}
                      <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
                        <span className="check-bullet">
                          {o.spins ? `${o.spins} Free Spins` : "Deposit Bonus"}
                        </span>
                        <span className="check-bullet">
                          Wagering: {o.wagering}
                        </span>
                        <span className="check-bullet">
                          Min Deposit: R{o.minDepositZar}
                        </span>
                      </div>

                      {verified && (
                        <div className="mb-3">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified: {verified}
                          </span>
                        </div>
                      )}

                      {/* Promo box */}
                      {o.bonusText && (
                        <div className="promo-box">
                          <p className="text-sm text-gray-600 mb-1">Promo Code:</p>
                          <code className="bg-white px-2 py-1 rounded border border-gray-300 inline-block">
                            {o.bonusText}
                          </code>
                        </div>
                      )}
                    </div>

                    {/* CTA button */}
                    <div className="flex-shrink-0 w-full lg:w-auto">
                      <Button href={o.affiliateLink} variant="primary" className="button-cta w-full lg:w-auto">
                        Claim Now
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

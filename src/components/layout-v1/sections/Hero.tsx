import { Button } from "@/components/layout-v1/primitives/Button";
import { Container } from "@/components/layout-v1/primitives/Container";
import { Text } from "@/components/layout-v1/primitives/Text";

export function Hero() {
  return (
    <section className="relative py-16">
      {/* Blue gradient background (Bonus.com style) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>
      
      <Container className="relative max-w-6xl">
        <div className="max-w-3xl">
          <Text as="h1" className="text-3xl sm:text-5xl font-bold text-white">
            Best Free Spins Casinos in South Africa (2026)
          </Text>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-blue-50">
            Compare top online casinos for free spins offers in South Africa. We highlight key terms like
            wagering, minimum deposit, and max cashout.
          </p>
        </div>

        {/* Checkmarks row */}
        <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-blue-100">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Licensed & Regulated</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Responsible Gambling</span>
          </div>
        </div>

        {/* Badges row */}
        <div className="mt-6 flex flex-wrap gap-3">
          <img src="/images/badges/ssl.svg" alt="SSL Secure" className="h-8 w-auto" loading="lazy" />
          <img src="/images/badges/payment-secure.svg" alt="Secure Payment" className="h-8 w-auto" loading="lazy" />
          <img src="/images/badges/responsible-gambling.svg" alt="Play Safely" className="h-8 w-auto" loading="lazy" />
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#top-offers" variant="primary" className="px-6 py-3">
            See Top Offers
          </Button>
          <Button href="/bonuses/free-spins" variant="secondary" className="px-6 py-3">
            Browse Free Spins
          </Button>
        </div>

        <p className="mt-6 text-xs text-blue-200">
          Last checked: {new Date().toLocaleDateString("en-ZA")}
        </p>
      </Container>
    </section>
  );
}

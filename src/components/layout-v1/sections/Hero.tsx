import { Button } from "@/components/layout-v1/primitives/Button";
import { Container } from "@/components/layout-v1/primitives/Container";
import { Text } from "@/components/layout-v1/primitives/Text";

export function Hero() {
  return (
    <section className="relative py-16">
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900"></div>
      
      <Container className="relative max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <Text as="h1" className="text-3xl sm:text-5xl font-bold text-white">
            Best Free Spins Casinos in South Africa (2026)
          </Text>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/90">
            Compare top online casinos for free spins offers in South Africa. We highlight key terms like
            wagering, minimum deposit, and max cashout.
          </p>
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

        <p className="mt-6 text-xs text-white/80">
          Last checked: {new Date().toLocaleDateString("en-ZA")}
        </p>
      </Container>
    </section>
  );
}

import { Button } from "@/components/layout-v1/primitives/Button";
import { Container } from "@/components/layout-v1/primitives/Container";

type Props = {
  name: string;
  logo: { src: string; alt: string };
  offerTitle: string;
  lastUpdated: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustBadges: { label: string }[];
  metaLine?: string;
};

export function CasinoHero({
  name,
  logo,
  offerTitle,
  lastUpdated,
  primaryCta,
  secondaryCta,
  trustBadges,
  metaLine,
}: Props) {
  return (
    <section className="relative py-8 sm:py-12 bg-gradient-to-br from-[#1a2b4a] to-[#2c4b7a]">
      <Container className="max-w-5xl">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center h-24 w-64 overflow-hidden rounded-lg bg-white/10 p-4 backdrop-blur-sm border border-white/20">
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-h-full max-w-full object-contain"
              loading="eager"
            />
          </div>
          <h1 className="mt-4 text-2xl sm:text-4xl font-bold text-white text-center">
            {name}
          </h1>
          {metaLine && (
            <p className="mt-2 text-sm text-white/70 text-center">{metaLine}</p>
          )}
        </div>

        {/* Offer Highlight */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#FF6B00]">
            {offerTitle}
          </h2>
          <p className="mt-2 text-white/90 text-sm sm:text-base">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Trust Badges - Bonus.com solid blue pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {trustBadges.map((badge) => (
            <span
              key={badge.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0d53b3] px-3 py-1.5 text-xs font-semibold text-white shadow-sm"
            >
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {badge.label}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href={primaryCta.href} variant="primary" className="w-full sm:w-auto px-8 py-4 text-lg">
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href} variant="secondary" className="w-full sm:w-auto px-8 py-4 text-lg">
            {secondaryCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}

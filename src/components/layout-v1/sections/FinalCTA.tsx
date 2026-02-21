import { Button } from "@/components/layout-v1/primitives/Button";
import { Container } from "@/components/layout-v1/primitives/Container";

type Props = {
  title: string;
  primaryCta: { label: string; href: string };
  secondaryLink: { label: string; href: string };
  disclaimer?: string;
};

export function FinalCTA({ title, primaryCta, secondaryLink, disclaimer }: Props) {
  return (
    <section className="py-10 bg-gradient-to-br from-[#1a2b4a] to-[#2c4b7a]">
      <Container className="max-w-3xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{title}</h2>

        <div className="flex flex-col gap-3">
          <Button href={primaryCta.href} variant="primary" className="w-full px-8 py-4 text-lg">
            {primaryCta.label}
          </Button>
          <Button href={secondaryLink.href} variant="outline" className="w-full px-8 py-3 text-base text-white border-white hover:bg-white hover:text-[#1a2b4a]">
            {secondaryLink.label}
          </Button>
        </div>

        {disclaimer && (
          <p className="mt-6 text-xs text-white/60">
            {disclaimer}
          </p>
        )}
      </Container>
    </section>
  );
}

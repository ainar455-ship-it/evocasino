import Link from "next/link";

const guidesLinks = [
  { label: "Crazy Time", to: "/guides/crazy-time" },
  { label: "Lightning Roulette", to: "/guides/lightning-roulette" },
  { label: "Monopoly Live", to: "/guides/monopoly-live" },
  { label: "Dream Catcher", to: "/guides/dream-catcher" },
];

const researchLinks = [
  { label: "Evolution Casinos", to: "/evolution-casinos" },
  { label: "Evolution Games", to: "/evolution-games" },
  { label: "Evolution Bonuses", to: "/evolution-bonuses" },
  { label: "How We Rank", to: "/how-we-rank" },
];

const companyLinks = [
  { label: "How We Rank", to: "/how-we-rank" },
  { label: "Affiliate Disclosure", to: "/affiliate-disclosure" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
];

function FooterSection({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 ![font-family:var(--font-body)] !text-[0.75rem] !font-semibold !uppercase !leading-4 ![letter-spacing:0.1em] !text-[hsl(var(--footer-heading))]">
        {title}
      </h4>
      <ul className="space-y-[0.625rem]">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.to}
              className="[font-family:var(--font-body)] text-[0.875rem] leading-5 text-[hsl(var(--footer-foreground))] no-underline transition-colors hover:text-[hsl(var(--footer-heading))]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-[2rem] bg-[hsl(var(--footer))] md:mt-[3rem]">
      <div className="mx-auto w-full max-w-[1060px] px-4">
        <div className="py-[2.5rem] md:py-[3rem]">
          {/* Brand */}
          <div className="mb-[2rem] md:mb-[2.5rem]">
            <Link href="/" className="[font-family:var(--font-heading),Georgia,serif] text-xl font-bold tracking-tight text-[hsl(var(--footer-heading))]">
              EvoCasino
            </Link>
            <p className="mt-2 max-w-xs [font-family:var(--font-body)] text-[0.875rem] leading-5 text-[hsl(var(--footer-foreground))]">
              Independent authority on Evolution Live casinos.
            </p>
          </div>

          {/* Link sections */}
          <div className="grid grid-cols-1 gap-[2.5rem] sm:grid-cols-3 md:gap-[4rem]">
            <FooterSection title="Guides" links={guidesLinks} />
            <FooterSection title="Casino Research" links={researchLinks} />
            <FooterSection title="Company" links={companyLinks} />
          </div>
        </div>

        <hr className="border-0 border-t !border-[hsl(220_30%_20%)]" />
        <p className="py-[1.5rem] [font-family:var(--font-body)] text-[0.75rem] leading-4 text-[hsl(var(--footer-foreground))]">
          18+ only. Gambling can be addictive — play responsibly. EvoCasino is an independent website and is not
          affiliated with or endorsed by Evolution AB. Casino availability depends on your country: only play at
          casinos that are licensed and legal where you live.{" "}
          <Link href="/affiliate-disclosure" className="underline underline-offset-2">
            Affiliate disclosure
          </Link>
          .
        </p>
        <p className="pb-[1.5rem] [font-family:var(--font-body)] text-[0.75rem] leading-4 text-[hsl(var(--footer-foreground))]">
          © {new Date().getFullYear()} EvoCasino. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

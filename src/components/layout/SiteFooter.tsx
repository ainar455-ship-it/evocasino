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
  { label: "Home", to: "/" },
  { label: "Methodology", to: "/how-we-rank" },
];

function FooterSection({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-xs font-body font-semibold uppercase tracking-widest text-[hsl(var(--footer-heading))] mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.to}
              className="text-sm font-body text-[hsl(var(--footer-foreground))] hover:text-[hsl(var(--footer-heading))] transition-colors"
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
    <footer className="bg-[hsl(var(--footer))] mt-8 md:mt-12">
      <div className="container max-w-content mx-auto px-4">
        <div className="py-10 md:py-12">
          {/* Brand */}
          <div className="mb-8 md:mb-10">
            <Link href="/" className="font-heading text-xl font-bold tracking-tight text-[hsl(var(--footer-heading))]">
              EvoCasino
            </Link>
            <p className="mt-2 text-sm font-body text-[hsl(var(--footer-foreground))] max-w-xs">
              Independent authority on Evolution Live casinos.
            </p>
          </div>

          {/* Link sections */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16">
            <FooterSection title="Guides" links={guidesLinks} />
            <FooterSection title="Casino Research" links={researchLinks} />
            <FooterSection title="Company" links={companyLinks} />
          </div>
        </div>

        <hr className="border-t border-[hsl(220_30%_20%)]" />
        <p className="py-6 text-xs font-body text-[hsl(var(--footer-foreground))]">
          © {new Date().getFullYear()} EvoCasino. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

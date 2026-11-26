import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FactsGrid } from "@/components/guide/FactsGrid";

export interface HeroStat {
  label: string;
  value: string;
}

interface GuideHeroProps {
  breadcrumbs: { label: string; href?: string }[];
  category: string;
  title: string;
  intro: string;
  updated: string;
  methodologyHref?: string;
  stats: HeroStat[];
}

function TitleText({ title }: { title: string }) {
  const emphasis = "Best Casinos & How to Play";

  if (!title.includes(emphasis)) return <>{title}</>;

  const [prefix] = title.split(emphasis);

  return (
    <>
      {prefix}
      <span className="text-primary">{emphasis}</span>
    </>
  );
}

function Dot() {
  return <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />;
}

export function GuideHero({
  breadcrumbs,
  category,
  title,
  intro,
  updated,
  methodologyHref = "#methodology",
  stats,
}: GuideHeroProps) {
  return (
    <header className="pt-10 md:pt-16 pb-10 md:pb-14 border-b border-border/70">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-6 grid md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-10 md:gap-14 lg:gap-20 items-start">
        <div className="max-w-[40rem]">
          <p className="text-[11px] font-body font-semibold tracking-[0.18em] uppercase text-gold mb-5">
            {category}
          </p>

          <h1 className="mb-6 max-w-[22ch] text-foreground">
            <TitleText title={title} />
          </h1>

          <p className="text-[16.5px] md:text-[17.5px] text-muted-foreground leading-[1.7] mb-7 max-w-[36rem]">
            {intro}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] font-body text-muted-foreground">
            <span>Updated {updated}</span>
            <Dot />
            <Link href={methodologyHref} className="text-primary hover:underline underline-offset-4">
              Our methodology
            </Link>
            <Dot />
            <span>Independent analysis</span>
          </div>
        </div>

        <FactsGrid facts={stats} />
      </div>
    </header>
  );
}

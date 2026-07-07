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
      <span className="text-blue-700">{emphasis}</span>
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
    <header className="pt-8 md:pt-12 pb-8 md:pb-12 border-b border-border/60">
      <div className="mx-auto grid max-w-[62rem] gap-7 lg:grid-cols-[minmax(0,38rem)_19.5rem] lg:items-start lg:gap-10">
        <div className="min-w-0">
          <Breadcrumbs items={breadcrumbs} />

          <p className="mt-6 mb-4 text-[11px] uppercase tracking-[0.22em] text-gold font-body font-semibold">
            {category}
          </p>

          <h1 className="mb-5 max-w-[17ch] text-[2.55rem] leading-[1.05] md:text-[3.35rem] lg:text-[3.75rem] text-foreground">
            <TitleText title={title} />
          </h1>

          <p className="text-[16px] md:text-[18px] text-muted-foreground leading-[1.75] max-w-[40rem] mb-6 md:mb-7">
            {intro}
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs md:text-sm text-muted-foreground font-body">
            <span>Updated {updated}</span>
            <Dot />
            <Link href={methodologyHref} className="text-primary hover:underline underline-offset-2">
              Our methodology
            </Link>
            <Dot />
            <span>Independent analysis</span>
          </div>
        </div>

        <div className="lg:pt-12">
          <FactsGrid facts={stats} />
        </div>
      </div>
    </header>
  );
}

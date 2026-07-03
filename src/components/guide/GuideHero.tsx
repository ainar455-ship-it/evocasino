import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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
    <header className="pt-8 md:pt-12 pb-7 md:pb-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <Badge variant="evolution">{category}</Badge>
        <span className="text-xs md:text-sm text-muted-foreground font-body">
          Updated {updated}
        </span>
        <span className="text-muted-foreground/40">·</span>
        <Link
          href={methodologyHref}
          className="text-xs md:text-sm text-primary hover:underline underline-offset-2"
        >
          Our methodology
        </Link>
      </div>

      <h1 className="mb-5 max-w-[20ch]">{title}</h1>

      <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[44rem] mb-7 md:mb-8">
        {intro}
      </p>

      <FactsGrid facts={stats} />
    </header>
  );
}

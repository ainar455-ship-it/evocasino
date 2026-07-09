import { Page, Container } from "@/components/layout/PageContainer";
import {
  GuideHero,
  GuideQuickNav,
  GuideSection,
  KeyTakeaway,
  StrategyBox,
  GuideMythBox,
  GuideBonusRound,
  GuideCasinoCards,
  RelatedGuides,
} from "@/components/guide";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface GuidePageProps {
  guide: any;
}

export default function GuidePage({ guide: g }: GuidePageProps) {
  const navItems = g.sections
    .filter((section: any) => section.showInNav !== false)
    .map((section: any) => ({
      id: section.id,
      label: section.navLabel ?? section.title,
    }));

  return (
    <Page>
      <Container className="max-w-[1060px] px-4">
        <GuideHero
          breadcrumbs={g.breadcrumbs}
          category={g.category}
          title={g.title}
          intro={g.intro}
          updated={g.updated}
          methodologyHref={g.methodologyHref}
          stats={g.stats}
        />
      </Container>

      <Container className="max-w-[1060px] px-4 mt-6 md:mt-10 pb-14 md:pb-20">
        <div className="md:grid md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 lg:gap-14">
          <aside className="md:py-5 mb-8 md:mb-0">
            <GuideQuickNav items={navItems} />
          </aside>

          <article className="min-w-0 max-w-[46rem]">
            {g.sections.map((section: any, index: number) => (
              <GuideSection
                key={section.id}
                id={section.id}
                eyebrow={`${String(index + 1).padStart(2, "0")} - ${section.title}`}
                title={section.title}
                lead={section.content}
                tone={index % 2 === 1 ? "muted" : "default"}
                divider={index > 0}
                wide={Boolean(
                  section.bonusRounds ||
                    section.casinos ||
                    section.strategyBoxes ||
                    section.faq ||
                    section.methodology ||
                    section.related ||
                    section.metrics ||
                    section.cards
                )}
              >
                {section.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {section.metrics.map((metric: any) => (
                      <div key={metric.label} className="border border-border rounded-lg p-4 bg-card">
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-body mb-1">
                          {metric.label}
                        </p>
                        <p className="text-base font-semibold text-foreground font-body m-0">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {section.support && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {section.support}
                  </p>
                )}

                {section.keyTakeaway && <KeyTakeaway>{section.keyTakeaway}</KeyTakeaway>}

                {section.steps && (
                  <ol className="space-y-5 list-none p-0 m-0">
                    {section.steps.map((step: any, i: number) => (
                      <li key={step.title} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-sm font-bold text-primary-foreground font-body">
                            {i + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-base font-semibold mb-0.5">{step.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed m-0">
                            {step.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}

                {section.points && (
                  <ul className="space-y-2.5 list-none p-0 m-0">
                    {section.points.map((point: string) => (
                      <li key={point} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <span className="h-1 w-1 rounded-full bg-primary mt-2.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.cards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {section.cards.map((card: any) => (
                      <article
                        key={card.title}
                        className="border border-border/70 rounded-lg bg-card p-5 md:p-6 flex flex-col h-full"
                      >
                        <h4 className="text-[15px] font-heading font-semibold text-foreground m-0 mb-2 leading-tight">
                          {card.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-[1.7] mb-5">
                          {card.body}
                        </p>
                        {(card.label || card.value) && (
                          <div className="mt-auto pt-4 border-t border-border/60">
                            {card.label && (
                              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80 font-body mb-1">
                                {card.label}
                              </p>
                            )}
                            {card.value && (
                              <p className="text-[13px] font-medium text-foreground font-body leading-tight">
                                {card.value}
                              </p>
                            )}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                )}

                {section.bonusRounds && (
                  <div className="max-w-none">
                    <GuideBonusRound rounds={section.bonusRounds} />
                  </div>
                )}

                {section.strategyBoxes && (
                  <div className="space-y-4">
                    {section.strategyBoxes.map((box: any) => (
                      <StrategyBox
                        key={box.title}
                        title={box.title}
                        points={box.points}
                        caveat={box.caveat}
                      />
                    ))}
                  </div>
                )}

                {section.myths && <GuideMythBox items={section.myths} title="" />}

                {section.casinos && (
                  <div className="max-w-none space-y-4">
                    <GuideCasinoCards casinos={section.casinos} />
                    {section.casinoNote && (
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-[44rem] m-0">
                        {section.casinoNote}
                      </p>
                    )}
                  </div>
                )}

                {section.faq && (
                  <Accordion type="single" collapsible className="border border-border/60 rounded-lg bg-card divide-y divide-border/60">
                    {section.faq.map((item: any) => (
                      <AccordionItem key={item.question} value={item.question} className="border-b-0 px-4 md:px-5">
                        <AccordionTrigger className="text-left text-sm md:text-[15px] font-semibold hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}

                {section.methodology && (
                  <ol className="space-y-3 list-none p-0 m-0 border border-border/60 rounded-lg bg-card divide-y divide-border/60">
                    {section.methodology.map((item: string, i: number) => (
                      <li key={item} className="flex gap-4 p-4 md:p-5">
                        <span className="text-[11px] font-body font-medium tabular-nums text-muted-foreground/70 pt-0.5 w-6 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[14.5px] text-muted-foreground leading-[1.75] m-0">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ol>
                )}

                {section.related && <RelatedGuides guides={section.related} title="" />}

                {section.footnote && (
                  <p className="mt-5 text-xs text-muted-foreground/85 leading-relaxed">
                    {section.footnote}
                  </p>
                )}
              </GuideSection>
            ))}
          </article>
        </div>
      </Container>
    </Page>
  );
}

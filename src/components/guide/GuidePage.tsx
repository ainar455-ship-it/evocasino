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
} from "@/components/guide";

interface GuidePageProps {
  guide: any;
}

export default function GuidePage({ guide: g }: GuidePageProps) {
  return (
    <Page>
      <Container>
        <GuideHero
          breadcrumbs={g.breadcrumbs}
          category={g.category}
          title={g.title}
          intro={g.intro}
          updated={g.updated}
          stats={g.stats}
        />
      </Container>

      <Container className="mt-2 md:mt-4">
        <div className="md:grid md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 lg:gap-14">
          <aside className="md:py-4">
            <GuideQuickNav
              items={g.sections.map((section: any) => ({
                id: section.id,
                label: section.title,
              }))}
            />
          </aside>

          <article className="min-w-0">
            {g.sections.map((section: any, index: number) => (
              <GuideSection
                key={section.id}
                id={section.id}
                eyebrow={`${String(index + 1).padStart(2, "0")} — ${section.title}`}
                title={section.title}
                lead={section.content}
                tone={index % 2 === 1 ? "muted" : "default"}
                divider={index > 0}
                wide={Boolean(
                  section.bonusRounds ||
                    section.casinos ||
                    section.strategyBoxes
                )}
              >
                {section.keyTakeaway && (
                  <KeyTakeaway>
                    {section.keyTakeaway}
                  </KeyTakeaway>
                )}

                {section.bonusRounds && (
                  <div className="max-w-none">
                    <GuideBonusRound
                      rounds={section.bonusRounds}
                    />
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

                {section.myths && (
                  <GuideMythBox items={section.myths} />
                )}

                {section.casinos && (
                  <div className="max-w-none">
                    <GuideCasinoCards
                      casinos={section.casinos}
                    />
                  </div>
                )}
              </GuideSection>
            ))}
          </article>
        </div>
      </Container>
    </Page>
  );
}

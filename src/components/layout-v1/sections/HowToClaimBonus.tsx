import { Container } from "@/components/layout-v1/primitives/Container";
import { Card } from "@/components/layout-v1/primitives/Card";

type Props = {
  title: string;
  intro?: string;
  steps: { step: number; title: string; text: string }[];
};

export function HowToClaimBonus({ title, intro, steps }: Props) {
  return (
    <section id="how-to-claim" className="py-10 bg-[#f9fafb]">
      <Container className="max-w-4xl">
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-[#1a2b4a] mb-2">{title}</h3>
          {intro && <p className="text-gray-600 mb-6">{intro}</p>}

          <div className="relative">
            {/* Vertical timeline line - visible on all screens */}
            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.step} className="relative flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Step number with badge - adjusted positioning for mobile */}
                  <div className="flex-shrink-0 flex justify-start sm:justify-center pt-1 sm:pt-0">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#1a2b4a] text-white font-bold text-base sm:text-lg shadow-md border-4 border-[#f9fafb]">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5 sm:pt-0">
                    <h4 className="text-base sm:text-lg font-bold text-[#1a2b4a]">{step.title}</h4>
                    <p className="mt-2 text-sm text-gray-700 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

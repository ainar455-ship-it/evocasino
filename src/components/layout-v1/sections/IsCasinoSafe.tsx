import { Container } from "@/components/layout-v1/primitives/Container";
import { Badge } from "@/components/layout-v1/primitives/Badge";

type Props = {
  title: string;
  summary: string;
  bullets?: string[];
};

export function IsCasinoSafe({ title, summary, bullets }: Props) {
  return (
    <section className="py-10 bg-white">
      <Container className="max-w-4xl">
        <div className="rounded-xl border border-[#1a2b4a]/20 bg-[#f0f4f8] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a2b4a] text-white">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1a2b4a]">{title}</h3>
          </div>

          <p className="text-sm text-gray-700 mb-6">{summary}</p>

          {bullets && bullets.length > 0 && (
            <div className="space-y-3">
              {bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    <Badge variant="success" className="px-1.5 py-0 text-[10px]">
                      ✓
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{bullet}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-lg bg-white/50 p-4 text-xs text-gray-600">
            <p className="font-semibold text-gray-800">Responsible Gambling:</p>
            <p>
              This casino is affiliated with the National Responsible Gambling Programme (NRGP).
              Set limits, take breaks, and play responsibly. 18+ only.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

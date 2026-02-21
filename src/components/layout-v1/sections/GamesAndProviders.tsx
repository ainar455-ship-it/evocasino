import { Container } from "@/components/layout-v1/primitives/Container";
import { Badge } from "@/components/layout-v1/primitives/Badge";

type Props = {
  providers: string[];
  games: string[];
};

export function GamesAndProviders({ providers, games }: Props) {
  return (
    <section className="py-10 bg-[#f9fafb]">
      <Container className="max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Providers */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold text-[#1a2b4a] mb-4">Game Providers</h3>
            <div className="flex flex-wrap gap-2">
              {providers.map((provider) => (
                <Badge key={provider} variant="neutral" className="bg-[#1a2b4a] text-white hover:bg-[#1a2b4a]/90">
                  {provider}
                </Badge>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Partnered with top-tier providers to deliver premium gaming experiences.
            </p>
          </div>

          {/* Games */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold text-[#1a2b4a] mb-4">Popular Games</h3>
            <ul className="space-y-2">
              {games.map((game, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1a2b4a]"></span>
                  {game}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Over {games.length}+ popular slots and table games available.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

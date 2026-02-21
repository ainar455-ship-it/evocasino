import { Container } from "@/components/layout-v1/primitives/Container";
import { Text } from "@/components/layout-v1/primitives/Text";

type Props = {
  title: string;
  text: string;
  readMoreAnchor: string;
};

export function QuickTake({ title, text, readMoreAnchor }: Props) {
  return (
    <section className="py-10 bg-white">
      <Container className="max-w-4xl">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a2b4a]">{title}</h2>
          <Text className="mt-4 text-gray-700">{text}</Text>
          <div className="mt-4">
            <a
              href={`#${readMoreAnchor}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a2b4a] hover:text-[#0d53b3]"
            >
              Read full review details
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

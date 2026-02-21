import { Container } from "@/components/layout-v1/primitives/Container";
import { Text } from "@/components/layout-v1/primitives/Text";

type Props = {
  id: string;
  sections: { heading: string; body: string }[];
};

export function ReviewContent({ id, sections }: Props) {
  return (
    <section id={id} className="py-10 bg-white">
      <Container className="max-w-4xl">
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[#1a2b4a] mb-6">Detailed Review</h2>

          <div className="prose prose-sm prose-gray max-w-none">
            {sections.map((section, idx) => (
              <article key={idx} className="mb-8 last:mb-0">
                <h3 className="text-xl font-bold text-[#1a2b4a] mb-4">{section.heading}</h3>
                <Text>{section.body}</Text>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

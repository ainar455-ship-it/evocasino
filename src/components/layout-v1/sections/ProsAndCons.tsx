import { Container } from "@/components/layout-v1/primitives/Container";

type Props = {
  pros: string[];
  cons: string[];
};

export function ProsAndCons({ pros, cons }: Props) {
  return (
    <section className="py-10 bg-[#f9fafb]">
      <Container className="max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pros */}
          <div className="rounded-xl border border-green-200 bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center gap-2">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Pros
            </h3>
            <ul className="space-y-3">
              {pros.map((pro, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                  <span className="flex-shrink-0 text-green-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="rounded-xl border border-amber-200 bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold text-amber-700 mb-6 flex items-center gap-2">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Cons
            </h3>
            <ul className="space-y-3">
              {cons.map((con, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                  <span className="flex-shrink-0 text-amber-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 01-1.061 0l-1.061-1.06zm2.12-1.06a.75.75 0 010 1.061l1.06 1.06zm-4.24-1.06a.75.75 0 010 1.061l1.06 1.06zm2.12-1.06a.75.75 0 010 1.061l1.06 1.06z" clipRule="evenodd" />
                      <path d="M2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
                    </svg>
                  </span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

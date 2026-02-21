import { Container } from "@/components/layout-v1/primitives/Container";

type Props = {
  methods: { name: string; icon?: string }[];
  note?: string;
};

export function PaymentMethods({ methods, note }: Props) {
  return (
    <section className="py-10 bg-white">
      <Container className="max-w-4xl">
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
          <h3 className="text-xl font-bold text-[#1a2b4a] mb-6">Payment Methods</h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {methods.map((method) => (
              <div
                key={method.name}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2"
              >
                {method.icon && (
                  <img src={method.icon} alt="" className="h-4 w-auto" />
                )}
                <span className="text-sm font-medium">{method.name}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600">
            {note || "All transactions are processed in South African Rand (ZAR)."}
          </p>
        </div>
      </Container>
    </section>
  );
}
import { Container } from "@/components/layout-v1/primitives/Container";
import { Badge } from "@/components/layout-v1/primitives/Badge";

type Props = {
  chips: { label: string; value: string }[];
  paymentIcons?: { name: string; icon?: string }[];
};

export function KeyInfoChips({ chips, paymentIcons }: Props) {
  return (
    <section className="py-10 bg-white">
      <Container className="max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Key Info Chips */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1a2b4a]">Key Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {chips.map((chip) => (
                <div key={chip.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[88px]">
                  <p className="text-xs font-semibold text-gray-500 uppercase">{chip.label}</p>
                  <p className="mt-1 text-sm font-medium text-[#1a2b4a]">{chip.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Icons */}
          {paymentIcons && paymentIcons.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1a2b4a]">Accepted Payment Methods</h3>
              <div className="flex flex-wrap gap-2">
                {paymentIcons.map((icon) => (
                  <Badge key={icon.name} variant="neutral" className="cursor-pointer hover:bg-gray-200 min-h-[44px] px-4">
                    {icon.name}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                All transactions in ZAR. Instant EFT and Ozow are fastest for SA players.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

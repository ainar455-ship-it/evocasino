import { Container } from "@/components/layout-v1/primitives/Container";
import { Text } from "@/components/layout-v1/primitives/Text";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <Container className="max-w-6xl">
        <div className="grid gap-6 py-8 md:grid-cols-3">
          <div>
            <Text as="h3" className="text-sm font-semibold">Trust & Safety</Text>
            <div className="mt-2 space-y-1 text-xs text-gray-600">
              <div>18+ only. Play responsibly.</div>
              <div>Terms & conditions apply.</div>
              <div>Licensed by Western Cape Gambling Board</div>
              <div>Self‑exclusion tools available</div>
            </div>
          </div>
          <div>
            <Text as="h3" className="text-sm font-semibold">Payment Methods</Text>
            <div className="mt-2 flex flex-wrap gap-2">
              <img src="/images/payments/ozow.svg" alt="Ozow" className="h-8 w-auto rounded border border-gray-200" loading="lazy" />
              <img src="/images/payments/sid.svg" alt="SID Instant EFT" className="h-8 w-auto rounded border border-gray-200" loading="lazy" />
              <img src="/images/payments/visa.svg" alt="Visa" className="h-8 w-auto rounded border border-gray-200" loading="lazy" />
              <img src="/images/payments/mastercard.svg" alt="Mastercard" className="h-8 w-auto rounded border border-gray-200" loading="lazy" />
              <img src="/images/payments/bitcoin.svg" alt="Bitcoin" className="h-8 w-auto rounded border border-gray-200" loading="lazy" />
            </div>
          </div>
          <div>
            <Text as="h3" className="text-sm font-semibold">About Us</Text>
            <div className="mt-2 text-xs text-gray-600">
              This site contains affiliate links. We may receive a commission if you sign up via our links.
              All reviews are independent and based on real player experiences.
            </div>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-xs text-gray-500">
          © 2026 FreeSpinsCasinoZA.co.za — All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
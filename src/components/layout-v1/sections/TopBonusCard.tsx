'use client';

import { useState } from 'react';
import { Button } from "@/components/layout-v1/primitives/Button";
import { Container } from "@/components/layout-v1/primitives/Container";
import clsx from "clsx";

type Logo = { src: string; alt: string };

type Props = {
  id: string;
  logo: Logo;
  title: string;
  summary: string;
  promoCode?: string;
  wagering?: string;
  verifiedOn: string;
  primaryCta: { label: string; href: string };
  noCodeNeeded: boolean;
};

export function TopBonusCard({
  id,
  logo,
  title,
  summary,
  promoCode,
  wagering,
  verifiedOn,
  primaryCta,
  noCodeNeeded,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (promoCode) {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      id={id}
      className={clsx(
        "py-10",
        "bg-gradient-to-br from-[#1a2b4a] to-[#254063]"
      )}
    >
      <Container className="max-w-4xl">
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* LEFT: Casino Logo */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg border-2 border-gray-100 flex items-center justify-center flex-shrink-0">
              <img src={logo.src} alt={logo.alt} className="max-w-full max-h-full object-contain" />
            </div>
            
            {/* RIGHT: Content */}
            <div className="flex-1">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2b4a]">
                  {title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{summary}</p>
              </div>

              {/* Promo Code Box */}
              {promoCode && (
                <div className="my-6 flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50">
                  <code className="flex-1 font-mono text-lg text-[#1a2b4a]">{promoCode}</code>
                  <button
                    onClick={handleCopy}
                    className="bg-[#1a2b4a] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#2c4b7a] transition-colors"
                  >
                    {copied ? (
                      <>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Key Terms */}
              {wagering && (
                <div className="mb-6 grid grid-cols-2 gap-4 rounded-lg bg-[#1a2b4a]/5 p-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Wagering</p>
                    <p className="text-sm font-semibold text-[#1a2b4a]">{wagering}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Verified</p>
                    <p className="text-sm font-semibold text-[#1a2b4a]">{verifiedOn}</p>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href={primaryCta.href} variant="primary" className="flex-1 py-4 text-lg">
                  {primaryCta.label}
                </Button>
                <Button href="#how-to-claim" variant="outline" className="flex-1 sm:flex-none py-4">
                  How to Claim
                </Button>
              </div>
            </div>
          </div>

          {/* Verified badge at bottom */}
          <div className="mt-6 flex items-center justify-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Verified: {verifiedOn}
          </div>
        </div>
      </Container>
    </section>
  );
}

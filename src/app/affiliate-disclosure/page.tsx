import type { Metadata } from "next";
import { canonicalMetadata } from "@/app/seo";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | EvoCasino",
  description:
    "How EvoCasino is funded, how casino links work and why commercial relationships never change our Evolution Score rankings.",
  ...canonicalMetadata("/affiliate-disclosure"),
};

const p = { marginTop: 10, fontSize: 16, lineHeight: 1.6 } as const;

export default function AffiliateDisclosurePage() {
  return (
    <main style={{ padding: 24, maxWidth: 820, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>Affiliate disclosure</h1>

      <p style={p}>
        EvoCasino is an independent information website about Evolution live casino games and the online casinos
        that offer them. We are not affiliated with or endorsed by Evolution AB or by any casino operator.
      </p>

      <h2 style={{ marginTop: 26 }}>How casino links work</h2>
      <p style={p}>
        Some pages link to online casinos. EvoCasino may in the future join affiliate programmes, which means we
        could earn a commission if a visitor opens an account through one of our links. This never costs you
        anything extra. At the time of writing, EvoCasino has no commercial agreements with the casinos listed on
        this website, and casino links are ordinary links.
      </p>
      <p style={p}>
        When affiliate agreements are in place, this page will be updated and affected links will be marked.
      </p>

      <h2 style={{ marginTop: 26 }}>Commercial relationships do not change rankings</h2>
      <p style={p}>
        Casino rankings are calculated from documented casino facts using the method described on{" "}
        <a href="/how-we-rank" style={{ textDecoration: "underline" }}>
          How we rank
        </a>
        . No casino can pay for a higher position, a better score or a review.
      </p>

      <h2 style={{ marginTop: 26 }}>Play responsibly</h2>
      <p style={p}>
        Gambling is for adults (18+, or older where local law requires) and should be treated as paid entertainment,
        not a way to make money. Online casino availability and legality depend on your country: only play at
        casinos that are licensed and legal where you live. If gambling stops being fun, use the deposit limits,
        time-outs and self-exclusion tools your casino offers, and seek support from a local gambling help service.
      </p>
    </main>
  );
}

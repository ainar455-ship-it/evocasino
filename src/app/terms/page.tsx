import type { Metadata } from "next";
import { canonicalMetadata } from "@/app/seo";

export const metadata: Metadata = {
  title: "Terms of Use | EvoCasino",
  description: "Terms for using the EvoCasino website and its information about Evolution live casino games.",
  ...canonicalMetadata("/terms"),
};

const p = { marginTop: 10, fontSize: 16, lineHeight: 1.6 } as const;

export default function TermsPage() {
  return (
    <main style={{ padding: 24, maxWidth: 820, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>Terms of use</h1>

      <h2 style={{ marginTop: 26 }}>Information only</h2>
      <p style={p}>
        EvoCasino provides general information about Evolution live casino games and online casinos. We do not
        offer gambling, accept bets or hold player funds. Nothing on this website is financial, legal or gambling
        advice, and no strategy can change the house edge of a casino game.
      </p>

      <h2 style={{ marginTop: 26 }}>Age and local law</h2>
      <p style={p}>
        The website is intended for adults (18+, or older where local law requires). Online gambling is restricted
        or illegal in some countries. You are responsible for checking whether a casino is licensed and legal where
        you live before you play.
      </p>

      <h2 style={{ marginTop: 26 }}>Accuracy</h2>
      <p style={p}>
        We aim to keep game facts, casino data and bonus details accurate and show when they were last checked.
        Casinos and game providers change their offers, terms and rules, so always confirm the current details on
        the casino&apos;s own website before depositing.
      </p>

      <h2 style={{ marginTop: 26 }}>Trademarks</h2>
      <p style={p}>
        Evolution, game names and casino brands are trademarks of their respective owners and are used only to
        identify the products discussed. EvoCasino is not affiliated with or endorsed by Evolution AB.
      </p>

      <h2 style={{ marginTop: 26 }}>Liability</h2>
      <p style={p}>
        EvoCasino is not responsible for the services, payouts or conduct of third-party casinos, or for losses
        resulting from gambling.
      </p>

      <p style={{ ...p, marginTop: 26, opacity: 0.75 }}>Last updated: November 2026.</p>
    </main>
  );
}

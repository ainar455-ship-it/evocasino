import type { Metadata } from "next";
import { canonicalMetadata } from "@/app/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | EvoCasino",
  description: "What data EvoCasino collects, why, and how you can control it.",
  ...canonicalMetadata("/privacy"),
};

const p = { marginTop: 10, fontSize: 16, lineHeight: 1.6 } as const;

export default function PrivacyPage() {
  return (
    <main style={{ padding: 24, maxWidth: 820, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>Privacy policy</h1>

      <p style={p}>
        This policy explains what information EvoCasino (evocasino.com) collects when you visit the website and how
        it is used. EvoCasino does not offer accounts, newsletters, forms or gambling services, so we do not ask you
        for personal details.
      </p>

      <h2 style={{ marginTop: 26 }}>Analytics</h2>
      <p style={p}>
        We use Google Analytics 4 to understand which pages are read and how visitors find the website. Google
        Analytics uses cookies and collects information such as pages viewed, approximate location, device and
        browser type, and how you arrived at the site. IP addresses are anonymised. This information is used only in
        aggregate to improve the website and is processed by Google as described in{" "}
        <a href="https://policies.google.com/privacy" style={{ textDecoration: "underline" }} rel="noopener">
          Google&apos;s privacy policy
        </a>
        .
      </p>
      <p style={p}>
        You can block analytics cookies in your browser settings or with Google&apos;s{" "}
        <a href="https://tools.google.com/dlpage/gaoptout" style={{ textDecoration: "underline" }} rel="noopener">
          opt-out add-on
        </a>
        .
      </p>

      <h2 style={{ marginTop: 26 }}>Server logs</h2>
      <p style={p}>
        Like most websites, our web server keeps short-term technical logs (such as IP address, requested page and
        time) for security and troubleshooting.
      </p>

      <h2 style={{ marginTop: 26 }}>Links to other websites</h2>
      <p style={p}>
        When you follow a link to a casino or another website, that website&apos;s own privacy policy applies.
      </p>

      <h2 style={{ marginTop: 26 }}>Your rights</h2>
      <p style={p}>
        If you are in the EU or UK you have the right to request access to, correction of, or deletion of personal
        data about you, and to object to its processing.
      </p>

      <p style={{ ...p, marginTop: 26, opacity: 0.75 }}>Last updated: November 2026.</p>
    </main>
  );
}

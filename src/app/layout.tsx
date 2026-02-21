import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EvoCasino — Evolution Live Casino Guide",
  description: "Expert guide to Evolution live dealer casinos, games, bonuses, and payouts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

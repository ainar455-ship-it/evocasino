import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteNav from "@/app/_components/SiteNav";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "EvoCasino — Evolution Live Casino Guide",
  description: "Expert guide to Evolution live dealer casinos, games, bonuses, and methodology.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YEL16S1ZV3"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "G-YEL16S1ZV3", { anonymize_ip: true });` }} />
      </head>
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}

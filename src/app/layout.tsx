import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteNav from "@/app/_components/SiteNav";
import { SITE_METADATA_BASE } from "@/app/seo";
import { SiteFooter } from "@/components/layout/SiteFooter";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: SITE_METADATA_BASE,
  title: "EvoCasino — Evolution Live Casino Guide",
  description: "Expert guide to Evolution live dealer casinos, games, bonuses, and methodology.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YEL16S1ZV3"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "G-YEL16S1ZV3", { anonymize_ip: true });` }} />
      </head>
      <body>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

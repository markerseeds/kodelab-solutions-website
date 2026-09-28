import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { MobileCta } from "@/components/layout/MobileCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

/**
 * The same discrete weights the original requested from Google Fonts.
 * Don't switch to the variable axis: with only 400–600 available, <b> in
 * Inter renders at 600, and a variable font would draw a true 700.
 *
 * No automatic fallback font, so globals.css can rebuild the original's
 * stacks exactly (Inter → system-ui). next/font's size-adjusted Arial
 * fallback would otherwise draw glyphs Inter lacks, like the "→" in the
 * buttons, in Arial, and widen them. Turbopack only drops that fallback
 * when `fallback` is given explicitly; `adjustFontFallback: false` covers
 * webpack builds.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  adjustFontFallback: false,
  fallback: [],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  adjustFontFallback: false,
  fallback: [],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Kodelab Solutions | Websites, Software, Automation & AI",
  description:
    "Kodelab Solutions builds websites, custom software, business automation and AI tools for growing businesses. Get a free quote.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} data-scroll-behavior="smooth">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileCta />
      </body>
    </html>
  );
}

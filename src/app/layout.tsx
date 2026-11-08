import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { ViewTransition } from "react";
import { Footer } from "@/components/footer/Footer";
import { DesktopNav } from "@/components/nav/DesktopNav";
import { MobileNav } from "@/components/nav/MobileNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

/** Template title and blurb, verbatim (D6). Kept out of search indexes: D6 forbids public deployment. */
export const metadata: Metadata = {
  title: "Marttin Boucher - Top 1% Product Designer for Saas & Startups",
  description:
    "MARTTIN is a bold, personality-driven Framer portfolio template built for designers and creatives. Blending confident typography, playful details, and smooth motion, it turns your work and story into a memorable visual narrative.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* D3: navigations cross-fade with the browser's default View Transition. */}
        <ViewTransition>
          <div className="flex min-h-full flex-col">
            <DesktopNav />
            <MobileNav />
            <main className="flex flex-1 flex-col items-center">{children}</main>
            <Footer />
          </div>
        </ViewTransition>
      </body>
    </html>
  );
}

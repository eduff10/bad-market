import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DriftLines } from "@/components/drift-lines";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bad Market: Drift Cars, Parts & Culture",
  description:
    "The hub for drift builds, parts, and knowledge. Curated listings, videos, and resources for the drift community.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <DriftLines className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
        <SiteHeader />
        <main className="relative min-h-[40vh]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

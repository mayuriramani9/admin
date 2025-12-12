import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "ThreatLens | AI-Powered Threat Intelligence Platform",
  description:
    "Detect and stop cyber threats faster with ThreatLens Core — a multi-agent, LLM-powered threat intelligence platform for SOC teams.",

  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
  },

  robots: "index, follow",
  alternates: {
    canonical: "https://thethreatlens.com/",
  },

  authors: [{ name: "ThreatLens Team" }],
  creator: "ThreatLens",
  publisher: "ThreatLens",

  // Open Graph (for Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thethreatlens.com/",
    title: "ThreatLens | AI-Powered Threat Intelligence Platform",
    description:
      "Built for SOC teams and security leaders to detect, enrich, and respond to cyber threats at machine speed.",
    siteName: "ThreatLens",
    images: [
      {
        url: "https://thethreatlens.com/assets/og-banner.png",
        width: 1200,
        alt: "ThreatLens AI-Powered Threat Intelligence Platform Banner",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ThreatLens | Threat Intelligence Platform",
    description:
      "Real-time detection. Multi-agent orchestration. AI-enriched IOC analysis.",
    images: ["https://thethreatlens.com/assets/og-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`}>
      <head>
        {/* Google Analytics Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F9RBJ4ZWFC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F9RBJ4ZWFC');
          `}
        </Script>
      </head>
      <body className="font-sans" suppressHydrationWarning={true}>
        {children}
        {/* Cookie Consent Banner */}
        <Script
          src="https://gettermscmp.com/cookie-consent/embed/1afaa41d-8108-49c6-812d-5e6a74abe47a/en-us?auto=true"
          strategy="lazyOnload"
        />
        {/* Tally Script */}
        <Script
          src="https://tally.so/widgets/embed.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

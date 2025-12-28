import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenBento - Open-Source Alternative to Bento.me | Free Self-Hosted GitHub Project",
  description: "OpenBento is the best open-source alternative to bento.me on GitHub. Free, self-hosted replacement for bento.me with drag-and-drop editor, custom widgets, and modern tech stack. Never lose your Bento page again.",
  keywords: [
    "bento me alternative",
    "bento.me alternative",
    "bento me alternative github",
    "bento.me alternative github",
    "open source bento me",
    "open source bento.me",
    "bento me replacement",
    "bento.me replacement",
    "self-hosted bento",
    "self-hosted bento.me",
    "bento page builder",
    "bento linktree alternative",
    "github bento page",
    "free bento page",
    "bento.me clone",
    "openbento"
  ],
  authors: [{ name: "OpenBento Community" }],
  creator: "OpenBento",
  publisher: "OpenBento",
  openGraph: {
    title: "OpenBento - Open-Source Alternative to Bento.me",
    description: "Free, self-hosted replacement for bento.me. The best open-source alternative on GitHub with drag-and-drop editor and modern tech stack.",
    type: "website",
    locale: "en_US",
    siteName: "OpenBento",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenBento - Open-Source Alternative to Bento.me",
    description: "Free, self-hosted replacement for bento.me. The best open-source alternative on GitHub.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://openbento.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OpenBento",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web",
    "description": "Open-source alternative to bento.me - Free, self-hosted GitHub project for creating beautiful Bento-style link pages. A complete replacement for bento.me with drag-and-drop editor, custom widgets, and modern tech stack.",
    "url": "https://openbento.dev",
    "author": {
      "@type": "Organization",
      "name": "OpenBento Community"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "keywords": "bento me alternative, bento.me alternative, bento me alternative github, open source bento, self-hosted bento, bento page builder",
    "softwareVersion": "0.1.0",
    "license": "https://opensource.org/licenses/MIT",
    "codeRepository": "https://github.com/yourusername/openbento",
    "programmingLanguage": ["TypeScript", "JavaScript"],
    "runtimePlatform": "Next.js"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

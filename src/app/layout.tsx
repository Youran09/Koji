import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import MobileLayout from "@/components/layout/MobileLayout";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Koji Copenhagen - Trace Your Ferment (Prototype)",
  description: "Track your Koji Copenhagen products from food waste source to finished ferment. Building transparency in the circular economy. Prototype MVP with demo data.",
  keywords: "koji, fermentation, food waste, circular economy, copenhagen, sustainability, prototype",
  metadataBase: new URL('https://kojicopenhagen.com'),
  openGraph: {
    title: "Koji Copenhagen - Trace Your Ferment (Prototype)",
    description: "Track your koji products from source to table - Prototype Demo",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#C85A35',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="touch-manipulation">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <MobileLayout>
          {children}
        </MobileLayout>
        <Analytics />
      </body>
    </html>
  );
}

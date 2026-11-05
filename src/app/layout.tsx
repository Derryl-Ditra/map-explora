import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

// Static export is served under /map-explora in production, so root-relative
// asset paths must carry the base path explicitly.
const base = process.env.NODE_ENV === "production" ? "/map-explora" : "";

export const viewport: Viewport = {
  themeColor: "#14B8A6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  alternates: { canonical: "https://derryl-ditra.github.io/map-explora/" },
  title: "Map Explora: Under 5 Activities in Jabodetabek",
  description: "Find baby, toddler and preschool classes near you: swimming, gym, music, art and more across Jakarta, Bogor, Depok, Tangerang and Bekasi. Compare age evidence and confirm suitability with the provider.",
  manifest: `${base}/manifest.webmanifest`,
  icons: {
    icon: [
      { url: `${base}/favicon.ico`, sizes: "any" },
      { url: `${base}/icon.svg`, type: "image/svg+xml" },
      { url: `${base}/icon-192.png`, sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: `${base}/apple-touch-icon.png`, sizes: "180x180" }],
  },
  openGraph: {
    title: "Under 5 Activities in Jabodetabek",
    description: "Find baby, toddler and preschool classes near you: swimming, gym, music, art and more across Jakarta, Bogor, Depok, Tangerang and Bekasi. Compare age evidence and confirm suitability with the provider.",
    url: "https://derryl-ditra.github.io/map-explora/",
    type: "website",
    locale: "en_US",
    images: [{ url: "https://derryl-ditra.github.io/map-explora/og.png", width: 1200, height: 630, alt: "Under 5 Activities in Jabodetabek" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Under 5 Activities in Jabodetabek",
    description: "Find baby, toddler and preschool classes near you: swimming, gym, music, art and more across Jakarta, Bogor, Depok, Tangerang and Bekasi. Compare age evidence and confirm suitability with the provider.",
    images: ["https://derryl-ditra.github.io/map-explora/og.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Map Explora",
  },
  // Opt in to OS-level text scaling where the browser supports it
  // (progressive enhancement; ignored elsewhere). Root font-size is
  // intentionally never set so the user agent preference rules.
  other: { "text-scale": "scale" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://tiles.openfreemap.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://tiles.openfreemap.org" />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        {children}
        {/* Privacy-friendly, cookie-free visit + referrer stats (GoatCounter free tier) */}
        <Script
          data-goatcounter="https://map-explora.goatcounter.com/count"
          src="https://gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
// Trailing sentinel: absorbs the web editor last-line indent artifact.

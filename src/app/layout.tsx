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
  title: "Map Explora - Under 5 Activities",
  description: "Map of baby, toddler and preschool classes (under 5 years) across Jakarta, Bintaro and Jabodetabek, with branch-confirmed age eligibility. Strongest coverage for ages 0-3; classes for 4-year-olds are being added.",
  manifest: `${base}/manifest.webmanifest`,
  icons: {
    icon: [
      { url: `${base}/favicon.ico`, sizes: "any" },
      { url: `${base}/icon.svg`, type: "image/svg+xml" },
      { url: `${base}/icon-192.png`, sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: `${base}/apple-touch-icon.png`, sizes: "180x180" }],
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

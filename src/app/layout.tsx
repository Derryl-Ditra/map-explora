import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#f6f2ec",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Map Explora - Under 5 Activities",
  description: "Map of baby, toddler and preschool classes (under 5 years) across Jakarta, Bintaro and Jabodetabek, with branch-confirmed age eligibility. Strongest coverage for ages 0-3; classes for 4-year-olds are being added.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
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
      </body>
    </html>
  );
}
// Trailing sentinel: absorbs the web editor last-line indent artifact.

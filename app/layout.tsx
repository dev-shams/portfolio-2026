import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shamsudin Aminullah — Cybersecurity Portfolio",
  description:
    "Shamsudin Aminullah — Cybersecurity professional & SOC analyst based in Dubai. SOC monitoring, threat & vulnerability analysis, and applied security research.",
  authors: [{ name: "Shamsudin Aminullah" }],
  openGraph: {
    title: "Shamsudin Aminullah — Cybersecurity Portfolio",
    description:
      "Cybersecurity professional & SOC analyst based in Dubai. Security operations, threat analysis and applied security research.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

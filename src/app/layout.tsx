import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://battrehy.se"),
  title: {
    template: "%s | Bättrehy.se",
    default: "Bättrehy.se - Hitta Sveriges bästa skönhetskliniker",
  },
  description: "Jämför och boka estetiska behandlingar hos certifierade och verifierade kliniker i hela Sverige. Bättrehy.se är din guide till skönhet och välmående.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://battrehy.se",
    siteName: "Bättrehy.se",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bättrehy.se - Din guide till skönhetskliniker i Sverige",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bättrehy.se",
    description: "Hitta Sveriges bästa skönhetskliniker",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className={`${inter.variable} font-sans antialiased bg-white text-charcoal-900`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

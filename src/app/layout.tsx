import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://battrehy.se"),
  title: {
    template: "%s | battrehy.se",
    default: "battrehy.se - Hitta Sveriges bästa skönhetskliniker",
  },
  description: "Jämför och boka estetiska behandlingar hos certifierade och verifierade kliniker i hela Sverige. battrehy.se är din guide till skönhet och välmående.",
  alternates: {
    canonical: "https://battrehy.se",
  },
  verification: {
    google: "0qFq1JR89-wZQKGcJuWVXU4a51qk9-M2wGQxqdpGwvA",
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://battrehy.se",
    siteName: "battrehy.se",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "battrehy.se - Din guide till skönhetskliniker i Sverige",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "battrehy.se",
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
      <body className={`${inter.variable} font-sans antialiased bg-white text-charcoal-900 flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

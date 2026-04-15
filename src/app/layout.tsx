import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Bättrehy.se",
    default: "Bättrehy.se - Hitta Sveriges bästa skönhetskliniker",
  },
  description: "Jämför och boka estetiska behandlingar hos certifierade och verifierade kliniker i hela Sverige. Bättrehy.se är din guide till skönhet och välmående.",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://battrehy.se",
    siteName: "Bättrehy.se",
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

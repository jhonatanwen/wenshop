import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WenShop - Sua loja de tecnologia",
  keywords: [
    "loja virtual",
    "produtos eletrônicos",
    "tecnologia",
    "compras online",
    "gadgets",
    "acessórios",
    "smartphones",
    "notebooks",
    "eletrônicos",
    "e-commerce",
    "loja de tecnologia",
  ],
  authors: [
    {
      name: "jhonatanwen",
      url: "https://github.com/jhonatanwen",
    },
  ],
  openGraph: {
    title: "WenShop - Sua loja de tecnologia",
    description:
      "Descubra os melhores produtos eletrônicos e tecnologia na WenShop. Preços imbatíveis e entrega rápida.",
    url: "https://wenshop.com.br",
    siteName: "WenShop",
    images: [
      {
        url: "https://wenshop.com.br/og-image.png",
        width: 1200,
        height: 630,
        alt: "WenShop - Sua loja de tecnologia",
      },
    ],
    locale: "pt-BR",
    type: "website",
  },
  description: "Loja virtual de produtos eletrônicos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

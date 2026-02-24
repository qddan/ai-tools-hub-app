import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Tools Hub - Discover & Compare 200+ AI Tools",
    template: "%s | AI Tools Hub",
  },
  description:
    "Discover, compare and choose from 200+ AI tools across 25 categories. Find the perfect AI tool for coding, writing, design, marketing, and more.",
  keywords: [
    "AI tools",
    "artificial intelligence",
    "AI directory",
    "AI comparison",
    "ChatGPT",
    "Claude",
    "Midjourney",
    "AI software",
  ],
  openGraph: {
    title: "AI Tools Hub - Discover & Compare 200+ AI Tools",
    description:
      "Find the perfect AI tool for your needs. Browse 200+ tools across 25 categories.",
    url: "https://aitools-hub.com",
    siteName: "AI Tools Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools Hub",
    description: "Discover & Compare 200+ AI Tools",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import "./jade-shared.css";

export const metadata: Metadata = {
  title: "Jade | Premium Fullstack Template",
  description: "A modern Next.js and Express.js starter kit with premium design.",
  keywords: ["Next.js", "Express.js", "Fullstack", "Modern UI", "React"],
  authors: [{ name: "Antigravity AI" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${GeistSans.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

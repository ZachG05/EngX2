import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "EngX — Engineering Problem Solver",
  description:
    "Master engineering problems step by step. Practice real problems, get hints, and track your progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

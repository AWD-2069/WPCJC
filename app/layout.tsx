import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer2 } from "@/components/footer2";
import { Navbar1 } from "@/components/navbar1";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Church in Johnson City, TN - Westminster Presbyterian Church (PCA)",
  description: "We invite you to join us at Westminster Johnson City PCA each Sunday for Sunday School at 10:00 am and for Sunday Worship at 8:30 am and 11:00 am",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64`}
      >
        <Navbar1 />
        {children}
        <Footer2 />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Portfolio - Phat Nguyen",
  description: "Personal portfolio website showcasing projects and skills",
  keywords: ["portfolio", "web development", "projects", "skills"],
  authors: [{ name: "Phat Nguyen" }],
  openGraph: {
    title: "Portfolio - Phat Nguyen",
    description: "Personal portfolio website showcasing projects and skills",
    url: "https://yourportfolio.vercel.app",
    siteName: "Portfolio",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

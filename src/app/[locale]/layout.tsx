import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { LanguageProvider } from "../../contexts/LanguageContext";
import Header from "../../components/Header";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import "boxicons/css/boxicons.min.css";
import "devicon/devicon.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Phat Nguyen - Frontend Developer Portfolio",
  description: "Passionate Frontend Developer creating beautiful and functional web experiences with React, Next.js, TypeScript and modern technologies. Specializing in responsive design, web development, e-commerce solutions, and API development.",
  keywords: [
    "Phat Nguyen",
    "Frontend Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Portfolio",
    "Web Development",
    "UI/UX",
    "Vietnam Developer"
  ],
  authors: [{ name: "Phat Nguyen", url: "https://phatnguyen.vercel.app" }],
  creator: "Phat Nguyen",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
    url: "https://phatnguyen.vercel.app",
    title: "Phat Nguyen - Frontend Developer Portfolio",
    description: "Passionate Frontend Developer creating beautiful and functional web experiences with modern technologies. Explore my projects and skills.",
    siteName: "Phat Nguyen Portfolio",
    images: [
      {
        url: "https://phatnguyen.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Phat Nguyen - Frontend Developer Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Phat Nguyen - Frontend Developer Portfolio",
    description: "Passionate Frontend Developer creating beautiful and functional web experiences with modern technologies.",
    images: ["https://phatnguyen.vercel.app/images/og-image.png"],
    creator: "@phatnguyen"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden 
    min-h-screen 
    bg-background 
    text-foreground`}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <LanguageProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "var(--background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border-rgb, rgba(0, 0, 0, 0.1))"
                  },
                  success: {
                    iconTheme: {
                      primary: "#10b981",
                      secondary: "#fff"
                    }
                  },
                  error: {
                    iconTheme: {
                      primary: "#ef4444",
                      secondary: "#fff"
                    }
                  }
                }}
              />
              <Header />
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

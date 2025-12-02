import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { LanguageProvider } from "../../contexts/LanguageContext";
import Header from "../../components/Header";
import { Toaster } from "react-hot-toast";
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

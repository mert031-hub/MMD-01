import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navigation from "@/components/layout/Navigation";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mmdesign.com.tr"),
  title: {
    template: "%s | MMDESIGN",
    default: "MMDESIGN — Digital Experience Studio",
  },
  description:
    "Web siteleri tasarlamıyoruz. İnsanların sizi tercih etmesini kolaylaştırıyoruz. Premium dijital deneyimler.",
  keywords: [
    "web tasarım",
    "dijital deneyim",
    "web design",
    "digital agency",
    "premium website",
    "MMDESIGN",
    "UI design",
    "brand experience",
  ],
  authors: [{ name: "MMDESIGN" }],
  creator: "MMDESIGN",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    url: "https://mmdesign.com.tr",
    siteName: "MMDESIGN",
    title: "MMDESIGN — Digital Experience Studio",
    description:
      "Web siteleri tasarlamıyoruz. İnsanların sizi tercih etmesini kolaylaştırıyoruz.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MMDESIGN — Digital Experience Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MMDESIGN — Digital Experience Studio",
    description:
      "Web siteleri tasarlamıyoruz. İnsanların sizi tercih etmesini kolaylaştırıyoruz.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "tr" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${plusJakartaSans.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

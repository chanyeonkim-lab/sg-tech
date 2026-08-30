import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/components/seo/schemas";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "국내 생산 철제 분전반 · SUS 스테인리스 분전함 전문 제조업체 | SG기전",
    template: "%s | SG기전",
  },
  description:
    "분전반, 철제 분전함, SUS 스테인리스 분전함 맞춤 제작 전문. 국가 자격증 보유 전문 인력, 자체 공장 직접 생산, 1-3일 빠른 납기.",
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title:
      "국내 생산 철제 분전반 · SUS 스테인리스 분전함 전문 제조업체 | SG기전",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "국내 생산 철제 분전반 · SUS 스테인리스 분전함 전문 제조업체 | SG기전",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "8332nFpLCa6A7t9gobJDd8xzCaqbz0yHzKS0Vy4jafc",
    other: {
      "naver-site-verification": "536a49fd2322a39413d27a985896a9434665b2ea",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FFCD11",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

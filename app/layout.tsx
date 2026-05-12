import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "국내 생산 철제 분전반 · SUS 스테인리스 분전함 전문 제조업체 | SG기전",
  description: "분전반, 철제 분전함, SUS 스테인리스 분전함 맞춤 제작 전문. 경기도 화성에서 1-3일 빠른 납기. 1000+ 제작 실적, 12년 경력, 건축기사 자격증 보유.",
  keywords: "분전반, 철제 분전함, SUS 분전함, 스테인리스 분전함, 노출 철함, 전기 분전반, 대형 분전반, 주문 제작 분전함, 경기도 화성 분전반 제작, 맞춤 분전반",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <Head>
        <meta name="google-site-verification" content="979c4d14ec58e355" />
        <meta name="naver-site-verification" content="536a49fd2322a39413d27a985896a9434665b2ea" />
      </Head>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}

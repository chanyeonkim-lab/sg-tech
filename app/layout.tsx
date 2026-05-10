import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "SG기전 - 맞춤 분전반 제작 | 1-3일 빠른 납기",
  description: "국내 생산 고품질 분전반. 맞춤 사이즈 제작, 다양한 산업 경험, 1-3일 빠른 납기. 건축기사 자격증 보유 대표가 직접 설계·제작합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}

import Link from "next/link";
import { siteConfig } from "@/lib/site";

const displayPhone = "010-4437-4540";

const navLinks = [
  { label: "홈", href: "/" },
  { label: "회사소개", href: "/about" },
  { label: "제품", href: "/products" },
  { label: "기관 납품", href: "/institutional-supply" },
  { label: "포트폴리오", href: "/portfolio" },
  { label: "블로그", href: "/blog" },
  { label: "문의", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sg-charcoal text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <p className="text-2xl font-black">
              <span className="text-sg-yellow">SG</span>
              <span className="text-white">기전</span>
            </p>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              분전반 · 분전함 · 컨트롤박스<br />
              맞춤 제작 전문 제조업체
            </p>
            <ul className="mt-4 space-y-1 text-xs text-gray-400">
              {siteConfig.categories.map((c) => (
                <li key={c}>· {c}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sg-yellow font-bold text-sm uppercase tracking-wider mb-4">
              연락처
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${displayPhone.replace(/-/g, "")}`}
                  className="text-white hover:text-sg-yellow transition inline-flex items-baseline gap-2"
                >
                  <span className="text-gray-400 text-xs">TEL</span>
                  <span className="font-medium">{displayPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white hover:text-sg-yellow transition inline-flex items-baseline gap-2 break-all"
                >
                  <span className="text-gray-400 text-xs">EMAIL</span>
                  <span className="font-medium">{siteConfig.email}</span>
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-gray-400">
              평일 09:00–18:00 · 견적 문의 즉시 답변
            </p>
          </div>

          <div>
            <h3 className="text-sg-yellow font-bold text-sm uppercase tracking-wider mb-4">
              바로가기
            </h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-300 hover:text-sg-yellow transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sg-yellow font-bold text-sm uppercase tracking-wider mb-4">
              판매 · 미디어
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={siteConfig.smartStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-sg-yellow transition"
                >
                  네이버 스마트스토어
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.naverBlog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-sg-yellow transition"
                >
                  네이버 블로그
                </a>
              </li>
              <li>
                <Link
                  href="/blog/feed.xml"
                  className="text-gray-300 hover:text-sg-yellow transition"
                >
                  RSS 피드
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p>
            <a
              href={`tel:${displayPhone.replace(/-/g, "")}`}
              className="text-sg-yellow hover:underline font-medium"
            >
              맞춤 견적 문의 → {displayPhone}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

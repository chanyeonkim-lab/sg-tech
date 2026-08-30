'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: '홈', href: '/' },
    { label: '회사소개', href: '/about' },
    { label: '제품', href: '/products' },
    { label: '포트폴리오', href: '/portfolio' },
    { label: '블로그', href: '/blog' },
    { label: '문의', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-sg-pale-gray shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 로고 */}
          <Link href="/" aria-label="SG기전 홈으로 이동" className="flex items-center">
            <Image
              src="/logo.png"
              alt="SG기전"
              width={840}
              height={412}
              priority
              className="h-9 md:h-10 w-auto"
              sizes="(max-width: 768px) 90px, 110px"
            />
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sg-charcoal hover:text-sg-yellow font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 스마트스토어 버튼 + 햄버거 */}
          <div className="flex items-center gap-3">
            <a
              href="https://smartstore.naver.com/sg-powertech"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-sg-yellow text-sg-charcoal font-bold rounded hover:bg-sg-yellow-dark transition-colors"
            >
              스마트스토어
            </a>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="메뉴 열기"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-sg-pale-gray py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sg-charcoal hover:text-sg-yellow hover:bg-sg-cream rounded font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

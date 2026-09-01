import Image from 'next/image'
import { TrackedLink } from '@/components/analytics/TrackedLink'

export default function Home() {
  return (
    <div className="w-full">
      <section className="bg-sg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-2">
            <p className="text-sg-yellow font-bold text-sm md:text-base">
              지금 바로 문의주세요. 도면 없이 빠른 견적 제공 가능합니다.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-white text-sm justify-center">
              <a href="tel:010-4437-4540" className="hover:text-sg-yellow transition whitespace-nowrap">010-4437-4540</a>
              <a href="mailto:jaeyoung@sg-powertech.com" className="hover:text-sg-yellow transition whitespace-nowrap">jaeyoung@sg-powertech.com</a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-sg-yellow">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-sg-charcoal mb-6 leading-tight break-keep">
                맞춤 사이즈 철제/SUS 박스<br />
                분전반 제작
              </h1>
              <p className="text-lg text-sg-charcoal mb-10">
                맞춤 사이즈 제작 · 1-3일 빠른 납기<br />
                자체 공장에서 직접 제조합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <TrackedLink
                  href="https://smartstore.naver.com/sg-powertech"
                  event="cta_click"
                  eventData={{ location: "hero_primary", target: "smartstore" }}
                  className="px-8 py-4 bg-sg-charcoal text-sg-yellow font-bold rounded hover:bg-sg-dark-gray transition text-lg text-center"
                >
                  네이버스마트스토어 바로가기
                </TrackedLink>
                <TrackedLink
                  href="/institutional-supply"
                  event="cta_click"
                  eventData={{ location: "hero_secondary", target: "institutional-supply" }}
                  className="px-8 py-4 bg-white text-sg-charcoal font-bold rounded border-2 border-sg-charcoal hover:bg-sg-cream transition text-lg text-center"
                >
                  견적 문의
                </TrackedLink>
              </div>
            </div>
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-96">
                <Image src="/images/product-main.jpg" alt="분전반" fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-sg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-3xl md:text-6xl font-bold text-sg-yellow mb-2 whitespace-nowrap">1-3일</div>
              <p className="text-white font-bold text-sm md:text-base break-keep">빠른 납기</p>
            </div>
            <div>
              <div className="text-3xl md:text-6xl font-bold text-sg-yellow mb-2">맞춤</div>
              <p className="text-white font-bold text-sm md:text-base break-keep">사이즈 제작</p>
            </div>
            <div>
              <div className="text-3xl md:text-6xl font-bold text-sg-yellow mb-2">6개</div>
              <p className="text-white font-bold text-sm md:text-base break-keep">산업 경험</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-sg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-sg-charcoal break-keep">철제 분전함 실제 제작 사례</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden bg-white shadow">
              <div className="relative w-full h-80">
                <Image src="/images/case-pump-cabinet-wiring.jpg" alt="정밀 제작 분전반" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-sg-charcoal">정밀 제작 분전반</h3>
                <p className="text-sg-gray mt-2">LS 차단기 적용, 정확한 회로 구성</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white shadow">
              <div className="relative w-full h-80">
                <Image src="/images/product-cabinet.jpg" alt="표준 분전함" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-sg-charcoal">표준 분전함</h3>
                <p className="text-sg-gray mt-2">스마트스토어에서 즉시 구매 가능</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white shadow">
              <div className="relative w-full h-80">
                <Image src="/images/product-construction.jpg" alt="건설 현장 가설" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-sg-charcoal">건설 현장 가설</h3>
                <p className="text-sg-gray mt-2">이동식 거치대, 3상 380V 가설전력</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white shadow">
              <div className="relative w-full h-80">
                <Image src="/images/product-orange.jpg" alt="방수 외함" fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-sg-charcoal">방수 외함 + 안전 표지</h3>
                <p className="text-sg-gray mt-2">옥외용 방수 처리, 전기위험 표지</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden bg-sg-cream">
              <div className="relative w-full aspect-[4/5]">
                <Image src="/images/case-acrylic-shield-full.png" alt="투명 난연 아크릴 차폐판이 부착된 분전반" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
            <div>
              <p className="inline-block px-3 py-1 bg-sg-yellow text-sg-charcoal text-xs font-bold rounded mb-3">KEC · 전기안전공사 정기검사</p>
              <h2 className="text-2xl md:text-3xl font-bold text-sg-charcoal mb-4 break-keep leading-snug">한 번에 통과하는<br />정기검사 대응 3원칙</h2>
              <ul className="space-y-2 text-sg-charcoal mb-6">
                <li className="flex gap-2"><span className="text-sg-yellow-dark font-bold">01</span><span className="break-keep">접지저항 개별 측정용 <strong>볼트 체결형 단자 구조</strong></span></li>
                <li className="flex gap-2"><span className="text-sg-yellow-dark font-bold">02</span><span className="break-keep">KEC 140/240 <strong>1선 1단자 원칙</strong></span></li>
                <li className="flex gap-2"><span className="text-sg-yellow-dark font-bold">03</span><span className="break-keep">Standoff 절연자 + 정규격 동부스바</span></li>
              </ul>
              <p className="text-sm text-sg-gray mb-5 break-keep">완제품 상태로 출고되어 현장은 단순 설치만으로 법적 기준을 만족합니다.</p>
              <div className="flex flex-wrap gap-3">
                <TrackedLink
                  href="/contact"
                  event="cta_click"
                  eventData={{ location: "kec_summary", target: "contact" }}
                  className="px-5 py-3 bg-sg-charcoal text-sg-yellow font-bold rounded hover:bg-sg-dark-gray transition"
                >
                  견적 문의
                </TrackedLink>
                <a href="/blog/2026-09-02-kec-inspection-checklist" className="px-5 py-3 border-2 border-sg-charcoal text-sg-charcoal font-bold rounded hover:bg-sg-charcoal hover:text-sg-yellow transition">
                  체크리스트 자세히 보기 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-sg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 break-keep">맞춤 제작 과정</h2>
            <p className="text-gray-400">총 1-3일 안에 완성됩니다</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-sg-yellow text-sg-charcoal w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <p className="font-bold text-sg-charcoal">요청</p>
              <p className="text-sm text-sg-gray">사이즈, 사양 확인</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-sg-yellow text-sg-charcoal w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <p className="font-bold text-sg-charcoal">설계</p>
              <p className="text-sm text-sg-gray">CAD 도면 작성</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-sg-yellow text-sg-charcoal w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <p className="font-bold text-sg-charcoal">제작</p>
              <p className="text-sm text-sg-gray">공장 정밀 제작</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="bg-sg-yellow text-sg-charcoal w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <p className="font-bold text-sg-charcoal">납기</p>
              <p className="text-sm text-sg-gray">검수 후 배송</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-sg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="bg-sg-charcoal rounded-2xl p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 break-keep">표준 분전반 바로 구매</h2>
            <p className="text-gray-300 mb-8">네이버 스마트스토어에서 즉시 주문하세요</p>
            <TrackedLink
              href="https://smartstore.naver.com/sg-powertech"
              event="cta_click"
              eventData={{ location: "bottom_cta", target: "smartstore" }}
              className="inline-block px-10 py-5 bg-sg-yellow text-sg-charcoal font-bold rounded text-lg hover:bg-sg-yellow-pale transition"
            >
              네이버스마트스토어 바로가기
            </TrackedLink>
            <div className="mt-12 pt-8 border-t border-gray-700">
              <p className="text-sg-yellow font-bold mb-2">맞춤 제작 문의</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-white">
                <a href="tel:010-4437-4540" className="hover:text-sg-yellow whitespace-nowrap">010-4437-4540</a>
                <a href="mailto:jaeyoung@sg-powertech.com" className="hover:text-sg-yellow whitespace-nowrap">jaeyoung@sg-powertech.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

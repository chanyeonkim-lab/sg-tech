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
            <div className="flex gap-4 text-white text-sm">
              <a href="tel:010-4437-4540" className="hover:text-sg-yellow transition">010-4437-4540</a>
              <a href="mailto:jaeyoung@sg-powertech.com" className="hover:text-sg-yellow transition">jaeyoung@sg-powertech.com</a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-sg-yellow">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-sg-charcoal mb-6 leading-tight">
                국내 생산 철제 분전반<br />
                <span className="border-b-4 border-sg-charcoal">SUS 스테인리스 분전함</span>
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
                  기관 · 대량 견적 문의
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
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-6xl font-bold text-sg-yellow mb-2">1-3일</div>
              <p className="text-white font-bold">빠른 납기</p>
            </div>
            <div>
              <div className="text-6xl font-bold text-sg-yellow mb-2">맞춤</div>
              <p className="text-white font-bold">사이즈 제작</p>
            </div>
            <div>
              <div className="text-6xl font-bold text-sg-yellow mb-2">6개</div>
              <p className="text-white font-bold">산업 경험</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-sg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sg-charcoal">철제 분전함 실제 제작 사례</h2>
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
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sg-charcoal">왜 SG기전을 선택해야 하나요?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-6 p-6 bg-sg-cream rounded-lg">
              <div className="bg-sg-yellow text-sg-charcoal w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold flex-shrink-0">01</div>
              <div>
                <h3 className="text-xl font-bold text-sg-charcoal mb-2">주문 제작 분전함</h3>
                <p className="text-sg-charcoal">700mm부터 1500mm까지 어떤 사이즈든 가능합니다.</p>
              </div>
            </div>
            <div className="flex gap-6 p-6 bg-sg-cream rounded-lg">
              <div className="bg-sg-yellow text-sg-charcoal w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold flex-shrink-0">02</div>
              <div>
                <h3 className="text-xl font-bold text-sg-charcoal mb-2">1-3일 빠른 납기</h3>
                <p className="text-sg-charcoal">자체 공장에서 직접 생산하여 빠른 납기를 실현합니다.</p>
              </div>
            </div>
            <div className="flex gap-6 p-6 bg-sg-cream rounded-lg">
              <div className="bg-sg-yellow text-sg-charcoal w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold flex-shrink-0">03</div>
              <div>
                <h3 className="text-xl font-bold text-sg-charcoal mb-2">국가 자격증 보유 전문가</h3>
                <p className="text-sg-charcoal">건축기사 및 전기기능사 자격증을 보유한 전문 인력이 도면 검토부터 제작·검수까지 직접 담당합니다.</p>
              </div>
            </div>
            <div className="flex gap-6 p-6 bg-sg-cream rounded-lg">
              <div className="bg-sg-yellow text-sg-charcoal w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold flex-shrink-0">04</div>
              <div>
                <h3 className="text-xl font-bold text-sg-charcoal mb-2">KS·KEC 품질보증</h3>
                <p className="text-sg-charcoal">모든 제품은 KS·KEC 규격을 준수하며 철저한 검사를 거쳐 출고됩니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-sg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">맞춤 제작 과정</h2>
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
            <h2 className="text-4xl font-bold text-white mb-4">표준 분전반 바로 구매</h2>
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
              <div className="flex gap-4 justify-center text-white">
                <a href="tel:010-4437-4540" className="hover:text-sg-yellow">010-4437-4540</a>
                <a href="mailto:jaeyoung@sg-powertech.com" className="hover:text-sg-yellow">jaeyoung@sg-powertech.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

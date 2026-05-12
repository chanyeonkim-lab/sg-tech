import Image from 'next/image'

import Image from 'next/image'

export default function Home() {
  return (
    <div className="w-full">
      {/* ============ 연락처 BAR ============ */}
      <section className="bg-sg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 text-center md:text-left">
            <p className="text-sg-yellow font-bold text-sm md:text-base">
              📞 지금 바로 문의주세요. 도면 없이 빠른 견적 제공 가능합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-white text-sm">
              <a href="tel:010-4437-4540" className="hover:text-sg-yellow transition">
                📞 010-4437-4540
              </a>
              <a href="mailto:jaeyoung@sg-powertech.com" className="hover:text-sg-yellow transition">
                📩 jaeyoung@sg-powertech.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HERO (SEO 최적화) ============ */}
      <section className="bg-sg-yellow">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-block bg-sg-charcoal text-sg-yellow px-4 py-2 text-sm font-bold mb-6 rounded">
                국내 생산 철제 분전반 · SUS 스테인리스 분전함 전문
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sg-charcoal mb-6 leading-tight">
                국내 생산 철제 분전반<br />
                <span className="border-b-4 border-sg-charcoal">SUS 스테인리스 분전함</span>
              </h1>
              <p className="text-lg md:text-xl text-sg-charcoal mb-10 leading-relaxed">
                맞춤 사이즈 제작 · 1-3일 빠른 납기<br />
                경기도 화성 자체 공장에서 직접 제조합니다.
              </p>
              <div className="flex">
                
                  href="https://smartstore.naver.com/sg-powertech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-sg-charcoal text-sg-yellow font-bold rounded text-center hover:bg-sg-dark-gray transition text-lg"
                >
                  네이버스마트스토어 바로가기 →
                </a>
              </div>
            </div>

            {/* 실제 제품 이미지 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative w-full h-[500px]">
                <Image
                  src="/images/product-main.jpg"
                  alt="국내 생산 철제 분전반 · SUS 스테인리스 분전함"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-sg-charcoal/90 p-6">
                <p className="text-2xl font-bold text-sg-yellow">분전반 맞춤 제작</p>
                <p className="text-sm text-gray-300 mt-1">화성 자체 공장 직공급</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="bg-sg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="md:border-r md:border-gray-700">
              <div className="text-5xl md:text-6xl font-bold text-sg-yellow mb-2">1-3일</div>
              <p className="text-lg font-bold text-white">빠른 납기</p>
              <p className="text-sm text-gray-400 mt-1">화성 공장 직공급</p>
            </div>
            <div className="md:border-r md:border-gray-700">
              <div className="text-5xl md:text-6xl font-bold text-sg-yellow mb-2">맞춤</div>
              <p className="text-lg font-bold text-white">사이즈 제작</p>
              <p className="text-sm text-gray-400 mt-1">특수 규격 가능</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-sg-yellow mb-2">6개</div>
              <p className="text-lg font-bold text-white">산업 경험</p>
              <p className="text-sm text-gray-400 mt-1">LED·물펌프·건설 등</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 제품 갤러리 ============ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="text-sg-yellow font-bold mb-2">PRODUCT GALLERY</p>
            <h2 className="text-3xl md:text-4xl font-bold text-sg-charcoal mb-4">철제 분전함 · 분전반 실제 제작 사례</h2>
            <p className="text-sg-gray text-lg">다양한 산업 분야에 맞춤 제작한 분전반 사례입니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. 분전반 내부 */}
            <div className="group relative overflow-hidden rounded-2xl bg-sg-cream hover:shadow-2xl transition">
              <div className="relative w-full h-[400px]">
                <Image
                  src="/images/product-main.jpg"
                  alt="분전반 내부 구조 - 철제 분전함 · 전기 분전반"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-sg-yellow text-sg-charcoal px-4 py-2 rounded font-bold text-sm">
                  분전반
                </span>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-sg-charcoal mb-2">정밀 제작 분전반</h3>
                <p className="text-sg-gray">LS 차단기 적용, 정확한 회로 구성</p>
              </div>
            </div>

            {/* 2. 기성품 철제함 */}
            <div className="group relative overflow-hidden rounded-2xl bg-sg-cream hover:shadow-2xl transition">
              <div className="relative w-full h-[400px]">
                <Image
                  src="/images/product-cabinet.jpg"
                  alt="기성품 철제 분전함 - SUS 스테인리스 분전함 · 노출 철함"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-sg-yellow text-sg-charcoal px-4 py-2 rounded font-bold text-sm">
                  철제함
                </span>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-sg-charcoal mb-2">표준 분전함</h3>
                <p className="text-sg-gray">스마트스토어에서 즉시 구매 가능</p>
              </div>
            </div>

            {/* 3. 건설현장 가설 */}
            <div className="group relative overflow-hidden rounded-2xl bg-sg-cream hover:shadow-2xl transition">
              <div className="relative w-full h-[400px]">
                <Image
                  src="/images/product-construction.jpg"
                  alt="건설 현장 가설 분전반 - 경기도 화성 분전반 제작"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-sg-yellow text-sg-charcoal px-4 py-2 rounded font-bold text-sm">
                  가설 분전반
                </span>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-sg-charcoal mb-2">건설 현장 가설</h3>
                <p className="text-sg-gray">이동식 거치대, 3상 380V 가설전력</p>
              </div>
            </div>

            {/* 4. 가설분전반 외관 */}
            <div className="group relative overflow-hidden rounded-2xl bg-sg-cream hover:shadow-2xl transition">
              <div className="relative w-full h-[400px]">
                <Image
                  src="/images/product-orange.jpg"
                  alt="가설 분전반 외관 - 주문 제작 분전함 · 대형 분전반"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-sg-yellow text-sg-charcoal px-4 py-2 rounded font-bold text-sm">
                  외관
                </span>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-sg-charcoal mb-2">방수 외함 + 안전 표지</h3>
                <p className="text-sg-gray">전기위험 경고 표지, 옥외용 방수 처리</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BIG NUMBERS ============ */}
      <section className="bg-sg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="text-sg-yellow font-bold mb-2">SG기전의 성과</p>
            <h2 className="text-3xl md:text-4xl font-bold text-sg-charcoal">숫자로 보는 분전반 전문가</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white border-2 border-sg-pale-gray rounded-lg hover:border-sg-yellow transition">
              <div className="text-8xl font-bold text-sg-yellow mb-4">1000<span className="text-3xl">+</span></div>
              <p className="text-xl font-bold text-sg-charcoal mb-2">제작 실적</p>
              <p className="text-sm text-sg-gray">철제 분전함 · 분전반 제작</p>
            </div>
            <div className="text-center p-8 bg-white border-2 border-sg-pale-gray rounded-lg hover:border-sg-yellow transition">
              <div className="text-8xl font-bold text-sg-yellow mb-4">6</div>
              <p className="text-xl font-bold text-sg-charcoal mb-2">산업 분야</p>
              <p className="text-sm text-sg-gray">LED·물펌프·가설·건설·조명·특수</p>
            </div>
            <div className="text-center p-8 bg-white border-2 border-sg-pale-gray rounded-lg hover:border-sg-yellow transition">
              <div className="text-8xl font-bold text-sg-yellow mb-4">12</div>
              <p className="text-xl font-bold text-sg-charcoal mb-2">년 경험</p>
              <p className="text-sm text-sg-gray">건축기사 자격증 보유</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <p className="text-sg-yellow font-bold mb-2">OUR EXPERTISE</p>
              <h2 className="text-3xl md:text-4xl font-bold text-sg-charcoal mb-4">다양한 산업 경험</h2>
              <p className="text-sg-charcoal leading-relaxed">철제 분전함, SUS 스테인리스 분전함 등 6개 산업분야의 맞춤 제작 경험.</p>
            </div>
            <div className="lg:col-span-2 bg-sg-yellow rounded-lg p-8 flex items-center">
              <p className="text-xl md:text-2xl font-bold text-sg-charcoal">"어떤 산업이든, 어떤 사이즈든 SG기전이 해결해드립니다"</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📺', title: 'LED 전광판', desc: '옥외 방수·방진 처리' },
              { icon: '💧', title: '물펌프', desc: '모터 제어 전문' },
              { icon: '🏗️', title: '건설 현장', desc: '3상 380V 가설전력' },
              { icon: '💡', title: '조명·인테리어', desc: '맞춤 사이즈 제어반' },
              { icon: '⚙️', title: '산업용', desc: '특수 사양 가능' },
              { icon: '🎪', title: '이벤트·촬영', desc: '임시 전력 공급' },
            ].map((item, idx) => (
              <div key={idx} className="bg-sg-cream rounded-lg p-8 border-2 border-transparent hover:border-sg-yellow hover:shadow-lg transition">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-sg-charcoal mb-2">{item.title}</h3>
                <p className="text-sg-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY US ============ */}
      <section className="bg-sg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="text-sg-yellow font-bold mb-2">WHY SG기전</p>
            <h2 className="text-3xl md:text-4xl font-bold text-sg-charcoal">왜 SG기전을 선택해야 하나요?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: '01', title: '주문 제작 분전함', desc: '특수 규격 철제 분전함도 CAD 도면 기반으로 정확하게 제작합니다. 700mm부터 1500mm까지 어떤 사이즈든 가능합니다.' },
              { num: '02', title: '1-3일 빠른 납기', desc: '화성 자체 공장에서 직접 생산하여 빠른 납기를 실현합니다. 긴급 주문도 상담 가능합니다.' },
              { num: '03', title: '12년 경력 전문성', desc: '건설 현장 12년 경험+건축기사 및 전기기능사 자격증 보유한 전문가가 직접 설계·제작합니다.' },
              { num: '04', title: 'KS·KEC 품질보증', desc: '모든 제품은 KS·KEC 규격을 준수하며 철저한 검사를 거쳐 출고됩니다.' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 p-6 bg-white rounded-lg hover:bg-sg-yellow-pale transition">
                <div className="flex-shrink-0">
                  <div className="bg-sg-yellow text-sg-charcoal w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold">
                    {item.num}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sg-charcoal mb-2">{item.title}</h3>
                  <p className="text-sg-charcoal leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="bg-sg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="text-sg-yellow font-bold mb-2">PROCESS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">맞춤 제작 과정</h2>
            <p className="text-gray-400">총 <span className="text-sg-yellow font-bold">1-3일</span> 안에 고품질 분전반이 완성됩니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { num: '1', title: '요청', time: '즉시', desc: '사이즈, 사양 확인' },
              { num: '2', title: '설계', time: '1일', desc: 'CAD 도면 작성' },
              { num: '3', title: '제작', time: '1-2일', desc: '공장 정밀 제작' },
              { num: '4', title: '납기', time: '당일', desc: '검수 후 배송' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 text-center hover:bg-sg-yellow transition">
                <div className="bg-sg-yellow text-sg-charcoal w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.num}
                </div>
                <p className="text-xl font-bold text-sg-charcoal mb-1">{item.title}</p>
                <p className="text-sm font-bold text-sg-yellow bg-sg-charcoal inline-block px-3 py-1 rounded mb-2">{item.time}</p>
                <p className="text-sm text-sg-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-sg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="bg-sg-charcoal rounded-2xl p-10 md:p-16 text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">표준 분전반 바로 구매</h2>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              표준 규격 분전함은<br />
              네이버 스마트스토어에서 즉시 주문하세요
            </p>
            <a 
              href="https://smartstore.naver.com/sg-powertech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block px-10 py-5 bg-sg-yellow text-sg-charcoal font-bold rounded text-lg hover:bg-sg-yellow-pale transition"
            >
              네이버스마트스토어 바로가기 →
            </a>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <p className="text-sg-yellow font-bold mb-2">맞춤 제작이 필요하신가요?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-white">
                <a href="tel:010-4437-4540" className="hover:text-sg-yellow transition">
                  📞 010-4437-4540
                </a>
                <a href="mailto:jaeyoung@sg-powertech.com" className="hover:text-sg-yellow transition">
                  📩 jaeyoung@sg-powertech.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

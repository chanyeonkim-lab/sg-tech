import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "포트폴리오",
  description:
    "대학교, 공공기관, 오피스텔, 건설 현장에 납품한 SG기전 분전반 실제 사례를 정리했습니다.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "포트폴리오 | SG기전",
    description:
      "실제 납품한 분전반·분전함 사례. 사양·환경·시공 포인트 요약.",
    url: `${siteConfig.url}/portfolio`,
  },
};

const cases = [
  {
    title: "대학 캠퍼스 옥외 IP65 SUS 분전반",
    sector: "교육기관",
    image: "/images/product-orange.jpg",
    summary:
      "결로 반복 환경 + 캠퍼스 미관 유지를 위해 SUS304 5면 방수 처리로 납품. 케이블 인입부까지 IP65 유지.",
    highlights: ["SUS304", "IP65", "5면 방수 처리"],
  },
  {
    title: "공공기관 관제실 정밀 배전반",
    sector: "공공기관",
    image: "/images/product-main.jpg",
    summary:
      "국산 차단기 표준으로 회로별 라벨링과 배선 정리를 진행. 유지보수 접근성을 최우선으로 설계.",
    highlights: ["국산 차단기", "라벨링", "유지보수 접근성"],
  },
  {
    title: "오피스텔 세대분전반 · 계량기함",
    sector: "주거·상업 시설",
    image: "/images/product-cabinet.jpg",
    summary:
      "동일 규격을 대량으로 안정적으로 공급. 시공사 요청 규격에 맞춘 표준화 도면을 확정 후 반복 생산.",
    highlights: ["대량 공급", "규격 표준화", "반복 생산"],
  },
  {
    title: "건설 현장 이동식 가설 분전반",
    sector: "건설 현장",
    image: "/images/product-construction.jpg",
    summary:
      "3상 380V 가설 전력 배분, 이동식 거치대와 누전차단기 표준 탑재로 우천·분진 환경에 대응.",
    highlights: ["3상 380V", "이동식 거치대", "우천 대응"],
  },
];

export default function PortfolioPage() {
  return (
    <div>
      <PageHero
        title="실제 납품 사례"
        subtitle="다양한 환경·규격·요구조건에 대응한 대표 프로젝트를 정리했습니다. 요청 시 유사 사양의 상세 도면과 시공 결과물을 공유해드립니다."
        breadcrumb={[
          { name: "홈", url: "/" },
          { name: "포트폴리오", url: "/portfolio" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c) => (
            <article
              key={c.title}
              className="bg-white rounded-2xl overflow-hidden shadow"
            >
              <div className="relative w-full aspect-[16/10] bg-sg-cream">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-sg-gray font-medium mb-2">
                  {c.sector}
                </p>
                <h2 className="text-xl font-bold text-sg-charcoal mb-3">
                  {c.title}
                </h2>
                <p className="text-sg-charcoal mb-4">{c.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {c.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs font-medium text-sg-charcoal bg-sg-yellow-pale px-2 py-1 rounded"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sg-cream">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-sg-charcoal mb-4">
            비슷한 프로젝트를 준비 중이신가요?
          </h2>
          <p className="text-sg-charcoal mb-8">
            사양·환경·수량만 알려주시면 유사 사례 기준 견적을 드립니다.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="/contact"
              className="px-6 py-3 bg-sg-charcoal text-sg-yellow font-bold rounded"
            >
              문의하기
            </a>
            <a
              href={siteConfig.smartStore}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-sg-yellow text-sg-charcoal font-bold rounded"
            >
              스마트스토어
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

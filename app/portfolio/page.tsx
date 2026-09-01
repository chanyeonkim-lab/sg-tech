import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "납품 사례",
  description:
    "대학교, 공공기관, 오피스텔, 건설 현장에 납품한 SG기전 분전반 실제 사례를 정리했습니다.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "납품 사례 | SG기전",
    description:
      "실제 납품한 분전반·분전함 사례. 사양·환경·시공 포인트 요약.",
    url: `${siteConfig.url}/portfolio`,
  },
};

type Case = {
  title: string;
  sector: string;
  image: string;
  summary: string;
  highlights: string[];
  href?: string;
};

const cases: Case[] = [
  {
    title: "목동 대형 상가 오피스텔 노후 배수펌프 제어판넬 교체",
    sector: "지하 기계실 · 배수펌프",
    image: "/images/case-control-panel-exterior.jpg",
    summary:
      "목동 상가·주거 복합 오피스텔 지하 기계실. 습기·결로에 강한 SUS304 스텐함(600×1000×160, 1.0T)에 V-M/A-M 정밀 타공, 2-Pump 교대 구동(MC·EOCR·F/S) 회로로 맞춤 제작 교체했습니다.",
    highlights: ["SUS304 스텐함", "2-Pump 교대 구동", "V-M/A-M 정밀 타공"],
    href: "/blog/2026-09-02-mokdong-drainage-pump-control-panel",
  },
  {
    title: "건물 세대분전반 · 계량기함",
    sector: "주거·상업 시설",
    image: "/images/case-residential-distribution.jpg",
    summary:
      "메인 MCCB + 다회로 분기 차단기 구성으로 세대·매장별 부하 분배. 부스바 자동정렬로 균일한 시공 품질과 반복 생산성을 확보.",
    highlights: ["다회로 분기", "부스바 자동정렬", "세대분전반"],
  },
  {
    title: "정기검사 대응 아크릴 차폐판 분전반",
    sector: "정기검사 대응",
    image: "/images/case-acrylic-shield-compact.png",
    summary:
      "메인 MCCB + 좌우 분기 ELB 충전부를 투명 난연 아크릴 차폐판으로 완전 차폐. KEC 규정에 맞춰 재검사 리스크 없이 한 번에 통과.",
    highlights: ["투명 난연 아크릴", "충전부 차폐", "KEC 규정"],
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
          { name: "납품 사례", url: "/portfolio" },
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
                <div className="flex flex-wrap gap-2 mb-4">
                  {c.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs font-medium text-sg-charcoal bg-sg-yellow-pale px-2 py-1 rounded"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                {c.href && (
                  <a
                    href={c.href}
                    className="inline-flex items-center gap-1 text-sm font-bold text-sg-charcoal border-b-2 border-sg-yellow hover:text-sg-yellow-dark transition"
                  >
                    상세 사례 자세히 보기 →
                  </a>
                )}
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

import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  collectionPageSchema,
} from "@/components/seo/schemas";
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
    title: "한양여자대학교 교내 카페 분전반",
    sector: "대학교 교내 상업시설 · 인테리어 업체 발주",
    image: "/images/case-hanyang-cafe-cover.jpg",
    summary:
      "한양여자대학교 교내에 새로 들어서는 카페 현장. 학교 시설팀의 유지보수 편의를 고려해 LS ELECTRIC 차단기(Metasol ABN 104c 75A 메인 MCCB + EBS 30A 누전차단기 2계통)로 통일하고, 부스바 배열·투명 아크릴 차폐판·도어 접지 본딩까지 반영했습니다. 기성 규격 함체와 상시 취급 자재 조건이 맞아 주문하신 날 제작을 마치고 현장으로 배송했습니다.",
    highlights: ["LS ELECTRIC 차단기", "기성 규격 함체", "주문 당일 배송"],
    href: "/blog/2026-09-23-hanyang-univ-cafe-panel",
  },
  {
    title: "판교 현대백화점 입점 대형 식당 주방·홀 분전반 2면",
    sector: "백화점 입점 식당 · 지정 자재",
    image: "/images/case-pangyo-cover.png",
    summary:
      "판교 현대백화점에 입점한 대형 식당(협력 입점 매장)의 승인도면 조건에 맞춰 주방용(NP-01, 800×1200×200) · 홀용(NP-02, 800×1400×200) 분전반 2면을 맞춤 제작했습니다. HD현대일렉트릭 MCCB 지정 자재를 직접 수급하여 도면 목적에 충실히 반영했으며, 부스바 정렬·결선·라벨링까지 정교한 마무리로 전문가 품질을 구현했습니다.",
    highlights: ["HD현대일렉트릭 MCCB 지정 자재", "주방·홀 2면 분리 제작", "승인도면 충실 반영"],
    href: "/blog/2026-09-08-pangyo-hyundai-restaurant-panel",
  },
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
      <JsonLd
        data={[
          collectionPageSchema({
            slug: "/portfolio",
            name: "SG기전 실제 납품 사례",
            description:
              "다양한 환경·규격·요구조건에 대응한 대표 분전반·컨트롤박스 납품 프로젝트 모음.",
          }),
          breadcrumbSchema([
            { name: "홈", url: "/" },
            { name: "납품 사례", url: "/portfolio" },
          ]),
        ]}
      />
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

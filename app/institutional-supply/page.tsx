import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema } from "@/components/seo/schemas";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "기관·기업 맞춤 분전반 납품 서비스",
  description:
    "학교·기업·관공서·지식산업센터 전기설비팀 전용 서비스. 비교 견적서·제품 사양서·설계 도면 지원, 대량 발주 및 정기 납품, KEC·KS 규격 준수.",
  alternates: { canonical: "/institutional-supply" },
  openGraph: {
    title: "기관·기업 맞춤 분전반 납품 서비스 | SG기전",
    description:
      "학교·기업·관공서 전기설비팀 담당자를 위한 KEC 규격 맞춤 분전반. 도면·사양서·비교 견적 지원, 대량 발주 즉시 대응.",
    url: `${siteConfig.url}/institutional-supply`,
  },
};

const supportedDocs = [
  {
    label: "비교 견적서",
    desc: "예산안 심의·조달 절차에 사용 가능한 표준 양식으로 발행",
  },
  {
    label: "제품 사양서",
    desc: "차단기 정격, 부스바 규격, 외함 재질, 도장 방식까지 명시",
  },
  {
    label: "설계 도면 (CAD)",
    desc: "DWG·PDF 제공, 시공사 도면과 크로스 체크",
  },
  {
    label: "성적서·인증서",
    desc: "KS·KEC 준수 확인, 부품 시험 성적서 요청 시 제공",
  },
];

const processSteps = [
  {
    step: "01",
    title: "문의 · 사양 상담",
    desc: "설비 용량(kW), 회로 수, 설치 환경, 예산·납기 조건 확인. 도면이 없어도 진행 가능.",
  },
  {
    step: "02",
    title: "도면 · 사양서 확정",
    desc: "SG기전 엔지니어링팀이 CAD 도면 작성 후 담당자 검토. 조정 사항 즉시 반영.",
  },
  {
    step: "03",
    title: "자체 공장 제작",
    desc: "CNC 레이저 가공 · 분체 도장 · 정품 차단기 조립 · KEC 준수 회로 구성.",
  },
  {
    step: "04",
    title: "검수 · 시험 · 납품",
    desc: "출고 전 전량 통전 시험 · 절연 시험. 성적서 첨부 후 지정 장소 납품.",
  },
];

const trustPoints = [
  {
    title: "국가 자격증 보유 전문 인력",
    desc: "건축기사 · 전기기능사 자격을 보유한 인력이 도면 검토부터 제작·검수까지 담당",
  },
  {
    title: "KEC · KS 규격 준수",
    desc: "한국전기설비규정 및 한국산업표준에 부합하는 재료·부품·시공 절차",
  },
  {
    title: "공인 정품 차단기 100% 사용",
    desc: "LS일렉트릭 등 공인된 제조사의 정품 차단기만 사용. OEM·저가형 제외",
  },
  {
    title: "다양한 특수 목적 납품 경험",
    desc: "대학교·공공기관·오피스텔·건설 현장 등 다양한 환경 대응 레퍼런스 축적",
  },
];

export default function InstitutionalSupplyPage() {
  return (
    <div>
      <JsonLd data={serviceSchema()} />
      <PageHero
        title="기관·기업 맞춤 분전반 납품 서비스"
        subtitle="학교·대기업·관공서·지식산업센터 전기설비팀 및 영선팀 담당자 전용. 비교 견적서·제품 사양서·설계 도면 지원부터 대량 발주 · 정기 납품까지."
        breadcrumb={[
          { name: "홈", url: "/" },
          { name: "기관 납품 서비스", url: "/institutional-supply" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-sg-charcoal mb-8">
          담당자가 필요한 서류, 모두 지원합니다
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportedDocs.map((d) => (
            <div key={d.label} className="p-6 bg-sg-cream rounded-xl border-l-4 border-sg-yellow">
              <p className="font-bold text-sg-charcoal mb-2">{d.label}</p>
              <p className="text-sm text-sg-charcoal">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
            납품 프로세스
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((p) => (
              <div key={p.step} className="bg-white rounded-2xl p-6">
                <div className="text-sg-yellow-dark font-black text-sm tracking-wider mb-2">
                  {p.step}
                </div>
                <h3 className="text-xl font-bold text-sg-charcoal mb-3">
                  {p.title}
                </h3>
                <p className="text-sm text-sg-charcoal">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-sg-charcoal mb-8">
          왜 SG기전인가요?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustPoints.map((t) => (
            <div key={t.title} className="flex gap-6 p-6 bg-sg-cream rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-sg-yellow rounded-lg flex items-center justify-center text-sg-charcoal font-black">
                ✓
              </div>
              <div>
                <h3 className="text-lg font-bold text-sg-charcoal mb-2">
                  {t.title}
                </h3>
                <p className="text-sg-charcoal text-sm">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-sg-charcoal mb-4">
            관련 실무 가이드
          </h2>
          <p className="text-sg-charcoal mb-6">
            발주 · 도면 검토 · KEC 준수 확인에 도움이 되는 실무 자료들:
          </p>
          <ul className="space-y-3">
            <li>
              <Link
                href="/blog/2026-08-30-kec-institutional-panels"
                className="text-sg-yellow-dark hover:underline font-medium"
              >
                → 경기대학교 등 기관 납품 실적이 증명하는 KEC 규격 맞춤 분전반 제작 과정
              </Link>
            </li>
            <li>
              <Link
                href="/blog/2026-08-31-mccb-vs-elb-difference"
                className="text-sg-yellow-dark hover:underline font-medium"
              >
                → 배선용차단기(MCCB)와 누전차단기(ELB), 무엇이 다른가요?
              </Link>
            </li>
            <li>
              <Link
                href="/blog/2026-08-31-busbar-complete-guide"
                className="text-sg-yellow-dark hover:underline font-medium"
              >
                → 분전반 부스바(Busbar), 규격·허용전류·절연 처리 완전 정리
              </Link>
            </li>
            <li>
              <Link
                href="/blog/2026-08-31-acrylic-cover-guide"
                className="text-sg-yellow-dark hover:underline font-medium"
              >
                → 분전반 아크릴 커버 — 안전점검 “충전부 노출” 지적 대응 완벽 가이드
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className="text-sg-yellow-dark hover:underline font-medium"
              >
                → 실제 납품 사례
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-sg-yellow">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-sg-charcoal mb-4">
            기관 견적 · 도면 상담
          </h2>
          <p className="text-sg-charcoal mb-8 text-lg">
            대량 발주 · 정기 납품 · 비규격 맞춤 제작 모두 대응합니다.
            도면·시방서·예산안 검토 필요한 경우 24시간 안에 회신드립니다.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="tel:01044374540"
              className="px-8 py-4 bg-sg-charcoal text-sg-yellow font-bold rounded text-lg"
            >
              전화 010-4437-4540
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="px-8 py-4 bg-white text-sg-charcoal font-bold rounded text-lg border-2 border-sg-charcoal"
            >
              이메일 견적 요청
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "SG기전은 경기도 화성 자체 공장에서 철제 분전반, SUS 스테인리스 분전함, 가설 분전반, 컨트롤박스를 맞춤 제작하는 전문 제조업체입니다.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "회사소개 | SG기전",
    description:
      "12년 경력, 건축기사·전기기능사 자격 보유. KS·KEC 규격 준수. 1000+ 제작 실적.",
    url: `${siteConfig.url}/about`,
  },
};

const highlights = [
  {
    title: "12년 경력의 실무 전문성",
    body: "건축기사·전기기능사 자격을 보유한 인력이 도면 검토부터 제작·검수까지 직접 담당합니다.",
  },
  {
    title: "경기도 화성 자체 공장",
    body: "외주 없이 직접 생산. 사이즈·사양 변경 요청도 1-3일 안에 반영 가능합니다.",
  },
  {
    title: "KS·KEC 규격 준수",
    body: "한국산업표준(KS) 및 한국전기설비규정(KEC)에 부합하는 재료·부품·시공 절차를 유지합니다.",
  },
  {
    title: "1000+ 제작 실적",
    body: "대학교·공공기관·오피스텔·건설 현장 등 다양한 환경에 납품한 레퍼런스가 축적되어 있습니다.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title="분전반 하나만 12년, SG기전"
        subtitle="철제 분전반, SUS 스테인리스 분전함, 가설 분전반, 컨트롤박스를 경기도 화성 자체 공장에서 맞춤 제작합니다."
        breadcrumb={[
          { name: "홈", url: "/" },
          { name: "회사소개", url: "/about" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((h, i) => (
            <div key={h.title} className="flex gap-6 p-6 bg-sg-cream rounded-lg">
              <div className="bg-sg-yellow text-sg-charcoal w-14 h-14 rounded-lg flex items-center justify-center text-xl font-bold flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-xl font-bold text-sg-charcoal mb-2">{h.title}</h3>
                <p className="text-sg-charcoal">{h.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-6">사업 영역</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {siteConfig.categories.map((c) => (
              <div key={c} className="bg-white rounded-lg px-6 py-8 text-center">
                <p className="font-bold text-sg-charcoal">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sg-yellow">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-sg-charcoal mb-4">
            도면 없이도 견적 가능합니다
          </h2>
          <p className="text-sg-charcoal mb-8">
            사이즈, 회로 수, 설치 환경만 알려주시면 24시간 안에 견적을 드립니다.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href={`tel:${siteConfig.telephone.replace(/[^\d+]/g, "")}`}
              className="px-6 py-3 bg-sg-charcoal text-sg-yellow font-bold rounded"
            >
              {siteConfig.telephone.replace("+82-", "").replace(/^10/, "010")}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="px-6 py-3 bg-white text-sg-charcoal font-bold rounded border border-sg-charcoal"
            >
              이메일 보내기
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

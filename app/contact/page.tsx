import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactPageSchema } from "@/components/seo/schemas";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "문의",
  description:
    "SG기전 견적·기술 문의. 전화 010-4437-4540, 이메일 jaeyoung@sg-powertech.com, 스마트스토어 즉시 구매.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "문의 | SG기전",
    description:
      "맞춤 견적, 도면 검토, 기술 문의. 24시간 안에 답변드립니다.",
    url: `${siteConfig.url}/contact`,
  },
};

const displayPhone = "010-4437-4540";

const channels = [
  {
    label: "전화",
    value: displayPhone,
    href: `tel:${displayPhone.replace(/-/g, "")}`,
    note: "평일 09:00–18:00 · 견적 문의는 즉시 답변",
    accent: "bg-sg-yellow text-sg-charcoal",
  },
  {
    label: "이메일",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    note: "도면·사양서 첨부 가능 · 24시간 내 회신",
    accent: "bg-sg-charcoal text-sg-yellow",
  },
  {
    label: "스마트스토어",
    value: "smartstore.naver.com/sg-powertech",
    href: siteConfig.smartStore,
    note: "표준 사양 즉시 구매",
    accent: "bg-white text-sg-charcoal border-2 border-sg-charcoal",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div>
      <JsonLd data={contactPageSchema()} />
      <PageHero
        title="맞춤 견적, 언제든 문의주세요"
        subtitle="도면이 없어도 사이즈·회로 수·설치 환경만 알려주시면 견적이 가능합니다."
        breadcrumb={[
          { name: "홈", url: "/" },
          { name: "문의", url: "/contact" },
        ]}
      />

      <section className="max-w-4xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 gap-4">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-2xl bg-white shadow hover:shadow-lg transition"
            >
              <div
                className={`inline-flex items-center justify-center w-24 h-16 rounded-lg font-bold ${c.accent}`}
              >
                {c.label}
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-sg-charcoal group-hover:text-sg-yellow-dark transition">
                  {c.value}
                </p>
                <p className="text-sm text-sg-gray mt-1">{c.note}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-sg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
          <h2 className="text-2xl font-bold text-sg-charcoal mb-6">
            위치 & 사업 영역
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-sg-gray font-medium mb-1">공장 위치</p>
              <p className="text-lg text-sg-charcoal">
                {siteConfig.address.region} {siteConfig.address.locality}
              </p>
              <p className="text-sm text-sg-gray mt-2">
                방문 상담은 사전 연락 부탁드립니다.
              </p>
            </div>
            <div>
              <p className="text-sm text-sg-gray font-medium mb-1">업종</p>
              <ul className="space-y-1">
                {siteConfig.categories.map((c) => (
                  <li key={c} className="text-sg-charcoal">
                    · {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

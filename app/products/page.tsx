import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { productItemListSchema } from "@/components/seo/schemas";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "제품",
  description:
    "철제 분전반, SUS 스테인리스 분전함, 가설 분전반, 컨트롤박스. 사이즈·회로 수·설치 환경에 맞춰 맞춤 제작합니다.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "제품 | SG기전",
    description:
      "철제 분전반, SUS 스테인리스 분전함, 가설 분전반, 컨트롤박스. 1-3일 빠른 납기.",
    url: `${siteConfig.url}/products`,
  },
};

const products = [
  {
    slug: "steel-panel",
    name: "철제 분전반",
    category: "분전반",
    image: "/images/product-main.jpg",
    description:
      "LS 차단기 등 국산 부품을 표준으로 사용하며, 회로 구성과 배선 정리를 정밀하게 진행합니다.",
    features: [
      "700mm–1500mm 사이즈 맞춤",
      "국산 차단기 표준",
      "실내 배전반·세대분전반 등 범용",
    ],
  },
  {
    slug: "sus-panel",
    name: "SUS 스테인리스 분전함",
    category: "분전반",
    image: "/images/product-orange.jpg",
    description:
      "SUS304 재질로 옥외·습기·염분 노출 환경에 대응합니다. IP65 방수 처리와 옥외 표지 부착까지 옵션으로 제공합니다.",
    features: [
      "SUS304 스테인리스",
      "IP55 / IP65 방수 옵션",
      "옥외·식품 공장·수처리 시설 적합",
    ],
  },
  {
    slug: "temp-panel",
    name: "가설 분전반",
    category: "가설 전력",
    image: "/images/product-construction.jpg",
    description:
      "건설 현장 이동을 고려한 거치대·바퀴 옵션, 3상 380V 가설 전력 배분에 최적화된 회로 구성.",
    features: [
      "이동식 거치대 / 바퀴 옵션",
      "3상 380V 가설 전력 대응",
      "누전차단기 표준 탑재",
    ],
  },
  {
    slug: "control-box",
    name: "컨트롤박스",
    category: "제어함",
    image: "/images/product-cabinet.jpg",
    description:
      "PLC·릴레이·타이머 등 제어 부품을 조합한 컨트롤박스를 도면 기반으로 제작합니다.",
    features: [
      "PLC / 릴레이 / 타이머 조합",
      "도면 기반 커스텀 제작",
      "산업 자동화 라인 대응",
    ],
  },
];

export default function ProductsPage() {
  return (
    <div>
      <JsonLd data={productItemListSchema(products)} />
      <PageHero
        title="맞춤 제작 분전반 · 표준 분전함 · 컨트롤박스"
        subtitle="현장 사양에 맞춰 사이즈와 회로 구성을 조정합니다. 표준 사양은 네이버 스마트스토어에서 즉시 구매 가능합니다."
        breadcrumb={[
          { name: "홈", url: "/" },
          { name: "제품", url: "/products" },
        ]}
      />

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((p) => (
            <article
              key={p.slug}
              id={p.slug}
              className="bg-white rounded-2xl overflow-hidden shadow scroll-mt-24"
            >
              <div className="relative w-full aspect-[16/10] bg-sg-cream">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs text-sg-gray font-medium mb-2">
                  {p.category}
                </p>
                <h2 className="text-2xl font-bold text-sg-charcoal mb-3">
                  {p.name}
                </h2>
                <p className="text-sg-charcoal mb-4">{p.description}</p>
                <ul className="space-y-1.5">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2 text-sm text-sg-charcoal"
                    >
                      <span
                        className="text-sg-yellow-dark font-bold"
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sg-charcoal">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">표준 사양은 바로 구매</h2>
          <p className="text-gray-300 mb-8">
            네이버 스마트스토어에서 재고 확인 후 즉시 주문 가능합니다.
          </p>
          <a
            href={siteConfig.smartStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-sg-yellow text-sg-charcoal font-bold rounded text-lg"
          >
            네이버 스마트스토어 바로가기
          </a>
        </div>
      </section>
    </div>
  );
}

export const siteConfig = {
  name: "SG기전",
  legalName: "SG기전",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sg-powertech.com",
  locale: "ko_KR",
  description:
    "분전반, 철제 분전함, SUS 스테인리스 분전함 맞춤 제작 전문. 경기도 화성 자체 공장에서 1-3일 빠른 납기.",
  keywords: [
    "분전반",
    "철제 분전함",
    "SUS 분전함",
    "스테인리스 분전함",
    "노출 철함",
    "전기 분전반",
    "대형 분전반",
    "주문 제작 분전함",
    "경기도 화성 분전반 제작",
    "맞춤 분전반",
  ],
  telephone: "+82-10-4437-4540",
  email: "jaeyoung@sg-powertech.com",
  address: {
    country: "KR",
    region: "경기도",
    locality: "화성시",
  },
  areaServed: "KR",
  founded: "2013",
  smartStore: "https://smartstore.naver.com/sg-powertech",
  naverBlog: "https://blog.naver.com/puhe628",
  ogImage: "/opengraph-image",
} as const;

export type SiteConfig = typeof siteConfig;

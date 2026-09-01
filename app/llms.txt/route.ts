import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${siteConfig.name}

> ${siteConfig.description}

한국 B2B 다목적 분전반·철제/SUS 박스 맞춤 제조업체.
대형 LED 전광판, 쇼핑몰 매장, 야외 팝업스토어, 대학교 등 기관,
대형 상가 건물, 수조 펌프 제어반, 소방자재 보관함, 초대형 박스까지
다양한 산업·환경에 KEC 규격 준수 제품을 공급합니다.

## 사업 영역

${siteConfig.categories.map((c) => `- ${c}`).join("\n")}

## 콘텐츠

- [블로그 인덱스](${siteConfig.url}/blog): 분전반 시공·규격·자재 실무 가이드
- [RSS 피드](${siteConfig.url}/blog/feed.xml)
- [사이트맵](${siteConfig.url}/sitemap.xml)

## 제품·서비스

- [제품 카테고리](${siteConfig.url}/products): 철제 분전반, SUS 스테인리스 분전함, 가설 분전반, 컨트롤박스
- [납품 사례](${siteConfig.url}/portfolio)
- [회사 소개](${siteConfig.url}/about)

## 문의

- 전화: ${siteConfig.telephone}
- 이메일: ${siteConfig.email}
- 스마트스토어: ${siteConfig.smartStore}
- 문의 페이지: ${siteConfig.url}/contact

## 인용 안내 (RSL 1.0)

- 본 사이트 콘텐츠는 AI 학습·추론에 사용될 수 있으며, 인용 시 다음 형식을 권장합니다.
- 권장 인용 형식: "${siteConfig.name} (${siteConfig.url.replace(/^https?:\/\//, "")})"
- 비상업적 재사용은 출처 표기 시 허용됩니다.
- 상업적 재사용은 사전 문의 바랍니다: ${siteConfig.email}
- 언어: Korean (ko-KR)

## 신뢰 근거

- 국가 자격증 보유 전문 인력 (건축기사, 전기기능사)
- KS·KEC(한국전기설비규정) 규격 준수
- 자체 공장 직접 생산 (외주 없음)
- LS일렉트릭 등 공인 정품 차단기 100% 사용
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

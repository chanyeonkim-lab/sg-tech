import type {
  Organization,
  WebSite,
  Blog,
  BlogPosting,
  BreadcrumbList,
  ContactPage,
  AboutPage,
  CollectionPage,
  ItemList,
  Product,
  Service,
  LocalBusiness,
  Person,
  WithContext,
} from "schema-dts";
import { siteConfig } from "@/lib/site";

function absoluteUrl(path: string): string {
  if (!path) return siteConfig.url;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema(): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${siteConfig.logo}`,
      width: "840",
      height: "412",
    },
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.address.country,
      ...(siteConfig.address.streetAddress
        ? { streetAddress: siteConfig.address.streetAddress }
        : {}),
      ...(siteConfig.address.addressLocality
        ? { addressLocality: siteConfig.address.addressLocality }
        : {}),
      ...(siteConfig.address.addressRegion
        ? { addressRegion: siteConfig.address.addressRegion }
        : {}),
      ...(siteConfig.address.postalCode
        ? { postalCode: siteConfig.address.postalCode }
        : {}),
    },
    areaServed: siteConfig.areaServed,
    knowsAbout: [...siteConfig.categories],
    sameAs: [siteConfig.smartStore, siteConfig.naverBlog],
  };
}

export function localBusinessSchema(): WithContext<LocalBusiness> | null {
  const { address, geo } = siteConfig;
  if (!address.streetAddress || !address.addressLocality) return null;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    image: absoluteUrl(siteConfig.logo),
    priceRange: "₩₩",
    address: {
      "@type": "PostalAddress",
      addressCountry: address.country,
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      ...(address.addressRegion ? { addressRegion: address.addressRegion } : {}),
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
    },
    ...(geo.latitude && geo.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: geo.latitude,
            longitude: geo.longitude,
          },
        }
      : {}),
    ...(siteConfig.openingHours.length > 0
      ? {
          openingHoursSpecification: siteConfig.openingHours.map((spec) => ({
            "@type": "OpeningHoursSpecification" as const,
            ...parseOpeningHours(spec),
          })),
        }
      : {}),
    areaServed: siteConfig.areaServed,
    sameAs: [siteConfig.smartStore, siteConfig.naverBlog],
  };
}

function parseOpeningHours(spec: string): Record<string, string | string[]> {
  const [days, hours] = spec.split(" ");
  const [opens, closes] = (hours ?? "").split("-");
  return {
    dayOfWeek: days?.split(",") ?? [],
    ...(opens && { opens }),
    ...(closes && { closes }),
  };
}

export function personAuthorSchema(): WithContext<Person> {
  const { author } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}#author-${encodeURIComponent(author.name)}`,
    name: author.name,
    jobTitle: author.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    knowsAbout: [...author.knowsAbout],
    hasCredential: author.credentials.map((cred) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: cred,
    })),
    url: `${siteConfig.url}/about`,
  };
}

export function websiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export interface BlogPostingInput {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  cover?: string;
  tags?: string[];
}

export function blogPostingSchema(post: BlogPostingInput): WithContext<BlogPosting> {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}#author-${encodeURIComponent(siteConfig.author.name)}`,
      name: siteConfig.author.name,
      jobTitle: siteConfig.author.jobTitle,
      worksFor: { "@type": "Organization", name: siteConfig.name },
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: absoluteUrl(post.cover ?? siteConfig.defaultOgImage),
    keywords: post.tags?.join(", "),
    inLanguage: "ko-KR",
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

export function contactPageSchema(): WithContext<ContactPage> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "SG기전 · 문의",
    url: `${siteConfig.url}/contact`,
    inLanguage: "ko-KR",
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      telephone: siteConfig.telephone,
      email: siteConfig.email,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: siteConfig.telephone,
          email: siteConfig.email,
          areaServed: siteConfig.areaServed,
          availableLanguage: ["ko"],
        },
      ],
    },
  };
}

export interface ProductItemInput {
  name: string;
  description: string;
  slug: string;
  image?: string;
  category?: string;
}

export function serviceSchema(): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "기관·기업 맞춤 분전반 납품 서비스",
    serviceType: "Custom electrical distribution panel manufacturing and supply for institutions",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: siteConfig.areaServed,
    audience: {
      "@type": "BusinessAudience",
      audienceType: "학교·기업·관공서·지식산업센터 전기설비팀·영선팀",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "KRW",
      areaServed: siteConfig.areaServed,
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
    termsOfService: `${siteConfig.url}/institutional-supply`,
  };
}

export interface BlogListInput {
  posts: {
    slug: string;
    title: string;
    description: string;
    date: string;
    updated?: string;
  }[];
}

export function blogSchema({ posts }: BlogListInput): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog#blog`,
    name: `${siteConfig.name} 블로그`,
    url: `${siteConfig.url}/blog`,
    inLanguage: "ko-KR",
    description:
      "분전반·분전함 시공 노하우, 실제 납품 사례, KEC·KS 규정 해설을 정리합니다.",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      url: `${siteConfig.url}/blog/${p.slug}`,
      mainEntityOfPage: `${siteConfig.url}/blog/${p.slug}`,
      author: {
        "@type": "Person",
        "@id": `${siteConfig.url}#author-${encodeURIComponent(siteConfig.author.name)}`,
        name: siteConfig.author.name,
      },
    })),
  };
}

export function aboutPageSchema(): WithContext<AboutPage> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteConfig.url}/about#aboutpage`,
    url: `${siteConfig.url}/about`,
    name: `${siteConfig.name} 회사소개`,
    inLanguage: "ko-KR",
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteConfig.url}#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function collectionPageSchema(input: {
  slug: string;
  name: string;
  description: string;
}): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}${input.slug}#collectionpage`,
    url: `${siteConfig.url}${input.slug}`,
    name: input.name,
    description: input.description,
    inLanguage: "ko-KR",
    isPartOf: { "@type": "WebSite", "@id": siteConfig.url },
  };
}

export function productItemListSchema(items: ProductItemInput[]): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: item.name,
        description: item.description,
        url: `${siteConfig.url}/products#${item.slug}`,
        image: item.image ? `${siteConfig.url}${item.image}` : undefined,
        category: item.category,
        brand: { "@type": "Brand", name: siteConfig.name },
        manufacturer: { "@type": "Organization", name: siteConfig.name },
      } satisfies Product,
    })),
  };
}

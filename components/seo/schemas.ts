import type {
  Organization,
  WebSite,
  BlogPosting,
  BreadcrumbList,
  ContactPage,
  ItemList,
  Product,
  Service,
  WithContext,
} from "schema-dts";
import { siteConfig } from "@/lib/site";

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
    },
    areaServed: siteConfig.areaServed,
    knowsAbout: [...siteConfig.categories],
    sameAs: [siteConfig.smartStore, siteConfig.naverBlog],
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
    author: { "@type": "Organization", name: siteConfig.name },
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
    image: post.cover ? `${siteConfig.url}${post.cover}` : undefined,
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

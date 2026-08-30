import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

/**
 * Google는 priority/changefreq를 무시하므로 삭제. lastModified는 실제 변경 시점만
 * 기입 (정적 라우트는 콘텐츠 변경 추적이 없으므로 생략, 블로그 포스트는 velite
 * frontmatter의 실제 날짜 사용).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url },
    { url: `${siteConfig.url}/about` },
    { url: `${siteConfig.url}/products` },
    { url: `${siteConfig.url}/institutional-supply` },
    { url: `${siteConfig.url}/portfolio` },
    { url: `${siteConfig.url}/contact` },
    { url: `${siteConfig.url}/blog` },
  ];

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
  }));

  return [...staticRoutes, ...postRoutes];
}

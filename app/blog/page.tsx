import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumb } from "@/components/blog/Breadcrumb";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "블로그",
  description:
    "분전반·분전함 시공 노하우, 실제 납품 사례, KEC·KS 규정 해설을 정리합니다.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "블로그 | SG기전",
    description:
      "분전반·분전함 시공 노하우, 실제 납품 사례, KEC·KS 규정 해설을 정리합니다.",
    url: `${siteConfig.url}/blog`,
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
      <Breadcrumb
        items={[
          { name: "홈", url: "/" },
          { name: "블로그", url: "/blog" },
        ]}
      />
      <header className="mt-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-sg-charcoal mb-4">
          블로그
        </h1>
        <p className="text-lg text-sg-gray max-w-2xl">
          분전반·분전함 시공 노하우, 실제 납품 사례, KEC·KS 규정 해설을 정리합니다.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-sg-gray py-24 text-center">
          아직 발행된 글이 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

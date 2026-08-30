import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";
import { Breadcrumb } from "@/components/blog/Breadcrumb";
import { AuthorByline } from "@/components/blog/AuthorByline";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPostingSchema } from "@/components/seo/schemas";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

interface Params {
  params: { slug: string };
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: [...post.tags],
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: Params) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 md:px-8 py-16">
      <JsonLd
        data={blogPostingSchema({
          title: post.title,
          description: post.description,
          slug: post.slug,
          datePublished: post.date,
          dateModified: post.updated,
          cover: post.cover,
          tags: post.tags,
        })}
      />
      <Breadcrumb
        items={[
          { name: "홈", url: "/" },
          { name: "블로그", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <header className="mt-6 mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-sg-charcoal bg-sg-yellow-pale px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-sg-charcoal leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-sg-gray">{post.description}</p>
        <div className="mt-6 flex items-center gap-3 text-sm text-sg-gray">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span aria-hidden>·</span>
          <span>{post.metadata.readingTime}분 읽기</span>
        </div>
      </header>

      {post.cover && (
        <div className="relative w-full aspect-[16/9] mb-10 rounded-2xl overflow-hidden bg-sg-cream">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <AuthorByline reviewedDate={post.updated ?? post.date} />
        <MdxRenderer code={post.body} />
      </div>
    </article>
  );
}

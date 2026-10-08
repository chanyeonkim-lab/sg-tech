import { notFound } from "next/navigation";
import BlogPostPage, {
  generateMetadata as generateArticleMetadata,
} from "@/app/blog/[slug]/page";
import { getCaseStudies, getPostBySlug } from "@/lib/posts";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getCaseStudies().map((post) => ({ slug: post.slug }));
}

export function generateMetadata(props: Params) {
  const post = getPostBySlug(props.params.slug);
  if (!post || post.category !== "case-study") return {};
  return generateArticleMetadata(props);
}

export default function CaseStudyPage(props: Params) {
  const post = getPostBySlug(props.params.slug);
  if (!post || post.category !== "case-study") notFound();
  return <BlogPostPage {...props} />;
}

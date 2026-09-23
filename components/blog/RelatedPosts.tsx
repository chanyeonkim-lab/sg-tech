import Link from "next/link";
import type { Post } from "@/lib/posts";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <aside
      aria-labelledby="related-posts-heading"
      className="not-prose mt-16 pt-10 border-t border-sg-cream"
    >
      <h2
        id="related-posts-heading"
        className="text-2xl font-bold text-sg-charcoal mb-6"
      >
        함께 읽으면 좋은 글
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={post.permalink}
              className="group flex flex-col h-full p-5 rounded-xl bg-sg-cream hover:bg-sg-yellow-pale transition"
            >
              <div className="flex flex-wrap gap-1.5 mb-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-sg-charcoal bg-white px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h3 className="font-bold text-sg-charcoal group-hover:text-sg-yellow-dark transition line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-sg-gray line-clamp-2">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

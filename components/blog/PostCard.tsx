import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={post.permalink}
      className="group block bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition"
    >
      {post.cover && (
        <div className="relative w-full aspect-[16/9] bg-sg-cream">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-sg-charcoal bg-sg-yellow-pale px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-sg-charcoal group-hover:text-sg-yellow-dark transition mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-sg-gray line-clamp-2">{post.description}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-sg-gray">
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
      </div>
    </Link>
  );
}

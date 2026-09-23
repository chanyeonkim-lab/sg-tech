import { posts } from "#site/content";

export type Post = (typeof posts)[number];

const isPublished = (post: Post) => !post.draft;

export function getAllPosts(): Post[] {
  return posts
    .filter(isPublished)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug && !p.draft);
}

/**
 * 현재 글과 태그가 겹치는 글을 겹침 수 → 최신순으로 정렬해 반환.
 * 겹치는 태그가 없으면 최신 글로 폴백해서 최소 개수를 채운다.
 */
export function getRelatedPosts(current: Post, limit = 3): Post[] {
  const others = getAllPosts().filter((p) => p.slug !== current.slug);
  const currentTags = new Set(current.tags);

  const scored = others
    .map((p) => ({
      post: p,
      overlap: p.tags.filter((t) => currentTags.has(t)).length,
    }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return a.post.date < b.post.date ? 1 : -1;
    })
    .map((x) => x.post);

  if (scored.length >= limit) return scored.slice(0, limit);

  const seen = new Set(scored.map((p) => p.slug));
  const fallback = others.filter((p) => !seen.has(p.slug));
  return [...scored, ...fallback].slice(0, limit);
}

export function getAllTags(): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

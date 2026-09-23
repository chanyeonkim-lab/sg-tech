import { readFileSync } from "node:fs";
import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

/**
 * `## 자주 묻는 질문` 섹션에서 Q/A 쌍을 추출한다.
 * 지원 포맷:
 *   **Q. 질문?**    →  다음 줄부터 A. …
 *   **Q1. 질문?**   →  다음 문단 (A. 접두어 없이도 가능)
 */
/**
 * `**N단계 — 제목**` 패턴이 3개 이상 포함된 H2 섹션을 HowTo로 추출한다.
 * name = 해당 H2 헤딩 텍스트, steps = 각 단계의 소제목/설명 문단.
 */
function extractHowTo(mdx: string): {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
} | null {
  const h2Regex = /^## (.+)$/gm;
  const sections: { title: string; start: number; end: number }[] = [];
  const matches: RegExpExecArray[] = [];
  let hm: RegExpExecArray | null;
  while ((hm = h2Regex.exec(mdx)) !== null) matches.push(hm);
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    if (m.index === undefined) continue;
    const start = m.index;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? mdx.length) : mdx.length;
    sections.push({ title: m[1].trim(), start, end });
  }

  for (const sec of sections) {
    const body = mdx.slice(sec.start, sec.end);
    // 두 가지 포맷 지원:
    //   A) **1단계 — 제목**\n설명 (다음 줄)
    //   B) **1단계 — 제목.** 설명 (같은 줄)
    const stepRegex = /^\*\*([0-9]+)단계\s*[—-]\s*([^*\n]+?)\.?\*\*[ \t]*\n?([\s\S]+?)(?=\n\*\*[0-9]+단계|\n## |\n$)/gm;
    const stepMatches: RegExpExecArray[] = [];
    let sm: RegExpExecArray | null;
    while ((sm = stepRegex.exec(body)) !== null) stepMatches.push(sm);
    if (stepMatches.length < 3) continue;

    const steps = stepMatches.map((m) => {
      const stepName = m[2].trim();
      let text = m[3].trim();
      text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      text = text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
      text = text.replace(/\s+/g, " ").trim();
      return { name: stepName, text };
    });

    // 섹션 introduction paragraph → description
    const introMatch = body.match(/^## .+\n+([^\n#*][^\n]*)/);
    const description = introMatch
      ? introMatch[1].replace(/\*\*(.+?)\*\*/g, "$1").replace(/\s+/g, " ").trim()
      : sec.title;

    return { name: sec.title, description, steps };
  }
  return null;
}

function extractFaqs(mdx: string): { question: string; answer: string }[] {
  const start = mdx.search(/^## 자주 묻는 질문\s*$/m);
  if (start === -1) return [];
  const rest = mdx.slice(start);
  const endMatch = rest.slice(1).search(/^## |^<ContactCta/m);
  const section = endMatch === -1 ? rest : rest.slice(0, endMatch + 1);

  const blocks = section.split(/\n(?=\*\*Q[0-9.]*\.?\s)/);
  const faqs: { question: string; answer: string }[] = [];

  for (const block of blocks) {
    const m = block.match(/^\*\*Q[0-9]*\.?\s*(.+?)\*\*\s*\n([\s\S]+)$/);
    if (!m) continue;
    const question = m[1].trim().replace(/\s+/g, " ");
    let answer = m[2].trim();
    answer = answer.replace(/^A\.\s*/, "");
    // 링크 마크다운 → 평문
    answer = answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    // 볼드/이탤릭 마크 제거
    answer = answer.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
    // 개행 → 공백
    answer = answer.replace(/\s+/g, " ").trim();
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      description: s.string().max(200),
      date: s.isodate(),
      updated: s.isodate().optional(),
      tags: s.array(s.string()).default([]),
      cover: s.string().optional(),
      draft: s.boolean().default(false),
      slug: s.slug("posts").optional(),
      body: s.mdx(),
      metadata: s.metadata(),
    })
    .transform((data, { meta }) => {
      const filename = meta.path.split("/").pop()?.replace(/\.mdx$/, "") ?? "";
      const slug = data.slug ?? filename;
      const raw = readFileSync(meta.path, "utf8");
      const faqs = extractFaqs(raw);
      const howto = extractHowTo(raw);
      return {
        ...data,
        slug,
        permalink: `/blog/${slug}`,
        faqs,
        howto,
      };
    }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/velite",
    base: "/velite/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [rehypePrettyCode, { theme: "github-dark-dimmed" }],
    ],
  },
});

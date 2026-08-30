import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

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
      return {
        ...data,
        slug,
        permalink: `/blog/${slug}`,
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

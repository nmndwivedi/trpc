import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { capitalize } from "./src/lib/common";
import { NEXT_PUBLIC_SITE_URL } from "./src/lib/env";

const url = NEXT_PUBLIC_SITE_URL;

export const ChangelogPost = defineDocumentType(() => ({
  name: "ChangelogPost",
  filePathPattern: `./*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    publishedAt: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    author: {
      type: "string",
      required: true,
    },
  },
  // @ts-ignore
  computedFields: computedFields("changelog"),
}));

const computedFields = (type: "changelog" | "blog") => ({
  slug: {
    type: "string",
    resolve: (doc: any) => doc._raw.flattenedPath.replace(`${type}/`, ""),
  },
  image: {
    type: "string",
    resolve: (doc: any) =>
      `${url}/changelog-images/${doc._raw.flattenedPath.replace(
        `${type}/`,
        ""
      )}.png`,
  },
  images: {
    type: "array",
    resolve: (doc: any) => {
      return doc.body.raw.match(
        /(?<=<BlurImage[^>]*\bsrc=")[^"]+(?="[^>]*\/>)/g
      );
    },
  },
  tweetIds: {
    type: "array",
    resolve: (doc: any) => {
      const tweetMatches = doc.body.raw.match(
        /<StaticTweet\sid="[0-9]+"\s\/>/g
      );
      return tweetMatches?.map((tweet: any) => tweet.match(/[0-9]+/g)[0]) || [];
    },
  },
  structuredData: {
    type: "object",
    resolve: (doc: any) => ({
      "@context": "https://schema.org",
      "@type": `${capitalize(type)}Posting`,
      headline: doc.title,
      datePublished: doc.publishedAt,
      dateModified: doc.publishedAt,
      description: doc.summary,
      image: `${url}/changelog-images/${doc._raw.flattenedPath.replace(
        `${type}/`,
        ""
      )}.png`,
      url: `${url}/${doc._raw.flattenedPath}`,
      author: {
        "@type": "Person",
        name: doc.author,
      },
    }),
  },
});

export default makeSource({
  contentDirPath: "./src/posts/changelog",
  documentTypes: [ChangelogPost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});

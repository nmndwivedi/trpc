import { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_SITE_URL } from "@/lib/env";
import { allChangelogPosts } from "contentlayer/generated";

export async function GET() {
  return new Response(
    `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
        <title>${NEXT_PUBLIC_SITE_NAME}</title>
        <subtitle>Changelog</subtitle>
        <link href="${NEXT_PUBLIC_SITE_URL}/atom" rel="self"/>
        <link href="${NEXT_PUBLIC_SITE_URL}/"/>
        <updated>${
          allChangelogPosts[0]?.publishedAt || new Date().toDateString
        }</updated>
        <id>${NEXT_PUBLIC_SITE_URL}/</id>${allChangelogPosts
      .map((post) => {
        return `
        <entry>
            <id>${NEXT_PUBLIC_SITE_URL}/changelog/${post.slug}</id>
            <title>${post.title}</title>
            <link href="${NEXT_PUBLIC_SITE_URL}/changelog/${post.slug}"/>
            <updated>${post.publishedAt}</updated>
            <author><name>${post.author}</name></author>
        </entry>`;
      })
      .join("")}
    </feed>`,
    {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    }
  );
}

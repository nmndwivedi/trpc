import { allChangelogPosts } from "contentlayer/generated";
import Link from "next/link";
import { Twitter } from "@/components/shared";
import { Rss } from "lucide-react";
import BlurImage from "@/components/BlurImage";
import { MDX } from "@/components/MDX";
import { formatDate } from "@/lib/common";
import Navbar from "@/components/Navbar";

// export const metadata = constructMetadata({
//   title: "Changelog - Dub",
//   description:
//     "All the latest updates, improvements, and fixes to Dub - the link management tool for modern marketing teams.",
//   image: "https://dub.sh/api/og/changelog",
// });

export default function Changelog() {
  return (
    <>
      <Navbar login />
      <div className="mx-auto max-w-screen-xl md:px-20">
        <div className="relative grid border-b border-textcolor border-opacity-30 py-20 dark:border-textcolor-dark dark:border-opacity-30 md:grid-cols-4">
          <div className="mx-5 flex flex-col space-y-6 md:col-span-3 md:mx-0">
            <h1 className="txt font-display text-4xl font-bold tracking-tight md:text-5xl">
              Changelog
            </h1>
            <p className="txt text-lg opacity-70">
              The latest updates, improvements, and fixes to Chainify.ai
            </p>
          </div>
          <div className="absolute bottom-4 right-0 mr-4 flex items-center space-x-2">
            <p className="txt text-sm opacity-70">
              Subscribe to latest updates →
            </p>
            <Link
              href="https://twitter.com/chainify"
              className="rounded-full bg-blue-100 p-2 transition-colors hover:bg-blue-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-4 w-4 text-[#1d9bf0]" />
            </Link>
            <Link
              href="/server/atom"
              className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            >
              <Rss className="h-4 w-4 text-gray-500" />
            </Link>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {allChangelogPosts
            .sort((a, b) => {
              if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                return -1;
              }
              return 1;
            })
            .map((post, idx) => (
              <div
                key={idx}
                className="grid py-20 md:grid-cols-4 md:px-5 xl:px-0"
              >
                <div className="sticky top-10 hidden self-start md:col-span-1 md:block">
                  <Link href={`/changelog/${post.slug}`}>
                    <time
                      dateTime={post.publishedAt}
                      className="txt opacity-50 transition-colors hover:text-gray-800"
                    >
                      {formatDate(post.publishedAt)}
                    </time>
                  </Link>
                </div>
                <div className="md:col-span-3">
                  <div className="flex flex-col gap-6">
                    <Link href={`/changelog/${post.slug}`}>
                      <BlurImage
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={900}
                        priority={idx === 0} // since it's above the fold
                        className="border border-gray-100 shadow-lg md:rounded-2xl"
                      />
                    </Link>
                    <Link
                      href={`/changelog/${post.slug}`}
                      className="group mx-5 flex items-center space-x-3 md:mx-0"
                    >
                      <time
                        dateTime={post.publishedAt}
                        className="text-sm text-gray-500 transition-all group-hover:text-gray-800 md:hidden"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                    </Link>
                    <Link
                      href={`/changelog/${post.slug}`}
                      className="mx-5 md:mx-0"
                    >
                      <h2 className="txt font-display text-3xl font-bold tracking-tight hover:underline hover:decoration-1 hover:underline-offset-4 md:text-4xl">
                        {post.title}
                      </h2>
                    </Link>
                    <MDX code={post.body.code} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

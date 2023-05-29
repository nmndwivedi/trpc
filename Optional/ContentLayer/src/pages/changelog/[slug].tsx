import type { GetStaticProps, GetStaticPropsContext, Metadata } from "next";
import { type ChangelogPost, allChangelogPosts } from "contentlayer/generated";
import Link from "next/link";
import { Facebook, LinkedIn, Twitter } from "@/components/shared";
import Author from "@/components/Author";
import BlurImage from "@/components/BlurImage";
import { formatDate } from "@/lib/common";
import { MDX } from "@/components/MDX";
import { NEXT_PUBLIC_SITE_NAME, NEXT_PUBLIC_SITE_URL, TWITTER_AUTH_TOKEN } from "@/lib/env";
import Navbar from "@/components/Navbar";

export async function getStaticPaths() {
  const paths = allChangelogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false, // or "blocking" or true depending on your needs
  };
}

interface Author {
  profile_image_url_https: string;
  name: string;
  screen_name: string;
  errors: any; // Optional field, present only if there are errors in the API response
}

interface Props {
  post: ChangelogPost;
  author: Author | null;
}

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: GetStaticPropsContext) => {
  // params contains the dynamic route parameter, in this case, 'slug'
  const slug = params?.slug as string;

  const post = allChangelogPosts.find((post) => post.slug === slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(
    `https://api.twitter.com/1.1/users/show.json?screen_name=${post.author}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TWITTER_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const author = (await response.json()) as Author | null;

  return {
    props: {
      post,
      author: author?.errors ? null : author,
    },
  };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allChangelogPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;

  return {
    title: `${title} -  Changelog`,
    description,
    openGraph: {
      title: `${title} - ${NEXT_PUBLIC_SITE_NAME} Changelog`,
      description,
      type: "article",
      publishedTime,
      url: `${NEXT_PUBLIC_SITE_URL}/changelog/${post.slug}`,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function ChangelogPost({ post, author }: Props) {
  return (
    <>
      <Navbar login />
      <div className="mx-auto my-20 grid max-w-screen-xl md:grid-cols-4 md:px-20">
        <div className="sticky top-10 hidden self-start md:col-span-1 md:block">
          <Link
            href="/changelog"
            className="txt text-sm opacity-50 transition-colors"
          >
            ← Back to Changelog
          </Link>
        </div>
        <div className="flex flex-col space-y-8 md:col-span-3">
          <div className="mx-5 grid gap-5 md:mx-0">
            <div className="flex flex-col">
              <Link
                href="/changelog"
                className="txt my-5 text-sm opacity-50 md:hidden"
              >
                ← Back to Changelog
              </Link>
              <time
                dateTime={post.publishedAt}
                className="flex items-center text-sm text-gray-500 md:text-base"
              >
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <h1 className="txt text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
          </div>
          <BlurImage
            src={post.image}
            alt={post.title}
            width={1200}
            height={900}
            priority // since it's above the fold
            className="border border-gray-100 md:rounded-2xl"
          />
          <div className="mx-5 mb-10 flex items-center justify-between md:mx-0">
            <Author data={author} username={post.author} />
            <div className="flex items-center space-x-6">
              <Link
                href={`https://twitter.com/intent/tweet?text=${post.title}&url=${NEXT_PUBLIC_SITE_URL}/changelog/${post.slug}&via=${post.author}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110"
              >
                <Twitter className="h-6 w-6 rounded-md bg-transparent text-[#1d9bf0]" />
              </Link>
              <Link
                href={`
            http://www.linkedin.com/shareArticle?mini=true&url=${NEXT_PUBLIC_SITE_URL}/changelog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110"
              >
                <LinkedIn className="h-6 w-6 rounded-md bg-transparent" />
              </Link>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${NEXT_PUBLIC_SITE_URL}/changelog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110"
              >
                <Facebook className="h-6 w-6 rounded-md bg-transparent" />
              </Link>
            </div>
          </div>
          <MDX code={post.body.code} />
          <div className="mt-10 flex justify-end border-t border-gray-200 pt-5">
            <Link
              href={`https://twitter.com/intent/tweet?text=${
                "Reading " + post.title
              }&url=${NEXT_PUBLIC_SITE_URL}/changelog/${post.slug}&via=${
                post.author
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="sbtn text-sm"
            >
              <p>Thoughts? Let me know →</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

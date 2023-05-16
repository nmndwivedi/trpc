import { getServerSideSitemap, type ISitemapField } from "next-sitemap";
import type { GetServerSideProps } from "next";
import { supamaster } from "~/lib/supabase";
import { NEXT_PUBLIC_SITE_URL } from "~/lib/env";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const { data: prompts, error: promptsError } = await supamaster
    .from("prompts")
    .select("*");

  const { data: engineers, error: engineersError } = await supamaster
    .from("engineers")
    .select("*");

  if (promptsError || !prompts || engineersError || !engineers) {
    return {
      props: {},
    };
  }

  const promptFields: ISitemapField[] = prompts.map((prompt) => ({
    loc: NEXT_PUBLIC_SITE_URL + "/prompt/" + prompt.id,
    lastmod: prompt.updated_at,
  }));

  const engineerFields: ISitemapField[] = engineers.map((engineer) => ({
    loc: NEXT_PUBLIC_SITE_URL + "/engineer/" + engineer.username,
    lastmod: engineer.updated_at,
  }));

  const fields = [...promptFields, ...engineerFields];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}

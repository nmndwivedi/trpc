import { type NextPage } from "next";
import Head from "next/head";
import Landing from "@/components/Landing";
import { NEXT_PUBLIC_SITE_NAME } from "@/lib/env";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{NEXT_PUBLIC_SITE_NAME}</title>
        <meta name="description" content={""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Landing />
      </main>
    </>
  );
};

export default Home;

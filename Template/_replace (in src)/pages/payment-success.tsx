import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "@/components/Navbar";
import { NEXT_PUBLIC_SITE_NAME } from "@/lib/env";

const PaymentSuccess = () => {
  const r = useRouter();

  const getForPath = () => {
    switch (r.query.type) {
      case "prompt":
        return {
          link: "/prompt-engineering",
          name: "Prompt Engineering Home",
          message: "Congratulations! Your prompt API is live!",
        };
      case "prompt-update":
        return {
          link: "/prompt-engineering",
          name: "Prompt Engineering Home",
          message: "Your prompt API was updated",
        };
      case "prompt-delete":
        return {
          link: "/prompt-engineering",
          name: "Prompt Engineering Home",
          message: "Your prompt API was deleted",
        };
      case "middleware-delete":
        return {
          link: "/prompt-engineering",
          name: "Prompt Engineering Home",
          message: "Your middleware API was deleted",
        };
      default:
        return {
          link: "/dashboard",
          name: "Dashboard",
          message: "",
        };
    }
  };

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_SITE_NAME} - Successfully Subscribed`}</title>
        <meta
          name="description"
          content={`${NEXT_PUBLIC_SITE_NAME} - Successfully Subscribed`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar login />

      <div className="mt-24 flex flex-col items-center gap-y-6 px-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 571.9 689"
          className="h-64 w-64"
        >
          <path
            d="M4 330a28 28 0 0 0 42 6l87 50-3-52-82-39a28 28 0 0 0-44 35Z"
            fill="#ffb8b8"
          />
          <path
            d="M254 528c-26 36-25 95-18 161h121l6-12 7 12h113s-8-167-24-172-205 11-205 11Z"
            fill="#2f2e41"
          />
          <circle cx="357.3" cy="92.2" r="61.4" fill="#ffb8b8" />
          <path
            d="m402 170 12 23 83 37-22 211-9 22 5 18-12 15c12 10 13 22 7 34l-39 8s-212 19-194-14c19-36 24-142-19-199-37-48-8-110-8-110l87-26 32-19Z"
            fill="#3f3d56"
          />
          <path
            d="M384 2a3 3 0 0 1 4-2c-28-1-58 2-81 17-6 4-11 9-18 11a2 2 0 0 0 0 4h1a2 2 0 0 1-1 3 2 2 0 0 0 0 4l5 3a2 2 0 0 1 0 3 9 9 0 0 1-2 1 2 2 0 0 0 0 3 19 19 0 0 1 5 7c2 5 2 10 2 15 2-7 10-11 17-12s14 2 21 4a117 117 0 0 0 47 2c-6 10-1 23 3 34l15-6c19-12 6 36-2 42 15 5 55-53 42-75-6-11-2-26-15-37-6-7-19-4-25-9-3-3 1-9-3-10l-15-2Z"
            fill="#2f2e41"
          />
          <path
            d="M281 194c-12 50-41 167-70 192a17 17 0 0 1-6 3c-103 26-136-38-136-38s27-14 28-40l56 17 48-109 7-7Z"
            fill="#3f3d56"
          />
          <path
            d="M500 656a28 28 0 0 0-3-43l29-95-49 15-20 88a28 28 0 0 0 43 35Z"
            fill="#ffb8b8"
          />
          <path
            d="m474 224 23 6s94 184 71 219-50 151-50 151-42-8-57-29l28-138-29-116Z"
            fill="#3f3d56"
          />
          <path
            d="M40 497V201a23 23 0 0 1 23-22h224a23 23 0 0 1 22 23v296a23 23 0 0 1-23 23l-224-1a23 23 0 0 1-22-23Z"
            fill="#e6e6e6"
          />
          <path
            d="m57 408 1-191a21 21 0 0 1 21-21l192 1a21 21 0 0 1 21 21v264a21 21 0 0 1-22 21H151a94 94 0 0 1-94-95Z"
            fill="#fff"
          />
          <path
            d="M249 280H99a9 9 0 0 1 0-18h150a9 9 0 0 1 0 18ZM132 239H99a9 9 0 0 1 0-18h33a9 9 0 0 1 0 18ZM249 322H99a9 9 0 0 1 0-18h150a9 9 0 0 1 0 18ZM249 363H99a9 9 0 0 1 0-18h150a9 9 0 0 1 0 18Z"
            fill="#047857"
          />
          <circle cx="237" cy="436.5" r="35.8" fill="#047857" />
          <path
            d="M232 455a4 4 0 0 1-3-1l-10-13a4 4 0 1 1 6-5l7 8 16-24a4 4 0 1 1 7 4l-20 29a4 4 0 0 1-3 2Z"
            fill="#fff"
          />
          <circle cx="160.6" cy="92.5" r="17" fill="#f2f2f2" />
          <circle cx="98.6" cy="581.5" r="17" fill="#f2f2f2" />
          <circle cx="489.6" cy="158.5" r="17" fill="#f2f2f2" />
        </svg>
        <p className="whitespace-pre-wrap text-center">Payment successful!</p>
        <Link href={"/dashboard"}>
          <button className="rounded-md bg-emerald-700 px-4 py-2 text-center text-white">
            Back to dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default PaymentSuccess;

import Head from "next/head";
import Link from "next/link";
import React from "react";
import Navbar from "@/components/Navbar"

const PaymentFailed = () => {
  return (
    <>
      <Head>
        <title>Promptify.ai - Payment not completed</title>
        <meta
          name="description"
          content="Promptify.ai - GPT prompts marketplace - Successfully Subscribed"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar menu={false} />
      <div className="mt-24 flex flex-col items-center gap-y-6 px-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 1119.6 699"
          className="h-64 w-64"
        >
          <circle cx="292.6" cy="213" r="213" fill="#f2f2f2" />
          <path d="M0 51c0 78 49 140 109 140" fill="#2f2e41" />
          <path
            d="M109 191c0-78 54-141 121-141M39 58c0 74 31 133 70 133"
            fill="#047857"
          />
          <path d="M109 191c0-100 62-181 140-181" fill="#2f2e41" />
          <path
            d="M86 192s15 0 20-3 24-8 25-2 23 26 6 26-41-3-46-5-5-16-5-16Z"
            fill="#a8a8a8"
          />
          <path
            d="M137 211c-18 0-41-2-45-5-4-2-5-10-6-14s1 13 5 16 28 5 46 5c5 0 6-2 6-4-1 1-2 2-6 2Z"
            opacity=".2"
          />
          <ellipse cx="198.6" cy="424.5" rx="187" ry="25.4" fill="#3f3d56" />
          <ellipse cx="198.6" cy="424.5" rx="157" ry="21.4" opacity=".1" />
          <ellipse cx="836.6" cy="660.5" rx="283" ry="38.5" fill="#3f3d56" />
          <ellipse cx="310.6" cy="645.5" rx="170" ry="23.1" fill="#3f3d56" />
          <path
            d="M463 626c90 23 263-30 282-90M310 259s130-36 138 80-107 149-17 172M184 537s39-11 41 24-32 45-5 52"
            fill="none"
            stroke="#2f2e41"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="m779 563-8 51s-39 20-12 21h156s25 0-14-22l-8-53Z"
            fill="#2f2e41"
          />
          <path
            d="m754 634 17-11 8-50h114l8 49 18 12c5-1 10-5-18-21l-8-53-114 3-8 51s-33 17-17 20Z"
            opacity=".1"
          />
          <rect
            x="578.4"
            y="212.7"
            width="513.3"
            height="357.5"
            rx="18"
            fill="#2f2e41"
          />
          <path fill="#3f3d56" d="M596 232h478v268H596z" />
          <circle cx="835.1" cy="223.3" r="3" fill="#f2f2f2" />
          <path
            d="M1092 521v31a18 18 0 0 1-18 18H596a18 18 0 0 1-18-18v-31ZM969 667v7H643v-7l8-21h311l7 21zM1094 662c0 2-2 5-7 7-19 9-56-2-56-2s-28-5-28-18a23 23 0 0 1 2-1c8-4 33-14 78 0a19 19 0 0 1 9 6c2 2 3 5 2 8Z"
            fill="#2f2e41"
          />
          <path
            d="M1094 662c-22 8-42 9-62-5-10-8-20-9-27-9 8-4 33-14 78 0a19 19 0 0 1 9 6c2 2 3 5 2 8Z"
            opacity=".1"
          />
          <ellipse cx="1066.5" cy="654.1" rx="7.9" ry="2.4" fill="#f2f2f2" />
          <circle cx="835.1" cy="545.7" r="11.5" fill="#f2f2f2" />
          <path opacity=".1" d="M969 667v7H643v-7h326z" />
          <path fill="#2f2e41" d="M109 159h208v242H109z" />
          <path
            fill="#3f3d56"
            d="M88 135h250v86H88zM88 237h250v86H88zM88 339h250v86H88z"
          />
          <path fill="#047857" opacity=".4" d="M272 150h16v16h-16z" />
          <path fill="#047857" opacity=".8" d="M295 150h16v16h-16z" />
          <path fill="#047857" d="M318 150h16v16h-16z" />
          <path fill="#047857" opacity=".4" d="M272 251h16v16h-16z" />
          <path fill="#047857" opacity=".8" d="M295 251h16v16h-16z" />
          <path fill="#047857" d="M318 251h16v16h-16z" />
          <path fill="#047857" opacity=".4" d="M272 352h16v16h-16z" />
          <path fill="#047857" opacity=".8" d="M295 352h16v16h-16z" />
          <path fill="#047857" d="M318 352h16v16h-16z" />
          <circle cx="316.6" cy="538" r="79" fill="#2f2e41" />
          <path fill="#2f2e41" d="M281 600h24v43h-24zM329 600h24v43h-24z" />
          <ellipse cx="300.6" cy="643.5" rx="20" ry="7.5" fill="#2f2e41" />
          <ellipse cx="348.6" cy="642.5" rx="20" ry="7.5" fill="#2f2e41" />
          <circle cx="318.6" cy="518" r="27" fill="#fff" />
          <circle cx="318.6" cy="518" r="9" fill="#3f3d56" />
          <path
            d="M240 465c-6-29 14-58 46-65s62 10 68 39-14 39-46 46-62 8-68-20Z"
            fill="#047857"
          />
          <ellipse
            cx="417.2"
            cy="611.3"
            rx="39.5"
            ry="12.4"
            transform="rotate(-23 156 638)"
            fill="#2f2e41"
          />
          <ellipse
            cx="269.2"
            cy="664.3"
            rx="39.5"
            ry="12.4"
            transform="rotate(-23 8 691)"
            fill="#2f2e41"
          />
          <path
            d="M363 561c0 8-20 23-42 23s-43-14-43-22 21-6 43-6 42-3 42 5Z"
            fill="#fff"
          />
        </svg>
        <p className="text-center">
          Payment was not completed.
          <br />
          You have not been charged
        </p>
        <Link href={"/dashboard"}>
          <button className="rounded-md bg-emerald-700 px-4 py-2 text-center text-white">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default PaymentFailed;

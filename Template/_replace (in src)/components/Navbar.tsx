import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth } from "@/hooks/auth";
import ThemeToggle from "./ThemeToggle";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const Navbar = ({
  menu = true,
  login = true,
}: {
  menu?: boolean;
  login?: boolean;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-12 w-auto" src="/logo.png" alt="" />
          </Link>
        </div>

        {menu && (
          <>
            {" "}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <button className="sbtn text-sm">{item.name}</button>
                </Link>
              ))}
            </div>
          </>
        )}
        {login && !user && (
          <div className="hidden items-center lg:flex lg:flex-1 lg:justify-end">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <button className="sbtn">
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            </Link>
          </div>
        )}
        {user && (
          <Link
            href={"/dashboard"}
            className="hidden text-sm lg:flex lg:flex-1 lg:justify-end"
          >
            <div className="flex items-center gap-x-2 rounded-lg bg-gray-100 px-3 py-1 active:bg-gray-300">
              <p>{user.email}</p>
              <ArrowRightIcon className="h-3 w-3" />
            </div>
          </Link>
        )}
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-12 w-auto" src="/logo.png" alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {menu && (
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
              {login && !user && (
                <div className="py-6">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              )}
              {user && (
                <Link
                  href={"/dashboard"}
                  className="hidden text-sm lg:flex lg:flex-1 lg:justify-end"
                >
                  <div className="flex items-center gap-x-2 rounded-lg bg-gray-100 px-3 py-1 active:bg-gray-300">
                    <p>{user.email}</p>
                    <ArrowRightIcon className="h-3 w-3" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;

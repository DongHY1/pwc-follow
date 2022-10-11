import React, { useState } from 'react';
import Link from 'next/link';
import {
  AuthenticatedOnly,
  UnauthenticatedOnly,
  useAuth,
} from '../contexts/auth';
export const Navbar = () => {
  const [isHidden, setIsHidden] = useState(true);
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          <div className="mr-3 h-6 sm:h-9"></div>
          <Link href="/" passHref>
            <button className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Follow
            </button>
          </Link>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          onClick={() => setIsHidden(!isHidden)}
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${isHidden ? 'hidden' : ''} w-full md:block md:w-auto`}
        >
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <UnauthenticatedOnly>
              <>
                <li>
                  <Link href="/signup" passHref>
                    <button className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Sign Up
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/login" passHref>
                    <button className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                      Log In
                    </button>
                  </Link>
                </li>
              </>
            </UnauthenticatedOnly>
            <AuthenticatedOnly>
              <>
                <li>
                  <p className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">
                    {user?.name}
                  </p>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  >
                    Log out
                  </button>
                </li>
              </>
            </AuthenticatedOnly>
          </ul>
        </div>
      </div>
    </nav>
  );
};

import type { NextPage } from 'next';
import Link from 'next/link';
import { AuthenticatedOnly, UnauthenticatedOnly } from '../contexts/auth';
import MainLayout from '../layouts/MainLayout';
const Home: NextPage = () => {
  return (
    <MainLayout>
      <header>
        <div className="max-w-4xl mx-auto py-16 px-14 sm:px-6 lg:px-8">
          <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-8xl text-center leading-snug text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-gray-400">
            PWC FOLLOW APP
          </h1>
          <div className="max-w-l mx-auto">
            <p className="mt-20 text-gray-500 text-center text-xl lg:text-3xl ">
              Next.JS + Express + TRPC + Prisma ORM + PostgreSQL
            </p>
          </div>

          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Password requirements:
          </h2>
          <ul className="space-y-1 max-w-md list-inside text-gray-500 dark:text-gray-400">
            <li className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              At least 10 characters
            </li>
            <li className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              At least one lowercase character
            </li>
            <li className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              At least one special character, e.g., ! @ # ?
            </li>
          </ul>

          <div className="mt-20 flex justify-center items-center w-full mx-auto">
            <a
              href="https://github.com/DongHY1/pwc-follow"
              className="font-sans font-medium py-2 px-4 border rounded bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-700"
            >
              GitHub
            </a>
            <span className="mx-2">or</span>
            <UnauthenticatedOnly>
              <Link href="/signup" passHref>
                <button className="font-sans font-medium py-2 px-4 border rounded ">
                  Sign up
                </button>
              </Link>
            </UnauthenticatedOnly>
            <AuthenticatedOnly>
              <Link href="/profile" passHref>
                <button className="font-sans font-medium py-2 px-4 border rounded ">
                  Profile
                </button>
              </Link>
            </AuthenticatedOnly>
          </div>
        </div>
      </header>
    </MainLayout>
  );
};

export default Home;

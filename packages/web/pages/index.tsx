import type { NextPage } from 'next';
import Link from 'next/link';
import List from '../components/List';
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
            <p className="mt-5 text-gray-500 text-center text-xl lg:text-3xl ">
              Next.JS + Express + TRPC + Prisma ORM + PostgreSQL
            </p>
          </div>

          <ul className="mt-10 space-y-1 max-w-md list-inside text-gray-500 dark:text-gray-400">
            <List text="🧙‍♂️ E2E Typesafety with tRPC" />
            <List text="🔐 E2E testing with Cypress" />
            <List text="🛠 FullStack React with Next.js " />
            <List text="📚 Database with Prisma & PostgreSQL" />
            <List text="⚡ CI/CD setup using GitHub Actions" />
            <List text="🚢 Docker It !" />
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

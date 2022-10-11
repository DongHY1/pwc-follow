import type { NextPage } from 'next';
import Link from 'next/link';
import Button from '../components/Button';
import { AuthenticatedOnly, UnauthenticatedOnly } from '../contexts/auth';
import MainLayout, { Card } from '../layouts/MainLayout';
const Home: NextPage = () => {
  return (
    <MainLayout>
      <Card>
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
        {/* <>
          <div className="text-8xl font-extrabold text-center mb-10">
            PWC{' '}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-red-600"
              id="main"
            >
              Follow
            </span>{' '}
            App
          </div>
          <p className="mb-20 tracking-widest text-gray-400 text-2xl text-center">
            Next.JS + Express + TRPC + Prisma ORM + PostgreSQL
          </p>
          <div className="flex justify-center">
            <a
              href="https://github.com/DongHY1/pwc-follow"
              className="py-5 px-40 border border-red-300 transition-all rounded-lg tracking-wider mr-10 "
            >
              GitHub
            </a>
            <UnauthenticatedOnly>
              <Link href="/signup" passHref>
                <button className="py-5 px-40 border bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transition-all rounded-lg text-white tracking-wider ">
                  Sign up
                </button>
              </Link>
            </UnauthenticatedOnly>
            <AuthenticatedOnly>
              <Link href="/profile" passHref>
                <button className="py-5 px-40 border bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transition-all rounded-lg text-white tracking-wider ">
                  Profile
                </button>
              </Link>
            </AuthenticatedOnly>
          </div>
        </> */}
      </Card>
    </MainLayout>
  );
};

export default Home;

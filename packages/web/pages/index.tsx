import type { NextPage } from 'next';
import Link from 'next/link';
import { AuthenticatedOnly, UnauthenticatedOnly } from '../contexts/auth';
import MainLayout, { Card } from '../layouts/MainLayout';
const Home: NextPage = () => {
  return (
    <MainLayout>
      <Card>
        <>
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
            Next.JS + TRPC + Prisma ORM + PostgreSQL
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
        </>
      </Card>
    </MainLayout>
  );
};

export default Home;

import MainLayout, { Card } from '../layouts/MainLayout';

import type { NextPage } from 'next';
const Follow: NextPage = () => {
  return (
    <MainLayout>
      <Card>
        <>
          <h1 className="font-black text-3xl mb-10">My Todos</h1>
          <div className="max-w-xl"></div>

          <div className="max-w-sm"></div>
        </>
      </Card>
    </MainLayout>
  );
};

export default Follow;

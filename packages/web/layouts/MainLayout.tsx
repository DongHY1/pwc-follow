import React from 'react';

import { Navbar } from '../components/Navbar';

const MainLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;

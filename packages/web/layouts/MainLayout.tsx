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

export const Card = ({
  children,
  className,
  ...props
}: {
  children: JSX.Element;
  className?: string;
}) => {
  return <div {...props}>{children}</div>;
};

export default MainLayout;

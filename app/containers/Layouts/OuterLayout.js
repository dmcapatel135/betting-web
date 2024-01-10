import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '@components';
import Sidebar from '@components/Sidebar';

const OuterLayout = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 ">
        <div className="md:col-span-2 md:block hidden">
          <Sidebar />{' '}
        </div>
        <div className="md:col-span-10 col-span-full bg-white">
          {' '}
          <Outlet />{' '}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OuterLayout;

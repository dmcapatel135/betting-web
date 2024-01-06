import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  // CompanyContact,
  // CustomerCareContact,
  Footer,
  Navbar,
} from '@components';
import Sidebar from '@components/Sidebar';
// import BetWallet from '@components/BetWallet';

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
        {/* <div className="md:col-span-3 col-span-full">
          <div className="bg-white border-l-[1px] h-full py-2 md:p-2 border-[#A3A3A3]">
            <img
              src="/images/bikoicon/appimg.png"
              alt="app"
              className="md:p-2"
            />
            <img
              src="/images/bikoicon/hello.png"
              alt="app"
              className="md:p-2"
            />
            <BetWallet />
            <CompanyContact />
            <CustomerCareContact />
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default OuterLayout;

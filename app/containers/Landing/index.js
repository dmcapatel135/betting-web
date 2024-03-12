import React, { useEffect } from 'react';

import { RightSideSection } from '@components';
// import Tabs from '@components/Tabs';
import { isLoggedIn } from '@utils/apiHandlers';
import { useNavigate } from 'react-router-dom';
import SportsMenu from '@components/SportsMenu';

// const tabsName = [
//   { id: 1, tabName: 'STRONG MATCH' },
//   { id: 2, tabName: 'TODAYs MATCHES' },
//   { id: 3, tabName: 'UPCOMING MATCHES' },
//   { id: 4, tabName: 'LIVE NOW' },
// ];

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/dashboard');
    }
  });

  return (
    <main className="md:pl-5  md:py-2">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8">
          <SportsMenu />
        </div>
        <div className="col-span-4 md:block hidden">
          <RightSideSection />
        </div>
      </div>
    </main>
  );
};

export default Landing;

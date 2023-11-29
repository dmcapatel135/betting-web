import React from 'react';
import DashboardTemplate from '../../components/DashboardTemplate/DashboardTemplate';
import Wallet from './Wallet';
import AccountChange from './AccountChange';
import RatingSlider from './RatingSlider';
import PortfolioOverviewChart from './PortfolioOverviewChart';
import WalletAccountChart from './WalletAccountChart';
import VaultAccountChart from './VaultAccountChart';
import Watchlist from './Watchlist';
import AccountActivity from './AccountActivity';
import News from './News';

function Dashboard() {
  return (
    <DashboardTemplate active="Dashboard">
      <div className="p-5">
        <div className="grid grid-cols-12">
          <div className="col-span-6 lg:col-span-3">
            <Wallet />
          </div>
          <div className="col-span-6 lg:col-span-3">
            <AccountChange />
          </div>
          <div className="col-span-full lg:col-span-6 mt-5 lg:mt-0">
            <RatingSlider />
          </div>
          <div className="col-span-full my-5 xl:mr-3 xl:col-span-6">
            <PortfolioOverviewChart />
          </div>
          <div className="col-span-full lg:col-span-6 lg:mr-1 my-5 xl:col-span-3">
            <WalletAccountChart />
          </div>
          <div className="col-span-full lg:ml-1 my-5 lg:col-span-6 xl:col-span-3">
            <VaultAccountChart />
          </div>
          <div className="col-span-full mb-5  mr-0 lg:mr-3 lg:col-span-5">
            <Watchlist />
          </div>
          <div className="col-span-full mb-5 mr-0 lg:mr-1  lg:col-span-3">
            <AccountActivity />
          </div>
          <div className="col-span-full mb-5  lg:ml-1  lg:col-span-4">
            <News />
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}

export default Dashboard;

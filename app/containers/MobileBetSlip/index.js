import {
  CompanyContact,
  CustomerCareContact,
  SportsMenu,
  TalkToUs,
} from '@components';
import BetWallet from '@components/BetWallet';
import React from 'react';

function MobileBetSlip() {
  return (
    <>
      <div className="hidden lg:block">
        <SportsMenu />
      </div>
      <div className="lg:hidden">
        <BetWallet />
        <CompanyContact />
        <CustomerCareContact />
        <TalkToUs />
      </div>
    </>
  );
}

export default MobileBetSlip;

import {
  Betslip,
  CompanyContact,
  CustomerCareContact,
  SportsMenu,
  TalkToUs,
} from '@components';
import BetWallet from '@components/BetWallet';
import React from 'react';
import { useSelector } from 'react-redux';

function MobileBetSlip() {
  const selectedBet = useSelector((state) => state.bet.selectedBet);

  return (
    <main className="md:pl-5">
      <div className="grid grid-cols-12">
        <div className="hidden md:block md:col-span-8">
          <SportsMenu />
        </div>
        <div className="md:col-span-4 col-span-12 p-3">
          {selectedBet.length > 0 ? <BetWallet /> : <Betslip />}
          <CompanyContact />
          <CustomerCareContact />
          <TalkToUs />
        </div>
      </div>
    </main>
  );
}

export default MobileBetSlip;

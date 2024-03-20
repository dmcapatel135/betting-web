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
    <>
      <div className="hidden lg:block">
        <SportsMenu />
      </div>
      <div className="lg:hidden">
        {selectedBet.length > 0 ? <BetWallet /> : <Betslip />}
        <CompanyContact />
        <CustomerCareContact />
        <TalkToUs />
      </div>
    </>
  );
}

export default MobileBetSlip;

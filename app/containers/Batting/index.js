import {
  // BetCard,
  BetWallet,
  Betslip,
  // Betslip,
  CompanyContact,
  CustomerCareContact,
  TalkToUs,
} from '@components';
import SportsMenu from '@components/SportsMenu';

import React from 'react';
import { useSelector } from 'react-redux';

function Batting() {
  const selectedBet = useSelector((state) => state.bet.selectedBet);

  return (
    <main className="md:pl-5">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <SportsMenu />
        </div>
        <div className="col-span-4 mr-3 ml-1 md:block hidden border-l-[1px] border-[#A3A3A3] pt-5 h-full pl-3">
          {selectedBet.length > 0 ? <BetWallet /> : <Betslip />}

          <CompanyContact />
          <CustomerCareContact />
          <TalkToUs />
        </div>
      </div>
    </main>
  );
}

export default Batting;

import {
  // BetCard,
  BetWallet,
  Betslip,
  // Betslip,
  CompanyContact,
  CustomerCareContact,
  TalkToUs,
} from '@components';
import { MyContext } from '@components/MyContext/MyContext';
import SportsMenu from '@components/SportsMenu';

import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

function Batting() {
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const { tab } = useContext(MyContext);

  return (
    <main className="md:pl-5">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <SportsMenu />
        </div>
        <div
          className={`${
            tab == 7 ? 'col-span-12  mb-5' : 'hidden md:block md:col-span-4'
          } mr-3 ml-1 border-l-[1px] border-[#A3A3A3] pt-5 h-full pl-3`}
        >
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

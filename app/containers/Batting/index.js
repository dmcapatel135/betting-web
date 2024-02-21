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
  const { menuName, tab } = useContext(MyContext);

  console.log('---batting page --menu Name ', menuName, tab);

  return (
    <main className="md:pl-5">
      <div className="grid grid-cols-12">
        {menuName == 'HOME' && (
          <div className="col-span-12 md:col-span-8">
            <SportsMenu />
          </div>
        )}
        {menuName == 'SLIP' && (
          <div
            className={`${
              menuName == 'SLIP' ? 'col-span-12 mb-3' : 'col-span-4'
            } mr-3 ml-1 border-l-[1px] border-[#A3A3A3] pt-5 h-full pl-3`}
          >
            {selectedBet.length > 0 ? <BetWallet /> : <Betslip />}
            <CompanyContact />
            <CustomerCareContact />
            <TalkToUs />
          </div>
        )}
      </div>
    </main>
  );
}

export default Batting;

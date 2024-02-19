import { BetWallet, CompanyContact, CustomerCareContact } from '@components';
import React from 'react';
import { useSelector } from 'react-redux';

function RightSideSection() {
  const selectedBet = useSelector((state) => state.bet.selectedBet);

  return (
    <div className="md:col-span-3 col-span-full">
      <div className="bg-white border-l-[1px] h-full py-2 md:p-2 border-[#A3A3A3]">
        {selectedBet?.length === 0 ? (
          <div>
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
          </div>
        ) : (
          <>
            <BetWallet />
            <CompanyContact />
            <CustomerCareContact />
          </>
        )}
      </div>
    </div>
  );
}

export default RightSideSection;

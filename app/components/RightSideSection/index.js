import { BetWallet, CompanyContact, CustomerCareContact } from '@components';
import { images } from '@utils/images';
import React from 'react';
import { useSelector } from 'react-redux';

function RightSideSection() {
  const selectedBet = useSelector((state) => state.bet.selectedBet);

  return (
    <div className="">
      <div className="h-full">
        {selectedBet?.length === 0 ? (
          <div>
            <img src={images.AppImg} alt="app" className="md:p-2" />
            <img src={images.contactImg} alt="app" className="md:p-2" />
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

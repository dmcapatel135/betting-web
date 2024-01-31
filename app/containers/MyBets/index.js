import React, { useState } from 'react';

import {
  BetDetailCard,
  // BetWallet,
  Betslip,
  CompanyContact,
  CustomerCareContact,
  TalkToUs,
} from '@components';
import ShareBetModal from '@components/ShareBetModal.js';

const TabsName = [
  { tabName: 'All', id: 1, icon: '/images/bikoicon/sports_soccer.png' },
  {
    tabName: 'Pending',
    id: 2,
    icon: '/images/bikoicon/sports_and_outdoors.png',
  },
  { tabName: 'Settled', id: 3, icon: '/images/bikoicon/boxing.png' },
  { tabName: 'Jackpot', id: 4, icon: '/images/bikoicon/rugby.png' },
  //   { tabName: 'Cricket', id: 5, icon: '/images/bikoicon/cricket.png' },
  //   { tabName: 'Other', id: 6, icon: '/images/bikoicon/other.png' },
];

function MyBets() {
  const [step, setStep] = useState(1);
  return (
    <div className="grid grid-cols-12 h-full">
      <ShareBetModal />
      <div className="col-span-12 md:col-span-8">
        <div className="md:p-5 p-2">
          <div className="md:block hidden">
            <img src="/images/bikoicon/main.png" alt="main" />
          </div>
          <div>
            <div className="border-[1px]  mt-5 border-blue px-1 md:px-0 flex bg-white w-full rounded-lg cursor-pointer  md:h-12 xxl:h-16">
              {TabsName.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`${
                      step === item.id
                        ? 'bg-gradient-color-1 text-white'
                        : 'bg-white text-black'
                    } px-1 md:px-0 xl:px-3 mx-3 my-1 w-fit md:w-28  rounded-lg`}
                    onClick={() => setStep(item.id)}
                  >
                    <div className="flex  h-10  md:justify-center items-center">
                      {/* <img src={item.icon} alt="profile_icon" /> */}
                      <span className="px-2 text-14 font-[700]  xxl:text-16">
                        {item.tabName}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="my-5 text-black">
              <BetDetailCard />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4  pt-5 md:block hidden h-full border-[#A3A3A3] border-l-[1px] pl-3">
        {/* <RightSideSection /> */}
        {/* <BetWallet /> */}
        <Betslip wallet="true" />
        <CompanyContact />
        <CustomerCareContact />
        <TalkToUs />
      </div>
    </div>
  );
}

export default MyBets;

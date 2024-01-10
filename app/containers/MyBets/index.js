import React, { useState } from 'react';

import {
  BetDetailCard,
  Betslip,
  CompanyContact,
  CustomerCareContact,
  TalkToUs,
} from '@components';

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
    <div className="grid grid-cols-12">
      <div className="col-span-8">
        <div className="p-5">
          <div className="">
            <img src="/images/bikoicon/main.png" alt="main" />
          </div>
          <div>
            <div className="border-[1px] mt-5 border-blue px-5 md:px-0 md:flex bg-white w-full rounded-lg cursor-pointer  md:h-12 xxl:h-16">
              {TabsName.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`${
                      step === item.id
                        ? 'bg-gradient-color-1 text-white'
                        : 'bg-white text-black'
                    } px-1 xl:px-3 md:mx-3 my-1 w-full md:w-28 rounded-lg`}
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
      <div className="col-span-4 mt-3">
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

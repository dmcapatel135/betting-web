import React, { useEffect, useState } from 'react';

import {
  BetDetailCard,
  // BetWallet,
  Betslip,
  CompanyContact,
  CustomerCareContact,
  TalkToUs,
} from '@components';
import ShareBetModal from '@components/ShareBetModal.js';
import { getReq } from '@utils/apiHandlers';

const TabsName = [
  { tabName: 'All', id: 1, icon: '/images/bikoicon/sports_soccer.png' },
  {
    tabName: 'Pending',
    id: 2,
    icon: '/images/bikoicon/sports_and_outdoors.png',
  },
  { tabName: 'Settled', id: 3, icon: '/images/bikoicon/boxing.png' },
  // { tabName: 'Jackpot', id: 4, icon: '/images/bikoicon/rugby.png' },
  //   { tabName: 'Cricket', id: 5, icon: '/images/bikoicon/cricket.png' },
  //   { tabName: 'Other', id: 6, icon: '/images/bikoicon/other.png' },
];

function MyBets() {
  const [step, setStep] = useState(1);
  const [myBets, setMyBets] = useState([]);

  const getMyBetDetails = async (status) => {
    console.log('-----status ', status);
    const response = await getReq(
      `/users/me/bet-slips/${status ? status : ''}`,
    );
    console.log('-----respon ', response);
    setMyBets(response.data.data);
  };

  useEffect(() => {
    if (step.id === 1) getMyBetDetails('');
    else if (step.id === 2) {
      getMyBetDetails('Pending');
    } else if (step.id === 3) {
      getMyBetDetails('Settled');
    }
  }, [step]);

  useEffect(() => {
    // if (myBets.length > 0) {
    //   const totalEventId = myBets.reduce((accumulator, item) => {
    //     const betsOddsProduct = item.bets.reduce((product, bet) => {
    //       return product * parseFloat(bet.odds);
    //     }, 1);
    //     return accumulator + betsOddsProduct * item.id;
    //   }, 0);
    //   setBetSlip(totalEventId);
    // }
  }, [myBets]);

  console.log('-----bet slip');

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
                    onClick={() => {
                      setStep(item.id);
                      // setStatus(item.tabName);
                    }}
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
              {myBets.length > 0 &&
                myBets.map((item, index) => {
                  return (
                    <div key={index} className="my-2">
                      <BetDetailCard item={item} />
                    </div>
                  );
                })}
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

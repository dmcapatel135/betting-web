import {
  Betslip,
  CompanyContact,
  CustomerCareContact,
  JackpotCard,
  JackpotDailyCard,
  JackpotDetailCard,
  TalkToUs,
} from '@components';
import BetWallet from '@components/BetWallet';
import JackpotResultCard from '@components/JackpotResultCard';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
const TabsName = [
  {
    id: 1,
    name: 'All Jackpot',
    icon: '/images/bikoicon/other.png',
    active_icon: '/images/bikoicon/sports_soccer.png',
  },
  {
    id: 2,
    name: 'Results',
    icon: '/images/bikoicon/sports_and_outdoors.png',
    active_icon: '/images/bikoicon/basketballwhite.png',
  },
  {
    id: 3,
    name: 'Rules',
    icon: '/images/bikoicon/boxing.png',
    active_icon: '/images/bikoicon/boxingwhite.png',
  },
];

function Jackpot() {
  const [step, setStep] = useState(TabsName[0].id);
  const [openCard, setOpenCard] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-8 pt-5">
        <div className="px-5">
          <div className="border-[1px] border-bluewhale px-5 md:px-0 md:flex bg-white w-full rounded-lg cursor-pointer  md:h-14 xxl:h-16">
            {TabsName?.map((item) => {
              return (
                <div
                  key={item.id}
                  className={`${
                    step === item.id
                      ? 'bg-gradient-color-1 text-white'
                      : 'bg-white text-black'
                  } px-1 xl:px-3 md:mx-3 my-1 w-full md:w-full flex-1 rounded-lg`}
                  onClick={() => {
                    setStep(item.id);
                  }}
                >
                  <div className="flex  h-12  md:justify-center items-center">
                    {/* <img
                      src={step === item.id ? item.active_icon : item.icon}
                      alt="profile_icon"
                      className="w-6 h-6"
                    /> */}
                    <span className="px-2 text-14  xxl:text-16">
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {step === 1 && (
          <div className="px-5">
            <div className="my-3">
              <JackpotCard setOpenCard={setOpenCard} />
            </div>
            <div>
              <JackpotDailyCard />
            </div>
            {openCard && (
              <>
                <div className="flex text-black justify-end mr-10 mt-5">
                  <p className="mr-4 text-14 font-[600]">Home</p>
                  <p className="ml-8 mr-12 text-14 font-[600]">Draw</p>
                  <p className="text-14  font-[600]">Away</p>
                </div>
                <div>
                  <JackpotDetailCard />
                </div>
              </>
            )}
          </div>
        )}
        {step === 2 && (
          <div className="px-5 my-5">
            {/* <div className="border-[1px] border-blue rounded-md bg-gray-800 text-center justify-center py-3">
              <h1 className="text-black text-20 font-[600]">
                WEEKLY JACKPOT 21 JAN 2024
              </h1>
              <p className="text-12 text-black font-[500] py-2">17 GAMES</p>
              <h1 className="text-blue text-20 font-[600]">TSH 1,000</h1>
            </div> */}
            <JackpotResultCard
              setOpenResult={setOpenResult}
              openResult={openResult}
            />
            {openResult && (
              <div className="my-2">
                <div className="bg-white border-[1px] rounded-md border-lightgray border-md px-3">
                  <div className="flex justify-between py-2">
                    <div className=" flex-1 text-black">
                      <p className="text-12 mb-5">11:15 pm Wed 06/12</p>
                      <span className="text-10 mt-20 text-gray-900">
                        Football/England/Premier League
                      </span>
                    </div>
                    <div className="flex-1 text-14 font-[500] text-center text-black">
                      <p>Manchester United </p>
                      <p>Chelsa FC</p>
                    </div>
                    <div className="flex-1  mr-5 flex justify-end items-center">
                      <p className="text-black text-12 font-[600]">
                        Frosinone Calcio- (3:1)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {step === 3 && (
          <div className="px-5 my-5">
            <div className="border-[1px] border-blue rounded-md h-28 bg-gray-800 text-center justify-center py-3">
              <h1 className="text-black text-20 font-[600]">
                You&apos;ll be notified of any changes in the rules
              </h1>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 pt-5 border-l-[1px] px-3 border-[#A3A3A3]">
        {selectedBet.length > 0 ? <BetWallet /> : <Betslip />}
        <CompanyContact />
        <CustomerCareContact />
        <TalkToUs />
      </div>
    </div>
  );
}

export default Jackpot;

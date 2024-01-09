import { BetCard, BetWallet } from '@components';
import Tabs from '@components/Tabs';
import React, { useState } from 'react';

const tabsName = [
  { id: 1, tabName: 'MECHI KALI' },
  { id: 2, tabName: 'MECHI ZA LEO' },
  { id: 3, tabName: 'MECHI ZIJAZO' },
  { id: 4, tabName: 'LIVE NOW' },
];

function Batting() {
  const [step, setStep] = useState(1);
  const [tab, setTab] = useState(1);
  return (
    <main className="md:pl-5  md:py-2">
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <div className="md:block hidden pr-2">
            <Tabs step={step} setStep={setStep} />
          </div>
          <div className="my-0 md:my-2  mr-2 bg-gradient-color-1 rounded-b-[8px]">
            <img src="/images/bikoicon/main.png" />

            <div className="mt-5  hidden md:flex justify-evenly px-5">
              {tabsName.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`${
                      tab === item.id
                        ? 'text-white border-b-[3px] border-yellow w-28 text-center'
                        : 'text-white'
                    } mx-3`}
                    onClick={() => setTab(item.id)}
                  >
                    <span className="text-14 sm:text-12 cursor-pointer lg:text-14">
                      {item.tabName}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="px-3">
              <select className="w-full my-2 custom-select-drop font-[600] text-14 text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]">
                <option>Top Leagues & Countries</option>
              </select>
              <div className="flex">
                <div className="flex-1 pr-2">
                  <select className="w-full my-2 custom-select-drop text-14 font-[600] text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]">
                    <option>Today&apos;s</option>
                  </select>
                </div>
                <div className="flex-1 pr-2">
                  <select className="w-full my-2 custom-select-drop text-14 font-[600] text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]">
                    <option>Market</option>
                  </select>
                </div>
                <div className="flex-1">
                  <select className="w-full my-2 custom-select-drop text-14 font-[600] text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]">
                    <option>Soccer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="h-20 flex justify-around items-center text-black">
            <div className="h-8 flex items-center text-12 bg-yellow text-white px-3 rounded-[4px] text-center">
              <p>MONDAY, DECEMBER 11TH 2023</p>
            </div>
            <div className="text-center">
              <h1 className="text-12 font-[700] md:block hidden mb-2">3 WAY</h1>
              <div className="flex justify-between  w-32 text-12 text-[#3D3D3D]">
                <div className="border-[1px] flex justify-center items-center h-[32px] md:h-6 w-10 border-[#A3A3A3] rounded-[4px] cursor-pointer ">
                  <strong className="text-gray-900">1</strong>
                </div>
                <div className="border-[1px] flex justify-center items-center h-[32px] md:h-6 w-10 border-[#A3A3A3] rounded-[4px] cursor-pointer">
                  <strong className="text-gray-900">X</strong>
                </div>
                <div className="border-[1px] flex justify-center items-center h-[32px]  md:h-6 w-10 border-[#A3A3A3] rounded-[4px] cursor-pointer ">
                  <strong className="text-gray-900">2</strong>
                </div>
              </div>
            </div>
            <div className="text-center hidden md:block">
              <h1 className="text-12 font-[700] mb-2">OVER/UNDER 2.5</h1>
              <div className="flex justify-between w-28 text-12 ">
                <button className="border-[1px] h-6 w-12 text-12  text-gray-900 border-[#A3A3A3] rounded-[4px] cursor-pointer ">
                  OVER
                </button>
                <button className="border-[1px] h-6 w-12 text-12 text-gray-900 border-[#A3A3A3] rounded-[4px] cursor-pointer ">
                  UNDER
                </button>
              </div>
            </div>
            <div className="text-center md:block hidden">
              <h1 className="text-12 font-[700] mb-2">BOTH TEAMS TO SCORE</h1>
              <div className="flex justify-between w-28 text-12 ">
                <button className="border-[1px] h-6 w-12 text-10 text-gray-900 border-[#A3A3A3] rounded-[4px] cursor-pointer">
                  YES
                </button>
                <button className="border-[1px] h-6 w-12 text-10 text-gray-900 border-[#A3A3A3] rounded-[4px] cursor-pointer ">
                  NO
                </button>
              </div>
            </div>
          </div>
          <div className="px-3">
            <BetCard />
          </div>
        </div>
        <div className="col-span-4">
          {/* <RightSideSection /> */}
          <BetWallet />
        </div>
      </div>
    </main>
  );
}

export default Batting;

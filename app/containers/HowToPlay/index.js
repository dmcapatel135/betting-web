import {
  Betslip,
  CompanyContact,
  CustomerCareContact,
  TalkToUs,
} from '@components';
import React from 'react';

function HowToPlay() {
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-12 lg:col-span-8 pl-2">
        <div className="shadow-md h-40">
          <div className="bg-yellow  w-full text-center my-2 py-2">
            <h1 className="text-white font-[500]">Help</h1>
          </div>
          <div className="text-black px-3 my-3">
            <h1 className="text-16 font-[500]">Frequently Asked Questions</h1>
          </div>
          <div className="bg-gradient-color-4 p-2">
            <h1>How do i Register for Bikosports ?</h1>
          </div>
          {/* <p className="text-black">ans</p> */}
        </div>
      </div>
      <div className="col-span-4 pt-5 pl-3 ml-1 mr-3 lg:block hidden border-[#A3A3A3] border-l-[1px] h-full">
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

export default HowToPlay;

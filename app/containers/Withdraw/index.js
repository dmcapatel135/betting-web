import { HeroSection, MobileInputField } from '@components';
import React from 'react';

function Withdraw() {
  return (
    <div className="">
      <HeroSection />
      <div className="my-3 px-3 md:px-0 ">
        <div
          className="rounded-lg border  border-purple-300 bg-purple-100 shadow-lg"
          style={{
            boxShadow: '0px 0px 69.3px 0px rgba(118, 32, 243, 0.29)',
          }}
        >
          <div className="bg-blue text-center rounded-t-lg">
            <h1 className="text-14 md:text-16 py-2 font-[700]">
              WITHDRAW FUNDS (MOBILE MONEY)
            </h1>
          </div>
          <div className="px-5 my-5">
            <div>
              <label className="text-black text-14">Your Mobile Number</label>
              <MobileInputField selectValue={'+255'} />
            </div>
            <div className="my-2">
              <label className="text-black text-14">Amount to Withdraw</label>
              <input
                type="text"
                placeholder="Enter Amount"
                className="border-[1px] border-yellow w-full text-gray-900 text-14 outline-none h-10 rounded-lg px-3"
              />
            </div>
            <div>
              <button className="w-full bg-yellow h-10 font-[700] text-14 rounded-lg">
                Withdrawal
              </button>
            </div>
          </div>
          <hr className="border-t  border-purple-300"></hr>
          <div className="px-5 my-5 text-black">
            <h1 className="text-16 md:text-20 font-[500]">
              WITHDRAWAL INSTRUCTIONS
            </h1>
            <ol className="text-12 pt-2">
              <li>1. Enter the amount you want to withdraw</li>
              <li>2. Click on the Withdraw button.</li>
              <li>3. Check your phone for a Confirmation.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
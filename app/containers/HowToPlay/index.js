import { BettingInfoCard, InfoCard } from '@components';
import React from 'react';

function HowToPlay() {
  return (
    <div className=" ">
      <div className="bg-green  w-full text-center my-2 py-2">
        <h1 className="text-white font-[500] py-2 text-16">HOW TO PLAY</h1>
      </div>
      {/* <div className="text-black px-3 my-3">
        <h1 className="text-16 font-[500]">Frequently Asked Questions</h1>
      </div> */}
      <div className="bg-green p-2 flex items-center">
        <h1 className="font-[600]">HOW TO SAVE MONEY</h1>
        <img src="/images/bikoicon/mpesa+voda.png" className="ml-3 mr-1 h-8" />
        {/* <img src="/images/bikoicon/mpesa2.png" className="h-8" /> */}
      </div>
      <div className="my-5 mx-5">
        <div className="grid grid-cols-12">
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard text="*150*00#" note="Click *150*00#" />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="4.Pay to MPESA"
              bgColor="bg-blue"
              note="Select 4 Pay by MPESA"
            />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="101010"
              note="Select 4 Enter the company/business number: 101010"
            />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="XXXXXX"
              note="Enter your Account Number (phone number)  Receipt (if you pay without an account)  "
            />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="XX,XXX/="
              note="Enter the amount: XX,XXX/= , and the password to finish "
            />
          </div>
        </div>
      </div>
      <div className="bg-green p-2 flex items-center">
        <h1 className="font-[600]">HOW TO SAVE MONEY</h1>
        <img src="/images/bikoicon/tigopesa.png" className="ml-3 mr-1 h-8" />
      </div>
      <div className="my-5 mx-5">
        <div className="grid grid-cols-12">
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard text="*150*01#" note="Click *150*01#" />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="1.4.Pay with TIGOPESA"
              bgColor="bg-green"
              note="Select 4 Pay with TIGOPESA"
            />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="101010"
              note="Select 3 Enter the company/business number: 101010"
            />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="XXXXXX"
              note="Enter your Account Number (phone number)  Receipt (if you pay without an account)  "
            />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="XX,XXX/="
              note="Enter the amount: XX,XXX/= , and the password to finish "
            />
          </div>
        </div>
      </div>
      <div className="bg-green p-2 flex items-center">
        <h1 className="font-[600]">HOW TO SAVE MONEY</h1>
        <img src="/images/bikoicon/airtel.png" className="ml-3 mr-1 h-8" />
        <img src="/images/bikoicon/money.png" className="h-8" />
      </div>
      <div className="my-5 mx-5">
        <div className="grid grid-cols-12">
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard text="*150*60#" note="Click *150*60#" />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="1.5.Pay with Airtel Money"
              bgColor="bg-blue"
              note="Select 4 Pay with TIGOPESA"
            />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="101010"
              note="Select 3 Enter the company/business number: 101010"
            />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="XXXXXX"
              note="Enter your Account Number (phone number)  Receipt (if you pay without an account)  "
            />
          </div>
          <div className="col-span-6  md:col-span-4 2xl:col-span-3  mr-4">
            <InfoCard
              text="XX,XXX/="
              note="Enter the amount: XX,XXX/= , and the password to finish "
            />
          </div>
        </div>
      </div>
      <div className="bg-green p-2 flex items-center">
        <h1 className="font-[600]">Betting With Wallet (Website)</h1>
        {/* <img src="/images/bikoicon/airtelmoney.png" className="ml-3 mr-1 h-8" /> */}
        {/* <img src="/images/bikoicon/mpesa2.png" className="h-8" /> */}
      </div>
      <div className="my-5 mx-5">
        <div className="grid grid-cols-12">
          <div className="col-span-12  md:col-span-6 2xl:col-span-3  mr-4">
            <BettingInfoCard
              text="www.bikosports.co.tz"
              note="Click *150*60#"
              only={true}
            />
          </div>
          <div className="col-span-12  md:col-span-6 2xl:col-span-3  mr-4">
            <BettingInfoCard
              // text="1.4.Pay with TIGOPESA"
              // bgColor="bg-blue"
              market={true}
              note="Choose the match you want to place odds for example Manchester United vs Arsenal then click on the relevant number"
            />
          </div>
          <div className="col-span-12  md:col-span-6 2xl:col-span-3  mr-4">
            <BettingInfoCard
              // text="101010"
              note="Select the amount of money you want to bet."
              odds={true}
            />
          </div>
          <div className="col-span-12  md:col-span-6 2xl:col-span-3  mr-4">
            <BettingInfoCard
              // text="XXXXXX"
              note="Choose your phone network you will use to pay without forgetting your phone number and then click "
              slip={true}
            />
          </div>
          <div className="col-span-12  md:col-span-6 2xl:col-span-3  mr-4">
            <BettingInfoCard
              text="Your bet is complete, ticket number/ memory number is 182263, your selected matches are 3 the amount you bet is TZS 2000.00, your wining , ticket number/memory"
              note="Use the receipt number on the bet ticket as a reference. Dial *150*00# (M- pesa) to pay for the bet ticket using the Biko Sports business number101010."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;

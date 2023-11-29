import React from 'react';
import InputField from '../../components/InputField/InputField';
import ActionButton from '../../components/ActionButton/ActionButton';

function CoinSection() {
  return (
    <div className="bg-white py-12  px-6 md:px-10">
      <div className="grid grid-cols-2">
        <div className="flex  md:px-8 justify-center items-center col-span-full lg:col-span-1 text-black">
          <div>
            <h1 className="sm:text-[24px] md:text-[30px] xl:text-[32px] text-bluewhale font-extrabold">
              Trade smarter, not harder.
            </h1>
            <h1 className="sm:text-[24px] md:text-[30px] xl:text-[32px] py-2 text-bluewhale font-extrabold">
              Join us for crypto success !
            </h1>
            <div className="flex py-3">
              <InputField
                inpClass="h:8 md:h-10 border-bluewhale px-2 border-2 md:w-[270px] xl:w-[300px] rounded-lg text-12"
                placeholder="Enter the Phone No/ Email"
              />
              <ActionButton
                btnClass="bg-green text-12 md:text-16 h-7 md:h-10 text-white border-white rounded-lg px-1  md:px-3 md:py-2 ml-1 md:ml-5"
                btnName="Get Started"
              />
            </div>
          </div>
        </div>
        <div className="text-black w-[330px] col-span-full lg:col-span-1 md:w-full">
          <div className="flex py-2 justify-between">
            <div className="flex">
              <img src="/" alt="icon" />
              <h1 className="font-bold px-2">BTC</h1>
              <span className="text-12">Bitcoin</span>
            </div>
            <div>$37,152.43</div>
            <div className="text-green">+2.47%</div>
          </div>
          <div className="flex py-2 justify-between">
            <div className="flex">
              <img src="/" alt="icon" />
              <h1 className="font-bold px-2">BTC</h1>
              <span className="text-12">Bitcoin</span>
            </div>
            <div>$37,152.43</div>
            <div className="text-green">+2.47%</div>
          </div>
          <div className="flex py-2 justify-between">
            <div className="flex">
              <img src="/" alt="icon" />
              <h1 className="font-bold px-2">BTC</h1>
              <span className="text-12">Bitcoin</span>
            </div>
            <div>$37,152.43</div>
            <div className="text-green">+2.47%</div>
          </div>
          <div className="flex py-2 justify-between">
            <div className="flex">
              <img src="/" alt="icon" />
              <h1 className="font-bold px-2">BTC</h1>
              <span className="text-12">Bitcoin</span>
            </div>
            <div>$37,152.43</div>
            <div className="text-green">+2.47%</div>
          </div>
          <div className="flex py-2 justify-between">
            <div className="flex">
              <img src="/" alt="icon" />
              <h1 className="font-bold px-2">BTC</h1>
              <span className="text-12">Bitcoin</span>
            </div>
            <div>$37,152.43</div>
            <div className="text-green">+2.47%</div>
          </div>

          <span>View All 350+ coins</span>
        </div>
      </div>
    </div>
  );
}

export default CoinSection;

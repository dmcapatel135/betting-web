import React from 'react';

function Wallet() {
  return (
    <div className="bg-white py-3 mr-3 h-28 md:h-24 boxshadow-lg rounded-lg border-[1px] border-lightestgray relative ">
      <div className="px-5 block md:flex items-center h-full">
        <span className="h-20 md:h-16 w-2 border-l-8 rounded-br-md rounded-tr-md  absolute -left-[1px]  border-l-bluewhalelight"></span>
        <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full">
          <img src="/images/icons/wallet_img.png" alt="wallet" />
        </div>
        <div className="text-black md:text-end md:w-48 px-2">
          <span className="text-12 md:text-14 text-stormdust font-lg">
            Account Balance
          </span>
          <h1 className="text-16 md:text-24 font-extrabold text-bluewhalelight">
            $ 22.30
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Wallet;

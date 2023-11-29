import React from 'react';

function AccountChange() {
  return (
    <div className="bg-white py-3 lg:mr-3 h-28 md:h-24 boxshadow-lg rounded-lg relative border-[1px] border-lightestgray">
      <div className="px-5 md:flex items-center h-full">
        <span className="h-20 md:h-16 w-2 border-l-8 rounded-br-md rounded-tr-md  absolute -left-[1px]  border-l-deeppink"></span>
        <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full">
          <img src="/images/icons/trending_down.png" alt="wallet" />
        </div>
        <div className="text-black md:text-end  md:w-48 md:px-2">
          <span className="text-12 md:text-14 text-stormdust font-lg">
            24hr Account Change
          </span>
          <h1 className="text-16 md:text-24 font-extrabold text-deeppink">
            $ NaN %
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AccountChange;

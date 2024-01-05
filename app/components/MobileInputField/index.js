import { countryList } from '@utils/constants';
import React from 'react';

function MobileInputField() {
  return (
    <div className="relative">
      <div className="absolute">
        <select className="w-20 custom-select text-14 text-center text-gray-900 h-[40px] bg-white outline-none border-[1px] border-[#FEAE04] rounded-l-[8px]">
          {countryList.map((item, index) => {
            return (
              <option key={index} className="text-black">
                <div className="flex">
                  <img src="/images/bikoicon/user.png" alt="icon" />
                  <span>{item.dial_code}</span>
                </div>
              </option>
            );
          })}
        </select>
      </div>
      <input
        type="text"
        className="h-[40px] text-14 text-gray-900 pl-20 w-full outline-none border-[1px] border-[#FEAE04] rounded-[8px]"
      />
    </div>
  );
}

export default MobileInputField;

import React from 'react';
import PropTypes from 'prop-types';
import { countryList } from '@api/country';

function MobileInputField({
  onChange,
  selectonChange,
  value,
  selectValue,
  onKeyDown,
}) {
  return (
    <div className="relative">
      <div className="absolute">
        <select
          readOnly
          name="dialCode"
          disabled
          className="w-20 custom-select text-14 text-center text-black h-[40px] bg-white outline-none border-[1px] border-[#FEAE04] rounded-l-[8px]"
          onChange={selectonChange}
          value={selectValue}
        >
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
        type="number"
        name="emailOrMobile"
        className="h-[40px] text-14 text-gray-900 pl-[85px] w-full outline-none border-[1px] border-[#FEAE04] rounded-[8px]"
        onChange={onChange}
        value={value}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

MobileInputField.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectonChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  selectValue: PropTypes.string,
  onKeyDown: PropTypes.func,
};
export default MobileInputField;

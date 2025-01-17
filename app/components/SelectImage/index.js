import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { reactIcons } from '@utils/icons';

function SelectImage({
  optionList,
  selectValue,
  setSelectValue,
  select,
  setSelect,
}) {
  useEffect(() => {
    setSelectValue(optionList[0]);
  }, [optionList, setSelectValue]);

  return (
    <div className="relative">
      <div
        onClick={() => setSelect(!select)}
        className="border-[1px] border-lightgray font-[400] md:font-[500] text-10 md:text-14 xxl:text-18 min-w-24 xl:min-w-[120px] max-w-fit cursor-pointer justify-between rounded-[8px] h-[42px] bg-darkjunglegreen flex items-center"
      >
        <div className="flex items-center pl-1">
          <img src={selectValue?.icon} className="mx-1 w-4 h-4" alt="icon" />
          <span className="">{selectValue?.name}</span>
        </div>
        <span className="pr-2 font-[800]">{reactIcons.arrowdown}</span>
      </div>
      {select && (
        <div className="absolute min-w-28 pr-3 max-w-fit border-[1px] top-11 rounded-md h-fit z-50 bg-white">
          {optionList?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectValue(item);
                  setSelect(false);
                }}
                className="flex px-2 h-8 my-2 hover:bg-blue-50 cursor-pointer items-center"
              >
                <img src={item?.icon} className="w-4 h-4 mx-2" />
                <span className="text-black text-12">{item?.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

SelectImage.propTypes = {
  optionList: PropTypes.array,
  selectValue: PropTypes.object,
  setSelectValue: PropTypes.func,
  select: PropTypes.bool,
  setSelect: PropTypes.func,
};
export default SelectImage;

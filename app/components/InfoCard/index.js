import React from 'react';
import PropTypes from 'prop-types';

function InfoCard({ text, bgColor, note }) {
  return (
    <div>
      <div className="relative flex justify-center items-center border-2 bg-[#DFDBEE] rounded-sm border-green w-full  h-28 mt-3">
        <div
          className={`${bgColor ? 'bg-green text-white py-1  px-2 font-[600]' : 'text-black text-[500] text-center'} w-full`}
        >
          <span className="text-14">{text}</span>
        </div>
        <div className="absolute w-6 h-6 rounded-full top-[-10px] border bg-green border-green -left-[10px] z-30"></div>
      </div>
      <span className="text-12 text-gray-900">{note}</span>
    </div>
  );
}

InfoCard.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.bool,
  note: PropTypes.string,
};

export default InfoCard;

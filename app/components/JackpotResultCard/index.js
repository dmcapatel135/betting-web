import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@utils/constants';
import moment from 'moment';

function JackpotResultCard({ setOpenResult, openResult, item, index }) {
  return (
    <div className="bg-gray-800 border-[1px] border-blue rounded-md py-3">
      <div className="flex px-5 justify-between text-black">
        <div className="">
          <h1 className="font-[700] text-14 md:text-16">
            TSH, {formatNumber(item.prizePool)}
          </h1>
          <p className="text-12 md:text-14 font-[700]">
            {moment(item.updatedAt).format('DD/MM') || '03/02'} Pick
            {item.totalMatches} - {item.type.name || '1x2'}
          </p>
        </div>
        <div>
          <span className="text-12  md:text-16">
            {moment(item.createdAt).format('h:mm A ddd MM/DD') ||
              '3:30 PM Sat 03/02'}
          </span>
        </div>
      </div>
      <div className="text-black px-5">
        <strong className="text-12">
          Ticket price : Tsh {item.betAmount}{' '}
        </strong>
        <div>
          <ol className="text-12 md:text-14">
            <li>
              <span>17 correct :</span>
              <strong>None</strong>
            </li>
            <li>
              <span>16 correct :</span>
              <strong>None</strong>
            </li>
            <li>
              <span>15 correct :</span>
              <strong>None</strong>
            </li>
            <li>
              <span>14 correct :</span>
              <strong>1 winner, Tsh 2,000,000 *</strong>
            </li>
            <li>
              <span>13 correct : 6 winners, Tsh 250,000 * </span>
              <strong>None</strong>
            </li>
          </ol>
        </div>
      </div>
      <div className="px-4 my-2">
        <button
          onClick={() => setOpenResult(index)}
          className="w-full text-12 md:text-14  bg-[#006E8F] text-white rounded-md h-8"
        >
          {openResult ? 'LESS RESULT' : 'SEE RESULT'}
        </button>
      </div>
      <div className="text-center ">
        <span className="text-12 text-black">
          *Winning are subject to 15% tax
        </span>
      </div>
    </div>
  );
}

JackpotResultCard.propTypes = {
  openResult: PropTypes.bool,
  setOpenResult: PropTypes.bool,
  item: PropTypes.object,
  index: PropTypes.number,
};

export default JackpotResultCard;

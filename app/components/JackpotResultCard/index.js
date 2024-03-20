import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@utils/constants';
import moment from 'moment';

function JackpotResultCard({ setOpenResult, openResult, item, index }) {
  return (
    <div className="bg-gradient border border-blue rounded-md p-3 py-6">
      <div className="xl:max-w-[620px] 2xl:max-w-[860px] w-full mx-auto">
        <div className="flex  justify-between ">
          <div className="">
            <h1 className="font-medium text-14 md:text-16 xl:text-22">
              TSH, {formatNumber(item.prizePool)}
            </h1>
            <p className="text-12 text-primary-500 md:text-14 xl:text-16 font-medium mt-1">
              {moment(item.updatedAt).format('DD/MM') || '03/02'} Pick
              {item.totalMatches} - {item.type.name || '1x2'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-12  md:text-16">
              {moment(item.createdAt).format('h:mm A')}
            </span>
            <br />
            <span className="text-12  md:text-16">
              {moment(item.createdAt).format('MMMM Do YYYY')}
            </span>
          </div>
        </div>
        <div className="text-primary-800 ">
          <p className="text-12 xl:text-14 my-2">
            Ticket price : TSh {item.betAmount}
          </p>
          <div>
            <ol className="text-12 md:text-14">
              <li className="flex gap-1 items-center">
                <span>17 correct :</span>
                <span>None</span>
              </li>
              <li className="flex gap-1 items-center">
                <span>16 correct :</span>
                <span>None</span>
              </li>
              <li className="flex gap-1 items-center">
                <span>15 correct :</span>
                <span>None</span>
              </li>
              <li className="flex gap-1 items-center">
                <span>14 correct :</span>
                <span>1 winner, Tsh 2,000,000 *</span>
              </li>
              <li className="flex gap-1 items-center">
                <span>13 correct : 6 winners, Tsh 250,000 * </span>
                <span>None</span>
              </li>
            </ol>
          </div>
        </div>
        <div className=" my-2 mt-5">
          <button
            onClick={() => setOpenResult(index)}
            className="w-full btn bg-yellow"
          >
            {openResult ? 'LESS RESULT' : 'SEE RESULT'}
          </button>
        </div>
        <div className="text-center ">
          <span className="text-12 ">*Winning are subject to 15% tax</span>
        </div>
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

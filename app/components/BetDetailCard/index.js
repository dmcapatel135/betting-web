import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { postReq } from '@utils/apiHandlers';
import { toast } from 'react-toastify';
import { formatNumber } from '@utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@actions';

function BetDetailCard({ item, setShowBets, getMyBetDetails }) {
  const dispatch = useDispatch();
  const selectedBet = useSelector((state) => state.bet.selectedBet);

  const handleCancelBet = async (id) => {
    const response = await postReq(`/users/me/bet-slips/${id}/cancel`);
    if (response.status) {
      toast.success('Bet cancelled successfully');
      getMyBetDetails();
    } else {
      toast.error(response.error.message);
    }
  };

  const handleRebet = (data) => {
    let array = [];
    data.bets.forEach((element) => {
      let index = selectedBet.findIndex(
        (item) => item.eventId == element.eventId,
      );
      if (index == -1) {
        array.push({
          // sportId: ,
          eventId: element.eventId,
          bet: {
            id: element.outcomeId,
            odds: element.odds,
            probabilities: '',
            active: '',
            name: element.outcome,
          },
          betDetails: { id: element.marketId, name: element.market },
          eventNames:
            element?.event?.competitors[0]?.name +
            '-' +
            element?.event?.competitors[1]?.name,
          specifiers: element?.specifiers
            ? element?.specifiers.join('|')
            : null,
        });
      } else {
        console.log('------message fdsfsd ');
      }
    });
    array = [...array, ...selectedBet];
    dispatch(fetchBetDetailsAction(array));
  };

  console.log('-----itmne ', item);

  return (
    <div className="border-[1px] border-[#A3A3A3]  shadow-md rounded-[8px]">
      <div className="grid grid-cols-12 p-3">
        <div className="col-span-6   md:col-span-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                Placed Date
              </p>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                Betslip ID
              </p>
            </div>
            <div>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                {moment(item.createdAt).format('DD-MM-YYYY  hh:mm A')}
              </p>
              <p
                onClick={() => setShowBets(item.id)}
                className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600] cursor-pointer underline"
              >
                {item.id}
              </p>
            </div>
            <hr className=" w-[1px] h-10 mr-2 md:mx-4 border-[1px]"></hr>
          </div>
        </div>
        <div className="col-span-6  md:col-span-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                Matches
              </p>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                Possible Win TSH
              </p>
            </div>
            <div>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                {item.bets.length}
              </p>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                {item.bets
                  .map((b) => b.odds)
                  .reduce((a, b) => a * b, 1)
                  .toFixed(2) *
                  item?.stake *
                  parseInt(item.winBonus ? item.winBonus : 1)}
              </p>
            </div>
            <hr className=" w-[1px] h-10 ml-4 md:block hidden border-[1px]"></hr>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex justify-between pr-5 md:pr-0 md:justify-around">
            <div>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                Total Odds
              </p>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                Stake TSH
              </p>
            </div>
            <div>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                {item.bets
                  .map((b) => b.odds)
                  .reduce((a, b) => a * b, 1)
                  .toFixed(2)}
              </p>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                {formatNumber(item.stake)}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-4">
          <div className="flex justify-between  pr-5  md:pr-0">
            <div className="flex-shrink w-[130px]">
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                Bonge Bonus
              </p>
              {/* <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                Stake TSH
              </p> */}
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                {item.winBonus ? item.winBonus : 0}
              </p>
              {/* <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                {formatNumber(item.stake)}
              </p> */}
            </div>
            <hr className=" w-[1px] h-10 ml-4 md:block hidden border-[1px]"></hr>
          </div>
        </div>
      </div>
      <hr className="border-[1px] my-1 mx-3"></hr>
      <div className="flex gap-4 justify-end my-2 px-3">
        {!(item.status == 'Cancelled') && (
          <button
            onClick={() => {
              if (!(item.status == 'Cancelled')) handleCancelBet(item.id);
            }}
            className="btn bg-lightgray"
          >
            <img src="/images/bikoicon/cancel.png" alt="icon" className="" />
            <span> {item.status == 'Cancelled' ? 'Cancelled' : 'Cancel'}</span>
          </button>
        )}
        {item.status == 'Cancelled' && (
          <div className="bg-lightgray px-2 rounded-md py-1">
            <span className="text-black">Cancelled</span>
          </div>
        )}
        {!(item.status == 'Cancelled') && (
          <>
            <button className="btn bg-bluewhalelight">
              <img
                src="/images/bikoicon/share.png"
                alt="icon"
                className="w-6 h-5"
              />
              <span> Share</span>
            </button>
            <button
              onClick={() => {
                handleRebet(item);
              }}
              className="btn bg-green"
            >
              <img
                src="/images/bikoicon/rebet.png"
                alt="icon"
                className="w-6 h-5"
              />
              <span>Rebet</span>
            </button>
          </>
        )}
        {/* <button className="flex bg-maroon text-14 font-[600] text-white px-3 mx-1 py-1 rounded-[8px]">
          <img src="/images/bikoicon/lost.png" alt="icon" className="mx-2" />
          LOST
        </button>
        <button className="flex bg-green text-14 font-[600] text-white px-3 mx-1 py-1 rounded-[8px]">
          <img src="/images/bikoicon/won.png" alt="icon" className="mx-2" />
          WON
        </button> */}
      </div>
    </div>
  );
}
BetDetailCard.propTypes = {
  item: PropTypes.object,
  setShowBets: PropTypes.string,
  // index: PropTypes.number,
  getMyBetDetails: PropTypes.func,
};

export default BetDetailCard;

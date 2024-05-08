import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getReq, postReq } from '@utils/apiHandlers';
import { toast } from 'react-toastify';
import { formatNumber } from '@utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction, wallet } from '@actions';
import ShareBetModal from '@components/ShareBetModal';

function BetDetailCard({ item, setShowBets, getMyBetDetails }) {
  const dispatch = useDispatch();
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const [rebetData, setRebetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openShareBetModal, setOpenShareBetModal] = useState(false);
  const [code, setCode] = useState();

  const handleCancelBet = async (id) => {
    const response = await postReq(`/users/me/bet-slips/${id}/cancel`);
    if (response.status) {
      dispatch(wallet());
      toast.success('Bet cancelled successfully');
      getMyBetDetails();
    } else {
      toast.error(response.error.message);
    }
  };

  const getAllMarketData = useCallback(
    async (eventId, marketId, outcomeId, eventNames) => {
      try {
        const response = await getReq(`/events/${eventId}/markets`);
        if (response.status) {
          let betDetails = response.data.find((item) => item.id == marketId);
          let bet = betDetails.outcomes.find((item) => item.id == outcomeId);
          setRebetData((prev) => {
            const index = prev.findIndex((item) => item.eventId == eventId);
            if (index !== -1) {
              // If eventId already exists, update bet and betDetails
              const updatedBets = [...prev];
              updatedBets[index] = {
                ...updatedBets[index],
                sportId: '',
                bet: bet,
                betDetails: betDetails,
                eventNames: eventNames,
                specifiers: betDetails?.specifiers
                  ? betDetails?.specifiers.join('|')
                  : null,
              };
              return updatedBets;
            } else {
              // If eventId doesn't exist, push a new object
              return [
                ...prev,
                {
                  sportId: '',
                  eventId: eventId,
                  bet: bet,
                  betDetails: betDetails,
                  eventNames: eventNames,
                  specifiers: betDetails?.specifiers
                    ? betDetails?.specifiers.join('|')
                    : null,
                },
              ];
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  const handleRebet = (data) => {
    data.bets.forEach((item) => {
      getAllMarketData(
        item.eventId,
        item.marketId,
        item.outcomeId,
        item.event.competitors[0].name + '-' + item.event.competitors[1].name,
      );
    });
  };

  useEffect(() => {
    let array = [...selectedBet];
    for (let item of rebetData) {
      let index = array.findIndex((_item) => _item.eventId == item.eventId);
      if (index !== -1) {
        array[index] = item;
      } else {
        array.push(item);
      }
    }
    if (array.length > 30) {
      toast.error('You have reached a maximum number of games');
    } else {
      dispatch(fetchBetDetailsAction(array));
    }
  }, [rebetData, dispatch]); //eslint-disable-line

  // const handleRebet = (data) => {
  //   let array = [];
  //   data.bets.forEach((element) => {
  //     if (element.ptus == 'Pending') {
  //       let index = selectedBet.findIndex(
  //         (item) => item.eventId == element.eventId,
  //       );
  //       if (index == -1) {
  //         array.push({
  //           // sportId: ,
  //           eventId: element.eventId,
  //           bet: {
  //             id: element.outcomeId,
  //             odds: element.odds,
  //             probabilities: '',
  //             active: '',
  //             name: element.outcome,
  //           },
  //           betDetails: { id: element.marketId, name: element.market },
  //           eventNames:
  //             element?.event?.competitors[0]?.name +
  //             '-' +
  //             element?.event?.competitors[1]?.name,
  //           specifiers: element?.specifiers ? element?.specifiers : null,
  //         });
  //       } else {
  //         console.log('');
  //       }
  //     }
  //   });
  //   array = [...array, ...selectedBet];
  //   dispatch(fetchBetDetailsAction(array));
  // };

  const totalOdds = item.bets.map((b) => b.odds).reduce((a, b) => a * b, 1);

  const totalWinnings = (totalOdds.toFixed(2) * item.stake).toFixed(2);
  let bonus = item.winBonus
    ? ((Number(totalWinnings) * Number(item.winBonus)) / 100).toFixed(2)
    : 0;

  let possiblewin =
    (Number(totalWinnings) + Number(bonus)).toFixed(2) > 50000000
      ? 50000000
      : (Number(totalWinnings) + Number(bonus)).toFixed(2);

  // let possiblewin = (() => {
  //   const totalOdds = item.bets.map((b) => b.odds).reduce((a, b) => a * b, 1);

  //   const totalWinnings = (totalOdds.toFixed(2) * item.stake).toFixed(2);
  //   const bonus = item.winBonus
  //     ? ((Number(totalWinnings) * Number(item.winBonus)) / 100).toFixed(2)
  //     : 0;
  //   return Number(totalWinnings) + Number(bonus);
  // })();

  const handleButton = (status) => {
    if (status == 'Settled') {
      return false;
    } else if (status == 'Cancelled') {
      return false;
    } else {
      return true;
    }
  };

  const statusHandler = (bets) => {
    if (bets.find((item) => item.status == 'Pending')) {
      return 'Pending';
    } else if (bets.find((item) => item.status == 'Settled')) {
      let result = bets.find((item) => item.settlement.result == 'Lost');
      if (result) {
        return 'Lost';
      } else {
        return 'Won';
      }
    }
  };

  function BetsData(data) {
    return data.map((bet) => {
      return {
        eventId: bet.eventId,
        marketId: bet.marketId,
        specifiers: bet.specifiers ? [bet.specifiers] : null,
        outcomeId: bet.outcomeId,
      };
    });
  }

  const handleShareBets = async (betsData) => {
    setLoading(true);
    const data = {
      bets: BetsData(betsData.bets),
    };
    try {
      const response = await postReq('/share-bets', data);
      if (response.status) {
        setOpenShareBetModal(true);
        setLoading(false);
        setCode(response.data);
      } else if (response.error) {
        setLoading(false);
        toast.error(response.error.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="border border-green cursor-pointer shadow-md rounded-[8px]">
      <ShareBetModal
        openShareBetModal={openShareBetModal}
        setOpenShareBetModal={setOpenShareBetModal}
        setCode={setCode}
        code={code}
        betSlip={true}
      />
      {/* <div className="grid grid-cols-12 p-3">
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
                {formatNumber(possiblewin?.toFixed(2))}
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
        <div className="col-span-6   md:col-span-4">
          <div className="flex justify-between">
            <div className="w-[130px]">
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                Bonge Bonus
              </p>
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600] cursor-pointer ">
                {item.winBonus ? item.winBonus : 0}
              </p>
            </div>
            <hr className=" w-[1px] h-10 mr-2 md:mx-4 border-[1px]"></hr>
          </div>
        </div>
        <div className="col-span-6  md:col-span-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                Won amount
              </p>
            </div>
            <div>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 font-[600]">
                {formatNumber(item.wonAmount ? item.wonAmount : 0)}
              </p>
            </div>
            <hr className=" w-[1px] h-10 ml-4 md:block hidden border-[1px]"></hr>
          </div>
        </div>
      </div> */}
      <div
        onClick={() => setShowBets(item.id)}
        className="grid gap-2 grid-cols-6 md:grid-cols-12 p-3"
      >
        <div className="col-span-full">
          <div className="flex justify-end">
            <p
              className={`${statusHandler(item.bets) == 'Pending' ? 'text-gray-400' : statusHandler(item.bets) == 'Lost' ? 'text-red-500' : 'text-greencolor'} font-[600]`}
            >
              {statusHandler(item.bets)}
            </p>
          </div>
        </div>
        <div className="col-span-3 md:col-span-6 2xl:col-span-6">
          <div className="flex justify-between items-center 2xl:gap-2 h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="flex gap-4">
                <p className="text-gray-900 min-w-[75px] md:w-[100px] lg:w-[120px] xl:w-[100px] text-12 md:text-14 xxl:text-16 font-[600]">
                  Date Placed
                </p>
                <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                  {moment(item.createdAt).format('DD-MM-YYYY  hh:mm A')}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="text-gray-900 min-w-[75px] md:w-[100px] lg:w-[120px] xl:w-[100px] text-12 md:text-14 xxl:text-16 font-[600]">
                  Betslip ID
                </p>
                <p
                  onClick={() => setShowBets(item.id)}
                  className="text-gray-900 text-12 md:text-14 xxl:text-16 cursor-pointer underline font-semibold"
                >
                  {item.id}
                </p>
              </div>
              <div className="flex gap-4 ">
                <p className="text-gray-900 min-w-[75px] m md:w-[100px] lg:w-[120px] xl:w-[100px] text-12 md:text-14 xxl:text-16 font-[600]">
                  Stake TSH
                </p>
                <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                  {formatNumber(item.stake)}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="text-gray-900 min-w-[75px] md:w-[100px] lg:w-[120px] xl:w-[100px] text-12 md:text-14 xxl:text-16 font-[600]">
                  Total Odds
                </p>
                <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                  {item.bets
                    .map((b) => b.odds)
                    .reduce((a, b) => a * b, 1)
                    .toFixed(2)}
                </p>
              </div>
            </div>
            <div className="hidden xl:flex w-[1px] min-h-[90px] h-full mr-2 md:mx-2 border-r border-r-green/50"></div>
          </div>
        </div>
        <div className="w-full col-span-6 xl:col-span-12 hidden border-t border-t-green/50"></div>
        <div className="col-span-3 xl:col-span-6 2xl:col-span-6">
          <div className="flex justify-between items-center 2xl:gap-2 h-full">
            <div className="flex  h-full flex-col justify-between">
              <div className="flex gap-4">
                <p className="text-gray-900 min-w-[80px] md:min-w-[140px] lg:min-w-[120px] xl:min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                  Matches
                </p>
                <p className="text-gray-900 text-12 md:text-14 xxl:text-16">
                  {item.bets.length}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="text-gray-900 min-w-[80px] md:min-w-[140px] lg:min-w-[120px] xl:min-w-[140px]  text-12 md:text-14 xxl:text-16 font-[600]">
                  Bonge Bonus
                </p>
                <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                  {formatNumber(bonus)}
                </p>
              </div>
              <div className="flex gap-4">
                <p className="text-gray-900 w-[80px] md:min-w-[140px] lg:min-w-[120px] xl:min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                  Possible Won Amount
                </p>
                <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                  {formatNumber(possiblewin)}
                </p>
              </div>
              <div className="flex gap-4 ">
                <p className="text-gray-900 min-w-[80px] md:min-w-[140px] lg:min-w-[120px] xl:min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                  Won amount
                </p>
                <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                  {!item.wonAmount
                    ? '-'
                    : formatNumber(
                        !isNaN(item.wonAmount) ? item.wonAmount : 'N/A',
                      )}
                </p>
              </div>
              {/* <div className="flex gap-7 ">
                <p className="text-gray-900 min-w-[75px] m md:w-[100px] lg:w-[120px] xl:w-[100px] text-12 md:text-14 xxl:text-16 font-[600]">
                  Stake TSH
                </p>
                <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                  {formatNumber(item.stake)}
                </p>
              </div> */}
            </div>
            {/* <div className="w-[1px] hidden 2xl:flex min-h-[90px] h-full mr-2 md:mx-2 border-r border-r-green/50"></div> */}
          </div>
        </div>
        {/* <div className="w-full col-span-6 xl:col-span-12 2xl:hidden border-t border-t-green/50 "></div> */}
        <div className="col-span-6 xl:col-span-12 2xl:col-span-4">
          <div className="flex flex-col justify-between h-full">
            {/* <div className="flex gap-2 ">
              <p className="text-gray-900 min-w-[100px] md:w-[100px] lg:w-[120px] xl:w-[100px] text-12 md:text-14 xxl:text-16 font-[600]">
                Total Odds
              </p>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                {item.bets
                  .map((b) => b.odds)
                  .reduce((a, b) => a * b, 1)
                  .toFixed(2)}
              </p>
            </div> */}
            {/* <div className="flex gap-2 ">
              <p className="text-gray-900 min-w-[100px] md:w-[100px] lg:w-[120px] xl:w-[100px] text-12 md:text-14 xxl:text-16 font-[600]">
                Stake TSH
              </p>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                {formatNumber(item.stake)}
              </p>
            </div> */}
            {/* <div className=" gap-2 2xl:flex hidden opacity-0">
              <p className="text-gray-900 min-w-[100px] md:w-[120px] text-12 md:text-14 xxl:text-16 font-[600]">
                VOID REASON
              </p>
              <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                VOID REASON
              </p>
            </div> */}
          </div>
        </div>
      </div>
      {item.status == 'Pending' ||
        (item.status == 'Cancelled' && (
          <hr className="border-t border-t-green/50 mx-3"></hr>
        ))}
      <div className="flex gap-2 sm:gap-4 justify-end my-2 px-3">
        {handleButton(item.status) && (
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
        {item.status == 'Pending' && (
          <>
            <button
              onClick={() => handleShareBets(item)}
              // className="btn bg-bluewhalelight text-white "
              className={`btn ${loading ? 'bg-lightgray text-black' : 'bg-bluewhalelight text-white'}`}
              disabled={loading}
            >
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
  setShowBets: PropTypes.func,
  // index: PropTypes.number,
  getMyBetDetails: PropTypes.func,
};

export default BetDetailCard;

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Balance from '@components/Balance';
import { reactIcons } from '@utils/icons';
import { getReq, isLoggedIn, postReq } from '@utils/apiHandlers';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchBetDetailsAction } from '@actions';
import { formatNumber } from '@utils/constants';
import { MyContext } from '@components/MyContext/MyContext';
import { CircularProgress } from '@mui/material';
import { images } from '@utils/images';
import ShareBetModal from '@components/ShareBetModal';

function BetWallet({ stakeValue }) {
  const [openDialog, setOpenDailog] = useState();
  const [game, setGame] = useState('sport');
  // const [gameRules, setGameRules] = useState();
  const [bonus, setBonus] = useState([]);
  const [totalOdd, setTotalOdd] = useState(0);
  const [betData, setBetData] = useState([]);
  const bets = useSelector((state) => state.bet.selectedBet);
  const [stake, setStake] = useState(stakeValue || 1000);
  const [oddChange, setOddChange] = useState(false);
  const [totalSport, setTotalSport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const [loading, setLoading] = useState(false);
  const [shareData, setShareData] = useState([]);
  const { bookingcode } = useParams();
  const [btnLoadLoading, setBtnLoadLoading] = useState(false);
  const [getShareData, setGetShareData] = useState([]);
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [codeErr, setCodeErr] = useState('');
  const [openShareBetModal, setOpenShareBetModal] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);

  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const { setTab, setSelectTournament, gameRules } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const uniqueSports = {};
    const filteredData = bets.filter((item) => {
      if (!uniqueSports[item.sportId]) {
        uniqueSports[item.sportId] = true;
        return true;
      }
      return false;
    });
    setTotalSport(filteredData);
  }, [bets]);

  const getEventDetails = useCallback(async (eventId) => {
    try {
      const response = await getReq(`/events/${eventId}`);
      if (response.status) {
        setGetShareData((prev) => {
          const index = prev.findIndex(
            (item) => item.eventId == parseInt(eventId),
          );
          if (index !== -1) {
            // If eventId already exists, update bet and betDetails
            const updatedBets = [...prev];
            updatedBets[index] = {
              ...updatedBets[index],
              // sportId: sId,
              // bet: bet,
              // betDetails: betDetails,
              eventNames:
                response.data.competitors[0].name +
                '-' +
                response.data.competitors[1].name,
              // specifiers: specifiers,
            };
            return updatedBets;
          } else {
            return [
              ...prev,
              {
                eventNames:
                  response.data.competitors[0].name +
                  '-' +
                  response.data.competitors[1].name,
              },
            ];
          }
        });
      }
    } catch (error) {
      console.log('');
    }
  }, []);

  const getAllMarketData = useCallback(
    async (eventId, marketId, outcomeId) => {
      try {
        const response = await getReq(`/events/${eventId}/markets`);
        if (response.status) {
          let betDetails = response.data.find((item) => item.id == marketId);
          let bet = betDetails.outcomes.find((item) => item.id == outcomeId);
          setGetShareData((prev) => {
            const index = prev.findIndex((item) => item.eventId == eventId);
            if (index !== -1) {
              // If eventId already exists, update bet and betDetails
              const updatedBets = [...prev];
              updatedBets[index] = {
                ...updatedBets[index],
                sportId: '',
                bet: bet,
                betDetails: betDetails,
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
                  specifiers: betDetails?.specifiers
                    ? betDetails?.specifiers.join('|')
                    : null,
                },
              ];
            }
          });
          getEventDetails(eventId);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [getEventDetails],
  );

  useEffect(() => {
    const rule = bets?.filter(
      (item) => item?.bet?.odds >= gameRules?.minimumOdds,
    );
    setBonus(rule);
  }, [bets, gameRules]);

  useEffect(() => {
    setBetData([]);
    if (bets.length > 0) {
      const totalOdds = bets
        .map((b) => b.bet?.odds || 1)
        .reduce((a, b) => a * b, 1);
      setTotalOdd(totalOdds);
    }

    if (bets) {
      bets.forEach((item) => {
        setBetData((prev) => [
          ...prev,
          {
            eventId: item.eventId,
            marketId: item.betDetails.id,
            outcomeId: item.bet.id,
            odds: item.bet.odds,
            specifiers: item.specifiers
              ? item.specifiers?.split()
              : item.specifiers,
          },
        ]);
        setShareData((prev) => [
          ...prev,
          {
            eventId: item.eventId,
            marketId: item.betDetails.id,
            outcomeId: item.bet.id,
            // odds: item.bet.odds,
            specifiers: item.specifiers
              ? item.specifiers?.split()
              : item.specifiers,
          },
        ]);
      });
    }

    if (bets.length === 0) {
      setOddChange(0);
    }
  }, [bets]);

  const totalWinnings = (totalOdd * stake).toFixed(2);
  const winBonus = gameRules?.rules[bonus?.length - 1]?.percentage || 0;
  const bongeBonus = winBonus
    ? ((Number(totalWinnings) * Number(winBonus)) / 100).toFixed(2)
    : 0;
  const calculation = (Number(totalWinnings) + Number(bongeBonus)).toFixed(2);
  const tax = (((calculation - stake) * 10) / 100).toFixed(2);
  const netAmount = (calculation - tax).toFixed(2);

  const handlePlaceBet = async () => {
    if (isLoggedIn()) {
      setIsLoading(true);
      const data = {
        stake: stake,
        acceptOddsChange: oddChange,
        bets: betData,
      };
      const response = await postReq('/users/me/bet-slips', data);
      setIsLoading(false);
      if (response.status) {
        dispatch(fetchBetDetailsAction([]));
        toast.success('Congrats ! Bet place successfully');
      } else if (response.error) {
        toast.error(response.error.message);
      }
    } else {
      setSelectTournament(null);
      setTab(null);
      navigate('/login');
    }
  };

  const handleRemoveBet = (eventId, sportId) => {
    const updatedBets = bets.filter((item) => item.eventId != eventId);
    setCodeErr('');
    dispatch(fetchBetDetailsAction(updatedBets));
    setGetShareData(updatedBets);
    if (!updatedBets.find((item) => item.sportId == sportId)) {
      const updatedSport = totalSport.filter((item) => item != sportId);
      setTotalSport(updatedSport);
    }
  };

  // useEffect(() => {
  //   const filteredData = bets.filter((item, index, array) => {
  //     return array.findIndex((obj) => obj.sportId === item.sportId) === index;
  //   });
  //   setTotalSport(filteredData);
  // }, [bets]);

  const handleClearAllBet = () => {
    dispatch(fetchBetDetailsAction([]));
    setTotalSport([]);
    setTotalOdd(1);
    setGetShareData([]);
    setCodeErr('');
  };

  const handleGenerateBookingCode = async (type) => {
    // setOpenDailog(true);
    if (type == 'share') {
      setShareLoading(true);
    } else {
      setLoading(true);
    }
    const data = {
      bets: shareData,
    };
    try {
      const response = await postReq('/share-bets', data);

      if (response.status) {
        if (type == 'share') {
          setShareLoading(false);
          setOpenShareBetModal(true);
        } else {
          setLoading(false);
          setOpenDailog(true);
        }
        setCode(response.data);
      } else if (response.error) {
        if (type == 'share') {
          setShareLoading(false);
        } else {
          setLoading(false);
        }
        toast.error(response.error.message);
      }
    } catch (error) {
      if (type == 'share') {
        setShareLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const handleLoadBets = useCallback(
    async (bookingcode, type) => {
      if (!type == 'url' || !code) {
        setCodeErr('Please enter a booking code.');
        return;
      }

      setBtnLoadLoading(true);

      try {
        const response = await getReq(
          `/share-bets/${code ? code : bookingcode}`,
        );
        setBtnLoadLoading(false);
        if (response.status) {
          setBetData(response.data);
          response.data.forEach((item) => {
            getAllMarketData(item.eventId, item.marketId, item.outcomeId);
          });
        }
      } catch (error) {
        setBtnLoadLoading(false);
        console.log(' ');
      }
    },
    [code, getAllMarketData],
  );

  useEffect(() => {
    if (bookingcode) {
      let type = 'url';

      handleLoadBets(bookingcode, type);
      setCode(bookingcode);
    }
  }, [bookingcode, handleLoadBets]);

  useEffect(() => {
    if (getShareData.length > 0) {
      dispatch(fetchBetDetailsAction(getShareData));
    }
  }, [getShareData, dispatch]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setOpenDailog(false);
      toast.success('Code copied successfully.');
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (copied) {
        setCopied(false);
      }
    }, 2000);
  }, [copied]);

  return (
    <div className="w-full border-[1px] border-blue  rounded-[8px] relative">
      <ShareBetModal
        openShareBetModal={openShareBetModal}
        setOpenShareBetModal={setOpenShareBetModal}
        setCode={setCode}
        code={code}
      />
      {!isLoggedIn() ? (
        <div className="flex justify-between border-b-[1px] border-blue items-center px-3">
          <p className="text-12 text-black">Not logged in -</p>
          <div className="flex my-2">
            <button
              onClick={() => {
                setSelectTournament(null);
                setTab(null);
                navigate('/login');
              }}
              className=" lg:h-[32px] xxl:h-[48px] w-[60px] xxl:w-[110px] border-[1px]  text-12 xxl:text-18 hover:text-white hover:bg-gradient-color-2 text-black border-[#E7A024] rounded-[6px]"
            >
              Login
            </button>
            <button
              onClick={() => {
                setSelectTournament(null);
                setTab(null);
                navigate('/join-now');
              }}
              className="lg:h-[32px] xxl:h-[48px] w-[70px] xxl:w-[110px] text-12 xxl:text-18 bg-white ml-3 text-black  border-[1px] hover:bg-gradient-color-2 hover:text-white border-[#E7A024] rounded-[6px]"
            >
              Join Now
            </button>
          </div>
        </div>
      ) : (
        <Balance />
      )}
      <div className="px-3 my-3">
        <div className="flex text-black border-[1px] h-10 w-full rounded-[8px]">
          <div
            className={`w-1/2 flex flex-1 justify-center cursor-pointer ${
              game == 'sport'
                ? 'bg-gradient-color-1 text-white'
                : 'bg-white text-black'
            } rounded-lg items-center`}
            onClick={() => setGame('sport')}
          >
            <span className="text-12 ">Sport</span>
            <img
              src={
                game === 'sport'
                  ? '/images/bikoicon/icon-football.png'
                  : '/images/bikoicon/football.svg'
              }
              alt="icon"
              className="mx-2"
            />
            <span className="text-12 ">{selectedBet?.length}</span>
          </div>
          {/* <div
            className={`w-1/2 flex justify-center cursor-pointer ${
              game == 'virtual' ? 'bg-gradient-color-1 text-white' : 'bg-white'
            } rounded-r-lg items-center`}
            onClick={() => setGame('virtual')}
          >
            <span className="text-12">Virtual</span>
            <img
              src={
                game === 'virtual'
                  ? '/images/bikoicon/icon-virtual-sport.svg'
                  : '/images/bikoicon/icon-virtual-sport.png'
              }
              alt="icon"
              className="mx-2"
            />
            <span className="text-12">0</span>
          </div> */}
        </div>
        {bets.length == 0 && (
          <>
            <div className="flex items-center justify-between my-3">
              {/* <div className="flex items-center"> */}
              <div className="w-[80px]">
                <label className="text-12 text-black">Booking code</label>
              </div>
              {/* </div> */}
              <div className="flex-1 px-2">
                <input
                  type="text"
                  className="w-full  outline-none px-2 border-[1px] text-black text-12 rounded-sm   border-yellow"
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="w-[45px]">
                <button
                  disabled={btnLoadLoading}
                  onClick={handleLoadBets}
                  className={`px-2 py-[1px] ${btnLoadLoading ? 'bg-lightestgray text-gray-900' : 'bg-gradient-color-2'} text-12 rounded-sm`}
                >
                  Load
                </button>
              </div>
            </div>
            {/* <div className=""> */}
            <span className="text-12 px-auto text-red-500">{codeErr}</span>
            {/* </div> */}
          </>
        )}
        {bets.length == 0 && (
          <div className="text-center">
            <div className="my-5 flex justify-center  h-56">
              <img
                src={images.emptybetslip}
                alt="beticon"
                className="rounded-md w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        {/* <div className="text-center">
          <div className="my-5 flex justify-center">
            <img src="/images/bikoicon/betIcon.png" alt="beticon" />
          </div>
          <span className="text-14 font-[600] text-[#BD1842]">
            Betslip is empty
          </span>
        </div>
        <div className="my-5">
          <button className="py-2 bg-gradient-color-2 w-full rounded-[8px]">
            Learn How To Place Bet
          </button>
        </div> */}
        {!(selectedBet.length > gameRules?.rules?.length) &&
          gameRules?.rules[bonus?.length - 1]?.message && (
            <div className="h-12 mt-5 flex items-center bg-yellow rounded-br-[16px]">
              {/* <div className="w-5 h-12 bg-yellow"></div> */}
              <span className="text-white font-[700] text-[13px] xxl:text-14  leading-4 px-2">
                {gameRules?.rules[bonus?.length - 1]?.message}.
                {/* {gameRules?.minimumOdds} */}
                {/* minimum odds. */}
                {/* Congrats! These legs give you a 3% Win Bonus. Add 1 more for 5%.
            1.25 minimum odds. */}
              </span>
            </div>
          )}
      </div>
      {bets.length > 0 && (
        <>
          <hr className="border bg-white"></hr>
          <div className="px-3 my-5 flex justify-between ">
            <button
              className={`${loading ? 'bg-lightestgray text-gray-900' : 'bg-[#02CBDB] text-white'} h-8 flex px-2 justify-center items-center bg-[#02CBDB] rounded-[4px]`}
              disabled={loading}
            >
              <span
                className="text-12  leading-3 2xl:text-14 font-[700] cursor-pointer"
                onClick={() => {
                  handleGenerateBookingCode('generate');
                }}
              >
                Generate Booking Code
              </span>
            </button>
            <button
              className={`${shareLoading ? 'bg-lightestgray text-gray-900' : 'bg-gradient-color-1 text-white'} h-8 flex px-2 justify-center items-center bg-[#02CBDB] rounded-[4px]`}
              disabled={shareLoading}
            >
              <span
                className="text-12 2xl:text-14 flex font-[700] cursor-pointer"
                onClick={() => {
                  handleGenerateBookingCode('share');
                }}
              >
                <img
                  src="/images/bikoicon/share.png"
                  alt="icon"
                  className="w-6 h-5"
                />
                <span>Share</span>
              </span>
            </button>
          </div>
        </>
      )}
      <div className="border-t-[1px] mb-2 my-5 border-blue  overflow-y-auto custom-scroll-sm max-h-64 min-h-8">
        {bets?.map((item, index) => {
          return (
            <div key={index} className="flex border-b-[1px] border-blue ">
              <div
                className="w-10 border-r-[1px] flex justify-center cursor-pointer items-center border-blue"
                onClick={() => handleRemoveBet(item.eventId, item.sportId)}
              >
                <img src="/images/bikoicon/close_small.png" alt="icon" />
              </div>
              <div className="flex flex-col xl:flex-row justify-between w-full px-3 pb-2 xl:items-center ">
                <div className="text-gray-900">
                  <p className="text-12 xxl:text-14 font-[600]">{`${
                    item.eventNames ? item.eventNames : 'N.A'
                  }`}</p>
                  <span className="text-12 text-black hidden xl:flex">
                    {item?.betDetails?.name + ' - ' + item?.bet?.name}
                  </span>
                  <div className="flex justify-between gap-2 xl:hidden">
                    <span className="text-12 text-black">
                      {item?.betDetails?.name + ' - ' + item?.bet?.name}
                    </span>
                    <div className="flex justify-center items-center rounded-md bg-yellow text-white h-7 w-10">
                      <span className="text-14 font-[600]">
                        {item?.bet?.odds}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="justify-center items-center rounded-md bg-yellow h-7 w-10 hidden xl:flex">
                  <span className="text-14 font-[600]">{item?.bet?.odds}</span>
                </div>
              </div>
            </div>
          );
        })}
        <hr className="border-[1px]"></hr>
      </div>
      {bets.length > 0 && (
        <>
          <div className="flex container_main items-center px-3">
            <input type="checkbox" checked={oddChange} />
            <span
              onClick={() => setOddChange(!oddChange)}
              className="checkmark top-[5px] !left-[5px]"
            ></span>
            <span className="text-black text-12 ml-4">
              Accept odds change.{' '}
              <Link className="underline hover:text-yellow">Learn More</Link>
            </span>
          </div>
          <div className="px-3">
            <span className="text-black text-16">Your stake</span>
            <div className="h-[40px] border-[1px] border-yellow rounded-lg flex justify-between my-2">
              <div
                onClick={() => setStake(parseInt(stake) - 1)}
                className="h-[38px] flex justify-center items-center cursor-pointer bg-[#C2C4C6] w-12 text-center rounded-l-lg"
              >
                <span className="text-24">-</span>
              </div>
              <div className="h-10  flex justify-center items-center">
                <input
                  className="text-black w-full text-center text-14 outline-none border-none h-8"
                  placeholder="Your Stake"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                />
              </div>
              <div
                onClick={() => setStake(parseInt(stake) + 1)}
                className="h-[38px] flex justify-center items-center cursor-pointer bg-yellow w-12 rounded-r-lg"
              >
                <span className="text-24">+</span>
              </div>
            </div>
            {!stake && (
              <span className="text-12 text-black">Min stake is 1</span>
            )}
          </div>
          <div className="px-3">
            <div className="flex justify-between text-black">
              <span className="text-12">Odds:</span>
              <span className="text-12">{totalOdd?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-black">
              <span className="text-12">Bonge Bonus {winBonus}% (TZS)</span>
              <span className="text-12">
                {/* {(
              (totalOdd *
                stake *
                gameRules?.rules[bonus?.length - 1]?.percentage) /
              100
            ).toFixed(2)} */}
                {bongeBonus === 'NaN' ? 0 : formatNumber(bongeBonus)}
              </span>
            </div>
            <div className="flex justify-between text-black">
              <span className="text-12">Tax 10% (TZS)</span>
              <span className="text-12">
                {tax === 'NaN' ? '0.00' : formatNumber(tax)}
              </span>
            </div>
            <div className="flex justify-between text-black">
              <span className="text-12">Possible winnings (TZS)</span>
              <span className="text-12">
                {calculation == 'NaN' ? '0.00' : formatNumber(calculation)}
              </span>
            </div>
            <div className="flex justify-between text-black">
              <span className="text-12">Net Amount (TZS)</span>
              <span className="text-12">
                {netAmount === 'NaN' ? '0.00' : formatNumber(netAmount)}
              </span>
            </div>
          </div>
          <div className="flex my-3 px-3 ">
            <button
              onClick={handleClearAllBet}
              className="border-[1px] border-yellow w-32 hover:bg-yellow hover:text-white text-gray-900 text-14 font-[700] rounded-md"
            >
              CLEAR ALL
            </button>
            <button
              onClick={handlePlaceBet}
              disabled={isLoading}
              className={`${
                isLoading
                  ? 'bg-lightestgray hover:bg-lightestgray border-lightestgray '
                  : 'border-yellow'
              } border-[1px] h-10 ml-3 text-gray-900  w-52 hover:text-white hover:bg-yellow text-14 font-[700] rounded-md`}
            >
              {isLoading && <CircularProgress color="inherit" size={20} />}
              PLACE BET
            </button>
          </div>
        </>
      )}
      {openDialog && (
        <div className="absolute top-0 bg-[#0000002e]  w-full backdrop-blur-[2px] h-full rounded-[8px] ">
          <div className="lg:w-[245px] w-[300px] 2xl:w-[300px] h-fit pb-5 bg-white z-50 m-4 lg:m-2 2xl:m-4">
            <div className="flex justify-between py-1 px-2 ">
              <div className="flex text-gray-900">
                <img src="/images/bikoicon/person_play.png" className="h-5" />
                <span className="text-12 leading-3 mx-1">
                  Booking code successfully generated.
                </span>
              </div>
              <span
                className="text-gray-900 cursor-pointer"
                onClick={() => setOpenDailog(false)}
              >
                {reactIcons.close}
              </span>
            </div>
            <div>
              <div className="lg:w-[200px] w-[280px] 2xl:w-[280px] border-[1px] border-yellow my-2 h-8 mx-3">
                <div className="h-8 flex justify-between">
                  <div className="lg:w-24 w-28 2xl:w-28 bg-yellow">
                    <span className="text-10 font-[600] 2xl:text-12 text-white leading-3 px-3">
                      Booking Code
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mx-3 text-12 font-[700] text-yellow">
                      {code}
                    </span>
                    <span
                      className={`${copied ? 'text-[#008000]' : 'text-black'} text-20 cursor-pointer`}
                      onClick={handleCopyCode}
                    >
                      {reactIcons.copy}
                    </span>
                    {/* <img
                      src="/images/bikoicon/content_copy.png"
                      className="h-6 cursor-pointer"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

BetWallet.propTypes = {
  selectedBet: PropTypes.array,
  handleRemoveBet: PropTypes.func,
  // setSelectedBet: PropTypes.array,
  handleClearAllBet: PropTypes.func,
  stakeValue: PropTypes.number,
};
export default BetWallet;

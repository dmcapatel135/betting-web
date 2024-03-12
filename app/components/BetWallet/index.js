import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Balance from '@components/Balance';
import { reactIcons } from '@utils/icons';
import { isLoggedIn, postReq } from '@utils/apiHandlers';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchBetDetailsAction } from '@actions';
import { formatNumber } from '@utils/constants';
import { MyContext } from '@components/MyContext/MyContext';
import { CircularProgress } from '@mui/material';

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

  // const getGamesRules = async () => {
  //   const response = await getReq('/win-bonus-policies/active');
  //   setGameRules(response.data);
  // };

  // useEffect(() => {
  //   getGamesRules();
  // }, []);

  useEffect(() => {
    const rule = bets.filter((item) => item.bet.odds >= gameRules?.minimumOdds);
    setBonus(rule);
  }, [bets, gameRules]);

  useEffect(() => {
    setBetData([]);
    if (bets.length > 0) {
      setTotalOdd(1);
      bets.map((item) => {
        setTotalOdd((prevOdds) => prevOdds * item.bet.odds);
      });
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
      });
    }

    if (bets.length === 0) {
      setOddChange(0);
    }
  }, [bets]);

  const percentageValue =
    (totalOdd * stake * gameRules?.rules[bonus?.length - 1]?.percentage) / 100;
  const calculation = (totalOdd * stake + percentageValue).toFixed(2);

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
    dispatch(fetchBetDetailsAction(updatedBets));
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
  };

  const bongeBonus = (
    (totalOdd * stake * gameRules?.rules[bonus?.length - 1]?.percentage) /
    100
  ).toFixed(2);
  const tax = (((calculation - stake) * 10) / 100).toFixed(2);
  const netAmount = (calculation - ((calculation - stake) * 10) / 100).toFixed(
    2,
  );

  return (
    <div className="w-full border-[1px] border-blue  rounded-[8px] relative">
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
        {/* <div className="flex items-center my-3">
          <div className="flex items-center">
            <label className="text-12 text-black">Booking code</label>
            <input
              type="text"
              className="w-[120px] mx-3 border-[1px] rounded-sm  border-yellow"
            />
          </div>
          <button className="px-3 bg-gradient-color-2 text-12 rounded-sm">
            Load
          </button>
        </div>
        <div className="text-center">
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
        {!(selectedBet.length > gameRules?.rules?.length) && (
          <div className="h-12 mt-5 flex items-center bg-yellow rounded-br-[16px]">
            {/* <div className="w-5 h-12 bg-yellow"></div> */}
            <span className="text-white font-[700] text-[13px] xxl:text-14  leading-4 px-2">
              {gameRules?.rules[bonus?.length - 1]?.message}.
              {gameRules?.minimumOdds}
              {/* minimum odds. */}
              {/* Congrats! These legs give you a 3% Win Bonus. Add 1 more for 5%.
            1.25 minimum odds. */}
            </span>
          </div>
        )}
      </div>
      <hr className="border-[1px]"></hr>
      <div className="px-3 my-5">
        <div className="h-10 flex justify-center items-center bg-[#02CBDB] rounded-[8px]">
          <span
            className="text-14 font-[700] cursor-pointer"
            onClick={() => setOpenDailog(true)}
          >
            Booking code Generated
          </span>
        </div>
      </div>
      <div className="border-t-[1px] mb-2 my-5 border-blue  overflow-y-auto custom-scroll-sm max-h-64 min-h-8">
        {bets?.map((item, index) => {
          console.log('-------events name ', item);
          return (
            <div key={index} className="flex border-b-[1px] border-blue ">
              <div
                className="w-10 border-r-[1px] flex justify-center cursor-pointer items-center border-blue"
                onClick={() => handleRemoveBet(item.eventId, item.sportId)}
              >
                <img src="/images/bikoicon/close_small.png" alt="icon" />
              </div>
              <div className="flex justify-between w-full px-3 items-center ">
                <div className="text-gray-900">
                  <p className="text-12 xxl:text-14  font-[600]">{`${
                    item.eventNames ? item.eventNames : 'N.A'
                  }`}</p>
                  <span className="text-12 text-black">
                    {item.betDetails.name + ' - ' + item.bet.name}
                  </span>
                </div>
                <div className="flex justify-center items-center rounded-md bg-yellow h-7 w-10">
                  <span className="text-14 font-[600]">
                    {item.bet.odds || '2.95'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <hr className="border-[1px]"></hr>
      </div>
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
        <div className="h-[40px] border-[1px] border-yellow rounded-xl flex justify-between my-2">
          <div
            onClick={() => setStake(stake - 1)}
            className="h-[38px] flex justify-center items-center cursor-pointer bg-[#C2C4C6] w-12 text-center rounded-l-xl"
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
            onClick={() => setStake(stake + 1)}
            className="h-[38px] flex justify-center items-center cursor-pointer bg-yellow w-12 rounded-r-xl"
          >
            <span className="text-24">+</span>
          </div>
        </div>
        {!stake && <span className="text-12 text-black">Min stake is 1</span>}
      </div>
      <div className="px-3">
        <div className="flex justify-between text-black">
          <span className="text-12">Odds:</span>
          <span className="text-12">{totalOdd?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-black">
          <span className="text-12">
            Bonge Bonus {gameRules?.rules[bonus?.length - 1]?.percentage}% (TZS)
          </span>
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
            {tax === 'NaN' ? 0 : formatNumber(tax)}
          </span>
        </div>
        <div className="flex justify-between text-black">
          <span className="text-12">Possible winnings (TZS)</span>
          <span className="text-12">
            {calculation == 'NaN' ? 0 : formatNumber(calculation)}
          </span>
        </div>
        <div className="flex justify-between text-black">
          <span className="text-12">Net Amount (TZS)</span>
          <span className="text-12">
            {netAmount === 'NaN' ? 0 : formatNumber(netAmount)}
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
              ? 'bg-lightestgray hover:bg-lightestgray border-lightestgray  '
              : ''
          } border-[1px] h-10 ml-3 text-gray-900 border-yellow w-52 hover:text-white hover:bg-yellow text-14 font-[700] rounded-md`}
        >
          {isLoading && <CircularProgress color="inherit" size={20} />}
          PLACE BET
        </button>
      </div>
      {openDialog && (
        <div className="absolute top-0 bg-[#0000002e] backdrop-blur-[2px] h-full rounded-[8px] ">
          <div className="w-[300px] h-24 bg-white z-50 m-4">
            <div className="flex justify-between py-1 px-2 ">
              <div className="flex text-gray-900">
                <img src="/images/bikoicon/person_play.png" className="h-5" />
                <span className="text-12 mx-1">
                  Booking code successfull generated.
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
              <div className="w-[280px] border-[1px] border-yellow my-2 h-8 mx-3">
                <div className="h-8 flex justify-between">
                  <div className="w-28 bg-yellow">
                    <span className="text-12 text-white px-3">
                      Booking Code
                    </span>
                  </div>
                  <div className="flex">
                    <span className="mx-3 text-12 font-[700] text-yellow">
                      6232sd
                    </span>
                    <img
                      src="/images/bikoicon/content_copy.png"
                      className="h-6 cursor-pointer"
                    />
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

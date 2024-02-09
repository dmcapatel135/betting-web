import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Balance from '@components/Balance';
import { reactIcons } from '@utils/icons';
import { getReq, isLoggedIn, postReq } from '@utils/apiHandlers';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function BetWallet({
  // selectedBet,
  handleRemoveBet,
  // setSelectedBet,
  handleClearAllBet,
}) {
  const [openDialog, setOpenDailog] = useState();
  const [tab, setTab] = useState('sport');
  const [gameRules, setGameRules] = useState();
  const [bonus, setBonus] = useState([]);
  const [totalOdd, setTotalOdd] = useState(1);
  const [betData, setBetData] = useState([]);
  const bets = useSelector((state) => state.bet.selectedBet);
  const [stake, setStake] = useState(1000);
  const [oddChange, setOddChange] = useState(false);

  const getGamesRules = async () => {
    const response = await getReq('/win-bonus-policies/active');
    setGameRules(response.data);
    console.log('----r-espon ', response.data);
  };

  useEffect(() => {
    getGamesRules();
  }, []);

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
          },
        ]);
      });
    }
  }, [bets]);

  const percentageValue =
    (totalOdd * stake * gameRules?.rules[bonus?.length - 1]?.percentage) / 100;
  const calculation = (totalOdd * stake + percentageValue).toFixed(2);

  const handlePlaceBet = async () => {
    const data = {
      stake: stake,
      acceptOddsChange: oddChange,
      bets: betData,
    };
    const response = await postReq('/users/me/bet-slips', data);
    if (response.status) {
      toast.success('Congrats ! Bet place successfully');
    } else if (response.error) {
      toast.error(response.error.message);
    }
  };

  return (
    <div className="w-full border-[1px] border-blue  rounded-[8px] relative">
      {!isLoggedIn ? (
        <div className="flex justify-between border-b-[1px] border-blue items-center px-3">
          <p className="text-12 text-black">Not logged in -</p>
          <div className="flex my-2">
            <Link to="/login">
              <button className="lg:h-[32px] xxl:h-[48px] lg:w-[60px] xxl:w-[110px] border-[1px] lg:text-12 xxl:text-18 text-white bg-gradient-color-2   rounded-[6px]">
                Login
              </button>
            </Link>
            <Link to="/join-now">
              <button className="lg:h-[32px] xxl:h-[48px] lg:w-[70px] xxl:w-[110px] lg:text-12 xxl:text-18 bg-white ml-3 text-black  border-[1px] border-[#E7A024] rounded-[6px]">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <Balance />
      )}
      <div className="px-3 my-3">
        <div className="flex text-black border-[1px] h-10 w-full rounded-[8px]">
          <div
            className={`w-1/2 flex justify-center cursor-pointer ${
              tab == 'sport'
                ? 'bg-gradient-color-1 text-white'
                : 'bg-white text-black'
            } rounded-l-lg items-center`}
            onClick={() => setTab('sport')}
          >
            <span className="text-12 ">Sport</span>
            <img
              src={
                tab === 'sport'
                  ? '/images/bikoicon/icon-football.png'
                  : '/images/bikoicon/football.svg'
              }
              alt="icon"
              className="mx-2"
            />
            <span className="text-12 ">0</span>
          </div>
          <div
            className={`w-1/2 flex justify-center cursor-pointer ${
              tab == 'virtual' ? 'bg-gradient-color-1 text-white' : 'bg-white'
            } rounded-r-lg items-center`}
            onClick={() => setTab('virtual')}
          >
            <span className="text-12">Virtual</span>
            <img
              src={
                tab === 'virtual'
                  ? '/images/bikoicon/icon-virtual-sport.svg'
                  : '/images/bikoicon/icon-virtual-sport.png'
              }
              alt="icon"
              className="mx-2"
            />
            <span className="text-12">0</span>
          </div>
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
        {bonus?.length > 0 && (
          <div className="h-12 mt-5 flex items-center bg-yellow rounded-br-[16px]">
            <div className="w-5 h-12 bg-gradient-color-4"></div>
            <span className="text-white text-12 leading-4 px-2">
              {gameRules?.rules[bonus?.length - 1]?.message}.
              {gameRules?.minimumOdds} minimum odds.
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
      <div className="border-t-[1px] border-b-[1px] my-5 border-blue">
        {bets?.map((item, index) => {
          return (
            <div key={index} className="flex">
              <div
                className="w-10 border-r-[1px] flex justify-center cursor-pointer items-center border-blue"
                onClick={() => handleRemoveBet(index)}
              >
                <img src="/images/bikoicon/close_small.png" alt="icon" />
              </div>
              <div className="flex justify-between w-full px-3 items-center ">
                <div className="text-gray-900">
                  <p className="text-14 font-[500]">
                    {item.eventName || 'Manchester United - Chelsa FC'}
                  </p>
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
        {/* <div className="flex">
          <div className="w-10 border-r-[1px] flex justify-center items-center border-blue">
            <img src="/images/bikoicon/close_small.png" alt="icon" />
          </div>
          <div className="flex justify-between w-full px-3 items-center ">
            <div className="text-gray-900">
              <p className="text-12">Manchester United - Chelsa FC</p>
              <span className="text-12 text-black">1X2 - FT (1)</span>
            </div>
            <div className="flex justify-center items-center rounded-md bg-yellow h-7 w-10">
              <span className="text-14 font-[600]">2.95</span>
            </div>
          </div>
        </div> */}
        {/* <hr className="border-[1px]"></hr> */}
        {/* <div className="flex">
          <div className="w-10 border-r-[1px] flex justify-center items-center border-blue">
            <img src="/images/bikoicon/close_small.png" alt="icon" />
          </div>
          <div className="flex justify-between w-full px-3 items-center ">
            <div className="text-gray-900">
              <p className="text-12">Manchester United - Chelsa FC</p>
              <span className="text-12 text-black">1X2 - FT (1)</span>
            </div>
            <div className="flex justify-center items-center rounded-md bg-yellow h-7 w-10">
              <span className="text-14 font-[600]">2.95</span>
            </div>
          </div>
        </div> */}
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
        <span>Your stake</span>
        <div className="h-10 border-[1px] border-yellow rounded-xl flex justify-between my-2">
          <div
            onClick={() => setStake(stake - 1)}
            className="h-[38px] flex justify-center items-center cursor-pointer bg-[#C2C4C6] w-16 text-center rounded-l-xl"
          >
            <span className="text-24">-</span>
          </div>
          <div className="h-10 w-24 flex justify-center items-center">
            <input
              className="text-black text-center text-14 outline-none border-none h-9"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
            />
          </div>
          <div
            onClick={() => setStake(stake + 1)}
            className="h-[38px] flex justify-center items-center cursor-pointer bg-yellow w-16 rounded-r-xl"
          >
            <span className="text-24">+</span>
          </div>
        </div>
        {/* <span className="text-12 text-gray-900">Min stake is 1000</span> */}
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
            {(
              (totalOdd *
                stake *
                gameRules?.rules[bonus?.length - 1]?.percentage) /
              100
            ).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-black">
          <span className="text-12">Tax 10% (TZS)</span>
          <span className="text-12">
            {(((calculation - stake) * 10) / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-black">
          <span className="text-12">Net Amount (TZS)</span>
          <span className="text-12">
            {calculation - (((calculation - stake) * 10) / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-black">
          <span className="text-12">Possible winnings (TZS)</span>
          <span className="text-12">{calculation}</span>
        </div>
      </div>
      <div className="flex my-3 px-3 ">
        <button
          onClick={handleClearAllBet}
          className="border-[1px] border-yellow w-28 hover:bg-yellow hover:text-white text-gray-900 text-14 font-[700] rounded-md"
        >
          CLEAR ALL
        </button>
        <button
          onClick={handlePlaceBet}
          className="border-[1px] h-10 ml-3 text-gray-900 border-yellow w-40 hover:text-white hover:bg-yellow text-14 font-[700] rounded-md"
        >
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
};
export default BetWallet;

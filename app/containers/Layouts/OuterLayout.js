import React, { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';
import {
  BetWallet,
  // Betslip,
  CompanyContact,
  CustomerCareContact,
  Footer,
  Navbar,
  TalkToUs,
} from '@components';
import Sidebar from '@components/Sidebar';
import { MyContext } from '@components/MyContext/MyContext';
import { getReq, isLoggedIn } from '@utils/apiHandlers';
import { countryNameList } from '@api/country';
import { images } from '@utils/images';
import { useSelector } from 'react-redux';
import { marketsName } from '@components/SportsMenu/constants';
const OuterLayout = () => {
  const [params] = useSearchParams();
  const [sportId, setSportId] = useState(params.get('sId') || 1);
  const [selectTournament, setSelectTournament] = useState(
    params.get('eId') || null,
  );
  const [allTournaments, setAllTournaments] = useState();
  const [categories, setCategories] = useState();
  const [tab, setTab] = useState(3);
  const [searchParams] = useSearchParams();
  const [wallet, setWallet] = useState();
  const [otherCountries, setOtherCountries] = useState([]);
  const [gameRules, setGameRules] = useState();
  const [selectMarket, setSelectMarket] = useState();
  const [bonus, setBonus] = useState([]);
  const [totalOdds, setTotalOdds] = useState();
  const [marketData, setMarketData] = useState(
    marketsName.find((item) => item.sportId == params.get('sId') || 1),
  );
  const [date, setDate] = useState(null);
  const selectedBet = useSelector((state) => state.bet.selectedBet);

  const { bookingcode } = useParams();

  const getAllTournaments = useCallback(async () => {
    const response = await getReq(
      `/sports/${
        sportId ?? searchParams.get('sId') ?? 1
      }/tournaments?haveActiveEvents=${true}`,
    );
    let data = response.data.map((d) => ({ ...d, sportId }));
    setAllTournaments(data.filter((item) => item.topLeague == true));
  }, [sportId, searchParams]);

  useEffect(() => {
    getAllTournaments();
  }, [sportId, getAllTournaments]);

  const getAllCategories = useCallback(async () => {
    const response = await getReq(
      `/sports/${
        sportId ?? searchParams.get('sId') ?? 1
      }/categories?haveActiveEvents=${true}`,
    );
    const categoriesWithFlags = response?.data?.map((category) => {
      const country = countryNameList.find(
        (country) => country.name === category.name,
      );
      return { ...category, flag: country?.code };
    });
    setCategories(categoriesWithFlags.filter((item) => item.popular == true));
    let other = categoriesWithFlags
      .filter((item) => item.popular == false)
      .sort((a, b) => (a.name > b.name ? 1 : -1));
    // var sortedData = other?
    setOtherCountries(other);
  }, [sportId, searchParams]);

  useEffect(() => {
    getAllCategories();
  }, [sportId, getAllCategories]);

  const getWalletBalance = useCallback(async () => {
    const response = await getReq('/users/me/wallets');
    if (response.status) {
      setWallet(response.data);
    }
  }, [setWallet]);

  useEffect(() => {
    if (isLoggedIn()) {
      getWalletBalance();
    }
  }, [getWalletBalance]);

  const getGamesRules = async () => {
    const response = await getReq('/win-bonus-policies/active');
    setGameRules(response.data);
  };

  useEffect(() => {
    getGamesRules();
  }, []);

  useEffect(() => {
    const rule = selectedBet?.filter(
      (item) => item?.bet?.odds >= gameRules?.minimumOdds,
    );
    setBonus(rule);
    if (selectedBet?.length > 0) {
      const totalOdds = selectedBet
        .map((b) => b.bet?.odds || 1)
        .reduce((a, b) => a * b, 1);
      setTotalOdds(totalOdds);
    }
  }, [selectedBet, gameRules]);

  const handleMobileBetslip = () => {
    const validPaths = [
      '/',
      '/dashboard/upcoming',
      '/dashboard/live-now',
      '/dashboard/popular',
    ];
    if (validPaths.includes(window.location.pathname)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <MyContext.Provider
        value={{
          sportId,
          setSportId,
          selectTournament,
          setSelectTournament,
          allTournaments,
          tab,
          setTab,
          categories,
          wallet,
          otherCountries,
          gameRules,
          getWalletBalance,
          selectMarket,
          setSelectMarket,
          marketData,
          setMarketData,
          date,
          setDate,
        }}
      >
        <div className="relative">
          <Navbar
            tab={tab}
            setTab={setTab}
            // setCurrentDate={setCurrentDate}
            // currentDate={currentDate}
          />
          <div className="flex gap-4 h-hull">
            <div className="w-[240px] flex-shrink-0 xl2:min-w-[290px] lg:block hidden">
              <Sidebar
                tab={tab}
                setTab={setTab}
                setSelectTournament={setSelectTournament}
              />
            </div>
            <div className=" flex-1 overflow-x-auto relative">
              {handleMobileBetslip() && (
                <div className="fixed bg-gradient-color-1 text-black h-fit bottom-0 lg:hidden block z-50 w-full">
                  {!(selectedBet.length > gameRules?.rules?.length) &&
                    gameRules?.rules[bonus?.length - 1]?.message && (
                      <div className="text-center bg-yellow py-2 text-14 text-white">
                        <p> {gameRules?.rules[bonus?.length - 1]?.message}</p>
                      </div>
                    )}
                  <div className="text-white py-2 flex items-center justify-around">
                    <Link to="/dashboard/bet-slip">
                      <button className="text-14 flex font-[500] bg-yellow px-2 py-1 rounded-md items-center gap-2">
                        <p>BETSLIP</p>
                        <div className="rounded-full flex justify-center items-center w-6 h-6 bg-white text-black">
                          <p>{selectedBet.length}</p>
                        </div>
                      </button>
                    </Link>
                    <div className="flex justify-center text-white text-14 items-center gap-2">
                      <p>Odds : </p>
                      <p>{totalOdds ? totalOdds?.toFixed(2) : 0}</p>
                    </div>
                    <div>
                      <Link
                        to={isLoggedIn() ? '/dashboard/bet-slip' : '/login'}
                      >
                        <button className="bg-yellow px-3 py-1 text-white text-12 font-[600] rounded-md">
                          BET NOW
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex-1 overflow-x-auto px-2 lg:px-0 py-5  lg:pb-0 bg-white ">
                <Outlet />
              </div>
            </div>
            <div className="hidden lg:block w-[280px] xl:w-[320px] 2xl:w-[350px] 3xl:w-[400px] pt-5 border-l pb-2 px-2 xl:px-3 2xl:px-4 border-[#A3A3A3]">
              <div className="sticky top-[90px] h-[calc(100svh-85px)] overflow-y-auto scrollbar-width">
                {selectedBet?.length > 0 || isLoggedIn() || bookingcode ? (
                  <BetWallet />
                ) : (
                  <div>
                    <img src={images.AppImg} alt="app" className="" />
                    <img src={images.contactImg} alt="app" className="py-2" />
                  </div>
                )}

                <CompanyContact />
                <CustomerCareContact />
                <TalkToUs />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </MyContext.Provider>
    </>
  );
};

export default OuterLayout;

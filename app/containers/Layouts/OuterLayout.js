import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import {
  BetWallet,
  Betslip,
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
// import ExampleComponent from '@components/ExampleComponent';
const OuterLayout = () => {
  const [params] = useSearchParams();
  const [sportId, setSportId] = useState(params.get('sId') || 1);
  const [selectTournament, setSelectTournament] = useState(
    params.get('eId') || null,
  );
  const [allTournaments, setAllTournaments] = useState();
  const [categories, setCategories] = useState();
  const [tab, setTab] = useState();
  const [searchParams] = useSearchParams();
  const [wallet, setWallet] = useState();
  const [otherCountries, setOtherCountries] = useState([]);
  const [gameRules, setGameRules] = useState();

  const getAllTournaments = useCallback(async () => {
    const response = await getReq(
      `/sports/${
        sportId ?? searchParams.get('sId') ?? 1
      }/tournaments?haveActiveEvents=${true}`,
    );
    setAllTournaments(response.data.map((d) => ({ ...d, sportId })));
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
    setOtherCountries(
      categoriesWithFlags.filter((item) => item.popular == false),
    );
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
  const selectedBet = useSelector((state) => state.bet.selectedBet);
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
        }}
      >
        <Navbar tab={tab} setTab={setTab} />
        <div className="flex gap-4 h-hull">
          <div className="w-[240px] flex-shrink-0 xl2:min-w-[290px] lg:block hidden">
            <Sidebar
              tab={tab}
              setTab={setTab}
              setSelectTournament={setSelectTournament}
            />
          </div>
          <div className="flex-1 overflow-x-auto px-2 lg:px-0 py-5 lg:pb-0 bg-white">
            {/* <ExampleComponent addon /> */}
            <Outlet />
          </div>
          <div className="hidden lg:block w-[280px] xl:w-[320px] 2xl:w-[350px] 3xl:w-[400px] pt-5 border-l pb-2 px-2 xl:px-3 2xl:px-4 border-[#A3A3A3]">
            <div className="sticky top-[90px] h-[calc(100svh-85px)] overflow-y-auto scrollbar-width">
              {selectedBet.length > 0 ? (
                <BetWallet />
              ) : isLoggedIn() ? (
                <Betslip />
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
      </MyContext.Provider>
    </>
  );
};

export default OuterLayout;

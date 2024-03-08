import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Footer, Navbar } from '@components';
import Sidebar from '@components/Sidebar';
import { MyContext } from '@components/MyContext/MyContext';
import { getReq, isLoggedIn } from '@utils/apiHandlers';
import { countryNameList } from '@api/country';

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
        <div className="grid grid-cols-12 ">
          <div className="md:col-span-2 md:block hidden">
            <Sidebar
              tab={tab}
              setTab={setTab}
              setSelectTournament={setSelectTournament}
            />
          </div>
          <div className="md:col-span-10 col-span-full bg-white">
            <Outlet />
          </div>
        </div>
        <Footer />
      </MyContext.Provider>
    </>
  );
};

export default OuterLayout;

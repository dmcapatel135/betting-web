import React, { useCallback, useEffect, useState } from 'react';
import {
  // Navigate,
  Outlet,
  // useLocation,
  useNavigate,
  useSearchParams,
  useParams,
} from 'react-router-dom';
import { Footer, Navbar } from '@components';
import Sidebar from '@components/Sidebar';
import { MyContext } from '@components/MyContext/MyContext';
import { getReq, isLoggedIn } from '@utils/apiHandlers';
import { countryNameList } from '@api/country';

const OuterLayout = () => {
  const { sId, eId } = useParams();
  const [params] = useSearchParams();
  const [sportId, setSportId] = useState();
  const [selectTournament, setSelectTournament] = useState();
  const [allTournaments, setAllTournaments] = useState();
  const [categories, setCategories] = useState();
  const [tab, setTab] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [wallet, setWallet] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname == '/' &&
      params.get('sId') &&
      params.get('eId')
    ) {
      setSelectTournament(params.get('eId'));
      setSportId(params.get('sId'));
    } else if (window.location.pathname == '/' && params.get('eId')) {
      // setSportId(1);
    } else if (window.location.pathname == '/' && params.get('sId')) {
      setSportId(params.get('sId'));
    } else if (window.location.pathname == '/') {
      setSportId(1);
      setTab(2);
    }
  }, [sId, params]);

  useEffect(() => {
    if (sportId & selectTournament) {
      setSearchParams({ sId: sportId, eId: selectTournament });
    } else if (sportId) {
      setSearchParams({ sId: sportId });
    } else if (selectTournament) {
      navigate(`/dashboard?eId=${selectTournament}`);
    }
  }, [selectTournament, sportId, navigate, setSearchParams, sId, eId]);

  useEffect(() => {
    if (eId & sId) {
      navigate(`/dashboard?sId=${sId}&eId=${eId}`);
    } else if (sId) {
      navigate(`/dashboard?sId=${sId}`);
    } else if (eId) {
      navigate(`/dashboard&eId=${eId}`);
    }
  }, [sId, eId, navigate]);

  // useEffect(() => {
  //   if (tab == 7) {
  //     navigate(`/dashboard/bet-slip/${tab}`);
  //   } else if (tab == 5) {
  //     setSelectTournament(null);
  //     navigate('/dashboard/jackpot');
  //   } else if (tab == 8) {
  //     navigate(`/dashboard/how-to-play/${tab}`);
  //   } else if (sportId && tab && selectTournament) {
  //     navigate(`/dashboard/${sportId}/${tab}/${selectTournament}`);
  //   } else if (sportId && tab) {
  //     navigate(`/dashboard/${sportId}/${tab}`);
  //   } else if (selectTournament) {
  //     navigate(`/dashboard/${selectTournament}`);
  //   }
  // }, [sportId, navigate, tab, selectTournament]);

  // useEffect(() => {
  //   if (sportId && selectTournament && tab)
  //     navigate(`/dashboard/${sportId}/${tab}/${selectTournament}`);
  // }, [sportId, tab, selectTournament, navigate]);

  const getAllTournaments = useCallback(async () => {
    const response = await getReq(
      `/sports/${
        sportId
          ? sportId
          : searchParams.get('sId')
          ? searchParams.get('sId')
          : 1
      }/tournaments`,
    );
    setAllTournaments(response.data);
  }, [sportId, searchParams]);

  useEffect(() => {
    getAllTournaments();
  }, [sportId, getAllTournaments]);

  const getAllCategories = useCallback(async () => {
    const response = await getReq(
      `/sports/${
        sportId
          ? sportId
          : searchParams.get('sId')
          ? searchParams.get('sId')
          : 1
      }/categories`,
    );
    const mergedCategories = response?.data?.map((category) => {
      const country = countryNameList.find(
        (country) => country.name === category.name,
      );
      return { ...category, flag: country?.code };
    });
    setCategories(mergedCategories);
  }, [sportId, searchParams]);

  useEffect(() => {
    getAllCategories();
  }, [sportId, getAllCategories]);

  const getWalletBalance = useCallback(async () => {
    const response = await getReq('/users/me/wallet');
    if (response.status) {
      setWallet(response.data);
    }
  }, [setWallet]);

  useEffect(() => {
    if (isLoggedIn()) {
      getWalletBalance();
    }
  }, [getWalletBalance]);

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
        }}
      >
        <Navbar tab={tab} setTab={setTab} />
        <div className="grid grid-cols-12 ">
          <div className="md:col-span-2 md:block hidden">
            <Sidebar
              tab={tab}
              setTab={setTab}
              setSelectTournament={setSelectTournament}
            />{' '}
          </div>
          <div className="md:col-span-10 col-span-full bg-white">
            {' '}
            <Outlet />{' '}
          </div>
        </div>
        <Footer />
      </MyContext.Provider>
    </>
  );
};

export default OuterLayout;

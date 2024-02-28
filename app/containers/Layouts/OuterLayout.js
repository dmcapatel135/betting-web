import React, { useCallback, useEffect, useState } from 'react';
import {
  // Navigate,
  Outlet,
  // useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Footer, Navbar } from '@components';
import Sidebar from '@components/Sidebar';
import { MyContext } from '@components/MyContext/MyContext';
import { getReq } from '@utils/apiHandlers';
import { countryNameList } from '@api/country';
// import BetWallet from '@components/BetWallet';

const OuterLayout = () => {
  const { sId, eId, statusId } = useParams();
  const [sportId, setSportId] = useState(sId || 1);
  const [selectTournament, setSelectTournament] = useState();
  const [allTournaments, setAllTournaments] = useState();
  const [categories, setCategories] = useState();
  const [tab, setTab] = useState(statusId || 2);

  const navigate = useNavigate();

  // const { pathname } = useLocation();

  // if (!isLoggedIn()) {
  //   localStorage.setItem('lastUrl', pathname);
  //   return <Navigate to="/login" />;
  // }

  useEffect(() => {
    if (sId) setSportId(sId);
    setSelectTournament(null);
  }, [sId]);

  useEffect(() => {
    if (statusId) setTab(statusId);
  }, [statusId]);

  useEffect(() => {
    if (eId) setSelectTournament(eId);
  }, [eId]);

  useEffect(() => {
    if (tab == 7) {
      navigate(`/dashboard/bet-slip/${tab}`);
    } else if (tab == 5) {
      navigate(`/dashboard/jackpot/${tab}`);
    } else if (tab == 8) {
      navigate(`/dashboard/how-to-play/${tab}`);
    } else if (sportId && tab && selectTournament) {
      navigate(`/dashboard/${sportId}/${tab}/${selectTournament}`);
    } else if (sportId && tab) {
      navigate(`/dashboard/${sportId}/${tab}`);
    }
  }, [sportId, navigate, tab, selectTournament]);

  useEffect(() => {
    if (sportId && selectTournament)
      navigate(`/dashboard/${sportId}/${tab}/${selectTournament}`);
  }, [sportId, tab, selectTournament, navigate]);

  const getAllTournaments = useCallback(async () => {
    const response = await getReq(`/sports/${sportId}/tournaments`);
    setAllTournaments(response.data);
  }, [sportId]);

  useEffect(() => {
    getAllTournaments();
  }, [sportId, getAllTournaments]);

  const getAllCategories = useCallback(async () => {
    const response = await getReq(`/sports/${sportId}/categories`);
    const mergedCategories = response?.data?.map((category) => {
      const country = countryNameList.find(
        (country) => country.name === category.name,
      );
      return { ...category, flag: country?.flag };
    });
    setCategories(mergedCategories);
  }, [sportId]);

  useEffect(() => {
    getAllCategories();
  }, [sportId, getAllCategories]);

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
        }}
      >
        <Navbar tab={tab} setTab={setTab} />
        <div className="grid grid-cols-12 ">
          <div className="md:col-span-2 md:block hidden">
            <Sidebar tab={tab} setTab={setTab} />{' '}
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

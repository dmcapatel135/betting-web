import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Footer, Navbar } from '@components';
import Sidebar from '@components/Sidebar';
import { MyContext } from '@components/MyContext/MyContext';
import { getReq } from '@utils/apiHandlers';
// import BetWallet from '@components/BetWallet';

const OuterLayout = () => {
  const { sId, eId, statusId } = useParams();
  const [sportId, setSportId] = useState(sId || 1);
  const [selectTournament, setSelectTournament] = useState();
  const [allTournaments, setAllTournaments] = useState();
  const [selectMenuName, setSelectMenuName] = useState('HOME');
  const [categories, setCategories] = useState();
  const [tab, setTab] = useState();
  const navigate = useNavigate();
  const [menuName, setMenuName] = useState();

  useEffect(() => {
    setMenuName(selectMenuName);
  }, [selectMenuName]);

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
    if (tab == 5) {
      navigate('/dashboard/jackpot');
    } else if (sportId && tab) navigate(`/dashboard/${sportId}/${tab}`);
  }, [sportId, navigate, tab]);

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
    setCategories(response.data);
  }, [sportId]);

  useEffect(() => {
    getAllCategories();
  }, [sportId, getAllCategories]);

  return (
    <>
      <Navbar
        selectMenuName={selectMenuName}
        setSelectMenuName={setSelectMenuName}
      />
      <div className="grid grid-cols-12 ">
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
            menuName,
          }}
        >
          <div className="md:col-span-2 md:block hidden">
            <Sidebar
            // allTournaments={allTournaments}
            // selectTournament={selectTournament}
            // setSelectTournament={setSelectTournament}
            />{' '}
          </div>
          <div className="md:col-span-10 col-span-full bg-white">
            {' '}
            <Outlet />{' '}
          </div>
          {/* <div className="col-span-3 bg-white px-2 py-2">
            <BetWallet />
          </div> */}
        </MyContext.Provider>
      </div>
      <Footer />
    </>
  );
};

export default OuterLayout;

import React, { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '@components';
import Sidebar from '@components/Sidebar';
import { MyContext } from '@components/MyContext/MyContext';
import { getReq } from '@utils/apiHandlers';

const OuterLayout = () => {
  const [sportId, setSportId] = useState(1);
  const [selectTournament, setSelectTournament] = useState();
  const [allTournaments, setAllTournaments] = useState();
  const [tab, setTab] = useState(2);

  const getAllTournaments = useCallback(async () => {
    const response = await getReq(`/sports/${sportId}/tournaments`);
    setAllTournaments(response.data);
  }, [sportId]);

  useEffect(() => {
    getAllTournaments();
  }, [sportId, getAllTournaments]);

  return (
    <>
      <Navbar />
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
        </MyContext.Provider>
      </div>
      <Footer />
    </>
  );
};

export default OuterLayout;

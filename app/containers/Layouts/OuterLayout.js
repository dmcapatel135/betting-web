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

  const getAllTournaments = useCallback(async () => {
    const response = await getReq(`/sports/${sportId}/tournaments`);
    setAllTournaments(response.data);
  }, [sportId]);

  useEffect(() => {
    getAllTournaments();
  }, [sportId, getAllTournaments]);

  return (
    <>
      <MyContext.Provider
        value={{
          sportId,
          setSportId,
          selectTournament,
          setSelectTournament,
          allTournaments,
        }}
      >
        <Navbar />
        <div className="grid grid-cols-12 ">
          <div className="md:col-span-2 md:block hidden">
            <Sidebar />{' '}
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

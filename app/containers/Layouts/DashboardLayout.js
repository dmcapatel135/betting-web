import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { init } from '@actions';
import { isLoggedIn } from '@utils/apiHandlers';
import Sidebar from '@components/Sidebar';
import { RightSideSection, SportsMenu } from '@components';
import PropTypes from 'prop-types';

const DashboardLayout = ({ menu }) => {
  const dispatch = useDispatch();
  const [selectTournament, setSelectTournament] = useState();
  // const { pathname } = useLocation();

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(init());
    }
  }, [dispatch]);

  // if (!isLoggedIn()) {
  //   localStorage.setItem('lastUrl', pathname);
  //   return <Navigate to="/auth" />;
  // }

  return (
    <main>
      <div className="grid grid-cols-12 ">
        <div className="md:col-span-2 md:block hidden">
          <Sidebar
            selectTournament={selectTournament}
            setSelectTournament={setSelectTournament}
          />{' '}
        </div>
        <div className="md:col-span-7 pl-5 col-span-full bg-white">
          {' '}
          {menu && (
            <SportsMenu
              selectTournament={selectTournament}
              setSelectTournament={setSelectTournament}
            />
          )}
          <div>
            <Outlet />{' '}
          </div>
        </div>
        <div className="col-span-3">
          <RightSideSection />
        </div>
      </div>
      {/* <Outlet /> */}
    </main>
  );
};

DashboardLayout.propTypes = {
  menu: PropTypes.bool,
};
export default DashboardLayout;

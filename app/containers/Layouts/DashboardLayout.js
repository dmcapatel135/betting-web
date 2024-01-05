import React, { useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { init } from '@actions';
import { isLoggedIn } from '@utils/apiHandlers';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(init());
    }
  }, [dispatch]);

  if (!isLoggedIn()) {
    localStorage.setItem('lastUrl', pathname);
    return <Navigate to="/auth" />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default DashboardLayout;
